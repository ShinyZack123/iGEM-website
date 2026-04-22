import { useState, useEffect,  } from "react";
import "../assets/css/model.css";

export function Description() {
  const [openCrypto, setOpenCrypto] = useState(false);
  const [openLAMP, setOpenLAMP] = useState(false);
  const [openProject, setOpenProject]=useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
    "https://static.igem.wiki/teams/5602/description/00c923d1-502e-4ed8-8b19-229ff20b1dc0.webp",
    "https://static.igem.wiki/teams/5602/description/img-0655.webp",
    "https://static.igem.wiki/teams/5602/description/img-1039.webp",
    "https://static.igem.wiki/teams/5602/description/img-1445.webp",
    "https://static.igem.wiki/teams/5602/description/img-1694.webp",
    "https://static.igem.wiki/teams/5602/description/img-4514.webp",
    "https://static.igem.wiki/teams/5602/description/img-2163.webp",
    "https://static.igem.wiki/teams/5602/description/img-1711.webp",
  ];

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <div className="model-page">
      <div className="project-context-wrapper">
        <h1 className="education-intro-title">Our Project</h1>

        {/* Cryptosporidiosis Section */}
        <div className="model-subsection">
          <button
            className="model-subsection-button"
            onClick={() => setOpenCrypto(!openCrypto)}
          >
            Cryptosporidiosis: An Explanation
            <span>{openCrypto ? "−" : "+"}</span>
          </button>
          <div
            className={`model-subsection-content ${openCrypto ? "open" : ""}`}
            style={{ maxHeight: openCrypto ? "none" : "0" }}
          >
            <p className="project-description">
              Cryptosporidiosis is a diarrheal disease caused by the parasite cryptosporidium. Spread through contaminated water sources, surfaces, and close contact with infected animals, cryptosporidiosis is able to spread rapidly within a population. Infection occurs when the parasite’s oocysts - microscopic, and environmentally durable carriers of the parasite - are ingested in a host.
            </p>
            <p className="project-description">
              Once ingested, the parasite’s oocysts attach to the epithelial lining of the small intestine, multiplying and colonising further regions of the digestive tract. (CDC, 2024). This infection causes severe watery diarrhoea, abdominal pain, nausea and dehydration. The diarrhoea forces fluids out of the body, prompting people to drink more of the infected water, increasing exposure to oocytes. As this cycle repeats, the body becomes increasingly weak as electrolytes and essential nutrients are flushed away with the diarrhoea.
            </p>
            <p className="project-description">
              Effects of Crypto <br />
              While healthy individuals may recover after 2 to 3 weeks, the infection can be devastating, often fatal, for young children, the elderly, and those with weakened immune systems. Even those who do not die are often permanently disabled. (GOV.UK, 2024)
            </p>
            <p className="project-description">
              The healthy immune system recruits CD4 T cells and other immune cells to fight the parasite. However, immune deficient conditions - AIDS, organ transplant recipients, or inherited diseases - limit CD4 counts, potentially falling below 200 cells/µL. This dramatic fall in T cell numbers prevents the body from managing the infection. (Crater et al., 2023) With the ability to progress to the respiratory system and even cerebrospinal fluid, the oocysts begin to cause further damage. In these individuals, severe dehydration and electrolyte imbalance from prolonged diarrhoea leads to wasting syndrome, and consequently, death. Unfortunately, regions with high rates of cryptosporidium infections are also likely to have higher rates of HIV transmission. As Dr Garcia-Mingo states, “early diagnosis is life saving” for this group, as it enables rapid delivery of the necessary care.
            </p>
            <p className="project-description">
              Responsible for anywhere from 20,000 to 200,000 child fatalities per year (large variance due to lack of effective diagnostics), cryptosporidiosis is already claiming too many lives to be ignored. (The Cryptosporidium Therapeutics Advocacy Group, 2025). Its impact is felt most severely on developing nations where it is the second leading cause of diarrheal disease and death. Here, access to clean water, sanitation, and reliable healthcare is often limited. The parasite’s oocysts are highly resilient, capable of surviving harsh environmental conditions and resisting common water treatment methods like chlorination, making outbreaks frequent and hard to control.
            </p>
            <p className="project-description">
              Local Issues <br />
              Recently, crypto outbreaks have begun to disrupt life in the developed world. In a small Welsh petting zoo, an outbreak of crypto left 81 infected, with 16 requiring hospitalisation, including a four year old boy. (Piggot, 2025) Over 140 were infected after a water source was contaminated in Devon a year earlier. (Parkman et al., 2024) Annually, 4000 cases are recorded in the UK alone, displaying crypto’s growing threat, even at home. (Rawlins, 2024)
            </p>
            
            <p className="project-description">
              References: <br />
              CDC. (2024, June 3). CDC - DPDx—Cryptosporidiosis. CDC. <a href="https://www.cdc.gov/dpdx/cryptosporidiosis/index.html" target="_blank" rel="noopener noreferrer">https://www.cdc.gov/dpdx/cryptosporidiosis/index.html</a><br />
              Crater, J. M., Dunn, D. C., Nixon, D. F., & Furler O’Brien, R. L. (2023). A History and Atlas of the Human CD4+ T Helper Cell. Biomedicines, 11(10), 2608. <a href="https://doi.org/10.3390/biomedicines11102608" target="_blank" rel="noopener noreferrer">https://doi.org/10.3390/biomedicines11102608</a><br />
              GOV.UK. (2024). Cryptosporidium: Public advice. GOV.UK. <a href="https://www.gov.uk/guidance/cryptosporidium-public-advice" target="_blank" rel="noopener noreferrer">https://www.gov.uk/guidance/cryptosporidium-public-advice</a><br />
              Parkman, B., Barnes, G., Davey, H., & West, S. (2024, May 15). Devon residents urged to boil water after parasite found. BBC News. <a href="https://www.bbc.com/news/articles/cd1q1d51w27o" target="_blank" rel="noopener noreferrer">https://www.bbc.com/news/articles/cd1q1d51w27o</a><br />
              Piggot, P. (2025, May 14). Cryptosporidium: Infections from Cowbridge petting farm reach 81. BBC News. <a href="https://www.bbc.com/news/articles/cr58602v97jo" target="_blank" rel="noopener noreferrer">https://www.bbc.com/news/articles/cr58602v97jo</a><br />
              Rawlins, M. (2024, February 29). Cryptosporidium: A One Health approach – APHA Science Blog. <a href="https://aphascience.blog.gov.uk/2024/02/29/cryptosporidium/" target="_blank" rel="noopener noreferrer">https://aphascience.blog.gov.uk/2024/02/29/cryptosporidium/</a><br />
              The Cryptosporidium Therapeutics Advocacy Group. (2025). The Most Neglected NTD: Cryptosporidiosis | Global Health NOW. <a href="https://globalhealthnow.org/2025-01/most-neglected-ntd-cryptosporidiosis" target="_blank" rel="noopener noreferrer">https://globalhealthnow.org/2025-01/most-neglected-ntd-cryptosporidiosis</a>
            </p>
          </div>
        </div>

        {/* LAMP Section */}
        <div className="model-subsection">
          <button
            className="model-subsection-button"
            onClick={() => setOpenLAMP(!openLAMP)}
          >
            LAMP Explanation
            <span>{openLAMP ? "−" : "+"}</span>
          </button>
          <div
            className={`model-subsection-content ${openLAMP ? "open" : ""}`}
            style={{ maxHeight: openLAMP ? "none" : "0" }}
          >
            <p className="project-description">
              Loop-mediated isothermal amplification (LAMP) is a nucleic acid amplification method, somewhat similar to PCR, but without the need for advanced laboratory equipment. It is highly specific, due to the use of several primers (from four to six). Four primers are essential (forward inner, backward inner, forward outer, and backward outer), and two loop primers are recommended to facilitate product amplification further. The primers are designed based on a target sequence (in our case, the 18s rRNA), and must be single-stranded at 60-65C. The regions upstream & downstream of the amplicon are where the primers bind. The internal primers are around 45-49 bp long, and are complementary to two distant locations on the template (on the sense strand, and the antisense strand). The external primers are shorter (21-24 bp), and are applied in lower concentrations to bind more slowly than the internal primers.
            </p>
            <p className="project-description">
            The various LAMP primers and their binding sites on the target DNA sequence are shown in the diagram below.
            </p>
            <div
              className="project-description"
              style={{ display: "flex", justifyContent: "center", paddingTop: "0px" }}
            >
              <img
                className="project-image-small"
                src="https://static.igem.wiki/teams/5602/design/lampanim-2.avif"
                alt="LAMP Components"
                style={{ maxWidth: "150%", height: "auto" }}
              />
            </div>
            <p className="project-description">
            The LAMP primer binding process is shown below. 
            </p>
            <div
              className="project-description"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                className="project-image-small"
                src="https://static.igem.wiki/teams/5602/design/aarushlamp.webp"
                alt="LAMP Diagram"
                style={{ maxWidth: "80%", height: "auto" }}
              />
            </div>
            <br />
            <p className="project-description">
              The reaction begins with strand invasion, and the forward inner primer (F2) complementary to the F2c region initiates synthesis, executed by a particular polymerase. It is important to note that there is a 5’ overhang of the forward inner primer, and it has the reverse complementary sequence (F1c) to that of another region (F1). The forward outer primer binds to an F3 region upstream on the 5’ end of the DNA strand with the target DNA. This is to dissociate the grey-graded DNA that is now single-stranded. This process will now occur with the backwards inner primer. The out backwards primers now hybridises with the DNA strand and results with the upper DNA sequence dissociating - this is our first product.
            </p>
            <p className="project-description">
              The reverse complementary sequence, F1, hybridises with the F1c, forming a loop structure. The same happens with B1 and B1c, resulting in a dumbbell structure. From this point forward, all primers can bind to generate more products.
            </p>
            <p className="project-description">
              In the buffer mix for LAMP, magnesium ions are present and, as the reaction takes place pyrophosphate ions are produced, and react to produce magnesium pyrophosphate, a side product. We can use this to determine if the result of our test is negative or positive. We are using HNB dye to quantify if the result is negative or positive, as it has a colour change that is visible to the naked eye. We decided to use this as it would increase the accessibility of our test kit. HNB dye changes from violet to sky blue when magnesium ions are depleted in the solution.
            </p>
            <p className="project-description">
              <strong>Why We Have Chosen It:</strong><br />
              We have chosen LAMP over other nucleic amplification processes for the following reasons:
            </p>
            <ul className="project-description">
              <li>LAMP is resistant to inhibitors found in faecal matter, while other methods are not, and the samples we would use for cryptosporidium testing would be faecal samples.</li>
              <li>LAMP is isothermal, so thermocyclers and other expensive equipment do not have to be used, reducing cost.</li>
              <li>The result of a LAMP test can be elucidated via colourimetry and turbidity, meaning that no expensive fluorimetry equipment is needed, as would be necessary for the other methods. These two elucidation methods also mean that there is a redundancy if one of the methods fails.</li>
              <li>All of the parts of the LAMP assay can be lyophilized, meaning they are essentially freeze dried and so can be transported around the world and stored for upwards of 24 months without degrading, which is a major advantage over other methods such as serological tests, which need to be constantly in freezing conditions, improving accessibility.</li>
              <li>LAMP has very high sensitivity and specificity, increasing the pool of people we would be able to diagnose, as well as reducing the false positive/negative rate substantially.</li>
            </ul>
            <p className="project-description">
              Our research concluded LAMP would be a suitable alternative to rtq-PCR and microscopy. To gain a professional insight, we spoke to Dr Garcia-Mingo. She confirmed that LAMP would be “perfect” for our setting as it works well in resource limited areas. As she observed, we are following the general trend of increasingly molecular diagnostic methods, overtaking traditional methods like microscopy.
            </p>
          </div>
        </div>
        {/* Project CRYPTOKNIGHT Section */}
