import { useEffect, useState } from "react";
import "../assets/css/model.css";
import ProteinPDB from "../assets/output-pdb.ts"; 
import rRNA from "../assets/proteinpdb-pdb.ts"; 
import MolViewer from "../components/MolViewer.tsx"
import B3 from "../assets/B3-pdb.ts"; 
import BIP from "../assets/BIP-pdb.ts"; 
import F3 from "../assets/f3-pdb.ts"; 
import FIP from "../assets/FIP-pdb.ts"; 
import LB from "../assets/LB-pdb.ts"; 
import LF from "../assets/LF-pdb.ts"; 

// remove comments tmrwT

export const Parts = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const sections = [
    "overview",
    "parts-table",
    "collections",
    "primers",
    "protocols",
    "3d-models",
    "oocyst-separation",
    "future-iGEM-advice",
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
            <li
              key={section}
              className={activeSection === section ? "active" : ""}
            >
              <a href={`#${section}`}>
                {section
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="project-content">
        <div className="project-context-wrapper">
          <h1 className="education-intro-title">Parts</h1>

          <section id="overview">
            <p>
              {" "}
              For our project we have created 11 new basic parts, all involving
              the LAMP reaction.{" "}
            </p>

            <h3>LAMP Primers</h3>
            <p>
              The 6 primers (F3, B3, FIB, BIP, LF and LB) were designed using
              New England Biolabs’ free primer design software using a specific
              Cryptosporidium 18srRNA sequence.
            </p>
            <p>
              We have extensively analysed these primers with a variety of
              software tools to calculate important values which are important
              to know when using them in future projects. We have also worked
              out dimers (both self-dimers, as well as dimers within the primer
              set) and hairpins so future teams can be aware of these aspects of
              this primer set.
            </p>
            <p>
              When looking at the primer set as a whole, it seems to be more
              stable and better at binding, with lower hairpin frequency, as
              well as lower rates of dimerisation compared to the best current
              primer set in published research (found here{" "}
              <a
                href="https://doi.org/10.1007/s11686-023-00791-x"
                target="_blank"
              >
                https://doi.org/10.1007/s11686-023-00791-x
              </a>
              ).
            </p>

            <h3>HpStBL Fusion Protein</h3>
            <img
  src="https://static.igem.wiki/teams/5602/contribution/hpstblfusion.webp"
  alt="HpStBL fusion protein"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "10px" 
  }}
/>

<p>
  The most significant contribution we have made is the double
              domain fusion protein we designed, composed of Bst DNA polymerase
              fused with Hp47 and Sto7d domains. Hp47 is a hydrophobic protein
              that helps both increase amplification speed and thermal
              stability, and Sto7d is a DNA binding protein that improves the
              reverse transcriptase activity of the Bst polymerase enzyme. This
              eliminates the need for additional reverse transcriptase, helping
              reduce costs and complexity. Sto7d also improves the inhibition
              tolerance of the enzyme increasing its flexibility of use.
