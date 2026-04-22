import { useEffect, useState } from "react";
import "../assets/css/model.css";
import { BlockMath, InlineMath } from "react-katex";

export const HardwareMain = () => {
  const [activeSection, setActiveSection] = useState<string>("aims");
  const [carouselIndex1, setCarouselIndex1] = useState(0);
  const [carouselIndex2, setCarouselIndex2] = useState(0);
  const [carouselIndex3, setCarouselIndex3] = useState(0);
  const [carouselIndex4, setCarouselIndex4] = useState(0);
  const [carouselIndex5, setCarouselIndex5] = useState(0);

  const sections = [
    "aims",
    "biology-overview",
    "oocyst-extraction",
    "centrifuge",
    "heating",
    "detection",
    "magnesium",
    "final-design",
    "pricing",
    "references",
  ];

  const finalDesignImages = [
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212138000-ios-1.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212138000-ios-2.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212138000-ios.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212139000-ios.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212140000-ios-1.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212140000-ios-2.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212140000-ios.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212141000-ios.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212142000-ios-1.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/20250928-212142000-ios.webp",
  ];

  const testingWaterBathImages = [
    "https://static.igem.wiki/teams/5602/hardwaregeneral/3partsbeingbuilt.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/bottomandcopper.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/lid.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/middlesecotherangle.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/precaoonlyparafin.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/reactionprewater.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/thermometersetup.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/withparafinandcao.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/img-0187.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/img-0188.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/img-0189.webp",
  ];

  const firstWaterBathDesigns = [
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-bottomstage.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-middle-stage.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-top-stage.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-stickmushroom.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-ready-all4items.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-fullrevolution-3dprint.webp",
  ];

  const threeDprinterCADImages = [
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-bottomstage.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-secondstage.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-bungg.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-3d-print-top-stage.webp",
  ];

  const CADwaterBathImages = [
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-0-2mltest-tube-view1.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-0-2mltest-tube-view2.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-fulldesign-sideview.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-bungg.webp",
    "https://static.igem.wiki/teams/5602/hardwaregeneral/water-bath-fulldesign-topview.webp",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex1(
        (prevIndex) => (prevIndex + 1) % finalDesignImages.length
      );
    }, 2500); // cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex2(
        (prevIndex) => (prevIndex + 1) % firstWaterBathDesigns.length
      );
    }, 2500); // cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex3(
        (prevIndex) => (prevIndex + 1) % testingWaterBathImages.length
      );
    }, 2500); // cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex4(
        (prevIndex) => (prevIndex + 1) % threeDprinterCADImages.length
      );
    }, 2500); // cycles every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex5(
        (prevIndex) => (prevIndex + 1) % CADwaterBathImages.length
      );
    }, 2500); // cycles every 2.5 seconds
    return () => clearInterval(interval);
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
          <h1 className="project-context-title">Hardware Design Aims</h1>

          <section id="aims" className="model-subsection">
            <p className="project-description">
              Cryptosporidiosis is most prevalent in South East Asia and rural
              Africa due to a lack of sanitisation and proper hygiene. When
              designing hardware for a cryptosporidiosis test kit for these
              areas, it is imperative to have cost cutting at the forefront of
              all design choices; in sub-saharan Africa 85% of the population
              lives on less than $5.50 per day and 82% of the population in East
              Asia and Pacific live on less than $15 per day as of 2015.
            </p>
            <p className="project-description">
              Our team went through many design iterations, each step aimed to
              simplify and reduce the steps the user would undertake.
            </p>
          </section>

          <section id="biology-overview" className="model-subsection">
            <h2 className="project-context-title">Biology Overview</h2>
            <p className="project-description">
              The 18s rRNA that we are amplifying using loop-mediated isothermal
              amplification (LAMP) is found in the oocysts that are formed after
              sexual reproduction of the parasite in the host’s small intestinal
              epithelium. These oocysts are found in abundance in the diarrheal
              stool of those who are infected with the parasite.
            </p>
            <p className="project-description">
              People with the symptoms of Cryptosporidiosis will take home our
              product and carry out the testing at home. As such, our product
              needs to be cheap, intuitive and easy to use. The general steps of
              our hardware go as follows: extract the oocysts from the stool
              sample, clean the oocysts, place the oocysts in the LAMP mixture
              and heat at 65 degrees for 40 to 60 minutes.
            </p>
          </section>

          <section id="oocyst-extraction" className="model-subsection">
            <h2 className="project-context-title">Oocyst Extraction Methods</h2>
            <p className="project-description">
              Extracting the oocysts from a very contaminated stool sample was
              our first goal. We need to extract the oocysts from the stool
              sample as a colour change cannot be seen in the stool’s colour, a
              turbidity test would have too many contaminants and fluorescence
              would struggle to be emitted through the stool. So the oocysts
              need to be separated from the stool. Although LAMP is very
              resistant to any inhibitors that might be found in stool samples
              as Bst DNA polymerase is more resistant to inhibitors, LAMP
              reactions can often have high magnesium ion concentrations and
              high dNTP levels, which can “outcompete” inhibitor binding and
              keep the polymerase active.
            </p>
            <p className="project-description">
              We started ideating with various techniques to separate the
              oocysts from the liquid stool sample. The first of which was
              immunomagnetic separation (IMS) of the oocysts flotation. We would
              coat small metallic magnetic beads with monoclonal antibodies that
              are complementary to antibodies on the wall of the oocysts. The
              fragment antigen-binding region (Fab) region of the monoclonal
              antibody has a binding site whose shape and chemical properties
              match the antigen’s epitope on the oocyst wall and binding happens
              via non-covalent forces. Then, we would use a magnetic rod to
              extract the magnetic beads and attached oocysts from the stool
              sample. The beads would be washed with water and the LAMP could be
              started on the extracted oocysts.
            </p>
            <p className="project-description">
              However, we quickly eliminated IMS due to the high cost of both
              the magnetic beads and the monoclonal antibody coating that would
              be applied on the surface of the magnetic beads. Another factor is
              the variety of the Cryptosporidium parvum species; there are more
              than 20 different known species each with varying antibodies on
              their surface. Therefore, we would not have a comprehensive
              diagnostics kit if we only used one type of monoclonal antibody
              that only binds to one species of Cryptosporidium parvum.
            </p>
            <div
              className="project-description"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                className="project-image-small"
                src="https://static.igem.wiki/teams/5602/hardwaregeneral/immunomagneticsep.webp"
                alt="Immunomagnetic Separation"
              />
            </div>
          </section>

          <section id="centrifuge" className="model-subsection">
            <h2 className="project-context-title">Extraction Method Outline</h2>
            <p className="project-description">
              After much research, we settled on a method that combined various
              steps to carry out the oocysts extraction. The rough outline is:
            </p>
            <ol className="project-description">
              <li>Clean the stool sample as much as possible with a sieve.</li>
              <li>
                Centrifuge the sample to pelletise the solid parts of the stool.
              </li>
              <li>
                Discard the supernatant and resuspend the pellet in water.
              </li>
              <li>
                Add ethyl acetate and centrifuge again to separate the oocysts
                from the rest of the stool sample.
              </li>
              <li>
                Pour off the liquid layer (containing the oocysts) into a sieve
                to retain the oocysts and drain the liquid.
              </li>
              <li>Wash the filter with water to collect the oocysts.</li>
              <li>Resuspend the oocysts in water for LAMP.</li>
              <li>
                Use a 40 micro litre pipette to transfer the oocysts to the LAMP
                reaction tube.
              </li>
            </ol>
          </section>

          <section id="centrifuge" className="model-subsection">
            <h2 className="project-context-title">Cost-effective Centrifuge</h2>
            <p className="project-description">
              Centrifugation is a necessary process to increase the diagnostic
              yields by concentrating oocysts and removing interfering
              substances. Benchtop centrifuges are a standard device in most
              laboratories, however they are not only expensive, but also
              require electricity, which may be inaccessible in settings where
              cryptosporidiosis is most abundant: rural and low-resource areas.
              Our project addresses this challenge by using a cheap, portable
              model that can be shipped easily, does not require electricity,
              and can be used by anyone. Inspired by Stanford’s ‘Paperfuge’
              design, we developed and refined a prototype in Blender.
            </p>

            <p className="project-description">
              Centrifugation works by spinning a sample at high speeds, creating
              a force that pushes particles outward according to their density.
              Heavier material in suspension sediments to the bottom, where they
              form a solid pellet, while lighter material remains closer to the
              top. In practice, this means that spinning stool suspensions
              allows dense debris to move away from the fraction enriched with
              oocysts. By isolating the oocysts in this way, we can use a colour
              change LAMP test to detect the presence of Cryptosporidium oocysts
              in stool samples.
            </p>

            <p className="project-description">
              Our purification process involves centrifuging the stool sample
              twice in total. The first round will be when the stool is mixed
              with a water ether mixture and centrifuged at 500g for around 10
              minutes. This will create a pellet at the bottom of the test tube
              that contains stool and oocysts. After, we will add in Sheather’s
              sucrose solution with a specific-gravity of 1.27. The user will
              centrifuge again at 500g for 10 minutes to separate the oocysts
              from the stool. The oocysts will be suspended at the top in the
              sucrose solution. This concentrated oocyst solution can then be
              used for LAMP.
            </p>

            <p className="project-description"></p>

            <p className="project-description">
              We determined that a rotor with a diameter of about 20 centimeters
              was optimal. At this scale, the centrifuge remains light and easy
              to spin by hand, while still reaching the speeds necessary for
              pelleting stool suspensions. Using the relative centrifugal force
              formula, we calculated that with a radius of 10 cm and a
              rotational speed of 4500 RPM, the centrifuge would produce around
              2264g; more than enough to separate oocysts from background
              debris. We will only be requiring a relative centrifugal force of
              500g throughout each centrifugation step.
              <BlockMath math="\text{RCF} = \frac{r \cdot (RPM)^2}{1000} \cdot 1.118" />
            </p>
            <p className="project-description">
              <strong>Initial Design:</strong>
            </p>
            <p>
              The following is an initial design that we came up with after
              thinking through the steps required to purify the stool sample.
            </p>
            <div
              className="project-description"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src="https://static.igem.wiki/teams/5602/hardwaregeneral/digitisedfirstdrawing.webp"
                alt="Second iteration of centrifuge design"
                className="project-image-small"
              />
            </div>
            <ul className="project-description">
              <li>
                <strong>A:</strong> a sieve would filter out any large detritus
                from the stool sample.
              </li>
              <li>
                <strong>B:</strong> a pin that prevents the centrifuge from
                spinning when shipping to ensure the sieve is aligned with the
                test tube inside the centrifuge.
              </li>
              <li>
                <strong>C:</strong> two handles used to spin the centrifuge. As
                with the paperfuge, the strings are twisted around each other so
                when pulled, the centrifuge spins.
              </li>
              <li>
                <strong>D:</strong> closeup of the pin and the centrifuge.
              </li>
              <li>
                <strong>E:</strong> a diagonal test tube to increase distance of
                sample to the centre of the centrifuge.
              </li>
              <li>
                <strong>F:</strong> close up of the pin and hole.
              </li>
              <li>
                <strong>G:</strong> rotational axis.
              </li>
              <li>
                <strong>H:</strong> after centrifuging the stool, the solid
                parts form a pellet and the liquid layer containing the oocysts
                is poured into L.
              </li>
              <li>
                <strong>I:</strong> stripes on the edge of the centrifuge form a
                solid line when the user spins the centrifuge at the correct
                RPM.
              </li>
              <li>
                <strong>K:</strong> a lid to allow the user to remove the
                centrifuged test tube.
              </li>
              <li>
                <strong>L:</strong> a test tube surrounded by calcium oxide
                (CaO) powder that exothermically react with water to heat up the
                LAMP + oocyst reaction.
              </li>
              <li>
                <strong>M:</strong> water in a tube to activate the CaO
                exothermic reaction.
              </li>
            </ul>
            <p></p>
            <p className="project-description">
              <strong>Final Design:</strong>
              <p></p>
              <p className="project-description">
                The original paperfuge demonstrated that it was possible to
                achieve forces comparable to laboratory centrifuges using
                nothing more than paper, string, and simple handles, while
                costing less than a dollar. However, instead of paper, we
                designed a lightweight plastic rotor that could be 3D printed,
                with test tubes being slotted directly into the body of the
                centrifuge. This adaptation preserves the accessibility of the
                original device while making it sturdy enough for handling stool
                samples safely.
              </p>

              <p className="project-description">
                An initial prototype of the centrifuge we plan to use was also
                made. By piercing a cardboard disk twice, on opposite sides
                close to the central axis, and threading string through, a
                relatively simple model of the paperfuge was created.
              </p>

              <div
                className="carousel-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={finalDesignImages[carouselIndex1]}
                  alt={`Final hardware design ${carouselIndex1 + 1}`}
                  className="project-image"
                  style={{ height: "500px", width: "auto", maxWidth: "100%" }}
                />
              </div>
              <p className="project-description">
                The centrifuge consists of three main parts: a hollow plastic
                rotor, the string system, and the handles. The rotor is the
                central component and has been designed in Blender to be both
                durable and light, with one test tube slot opposite a weighted
                pocket. The weighted pocket should net out the weight of the
                test tube and stool sample so the centrifuge is stable and
                balanced when spinning. A tightly coiled string is inserted
                through two holes in the centre of the disc; when it is pulled,
                the string untwists, causing the rotor to spin at thousands of
                revolutions per minute. The handles, on either side of the
                string, provide the user with a grip point to apply force. These
                three main components transform a manual pulling motion into
                centrifugal force strong enough to separate oocysts from stool
                suspensions.
              </p>
            </p>

            <p className="project-description">
              <strong>Resources for future iGEM teams:</strong>
              <p></p>
              Beyond our project, the value of such a centrifuge lies in its
              accessibility. It can be produced cheaply, shipped flat, and
              assembled or operated without specialist training. In places where
              electricity is unreliable or laboratory centrifuges are
              unavailable, it provides an immediate solution for separating
              biological material. While our design focuses on Cryptosporidium,
              the principle applies to many pathogens, making this a versatile
              tool for diagnostics in low-resource environments. We hope our
              designs can inspire future advancements in point of care test
              kits.
            </p>
          </section>

          <section id="heating" className="model-subsection">
            <h2 className="project-context-title">Heating</h2>
            <p className="project-description">
              The optimum temperature for the reverse transcriptases and Bst
              polymerase is at around 65 degrees. Unlike PCR, LAMP reactions can
              take place at a constant temperature. In the lab, LAMP assays are
              carried out in water baths where a constant temperature can be
              maintained. However, our test kit is designed to be used in low
              resource settings; so we designed a cheap, portable water bath
              that does not require electricity, but instead leverages an
              exothermic reaction between calcium oxide and water.
            </p>
            <p className="project-description">
              Our first water bath designs had issues with heat retention and
              how fast the heat energy would be released and dissipated. So we
              came up with a new 3D design that would securely hold the water
              and CaO separate until the point of use. This would prevent
              accidental reactions that could harm the user.
            </p>
            <BlockMath math="CaO + H_2O \rightarrow Ca(OH)_2 + \text{energy}" />

            <p className="project-description">
              For every mole of CaO that reacts with water, 65.2 kJ of energy
              are released exothermically.
            </p>

            <p className="project-description">
              The images below show the initial CAD designs that we came up for
              the water bath.
            </p>
            <div
              className="carousel-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={firstWaterBathDesigns[carouselIndex2]}
                alt={`First water bath design ${carouselIndex2 + 1}`}
                className="project-image"
                style={{ height: "500px", width: "auto", maxWidth: "100%" }}
              />
            </div>
            <strong>Initial Idea Evaluation</strong>
            <p className="project-description">
              After a team meeting, the main issues about this minimal issue was
              that the plastic walls were too thick for effective heat transfer
              and so the heat was not being transferred to the paraffin and LAMP
              reagents effectively. Additionally, we did not initally factor in
              the way the reagents would mix together at the users end. Lastly,
              this design did not incorporate a phase change material (PCM) to
              help maintain the temperature at 65 degrees for the required 40
              minutes. The design was also too small to hold the necessary
              reagents to heat the LAMP reaction for 40 to 60 minutes; so in
              later designs we increased the size of the water bath.
            </p>

            <p className="project-description">
              The following images showcase the 3D printed designs that used to
              test the heating capabilities of the water bath in the lab. These
              designs were improved over the previous ones as we incorporated
              the teams feedback. The trenches in the bottom stage is where the
              copper tubing would fit inside and then be sealed with epoxy for
              the purposes of testing the heating capabilities of the water
              bath. Images of the testing are shown further below.
            </p>
            <div
              className="carousel-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={threeDprinterCADImages[carouselIndex4]}
                alt={`First water bath design ${carouselIndex4 + 1}`}
                className="project-image"
                style={{ height: "500px", width: "auto", maxWidth: "100%" }}
              />
            </div>

            <p className="project-description">
            </p>
            <strong>How the design works</strong>
            <div className="project-description">
              <p>
                The water bath is made up of three main sections: the bottom
                section, the middle section and the lid. The bottom section
                contains the CaO powder, which is separated from the water in
                the middle section by a plastic layer. The middle section
                contains the water and is designed to hold it securely in place
                during the reaction. The lid fits on top. Initally all the
                reactants are sealed in their chambers so that no false
                reactions take place. When the user is ready to start, they push
                the bung through the thin layer of plastic in the lid and middle
                section. A little groove is cut into the bung which allows the
                water to empty into the container below by breaking the seal.
                This starts the reaction. The CaO heats up and transfers the
                heat through the copper pipe, melts the paraffin which heats up
                the test tube containing the LAMP reagents and oocysts. The
                images below show how the bung breaks the thin layer in the lid
                and the grove in the bung.
              </p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "0.5rem", verticalAlign: "top" }}>
                      <img
                        src="https://static.igem.wiki/teams/5602/hardwaregeneral/bungclose.webp"
                        alt="Bung close-up"
                        className="project-image-small"
                        style={{
                          display: "block",
                          margin: "0 auto",
                          width: "300px",
                          height: "auto",
                        }}
                      />
                    </td>
                    <td style={{ padding: "0.5rem", verticalAlign: "top" }}>
                      <img
                        src="https://static.igem.wiki/teams/5602/hardwaregeneral/pinthroughlid.webp"
                        alt="Pin through lid"
                        className="project-image-small"
                        style={{
                          display: "block",
                          margin: "0 auto",
                          width: "600px",
                          height: "auto",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <strong>Phase Change Material (PCM)</strong>
            <p className="project-description">
              To maintain a constant temperature of 65 degrees for 40 minutes,
              we incorporated a phase change material (PCM) into our design.
              Without a PCM, the reaction release lots of heat quickly
              (potentially killing the Bst polymerases) and the reaction would
              end. It would then cool and not maintain the 65 degrees required
              for the LAMP reaction. A PCM absorbs and releases thermal energy
              during the process of melting and solidifying at a specific
              temperature. We selected a PCM that melts at around 65 degrees,
              which is the optimal temperature for the LAMP reaction. When the
              CaO reacts with water, the heat generated will be absorbed by the
              PCM, maintaining the temperature for the duration of the reaction.
              The PCM would absorb the heat and provide a stable temperature for
              a longer period of time as it cools. This ensures that the LAMP
              reaction can be carried out at the optimal temperature.
            </p>

            <strong>Building the Water Bath</strong>
            <p className="project-description">
              In order to keep the test kit light, as well as resistant to the
              high temperatures and easy for us to make, we 3D printed the
              container for the waterbath, using ABS plastic. This begins to
              soften around 100 degrees, which is well above 65 degrees required
              for our LAMP test. We printed the 3D model in 3 sections, so that
              we could fill the bottom and middle sections with CaO and water
              respectively, before starting the reaction. Additionally, we cut
              and sanded down the copper tubing to fit into the grooves cut into
              the mould, in order to create barriers between the CaO/paraffin,
              and between the paraffin/LAMP reagents. The copper tubing and
              plastic were secured together using epoxy, to create a strong lid
              that would allow the reaction to be carried out without risk of
              anything moving. This makes the entire structure more reliable, as
              well as easier to set up for those using it.
              <br />
              <br />
              In order to test the hardware, a thermometer was set up to sit in
              lieu of the test tube, paraffin chips were added and the CaO
              powder and water were mixed. The temperatures were recorded for
              the duration of the experiment. Images of the experimental setup
              are shown below.
              <p></p>
              <div
                className="carousel-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={testingWaterBathImages[carouselIndex3]}
                  alt={`Final hardware design ${carouselIndex3 + 1}`}
                  className="project-image"
                  style={{ height: "500px", width: "auto", maxWidth: "100%" }}
                />
              </div>
              <p className="project-description">
                In this session, we also constructed a paperfuge to test how
                easy it would be for a user to operate. We require that samples
                are centrifuged at 500g for 10 minutes and we found that the
                centrifuge would sometimes loose balance and it would need to be
                stopped. Though we hypothesise that a heavier centrifuge (the
                one made out of plastic) should lend it more stability when
                spinning. We also noticed that after 5 minutes of spinning the
                thin layer of plastic between the two holes were the string was
                inserted into ripped as shown on the image below. Though this
                issue is fixed with our plastic centrifuge design.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://static.igem.wiki/teams/5602/hardwaregeneral/centrifugebroken.webp"
                  alt="Bung close-up"
                  className="project-image-small"
                  style={{
                    width: "500px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <p className="project-description">
                After conducting the initial experiment, we realised how
                difficult it was to break the thin layer of plastic in the lid
                and the middle section. So the final product will use a hermetic
                seal instead; which is more easily pierced by the bung. We also
                realised that the small trench in the bottom section, where the
                small and large copper tubes are inserted, need to be larger as
                the 3D printing plugged in the small trench.
              </p>
              <p className="project-description">
                We did the experiment a second time, but this time adding in a
                digital temperature logger to monitor the temperature changes
                more accurately. Below is a graph showing the temperature of the
                paraffin wax after the reaction was started. The fluctuations in
                temperature are due to us moving around the thermometer, but
                overall the temperature was able to maintain 60 degrees for 34
                minutes before we had to stop the reaction.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="https://static.igem.wiki/teams/5602/hardwaregeneral/bettercao.webp"
                  alt="Bung close-up"
                  className="project-image-small"
                  style={{
                    width: "500px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <p className="project-description">
                The issues we faced were that the lid did not fit on properly
                leading to increased heatloss, something that will be avoided in
                the real test kit. The calcium oxide we used was also 13 years
                old and it is possible that lots of it had degraded over time
                into calcium hydroxide.
              </p>
              <p className="project-description">
                We did reach satisfactory temperatures considering our
                constraints. The waterbath did not feel warm from the outside
                suggesting that the plastic was a good enough insulator. None of
                the ABS plastic melted even at the peak heating, suggesting that
                it is a good material for the waterbath.
              </p>
            </p>
            <strong>Technical Details</strong>
            <p className="project-description">
              Using the the technical measurements from the water bath design in
              Fusion 360, we determined that the water chamber had a volume of
              29.1 <InlineMath math="\text{cm}^3" /> (or simply 29.1ml of
              water), the CaO chamber had a volume of 57.9{" "}
              <InlineMath math="\text{cm}^3" /> and the paraffin wax chamber had
              a volume of 10.7 <InlineMath math="\text{cm}^3" /> and was would
              expand by 11% when melted. <br />
              <br /> With these measurements, we could calculate how much energy
              would be released from the CaO and water reaction. We purposefully
              made the water react with an excess of water, to ensure all the
              CaO would react. The CaO would expand by 2 times on slaking and
              the water would enter the lower section, so we can only fill the
              bottom section with 40 <InlineMath math="\text{cm}^3" /> of CaO
              powder at a density of 1 <InlineMath math="\text{g/cm}^3" />.
              Using loose CaO powder that has a density of 1{" "}
              <InlineMath math="\text{g/cm}^3" />
              , we can fit 40 g of CaO powder. A complete reaction will release
              39.44 kJ of energy.
              <br />
              <br />
              We experimented with pure paraffin wax as the phase change
              material (PCM), though the real product would use a PCM that melts
              at 65 degrees. The best PCM for our application is RUBITHERM
              RT64HC; it has a melting point of 63-65 degrees, a heat storage
              capacity of 250 <InlineMath math="\text{kJ/kg}" /> or 70{" "}
              <InlineMath math="\text{Wh/kg}" /> and a density of 0.9 as a
              solid. At 10.7 <InlineMath math="\text{cm}^3" />, we can fit 9.63
              g of RUBITHERM RT64HC{" "}
              <a
                className="link"
                href="https://www.rubitherm.eu/media/products/datasheets/Techdata_-RT64HC_EN_13012025.PDF"
                target="_blank"
              >
                [1]
              </a>{" "}
              which would store 2.4 kJ of energy in a perfect scenario. The wall
              between the CaO and PCM is a thin copper wall, and between the PCM
              and the test tube, there is another think copper wall to try and
              reduce energy loss.
              <br />
              We hypothesise that a complete reaction of water and 40g of CaO
              would release sufficient heat energy to melt the PCM and maintain
              a temperature of 65 degrees for 40 minutes.
            </p>
            <strong>Final Designs</strong>
            <p></p>
            <p className="project-description">
              <div
                className="carousel-container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={CADwaterBathImages[carouselIndex5]}
                  alt={`Final hardware design ${carouselIndex5 + 1}`}
                  className="project-image"
                  style={{ height: "400px", width: "auto", maxWidth: "100%" }}
                />
              </div>
            </p>
            <p className="project-description">
              These designs incorporate the copper tubing to separate the CaO,
              paraffin and LAMP reagents to speed up heat transfer. The central
              copper tube has the external dimentions of the 0.2ml test tube so
              that it fits snug with maximal contact area. The thin areas of the
              lid and middle section are visible.
            </p>
          </section>

          <section id="detection" className="model-subsection">
            <h2 className="project-context-title">Detection Methods</h2>
            <p className="project-description">
              There are various detection methods for LAMP as there are many
              reactants involved that change as LAMP progresses which can be
              used to detect LAMP DNA amplification. The detection methods we
              investigated were: turbidity, which tracks the accumulation of
              insoluble magnesium pyrophosphate formed as pyrophosphate released
              during LAMP polymerisation chelates Mg2+ ions; fluorometry, which
              records increased fluorescence as EvaGreen binds growing dsDNA;
              chemical colour change, either via pH indicators responding to
              proton release or metal-ion indicators responding to decreased
              free Mg2+ ions; and lateral flow, in which dually labelled
              amplicons are captured on a streptavidin test line with biotins
              and visualised by gold-conjugated monoclonal anti-hapten
              antibodies. After many hours of research, turbidity detection was
              eliminated due to an unknown amount of insoluble particles that
              may have passed our filtration and cleansing process. Fluorometry
              was not chosen as the light emitted from the EvaGreen dye or other
              fluorescent dyes and detection methods would be too dim to detect
              with the naked eye. A fluorometer would be required, but this
              undermines our goal of creating a cheap, portable test kit and
              electricity free test kit. The dye might also be affected by other
              substances in the stool sample, leading to false positives. The pH
              colour change was not chosen as our detection method due to
              unknown pH values of the stool sample as we were not using buffer
              to make the pH a known value. Finally, a lateral flow detection
              method was discarded as gold nano-particles are too expensive for
              test kits where affordability is the number one constraint. After
              a whole team meeting, we chose to use the metal-ion based HNB dye
              due to the visibility of the colour change which was confirmed by
              a survey sent out our human practices team, and the guaranteed
              nature of a colour change when magnesium ions are sequestered by
              pyrophosphate released during LAMP. The last method seemed
              faultless for our application.
            </p>
          </section>

          <section id="magnesium" className="model-subsection">
            <h2 className="project-context-title">Magnesium Problem</h2>
            <p className="project-description">
              One team member found an issue with a large amount of soluble
              magnesium in stool samples which we were not getting rid of with
              our old test kit design, and so that would render HNB dye
              detection impractical; there would be an unknown and excessive
              quantity of magnesium ions in the sample. Previously, the quantity
              of magnesium ions added to the LAMP reaction was precisely
              calculated to ensure that LAMP could sequester enough magnesium to
              cause a colour change if 18s rRNA was detected. However, the
              randomness and quantity of soluble magnesium in stool necessitated
              a change to the hardware. The whole team investigated
              non-magnesium based detection methods such as fluorescent
              molecular beacons, loop primer fluorescence, turbidity, latteral
              flow (rejected due to cost) and water-ether flotation. Luckily, we
              found that water-ether flotation, Sheather's sucrose solution and
              a few purification processes would leave us with a magnesium-free
              oocyst solution that is ready for LAMP assays.
              <br />
              <br />
              <strong style={{ fontSize: "18px", marginBottom: "5px" }}>
                Rejection Reasons:
              </strong>
              <br />
              <strong>Fluorescent Molecular Beacons</strong>
              <br />
              The reason why we did not pursue using fluorescent molecular
              beacons is due to the same issue of high magnesium ions in
              solution. The molecular beacon takes the shape of a hairpin loop
              with a fluorophore on one end and a quencher on the other. When
              the beacon is not bound to its target sequence, the fluorophore
              and quencher are in close proximity, preventing fluorescence. Upon
              hybridization to the target sequence, the beacon undergoes a
              conformational change that separates the fluorophore and quencher,
              allowing fluorescence to occur. However, in our case, the high
              magnesium ion concentration would interfere with the proper
              folding and function of the molecular beacon, making it impossible
              to unfold as the forces due to the magnesium ions would force it
              closed. An image of the molecular beacon schematic is shown below.
              <br />
              <img
                src="https://static.igem.wiki/teams/5602/hardwaregeneral/molecularbeaaacocnn.webp"
                alt="molecular beacon"
                className="project-image-small"
                style={{
                  width: "500px",
                  height: "auto",
                  marginBottom: "10px",
                }}
              />
              <br />
              <br />
              <strong>Loop Primer Fluorescence</strong>
              <br />
              We also did not pursue loop primer fluorescence as we did not have
              the ability to design fluorometers without any electricity or
              batteries. This method has the following design considerations:
              Primer design: one of the loop primers (usually the “loop‐forward”
              or “loop‐backward” primer) is synthesized with a 5′ BODIPY label,
              and its 5′‐terminal nucleotide is chosen to be a G or C.
              Unhybridized state: when that labeled primer is free in solution
              (single‐stranded), the BODIPY is a few nanometers away from any
              guanine on the primer itself, so you see a strong baseline
              fluorescence. Target hybridization: once the primer anneals to its
              complementary loop region in the growing LAMP amplicon, that 5′
              G/C comes into very close contact with the BODIPY. photoinduced
              electron transfer (PET) quenching kicks in and the fluorescence
              intensity plummets. Signal read‑out: on an isothermal fluorescence
              reader, you record a decrease in fluorescence over time. Because
              new primer is constantly being consumed to make amplicons, the
              curve takes on a reverse‑sigmoid shape. The sooner your target
              sequence is present at high enough copy number, the earlier and
              steeper the fluorescence drop and that’s how you call a positive.
            </p>
            <br />
            <br />
          </section>

          <section id="final-design" className="model-subsection">
            <h2 className="project-context-title">Final design</h2>
            <p className="project-description">
              Below are the final steps we devised after continuous iteration of
              design, testing, and feedback from peers.
            </p>
            <p className="project-description">
              <ul>
                <li>
                  1. The liquid stool sample is collected with a spatula and
                  transferred into a funnel with a coarse sieve to remove solid
                  particles.
                </li>
                <li>
                  2. The oocysts should be able to pass through the sieve along
                  with smaller particles of the stool and all the liquid. This
                  is collected in a 25 ml test tube.
                </li>
                <li>
                  3. The test tube is mixed with a water ether solution.
                  Incorporating ether is more beneficial as it pulls out
                  fats/oils and much floating debris, so the oocysts sediment
                  into a tighter pellet while a greasy plug forms above (easy to
                  discard). Water-only spins leave the pellet smeared with
                  lipids and junk. The ether also cleans away more LAMP
                  inhibitors found in lipids.
                </li>
                <li>
                  4. The test tube is inserted into our paperfuge and spun at
                  500g for 10 minutes.
                </li>
                <li>
                  5. The solid stool sample and oocysts form a pellet at the
                  bottom while the supernatant is removed; containing the water,
                  ether and junk that it has pulled out.
                </li>
                <li>
                  6. Sheather's sucrose solution with a specific gravity of 1.27
                  is added to the test tube, and is vigirously shaken to mix the
                  pellet and the sucrose.
                </li>
                <li>
                  7. The test tube is centrifuged again at 500g for 10 minutes.
                </li>
                <li>
                  8. Now the oocysts are suspended in the sucrose solution.
                </li>
                <li>
                  9. The supernatant is poured through a 5 µm filter to remove
                  any remaining debris while catching the oocysts. This peice of
                  hardware takes the shape of a hollow plastic tube with a sieve
                  in the middle. The sieve allows the liquid with high magnesium
                  content to pass through while leaving the oocysts trapped in
                  the fine sieve.
                </li>
                <li>
                  10. The tube is inverted and backwashed with some distilled
                  water. This should move the oocysts into a test tube with pure
                  water.
                </li>
                <li>
                  11. A 40 microlitre capillary pipette is used to extract 40
                  microlitres of the oocysts rich solution and is inserted into
                  a test tube prepacked with all the necessary reagents for a
                  full LAMP diagnostic. The 40 microlitre solution will contain
                  enough water to re-hydrate the lyophilised reagents.{" "}
                </li>
                <li>
                  12. The test tube is placed inside the water bath, and the
                  bung is used to start the reaction by mixing the water and
                  calcium oxide. The water bath should also cause the wall of
                  the oocyst to weaken so the 18s rRNA can be released.
                </li>
                <li>
                  13. The reaction is let to run for one hour and the results
                  are analyzed.
                </li>
                <li>
                  14. The dye should change from violet to blue if the patient has the crypto parasite. 
                </li>
              </ul>
            </p>
            <p className="project-description">
              The image below illustrates the steps of the protocol.
            </p>
            <img
              src="https://static.igem.wiki/teams/5602/contribution/img-5995.webp"
              alt="final steps"
              className="project-image"
            />
          </section>
          <section id="pricing" className="model-subsection">
            <h2 className="project-context-title">Hardware Pricing</h2>
            <p className="project-description">
              <p className="project-description">
                <strong>Items required to manufacture the water bath:</strong>
              </p>
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
                      Part
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Quantity required
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Total Cost (£)
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Quantity Sold in Bulk
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Cost per unit (£)
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Reference
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Notes
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
                      Big copper tube
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      15.6
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      76.54
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      3000
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.3980
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.travisperkins.co.uk/clearance/wednesbury-copper-tube-chrome-length-35mm-x-3m/p/313818"
                        target="_blank"
                      >
                        Link to large diameter copper tube
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      QUANTITIES IN MM NO WASTE ASSUMED
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Small copper tube
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      15.6
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      8.59
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      900
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.1489
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.amazon.co.uk/gp/product/B083S654JL/ref=ox_sc_act_title_1?smid=AIF4G7PLKBOZY&psc=1"
                        target="_blank"
                      >
                        Link to small diameter copper tube
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      QUANTITIES IN MM NO WASTE ASSUMED
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Paraffin
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      6
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      5.5
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      500
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.066
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.amazon.co.uk/Mouldmaster-Paraffin-Wax-Translucent-1kg/dp/B09GFFGYNN?source=ps-sl-shoppingads-lpcontext&ref=fplfs&th=1"
                        target="_blank"
                      >
                        Link to paraffin wax
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      QUANTITIES IN GRAMS
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Plastic
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      131.56
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      13.8
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
                      1.8155
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.3djake.uk/sunlu/abs-white-7"
                        target="_blank"
                      >
                        Link to raw ABS plastic
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      IN GRAMS (DENSITY ON WEBSITE)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p></p>

              <p className="project-description">
                <strong>Other consumables required for the test kit:</strong>
              </p>
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
                      Part
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Quantity required
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Total Cost (£)
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Quantity Sold in Bulk
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Cost per unit (£)
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Reference
                    </th>
                    <th
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Notes
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
                      Funnel
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      13.99
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      90
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.1554
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.amazon.co.uk/HAKZEON-Plastic-Funnels-Assorted-Filling/dp/B0BZKXB2TG/ref=sr_1_1?dib=eyJ2IjoiMSJ9.qYGw1wNJRBtqxpc1mBi-ag.MqInSYT5X2smbXHmQXaaEW4PQE4nM_MhD1xrUbZZufs&dib_tag=se&keywords=HAKZEON-Plastic-Funnels-Assorted-Filling&qid=1759625110&sr=8-1"
                        target="_blank"
                      >
                        Link to funnel set
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    ></td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Test tubes
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      2
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      7.44
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
                      0.1488
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.alibaba.com/product-detail/Squeezable-1ml-1-5ml-2ml-3ml_1600226142262.html"
                        target="_blank"
                      >
                        Link to test tubes with lid
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    ></td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.2ml test tube
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      73.48
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
                      0.0735
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.fishersci.fr/shop/products/brandtech-thin-wall-0-2ml-pcr-tubes-attached-caps-10/10161391"
                        target="_blank"
                      >
                        Link to test tube
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.3dcontentcentral.com/download-model.aspx?catalogid=171&id=428209"
                        target="_blank"
                      >
                        Link to 3D model of 0.2ml test tube
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      40 microlitre pipette
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      4.1
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
                      0.041
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.globalsources.com/product/capillary-pipette_1195233917f.htm"
                        target="_blank"
                      >
                        Link to pipette
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    ></td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Paper centrifuge
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.148
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.148
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://techfinder.stanford.edu/technology/paperfuge-low-cost-high-speed-human-powered-centrifuge"
                        target="_blank"
                      >
                        Link to paper centrifuge
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      DOESNT APPEAR TO BE COMMRCIALLY AVAILABLE
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      5 micro meter sieve
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      815
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      500
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      1.63
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.industrialnetting.com/sieves-screens.html"
                        target="_blank"
                      >
                        Link to 5 <InlineMath math="μm"></InlineMath> sieve
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      HAD TO REQUEST QUOTE
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Sucrose solution
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      5
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      37.1
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      3785
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.049
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://www.fishersci.com/shop/products/sheather-sgrflotation-solga/502232659"
                        target="_blank"
                      >
                        Link to Sheather's sucrose solution
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      IN ML
                    </td>
                  </tr>

                  <tr>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      Ethyl actuate
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      3
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      138
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      25000
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      0.0167
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      <a
                        href="https://acpqure.com/product/ethyl-acetate-997-acs"
                        target="_blank"
                      >
                        Link to ethyl acetate
                      </a>
                    </td>
                    <td
                      style={{
                        border: "1px solid #aaa",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      IN ML
                    </td>
                  </tr>
                </tbody>
              </table>
            </p>
            <p className="project-description">
              The total comes to approximately <strong>£4.69</strong> per test
              kit when most of the items are bought in bulk. This is well within
              our target of £5 per test kit and it may be subsidised by
              governments to make it more affordable for low-income families.
              The upfront cost for purchasing all items totals to{" "}
              <strong>£1193.69</strong>
            </p>
          </section>

          <section id="references" className="model-subsection">
            <h2 className="project-context-title">References</h2>
            <ul className="project-description">
              <li>
                <a
                  href="https://blogs.worldbank.org/en/opendata/85-africans-live-less-550-day"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://blogs.worldbank.org/en/opendata/85-africans-live-less-550-day
                </a>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/figure/The-schematic-illustration-of-a-Immunomagnetic-separation-b-Sample-preparation-and_fig1_341958667"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rapid Detection System for Hepatitis B Surface Antigen (HBsAg)
                  Based on Immunomagnetic Separation, Multi-Angle Dynamic Light
                  Scattering and Support Vector Machine - Scientific Figure on
                  ResearchGate. Available from:
                  https://www.researchgate.net/figure/The-schematic-illustration-of-a-Immunomagnetic-separation-b-Sample-preparation-and_fig1_341958667
                  [accessed 4 Oct 2025]
                </a>
              </li>
              <li>
                <a
                  href="https://www.researchgate.net/figure/Schematic-illustration-of-molecular-beacon-hybridization-assays-In-the-absence-of_fig4_51823594"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  In vitro quantification of specific microRNA using molecular
                  beacons - Scientific Figure on ResearchGate. Available from:
                  https://www.researchgate.net/figure/Schematic-illustration-of-molecular-beacon-hybridization-assays-In-the-absence-of_fig4_51823594
                  [accessed 6 Oct 2025]
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
