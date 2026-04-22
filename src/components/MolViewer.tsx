'use client';
import { useEffect, useRef, useState } from "react";
import { webglSupported } from '../utils/webgl';

type MolViewerProps = {
  /** Molecule text (PDB/SDF/MOL2/mmCIF…) */
  structure: string;
  /** Format string for 3Dmol: 'pdb' | 'sdf' | 'mol2' | 'cif' | 'xyz' ... */
  format: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  background?: string | number;   // e.g. 'white' or 0xf5f5f5
  spin?: boolean;                 // auto-rotate
  styleSpec?: any;                // 3Dmol style object
};

export default function MolViewer({
  structure,
  format,
  width = 360,
  height = 240,
  className,
  style,
  background = "white",
  spin = false,
  styleSpec = { cartoon: { color: "spectrum" } },
}: MolViewerProps) {


  if (!webglSupported()) return null;


  const ref = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [isWebglSupported, setIsWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = document.createElement("canvas");
    const supported =
      !!window.WebGLRenderingContext &&
      !!(
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("experimental-webgl")
      );
    setIsWebglSupported(supported);
    if (!supported) {
      console.warn("[MolViewer] WebGL is not supported; viewer disabled.");
    }
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive || isWebglSupported !== true) {
      if (viewerRef.current) {
        try {
          viewerRef.current.clear();
        } catch (e) {
          console.error("[MolViewer] Failed to clear viewer:", e);
        } finally {
          viewerRef.current = null;
        }
      }
      if (ref.current) {
        ref.current.innerHTML = "";
      }
      return;
    }

    let disposed = false;
    const mountViewer = () => {
      if (disposed || !ref.current || !window.$3Dmol) return;

      ref.current.innerHTML = "";
      // Create viewer
      const viewer = window.$3Dmol.createViewer(ref.current, {
        backgroundColor: background as any,
      });
      viewerRef.current = viewer;

      // Add model from the provided string
      try {
        viewer.addModel(structure, format); // << key line
      } catch (e) {
        console.error("[MolViewer] addModel failed:", e);
        return;
      }

      // Global style
      viewer.setStyle({}, styleSpec);
      viewer.zoomTo(); // frame
      if (spin) viewer.spin("y", 1);
      viewer.render();
    };
    const handleError = () =>
      console.error("[MolViewer] Failed to load 3Dmol-min.js");

    // Ensure the library is loaded (served locally)
    if (!window.$3Dmol) {
      const scriptAttr = "data-molviewer";
      let script = document.querySelector(
        `script[${scriptAttr}="3dmol"]`
      ) as HTMLScriptElement | null;

      const handleLoad = () => {
        if (disposed) return;
        mountViewer();
      };

      if (script) {
        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError, { once: true });
      } else {
        script = document.createElement("script");
        script.src = `${import.meta.env.BASE_URL}3dmol/3Dmol-min.js`;
        script.async = true;
        script.setAttribute(scriptAttr, "3dmol");
        script.addEventListener("load", handleLoad);
        script.addEventListener("error", handleError, { once: true });
        document.head.appendChild(script);
      }

      return () => {
        disposed = true;
        if (script) {
          script.removeEventListener("load", handleLoad);
          script.removeEventListener("error", handleError);
        }
        if (viewerRef.current) {
          try {
            viewerRef.current.clear();
          } catch (e) {
            console.error("[MolViewer] Failed to clear viewer:", e);
          } finally {
            viewerRef.current = null;
          }
        }
      };
    } else {
      mountViewer();
      return () => {
        disposed = true;
        if (viewerRef.current) {
          try {
            viewerRef.current.clear();
          } catch (e) {
            console.error("[MolViewer] Failed to clear viewer:", e);
          } finally {
            viewerRef.current = null;
          }
        }
      };
    }
  }, [isActive, isWebglSupported, structure, format, background, spin, styleSpec]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,.12)",
        ...style,
      }}
    >
      {isWebglSupported === false && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f8f8",
            color: "#333",
            padding: "1rem",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          WebGL is not available in this browser. 3D preview disabled.
        </div>
      )}
    </div>
  );
}