</p>

            
            <p>
              Through extensive research and modelling, we decided to go with
              this fusion in particular because it seemed best suited for our
              purposes, as can be read about in the design page.
            </p>

            <h3>Unused Fusion Proteins</h3>

            <h4>HpBL</h4>
            <p>
              This is a fusion Bst that only has the Hp47 subdomain, and so has
              a higher thermostability but roughly similar reverse transcriptase
              activity to the wild-type Bst.
            </p>

            <h4>StHpBL</h4>
            <p>
              This fusion has both Hp47 and Sto7d domains, but in a different
              arrangement to HpStBL, which means that unfortunately it has a
              lower thermostability and reverse transcriptase activity compared
              to HpStBL due to the interactions between these domains. However,
              its inhibitor tolerance is incredibly high, and has a solid
              average performance in the other tasks, so we have made it a part
              for future teams to use.
            </p>

            <h4>StBL</h4>
            <p>
              This is a fusion Bst that only has the Sto7d subdomain. It has a
              high thermostability and high speed of amplification but
              relatively lower reverse transcriptase activity, and so we hope it
              is helpful to other teams wanting these properties in a fusion
              Bst.
            </p>

            <h4>18srRNA</h4>
            <p>
              We also adapted the 18S rRNA sequence into a biobrick for ease of
              expression for any future labwork. The sequence was BLAST analysed
              to ensure specificity to Cryptosporidium, as well as lack of
              variability within the cryptosporidium genus. This is due to the
              fact it is a functional RNA so mutations are not passed on as
              commonly, as well as the fact that Cryptosporidium has a robust
              DNA and RNA repair system in its oocyst form, reducing the rate of
              mutation in this rRNA, making it a particularly good target.
            </p>
            <p>
              We would transform the plasmid containing the 18s rRNA into BL21
              E.coli and then wait for them to express it, selecting once again
              using a chloramphenicol marker. This would be a novel technique of
              testing diagnostic targets, as usually, only gene fragments are
              tested.
            </p>
            <p>
              What this method enables us to do is, in a way, mirror the actual
              environment of the test - the 18s rRNA is enclosed inside of a
              cell membrane in a way that is similar to where it would be found
              in a Crypto Sp. oocyst, and we can see whether our theoretical
              test would work even if other molecules were in the vicinity of
              the target.
            </p>
          </section>

          <section id="parts-table">
            <h2 className="project-context-title">Parts Table</h2>
            <div className="safety-table-container">
              <table className="safety-table">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-255ubqv3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_255UBQV3
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      Cryptosporidium sp. isolate OP88 clone 18SG 18S ribosomal
                      RNA gene, partial sequence
                    </td>
                    <td>938</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25lhxrak"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25LHXRAK
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      Encodes HpStBL Double Domain Fusion of Bst Polymerase with
                      Hp47 and Sto7d
                    </td>
                    <td>2431</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25tb00ag"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TB00AG
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      Encodes HpBL single Domain Fusion of Bst polymerase highly
                      hydrophobic protein Hp47
                    </td>
                    <td>1967</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-259vljfc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_259VLJFC
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      Encodes StHpBL Double Domain Fusion of Bst polymerase
                      highly hydrophobic protein Hp47 and DNA-binding protein
                      Sto7d
                    </td>
                    <td>2425</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25bqth7i"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25BQTH7I
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      Encodes StBL Single Domain Fusion of Bst polymerase with
                      DNA-binding protein Sto7d
                    </td>
                    <td>2076</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25tjls6m"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TJLS6M
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      F3 LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25ocuvws"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25OCUVWS
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      B3 LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25dyk1t2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25DYK1T2
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      FIP LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>42</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25ms5u8d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25MS5U8D
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      BIP LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-256ipdpd"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_256IPDPD
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      LF LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25uicgar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25UICGAR
                      </a>
                    </td>
                    <td>Basic</td>
                    <td>
                      LB LAMP Primer for Cryptosporidium sp. isolate OP88 clone
                      18SG 18S ribosomal RNA region
                    </td>
                    <td>25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="collections">
            <h2 className="project-context-title">Collections</h2>
            <div className="safety-table-container">
              <table className="safety-table">
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Description</th>
                    <th>Parts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/collections/d4bcd7da-bdfb-4c86-9ffd-392006b89f71"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        All CryptoKnight Parts
                      </a>
                    </td>
                    <td>All of the parts designed for the project</td>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-255ubqv3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_255UBQV3
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25lhxrak"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25LHXRAK
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25uicgar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25UICGAR
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-256ipdpd"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_256IPDPD
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ms5u8d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25MS5U8D
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25dyk1t2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25DYK1T2
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ocuvws"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25OCUVWS
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25tjls6m"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TJLS6M
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25tb00ag"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TB00AG
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-259vljfc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_259VLJFC
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25bqth7i"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25BQTH7I
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/collections/a0aa5f97-220a-451a-bcae-2f468da64957"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cryptosporidium sp. 18s rRNA LAMP Primers
                      </a>
                    </td>
                    <td>LAMP Primers for Cryptosporidium sp. 18s rRNA</td>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25uicgar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25UICGAR
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-256ipdpd"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_256IPDPD
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ms5u8d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25MS5U8D
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25dyk1t2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25DYK1T2
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ocuvws"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25OCUVWS
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25tjls6m"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TJLS6M
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/collections/a4027b84-72c2-49b5-adcd-83e271ba252f"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Fusion Bst Polymerases
                      </a>
                    </td>
                    <td>
                      Fusion Bst Polymerases, with highly hydrophobic protein
                      Hp47 and/or DNA-binding protein Sto7d.
                    </td>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-25lhxrak"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25LHXRAK
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25tb00ag"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TB00AG
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-259vljfc"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_259VLJFC
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25bqth7i"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25BQTH7I
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a
                        href="https://registry.igem.org/collections/99b96f81-cef0-4f48-951b-8d608ffd7e77"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        CryptoKnight Parts
                      </a>
                    </td>
                    <td>
                      A Collection of parts used for the 2025 City_of_London
                      iGEM project CryptoKnight.
                    </td>
                    <td>
                      <a
                        href="https://registry.igem.org/parts/bba-255ubqv3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_255UBQV3
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25lhxrak"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25LHXRAK
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25uicgar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25UICGAR
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-256ipdpd"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_256IPDPD
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ms5u8d"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25MS5U8D
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25dyk1t2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25DYK1T2
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25ocuvws"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25OCUVWS
                      </a>
                      ,
                      <a
                        href="https://registry.igem.org/parts/bba-25tjls6m"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BBa_25TJLS6M
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="project-context-wrapper">
            <section id="primers">
              <h2 className="project-context-title">
                FIP LAMP Primer for 18s rRNA
              </h2>
              <p>
                This is a FIP LAMP Primer for <em>Cryptosporidium sp.</em>{" "}
                isolate OP88 clone 18SG 18S ribosomal RNA region, found in
                biobrick form here:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
                
              </p>
              <img
                src="https://static.igem.wiki/teams/5602/contribution/partsprimerfip.webp"
                alt="FIP LAMP Primer"
                style={{
                  width: "400px",
                  height: "auto",
                  float: "left",       
                  marginRight: "10px", 
                  marginBottom: "50px" 
                }}
              />
              <p>
                We have used a variety of tools to analyse this primer,
                outlining its %GC content, melting temperature, extinction
                coefficient as well as hairpins and dimers. Oligo-Analyser and
                RNAFold were used to compute these values. The{" "}
                <strong>△G</strong> value represents Gibbs free energy: more
                negative values suggest dimerisation or hairpin formation is
                more likely.
              </p>
              <p>
                Less negative △G values are better when considering dimers and
                hairpins but less useful for binding efficacy. Overall, this
                primer set is less likely to have hairpins and dimers, with an
                ideal %GC compared to the best published 18s rRNA primer sets.
              </p>

              <h3>General Data</h3>
              <div className="safety-table-container">
                <table className="safety-table">
                  <tbody>
                    <tr>
                      <td>SEQUENCE</td>
                      <td>
                        5'- TTC CCC GTT ACC CGT CAT TGT TCA AGT TTC TGA CCT ATC
                        AGC -3'
                      </td>
                    </tr>
                    <tr>
                      <td>COMPLEMENT</td>
                      <td>
                        5'- GCT GAT AGG TCA GAA ACT TGA ACA ATG ACG GGT AAC GGG
                        GAA -3'
                      </td>
                    </tr>
                    <tr>
                      <td>LENGTH</td>
                      <td>42</td>
                    </tr>
                    <tr>
                      <td>GC CONTENT</td>
                      <td>47.6 %</td>
                    </tr>
                    <tr>
                      <td>MELT TEMP</td>
                      <td>74.4 °C</td>
                    </tr>
                    <tr>
                      <td>MOLECULAR WEIGHT</td>
                      <td>12717.3 g/mole</td>
                    </tr>
                    <tr>
                      <td>EXTINCTION COEFFICIENT</td>
                      <td>377600 L/(mole·cm)</td>
                    </tr>
                    <tr>
                      <td>nmole/OD260</td>
                      <td>2.65</td>
                    </tr>
                    <tr>
                      <td>ug/OD260</td>
                      <td>33.68</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>△G (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>△H (kcal/mol)</td>
                    <td>△S (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>-3.27</td>
                    <td>44.7</td>
                    <td>-52.8</td>
                    <td>-166.12</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>-1.87</td>
                    <td>33.1</td>
                    <td>-70.7</td>
                    <td>-230.85</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −80.92 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <p>
                The FIP Primer works with the BIP Primer, each containing two
                sequences for sense and antisense DNA. BIP Primer:{" "}
                <a href="https://registry.igem.org/parts/bba-25ms5u8d" target="_blank">
                  BBa_25MS5U8D
                </a>
                . No other inter-primer dimers observed.
              </p>

              <br />
              <h3>Interactive 3D Structure Viewer</h3>
            <br />
            <MolViewer
              structure={FIP}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>

              {/* BIP Primer */}
              <h2 className="project-context-title">
                BIP LAMP Primer for 18s rRNA
              </h2>
        
              <p>
                This is a BIP LAMP Primer for <em>Cryptosporidium sp.</em>{" "}
                isolate OP88 clone 18SG 18S rRNA, biobrick:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
                
              </p>
              <img
  src="https://static.igem.wiki/teams/5602/contribution/partsprimerbip-1.webp"
  alt="BIP LAMP Primer"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "100px" 
  }}
