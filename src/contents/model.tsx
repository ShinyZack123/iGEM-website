import React, { useCallback, useEffect, useRef, useState } from "react";
import "../assets/css/model.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

const CollapsibleItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    const node = contentRef.current;
    if (!node) {
      return;
    }

    if (open) {
      const scrollHeight = node.scrollHeight;
      setMaxHeight(`${scrollHeight}px`);

      const handleTransitionEnd = () => {
        if (contentRef.current && open) {
          setMaxHeight("none");
        }
      };

      node.addEventListener("transitionend", handleTransitionEnd, {
        once: true,
      });
    } else {
      if (contentRef.current) {
        const scrollHeight = contentRef.current.scrollHeight;
        setMaxHeight(`${scrollHeight}px`);
        requestAnimationFrame(() => {
          setMaxHeight("0px");
        });
      }
    }
  }, [open, children]);

  return (
    <div className={`model-subsection ${open ? "open" : ""}`}>
      <button
        className={`model-subsection-button ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        type="button"
      >
        <span>{title}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      <div
        className={`model-subsection-content ${open ? "open" : ""}`}
        hidden={!open && maxHeight === "0px"}
        ref={contentRef}
        style={{ maxHeight }}
      >
        {children}
      </div>
    </div>
  );
};

const lampSimulationCode = String.raw`
# LAMP simulation with replicator-driven kinetics, enzyme-throughput cap,
# separate primer pools (with stoichiometry), and an empirical HNB/Mg2+ model.
# Plots: amplified nucleotides (linear + semilog), effective free Mg2+,
# and an HNB "blue index" curve with the color-change time marked.

import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt


# ODE right-hand side

def lamp_odes_clean(t, y, p):
    """
    State vector y:
      C     [uM]      : active replicators (dumbbells/looped amplicons)
      L     [uM nt]   : cumulative nucleotides incorporated
      Pin   [uM]      : inner primers pool (FIP + BIP)
      Ploop [uM]      : loop primers pool (LF + LB)
      N     [uM nt]   : available dNTP nucleotides

    Parameters p:
      k_init [uM^-1 s^-1] : initiation rate
      k_cycle[uM^-1 s^-1] : autocycling rate (depends on C and loop primers)
      T      [uM]         : template concentration (fixed tiny seed)
      v_len  [uM nt s^-1 per uM C] : elongation demand per replicator
      k_cat  [s^-1], E [uM]        : enzyme catalytic cap (vmax = k_cat*E)
      Kcap   [uM nt s^-1]          : softness of throughput cap (~vmax)
      alpha_in >=2, alpha_lp >=1   : primers consumed per event
      Kn [uM nt], Kp [uM]          : soft saturation constants to gate low pools
      l0 [nt]                       : effective "work" per new replicator
    """
    C, L, Pin, Ploop, N = y

    # Unpack
    k_init   = p["k_init"]
    k_cycle  = p["k_cycle"]
    T        = p["T"]
    v_len    = p["v_len"]
    k_cat    = p["k_cat"]
    E        = p["E"]
    Kcap     = p["Kcap"]
    alpha_in = p["alpha_in"]
    alpha_lp = p["alpha_lp"]
    Kn       = p["Kn"]
    Kp       = p["Kp"]
    l0       = p["l0"]

    # Guard non-negativity for stability
    C     = max(C, 0.0)
    L     = max(L, 0.0)
    Pin   = max(Pin, 0.0)
    Ploop = max(Ploop, 0.0)
    N     = max(N, 0.0)

    # Smooth availability "gates" (avoid hard cutoffs / negative pools)
    g_Pin = Pin   / (Kp + Pin)   if (Kp + Pin)   > 0 else 0.0
    g_Plp = Ploop / (Kp + Ploop) if (Kp + Ploop) > 0 else 0.0
    g_N   = N     / (Kn + N)     if (Kn + N)     > 0 else 0.0

    # (1) Formation of new replicators: initiation + loop-driven cycling
    r_init  = k_init  * T * Pin   * g_Pin         # needs inner primers these rates here take in the availability gates 
    r_cycle = k_cycle * C * Ploop * g_Plp         # needs loop primers these rates here take in the availability gates 
    dC_dem  = r_init + r_cycle                    # demanded C-formation [uM/s] 

    # (2) Elongation demand scales with C and dNTP availability
    R_dem = v_len * C * g_N                       # [uM nt / s] these rates here take in the availability gates 

    # (3) Enzyme throughput cap on total incorporation (smooth)
    vmax = k_cat * E                               # [uM nt / s]
    R = vmax * R_dem / (Kcap + R_dem) if (Kcap + R_dem) > 0 else 0.0

    # (4) Tie C-formation to polymerase budget (~l0 nt of "work" per new C)
    C_cap = vmax / max(l0, 1.0)                    # [uM / s]
    dCdt  = C_cap * dC_dem / (C_cap + dC_dem) if (C_cap + dC_dem) > 0 else 0.0

    # (5) Primer consumption with stoichiometry
    dPindt   = -alpha_in * r_init
    dPloopdt = -alpha_lp * r_cycle

    # (6) Track dNTPs and incorporated nucleotides
    dNdt = -R
    dLdt =  R

    return [dCdt, dLdt, dPindt, dPloopdt, dNdt]



# Reaction setup & parameters

volume   = 25e-6                 # L  (25 µL reaction)
copies   = 10                    # starting copies
avogadro = 6.022e23
T        = copies / (avogadro * volume) * 1e6      # uM seed template

# Primers (separate pools; typical LAMP ranges)
P_in0   = 1.6*2.0                # uM, inner (FIP+BIP)  ~3.2 uM
P_loop0 = 0.4*2.0                # uM, loop  (LF+LB)    ~0.8 uM
# Outer primers not modeled explicitly (not rate-limiting for cycling)

# dNTP pool (as total nucleotides, uM)
dNTP_each_mM = 1.4               # mM each dNTP
N0 = dNTP_each_mM * 4 * 1000.0   # uM nucleotides (≈5600 uM)

# Kinetics (starting point that yields ~40 min HNB flip with the calibrated Mg/HNB model)
params = dict(
    k_init = 2e-5,               # uM^-1 s^-1 (initiation)
    k_cycle= 1e-1,               # uM^-1 s^-1 (autocycling; loop-primed)
    T      = T,
    v_len  = 0.5,                # uM nt s^-1 per uM C (effective)
    k_cat  = 40.0,               # s^-1
    E      = 3.162e-2,           # uM (≈31.6 nM)
    Kcap   = 40.0*3.162e-2,      # uM nt s^-1 (soft cap ~ vmax)
    alpha_in = 2.0,              # ~two inner primers per initiation
    alpha_lp = 1.0,              # one loop primer per cycling event
    Kn = 50.0,                   # uM nt  (soft dNTP gate)
    Kp = 0.1,                    # uM     (soft primer gate)
    l0 = 200.0                   # nt of "work" per new replicator (book-keeping)
)

# Initial state (seed replicators with tiny dumbbell population = T)
y0 = [T, 0.0, P_in0, P_loop0, N0]           # [C, L, Pin, Ploop, N]
t  = np.linspace(0, 3600, 4000)             # 0..60 min, in seconds


# Solve 

sol = solve_ivp(
    fun=lambda tau, y: lamp_odes_clean(tau, y, params),
    t_span=(t[0], t[-1]),
    y0=y0, t_eval=t, method="LSODA",
    rtol=1e-8, atol=1e-12
)

C     = np.maximum(sol.y[0], 0.0)     # uM replicators
L     = np.maximum(sol.y[1], 0.0)     # uM nucleotides incorporated
Pin   = np.maximum(sol.y[2], 0.0)     # uM
Ploop = np.maximum(sol.y[3], 0.0)     # uM
N     = np.maximum(sol.y[4], 0.0)     # uM nucleotides remaining


# Effective Mg2+ and HNB model

Mg_total_uM   = 8.0 * 1000.0          # 8 mM total Mg2+ in mix (typical)
eta_dNTP      = 1.0                   # effective Mg sequestered initially per dNTP nt
Mg_free0      = max(0.0, Mg_total_uM - eta_dNTP * N0)   # starting "free" Mg2+ (effective)

PPi_uM        = L                     # PPi ~ nucleotides incorporated (1:1)
gamma_ppi     = 1.0                   # effective Mg lost per PPi (fit 0.5–2)
Mg_free       = np.maximum(0.0, Mg_free0 - gamma_ppi * PPi_uM)

# HNB response as logistic vs free Mg2+ (empirical)
Mg50_uM       = 2000.0                # Mg2+ midpoint (uM) where "blue index" = 0.5
w_mg_uM       = 300.0                 # slope width (uM)
blue_index    = 1.0 / (1.0 + np.exp(-(Mg50_uM - Mg_free) / max(w_mg_uM, 1e-9)))

# First time blue_index crosses 0.5
cross = np.where(blue_index >= 0.5)[0]
cc_time_min = (t[cross[0]] / 60.0) if cross.size > 0 else None


# Output 

def uM_nt_to_amplicon_molecules(uM_nt, l_nt=200.0):
    """Convert uM nucleotides to number of l_nt-length amplicons in the tube."""
    mol_nt = uM_nt * 1e-6 * volume        # mol of nucleotides in the tube
    molecules_nt = mol_nt * avogadro
    amplicons = molecules_nt / l_nt
    return amplicons

final_amplicons = uM_nt_to_amplicon_molecules(L[-1], l_nt=params["l0"])
final_fold      = final_amplicons / copies

if cc_time_min is not None:
    L_cc            = L[cross[0]]
    amp_at_cc       = uM_nt_to_amplicon_molecules(L_cc, l_nt=params["l0"])
    fold_at_cc      = amp_at_cc / copies
else:
    L_cc = amp_at_cc = fold_at_cc = None

print("=== Summary ===")
print(f"Initial effective free Mg2+ ≈ {Mg_free0/1000:.2f} mM")
print(f"Final amplified nucleotides (L) = {L[-1]:.1f} uM")
print(f"Final fold amplification (60 min) = {final_fold:.2e}")
if cc_time_min is not None:
    print(f"HNB color change at {cc_time_min:.2f} min")
    print(f"Fold amplification at color change = {fold_at_cc:.2e}")
else:
    print("No HNB color change within 60 min (with current Mg/HNB parameters)")


# Plots

mins = t/60.0

# Amplified nucleotides (linear)
plt.figure(figsize=(9,4))
plt.plot(mins, L, label="Amplified DNA (uM nucleotides)")
if cc_time_min is not None:
    plt.axvline(cc_time_min, linestyle="--", label=f"Color change @ {cc_time_min:.2f} min")
plt.xlabel("Time (minutes)")
plt.ylabel("Amplified DNA (uM nt)")
plt.title("LAMP — enzyme-capped, replicator-driven")
plt.legend(); plt.grid(True); plt.tight_layout()
plt.show()

# Amplified nucleotides (semilog)
plt.figure(figsize=(9,4))
plt.semilogy(mins, np.maximum(L, 1e-12))
if cc_time_min is not None:
    plt.axvline(cc_time_min, linestyle="--", label=f"Color change @ {cc_time_min:.2f} min")
plt.xlabel("Time (minutes)")
plt.ylabel("Amplified DNA (uM nt) [log]")
plt.title("LAMP — semilog view")
plt.legend(); plt.grid(True, which="both"); plt.tight_layout()
plt.show()

# Effective free Mg2+
plt.figure(figsize=(9,4))
plt.plot(mins, Mg_free/1000.0, label="Free Mg2+ (mM)")
if cc_time_min is not None:
    plt.axvline(cc_time_min, linestyle="--", label=f"Color change @ {cc_time_min:.2f} min")
plt.axhline(Mg50_uM/1000.0, linestyle=":", label="HNB midpoint (Mg50)")
plt.xlabel("Time (minutes)")
plt.ylabel("Free Mg2+ (mM)")
plt.title("Effective Free Mg2+")
plt.legend(); plt.grid(True); plt.tight_layout()
plt.show()

# HNB response curve
plt.figure(figsize=(9,4))
plt.plot(mins, blue_index, label="HNB blue index (0=violet, 1=sky-blue)")
plt.axhline(0.5, linestyle=":", label="Color threshold (0.5)")
if cc_time_min is not None:
    plt.axvline(cc_time_min, linestyle="--", label=f"Color change @ {cc_time_min:.2f} min")
plt.ylim(0,1)
plt.xlabel("Time (minutes)")
plt.ylabel("Blue index")
plt.title("HNB response (empirical)")
plt.legend(); plt.grid(True); plt.tight_layout()
plt.show()
`;

const fusionProteinCode = String.raw`
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

L_nt = 2400                # nt
v_pol_nt_per_s  = 240.0    # nt/s
v_pol_nt_per_min = v_pol_nt_per_s * 60.0  # nt/min

# Induction via T7 promoter 
IPTG   = 1000.0            # µM  (was 100)
K_IPTG = 66.0              # µM  (was 50)
n_hill = 2.0               # unitless
t_induce = 0.0             # min

def f_prom(u_um):
    return (u_um**n_hill) / (K_IPTG**n_hill + u_um**n_hill)

def promoter_activity(t):
    return f_prom(IPTG) if t >= t_induce else 0.0

#  Transcription 
k_tx_init_full = 30.0      # nM/min at full induction (attempt)   (was 50)
TU_nM = 5.0                # nM active transcriptional units DNA  (was 100)

def k_tx_eff(t):
    attempt = k_tx_init_full * promoter_activity(t)      # nM/min
    occlusion_cap = (v_pol_nt_per_min / L_nt) * TU_nM    # nM/min
    return min(attempt, occlusion_cap)

# Translation 
k_tl_max = 150.0           # nM/min when m >> K_M
K_M      = 100.0           # nM

def tl_inits(m_nM):
    return k_tl_max * m_nM / (K_M + m_nM + 1e-12)

# Degradation / dilution / maturation
delta_m = np.log(2) / 5.0          # ~5 min half-life
delta_p = np.log(2) / (10.0*60.0)  # ~10 h half-life
k_mat   = np.log(2) / 15.0         # ~15 min maturation
mu      = np.log(2) / 60.0         # growth dilution for 60-min doubling (set 0 for cell-free)

# ODEs
def odes(t, y):
    m, Pn, Pa = y
    dm_dt  = k_tx_eff(t) - (delta_m + mu) * m
    T      = tl_inits(m)
    dPn_dt = T - (k_mat + delta_p + mu) * Pn
    dPa_dt = k_mat * Pn - (delta_p + mu) * Pa
    return [dm_dt, dPn_dt, dPa_dt]

# Solve 
t_span = (0.0, 600.0)
t_eval = np.linspace(*t_span, 1000)
y0 = [0.0, 0.0, 0.0]
sol = solve_ivp(odes, t_span, y0, t_eval=t_eval, rtol=1e-7, atol=1e-9)

t  = sol.t
m  = sol.y[0]
Pn = sol.y[1]
Pa = sol.y[2]
synth_rate = np.gradient(Pn + Pa, t)

# Robust peak/plateau detection 
# Peak rate 
peak_rate_idx = int(np.argmax(synth_rate))
rate_has_internal_peak = 0 < peak_rate_idx < len(t)-1

# Peak concentration 
peak_conc_idx = int(np.argmax(Pa))
conc_has_internal_peak = 0 < peak_conc_idx < len(t)-1

# Plateau: first time derivative falls below both an absolute and relative threshold
dPa_dt = np.gradient(Pa, t)
abs_eps = 0.5     # nM/min (tune)
rel_eps = 0.01*np.max(dPa_dt)  # 1% of max slope
thresh = max(abs_eps, rel_eps)

# Analytic calculations for peak active protein rate
m_ss  = k_tx_eff(t[-1]) / (delta_m + mu)
T_ss  = k_tl_max * m_ss / (K_M + m_ss)
Pn_ss = T_ss / (k_mat + delta_p + mu)
Pa_ss = (k_mat / (delta_p + mu)) * Pn_ss

eps = 0.02         # 98% plateau
t_min = 30.0       # ignore the first 30 min to avoid the t=0 artefact
mask = (t >= t_min) & (Pa >= (1.0 - eps) * Pa_ss)
plateau_idx = np.argmax(mask) if np.any(mask) else None

if plateau_idx is not None and mask[plateau_idx]:
    plateau_time = t[plateau_idx]
    print(f"≈{(1-eps)*100:.0f}% plateau by {plateau_time:.1f} min")
else:
    print("No ≥98% plateau within the simulated window.")

# Plot 
fig, ax1 = plt.subplots(figsize=(8,6))
ax2 = ax1.twinx()

p1, = ax1.plot(t, Pa, color='C0', label="Active protein (nM)")
p2, = ax2.plot(t, m,  color='C1', label="mRNA (nM)")
p3, = ax2.plot(t, synth_rate, color='C2', label="Protein accumulation rate (nM/min)")

# Markers instead of full-height vertical lines
if rate_has_internal_peak:
    ax1.scatter(t[peak_rate_idx], Pa[peak_rate_idx], marker='x', color='C2',
                label=f'Peak rate at {t[peak_rate_idx]:.1f} min')
if conc_has_internal_peak:
    ax1.scatter(t[peak_conc_idx], Pa[peak_conc_idx], marker='o', facecolors='none',
                edgecolors='C0', label=f'Peak conc. at {t[peak_conc_idx]:.1f} min')
elif plateau_idx is not None:
    ax1.scatter(t[plateau_idx], Pa[plateau_idx], marker='o', facecolors='none',
                edgecolors='C0', label=f'Plateau ≈ {t[plateau_idx]:.1f} min')
else:
    # still rising with no clear plateau—just note it
    ax1.text(t[-1]*0.55, Pa[-1]*0.85, "No peak/plateau in window", fontsize=9)

ax1.set_xlabel("Time (min)")
ax1.set_ylabel("Active protein (nM)")
ax2.set_ylabel("mRNA (nM) / Rate (nM/min)")

# Combine legends
lines, labels = ax1.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(lines+lines2, labels+labels2, loc="upper left")

plt.tight_layout()
plt.show()


print(f"mRNA half-life (min): {np.log(2)/delta_m:.2f}")
print(f"Protein half-life (min): {np.log(2)/delta_p:.2f}")
if rate_has_internal_peak:
    print(f"Peak synthesis rate at t = {t[peak_rate_idx]:.1f} min")
else:
    print("No internal peak in synthesis rate (monotonic within window).")
if conc_has_internal_peak:
    print(f"Peak active protein at t = {t[peak_conc_idx]:.1f} min")
elif plateau_idx is not None:
    print(f"Approaches plateau by ≈ {t[plateau_idx]:.1f} min (|dP/dt|<{thresh:.2f} nM/min)")
else:
    print("No peak/plateau reached within the simulated window.")
`;

const rRNACode = String.raw`
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt


# Transcript length & RNAP speed

L_nt = 1000                     # nt transcribed around/including the 18S region (tune if needed)
v_pol_nt_per_s  = 50.0          # E. coli RNAP elongation ~50 nt/s at 37 °C (order-of-mag)
v_pol_nt_per_min = v_pol_nt_per_s * 60.0


# Anderson (σ70) promoter choice
# RPU scales the initiation attempt rate

promoter = "J23100"             
RPU_table = {
    "J23119": 1.00,  # strong 
    "J23101": 1.20,  # stronger
    "J23105": 0.60,  # medium 
    "J23114": 0.40,  # weaker 
    "J23100": 1.50,  # very strong
}
RPU = RPU_table.get(promoter, 1.0)

# Effective "template concentration" in nM (plasmid copy, cell volume, etc)
TU_nM = 50.0                    # nM; tune to your copy number


k_tx_base = 20.0                # nM/min when RPU=1 (adjust)
k_tx_attempt = k_tx_base * RPU  # nM/min

# Occlusion cap: polymerase spacing from elongation
k_tx_occlusion = (v_pol_nt_per_min / L_nt) * TU_nM  # nM/min

def k_tx_eff(t):
    """Constitutive σ70 promoter: constant attempt rate, capped by occlusion."""
    return min(k_tx_attempt, k_tx_occlusion)


# Processing, assembly, and loss parameters

t12_pre    = 10.0               # min, precursor processing half-time
t12_mature = 600.0              # min, mature 18S stability (hours)

# conversion to first order rates
k_proc   = np.log(2) / t12_pre            # pre -> mature
delta_pre    = 0.02                        # 1/min, nonspecific precursor decay (tune)
delta_mature = np.log(2) / t12_mature      # 1/min, mature decay


# Growth dilution (in vivo)

mu = np.log(2) / 60.0           # 1/min, 60-min doubling (tune to your growth rate)


# ODE system

# y = [pre_rRNA, mature_18S, assembled_18S]  (all in nM)
def odes(t, y):
    pre, mat = y
    tx = k_tx_eff(t)                               # nM/min
    dpre_dt = tx - (k_proc + delta_pre + mu) * pre
    dmat_dt = k_proc * pre - (delta_mature + mu) * mat
    return [dpre_dt, dmat_dt]


# Solve

t_span = (0.0, 600.0)            # minutes
t_eval = np.linspace(*t_span, 1000)
y0 = [0.0, 0.0]
sol = solve_ivp(odes, t_span, y0, t_eval=t_eval, rtol=1e-7, atol=1e-9)

t   = sol.t
pre = sol.y[0]
mat = sol.y[1]


# Analytic solutions for steady states

tx_ss  = k_tx_eff(t[-1])
pre_ss = tx_ss / (k_proc + delta_pre + mu)
mat_ss = (k_proc * pre_ss) / (delta_mature + mu) if (delta_mature + mu) > 0 else np.nan


# Plateau detection (98%), robust

def plateau_time(trace, ss_value, t, eps=0.02, t_min=10.0):
    """Return first time reaching ≥(1-eps)*steady state, ignoring early transients."""
    if not np.isfinite(ss_value) or ss_value <= 0:
        return None
    mask = (t >= t_min) & (trace >= (1.0 - eps) * ss_value)
    return t[np.argmax(mask)] if np.any(mask) else None

mat_plateau = plateau_time(mat, mat_ss, t, eps=0.02, t_min=10.0)

# Plot

plt.figure(figsize=(8,6))
plt.plot(t, pre, label="pre-rRNA (nM)")
plt.plot(t, mat, label="mature 18S rRNA (nM)")


# Mark plateau points
if mat_plateau is not None:
    plt.scatter(mat_plateau, np.interp(mat_plateau, t, mat),
                facecolors='none', edgecolors='k', label=f"≥98% plateau (mature) @ {mat_plateau:.1f} min")

plt.xlabel("Time (min)")
plt.ylabel("Concentration (nM)")
plt.title(f"18S rRNA expression with Anderson promoter {promoter} (RPU={RPU:.2f})")
plt.legend()
plt.tight_layout()
plt.show()

print(f"Promoter: {promoter} (RPU={RPU:.2f})")
print(f"Effective transcription k_tx (nM/min): {tx_ss:.2f} (attempt {k_tx_attempt:.2f}, occlusion cap {k_tx_occlusion:.2f})")
print(f"Steady states (nM): pre*={pre_ss:.1f}, mature18S*={mat_ss:.1f}")
if mat_plateau is not None:
    print(f"≥98% plateau (mature 18S) by ≈ {mat_plateau:.1f} min")
else:
print("No ≥98% plateau for mature 18S within the simulated window.")

`;

type CopyStatus = "idle" | "copied" | "failed";
type CopyKey = "lamp" | "fusion" | "rrna";

export const Model = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copyStatuses, setCopyStatuses] = useState<Record<CopyKey, CopyStatus>>(
    {
      lamp: "idle",
      fusion: "idle",
      rrna: "idle",
    }
  );
  const copyResetRefs = useRef<
    Record<CopyKey, ReturnType<typeof setTimeout> | null>
  >({
    lamp: null,
    fusion: null,
    rrna: null,
  });

  const clearPendingReset = useCallback((key: CopyKey) => {
    const timeoutId = copyResetRefs.current[key];
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      copyResetRefs.current[key] = null;
    }
  }, []);

  const scheduleReset = useCallback(
    (key: CopyKey) => {
      clearPendingReset(key);
      copyResetRefs.current[key] = setTimeout(() => {
        setCopyStatuses((prev) => ({
          ...prev,
          [key]: "idle",
        }));
        copyResetRefs.current[key] = null;
      }, 2000);
    },
    [clearPendingReset]
  );

  const handleCopyCode = useCallback(
    async (key: CopyKey, code: string) => {
      const fallbackCopy = () => {
        if (typeof document === "undefined") {
          throw new Error("Clipboard unavailable");
        }

        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      };

      let copied = false;

      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(code);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        try {
          fallbackCopy();
          copied = true;
        } catch {
          setCopyStatuses((prev) => ({
            ...prev,
            [key]: "failed",
          }));
          scheduleReset(key);
          return;
        }
      }

      setCopyStatuses((prev) => ({
        ...prev,
        [key]: "copied",
      }));
      scheduleReset(key);
    },
    [scheduleReset]
  );

  // Refs for main sections
  const introRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLElement>(null);
  const rtRef = useRef<HTMLElement>(null);
  const fusionRef = useRef<HTMLElement>(null);
  const rRNARef = useRef<HTMLElement>(null);
  const profReview = useRef<HTMLElement>(null);

const sections = [
      { id: "introduction", ref: introRef },
      { id: "lamp", ref: lampRef },
      { id: "fusion", ref: fusionRef },
      { id: "rt", ref: rtRef },
      { id: "rRNA", ref: rRNARef },
      { id: "review", ref: profReview },
    ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCopyLabel = (key: CopyKey) => {
    const status = copyStatuses[key];
    if (status === "copied") {
      return "Copied!";
    }

    if (status === "failed") {
      return "Copy failed";
    }

    return "Copy code";
  };

  const getCopyButtonClass = (key: CopyKey) => {
    const status = copyStatuses[key];
    return `copy-code-button${status === "copied" ? " copied" : ""}${status === "failed" ? " failed" : ""}`;
  };

  return (
    <div className="project-page-wrapper model-page">
      {/* Sidebar navigation */}
      <nav className="sidebar-nav">
        <ul>
          <li className={activeSection === "introduction" ? "active" : ""}>
            <a href="#introduction">Introduction</a>
          </li>
          <li className={activeSection === "lamp" ? "active" : ""}>
            <a href="#lamp">Modelling LAMP</a>
          </li>
          <li className={activeSection === "fusion" ? "active" : ""}>
            <a href="#fusion">Fusion Protein</a>
          </li>
          <li className={activeSection === "rt" ? "active" : ""}>
            <a href="#rt">Reverse Transcriptase</a>
          </li>
          <li className={activeSection === "rRNA" ? "active" : ""}>
            <a href="#rRNA">18s rRNA</a>
          </li>
          <li className={activeSection === "review" ? "active" : ""}>
            <a href="#review">Feedback </a>
          </li>
        </ul>
      </nav>

      <main className="project-content">
        {/* Introduction */}
        <section
          id="introduction"
          ref={introRef}
          className="project-context-wrapper"
        >
          <h1 className="education-intro-title">Introduction</h1>
          <p className="project-description">
            In our mathematical modelling section, we cover the expression of
            fusion protein, 18s rRNA, the activity of reverse transcriptase, and
            the LAMP reaction using ordinary differential equations similar to
            PCR.
          </p>
        </section>

        {/* LAMP */}
        <section id="lamp" ref={lampRef} className="project-context-wrapper">
          <h1 className="education-intro-title">Modelling LAMP</h1>
          <p className="project-description">
            We describe a novel method of using ODE's from first principle LAMP
            kinetics to predict the change of concentration of LAMP reagents
            over time and the time to color change with HNB dye. This model
            informs our test kit design, such as duration of heating required,
            initial Mg²⁺ concentration, and primer concentrations. It also helps
            us to understand the exponential nature of LAMP amplification and
            the effect of different parameters on the reaction kinetics.
          </p>

          <CollapsibleItem title="Variables">
            <li>
              C [<InlineMath math="\mu M" />
              ]: active replicators (dumbbells/looped amplicons). This is the
              population that autocatalyzes LAMP.
            </li>
            <li>
              L [<InlineMath math="\mu M \space nt" />
              ]: cumulative nucleotides incorporated into DNA (book-keeping for
              PPi/Mg²⁺ and product growth).
            </li>
            <li>
              {" "}
              <InlineMath math="P_{\text{in}}" /> [<InlineMath math="\mu M" />
              ]: inner primer pool (FIP+BIP).
            </li>
            <li>
              {" "}
              <InlineMath math="P_{\text{loop}}" /> [<InlineMath math="\mu M" />
              ]: loop primer pool (LF+LB).
            </li>
            <li>
              N [<InlineMath math="\mu M \space nt" />
              ]: available dNTPs expressed as total nucleotides.
            </li>
            <li>
              T [<InlineMath math="\mu M" />
              ]: seed template{" "}
            </li>
          </CollapsibleItem>

          <CollapsibleItem title="Parameters">
            <ul>
              <li>
                <InlineMath math="k_{\text{init}}" /> [
                <InlineMath math="\mu M^{-1} s^{-1}" />] : initiation rate
              </li>
              <li>
                <InlineMath math="k_{\text{cycle}}" /> [
                <InlineMath math="\mu M^{-1} s^{-1}" />] : autocycling rate
                (depends on C and loop primers)
              </li>
              <li>
                T [<InlineMath math="\mu M" />] : template concentration (fixed
                tiny seed)
              </li>
              <li>
                <>
                  <InlineMath math="v_{\text{len}}" />
                </>{" "}
                [
                <InlineMath math="\mu M \space nt \space s^{-1} \space per \space \mu M \space C" />
                ] : elongation demand per replicator
              </li>
              <li>
                <InlineMath math="k_{\text{cat}}" /> [
                <InlineMath math="s^{-1}" />
                ], <InlineMath math="E" /> [<InlineMath math="\mu M" />] :
                enzyme catalytic cap (<InlineMath math="V_{\text{max}}" /> ={" "}
                <InlineMath math="k_{\text{cat}} \cdot E" />)
              </li>
              <li>
                <InlineMath math="K_{\text{cap}}" /> [
                <InlineMath math="\mu M \space nt \space s^{-1}" />] : softness
                of throughput cap (~
                <InlineMath math="V_{\text{max}}" />)
              </li>
              <li>
                <InlineMath math="\alpha_{\text{in}}" /> = 2,{" "}
                <InlineMath math="\alpha_{\text{lp}}" /> = 1 : primers consumed
                per event
              </li>
              <li>
                <InlineMath math="K_{\text{n}}" /> [
                <InlineMath math="\mu M \space nt" />
                ], <InlineMath math="K_{\text{p}}" /> [
                <InlineMath math="\mu M" />] : soft saturation constants to gate
                low pools
              </li>
              <li>
                <InlineMath math="L_0" /> [<InlineMath math="nt" />] : effective
                "work" per new replicator
              </li>
              <li>
                <InlineMath math="E" /> [<InlineMath math="\mu M" />] : total
                concentration of Bst polymerase{" "}
              </li>
              <li>
                <InlineMath math="Mg_{50}" /> [<InlineMath math="\mu M" />] –
                HNB midpoint: the free-Mg level where the model calls the color
                “half blue”.
              </li>
              <li>
                Lower <InlineMath math="Mg_{50}" /> → earlier flip; higher{" "}
                <InlineMath math="Mg_{50}" /> → later flip.
              </li>
              <p>
                LAMP simulation with replicator-driven kinetics,
                enzyme-throughput cap, separate primer pools (with
                stoichiometry), and an empirical HNB/Mg²⁺ model. Plots:
                amplified nucleotides (linear + semilog), effective free Mg²⁺,
                and an HNB "blue index" curve with the color-change time marked.
              </p>
            </ul>
          </CollapsibleItem>

          <CollapsibleItem title="Assumptions">
            <p>
              <strong>
                1. dNTPs are non-limiting over the time window of interest
              </strong>
            </p>
            <p>
              We run our LAMP reaction with typical dTNP concentrations (1.4 mM
              each, total = 5.6 mM nucleotides). The kinetic terms are gated by
              a soft factor:
            </p>
            <BlockMath math="g_N(N) = \frac{N}{K_N + N}" />
            <p>
              so polymerization remains essentially independent of N while N ≫
              KN, and only rolls off if N is actually depleted in the late
              stages of the reaction. Instead of using a hard min/max function
              we avoid making an undifferentiatable ODE by keeping derivatives
              smooth near depletion.
            </p>
            <p>
              <strong>
                Bst polymerase activity is effectively constant over ~1 h
              </strong>
            </p>
            <p>
              Thermal decay and inhibitor effects are neglected in the model.
            </p>
            <p>
              <strong> Primer pools and stoichiometry</strong>
            </p>
            <p>
              Inner and loop primers are tracked separately. Each successful
              initiation consumes ~2 inner primers; each loop-primed elongation
              consumes ~1 loop primer. Soft primer gates prevent negative primer
              inventories.
            </p>
            <p>
              <strong> Mg²⁺/HNB is empirical</strong>
            </p>
            <p>
              Free Mg²⁺ falls as PPi accumulates (one PPi per incorporated
              nucleotide). Exact speciation is buffer-dependent, so we use an
              effective model:
            </p>
            <BlockMath math="\mathrm{Mg}_{\text{free}}(t) = \underbrace{\big( \mathrm{Mg}_{\text{tot}} - \eta_{\text{NTP}} N_0 \big)}_{\text{effective free at $t=0$}}- \gamma_{\text{ppi}} \cdot \mathrm{PPi}(t),\qquad \text{with } \mathrm{PPi}(t) \approx L(t)." />

            <p>
              HNB’s perceived color is mapped by a logistic “blue index” vs{" "}
              <InlineMath math="\mathrm{Mg}_{\text{free}}" /> with midpoint{" "}
              <InlineMath math="Mg_{50}" />. This is because the color flip
              threshold isn’t universal; it depends on buffer/dye conditions.
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Table of Variables and Parameters">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Parameter
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Symbol (unit)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Our value
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Literature benchmark (with link)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    How close?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Initiation rate (primer anneal/strand invasion)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="k_{\text{init}}" /> (
                    <InlineMath math="µM⁻¹ s⁻¹" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    2.0×10⁻⁵
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Solution-phase oligo hybridization{" "}
                    <InlineMath math="k_{\text{on}} ≥10⁶ M⁻¹ s⁻¹ ≈1 µM⁻¹ s⁻¹" />
                    ; Wetmur’s low-salt fit ≈ 0.35{" "}
                    <InlineMath math="µM⁻¹ s⁻¹" />. LAMP studies indicate
                    initiation is rate-limiting.
                    <a href="https://example.com">[1]</a>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    5×10⁴–5×10⁶× slower (effective for strand-invasion
                    bottleneck)
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Autocycling (loop-primer driven)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <>
                      <InlineMath math="k_{\text{cycle}}" /> (
                      <>
                        <InlineMath math="µM⁻¹ s⁻¹" />
                      </>
                      )
                    </>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    0.10
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Oligo hybridization <InlineMath math="k_{\text{on}}" />{" "}
                    ~0.35–1 <InlineMath math="µM⁻¹ s⁻¹" />.
                    <a href="https://example.com">[2]</a>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    0.1–0.29× of typical solution{" "}
                    <InlineMath math="k_{\text{on}}" />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Polymerase catalytic constant (per nt)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="k_{\text{cat}}" /> (
                    <InlineMath math="s⁻¹" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    40
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Bst-LF strand displacement <InlineMath math="≈" /> 125 nt
                    s⁻¹ → <InlineMath math="k_{\text{cat}}" /> per nt ≈125 s⁻¹.{" "}
                    <a href="https://example.com">[3]</a>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    0.32× of Bst-LF speed (conservative)
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleItem>

          <CollapsibleItem title="Stage 1- Primer binding and initial extension (both directions)">
          <p>For every modelling project, we take a first-principles approach to all our modelling work; building up complex ODEs from basic biochemical principles and the mechanics of the underlying reaction.</p>
            <p> Bio-chemical reaction for primer binding and initial extension:</p>
            <p>Primer + DNA + Bst + dNTP + Mg²⁺ → Extended DNA + PPi + H⁺</p>
            <p>Rate of initiation of new replicators: </p>
            <BlockMath math="r_{\text{init}} = k_{\text{init}} \cdot T \cdot P_{in} \cdot g_{P}(P_{\text{in}})" />
            <p>
              Which uses the function <InlineMath math="g_{P}" />:
            </p>
            <BlockMath math="g_{P}(P) = \frac{P}{K_{P} + P}" />
            <p>
              This function keeps rates smooth and non-negative as primers fall.{" "}
              <InlineMath math="R_{\text{init}}" /> is calculated with the
              initiation rate (<InlineMath math="k_{\text{init}}" />
              ), the concentration of the template (<InlineMath math="T" />
              ), the concentration of inner primers and the smoothening function
              to prevent a rate of 0 when primers decrease. It outputs a
              dimensionless scaling factor (between 0 and 1) that we multiply
              into the raw reaction rates. <InlineMath math="K_{P}" /> is the
              half-effective primer level.
            </p>
            <p>This step consumes inner primers:</p>
            <BlockMath math="\frac{dP_{in}}{dt}\ = -\alpha_{in} \cdot r_{\text{init}}, \space \alpha_{in} \approx 2" />
            <p>This step also contributes to the demand for new replicators:</p>
            <BlockMath math="\frac{dC}{dt}\Big|_{\text{demand}} = r_{\text{init}}" />
          </CollapsibleItem>
          <CollapsibleItem title="Stage 2 - Outer-primer displacement/loop formation (both directions)">
            <p>Bio–Chemical reaction:</p>
            <p>
              Extended DNA + Primer + Bst + dNTP → Displaced product + Looped
              DNA + PPi + H⁺
            </p>
            <p>Model term (autocycling via loop primers):</p>
            <BlockMath math="r_{\text{cycle}} = k_{\text{cycle}} \cdot C \cdot P_{\text{loop}} \cdot g_{P}(P_{\text{loop}}) \space \space \space \space [\mu M \space s^{-1}]" />
            <p>
              The same <InlineMath math="g_{P}" /> function is used, this time
              for loop primers. Again, the rate is calculated by finding the
              rate of autocycling, the concentration and the concentration of
              active replicators and the concentration of loop primers.
            </p>

            <p>
              This step consumes loop primers (assuming 1 looped primer is
              used):{" "}
              <BlockMath math="\frac{dP_{loop}}{dt} = -\alpha_{loop} \cdot r_{\text{cycle}}, \space \alpha_{loop} \approx 1" />
            </p>

            <p>
              {" "}
              Adds to the previous replicator demand:{" "}
              <BlockMath math="\frac{dC}{dt}\Big|_{\text{demand}} += r_{\text{cycle}}" />
            </p>
            <p>
              We cap the actual replicator formation by the enzyme’s throughput
              budget (each new C costs about <InlineMath math="L_{0}" /> nt of
              “work”):
              <BlockMath math="C_{\text{max}} = \frac{V_{\text{max}}}{L_{0}}, \space \space \space \space \frac{dC}{dt}\Big|_{\text{max}} = \frac{ C_{\text{max}} \cdot (r_{\text{init}} + r_{\text{cycle}})}{C_{\text{max}} + (r_{\text{init}} + r_{\text{cycle}})}" />
            </p>
            <p>
              The rate at which the Bst polymerase can extend the extended DNA
              products (how many nucleotides can be added per second) is the
              limiting factor for the rate at which new active replicators are
              made. The rate of the enzyme is calculated with{" "}
              <InlineMath math="V_{\text{max}} = k_{\text{cat}} \cdot E" /> and
              dividing the rate by the nucleotide length gives{" "}
              <InlineMath math="C_{\text{max}}" />.{" "}
              <InlineMath math="C_{\text{max}}" /> is the hard upper bound: the
              polymerase cannot create new replicators faster than this, no
              matter how many primers or templates there are. However, enforcing
              a hard cap like{" "}
              <InlineMath math=" \frac{dC}{dt} = \min(dC_{\text{dem}}, C_{\text{max}}) \space" />
              would be mathematically fine but non-smooth at the corner (bad for
              stiff solvers). So, to get the same behavior but smooth, we use a
              saturating “rectangular hyperbola” which uses the formula above.
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Stage 3 - Cycling amplification via stem-loop extension">
            <p>
              Bio-Chemical reaction:
              <br />
              Looped DNA + Primer + Bst + dNTP + Mg²⁺ → Branched DNA + PPi + H⁺
            </p>

            <p>
              Elongation “demand” is proportional to number of replicators:
              <BlockMath math="R_{\text{dem}} = v_{\text{len}} \cdot C \cdot g_{N}(N) \space \space \space \space [\mu M \space nt \space s^{-1}]" />
            </p>
            <p>
              gN being:
              <BlockMath math="g_{N}(N) = \frac{N}{K_{N} + N}" />
            </p>

            <p>
              This function keeps rates smooth and non-negative as dNTPs fall.
              KN​ is the half-effective dNTP level.
            </p>

            <p>
              Throughput-capped polymerization (MM-like):
              <BlockMath math="V_{\text{max}} = k_{\text{cat}} \cdot {E} \space \space \space \space \space R = \frac{V_{\text{max}} \cdot R_{\text{dem}}}{K_{\text{cap}} + R_{\text{dem}}} \space \space \space \space [\mu M \space nt \space s^{-1}]" />
            </p>
            <p>
              The rate of cycling amplification (<InlineMath math="R" />) is
              again capped by the maximum rate of nucleotide addition by the Bst
              polymerases.
            </p>

            <p>
              The rate of cumulative dNTP incorporation is increased at{" "}
              <InlineMath math="R" /> and the rate of available dTNPs is
              decreased by <InlineMath math="R" />:
              <BlockMath math="\frac{dL}{dt} = R \space, \space \space \space \space \space \frac{dN}{dt} = -R" />
            </p>

            <p>
              Each incorporated nt produces PPi, which drives Mg²⁺ depletion
              used by the dye model:
              <BlockMath math="\mathrm{PPi}(t) \approx L(t) \space \space \space \space \space \mathrm{Mg}_{\text{free}}(t) = \big( \mathrm{Mg}_{\text{tot}} - \eta_{\text{NTP}} N_0 \big)- \gamma_{\text{ppi}} \cdot L(t)" />
            </p>

            <p>
              Color (HNB) is mapped by a logistic against Mgfree:
              <>
                <BlockMath math="\text{BlueIndex}(t) = \frac{1}{1 + e^{\frac{-(\mathrm{Mg}_{50} - \mathrm{Mg}_{\text{free}}(t))}{\omega}}}" />
              </>
            </p>

            <p>
              The color change takes place when the BlueIndex crosses 0.5 (i.e.{" "}
              <InlineMath math="\mathrm{Mg}_{\text{free}} = \mathrm{Mg}_{50}" />
              )
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Solver">
            <p>
              The classic RK4 (Runge-Kutta) uses 4 slopes (k1…k4) to achieve
              4th-order accuracy for a non-stiff ODE. It is a robust method, but
              it uses a fixed step and can struggle on stiff problems, where
              fast and slow processes coexist, like in this system here.
            </p>

            <p>
              This LAMP system is stiff: initiation and primer gates are slow,
              but enzyme-capped elongation can be fast; once cycling starts,
              rates change by orders of magnitude. RK4 would require tiny
              timesteps to remain stable and accurate which would take lots of
              time to compute.
            </p>

            <p>
              We decided to switch to LSODA as it automatically switches between
              a non-stiff Adams method, and a stiff backward differentiation
              method based on the stiffness that it detects. We set tight
              tolerances (rtol=1e-8, atol=1e-12) to keep mass-balance and
              switching clean. This gives us RK-like accuracy in easy regions
              and implicit-method stability when the system stiffens.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title=" An more intuitive explanation of the model">
            <p>
              We calculate the rate of inner-primer-gated initiation,
              loop-primer-gated cycling and dNTP-gated elongation demand with
              the three following equations:
              <BlockMath math="r_{\text{init}} = k_{\text{init}} \cdot T \cdot P_{in} \cdot g_{P}(P_{\text{in}})" />
              <BlockMath math="r_{\text{cycle}} = k_{\text{cycle}} \cdot C \cdot P_{\text{loop}} \cdot g_{P}(P_{\text{loop}})" />
              <BlockMath math="R_{\text{dem}} = v_{\text{len}} \cdot C \cdot g_{N}(N)" />
            </p>

            <p>
              These equations all use the gN or gP gate equations to smooth the
              rates. These rates are then plugged into the ODE’s to get the
              rates. These ODE’s are then solved with iterative solvers and
              their results are plotted.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Important notes">
            <p>We created a realistic enzyme by using the following logic:</p>

            <p>
              If demand is small, <InlineMath math="R \approx R_{\text{dem}}" />{" "}
              (unsaturated); if demand is large,{" "}
              <InlineMath math="R \to V_{\text{max}}R" />. Likewise{" "}
              <InlineMath math="\frac{dC}{dt}" /> can never exceed{" "}
              <InlineMath math="\frac{V_{\text{max}}}{L_0}" /> as the rate of
              the enzymes becomes the limiting factor.
            </p>

            <p>
              Physiology of LAMP: growth is driven by replicator count C (the
              autocatalytic species), not by the total DNA already made.
            </p>

            <p>
              Mass balance on nucleotides: <InlineMath math="L = -N" />. Total
              synthesized nt equals the total nt consumed.
            </p>

            <p>
              Primer realism: inner and loop primers deplete separately; when
              either pool is low, <InlineMath math="\frac{g_P}{g_N} \to 0" />,
              i.e., it smoothly throttles the corresponding pathway.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Numerical Results">
            <p>
              Initial effective free{" "}
              <InlineMath math="Mg^{2+} \approx 2.40 \, mM" />
            </p>
            <p>
              Final amplified nucleotides (L) ={" "}
              <InlineMath math="632.7 \space \mu M" />
            </p>
            <p>
              Final fold amplification (60 min) ={" "}
              <InlineMath math="4.76^{12}" />
            </p>
            <p>
              HNB color change at <InlineMath math="40.60" /> min
            </p>
            <p>
              Fold amplification at color change ={" "}
              <InlineMath math="3.01^{12}" />
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Results for our model">
            <img
              className="modelling_image"
              src={
                "https://static.igem.wiki/teams/5602/mathmodeling/lamp-amplifieddnaconcentrationovertime.webp"
              }
              alt={"LAMP - Amplified DNA concentration over time"}
            />
            <img
              className="modelling_image"
              src={
                "https://static.igem.wiki/teams/5602/mathmodeling/lamp-amplifieddnaconcentrationovertime-semilog.webp"
              }
              alt={"LAMP - Amplified DNA concentration over time (semilog)"}
            />
            <img
              className="modelling_image"
              src={
                "https://static.igem.wiki/teams/5602/mathmodeling/lamp-freemg2-concentrationovertime.webp"
              }
              alt={"LAMP - Free Mg²⁺ concentration over time"}
            />
            <img
              className="modelling_image"
              src={
                "https://static.igem.wiki/teams/5602/mathmodeling/lamp-hnbresponse-empirical.webp"
              }
              alt={"LAMP - HNB response (empirical)"}
            />
          </CollapsibleItem>
          <CollapsibleItem title="Code">
            <div className="code-block-wrapper">
              <button
                type="button"
                className={getCopyButtonClass("lamp")}
                onClick={() => {
                  void handleCopyCode("lamp", lampSimulationCode);
                }}
              >
                {getCopyLabel("lamp")}
              </button>
              <pre className="code-block">
                <code>{lampSimulationCode}</code>
              </pre>
            </div>
          </CollapsibleItem>
          <CollapsibleItem title="References">
            <p>
              [1]
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9508827/"
                target="_blank"
              >
                https://pmc.ncbi.nlm.nih.gov/articles/PMC9508827/
              </a>
            </p>
            <p>
              [2]
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3059733/"
                target="_blank"
              >
                https://pmc.ncbi.nlm.nih.gov/articles/PMC3059733/
              </a>
            </p>
            <p>
              [3]
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9841402/"
                target="_blank"
              >
                https://pmc.ncbi.nlm.nih.gov/articles/PMC9841402/
              </a>
            </p>
            <p>
              [4]
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10520511/"
                target="_blank"
              >
                https://pmc.ncbi.nlm.nih.gov/articles/PMC10520511/
              </a>
            </p>
            <p>
              [5]
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9138685/"
                target="_blank"
              >
                https://pmc.ncbi.nlm.nih.gov/articles/PMC9138685/
              </a>
              — good model for the dumbbell stage of the reaction.
            </p>
          </CollapsibleItem>
        </section>

        <section
          id="fusion"
          ref={fusionRef}
          className="project-context-wrapper"
        >
          <h1 className="education-intro-title">
            T7-Driven Bst Fusion Protein
          </h1>
          <p className="project-description">
            We describe a T7 promoter controlled production pipeline for the Bst
            fusion enzyme by tracking transcripts, nascent polypeptides, and the
            mature active protein. The model captures inducer-dependent
            transcription, capacity-limited translation, maturation, and loss
            processes in a single ODE framework.
          </p>

          <CollapsibleItem title="Fusion Protein Variables">
            <p>
              <InlineMath math="m(t)" />: concentration of Bst fusion mRNA
              produced from the plasmid template.
            </p>

            <p>
              <InlineMath math="P_n(t)" />: nascent (immature) fusion protein
              that has not yet folded into the active conformation.
            </p>

            <p>
              <InlineMath math="P_a(t)" />: active, mature fusion protein
              available to drive downstream reactions.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Parameters">
            <ul>
              <li>
                <InlineMath math="\delta_m" />: net mRNA degradation rate
                constant.
              </li>
              <li>
                <InlineMath math="\delta_p" />: degradation rate shared by
                nascent and mature proteins.
              </li>
              <li>
                <InlineMath math="\mu" />: growth dilution term that removes all
                species proportionally to cell division.
              </li>
              <li>
                <InlineMath math="k_{\text{mat}}" />: maturation or folding rate
                for converting <InlineMath math="P_n" /> to{" "}
                <InlineMath math="P_a" />.
              </li>
              <li>
                <InlineMath math="k_{\text{tx,init}}" />: maximal transcription
                initiation flux at full induction (<InlineMath math="nM" /> per
                minute).
              </li>
              <li>
                <InlineMath math="k_{\text{tl,max}}" />: translation capacity
                limit that caps <InlineMath math="T(m)" /> at high mRNA loads.
              </li>
            </ul>
          </CollapsibleItem>

          <CollapsibleItem title="Table of Variables and Parameters">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Parameter + meaning.
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Symbol (unit)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Our value
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Literature benchmark (with link)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    How close?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Transcript length (construct-specific)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    L (nt)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    2400
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    — (sequence defined)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    N/A
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    T7 RNAP elongation speed
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    v (nt/s)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    240
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    ≈230 nt/s at 37 °C (
                    <a
                      href="https://academic.oup.com/nar/article-pdf/19/17/4639/3970495/19-17-4639.pdf"
                      target="_blank"
                    >
                      Pavco &amp; Steege, 1991
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    +4%
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    IPTG EC50 for promoter induction (Hill midpoint)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    K<sub>IPTG</sub> (µM)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    66
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Example EC50 ≈ 66 µM (lac-based cascade) (
                    <a
                      href="https://academic.oup.com/nar/article-pdf/44/3/e21/25346122/gkv912.pdf"
                      target="_blank"
                    >
                      Morra et al., 2016
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Match
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Hill coefficient for promoter response
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    n (—)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    2.0
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Effective n often ≈1–2 (depends on LacI/operator) (
                    <a
                      href="https://gchure.github.io/phd/chapter_06/"
                      target="_blank"
                    >
                      Chure, PhD Chap. 6
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Within range
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Inducer concentration used
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    IPTG (µM)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    1000
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Commonly 1 mM in vivo examples (
                    <a
                      href="https://academic.oup.com/nar/article-pdf/44/3/e21/25346122/gkv912.pdf"
                      target="_blank"
                    >
                      Morra et al., 2016
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Match (1 mM)
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Full-induction transcription flux (attempt; aggregated)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    k<sub>tx_init_full</sub> (nM/min)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    30
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Spacing cap at 5 nM DNA: ≈30 nM/min (v≈230–240 nt/s; L=2400
                    nt) [
                    <a
                      href="https://academic.oup.com/nar/article-pdf/19/17/4639/3970495/19-17-4639.pdf"
                      target="_blank"
                    >
                      T7 speed
                    </a>
                    ,
                    <a
                      href="https://noireauxlab.org/html%20pages/docs%20website/publications/Marshall%20et%20al%20-%202018B.pdf"
                      target="_blank"
                    >
                      5 nM DNA
                    </a>
                    ]
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Match (cap)
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Active promoter-bearing templates (DNA)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    TU (nM)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    5.0
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    TXTL protocols recommend ≈5 nM plasmid (
                    <a
                      href="https://noireauxlab.org/html%20pages/docs%20website/publications/Marshall%20et%20al%20-%202018B.pdf"
                      target="_blank"
                    >
                      Marshall et al., 2018
                    </a>
                    ;
                    <a
                      href="https://www.noireauxlab.org/html%20pages/docs%20website/publications/Garamella%20et%20al%20-%202019A.pdf"
                      target="_blank"
                    >
                      Garamella et al., 2019
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Match
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Max translation rate (saturation, m ≫ K<sub>M</sub>)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    k<sub>tl_max</sub> (nM/min)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    150
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Measured ≈0.5 nM/s (30 nM/min) at 1 nM DNA in TXTL (
                    <a
                      href="https://www.nature.com/articles/s41598-019-48468-8"
                      target="_blank"
                    >
                      Marshall et al., 2019
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    +400% vs 30
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Translation MM constant (ribosome–mRNA term)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    K<sub>M</sub> (nM)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    100
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    In vitro 70S ≈23 nM; TXTL fits 10–66 nM (
                    <a
                      href="https://www.nature.com/articles/s41598-019-48468-8"
                      target="_blank"
                    >
                      Marshall et al., 2019
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    +~335% vs 23
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    mRNA decay rate (= ln2 / τ<sub>m</sub>)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    δ<sub>m</sub> (min⁻¹)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    ln2/5 → τ ≈ 5 min
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    E. coli mRNA half-lives mostly 3–8 min (
                    <a
                      href="https://www.pnas.org/doi/10.1073/pnas.112318199"
                      target="_blank"
                    >
                      Bernstein et al., 2002
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    On target
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Protein loss (degradation+dilution) half-life
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    τ<sub>p</sub> (h)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    10 h (δ<sub>p</sub>=ln2/600 min)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Most accumulating proteins 5–20 h half-life (
                    <a
                      href="https://bionumbers.hms.harvard.edu/bionumber.aspx?id=109920"
                      target="_blank"
                    >
                      BioNumbers BNID 109920
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Within range
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Fluorescent protein maturation half-time (if FP tag)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    t<sub>½,mat</sub> (min)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    15
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    sfGFP ≈5–12 min; mCherry ≈40 min (
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5765880/"
                      target="_blank"
                    >
                      Balleza et al., 2018
                    </a>
                    ;
                    <a
                      href="https://www.nature.com/articles/nmeth.2120"
                      target="_blank"
                    >
                      Doerr, 2012
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    +~30% vs sfGFP 11.5 min
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Growth dilution rate (μ = ln2 / doubling time)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    μ (min⁻¹)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    ln2/60
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Definition: μ = ln2 / T<sub>d</sub>(
                    <a
                      href="https://en.wikipedia.org/wiki/Doubling_time"
                      target="_blank"
                    >
                      Doubling time
                    </a>
                    )
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Definition match
                  </td>
                </tr>

                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Induction start time
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    t<sub>induce</sub> (min)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    0
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Experiment-defined
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    N/A
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleItem>

          <CollapsibleItem title="Rate Definitions">
            <strong>Promoter (induction)</strong>
            <p>
              Induction follows a T7 Hill response, producing an attempted
              transcription flux that scales between 0 and 1 with the fully
              induced initiation rate at 1. The effective polymerase throughput
              is limited by how quickly elongating RNAPs can vacate the
              template.
              <BlockMath math="f_{\text{prom}}(IPTG) = \frac{IPTG^n}{K^n + IPTG^n} \in [0, 1]" />
            </p>
            <strong>
              Translation (capacity-limited Michaelis–Menten form)
            </strong>
            <p>
              The translation initiation flux <InlineMath math="T(m)" /> follows
              a Michaelis–Menten form equation. It is approximately linear for
              low
              <InlineMath math="m \ll K_M" /> and asymptotically approaches the
              capacity ceiling <InlineMath math="k_{tl,max}" /> as{" "}
              <InlineMath math="m" /> increases, reflecting finite ribosome and
              initiation-factor availability. The following equation gives the
              full equation in Michaelis-Menten form.
              <BlockMath math="T(m) = \frac{k_{tl,max} \cdot m}{K_{M} + m} \space \space \space [nMmin^{-1}]" />
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="How the Equations Were Formed">
            <p>
              These notes trace each biochemical step in the production of the
              Bst fusion protein to the terms used in the ODE model.
            </p>
            <strong>Transcription</strong>
            <p>
              Plasmid templates are transcribed by T7 RNA polymerase at the
              effective transcription rate. That rate depends on promoter
              induction.
              <BlockMath math="\text{Transcription}: \space \space \varnothing \xrightarrow{k_{\text{tx,eff}}} m" />
            </p>
            <strong>mRNA Degradation</strong>
            <p>
              Synthesised transcripts are removed through their intrinsic decay
              constant m and the dilution rate mu associated with cell growth.
              <BlockMath math="\text{mRNA loss}: \space \space m \xrightarrow{\delta_m + \mu} \varnothing" />
            </p>
            <strong>Translation</strong>
            <p>
              Newly transcribed mRNA is translated into nascent protein at the
              T(m) flux. The Michaelis–Menten form captures both the linear,
              ribosome-rich regime and the saturating regime where ribosomes are
              the bottleneck and the rate approaches{" "}
              <InlineMath math="k_{\text{tl,max}}" />.{" "}
            </p>
            <BlockMath math="\text{Translation}: \space \space m \xrightarrow{T(m)} P_n \space \space \text{where} \space \space T(m) = \frac{k_{\text{tl,max}} \cdot m}{K_M + m}" />
            <strong>Protein Maturation</strong>
            <p>
              Nascent chains fold into the active fusion enzyme at{" "}
              <InlineMath math="k_{\text{mat}}" /> , transferring material from{" "}
              <InlineMath math="P_n(t)" /> to <InlineMath math="P_a(t)" />. This
              maturation pathway sets the delay between translation and active
              enzyme accumulation.
              <BlockMath math="\text{Maturation}: \space \space P_n \xrightarrow{k_{\text{mat}}} P_a" />
            </p>
            <strong>Protein Degradation</strong>
            <p>
              Both nascent and mature protein pools are subject to the shared
              degradation rate <InlineMath math="\delta_p" /> and to growth
              dilution <InlineMath math="\mu" />.
              <BlockMath math="\text{Protein loss}: \space \space P_n \xrightarrow{\delta_p + \mu} \varnothing, \space \space P_a \xrightarrow{\delta_p + \mu} \varnothing" />
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Ordinary Differential Equations">
            <strong>ODEs</strong>
            <p>
              Combining the production and loss terms yields coupled ODEs for{" "}
              <InlineMath math="m(t), \space P_n(t)," />{" "}
              <InlineMath math="\space P_a(t)" />. The structure mirrors the
              transcription → translation → maturation cascade and provides the
              backbone for the numerical simulation.
              <BlockMath math="\frac{dm}{dt} = k_{\text{tx,eff}}(t) - (\delta_m + \mu) \cdot m" />
              This equation models the rate of mRNA production over time. The
              first term, represents the effective transcription rate, which is
              influenced by factors such as promoter activity and RNA polymerase
              availability. The second term, accounts for the loss of mRNA due
              to degradation.
            </p>
            <p>
              The following equation captures the rate of increase of the
              nascent protein. The rate at which new proteins are translated is
              T(m) and the rate at which the nascent protein is lost (either
              through degradation or maturation) is given by the second term.
              <BlockMath math="\frac{dP_n}{dt} = T(m) - (k_{\text{mat}} + \delta_p + \mu) \cdot P_n" />
            </p>
            <p>
              The final equation calculates the rate of change of the active
              protein. The first term represents the production of active
              protein through the maturation of nascent protein, while the
              second term accounts for the loss of active protein due to
              degradation and dilution.
              <BlockMath math="\frac{dP_a}{dt} = k_{\text{mat}} \cdot P_n - (\delta_p + \mu) \cdot P_a" />
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Effective Transcription Rate">
            <p>
              The effective transcription rate{" "}
              <InlineMath math="k_{\text{tx,eff}}(t)" /> that was used in the
              first ODE, is the effective rate of transcription which is
              goverened by the T7 promoter and elongation factors.
            </p>
            <p>
              <strong>Induction (Hill)</strong>
              <BlockMath math="f_{\text{prom}}(u) = \frac{u^n}{K^n + u^n} \in [0,1]"></BlockMath>
              The attempted rate of transcription is the maximum transcription
              rate at full induction multiplied by the 0 to 1 multiple yielded
              by the hill function. The Hill function is a phenomenological way
              to capture how a biological system responds in a sigmoidal fashion
              to a changing signal. The variables in our Hill function:
            </p>

            <p>
              <InlineMath math="u"></InlineMath> is the inducer concentration
              (IPTG in our case) in the same units as{" "}
              <InlineMath math="K"></InlineMath>.
            </p>
            <p>
              <InlineMath math="K"></InlineMath> is the Hill coefficient which
              is the value of <InlineMath math="u"></InlineMath> at which{" "}
              <InlineMath math="f_{\text{prom}}(u)"></InlineMath>=0.5. In other
              words, when you add exactly K worth of inducer, the promoter is
              working at half its maximal rate.
            </p>
            <p>
              <InlineMath math="n"></InlineMath> is the cooperativity, which
              controls how steeply the promoter turns on as you increase the
              inducer concentration.
            </p>

            <strong>Attempted initiation</strong>
            <p>
              Using the previous Hill function, the attempted initiation rate is
              given by:
              <BlockMath math="k_{\text{tx,attempt}}(u) = k_{\text{tx,init}} \cdot f_{\text{prom}}(u)"></BlockMath>
            </p>

            <strong>Elongation cap</strong>
            <p>
              The RNAP cannot exceed the spacing limit imposed by elongation
              <BlockMath math="k_{\text{space}} \approx \frac{v_{\text{pol}}}{L_{\text{nt}}}"></BlockMath>
              Where <InlineMath math="v_{\text{pol}}"></InlineMath> is the
              velocity of the RNA polymerase and{" "}
              <InlineMath math="L_{\text{nt}}"></InlineMath> is the length of
              the fusion protein sequence in nucleotides.
            </p>

            <strong>Effective initiation</strong>
            <p>
              The hard cap on the effective initiation rate is given by:
              <BlockMath math="k_{\text{tx,eff}}(u) = \min(k_{\text{attempt}}(u), \space k_{\text{space}})" />
              Or, a more ODE friendly Michaelis-Menten form that is smooth and
              works better for stiff solvers:
              <BlockMath math="k_{\text{tx,eff}}(u) = \frac{k_{\text{attempt}}(u) \cdot k_{\text{space}}}{k_{\text{attempt}}(u) + k_{\text{space}}}" />
              Both of these options would output the lower of the two rates as
              the effective transcription rate{" "}
              <InlineMath math="k_{\text{tx,eff}}(u)" />.
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Numerical Results">
            <ul>
              <li>
                98% of the steady-state active protein is reached by 330.9 min.
              </li>
              <li>
                mRNA half-life: 5.00 min (set by <InlineMath math="\delta_m" />
                ).
              </li>
              <li>
                Protein half-life: 600.00 min (set by{" "}
                <InlineMath math="\delta_p" />
                ).
              </li>
              <li>Peak synthesis rate occurs around t = 12.0 min.</li>
              <li>
                Plateau detection is based on <InlineMath math="dP_a/dt" />{" "}
                dropping below 0.51 nM/min within the simulated window. This takes place at 330.9 min.
              </li>
            </ul>

            <p className="project-description">
              In standard cell-free TXTL, strong constructs routinely reach ~1–10 µM over 3–6 h (system, energy mix, and reporter dependent). Our value of ~6 µM at 6 h is within this range, suggesting the model is reasonable.
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Results">
            <img
              className="modelling_image"
              src="https://static.igem.wiki/teams/5602/mathmodeling/betterfusionprotein.webp"
              alt="Fusion Protein Simulation Graph"
            />
          </CollapsibleItem>

          <CollapsibleItem title="Code">
            <div className="code-block-wrapper">
              <button
                type="button"
                className={getCopyButtonClass("fusion")}
                onClick={() => {
                  void handleCopyCode("fusion", fusionProteinCode);
                }}
              >
                {getCopyLabel("fusion")}
              </button>
              <pre className="code-block">
                <code>{fusionProteinCode}</code>
              </pre>
            </div>
          </CollapsibleItem>
        </section>

        <section id="rt" ref={rtRef} className="project-context-wrapper">
          <h1 className="education-intro-title">
            Modelling the M-MuLV Reverse Transcriptase Rate
          </h1>
          <p className="project-description">
            We calculate the microscopic rate constant (k) for the
            phosphoryl-transfer catalyzed by Moloney murine leukemia virus
            (M-MuLV) reverse transcriptase using the Eyring equation together
            with the free-energy barrier obtained from our potential of mean
            force (PMF) workflow.
          </p>
          <p className="project-description">
            It becomes the overall nucleotide-addition rate (nt/s) only if that
            chemistry step is rate limiting and the active site is saturated
            with the correct dNTP.
          </p>
          <CollapsibleItem title="Eyring Framework">
            <p>
              The Eyring equation links a PMF barrier to a microscopic rate
              constant:
            </p>
            <BlockMath math="k = \frac{k_B T}{h} e^{-\frac{\Delta G^\ddagger}{RT}}" />
            <p>
              The only unknown in this expression is the free-energy barrier{" "}
              <InlineMath math="\Delta G^\ddagger" /> which we compute from
              quantum mechanics/molecular mechanics (QM/MM) augmented umbrella
              sampling trajectories.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Structure Preparation Workflow">
            <p>
              We began with the 4M95 PDB structure of M-MuLV reverse
              transcriptase bound to an RNA template; the entry was solved by
              X-ray diffraction at 1.7 Angstrom resolution but lacks an incoming
              dNTP and catalytic Mg2+.
            </p>
            <p>
              Using PyMOL, we overlaid the 7LRM structure ontop of the 4M95
              structure (aligned with the DNA as reference) to borrow the
              nucleotide coordinates, then assembled a composite model
              containing the reverse transcriptase, RNA strand, dNTP, and
              magnesium ion positioned for catalysis.
            </p>
            <p>
              The combined coordinates were exported as{" "}
              <code>rt_leap_noTTP.pdb</code> (protein/RNA only) plus ligand
              parameter files from AmberTools (<code>TTP.mol2</code> and{" "}
              <code>TTP.frcmod</code>).
            </p>
            <p>
              A very useful tool for constructing this PDB was pymol. Below is a
              render of how one of the ionised structures looks like. You can
              see the reverse transcriptase in green, the RNA strand on the
              bottom and the dNTP with its magnesium ion close to the active
              site. This means that this file is now good for the following
              steps. We only took the active section of the reverse
              transcriptase for the simulation (the real M-MuLV enzyme is
              slighly larger).
            </p>

            <div style={{ justifyContent: "center", display: "flex" }}>
              <img
                className="modelling_image"
                src="https://static.igem.wiki/teams/5602/mathmodeling/pymolrender.webp"
                alt="Pymol render"
                style={{ maxWidth: "700px" }}
              />
            </div>
          </CollapsibleItem>
          <CollapsibleItem title="tleap Configuration">
            <p>
              TLeap loads the standard protein, DNA, and GAFF2 force fields,
              then incorporates the ligand parameters before solvation.
            </p>
            <pre className="code-block">
              <code>
                {String.raw`source leaprc.protein.ff14SB
source leaprc.DNA.OL15
source leaprc.gaff2
source leaprc.water.tip3p

# load ligand & its parameters first
TTP = loadmol2 ./TTP.mol2
loadamberparams ./TTP.frcmod

# now load the cleaned PDB (no TTP inside)
complex = loadpdb ./rt_leap_noTTP.pdb

# now proceed
charge complex
solvatebox complex TIP3PBOX 12.0
addIonsRand complex Na+ 0
saveAmberParm complex system.prmtop system.inpcrd
savepdb complex system_prepared.pdb
quit`}
              </code>
            </pre>
          </CollapsibleItem>
          <CollapsibleItem title="Minimisation and Equilibration Sequence">
            <p>
              GPU-accelerated <code>pmemd.cuda_SPFP</code> jobs relax clashes
              introduced by model building before production sampling; each
              control file below precedes its command line. This was done on a
              3060 at 1.42 GHz clock rate.
            </p>
            <p>
              Temperature control relies on Langevin dynamics with
              <InlineMath math="\gamma = 2.0\ \text{ps}^{-1}" /> throughout the
              heating phases, relaxed to{" "}
              <InlineMath math="\gamma = 1.0\ \text{ps}^{-1}" /> once the system
              sits near 300 K. The isotropic Monte Carlo barostat (
              <InlineMath math="\tau_p = 2.0\ \text{ps}" />) keeps the NPT legs
              at 1 atm. Harmonic restraints of 5.0, 2.0, and 1.0 kcal·mol
              <sup>-1</sup>·Å<sup>-2</sup> act on non-hydrogen solute atoms
              during minimise1, heat1, and heat2, easing to 0.5 kcal·mol
              <sup>-1</sup>·Å<sup>-2</sup> in eq1 before being removed in eq2.
              On an RTX 3060 these runs finish quickly: each minimisation
              completes in under a minute, the 50/100 ps heating legs in roughly
              2–3 minutes, the 200 ps restrained NPT settle in about 6 minutes,
              and the 1 ns unrestrained equilibration in ~25 minutes.
            </p>
            <ol>
              <li>
                <strong>
                  minimise1 - restrained solute (relax solvent/ions)
                </strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Minimise 1: Relax solvent/ions; restrain solute heavy atoms
&cntrl
  imin=1, maxcyc=5000, ncyc=2500,
  ntb=1, cut=8.0,
  ntr=1, restraint_wt=5.0,
  restraintmask='!:WAT,Na+,Cl- & !@H='
/`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i minimise1.in \
  -o minimise1.out \
  -p system.prmtop \
  -c system.inpcrd \
  -r min1.rst \
  -ref system.inpcrd`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>minimise2 - unrestrained whole system</strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Minimise 2: Unrestrained whole system
&cntrl
  imin=1, maxcyc=5000, ncyc=2500,
  ntb=1, cut=8.0,
  ntr=0
/`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i minimise2.in \
  -o minimise2.out \
  -p system.prmtop \
  -c min1.rst \
  -r min2.rst`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>heat1 - NVT, 0 -&gt; 100 K (restrained solute)</strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Heat 1: 0 -> 100 K, NVT; restrain solute heavy atoms
&cntrl
  imin=0, irest=0, ntx=1,
  ntb=1, cut=8.0,
  ntt=3, gamma_ln=2.0,
  tempi=0.0, temp0=100.0,
  dt=0.002, nstlim=25000,
  ntc=2, ntf=2,
  ntpr=500, ntwx=500, ntwr=5000,
  ntr=1, restraint_wt=2.0,
  restraintmask='!:WAT,Na+,Cl- & !@H='
/
&wt type='TEMP0', istep1=0, istep2=25000, value1=0.1, value2=100.0 /
&wt type='END' /`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i heat1.in \
  -o heat1.out \
  -p system.prmtop \
  -c min2.rst \
  -r heat1.rst \
  -x heat1.nc \
  -ref min2.rst`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>
                  heat2 - NVT, 100 -&gt; 300 K (restrained solute)
                </strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Heat 2: 100 -> 300 K, NVT; restrain solute heavy atoms
&cntrl
  imin=0, irest=1, ntx=5,
  ntb=1, cut=8.0,
  ntt=3, gamma_ln=2.0,
  temp0=300.0,
  dt=0.002, nstlim=50000,
  ntc=2, ntf=2,
  ntpr=500, ntwx=500, ntwr=5000,
  ntr=1, restraint_wt=1.0,
  restraintmask='!:WAT,Na+,Cl- & !@H='
/
&wt type='TEMP0', istep1=0, istep2=50000, value1=100.0, value2=300.0 /
&wt type='END' /`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i heat2.in \
  -o heat2.out \
  -p system.prmtop \
  -c heat1.rst \
  -r heat2.rst \
  -x heat2.nc \
  -ref heat1.rst`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>eq1 - NPT, restrained solute</strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Equil 1: NPT, 300 K; weak solute restraints
&cntrl
  imin=0, irest=1, ntx=5,
  ntb=2, cut=8.0,
  ntp=1, taup=2.0,
  ntt=3, gamma_ln=1.0, temp0=300.0,
  dt=0.002, nstlim=100000,
  ntc=2, ntf=2,
  ntpr=1000, ntwx=1000, ntwr=10000,
  ntr=1, restraint_wt=0.5,
  restraintmask='!:WAT,Na+,Cl- & !@H='
/`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i eq1.in \
  -o eq1.out \
  -p system.prmtop \
  -c heat2.rst \
  -r eq1.rst \
  -x eq1.nc \
  -ref heat2.rst`}
                  </code>
                </pre>
              </li>
              <li>
                <strong>eq2 - NPT, unrestrained production start</strong>
                <pre className="code-block">
                  <code>
                    {String.raw`Equil 2: NPT, 300 K; unrestrained
&cntrl
  imin=0, irest=1, ntx=5,
  ntb=2, cut=8.0,
  ntp=1, taup=2.0,
  ntt=3, gamma_ln=1.0, temp0=300.0,
  dt=0.002, nstlim=500000,
  ntc=2, ntf=2,
  ntpr=5000, ntwx=5000, ntwr=50000,
  iwrap=1,
  ntr=0
/`}
                  </code>
                </pre>
                <pre className="code-block">
                  <code>
                    {String.raw`pmemd.cuda_SPFP -O \
  -i eq2.in \
  -o eq2.out \
  -p system.prmtop \
  -c eq1.rst \
  -r eq2.rst \
  -x eq2.nc \
  -inf eq2.info`}
                  </code>
                </pre>
              </li>
            </ol>
          </CollapsibleItem>
          <CollapsibleItem title="Umbrella Sampling Windows">
            <p>
              Umbrella sampling restrains the center-of-mass distance between
              the reacting atoms (Amber indices 4566 and 4564 in our system)
              with a harmonic bias. We use these indicies as they were the index
              of the Pa on the dNTP and the O3' on the primer terminus in the
              RNA. As the RNA is elongated, this distance would decrease, and we
              are calculating the energy it takes to do so.
            </p>
            <pre className="code-block">
              <code>
                {String.raw`# dist.RST
&rst iat=4566,4564, r1=0.0, r2={R0}, r3={R0}, r4=999.0, rk2={K}, rk3={K}, /`}
              </code>
            </pre>
            <p>
              The NPT equilibration and production inputs apply the restraint
              via <code>DISANG</code>:
            </p>
            <pre className="code-block">
              <code>
                {String.raw`# us_eq.in
US window equil (short)
&cntrl
  imin=0, irest=1, ntx=5,
  ntb=2, ntp=1, taup=2.0,
  ntt=3, gamma_ln=1.0, temp0=300.0,
  dt=0.002, nstlim=25000,
  ntc=2, ntf=2,
  ntpr=1000, ntwx=0, ntwr=5000,
  nmropt=1
/
DISANG=dist.RST
DUMPAVE=rc_eq.dat`}
              </code>
            </pre>
            <pre className="code-block">
              <code>
                {String.raw`# us_prod.in
US window production
&cntrl
  imin=0, irest=1, ntx=5,
  ntb=2, ntp=1, taup=2.0,
  ntt=3, gamma_ln=1.0, temp0=300.0,
  dt=0.002, nstlim=500000,
  ntc=2, ntf=2,
  ntpr=1000, ntwx=5000, ntwr=5000,
  nmropt=1
/
DISANG=dist.RST
DUMPAVE=rc_prod.dat`}
              </code>
            </pre>
            <p>Each umbrella window is launched with a simple loop:</p>
            <pre className="code-block">
              <code>
                {String.raw`#!/usr/bin/env bash
set -euo pipefail

PRMTOP=system.prmtop
SEED=eq2.rst
K=5.0
WINDOWS=$(seq 3.0 0.2 5.0)

for R0 in $WINDOWS; do
  WDIR=$(printf "win_%04.1f" "$R0")
  mkdir -p "$WDIR"
  cp us_eq.in us_prod.in "$WDIR"/
  cp "$PRMTOP" "$WDIR"/
  cp "$SEED"   "$WDIR"/start.rst

  cat > "$WDIR/dist.RST" << EOF
&rst iat=4566,4564, r1=0.0, r2=${"${"}R0{'}'}, r3=${"${"}R0{'}'}, r4=999.0, rk2=${"${"}K{'}'}, rk3=${"${"}K{'}'}, /
EOF

  (
    cd "$WDIR"
    pmemd.cuda_SPFP -O \
      -i us_eq.in -o us_eq.out \
      -p system.prmtop \
      -c start.rst \
      -r us_eq.rst \
      -x us_eq.nc \
      -ref start.rst \
      -inf us_eq.info

    pmemd.cuda_SPFP -O \
      -i us_prod.in -o us_prod.out \
      -p system.prmtop \
      -c us_eq.rst \
      -r us_prod.rst \
      -x us_prod.nc \
      -inf us_prod.info
  )
done`}
              </code>
            </pre>
          </CollapsibleItem>
          <CollapsibleItem title="WHAM and Rate Extraction">
            <p>
              Alan Grossfield's WHAM stitches the biased windows; the metadata
              file lists each window's center, force constant, and discarded
              equilibration frames.
            </p>
            <pre className="code-block">
              <code>
                {String.raw`# metadata.dat
# file                 center   k      nEquilFrames
win_3.0/rc_prod.dat    3.0      5.0    500
win_3.2/rc_prod.dat    3.2      5.0    500
...
win_5.0/rc_prod.dat    5.0      5.0    500`}
              </code>
            </pre>
            <pre className="code-block">
              <code>
                {String.raw`wham 3.0 5.0 201 1.0e-5 300 metadata.dat pmf.dat hist.dat`}
              </code>
            </pre>
            <p>
              WHAM solves a pair of self-consistent equations that reweight each
              biased histogram <InlineMath math="N_i(r)" /> using the harmonic
              restraint energy <InlineMath math="w_i(r)" /> to recover the
              unbiased probability <InlineMath math="P(r)" />:
            </p>
            <BlockMath math="P(r) = \frac{\sum_i N_i(r)}{\sum_i N_i \exp\!\left[\beta \left(F_i - w_i(r)\right)\right]}" />
            <BlockMath math="F_i = -k_B T \ln \sum_r P(r) \exp\!\left[-\beta w_i(r)\right]" />
            <p>
              The bias for window <InlineMath math="i" /> is
              <InlineMath math="w_i(r) = \tfrac{1}{2} K_i (r - R_{0,i})^2" />,
              and the free-energy offsets <InlineMath math="F_i" /> are
              iteratively updated until changes fall below the specified
              tolerance (here
              <code>1.0e-5</code>). Implementations use a log-sum-exp evaluation
              to keep the exponentials numerically stable when integrating
              across fine bins.
            </p>
            <p>
              To avoid overstating statistical weight from correlated MD frames,
              each histogram can be divided by a statistical inefficiency factor{" "}
              <InlineMath math="g_i" /> derived from its autocorrelation time;
              the Grossfield code accepts these factors via optional weights.
            </p>
            <p>
              We bootstrap the per-window series (or apply Bayesian WHAM) to
              estimate confidence intervals on{" "}
              <InlineMath math="\Delta G^\ddagger" />
              and propagate that spread through the Eyring rate calculation.
            </p>
            <p>
              We shift the minimum of the PMF to zero and interrogate barrier
              heights:
            </p>
            <pre className="code-block">
              <code>
                {String.raw`awk 'NR==1{min=$2} {if($2<min) min=$2} END{print min}' pmf.dat
awk -v M="$M" '{printf "%.5f %.5f\n", $1, $2-M}' pmf.dat > pmf_shifted.dat

awk '$1>=3.2 && $1<=3.6 {if(NR==1||$2<m) {m=$2; r=$1}} END{printf "Reactant min: r=%.3f  G=%.4f\n", r,m}' pmf_shifted.dat
awk '$1>=3.8 && $1<=4.1 {if(NR==1||$2>M) {M=$2; r=$1}} END{printf "TS peak:    r=%.3f  G=%.4f\n", r,M}' pmf_shifted.dat`}
              </code>
            </pre>
            <BlockMath math="W(r) = -k_B T \ln P(r) + C" />
            <p>
              Finally, we map the barrier into a rate estimate with the Eyring
              prefactor:
            </p>
            <pre className="code-block">
              <code>
                {String.raw`python3 - << 'PY'
import math
DG = 15.0
T  = 300.0
Rkcal = 1.987204258e-3
kB  = 1.380649e-23
h   = 6.62607015e-34
k0  = kB*T/h
k   = k0*math.exp(-DG/(Rkcal*T))
print(f"Eyring estimate k ~ {k:.3e} s^-1  (assumes transmission coeff kappa=1)")
PY`}
              </code>
            </pre>
            <br></br>
            <p>
              This workflow converts the PMF-derived barrier into a chemically
              meaningful nucleotide-addition rate for the reverse transcriptase.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="References">
            <p>CUDA versions of Amber were used for all MD simulations:</p>
            <p>
              Romelia Salomon-Ferrer; Andreas W. Goetz; Duncan Poole; Scott Le
              Grand; Ross C. Walker "Routine microsecond molecular dynamics
              simulations with AMBER - Part II: Particle Mesh Ewald", J. Chem.
              Theory Comput., 2013, 9 (9), pp3878-3888, DOI: 10.1021/ct400314y.
            </p>
            <p>
              Andreas W. Goetz; Mark J. Williamson; Dong Xu; Duncan Poole; Scott
              Le Grand; Ross C. Walker "Routine microsecond molecular dynamics
              simulations with AMBER - Part I: Generalized Born", J. Chem.
              Theory Comput., 2012, 8 (5), pp1542-1555.
            </p>
            <p>
              Scott Le Grand; Andreas W. Goetz; Ross C. Walker "SPFP: Speed
              without compromise - a mixed precision model for GPU accelerated
              molecular dynamics simulations.", Comp. Phys. Comm., 2013, 184
              pp374-380, DOI: 10.1016/j.cpc.2012.09.022
            </p>
          </CollapsibleItem>
        </section>

        <section id="rRNA" ref={rRNARef} className="project-context-wrapper">
          <h1 className="education-intro-title">Anderson Promoter 18s rRNA</h1>
          <p className="project-description">
            We describe a simple ODE model for the production of 18S rRNA under
            the control of a constitutive Anderson promoter. The model includes
            transcription, processing, assembly, decay, and dilution due to cell
            growth.
          </p>
          <CollapsibleItem title="18S rRNA Variables">
            <ul>
              <li>
                <InlineMath math="\text{pre}(t)" />: precursor rRNA
              </li>

              <li>
                <InlineMath math="\text{mat}(t)" />: mature 18S rRNA
              </li>
            </ul>
          </CollapsibleItem>
          <CollapsibleItem title="Auxiliary Rate Definitions">
            <p>
              <p>
                Promoter (constitutive <InlineMath math="\sigma^{70}" />
                ): strength set by RPU; no inducer. The attempt rate of
                transcription is given by:
              </p>
              <BlockMath math="k_{tx,attempt} = k_{tx,base} \cdot \text{RPU}" />
            </p>
            <p>
              <p>Transcription (capped by occlusion):</p>
              <BlockMath math="k_{tx,eff} = \min(k_{tx,attempt}, \space \frac{v_{pol}}{L_{nt}} \cdot TU_{nM} )" />
            </p>
            <p>
              <InlineMath math="TU_{nM}" /> is the number of transcription units
              per nanomolar concentration of RNA polymerase.
            </p>
          </CollapsibleItem>
          <CollapsibleItem title="Ordinary Differential Equations">
            <p>
              These are the ODEs that we will be using to model the 18S rRNA
              system:
            </p>
            <BlockMath math="\frac{d\text{pre}}{dt} = k_{tx,eff} - (k_{proc} + \delta_{pre} + \mu) \cdot \text{pre}" />
            <BlockMath math="\frac{d\text{mat}}{dt} = k_{proc} \cdot \text{pre} - (k_{asm} + \delta_{mat} +\mu) \cdot \text{mat}" />
            <p>
              We are not using the following assembly ODE, as the effects of it
              are negligible in the context of this model. Though it is
              displayed here for finality of the model.
            </p>
            <BlockMath math="\frac{d\text{asm}}{dt} = k_{asm} \cdot \text{mat} - (\delta_{asm} + \mu) \cdot \text{asm}" />
          </CollapsibleItem>
          <CollapsibleItem title="Parameters">
            <p>We define the following parameters for the model</p>
            <p>
              <InlineMath math="k_{proc}" />: processing rate pre → mature
              (e.g., HH/HDV ribozymes or RNase III processing)
            </p>
            <p>
              <InlineMath math="\delta_{pre}" />: precursor decay
            </p>
            <p>
              <InlineMath math="\delta_{mat}" />: mature RNA decay
            </p>
            <p>
              <InlineMath math="\mu" />: growth dilution
            </p>
            <p>
              <InlineMath math="k_{tx,base} = RPU \cdot \frac{v_{pol}}{L_{nt}} \cdot TU_{nM}" />
            </p>
          </CollapsibleItem>

          <CollapsibleItem title="Table of Variables and Parameters">
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Parameter
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Symbol (unit)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Our value
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Literature benchmark (with link)
                  </th>
                  <th
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    How close?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Processing rate (pre → mat)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="k_{\text{proc}}" /> (
                    <InlineMath math="\text{min}^{-1}" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\ln 2 / 10 = 0.0693" />
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    RNase III / ribozyme cleavage spanning{" "}
                    <InlineMath math="0.1{-}10\ \text{min}^{-1}" />.
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC344635/"
                      target="_blank"
                    >
                      [1]
                    </a>
                    <a
                      href="https://www.pnas.org/doi/10.1073/pnas.81.1.185"
                      target="_blank"
                    >
                      [2]
                    </a>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Mid-range of literature
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Precursor decay
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\delta_{\text{pre}}" /> (
                    <InlineMath math="\text{min}^{-1}" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="0.02" />
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Slow turnover assumed for short-lived intermediates.
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Conservative background loss
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Mature RNA decay
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\delta_{\text{mat}}" /> (
                    <InlineMath math="\text{min}^{-1}" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\ln 2 / 600 = 0.00116" />
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    rRNA half-lives of many hours in growing <i>E. coli</i>.
                    <a
                      href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2696628/"
                      target="_blank"
                    >
                      [3]
                    </a>
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Matches long-lived literature
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Growth dilution
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\mu" /> (
                    <InlineMath math="\text{min}^{-1}" />)
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    <InlineMath math="\ln 2 / 60 = 0.01155" />
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    60 min doubling time via{" "}
                    <InlineMath math="\mu = \ln 2 / T_d" /> (standard chemostat
                    relation).
                  </td>
                  <td
                    style={{
                      border: "1px solid #aaa",
                      padding: "0.3rem 0.5rem",
                    }}
                  >
                    Exact by definition
                  </td>
                </tr>
              </tbody>
            </table>
          </CollapsibleItem>
          <CollapsibleItem title="How the equations were formed">
            <p>
              <strong>Transcription</strong>
            </p>
            <p>
              This equation describes the creation of precursor rRNA which are
              being produced at the effective transcription rate.
            </p>
            <BlockMath math="\varnothing \xrightarrow{k_{\text{tx,eff}}} \mathrm{pre}"></BlockMath>
            <p>
              <strong>Processing</strong>
            </p>
            <p>
              Once the precursor rRNA is synthesised, it is converted into the
              mature rRNA with RNase III at rate (
              <InlineMath math="k_{\text{proc}}" />) which is the rate that
              RNase processes the precursor rRNA.
            </p>
            <BlockMath math="\mathrm{pre} \xrightarrow{k_{\text{proc}}} \mathrm{mat}"></BlockMath>
            <p>
              <strong>rRNA Losses</strong>
            </p>
            <p>
              This biochemical equation governs the loss of precursor and mature
              rRNA at their respective degradation rates and the rate of
              dilution due to cell growth.
            </p>
            <BlockMath math="\mathrm{pre} \xrightarrow{\delta_{\text{pre}} + \mu} \varnothing, \space \space \mathrm{mat} \xrightarrow{\delta_{\text{mat}}+ \mu} \varnothing"></BlockMath>
            <p>
              <strong>ODEs</strong>
            </p>
            <p>We form two ODEs with the equations above.</p>
            <p>
              The first differential equation establishes the rate of precursor
              rRNA production at the effective transcription rate minus the loss
              and degradation of the rRNA.
            </p>
            <BlockMath math="\frac{d\mathrm{pre}}{dt} = k_{\text{tx,eff}} - (k_{\text{proc}} + \delta_{\text{pre}} + \mu) \cdot \mathrm{pre}"></BlockMath>

            <p>
              The second differential equation calculates the rate of mature
              rRNA production. This is calculated by multiplying the processing
              rate of the RNase and the concentration of the precursor rRNA and
              subtracting the loss of mature rRNA due to degradation.
            </p>
            <BlockMath math="\frac{d\mathrm{mat}}{dt} = k_{\text{proc}} \cdot \mathrm{pre} - (\delta_{\text{mat}} + \mu) \cdot \mathrm{mat}"></BlockMath>
            <p>
              In our project, we will be using Anderson promoters. Thus, the
              effective transcription rate is dependent on the strength of the
              promoter which varies with different Anderson promoters. In our
              project, we are using the J23100 promoter. Which is simply the
              base transcription rate multiplied by the promoter strength. So
              the rate is:
            </p>
            <BlockMath math="k_{\text{tx,attempt}} = k_{\text{tx,base}} \cdot \text{RPU}"></BlockMath>
            <p>
              The transcription rate is capped by the elongation spacing. The
              elongation spacing is the throughput limit set by how long one RNA
              polymerase occupies a transcription unit while it transcribes the
              gene. For example, if the RNAP moves at
              <InlineMath math="v_{\text{pol}}" /> nt/s over a gene of length
              <InlineMath math="L_{\text{nt}}" />, the shortest possible time
              between two completed transcripts from a single template is
              <InlineMath math="\frac{L_{\text{nt}}}{v_{\text{pol}}}" />. In a
              sense, this is the traffic or occupancy ceiling of the enzymes in
              E.coli. <InlineMath math="TU_{nM}" /> is the concentration of
              transcription units (templates) available for transcription.
            </p>
            <BlockMath math="\text{elongation-spacing cap} = \frac{v_{pol}}{L_{nt}} \cdot TU_{nM}" />
            <p>
              Where <InlineMath math="v_{\text{pol}}" /> is the rate of
              transcription of the native E. coli RNA polymerase,
              <InlineMath math="L_{\text{nt}}" /> is the length of the 18s rRNA
              and <InlineMath math="TU_{nM}" /> is how many templates are
              available for transcription.
            </p>
            <p>
              Finally, the effective transcription rate is the lowest option
              between the occlusional rate and the attempted rate, which is
              nearly always the attempted rate.
            </p>
            <BlockMath math="k_{\text{tx,eff}} = \min\left(\frac{v_{pol}}{L_{nt}} \cdot TU_{nM}, \space k_{\text{tx,attempt}}\right)" />
          </CollapsibleItem>
          <CollapsibleItem title="Results">
            <img
              className="modelling_image"
              src="https://static.igem.wiki/teams/5602/mathmodeling/18srrnaanderson.webp"
              alt="Results for 18S rRNA System"
            />
          </CollapsibleItem>
          <CollapsibleItem title="Numerical Results">
            <p>
              Effective transcription{" "}
              <InlineMath math="k_{\text{tx}} (nM/min)" /> = 30.00
            </p>
            <p>
              Steady states (<InlineMath math="nM" />
              ): pre* = 297.4, mature18S* = 1622.3
            </p>
            <p>≥98% plateau (mature 18S) reached by ≈ 318.9 min</p>
          </CollapsibleItem>

          <CollapsibleItem title="Code">
            <div className="code-block-wrapper">
              <button
                type="button"
                className={getCopyButtonClass("rrna")}
                onClick={() => {
                  void handleCopyCode("rrna", rRNACode);
                }}
              >
                {getCopyLabel("rrna")}
              </button>
              <pre className="code-block">
                <code>{rRNACode}</code>
              </pre>
            </div>
          </CollapsibleItem>

          <CollapsibleItem title="References for 18S rRNA Modelling">
            <p>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC344635/">
                [1] https://pmc.ncbi.nlm.nih.gov/articles/PMC344635/
              </a>
            </p>
            <p>
              <a href="https://www.pnas.org/doi/10.1073/pnas.81.1.185">
                [2] https://www.pnas.org/doi/10.1073/pnas.81.1.185
              </a>
            </p>
            <p>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2696628/">
                [3] https://pmc.ncbi.nlm.nih.gov/articles/PMC2696628/
              </a>
            </p>
          </CollapsibleItem>
        </section>

        <section
          id="review"
          ref={profReview}
          className="project-context-wrapper"
        >
          <h1 className="education-intro-title">Feedback</h1>
          <CollapsibleItem title="Professional Review">
            <p>
              {/* LINK DR YANI PEHOVA HERE TO THE MEMBERS PAGE WHERE YOU WILL PUT THEIR PHOTO THERE  */}
              Our first means of verifying the validity of our modelling
              projects was reaching out to <a>Dr Yani Pehova</a> from Precision
              life. She has had experience with mathematical and machine
              learning modelling projects. We presented an early version of our
              modelling documentation and Dr Pehova’s review was motivating. She
              praised how concisely we presented the modelling work, our thought
              process while developing the models and the mathematical accuracy
              behind the models. According to her, they aligned with other
              modelling work she has seen in the past. She noted that we should
              reference the constants that we chose in our model and use Latex
              to better display the formulae.
              {/*    LINK TO BILL ON ATTRIBUTIONS OR MEMBER PAGE */}
              <br></br>
              <br></br>Dr Pehova was able to introduce us to{" "}
              <a>Mr Bill Keating</a> who is the Chief Operating Officer at
              precision life. Mr Keating spent over 20 years developing
              molecular diagnostic assays with Becton Dickinson (BD). Later, he
              traveled to Japan to try and license the LAMP technology for use
              in field-deployable diagnostics, focusing on Tuberculosis. Mr
              Keating kindly read our novel LAMP modelling project and gave the
              following feedback. He agreed with our LAMP assumptions; the
              concentrations of dNTPs at the mM concentrations should be
              adequate and not become rate-limiting; The peak amplification one
              can expect from LAMP is on the order of 10e10, within 60mins, with
              most of that occurring 5-30mins into the reaction; and Bst
              polymerase activity (measured in processivity) will not decay
              during that time. These are all assumptions that we made in our
              model. He also suggested that we upload our work as a technical
              Bulletin on NEB’s website to help facilitate further research into
              LAMP modelling.
            </p>
          </CollapsibleItem>
        </section>
      </main>
    </div>
  );
};
