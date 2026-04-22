import { useEffect, useState } from "react";
import "../assets/css/model.css";

export const Notebook = () => {
  const sections = [
    "day-1",
    "day-2",
    "day-3",
    "next-steps",
    "lamp-protocol",
    "final-lamp-test",
  ];

  const [activeSection, setActiveSection] = useState<string>("day-1");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="project-page-wrapper">
      <nav className="sidebar-nav">
        <ul>
          {sections.map((section) => (
            <li
              key={section}
              className={activeSection === section ? "active" : ""}
            >
              <a href={`#${section}`}>
                {section.replace(/-/g, " ").replace(/\b\w/g, (c) =>
                  c.toUpperCase()
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="project-content">
        <div className="project-context-wrapper">
          <h1 className="education-intro-title">Wet-Lab Notebook</h1>

          <section id="day-1" className="model-subsection">
            <h2 className="project-context-title">Day 1 - 20/09/2025</h2>
            <p>Aarush, Alex, Mars, Zara met Dr Anatoli Markiv at King’s College London Hodgins’ Building. We delivered our fusion protein plasmids and primers to him.</p>
            <p>He explained the process of protein expression and extraction, so we decided to focus today on creating cultures of bacteria transformed with our plasmid.</p>
            <p>We started by adding 40μl of water to our tube to rehydrate the freeze-dried plasmids.</p>
            <p>Using BL21 E. coli held in four test tubes in ice, we added 10μl of plasmid solution to each tube. We waited five minutes for the bacteria to cool down so that we could heat shock the bacteria to allow them to be later heat-shocked.</p>
            <p>We needed to open the bacterial cell wall pores to allow the plasmid to enter the cell. As such, we transferred the bacteria to a 42°C environment for 60 seconds to heat-shock the bacteria.</p>
            <p>We then transferred the bacteria back into the ice to close the pores.</p>
            <p>Dr Markiv had helpfully pre-prepared four agar plates seeded with chloramphenicol antibiotic.</p>
            <p>We then waited 5 minutes for the bacteria to express this resistance marker, which would allow only the bacteria that had been successfully transformed to survive on the plates.</p>
            <p>We transferred the 350μl total volume of bacteria in each test tube to the agar plates and seeded the plate with our bacteria using the L-shaped spreader.</p>
            <p>We left the four cultures in an incubator at 37°C for the next day.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135714035-ios.webp" alt="Lab work " className="project-image" style={{ width: "400px", height: "auto" }} />
            <p>On 21/09/2025, Dr Markiv sent us the following photos of our results:</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135728823-ios.webp" alt="results of experiment day 1 " className="project-image" style={{ width: "300px", height: "auto" }} />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135743064-ios.webp" alt="results of experiment day 1 " className="project-image" style={{ width: "300px", height: "auto" }} />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135755238-ios.webp" alt="results of experiment day 1 " className="project-image" style={{ width: "300px", height: "auto" }} />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135810564-ios.webp" alt="results of experiment day 1 " className="project-image" style={{ width: "300px", height: "auto" }} />
            <p> These photographs show two plates with successful colonies ( first and last)</p>
          </section>

          <section id="day-2" className="model-subsection">
            <h2 className="project-context-title">Day 2 - 28/09/2025</h2>
            
            <p>From the successful colonies, a new colony was seeded into a mixture of LB Broth in a baffled flask, and left to grow for 6 hours.</p>
            <p>Dr Markiv kindly took samples of the BL21 E. coli for us at 0,1, 2 and 3 hours after transfer, using a spectrophotometer to analyse the colony size. This was during the bacteria’s exponential growth phase.</p>
            <p>At each of these points, the sample was removed and centrifuged to be stored for later use.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135820997-ios.webp" alt="day2 " className="project-image"style={{ width: "400px", height: "auto" }}  />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135833642-ios.webp" alt="day2 " className="project-image"style={{ width: "400px", height: "auto" }}  />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135845599-ios.webp" alt="day2 " className="project-image"style={{ width: "400px", height: "auto" }}  />
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135858065-ios.webp" alt="day2 " className="project-image"style={{ width: "400px", height: "auto" }}  />
          </section>

          <section id="day-3" className="model-subsection">
            <h2 className="project-context-title">Day 3 - 28/09/2025</h2>
            <p>Alex, Aarush, Luke, Iris and Sriya went to the labs. Our aim was to run an SDS-PAGE to determine whether a protein with a weight of 75 kDa (the molecular weight of our BST fusion protein) was successfully expressed in the E. coli.</p>
            <p>Two sets of samples were taken per hour, totalling 8 samples. The samples were thawed and transferred to new tubes.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135911615-ios.webp" alt="day3 " className="project-image" style={{ width: "400px", height: "auto" }} />
            <p>100μl of BugBuster protein extraction buffer was added, in order to lyse the cells.</p>
            
            <p>We pipetted 20μl of each of the 0-3 hours whole cell lysate into new 1.5 ml tubes.</p>
            <p>We then added 20μl of Laemmli Sample buffer to each of the tubes.</p>
            <p>The samples were then heated in a heating block for 10 minutes at 95°C to ensure the proteins denatured and to linearise the tertiary structures, exposing their positive and negatively charged R groups.</p>
            <p>The combs were removed and the gels were loaded into the SDS - PAGE module.</p>
            <p>We then transferred 10μl of each sample into lanes 1-4, loaded the Precision Plus His protein marker into lane 5, and added the second set of samples into lanes 6-9.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135933312-ios.webp" alt="day3 " className="project-image"style={{ width: "400px", height: "auto" }}  />
            <p>We repeated these steps for the second gel. We then ran the gels for 40 minutes at 200V.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135946233-ios.webp" alt="day3 " className="project-image"style={{ width: "400px", height: "auto" }}  />
            <p>We removed the gel cassettes from the module and cracked them open, using distilled water to remove the gel easily.</p>
            <p><strong>Staining:</strong> We stained the gel using Coomassie blue diluted with acetic acid and incubated the stained gels. After incubation, the gels were shaken gently on the orbital shaker for 5 minutes.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-135957048-ios.webp" alt="day3 " className="project-image"style={{ width: "400px", height: "auto" }} />
            <p>Acetic acid was used to destain the gels. Using the protein marker (column 5) we could verify the 75 kDa weight of our fusion protein by comparing the bands. The smallest band is at the 0 hour mark with no protein being seen, while, as the hours go on, the band gets thicker, suggesting that more and more of our fusion BST is being expressed.</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-140010902-ios.webp" alt="day3 " className="project-image"style={{ width: "800px", height: "auto" }} />
            <p>Post decolourisation</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/img-5996.webp" alt="day3 " className="project-image"style={{ width: "700px", height: "auto" }}/>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-140025308-ios.webp" alt="day3 " className="project-image"style={{ width: "400px", height: "auto" }} />
            
          </section>

          <section id="next-steps" className="model-subsection">
            <h2 className="project-context-title">Next Steps</h2>
            <p>Looking forward, our next steps will be to purify our fusion protein and test its activity in a LAMP reaction in the presence of the 18s rRNA. We decided against purifying our protein at the moment, as this step should happen in close temporal proximity to using the protein in a reaction to maximise efficacy. We would also confirm that it was our fusion Bst that was being expressed by doing a western blot, using antibodies for the hexahistidine tag on the protein (as E. coli do not produce proteins with a hexahistidine tag, if a complex is formed, it must be our protein!)</p>
            <img src="https://static.igem.wiki/teams/5602/notebook/20251004-140045700-ios.webp" alt="nextsteps " className="project-image"style={{ width: "400px", height: "auto" }} />
            <p>For protein purification, we would use a charged nickel column to isolate the hexahistidine tagged protein. The selective formation of bonds between the His6 tags and immobilised nickel ions would isolate them from other proteins that are removed using a wash buffer. An imidazole buffer is then used to compete with the His6 bindings and disrupt interactions with the metal, therefore isolating the recombinant protein in the column.</p>
            <p>We would transform the plasmid containing the 18s rRNA into BL21 E.coli and then wait for them to express it, selecting once again using a chloramphenicol marker. This would be a novel technique of testing diagnostic targets, as usually, only gene fragments are tested.</p>
            <p>What this method enables us to do, is to mirror the actual environment of the test - the 18s rRNA is enclosed inside of a cell membrane similar to where it would be found in a crypto oocyst, and we can see whether our theoretical test would work even if other molecules were in the vicinity of the target.</p>
            <p> UPDATE! We have managed to get the 18s rRNA delivered just in time before the Wiki Freeze!</p>
            <p>Note: We used the NEB LAMP warmstart kit to do the following:</p>
            <ul>
            <li>In our school labs we rehydrated the lyophilised primers we had ordered from IDT</li>
            <li>We then diluted 10 microlitres of the gene fragment into 5ml of distilled water. We would've liked to have produced a dilution series however this was not possible with time constraints.</li>
            <li> We then produced the LAMP assay, following the NEB LAMP protocol here <a 
      href="https://www.neb.com/en-gb/protocols/2016/08/15/warmstart-lamp-kit-dna-rna-protocol-e1700?srsltid=AfmBOoqZpGuTqU644_LJ0qqt5d530atuXCDp8ibjyOXmQRuH1RgEJzVu" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      https://www.neb.com/en-gb/protocols/2016/08/15/warmstart-lamp-kit-dna-rna-protocol-e1700?srsltid=AfmBOoqZpGuTqU644_LJ0qqt5d530atuXCDp8ibjyOXmQRuH1RgEJzVu
    </a></li>
           <li>We used HNB Dye as described previously to detect reaction occuring colourimetrically.
           </li>
           <li>We produced a hot water bath and maintained it at 60-65 degrees for 1 hour. </li>
           <li> We obtained the following colour change, showing that our primer set was effective and the colourmetric nature of the test kit had worked!</li>
           </ul>
           <p>We hope to test our purified fusion Bst's activity in this same reaction by the time of the jambouree, and hope to upload this data by then.</p>
            
            
            <img src="https://static.igem.wiki/teams/5602/notebook/20251007-193843883-ios.webp" alt="colour change " className="project-image"style={{ width: "400px", height: "auto" }} />
          </section>

          <section id="lamp-protocol" className="model-subsection">
  <h2 className="project-context-title">LAMP Protocol</h2>

  <p><strong>Papers:</strong><br/>
    <a 
      href="https://www.researchgate.net/publication/24230750_Colorimetric_detection_of_loop-mediated_isothermal_amplification_reaction_by_using_hydroxy_naphthol_blue" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Colorimetric detection of loop-mediated isothermal amplification reaction by using hydroxy naphthol blue
    </a><br/>
    <a 
      href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9741705/" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      PMC Article on LAMP
    </a>
  </p>

  <p>Betaine not needed at low GC content greater than 45%.</p>
  <p><strong>Important:</strong> ENSURE NO CONTAMINATION - LAMP is very sensitive to contaminants and may produce false positives.</p>
  <p>To avoid contamination, separate rooms should be used for LAMP setup and analysis.</p>
  <p>Warmstart multi purpose LAMP/RTLAMP 2X Mastermix with UDG.</p>

  <h3 className="project-context-title">Equipment List</h3>
  <ul>
    <li>Waterbath or Heatblock (see which is better)</li>
    <li>Colorimeter</li>
  </ul>

  <h3 className="project-context-title">Material List</h3>
  <ul>
    <li>(If fail then warmstart multi purpose LAMP/RT LAMP 2X Mastermix with UDG + buy HNB dye)</li>
    <li>Total Volume: 25 µL</li>
    <li>Stock solution of HNB at 20 mM</li>
    <li>7 test tubes of 10-fold serially diluted 18sRNA (diluted by a factor of 10, 2–9 times)</li>
    <img src="https://static.igem.wiki/teams/5602/notebook/20251004-140058203-ios.webp" alt="materials" className="project-image"style={{ width: "400px", height: "auto" }} />
    <li>Primer amount we have (we need to suspend to get volumes)</li>
    <li>25 nmol of all primers</li>
    <li>Primer concentrations:
      <ul>
        <li>1.6 µM FIP and BIP</li>
        <li>0.2 µM F3 and B3</li>
        <li>0.8 µM LF and LB</li>
      </ul>
    </li>
    <li>1.4 µM dNTPs</li>
    <li>8 U/µL Fusion protein (1 µL from an 8 U stock solution)</li>
    <li>8 mM MgSO4</li>
    <li>LAMP buffer with 120 µM HNB</li>
    <li>Molecular biology grade H2O</li>
  </ul>

  <h3 className="project-context-title">Method</h3>
  <ol>
    <li>Label and prepare 7 test tubes of dilutions: 10^-3, 10^-4, 10^-5, 10^-6, 10^-7, 10^-8, and 10^-9 18sRNA (to measure fusion protein sensitivity).</li>
    <li>Hydrate primers.</li>
    <li>Label and prepare a mixture without 18sRNA as a control.</li>
    <li>Prepare 10X primer mix:
      <ul>
        <li>16 µM FIP and BIP</li>
        <li>2 µM F3 and B3</li>
        <li>8 µM LF and LB</li>
        <li>Add 2.5 µL (10% concentration) for each LAMP solution</li>
      </ul>
    </li>
    <li>Use C1 V1 = C2 V2 to calculate dilutions:
      <ul>
        <li>C1 = Initial concentration</li>
        <li>C2 = Final concentration</li>
        <li>V1 = Initial volume</li>
        <li>V2 = Final volume</li>
      </ul>
    </li>
    <li>Prepare eight 25 µL solutions in separate test tubes (follow detailed mixing instructions).</li>
    <li>Use different pipettes to mix each of the LAMP reagents.</li>
    <li><strong>Order of addition:</strong> Water → MgSO4 → Buffer → dNTPs → Primer → Fusion protein → 18sRNA</li>
    <li>Place in water bath at 65°C for 60 minutes. Do not open the tubes during the reaction.</li>
    <li>Stop the reaction by heating to 80°C for 3 minutes.</li>
    <li>Observe colour change.</li>
    <li>Repeat as many times as necessary to collect results.</li>
  </ol>
</section>

  <section id="final-lamp-test" className="model-subsection">
    <h2 className="project-context-title">Final LAMP Test</h2>
    <p>
      We have also used the NEB Lamp Warmstart LAMP kit to run our test on a sample containing a plasmid with 18s rRNA in a dilution series, as well as our primer mix. We used the protocol as described &nbsp;
      <a 
        href="https://www.neb.com/en-gb/protocols/2016/08/15/warmstart-lamp-kit-dna-rna-protocol-e1700?srsltid=AfmBOorXsOIjMY_UvAFp-f_R8R0AnmJvy16VOndWYv35KPMWuEXTmFWV" 
        target="_blank" 
        rel="noopener noreferrer"
      >
         here
      </a>, and used a thermostatically controlled water bath to control the temperature, to mirror the test in its point-of-care setting.
    </p>
    <p>
      We tested for turbidity by adding Universal Indicator as a dye, as this would mean that it would be darker when more particulate matter was present, and therefore LAMP had occurred.
    </p>
    <p>
      As you can see below, the control (distilled water) is a much lighter colour. This is because no LAMP has occurred, and therefore there is no turbidity.
    </p>
    <p>
      The others all have a strong green colour, as the exponential amplification of the 18s rRNA cDNA plasmid present in them causes LAMP to occur.
    </p>
    <img 
      src="https://static.igem.wiki/teams/5602/notebook/image-4.avif" 
      alt="Final LAMP Test - Image 1" 
      className="project-image" 
      style={{ width: "700px", height: "auto" }} 
    />
    <img 
      src="https://static.igem.wiki/teams/5602/notebook/image-5.avif" 
      alt="Final LAMP Test - Image 2" 
      className="project-image" 
      style={{ width: "700px", height: "auto" }} 
    />
    <p>
    Our model predicted that enough pyrophosphate ions would be generated for a colour change to occur by using HNB dye in 40.6 minutes. In the above experiment, we got a successful colour change in 41 minutes.
    </p>
  </section>

        </div>
      </div>
    </div>
  );
};