/>
              <p>
                We have used a variety of tools to analyse this primer,
                outlining its %GC, Melting temperature, extinction coefficient
                as well as the hairpins and dimers it forms. We have used
                Oligo-Analyser and RNAFold to compute these. The △G (describing
                gibbs free energy) value represents how thermodynamically
                favourable the occurence is, with more negative values
                suggesting that the process (In this case dimerisation or
                hairpins are more likely to occur). As a rough guide, less
                negative △G values are better when considering dimers and
                hairpins, but less helpful when considering binding efficacy.
                Overall, this primer set is less likely to have hairpins and
                dimers, as has a more ideas %GC compared to the current best
                published set for the 18s rRNA Target.
              </p>

              <h3>General Data</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>SEQUENCE</td>
                    <td>
                      5'- AGG GTT CGA TTC CGG AGA GGG GAT TGG GTA ATT TGC GC -3'
                    </td>
                  </tr>
                  <tr>
                    <td>COMPLEMENT</td>
                    <td>
                      5'- GCG CAA ATT ACC CAA TCC CCT CTC CGG AAT CGA ACC CT -3'
                    </td>
                  </tr>
                  <tr>
                    <td>LENGTH</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>GC CONTENT</td>
                    <td>55.3 %</td>
                  </tr>
                  <tr>
                    <td>MELT TEMP</td>
                    <td>76.2 °C</td>
                  </tr>
                  <tr>
                    <td>MOLECULAR WEIGHT</td>
                    <td>11885.7 g/mole</td>
                  </tr>
                  <tr>
                    <td>EXTINCTION COEFFICIENT</td>
                    <td>373000 L/(mole·cm)</td>
                  </tr>
                  <tr>
                    <td>nmole/OD260</td>
                    <td>2.68</td>
                  </tr>
                  <tr>
                    <td>ug/OD260</td>
                    <td>31.87</td>
                  </tr>
                </tbody>
              </table>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>△G (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>△H (kcal/mol)</td>
                    <td>△S (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>-1.03</td>
                    <td>40.4</td>
                    <td>-21</td>
                    <td>-66.98</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>-0.92</td>
                    <td>37.8</td>
                    <td>-22.5</td>
                    <td>-72.37</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>-0.82</td>
                    <td>32.2</td>
                    <td>-34.4</td>
                    <td>-112.64</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>-0.35</td>
                    <td>28.6</td>
                    <td>-29.4</td>
                    <td>-97.44</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −82.62 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <p>
                {" "}
                The BIP Primer works in conjunction with the FIP Primer, each
                contains two distinct sequences corresponding to the sense and
                antisense sequences of the target DNA, one for priming in the
                first stage and the other for self-priming in later stages. FIP
                Primer found here:{" "}
              </p>
              <a href="https://registry.igem.org/parts/bba-25dyk1t2" target="_blank">
                BBa_25DYK1T2
              </a>
              <pre>
                Interaction with LF primer (BBa_25MS5U8D):
                5-agggttcgattccggagaggggattgggtaatttgcgc-&gt; | | |||| |||||
                &lt;-aaatctgccatcccataaccgga-5 Interaction with B3 Primer
                (BBa_25OCUVWS): 5-agggttcgattccggagaggggattgggtaatttgcgc-&gt; |
                | | |||| | &lt;-atgtccctccatcactgt-5
              </pre>
              <p>Effect of these dimers on LAMP activity is minimal.</p>


            <br />
             <h3>Interactive 3D Structure Viewer</h3>
            <br />
            <MolViewer
              structure={BIP}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>


              <h2 className="project-context-title">
                B3 LAMP Primer for 18s rRNA
              </h2>
              <p>
                This is a B3 LAMP Primer for <em>Cryptosporidium sp.</em>{" "}
                isolate OP88 clone 18SG 18S rRNA, biobrick:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
                .
              </p>
              <img
  src="https://static.igem.wiki/teams/5602/contribution/partsprimerb3-1.webp"
  alt="B3 LAMP Primer"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "100px" 
  }}
