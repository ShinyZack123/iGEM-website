import { useEffect, useState } from "react";
import "../assets/css/model.css";

export const SafetyAndSecurity = () => {
  const [activeSection, setActiveSection] = useState<string>("safety-overview");

  const sections = [
    "safety-overview",
    "hazard-exposure",
    "cleaning-solutions",
    "glass-equipment",
    "application",
    "policies",
    "KCL-safety-record",
  ];

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
            <li key={section} className={activeSection === section ? "active" : ""}>
              <a href={`#${section}`}>
                {section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="project-content">
        <div className="project-context-wrapper">
          <h1 className="education-intro-title">Safety and Security</h1>
 
          <section id="safety-overview" >
            
            <p className="project-description">
              Biological research, particularly when it may have future medical relevance, inevitably involves some level of risk. During our time in the wet lab, we not only refined our experimental skills but also learned to function as an effective, well-coordinated team. A central focus has been the careful management of safety, ensuring that our work remained responsible and ethical at all times. Our practices are designed to minimise potential hazards, meeting both iGEM standards and local legal requirements, while also safeguarding our own wellbeing.
            </p>

            
            <div className="safety-table-container">
              <table className="safety-table">
                <thead>
                  <tr>
                    <th>Hazard</th>
                    <th>Risk</th>
                    <th>Precautions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="hazard-exposure">
                    <td>Exposure to BL-21 E. coli</td>
                    <td>
                      Accidental exposure to the bacteria, such as through direct contact or inhalation, could lead to unintended infections, especially if basic hygiene and safety practices are not followed.
                      <br />
                      Infection: While BL-21 is non-pathogenic, exposure through cuts, open wounds, or mucous membranes (e.g., by touching one’s face, eyes, or mouth) could lead to localised infections, particularly in individuals with weakened immune systems.
                      <br />
                      Environmental Contamination: Improper disposal of bacterial cultures or careless handling can lead to contamination of surfaces and equipment, increasing the risk of exposure to others in the laboratory.
                    </td>
                    <td>
                      Gloves: Wear gloves at all times when handling bacterial cultures to avoid direct contact.
                      <br />
                      Face Masks and Goggles: To protect against potential splashes or aerosols, ensure the use of face masks and goggles when working with liquid cultures or during transformation experiments.
                      <br />
                      Lab Coats: Wearing a lab coat minimises the risk of bacteria coming into contact with skin or clothing, and helps prevent the spread of bacteria outside of the lab.
                      <br />
                      Avoid Touching Face: Refrain from touching face, mouth, eyes, or nose while working in the lab.
                      <br />
                      Hand Hygiene: Wash hands thoroughly with soap and water after handling bacterial cultures and before leaving the lab.
                      <br />
                      Surface Disinfection: Regularly disinfect work surfaces, equipment, and tools with appropriate biocidal agents to prevent contamination.
                      <br />
                      Use biosafety cabinets when working with cultures to prevent airborne contamination. Autoclave all biohazardous waste to kill any live bacteria before disposal.
                    </td>
                  </tr>

                  <tr id="cleaning-solutions">
                    <td>Exposure to Hazardous Cleaning Solutions</td>
                    <td>
                      Many laboratory cleaning agents, such as bleach, ethanol, and Virkon disinfectants, can pose risks if not handled properly. These chemicals are often corrosive, irritating, or toxic if inhaled or exposed to skin.
                      <br />
                      Skin and Eye Irritation: Direct contact with these substances can cause chemical burns, irritation, or serious eye damage.
                      <br />
                      Inhalation: Some cleaning chemicals, like bleach or ethanol, release harmful vapours that can irritate the respiratory system.
                      <br />
                      Chemical Reactions: Mixing certain cleaning agents (e.g., bleach and ammonia) can produce dangerous gases such as chloramine vapours.
                    </td>
                    <td>
                      PPE: Always wear gloves, goggles, and, if needed, face masks when handling cleaning chemicals.
                      <br />
                      Ventilation: Work in a well-ventilated area to avoid inhaling fumes. Use fume hoods when necessary.
                      <br />
                      Labelling and Storage: Store cleaning agents properly and ensure they are clearly labelled to avoid accidental misuse or dangerous reactions.
                    </td>
                  </tr>

                  <tr id="glass-equipment">
                    <td>Working with Glass Equipment</td>
                    <td>
                      Glassware such as beakers, flasks, and pipettes are commonly used in the lab but pose risks of injury due to their fragile and sharp nature. Breakage can lead to cuts, punctures, or even chemical exposure if the broken glass contains hazardous substances.
                      <br />
                      Cuts and Lacerations: Broken glass can cause deep cuts or punctures, leading to injury and possible contamination.
                      <br />
                      Chemical Exposure: If glassware containing hazardous chemicals breaks, it can result in accidental exposure through skin contact, inhalation, or ingestion.
                    </td>
                    <td>
                      Proper Handling: Always handle glassware with care, particularly when it contains liquids or chemicals. Avoid using cracked or damaged glassware.
                      <br />
                      Broken Glass Disposal: Immediately clean up broken glass with a brush and dustpan—never use your hands—and dispose of it in designated sharps containers. Be mindful of glass contaminated with chemicals.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
           
          </section>

          <section id="application" className="model-subsection">
            <h2 className="project-context-title">Application</h2>
            <p className="project-description">
              Our project is designed to provide a simple diagnostic test kit for Cryptosporidiosis that can be used directly in clinical environments where the disease burden is highest. The diagnostic system would allow rapid detection of the parasite’s 18S rRNA, helping clinicians identify infections more quickly and accurately. To ensure safety, the protein components will be purified and tested under controlled laboratory conditions before any clinical application. The system itself does not involve live pathogenic organisms, reducing the risks of accidental exposure.
            </p>
            <p className="project-description">
              Oocysts extraction from stool samples will be carried out in clinical laboratories, already equipped to handle patient specimens safely, keeping the extraction process close to the point of care while following standard biosafety protocols.
            </p>
            <p className="project-description">
              As an added safeguard, the assay is designed to be self-contained, with closed-tube reactions and colourimetric readouts to minimise contamination, which can also affect the diagnostic procedure. The test is cell-free.
            </p>
          </section>

          <section id="policies" className="model-subsection">
            <h2 className="project-context-title">Policies / Regulations</h2>
            <ul className="project-description">
              <li>
                The Control of Substances Hazardous to Health Regulations 2002{" "}
                <a href="https://www.legislation.gov.uk/uksi/2002/2677/contents/made" target="_blank" rel="noopener noreferrer">
                  https://www.legislation.gov.uk/uksi/2002/2677/contents/made
                </a>
              </li>
              <li>
                The Genetically Modified Organisms (Contained Use) Regulations 2014{" "}
                <a href="https://www.legislation.gov.uk/uksi/2014/1663/contents/made" target="_blank" rel="noopener noreferrer">
                  https://www.legislation.gov.uk/uksi/2014/1663/contents/made
                </a>
              </li>
              <li>
                CLEAPSS guidance:{" "}
                <a href="https://science.cleapss.org.uk/Resources/Student-Safety-Sheets/" target="_blank" rel="noopener noreferrer">
                  https://science.cleapss.org.uk/Resources/Student-Safety-Sheets/
                </a>
              </li>
              <li>
                KCL Health, Safety, Welfare and Fire Safety policy:{" "}
                <a href="https://www.kcl.ac.uk/policyhub/health-safety-welfare-policy" target="_blank" rel="noopener noreferrer">
                  https://www.kcl.ac.uk/policyhub/health-safety-welfare-policy
                </a>
              </li>
            </ul>
            <p className="project-description">
              In the lab at King’s College London, we consulted Klaire Neale and Dr Anatoliy Markiv for practical guidance. For theoretical safety considerations and future implementation, we discussed requirements with Lyndsay Muirhead, which guided the prototype’s hardware design, including filters and UV light to prevent exposure.
            </p>
          </section>

          <section id="KCL-safety-record" className="model-subsection">
            <h2 className="project-context-title">KCL Lab Safety Record</h2>
            <p className="project-description">
              We managed biocontainment risks by adhering to regulations and protocols from our training and our supervisor, Dr Markiv. Key measures included proper waste disposal in autoclave bags and wearing gloves and goggles. Dr Markiv was always present during lab time to address any issues.
            </p>
            <p className="project-description">
              We used a teaching lab in the King’s College London Hodgkin Building, equipped with gel electrophoresis tools, cloning equipment, an incubator, and freezers. The equipment is well-maintained and regularly used for undergraduate teaching. We sought advice when using new equipment and did not require a biosafety cabinet for our protocols. Before entering and leaving the lab, we washed our hands at the provided sinks. We wore PPE, including gloves, lab coats, and goggles, when handling materials.
            </p>
            <p className="project-description">
              Waste was sorted into normal waste, gloves, sharps, and biological material. KCL technicians managed disposal, with biological material autoclaved in autoclave bags before disposal. Sharps were placed in bins emptied regularly to avoid overfilling. Bins were clearly marked to prevent improper disposal of gloves. After using bacteria on open benches, we cleaned the area with 1% Virkon.
            </p>
            <p className="project-description">
              No accidents occurred during our lab time. Sharps and broken glass bins were available, and spills were cleaned with 1% Virkon. There was no fire risk as no highly flammable substances were used and no open flames were present. Any flammable solvents present in the lab were stored in a designated cabinet with clear signage.
            </p>
            <p className="project-description">
              Before entering and leaving the lab, we washed our hands at the sinks provided. PPE including gloves, lab coats and goggles was provided and worn when handling materials.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
