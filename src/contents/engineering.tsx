import { useEffect, useState } from "react";
import "../assets/css/model.css";

export const Design = () => {
  const [activeSection, setActiveSection] = useState<string>("deciding-project");

  const sections = [
    "deciding-project",
    "target-sequence",
    "blast-analysis",
    "primer-design",
    "fusion-protein",
    'protein-expression',
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
              <a href={`#${section}`}>{section.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="project-content">
        <div className="project-context-wrapper">
          <h1 className="education-intro-title">Design Cycle</h1>

          <section id="deciding-project" className="model-subsection">
            <h2 className="project-context-title">Deciding the Project</h2>
            <p className="project-description">
              For research into potential projects, we developed several promising ideas. These included ovarian cancer diagnosis using lateral flow assays, antivenom based on opossum serum peptides, and Japanese knotweed management via gene silencing. We hope mentioning these ideas inspires future iGEM teams.
            </p>
            <p className="project-description">
              Finally, we were left with two projects: Lyme disease or cryptosporidiosis diagnosis as problems to solve. Both suffer from poor diagnostic infrastructure and are poorly researched. We researched various diagnostic methods for both, but independently arrived at RPA for Lyme and LAMP for cryptosporidiosis.
            </p>
            <p className="project-description">
              Importantly, after 3 days of deep research on NCBI, completing several BLAST inquiries, and exploring papers on this subject, we found that the main issue with Lyme disease was the high variance of the target protein. One paper even says “CspZ is likely to have limited potential as a diagnostic marker and vaccine candidate for Lyme disease.” (source: <a href="https://doi.org/10.1128/iai.00393-09" target="_blank" rel="noopener noreferrer">link</a>). Simultaneously, we found that the targets for cryptosporidium had much higher variability compared to similar diagnostic targets for Lyme disease.
            </p>
            <ul className="project-description">
              <li><a href="https://www.sciencedirect.com/science/article/pii/S0021925824025857" target="_blank" rel="noopener noreferrer">ScienceDirect Article</a></li>
              <li><a href="https://journals.asm.org/doi/10.1128/iai.00393-09" target="_blank" rel="noopener noreferrer">ASM Journal Article</a></li>
            </ul>
          </section>

          <section id="target-sequence" className="model-subsection">
            <h2 className="project-context-title">Deciding Target Sequence</h2>
            <h3 className="project-context-subtitle">Cycle 1: Abandoning Using the COWP Gene</h3>
            <p className="project-description">
              At the beginning of the project, we needed to find a sequence that we could use LAMP on in order to detect the cryptosporidium oocysts in faecal samples. We initially decided on a membrane glycoprotein gene (GP60 gene for the COWP protein), as this is currently the most prevalent target for molecular diagnostics for cryptosporidium. However, due to its high variability, this gene was not the most suitable for LAMP as it would limit the scope of our test to a few localities.
            </p>

            <h3 className="project-context-subtitle">Cycle 2: Deciding on the 18s rRNA</h3>
            <p className="project-description">
              Doing more research into more obscure PCR targets and the phylogenetic relationships between species of parasite (such as giardia) as well as extensive BLAST analysis, we found that the 18s rRNA of the cryptosporidium oocysts was the best gene to detect. This specific sequence has two major benefits; it has no variability, to the point that all pathogenic species have an almost identical copy of it, and it is present in thousands of copies per oocyst. Using the 18s rRNA not only solves our specificity issue, but also increases our sensitivity some ten-fold, such that we can detect an estimated 1 oocysts per gram in samples.
            </p>
            <p className="project-description">
              Considering the average oocyst density per gram required for faecal smear microscopy is 50,000–500,000 oocysts per gram and the lowest needed for PCR is 300/gram, our specificity is remarkably high. As such, our test will be sensitive enough to test for an infection even in the relatively immunocompetent if needed.
            </p>
          </section>

          <section id="blast-analysis" className="model-subsection">
            <h2 className="project-context-title">BLAST Analysis</h2>
            <p className="project-description">
              BLAST ANALYSIS - 18s rRNA
            </p>
             <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-01-235727.webp" alt="dna alignment" className="project-image" />
             <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-000322.webp" alt="18sRNA" className="project-image" />
             
            <p className="project-description">
              BLAST ANALYSIS - COWP GENE
              <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-000608.webp" alt="COWP" className="project-image" />
              <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-000825.webp" alt="COWP" className="project-image" />
            </p>
            <p className="project-description">
              As can be seen above, the COWP gene is much more variable than the 18s rRNA, with the variable regions indicated by the red lines. This is why we chose to use the 18s rRNA instead, as it enabled us to use the test for the entire Cryptosporidium group that infects humans.
            </p>
          </section>

          <section id="primer-design" className="model-subsection">
            <h2 className="project-context-title">Primer Design</h2>
            <p className="project-description">
              Like PCR, LAMP also requires primers to identify the target regions. LAMP primers are highly specific but also require a much more complex and involved design process than PCR. This is because of the interactions between each other and the multiple target sequences, while PCR generally only requires a forward and reverse primer targeting 2 regions.
            </p>
            <p className="project-description">
              The primers are specific to the cDNA sequence produced during the rt-LAMP process; these include inner, outer, and optional loop primers to maximise both sensitivity and reaction speed. Additionally, we have chosen to develop loop primers, enhancing the activity of the primer set overall.
            </p>
            <p className="project-description">
              Utilising New England Biolab’s (NEB) primer designing software, we designed upwards of 17 different primer sets, slowly whittling them down to a few of the most efficient ones. We chose the ones with the best binding capabilities, while simultaneously having the lowest number of hairpins and dimers.
            </p>
            <p className="project-description">
              When designing primers, it was important to ensure that they did not form dimers or secondary hairpin structures. This is because these are frequently encountered issues in research that uses LAMP assays and can completely ruin the lab procedure.
            </p>
            <p className="project-description">
              Dimerised primers bind to one another rather than to the intended DNA, preventing efficient amplification. Hairpins are an example of secondary structures, where a single primer folds back in on itself, reducing its capability to bind to the target.
            </p>
            <p className="project-description">
              Therefore, we refined our primers by using OligoAnalyser to check for stability, focusing on dimerisation and hairpin formation. By analysing Gibbs free energy (ΔG) values associated with potential primer–primer interactions, we were able to exclude sets prone to strong dimerisation and select those most likely to perform well in vitro.
            </p>
            <p className="project-description">
              By analysing the Gibbs free energy (ΔG) values associated with potential primer–primer interactions, we were able to exclude sets prone to strong dimerisation and select those most likely to perform well in vitro. To aid interpretation, we also examined diagrams of predicted dimers and hairpins, which helped us visualise potential structural issues more clearly.
            </p>
            <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-001147.webp" alt="dimers" className="project-image" />
            <p className="project-description">
              This combination of computational and visual checks allowed us to select one primer set for synthesis with confidence, while keeping alternative sets in reserve should the chosen design underperform experimentally.
            </p>
            <p className="project-description">
              Based on all of our in-silico analysis, these primers are the most stable and least prone to dimerisation discovered as of yet for this target, being better than all of the current published primer sets.
            </p>
          </section>

          <section id="fusion-protein" className="model-subsection">
            <h2 className="project-context-title">HpStBL Fusion Protein</h2>
            <p className="project-description">
              The most significant contribution we have made is the double domain fusion protein we designed, composed of wild type Bst DNA polymerase large fragment fused with Hp47 and Sto7d domains. Hp47 is a hydrophobic protein that helps both increase amplification speed and thermal stability, and Sto7d is a DNA binding protein that improves the reverse transcriptase activity of the Bst polymerase enzyme.
            </p>
            <p className="project-description">
              This eliminates the need for additional reverse transcriptase, helping reduce costs and complexity. Sto7d also improves the inhibition tolerance of the enzyme improving its flexibility of use.
            </p>
            <p className="project-description">
              Initially, we considered using BST polymerase and reverse transcriptase separately in our LAMP reaction. Whilst looking into this, we investigated point modification of Bst polymerase and reverse transcriptases. This was to improve its thermostability and overall efficiency.
            </p>
            <p className="project-description">
              Furthermore, we needed to decide on a reverse transcriptase to use, which would be capable of dealing with the complex nature of the secondary structures present in rRNA (as it is a functional RNA). We initially chose Thermofisher’s SuperScript III, advertised for its rRNA compatibility. We stumbled across a paper about the fusion of enzymes, inspiring us to consider possibly linking our modified Bst to SuperScript III to increase activity and thermostability.
            </p>
            <p className="project-description">
              Unfortunately, we soon discovered that SuperScript III was a commercial reverse transcriptase, meaning we would be unable to legally express it or use it in our test kit without paying huge royalties. This would make our test kit extremely inaccessible. To combat this, and with the advice of Dr Markiv, we decided to abandon the initial goal and instead pivot into how other DNA polymerases had been modified. For our project we are specifically looking into how to increase reverse transcriptase activity and thermostability.
            </p>
                      

            <p className="project-description">
              Based on a paper by <a href="https://par.nsf.gov/servlets/purl/10308822" target="_blank" rel="noopener noreferrer">NSF PURL</a>, 
              we looked into a wide range of site-directed mutations. Both Mut2 and Mut3 were found to be more thermostable than unchanged Bst-LF 
              or even Br512, while combinations of these mutations displayed even greater thermostability. However, this would be unfeasible given our 
              limited lab time and financial constraints.
            </p>

            <p className="project-description">
              Eventually, we settled on using one domain that would improve thermostability, and one domain to increase reverse transcriptase activity 
              of Bst polymerase. Investigating these further, we finally decided upon using the DNA-binding protein Sto7d from 
              <i> Sulfolobus solfataricus</i>, a species of thermophilic archaeon, and the highly hydrophobic protein 
              <a href="https://doi.org/10.1016/j.ijbiomac.2024.133243" target="_blank" rel="noopener noreferrer"> Hp47</a>, 
              described in 
              <a href="https://www.medrxiv.org/content/10.1101/2020.10.02.20203356v1" target="_blank" rel="noopener noreferrer"> medRxiv</a> 
              and 
              <a href="https://www.biorxiv.org/content/10.1101/2021.04.15.439918v1" target="_blank" rel="noopener noreferrer"> bioRxiv</a>. 
              Hp47 not only helps to increase thermostability, but also inadvertently increases inhibitor tolerance of the Bst polymerase 
              to inhibitors such as heparin sodium, humic acid and SYBR Green I. Paired with the naturally high inhibitor tolerance of 
              Bst polymerase, this leads to an enzyme perfectly suitable for testing on samples derived from faecal matter.
            </p>

            <p className="project-description">
              The paper above created a wide variety of different variants with different abilities, as shown in the diagram below.
            </p>

            <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-003450.webp" alt="fusion protein variants diagram" className="project-image" />

            <p className="project-description">
              All of these had different expression and purification profiles. Due to instability and inability to purify, 
              all of the different fusions apart from HpBL and HpStBL were excluded. Once these had been discounted, 
              we decided to choose which one to test further based on reverse transcriptase activity, as seen in the graph below.
            </p>

            <p className="project-description">
              We also analysed DNA binding efficacy, and found that—considering RT activity as well as inhibitor tolerance—HpStBL was the best fit 
              for our application.
            </p>
             <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-003833.webp" alt="positinal varients" className="project-image" />
            <p className="project-description">
              <b>Graph showing activity of different positional variants</b>
            </p>

            <img src="https://static.igem.wiki/teams/5602/design/screenshot-2025-10-02-003905.webp" alt="fusion protein activity graph" className="project-image" />
            <b>Graph showing activity against temperature</b>
            <img src="https://static.igem.wiki/teams/5602/design/img-6006.webp" alt="temperature" className="project-image" />
            <b>Graph showing activity against heat time</b>
            <img src="https://static.igem.wiki/teams/5602/design/img-5997.webp" alt="heat time" className="project-image" />
            <b> Graph showing pH against activity</b>
            <img src="https://static.igem.wiki/teams/5602/design/img-5998.webp" alt="ph" className="project-image" />
            <b>Graph showing inhibitor tolerance</b>
            <img src="https://static.igem.wiki/teams/5602/design/img-6001.webp" alt="inhibitor tolerance" className="project-image" />

            

  <p className="project-description">
    Importantly, we have made biobricks for all of the following variants:
  </p>

  <ul className="project-description">
    <li>
      <strong>HpStBL - BBa_25LHXRAK</strong><br />
      Composed of Bst DNA polymerase fused with Hp47 and Sto7d domains. Hp47 is a hydrophobic protein that helps both increase amplification speed and thermal stability, and Sto7d is a DNA binding protein that improves the reverse transcriptase activity of the Bst polymerase enzyme. This eliminates the need for additional reverse transcriptase, helping reduce costs and complexity. Sto7d also improves the inhibition tolerance of the enzyme, improving its flexibility of use.
    </li>
    <li>
      <strong>HpBL - BBa_25TB00AG</strong><br />
      This is a fusion Bst that only has the Hp47 subdomain, giving higher thermostability but roughly similar reverse transcriptase activity to wild-type Bst.
    </li>
    <li>
      <strong>StHpBL - BBa_259VLJFC</strong><br />
      This fusion has both Hp47 and Sto7d domains, but in a different arrangement to HpStBL. It has lower thermostability and reverse transcriptase activity compared to HpStBL due to interactions between these domains. However, its inhibitor tolerance is incredibly high, and it has solid average performance in other tasks, making it a useful part for future teams.
    </li>
    <li>
      <strong>StBL - BBa_25BQTH7I</strong><br />
      A fusion Bst that only has the Sto7d subdomain. It has high thermostability and high speed of amplification but relatively lower reverse transcriptase activity, providing a useful option for teams needing these specific properties.
    </li>
  </ul>

  <p className="project-description">
    Overall, this has meant that we have developed four new truly open source Bst Polymerases which can be used for future projects, whether iGEM or otherwise. This will hopefully enable open source development of more point-of-care diagnostic tests, allowing millions around the world to access quality diagnostics without paying large corporations for patented enzymes.
  </p>


            
            <h3 className="project-context-title">Rigid vs Flexible Linkers</h3>
            <p className="project-description">
              When designing the fusion protein, we had to decide whether to use a rigid or a flexible linker between our two domains. 
              Rigid linkers form defined secondary structures, preventing domains from interacting or interfering with one another, 
              and are generally used when spatial orientation is important. Flexible linkers, on the other hand, promote flexibility 
              and facilitate independent folding, dynamic interactions, or substrate accessibility.
            </p>
            <p className="project-description">
              We chose to use a flexible linker, as we combined two functionally distinct domains—one to improve thermostability, 
              and one to enhance reverse transcriptase activity. Bst polymerase activity (especially RT function) can be hindered 
              by rigid linkers, since the enzyme requires dynamic conformational changes. The thermostability-enhancing domain likely 
              works by stabilising the overall protein structure and providing resilience to unfolding, which is most effective when 
              folding occurs independently. Since our domains are so distinct, they must fold without steric interference. 
              A rigid linker could disrupt conformational freedom or reduce stability under high temperatures. 
              For this reason, we selected a flexible linker.
            </p>
          </section>

          <section id="protein-expression" className="model-subsection">
  <h2 className="project-context-title">Fusion Protein</h2>

  <h3 className="project-context-subtitle">Fusion Protein Expression</h3>
  <p className="project-description">
    In order to test our protein, we needed to express it. This necessitated designing a plasmid. As such, we first needed to choose a plasmid backbone that was compatible with E. coli and our promoters, and also high copy. Our first choice was BBa_J435500 (BBa_J435500) as it was already in the parts iGEM sent to us, letting us speed up the process of creating the plasmids. However, we were unsure about its uses for our application. Additionally, we found that ordering in the completed plasmid would be cheaper and save us valuable time in the labs. Therefore, we switched course and broadened our scope to backbones outside of the ones we already had.
  </p>

  <p className="project-description">
    After some searching, we stumbled across an excellent paper describing the use of the pKAR2-Br512 backbone. The paper detailed the use of this backbone for the expression of the fusion protein between Bst polymerase and reverse transcriptase. It was compatible with E. coli, worked with our operators, and had even been used to express RNA previously (Maranhao et al., 2020) - this was a perfect match for our application. Putting this all together, we designed a plasmid in VectorBee.
  </p>
  <img src="https://static.igem.wiki/teams/5602/design/img-6002.webp" alt="VectorBee plasmid" className="project-image"style={{ width: "700px", height: "auto" }}  />
  <p className="project-description">
    However, after discussing with Dr Anatoli, we needed to change our fusion protein sequence. He also advised us to switch our T7 operator for a lacUV5 promoter, as this would better work in our time constraints in the labs. To select for BL21 E.Coli that had taken up our plasmid, we opted to use a chloramphenicol resistance marker, as this would be the simplest way of screening for our transformed bacteria, as we only had 2.5 days in the labs and so needed to make the most of these. We finally added a hexahistidine tag and a thrombin site to ensure we could purify our protein using nickel-ion chromatography, described in detail in our Wet-Lab writeup - the thrombin site helping us remove the tag once we were finished.
  </p>

  <p className="project-description">
    Learning from the errors of past iGEM teams, we also chose to order in our plasmids as whole plasmids, as this would reduce both time spent in the labs, but also the risk of errors if the cloning went wrong. Our final ordered plasmid was as follows.
  </p>
 <img src="https://static.igem.wiki/teams/5602/notebook/20251007-210419000-ios.webp" alt="ifinal ordered plasmid" className="project-image" style={{ width: "700px", height: "auto" }} />
  <p className="project-description">
    For future teams that do decide to clone this biobrick, we have an In-Silico simulation of a gel electrophoresis below, done in VectorBee. Lane one contains our fully transformed plasmid, while lane 2 contains only the biobrick gene fragment, which is smaller and therefore travels further.
  </p>
  <img src="https://static.igem.wiki/teams/5602/design/img-6005.webp" alt="simulation" className="project-image" style={{ width: "500px", height: "auto" }} />
  <p className="project-description">
    We then ensured that it fit the Biobrick design requirements, so we checked the assembly standards and ensured that it fit RC 1000, ensuring compatibility for future teams.
  </p>

  <p className="project-description">
    We did the above for all of the fusion proteins, but focused particularly on BBa_25LHXRAK, or our HpStBL fusion as this was the one we had finalised to express in the labs.
  </p>

  <h3 className="project-context-subtitle">18s ribosomal RNA Expression</h3>
  <p className="project-description">
    Our LAMP primers are highly sensitive, so only work with very specific sections of DNA. As such, to ensure our test can work with multiple pathogenic variants of Cryptosporidium, we decided to detect the 18s RNA. This gene is highly conserved, virtually identical in all species of interest.
  </p>

  <p className="project-description">
    Expressing the RNA would let us test our primers and Bst polymerase, as we are unable to obtain oocysts as per iGEM protocols. Conveniently, the nucleotide sequence was available from NCBI at GenBank: MH553329.1, leaving it up to us to decide how to express our rRNA.
  </p>

  <p className="project-description">
    We decided to go for bacterial expression in E. coli as this would allow us to regulate the quantity of RNA produced while also contributing more parts to the registry for future iGEM teams. However, to express our sequence in a plasmid, we had to conform to standard Biobrick enzyme restriction sites. This prompted us to add the necessary 4 base scars to the sequence (AATG and GCTT respectively), as we needed to make sure that these bases did not create a new restriction site for the enzymes we are using.
  </p>

  <p className="project-description">
    However, we were advised by Dr Anatoli to choose an Anderson promoter, as this would let us produce a very large quantity of our RNA by selecting one with a high copy number. Our chosen one, pSB1A3, produces up to 300 copies per cell. This was chosen as it mirrors the number of copies in a Cryptosporidium oocyst - as bacteria are much smaller than the eukaryotic oocysts, the lower number of copies is compensated for by the higher density of individual cells, producing a very reliable model for testing the test kit on.
  </p>

  <p className="project-description">
    Once we had designed the parts, we ordered them from Twist (Fusion Bst plasmid), IDT (Primers), and GenScript (18s rRNA plasmid).
  </p>

  <h3 className="project-context-subtitle">References</h3>
<ul className="project-description">
  <li>
    Brangulis, K., Sürth, V., Marcinkiewicz, A. L., Akopjana, I., Kazaks, A., Bogans, J., Huber, A., Lin, Y.-P., & Kraiczy, P. (2025). CspZ variant–specific interaction with factor H incorporates a metal site to support Lyme borreliae complement evasion. Journal of Biological Chemistry, 301(1), 108083. 
    <a href="https://doi.org/10.1016/j.jbc.2024.108083" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Hachimi, O., Falender, R., Davis, G., Wafula, R. V., Sutton, M., Bancroft, J., Cieslak, P., Kelly, C., Kaya, D., & Radniecki, T. (2024). Evaluation of molecular-based methods for the detection and quantification of Cryptosporidium spp. In wastewater. Science of The Total Environment, 947, 174219. 
    <a href="https://doi.org/10.1016/j.scitotenv.2024.174219" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Karakavuk, M., Can, H., Can, Ş., Karakavuk, T., Döşkaya, M., & Değirmenci Döşkaya, A. (2024). Development of a “Rapid-Crypto Colorimetric LAMP Test” to Detect Cryptosporidiosis in Feces of Newborns Calves. Acta Parasitologica, 69(1), 691–699. 
    <a href="https://doi.org/10.1007/s11686-023-00791-x" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Maranhao, A., Bhadra, S., Paik, I., Walker, D., & Ellington, A. D. (2020). An improved and readily available version of Bst DNA Polymerase for LAMP, and applications to COVID-19 diagnostics (p. 2020.10.02.20203356). medRxiv. 
    <a href="https://doi.org/10.1101/2020.10.02.20203356" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Paik, I., Ngo, P. H. T., Shroff, R., Diaz, D. J., Maranhao, A. C., Walker, D. J. F., Bhadra, S., & Ellington, A. D. (2023). Improved Bst DNA Polymerase Variants Derived via a Machine Learning Approach. Biochemistry, 62(2), 410–418. 
    <a href="https://doi.org/10.1021/acs.biochem.1c00451" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Paik, I., Ngo, P. H. T., Shroff, R., Maranhao, A. C., Walker, D. J. F., Bhadra, S., & Ellington, A. D. (2021). Multi-modal engineering of Bst DNA polymerase for thermostability in ultra-fast LAMP reactions (p. 2021.04.15.439918). bioRxiv. 
    <a href="https://doi.org/10.1101/2021.04.15.439918" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    Rogers, E. A., Abdunnur, S. V., McDowell, J. V., & Marconi, R. T. (2009). Comparative Analysis of the Properties and Ligand Binding Characteristics of CspZ, a Factor H Binding Protein, Derived from Borrelia burgdorferi Isolates of Human Origin. Infection and Immunity, 77(10), 4396–4405. 
    <a href="https://doi.org/10.1128/iai.00393-09" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
  <li>
    ThermoFisher. (2025). SuperScriptTM III Reverse Transcriptase 10 Reactions | Buy Online | InvitrogenTM. 
    <a href="https://www.thermofisher.com/order/catalog/product/18080093" target="_blank" rel="noopener noreferrer">Link</a>
  </li>
  <li>
    Xiang, R., Liu, G.-Y., Hou, Y., Xie, L.-X., Wang, Q.-S., & Hu, S.-Q. (2024). Double domain fusion improves the reverse transcriptase activity and inhibitor tolerance of Bst DNA polymerase. International Journal of Biological Macromolecules, 274, 133243. 
    <a href="https://doi.org/10.1016/j.ijbiomac.2024.133243" target="_blank" rel="noopener noreferrer">DOI Link</a>
  </li>
</ul>

</section>


          

        </div>
      </div>
    </div>
  );
};