/>
              <p>
                {" "}
                We have used a variety of tools to analyse this primer,
                outlining its %GC, Melting temperature, extinction coefficient
                as well as the hairpins and dimers it forms. We have used
                Oligo-Analyser and RNAFold to compute these. The △G (describing
                gibbs free energy) value represents how thermodynamically
                favourable the occurence is, with more negative values
                suggesting that the process (In this case dimerisation or
                hairpins are more likely to occur). As a rough guide, less
                negative △G values are better when considering dimers and
                hairpins, but less helpful when considering binding efficacy.
                Overall, this primer set is less likely to have hairpins and
                dimers, as has a more ideal %GC compared to the current best
                published set for the 18s rRNA Target.
              </p>
              <h3>General Data</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>SEQUENCE</td>
                    <td>5'- TGT CAC TAC CTC CCT GTA -3'</td>
                  </tr>
                  <tr>
                    <td>COMPLEMENT</td>
                    <td>5'- TAC AGG GAG GTA GTG ACA -3'</td>
                  </tr>
                  <tr>
                    <td>LENGTH</td>
                    <td>18</td>
                  </tr>
                  <tr>
                    <td>GC CONTENT</td>
                    <td>50 %</td>
                  </tr>
                  <tr>
                    <td>MELT TEMP</td>
                    <td>58.5 °C</td>
                  </tr>
                  <tr>
                    <td>MOLECULAR WEIGHT</td>
                    <td>5385.5 g/mole</td>
                  </tr>
                  <tr>
                    <td>EXTINCTION COEFFICIENT</td>
                    <td>161100 L/(mole·cm)</td>
                  </tr>
                  <tr>
                    <td>nmole/OD260</td>
                    <td>6.21</td>
                  </tr>
                  <tr>
                    <td>ug/OD260</td>
                    <td>33.43</td>
                  </tr>
                </tbody>
              </table>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>△G (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>△H (kcal/mol)</td>
                    <td>△S (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>0.22</td>
                    <td>21.6</td>
                    <td>-18.6</td>
                    <td>-63.11</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>0.39</td>
                    <td>18</td>
                    <td>-16.2</td>
                    <td>-55.63</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>0.89</td>
                    <td>12.2</td>
                    <td>-19.9</td>
                    <td>-69.73</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>0.94</td>
                    <td>2.7</td>
                    <td>-11.6</td>
                    <td>-42.06</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −30.31 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <p>
                B3, in conjunction with F3, are thought to initiate the
                exponential phase of amplification by binding upstream of the
                inner primers to support strand displacement DNA synthesis so
                that the displaced strand can fold into the characteristic
                double stem–loop dumbbell-like structure. F3 Primer found here:
              </p>
              <a href="https://registry.igem.org/parts/bba-25tjls6m" target="_blank">
                BBa_25TJLS6M
              </a>
              <pre>
                Interaction with F3 Primer (BBa_25TJLS6M):
                5-agggttcgattccggagaggggattgggtaatttgcgc-&gt; | | | |||| |
                &lt;-atgtccctccatcactgt-5
              </pre>
              <p>Effect on LAMP activity is minimal.</p>


              <br />
               <h3>Interactive 3D Structure Viewer</h3>
            <br />
            <MolViewer
              structure={B3}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>

              <h2 className="project-context-title">
                F3 LAMP Primer for 18s rRNA
              </h2>
              <p>
                This is a F3 LAMP Primer for Cryptosporidium sp. isolate OP88
                clone 18SG 18S ribosomal RNA region, which can be found in
                biobrick form here: Biobrick:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
              </p>
              <img
  src="https://static.igem.wiki/teams/5602/contribution/partsprimerf3.avif"
  alt="F3 LAMP Primer"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "100px" 
  }}
/>
              <p>
                {" "}
                We have used a variety of tools to analyse this primer,
                outlining its %GC, Melting temperature, extinction coefficient
                as well as the hairpins and dimers it forms. We have used
                Oligo-Analyser and RNAFold to compute these. The △G (describing
                gibbs free energy) value represents how thermodynamically
                favourable the occurence is, with more negative values
                suggesting that the process (In this case dimerisation or
                hairpins are more likely to occur). As a rough guide, less
                negative △G values are better when considering dimers and
                hairpins, but less helpful when considering binding efficacy.
                Overall, this primer set is less likely to have hairpins and
                dimers, as it has a more ideal %GC compared to the current best
                published set for the 18s rRNA Target.
              </p>

              <h3>General Data</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>SEQUENCE</td>
                    <td>5'- CGG ATC ACA TTT TTA TGT GAC AT -3'</td>
                  </tr>
                  <tr>
                    <td>COMPLEMENT</td>
                    <td>5'- ATG TCA CAT AAA AAT GTG ATC CG -3'</td>
                  </tr>
                  <tr>
                    <td>LENGTH</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>GC CONTENT</td>
                    <td>34.8 %</td>
                  </tr>
                  <tr>
                    <td>MELT TEMP</td>
                    <td>60 °C</td>
                  </tr>
                  <tr>
                    <td>MOLECULAR WEIGHT</td>
                    <td>7028.6 g/mole</td>
                  </tr>
                  <tr>
                    <td>EXTINCTION COEFFICIENT</td>
                    <td>221800 L/(mole·cm)</td>
                  </tr>
                  <tr>
                    <td>nmole/OD260</td>
                    <td>4.51</td>
                  </tr>
                  <tr>
                    <td>ug/OD260</td>
                    <td>31.69</td>
                  </tr>
                </tbody>
              </table>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>△G (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>△H (kcal/mol)</td>
                    <td>△S (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>-4.93</td>
                    <td>62.4</td>
                    <td>-44.3</td>
                    <td>-132.03</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −39.84 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <p>
                {" "}
                F3, in conjunction with B3, are thought to initiate the
                exponential phase of amplification by binding upstream of the
                inner primers to support strand displacement DNA synthesis so
                that the displaced strand can fold into the characteristic
                double stem–loop dumbbell-like structure. The B3 Primer can be
                found here:
              </p>
              <a href="https://registry.igem.org/parts/bba-25ocuvws" target="_blank">
                BBa_25OCUVWS
              </a>
              <pre>
                Self primers: 5-cggatcacatttttatgtgacat-&gt; |||| ||||
                &lt;-tacagtgtatttttacactaggc-5 Interaction with B3 Primer
                (BBa_25OCUVWS)
              </pre>
              <p>Effect on LAMP activity is minimal.</p>
              <br />

               <h3>Interactive 3D Structure Viewer</h3>
               <br />

              <MolViewer
              structure={F3}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>

              <h2 className="project-context-title">LB Primer for 18s rRNA</h2>
              <p>
                This is a LB LAMP Primer for Cryptosporidium sp. isolate OP88
                clone 18SG 18S ribosomal RNA region, which can be found in
                biobrick form here:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
              </p>
              <img
  src="https://static.igem.wiki/teams/5602/contribution/partsprimerlb.webp"
  alt="LB LAMP Primer"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "100px" 
  }}
