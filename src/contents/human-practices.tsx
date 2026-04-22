import React, { useEffect, useRef, useState } from "react";
import "../assets/css/human-practices.css";

const CollapsibleItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        contentRef.current.classList.add("expanded");
      } else {
        contentRef.current.classList.remove("expanded");
      }
    }
  }, [open]);

  return (
    <div className="hp-section-item">
      <button
        className={`hp-section-button ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <span className="hp-section-title">{title}</span>
        <span className="hp-icon">{open ? "−" : "+"}</span>
      </button>
      <div
        className="hp-section-content"
        ref={contentRef}
        aria-hidden={!open}
      >
        {children}
      </div>
    </div>
  );
};

export const HumanPractices = () => {
  return (
    <section className="hp-wrapper">
      <h1 className="education-intro-title">Connecting Your Project to the Wider World</h1>

      <div className="hp-section-list">
        <CollapsibleItem title="What values inspired your project?">
          <p>
            Our product was inspired by <strong>four core values</strong>: <strong>safety, access, freedom</strong>, and <strong>equity</strong>. <strong>Safety</strong> meant ensuring
            that individuals affected by cryptosporidiosis get <strong>prompt, effective treatment</strong> to keep them healthy.
            <strong> Freedom</strong> meant that, especially vulnerable groups such as young children, are able to understand these
            conditions and <strong>remain aware</strong> and <strong>in control</strong> of their own bodies. <strong>Access</strong> represented our dedication to
            <strong>increasing availability</strong> of <strong>diagnostic kits</strong> for people of <strong>all incomes, ages and abilities</strong>. Finally,
            <strong> equity</strong>: we wanted to ensure reliable health kits were <strong>available to everyone</strong>, helping close the gap in
            healthcare disparities, working towards <strong>health equity</strong>.
          </p>
          <ul>
            <li><strong>Safety</strong></li>
            <li><strong>Access</strong></li>
            <li><strong>Freedom</strong></li>
            <li><strong>Equity</strong></li>
          </ul>
        </CollapsibleItem>

        <CollapsibleItem title="How did you decide which needs or values to prioritise?">
          <p>
            We chose to prioritise <strong>safety and access</strong> in our project, specifically the need for a:
          </p>
          <ol>
            <li>A reliable test kit which was <strong>incredibly sensitive</strong> to cryptosporidiosis</li>
            <li>A cheap, simple test</li>
          </ol>
          <p>
            We chose to prioritise <strong>sensitivity</strong> in our project as <strong>existing methods</strong> for detection were <strong>incredibly insensitive</strong>, sometimes <strong>as low as 40%</strong> in microscopy tests. By <strong>prioritising sensitivity</strong>, we were <strong>prioritising safety</strong> of our customers who would be <strong>assured</strong> that they would know whether or not they were afflicted with cryptosporidiosis. This would then allow them to <strong>seek the relevant treatment</strong> for recovery.
          </p>
          <p>
            Beyond this, we wanted to ensure <strong>price and expertise</strong> were <strong>not barriers</strong> to accurate diagnosis, as <strong>existing tools</strong> for detection often were both <strong>expensive and complex</strong>. Prioritising <strong>lowering the cost</strong> of our toolkit as much as possible meant our project would be able to be used in <strong>lower income rural areas</strong> where access to sanitation and microscopy may not be readily available. 
          </p>
          <p>
           We had to <strong>compromise on accessibility and costs</strong> of our test; we were considering <strong>two dyes</strong>, one with a purple to blue colour change and one with a red to blue colour change. While a <strong>red to blue</strong> dye would’ve been <strong>more accessible</strong> for individuals with red colour blindness, it came with the <strong>extra cost of ~£6 a test kit</strong>: this was far too great an expense and <strong>conflicted</strong> with our aim to provide an affordable diagnostics tool. We have attempted to <strong>rectify the red blindness issue</strong> by providing a <strong>colour palette</strong> below the test kit.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="Did you reach your initial goals or did you have to adjust them?">
          <p>
            Initially, we ran into <strong>issues</strong> where we thought we may need to use a <strong>centrifuge</strong> for <strong>separating the layers</strong> in our test kit: this would’ve been incredibly <strong>expensive</strong> and we would not have met our goal of providing a cheap kit. However, our hardware team developed a <strong>hand operated centrifuge</strong> which overcomes this issue, lowering costs.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="How does your approach compare to alternative solutions to the same or similar problems, including approaches outside of synthetic biology and biotechnology?">
          <p>
            There are currently two other detection methods in use:
          </p>
          <ul>
            <li>PCR</li>
            <li>Microscopy</li>
          </ul>
          <p>
            PCR is <strong>ineffective</strong> at detecting cryptosporidiosis as the oocysts used in detection <strong>contain PCR inhibitors</strong>. Furthermore, <strong>PCR is expensive</strong>, requiring equipment such as <strong>thermocyclers</strong>. <strong>Microscopy</strong> not only <strong>takes weeks</strong> to produce a result as samples must be sent of to a lab, but is also a relatively <strong>more expensive</strong> procedure that requires expertise. In rural areas, sending samples off and waiting is risky, <strong>every second counts</strong> when battling serious illnesses such as cryptosporidiosis. Furthermore, expertise limits the accessibility of this test, as areas without the equipment and medical professionals required may not be able to carry out the test. Coupled with low accuracy and sensitivity, microscopy tests are a poor detection method. 
          </p>
          <p>
            Our solution <strong>relies merely</strong> on the <strong>presence of DNA</strong>, <strong>eliminating the risk</strong> of inhibitors.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="Could your project be misused? Could your team's solution to one problem create other problems?">
          <p>
            One potential challenge of our <strong>highly sensitive LAMP-based test</strong> is <strong>cross-contamination</strong> between samples, especially in settings <strong>without sterile equipment</strong>. This could <strong>compromise the reliability</strong> of the results or reduce confidence in the testing process. 
          </p>
          <p>
            To mitigate this, we have designed a <strong>closed reaction system</strong> and included clear, <strong>easy-to-follow instructions</strong> to help prevent contamination during use.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="How does the iGEM community expect your team to be safe and responsible, both inside and outside of the lab?">
          <p>
            As developers of a diagnostic tool, we recognise that the iGEM community expects us to uphold the <strong>highest standards of safety, ethics, and responsibility</strong>. Inside the lab, this means following <strong>strict biosafety protocols</strong> when handling biological materials, designing our experiments to minimise contamination risks, and ensuring all team members are properly trained. 
          </p>
          <p>
            Outside the lab, it means understanding the broader impact of deploying a diagnostic test. Diagnostics influence medical decisions, public health responses, and individual well-being, therefore we must ensure our test is accurate, easy to interpret, and not misused. 
          </p>
          <p>
            We’ve taken steps to address accessibility, clarity of results, and usability in low-resource settings, while avoiding overpromising or promoting unsupervised medical decisions.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="Which communities will be most interested in or most affected by your project?">
          <p>
            Our project is designed to have the greatest impact in low and middle-income countries, where Cryptosporidium infection rates are highest and access to diagnostics is most limited. Communities in parts of Sub-Saharan Africa, South Asia, and Latin America are particularly affected, with children at the greatest risk. 
          </p>
          <p>
            In these areas, poor water sanitation and limited healthcare infrastructure make early diagnosis difficult, despite the fact that treatment is simple if the disease is caught in time. 
          </p>
          <p>
            Our affordable, easy-to-use test aims to close that diagnostic gap and aims to bring reliable detection to the people who need it most.
          </p>
        </CollapsibleItem>

        <CollapsibleItem title="Which communities will be left out or negatively impacted if your project succeeds?">
          <p>
            While our test is designed to be simple and accessible, some groups may still face challenges using it independently. For example, people with disabilities or physical handicaps who have limited hand dexterity may struggle to collect or process samples without assistance. 
          </p>
          <p>
            Additionally, individuals with visual impairments might find interpreting colour changes difficult despite our inclusion of a colour palette. We recognise these limitations and aim to improve inclusivity by designing user-friendly instructions and exploring alternative formats or support options in the future.
          </p>
        </CollapsibleItem>
      </div>

      <h1 className="education-intro-title" style={{ marginTop: "3rem" }}>
        Responsive
      </h1>

      <div className="hp-section-list">
        <CollapsibleItem title="Which resources or communities should you consult to ensure you are prioritizing appropriate values in the context of your project?">
          <p>–We should contact healthcare workers in the endemic and diseases field that may know or have treated patients with crypto. Prioritising reaching out to health care workers in places where crypto is at the highest like Nigeria, Bangladesh and other less developed countries.</p>
          <p>-Public health organisations like PATH or WaterAID; groups that can provide insight on how to use efficient testkit delivery, patient needs and logistical constraints.</p>
          <p>-Immunocompromised patient advocacy groups (or even people with crypto), to understand their experiences and help us guide test accessibility, language, and design.</p>
          <p>-Speaking to Bioethicists and social scientists in the field to ensure that our product is fairly distributed ( as well as obviously working).</p>
        </CollapsibleItem>

        <CollapsibleItem title="How might you get feedback on the feasibility and desirability of your approach?">
          <p>–We sent out a public survey (using google forms) to gather feedback on key aspects of our design — including what colour change would be most intuitive for users to interpret a positive result</p>
          <p>-Engagement with diagnostic experts and engineers, especially those experienced with LAMP or point-of-care technologies, to assess design and cost-effectiveness in resource-limited settings.</p>
          <p>-collaboration with universities or NGOs in high-incidence regions to test usability, sensitivity, and accuracy in real-world scenarios.</p>
          <p>-Use of social media platforms (Instagram, Twitter/X, LinkedIn) to reach a broader audience — including scientists, students, and field workers — for feedback, suggestions, and community input.</p>
          <p>-Participate in iGEM forums  and meetings to receive critique from other teams and synthetic biology experts on technical and logistical feasibility.</p>
        </CollapsibleItem>

        <CollapsibleItem title="How can your team “close the loop” between your design and what is desired?">
          <p>- Each time we receive feedback from users or experts, we update our kit's design, instructions, or components accordingly.</p>
          <p>-Using feedback mechanisms, e.g. a QR code or link on our kit where health workers can leave anonymous reviews or improvement suggestions</p>
          <p>- Co-designing parts of our kit with nurses, clinicians, or even patients to make sure it aligns with their workflow and literacy.</p>
        </CollapsibleItem>

        <CollapsibleItem title="How can you use your Human Practices work to inform your team's ethical, technical, safety and/or communication decisions?">
          <p>-          Our Human Practices work helps us stay grounded in what actually matters — how our test will be used and who it’s for. The feedback we’ve gathered has already shaped technical decisions, like choosing a colour change that’s easy to interpret, and simplifying the steps so anyone can use it without training.</p>
          <p>-          It’s also pushed us to think carefully about safety — making sure the test poses no harm to users, especially in places without proper lab facilities. Ethically, we’re making sure our solution is genuinely accessible, not just affordable, but easy to distribute and understand.</p>
          <p>-          On the communication side, we’re using clear language and visuals in the kit design and instructions, based on what people told us was confusing. Every piece of feedback we get is a reminder to keep refining — to make something that really works for the people who need it most.</p>
        </CollapsibleItem>
      </div>
      <section id="human-practices">
  <h2 className="project-context-title">Human Practices</h2>

  <p>
    When initially looking into this topic, our focus was to provide suitable solutions for a disease affecting smaller,
    less equipped areas. As we continued our research, it became clear that Cryptosporidiosis was a larger, more
    widespread challenge than we originally anticipated, with it affecting more developed places globally in the US and
    UK. For example, Milwaukee and South Devon, thereby creating an international issue.
  </p>

  <p>
    Around the world, changes in climate, population and the way we use land are making waterborne diseases like
    Cryptosporidiosis more likely. Flooding can contaminate clean water supplies by washing Cryptosporidium oocysts from
    livestock farms and other sources into drinking water supplies, hot summers can encourage parasites to survive longer,
    and busy recreational sites, such as pools can promote the spread of the parasite as people commonly drink this water
    when it may be contaminated. In all of these cases, the key is catching outbreaks early, before they affect hundreds
    or thousands of people.
  </p>

  <p>
    That’s why our project is designed to test for Cryptosporidiosis quickly and flexibly. The rapid diagnostic test we
    are working on could be used in a farm clinic here in the UK, in a school nurse’s office abroad, or in a health centre
    in a country with fewer resources. Our aim with this test is to allow anyone, regardless of whether they are medically
    trained to be able to effectively use the kit. The same health promotion activities we have run in local schools,
    mixing science with hand-on activities and simple messages, could be adapted into other languages and shared in
    different countries across the world, enabling many to easily understand the basics of keeping safe and healthy.
  </p>

  <p>
    We have also been thinking about how to make this work responsibly. A test is only useful if people can actually
    afford to use it - if they trust the results, and if the information is handled properly. We have spoken to healthcare
    workers and public health teams to understand what would help them the most, and how our ideas could fit into real-life
    outbreak responses. Within these conversations, they have highlighted the importance of also spreading awareness about
    the disease, which is why in our education ventures we made sure to also detail our project and its importance to
    hundreds of people.
  </p>

  <p>
    The way we have designed this project is not just about Cryptosporidium, but about the future of diagnostic testing.
    The approach we have taken - combining synthetic biology with community outreach, could be applied to many other
    diseases. It is a way of bringing science out of the lab and into everyday life, so that when the next health challenge
    comes along, communities are better prepared. Starting here, with a parasite that’s close to home, we hope our work
    can inspire a bigger change in how we deal with hidden health threats all over the world.
  </p>
</section>

    </section>
    
  );
};