<div className="model-subsection">
  <button
    className="model-subsection-button"
    onClick={() => setOpenProject(!openProject)}
  >
    Project CRYPTOKNIGHT
    <span>{openProject ? "−" : "+"}</span>
  </button>
  <div
    className={`model-subsection-content ${openProject ? "open" : ""}`}
    style={{ maxHeight: openProject ? "none" : "0" }}
  >
    <p className="project-description">
      This year, CoL iGEM has developed a point-of-care diagnostic kit for cryptosporidiosis using LAMP, a highly sensitive, efficient and sequence-specific isothermal nucleic acid amplification method. Our test kit detects the 18s ribosomal RNA, a highly conserved region of RNA found in high numbers and almost identical forms across all parasitic cryptosporidium species.
    </p>
    <p className="project-description">
      CoL iGEM is proud to present Project CRYPTOKNIGHT, a cheap, rapid, accurate diagnostic test for cryptosporidiosis!
    </p>
    <p className="project-description">
      We started by custom designing six LAMP primers, including two loop primers. Running them through various software, we were able to select the best of our bunch to order into labs. We used fusion protein subdomains to improve the thermostability of Bst polymerase, the enzyme necessary for LAMP, even adding reverse transcriptase activity to the protein, eliminating the need for external reverse transcriptase; these modifications enabled us to conduct LAMP at a wider range of temperatures, helping improve accessibility to areas where maintaining a stable temperature might be challenging. We successfully transformed our plasmids into E. coli at KCL labs under the guidance of Dr Anatoliy Markiv, confirming our protein was expressed using SPS-page.
    </p>
    <p className="project-description">
      Finally, we designed a cheap, simple delivery system for our test. Restricted by no electricity, a £5 limit cost per test kit and a design that must be intuitive to use, hardware embarked on designing our test kit design. A typical LAMP reaction necessitates 65 degrees sustained over a 1 hour period. We designed a small puck shaped heater that leverages calcium oxide's strongly exothermic reaction with water to generate large amounts of heat which is then stored in our phase change material - a paraffin based substance that melts at 65 degrees and maintains constant temperatures for long periods of time. We are also leveraging the cheap paperfuge design to centrifuge and purify the Cryptosporidium oocysts from the stool samples. By designing a step by step process to extract fragile oocysts from stool samples, we hope to inspire future teams to design similar test kit designs that do not rely on complex and expensive medical equipment.
    </p>
  </div>
  <div className="video-container">
    <h1 className="education-intro-title">Project Promotion Video</h1>
  <iframe
    title="City-of-London-UK: COL-UK-25: Shining a LAMP on Cryptosporidiosis (2025) - Project Promotion [English]"
    width="560"
    height="315"
    src="https://video.igem.org/videos/embed/akA4reNRZXdNGmfzjb8SEc"
    allow="fullscreen"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    style={{ border: "0px", width: "100%", height: "450px" }}
  ></iframe>
</div>
  <div className="slideshow-container">
          <div className="slideshow-slide">
            <img
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="slideshow-image"
            />
          </div>
          </div>
</div>
    
      </div>
    </div>
  );
}