/>
              <p>
                We have used a variety of tools to analyse this primer,
                outlining its %GC, Melting temperature, extinction coefficient
                as well as the hairpins and dimers it forms. We have used
                Oligo-Analyser and RNAFold to compute these. The △G (describing
                gibbs free energy) value represents how thermodynamically
                favourable the occurence is, with more negative values
                suggesting that the process (In this case dimerisation or
                hairpins are more likely to occur). As a rough guide, less
                negative △G values are better when considering dimers and
                hairpins, but less helpful when considering binding efficacy.
                Overall, this primer set is less likely to have hairpins and
                dimers, as has a more ideal %GC compared to the current best
                published set for the 18s rRNA Target.
              </p>

              <h3>General Data</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>SEQUENCE</td>
                    <td>5'- GAA ACG GCT ACC ACA TCT AAG GAA G -3'</td>
                  </tr>
                  <tr>
                    <td>COMPLEMENT</td>
                    <td>5'- CTT CCT TAG ATG TGG TAG CCG TTT C -3'</td>
                  </tr>
                  <tr>
                    <td>LENGTH</td>
                    <td>25</td>
                  </tr>
                  <tr>
                    <td>GC CONTENT</td>
                    <td>48 %</td>
                  </tr>
                  <tr>
                    <td>MELT TEMP</td>
                    <td>64.6 °C</td>
                  </tr>
                  <tr>
                    <td>MOLECULAR WEIGHT</td>
                    <td>7693.1 g/mole</td>
                  </tr>
                  <tr>
                    <td>EXTINCTION COEFFICIENT</td>
                    <td>255100 L/(mole·cm)</td>
                  </tr>
                  <tr>
                    <td>nmole/OD260</td>
                    <td>3.92</td>
                  </tr>
                  <tr>
                    <td>ug/OD260</td>
                    <td>30.16</td>
                  </tr>
                </tbody>
              </table>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>ΔG (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>ΔH (kcal/mol)</td>
                    <td>ΔS (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>-0.83</td>
                    <td>38.4</td>
                    <td>-19.2</td>
                    <td>-61.63</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>0.11</td>
                    <td>23.2</td>
                    <td>-17.9</td>
                    <td>-60.4</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −46.19 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <pre>
                LB &lt;-&gt; LF (BBa_256IPDPD) ID dimer ΔG 5' pos 3' pos len Tm
                5' dG 3' dG % GC LF 1.77 67 89 23 65.05 -6.59 -3.10 48 LB 1.77
                147 171 25 65.20 -4.95 -4.69 48
              </pre>
              <p>Primer not involved in cross-primer dimers.</p>

              <br />
               <h3>Interactive 3D Structure Viewer</h3>
            <br />
            <MolViewer
              structure={LB}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>

              <h2 className="project-context-title">
                LF LAMP Primer for 18s rRNA
              </h2>
              <p>
                Biobrick:{" "}
                <a href="https://registry.igem.org/parts/bba-255ubqv3" target="_blank">
                  BBa_255UBQV3
                </a>
              </p>
              <img
  src="https://static.igem.wiki/teams/5602/contribution/partsprimerlf.webp"
  alt="LF LAMP Primer"
  style={{
    width: "400px",
    height: "auto",
    float: "left",       
    marginRight: "10px", 
    marginBottom: "140px" 
  }}
/>
              <p>
                {" "}
                This is a LF LAMP Primer for Cryptosporidium sp. isolate OP88
                clone 18SG 18S ribosomal RNA region, which can be found in
                biobrick form here: BBa_255UBQV3 We have used a variety of tools
                ot analyse this primer, outlining its %GC, Melting temperature,
                extinction coefficient as well as the hairpins and dimers it
                forms. We have used Oligo-Analyser and RNAFold to compute these.
                The △G (describing gibbs free energy) value represents how
                thermodynamically favourable the occurence is, with more
                negative values suggesting that the process (In this case
                dimerisation or hairpins are more likely to occur). As a rough
                guide, less negative △G values are better when considering
                dimers and hairpins, but less helpful when considering binding
                efficacy. Overall, this primer set is less likely to have
                hairpins and dimers, as it has a more ideal %GC compared to the
                current best published set for the 18s rRNA target.
              </p>

              <h3>General Data</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>SEQUENCE</td>
                    <td>5'- AGG CCA ATA CCC TAC CGT CTA A -3'</td>
                  </tr>
                  <tr>
                    <td>COMPLEMENT</td>
                    <td>5'- TTT AGA CGG TAG GGT ATT GGC CT -3'</td>
                  </tr>
                  <tr>
                    <td>LENGTH</td>
                    <td>23</td>
                  </tr>
                  <tr>
                    <td>GC CONTENT</td>
                    <td>47.8 %</td>
                  </tr>
                  <tr>
                    <td>MELT TEMP</td>
                    <td>64.9 °C</td>
                  </tr>
                  <tr>
                    <td>MOLECULAR WEIGHT</td>
                    <td>6961.6 g/mole</td>
                  </tr>
                  <tr>
                    <td>EXTINCTION COEFFICIENT</td>
                    <td>225100 L/(mole·cm)</td>
                  </tr>
                  <tr>
                    <td>nmole/OD260</td>
                    <td>4.44</td>
                  </tr>
                  <tr>
                    <td>ug/OD260</td>
                    <td>30.93</td>
                  </tr>
                </tbody>
              </table>

              <h3>Hairpins</h3>
              <table className="safety-table">
                <tbody>
                  <tr>
                    <td>Structure</td>
                    <td>△G (kcal/mol)</td>
                    <td>Tm (°C)</td>
                    <td>△H (kcal/mol)</td>
                    <td>△S (cal/K/mol)</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>-0.1</td>
                    <td>26.9</td>
                    <td>-16.8</td>
                    <td>-56</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>-0.08</td>
                    <td>26.4</td>
                    <td>-17.1</td>
                    <td>-57.08</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>0.57</td>
                    <td>15.7</td>
                    <td>-17.7</td>
                    <td>-61.27</td>
                  </tr>
                </tbody>
              </table>

              <h3>Dimerisation</h3>
              <p>Maximum △G of Dimerisation: −44.64 kcal/mol</p>

              <h3>Inter-Primer Interactions</h3>
              <p>
                {" "}
                The LF Primer works in conjunction with the LB primer to form
                loops during Loop Mediated Isothermal Amplification, so we also
                include a table showing how they interact with each other. LB
                Primer can be found at:
              </p>
              <a href="https://registry.igem.org/parts/bba-25uicgar" target="_blank">
                BBa_25UICGAR
              </a>
              <pre>
                LF &lt;-&gt; LB (BBa_25UICGAR) ID dimer ΔG 5' pos 3' pos len Tm
                5' dG 3' dG % GC LF 1.77 67 89 23 65.05 -6.59 -3.10 48 LB 1.77
                147 171 25 65.20 -4.95 -4.69 48 Interaction with BIP Primer
                (BBa_25MS5U8D) 5-agggttcgattccggagaggggattgggtaatttgcgc-&gt; | |
                |||| ||||| &lt;-aaatctgccatcccataaccgga-5
              </pre>
              <p>The effect of this dimer on LAMP activity is minimal.</p>

              <br />
               <h3>Interactive 3D Structure Viewer</h3>
            <br />
              <MolViewer
              structure={LF}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            </section>
          </div>
          <section id="protocols">
            <h2 className="project-context-title">Protocols</h2>

            <h2 className="project-context-title">
              Revised expression of 18sRNA
            </h2>
            <p>
              <strong>Method:</strong>
            </p>

            <h4>Digest pSBC13 backbone (to isolate the gene)</h4>
            <p>
              <strong>Mix for digestion:</strong>
            </p>
            <p>
              Reagents Volume Nuclease free water (to 50 µl) Buffer 2:1 (10X) 5
              μl DNA 500 ng EcoRI-HF 1 μl PstI 1 μl Total 50 μl
            </p>
            <p>Add enzymes last and make up to 50 μl.</p>
            <p>37°C for 10 mins and 80°C for 20 mins to denature.</p>

            <h4>Gel purification using electrophoresis:</h4>
            <ul>
              <li>Prepare 1% agarose gel (use TBE buffer not TAE).</li>
              <li>
                <a
                  href="https://static.igem.org/mediawiki/2019/5/53/T--UCSC--gel-electro.pdf"
                  target="_blank"
                >
                  UCSC Gel Electro Method
                </a>{" "}
                - method for large scale preparation of agarose.
              </li>
              <li>
                Standard gel electrophoresis: place combs first, fill tray + let
                set, remove bubbles from wells using micropipette, flood with
                TBE buffer.
              </li>
              <li>
                Place under light + use sterile knife to extract DNA (limit
                exposure + make clean cuts taking as little surrounding gel as
                possible).
              </li>
            </ul>

            <h4>Insert</h4>
            <ul>
              <li>add 2 μL of digested plasmid backbone</li>
              <li>(Equimolar) EcoRI/Pstl-digested insert (2μL)</li>
              <li>add 1μL T4 DNA ligament buffer</li>
              <li>Add 0.5μL T4 DNA ligase</li>
              <li>add water to 10μL total</li>
              <li>ligate at 16°C for 30 mins</li>
              <li>Heat-inactivate at 80°C for 20 mins</li>
            </ul>

            <h2 className="project-context-title">
              Expression of fusion protein
            </h2>
            <h4>Equipment:</h4>
            <ul>
              <li>Shaking incubator at 37°C</li>
              <li>Stationary incubator at 37°C</li>
              <li>Water bath at 42°C</li>
              <li>Ice bucket (filled with ice)</li>
              <li>Microcentrifuge tubes</li>
              <li>Sterile spreading device</li>
              <li>LB agar plate with 25 μg/mL chloramphenicol</li>
              <li>LB without antibiotic or SOC</li>
            </ul>
            <p>
              <a
                href="https://www.sigmaaldrich.com/GB/en/product/roche/coedtafro?srsltid=AfmBOoouEHv3Z5JrU62e5-mLi1dIoHdULpPsg-KrRIv4pPnwyW0JbYIW"
                target="_blank"
              >
                Sigma Aldrich
              </a>
              <br />
              <a
                href="https://www.neb.com/en-gb/products/s1427-nebexpress-ni-spin-columns"
                target="_blank"
              >
                NEB Ni Spin Columns
              </a>
            </p>

            <h4>Making buffers:</h4>
            <p>
              <strong>Buffer A, pH 8.0</strong>
              <br />
              50 mM NaPO4, pH 8.0
              <br />
              300 mM NaCl
              <br />
              15 mM imidazole, pH 8.0
            </p>
            <h4> Other buffers:</h4>
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5989.webp"
              alt="other buffers "
              className="project-image"
              style={{ width: "400px", height: "auto" }}
            />
            <h4>Transformation method:</h4>
            <ol>
              <li>
                Take E. coli cells out of freezer (-80°C) and thaw on ice for
                approx. 20-30 mins.
              </li>
              <li>
                Remove agar plates from storage at 4°C and allow to warm up to
                room temperature.
              </li>
              <li>
                Mix 1-5 μl of DNA into 20-50 μl of E. coli cell mixture (DNA
                volume should be ≤ 10% of total volume). Gently mix by flicking.
              </li>
              <li>Incubate the mixture for 20-30 mins on ice.</li>
              <li>Heat shock at 42°C for 30s.</li>
              <li>Put the tubes back on ice for 5 mins.</li>
              <li>Add 950 μl of room temperature LB or SOC.</li>
              <li>Shake 250 rpm at 37°C for 45 mins.</li>
              <li>
                Plate 50–100 μL of each dilution onto LB agar + chloramphenicol
                plates.
              </li>
              <li>Incubate overnight at 37°C.</li>
            </ol>
            <p>
              <a
                href="https://www.neb.com/en-gb/protocols/2012/05/31/high-efficiency-transformation-protocol-c2529"
                target="_blank"
              >
                NEB Transformation Protocol
              </a>
            </p>

            <h4>Expression:</h4>
            <p>
              Prepare 3–5 mL LB in a sterile tube + chloramphenicol. Inoculate
              with a single colony. Incubate overnight at 37°C, 250 rpm (cap
              loosely closed). Add 10 mL to 1 L LB + chloramphenicol, incubate
              to OD600 = 0.6–0.8 (~2h). Induce with IPTG (0.4 mM), 12h at 18°C
              shaking. Pellet at 6000 x g, 4°C, 15 min. Resuspend in 40 mL
              Buffer A + protease inhibitors + lysozyme. Sonicate on ice.
              Centrifuge 20,000 x g @ 4°C 30 min.
            </p>

            <h4>Detecting protein:</h4>
            <ul>
              <li>Use NEB Ni spin columns per manufacturer protocol.</li>
              <li>
                <a
                  href="https://www.neb.com/en-gb/protocols/2019/08/28/nebexpress-ni-spin-column-reaction-protocol-neb-s1427"
                  target="_blank"
                >
                  NEB Ni Spin Column Protocol
                </a>
              </li>
              <li>
                Analyse lysate, flow-through, washes, and eluates by SDS-PAGE.
              </li>
            </ul>
            <strong>
              Interactive 3D model of the HpStBL Fusion Protein (use mouse to move it around).
            </strong>
            <br />
            <br />
            <MolViewer
              structure={rRNA}
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />
            <br></br>
            <br></br>


            <h2 className="project-context-title">For LAMP</h2>
            <p>
              <a
                href="https://www.researchgate.net/publication/24230750_Colorimetric_detection_of_loop-mediated_isothermal_amplification_reaction_by_using_hydroxy_naphthol_blue"
                target="_blank"
              >
                ResearchGate Paper
              </a>
              <br />
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9741705/"
                target="_blank"
              >
                PMC Paper
              </a>
            </p>
            <p>
              Betaine not needed at low GC content &gt;45%.
              <br />
              ENSURE NO CONTAMINATION – LAMP is very sensitive and may produce
              false positives.
            </p>

            <h4>Reagents:</h4>
            <ul>
              <li>Total Volume: 25 μL</li>
              <li>HNB 20 mM stock</li>
              <li>7 test tubes (10-fold serially diluted 18sRNA, 2–9 times)</li>
              <li>25 nmol of all primers</li>
              <li>
                Primer concentrations: 1.6 μM FIP/BIP, 0.2 μM F3/B3, 0.8 μM
                LF/LB
              </li>
              <li>
                1.4 mM dNTP, 8 mM MgSO₄, 8U/μL fusion protein (1 μL), HNB 120 μM
              </li>
              <li>Molecular biology grade H₂O</li>
            </ul>

            <h4>Method:</h4>
            <ol>
              <li>Label 7 test tubes for dilutions (10⁻³ – 10⁻⁹ 18sRNA).</li>
              <li>Prepare a control mixture without 18sRNA.</li>
              <li>
                Prepare 10X primer mix (16 μM FIP/BIP, 2 μM F3/B3, 8 μM LF/LB).
              </li>
              <li>Use C₁V₁ = C₂V₂ for dilutions.</li>
              <li>
                Prepare eight 25 μL reactions: Water → MgSO₄ → Buffer → dNTPs →
                Primer → Fusion Protein → 18sRNA.
              </li>
              <li>Incubate 65°C for 60 min, stop at 80°C for 3 min.</li>
              <li>Observe color change from violet to sky blue.</li>
            </ol>
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5990.webp"
              alt="method "
              className="project-image"
              style={{ width: "400px", height: "auto" }}
            />
            <section id="3d-models" className="model-subsection"></section>
            <h2 className="project-context-title">3D model of </h2>
            <h2 className="project-context-title">Cryptosporidium 18s rRNA</h2>
            <p>
              First ever 3D model of Cryptosporidium 18s rRNA — generated using
              AlphaFold. Available as a BioBrick:{" "}
              <a
                href="https://registry.igem.org/parts/bba-255ubqv3"
                target="_blank"
              >
                https://registry.igem.org/parts/bba-255ubqv3
              </a>
            </p>
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5991.webp"
              alt="3d model"
              className="project-image"
              style={{ width: "700px", height: "auto" }}
            />
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5992.webp"
              alt="3d model "
              className="project-image"
              style={{ width: "700px", height: "auto" }}
            />
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5993.webp"
              alt="3d model "
              className="project-image"
              style={{ width: "500px", height: "auto" }}
            />
            <strong>
              Interactive 3D model of Cryptosporidium 18s rRNA (use mouse to move it around).
            </strong>
            <br />
            <br />
            
              <MolViewer
              structure={ProteinPDB} // THIS IS ACTUALLY THE 18s rRNA 
              format="pdb"
              width={500}
              height={500}
              background="#f5f5f5"
              styleSpec={{ cartoon: { color: "spectrum" }, stick: {} }}
            />


            

            <section
              id="oocyst-separation"
              className="model-subsection"
            ></section>
            <h3>Oocyst Separation Protocol</h3>
            <p>
              When researching our project we noticed that no iGEM team had
              prepared a protocol for point of care parasitic oocyst separation
              protocol, and so we set out to research this heavily and develop
              our own, in the hope that it helps future iGEM teams with their
              own projects.
            </p>
            <p>Below are the final steps we devised.</p>
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5995.webp"
              alt="oocyst separation"
              className="project-image"
              style={{ width: "900px", height: "auto" }}
            />
</section>
</div>

    
      <div className="project-content">
        <div className="project-context-wrapper">
          <h1 className="education-intro-title">Future iGEM Advice</h1>


          <section id="future-iGEM-advice" className="model-subsection">
            <h2 className="project-context-title">Guide to iGEM</h2>
            <p> To aid future teams with their endeavours, we collected advice from every team member for all aspects of the project. We hope this proves informative and useful when starting out as a team.</p>
            <li><a href="https://static.igem.wiki/teams/5602/contribution/guide-to-igem.pdf" target="_blank" rel="noopener noreferrer">Guide to iGEM pdf</a></li>
            <li><a href="https://static.igem.wiki/teams/5602/education/igem-developed-project-idea-example.pdf" target="_blank" rel="noopener noreferrer">Example of a developed project idea</a></li>
            <h2 className="project-context-title">Creating Primers</h2>
            <p className="project-description">
              Choosing between the various software out there is tricky but throughout our research we have narrowed down to NEBLamp and Primer Explorer V5 as they have been used extensively. Creation of an all-encompassing custom primer design tool is something we hope future teams might accomplish to streamline the design process.
            </p>

              <li>
                <a
                  href="https://primerexplorer.eiken.co.jp/lampv5e/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Primer Explorer v5
                </a>
              </li>
              <ul className="project-description">
                <li>✅ Free</li>
                <li>
                  ❌ Loop primers - needs to be done after design of core
                  primers
                </li>
                <li>
                  ✅ G-C / A-T content - auto detects in base seq and adjusts
                  primer Tm, length, and GC
                </li>
                <li>✅ Primer melting temp</li>
                <li>✅ Primer length</li>
                <li>
                  ✅ Mutations - can select regions to not create primers in
                </li>
                <li>
                  ✅ Stability and secondary structure risk - checks ΔG values
                </li>
                <li>❌ Post-processing - not able to edit generated primers</li>
                <li>❌ Dimer formation - no tools to analyse primer</li>
              </ul>

              <li>
                <a
                  href="https://lamp.neb.com/#!/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NEBLamp
                </a>
              </li>
              <ul className="project-description">
                <li>✅ Free</li>
                <li>
                  ✅ G-C / A-T content - auto detects in base seq and adjusts
                  primer Tm, length, and GC
                </li>
                <li>✅ Primer melting temp</li>
                <li>✅ Primer length</li>
                <li>
                  ✅ Stability - shows primers’ 5′ and 3′ end positions and ΔG
                  values
                </li>
                <li>
                  ✅ Loop primers - needs to be done after design of core
                  primers; easier than PEV5
                </li>
                <li>
                  ✅ Adjustable parameters - Na⁺/Mg²⁺ concentrations, primer
                  lengths, Tm limits, primer GC content
                </li>
                <li>
                  ✅ Stability and secondary structure risk - checks ΔG values
                </li>
                <li>❌ Dimer formation - no tools to analyse primer</li>
              </ul>

              <h3 className="project-context-subtitle">
                Tips for NEBLamp Website
              </h3>
              <p className="project-description">
                <strong>5.4 Additional primer design considerations:</strong>
              </p>

              <p>
                The list below details other factors that should be considered
                when designing primers for LAMP:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Primers are specified 5′ to 3′.</li>
                <li>Aim for 40−60% GC content.</li>
                <li>Target amplicon should be ≤400 base pairs.</li>
                <li>
                  Avoid runs of 3 or more of one base, or dinucleotide repeats
                  (e.g. ACCC or ATATATAT), as both can cause mis-priming. Runs
                  of 3 or more Gs may cause issues with primer synthesis and
                  HPLC purification.
                </li>
                <li>
                  Primer pairs should have similar Tms, with a maximum
                  difference of 5∘C, and should not be complementary to each
                  other.
                </li>
                <li>
                  Avoid regions of secondary structure; namely intra-primer
                  homology (more than 3 bases that complement within the
                  primer).
                </li>
                <li>
                  In general, select the largest ΔG value for dimer analysis
                  minimum of −3.5 for optimal design. Select the smaller ΔG
                  value for the ends of primers maximum of −4 for optimal
                  design. (ΔG limits are suggestions for PrimerExplorer)
                </li>
                <li>
                  For hairpins, the melting temperature (Tm​) should be lower
                  than the annealing temperature of the reaction; on average it
                  should range between 68∘C and 74∘C. The Tm​ for the strongest
                  hairpin should be at least 68∘C and below the reaction
                  temperature of the LavaLAMP reaction.
                </li>
              </ul>

  <br />
  <img src="https://static.igem.wiki/teams/5602/contribution/img-5994.webp" alt="primer design considerations" className="project-image"style={{ width: "700px", height: "auto" }}  />
  
  <ul className="list-disc pl-6 space-y-2">
  <li>delta g for dimer analysis refers to risk of primer-primer binding. Therefore min of -3.5.</li>
  <li>
    Tm is important as it’s the primer melting temp - just think of it as how well the primers bind at a certain temp
    (temperature used to denature 50% of DNA double strands and primer pasting). Primers pairs need to have max diff of 5C.
  </li>
  <li>Primer pairs are F3/B3 (outer primers), FIP/BIP (inner primers), and LF/LB (loop primers)</li>
  <li>| FIP = F1C + F2 | BIP = B1C + B2 |</li>
  <li>delta g for primer ends refers to stability of primer-dna binding max of -4 preferred</li>
  <li>GC content 40-60%</li>
</ul>



          </section>
        </div>
      </div>
    </div>

        </div>
     
    
  );
};
