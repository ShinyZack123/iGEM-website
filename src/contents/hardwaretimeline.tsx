import React, { useEffect, useRef, useState } from "react";
import "../assets/css/hardwaretimeline.css";

const TimelineItem = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`timeline-item ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export const HardwareTimeline = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const introRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  const months = [
    {
      id: 1,
      name: "May",
      description: (
        <>
          Cryptosporidiosis project is chosen. Initial research on detection
          methods. We choose to research turbidity, fluorescence, colour change
          detection and lateral flow detection. After one week, the following
          methods become obsolete: turbidity, due to an unknown particle load in
          the stool sample; fluorescence, as it would require a battery-powered
          product; and lateral flow detection, since it would necessitate gold
          nanoparticles. Then Hardware begins researching different dyes.
          Finally, HNB colour change is chosen for its distinct colour change
          and robustness as it relies on magnesium ion concentration. At the
          same time, Hardware researches different oocyst extraction methods
          and centrifugation stands out as the easiest method.
        </>
      ),
    },
    {
      id: 2,
      name: "June",
      description: (
        <>
          Modelling work begins, work is spread out between team members. The
          modeling work aims to help the biology team with verifying their
          results from the wet lab. Hardware discusses with the biology subteam
          to determine what can and should be modeled. Four modeling projects
          are initiated: modeling the expression of 18s rRNA from e.coli, our
          modified Bst polymerase fusion protein, LAMP using ODEs and
          calculating the rate of transcription of our reverse transcriptase
          using quantum mechanical models and various Conda libraries. First
          design is made and team members spend a week trying to simplify the
          design and steps.
        </>
      ),
    },
    {
      id: 3,
      name: "July",
      description: (
        <>
          Team member finds an issue with excess magnesium in stool samples
          which causes all work to shift to finding and improving detection
          methods for 2 weeks until the issue is resolved. With the new
          solution that involves more cleaning steps, Hardware comes up with a
          more robust process for the diagnostics kit.
        </>
      ),
    },
    {
      id: 4,
      name: "August",
      description: (
        <>
          Building up the Wiki, working together to create a beautiful website
          design and respective subteams write up the work that was done
          throughout the year. Team members work on converting the steps made in
          July to a proper product that is mostly housed in one shell. 3D
          models of the design are made and final measurements of the product
          are confirmed. A call is scheduled with a modeling professional from
          an AI biotech company called Precision Life to ask her about potential
          approaches to machine learning in the project. Hardware ventures into
          designing a lab-on-a-chip LAMP diagnostics product that hospitals
          around the world can use for rapid LAMP assays.
        </>
      ),
    },
    {
      id: 5,
      name: "September",
      description: (
        <>
          Work on the Wiki continues, work from Wetlab is added to the Wiki.
          Hardware 3D prints some components from the test kit and finds any
          large issues that need to be addressed. Hardware builds and tests the
          centrifuge speed detection, water bath heating and the whole test kit
          flow to ensure ease of use.
        </>
      ),
    },
  ];

  return (
    <div className="hardware-page-wrapper">
      <nav className="sidebar-nav">
        <ul>
          <li className={activeSection === "introduction" ? "active" : ""}>
            <a
              href="#introduction"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("introduction");
                introRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Introduction
            </a>
          </li>
          <li className={activeSection === "timeline" ? "active" : ""}>
            <a
              href="#timeline"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("timeline");
                timelineRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Timeline
            </a>
          </li>
        </ul>
      </nav>

      <main className="hardware-content">
        <section
          id="introduction"
          ref={introRef}
          className="hardware-intro-wrapper"
        >
          <h1 className="hardware-intro-title">Introduction</h1>
          <p className="intro-description">
            Our Hardware subteam worked alongside Wet Lab, Modelling, and Wiki to
            transform initial project ideas into a robust, testable diagnostic
            kit. The following timeline captures our month-by-month progress
            from concept to prototype.
          </p>
        </section>

        <section
          id="timeline"
          ref={timelineRef}
          className="hardware-timeline-wrapper"
        >
          <h1 className="hardware-timeline-title">Timeline</h1>

          <div className="hardware-timeline">
            {months.map(({ id, name, description }) => (
              <TimelineItem key={id}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h2 className="timeline-month-name">{name}</h2>
                  <div className="timeline-description">{description}</div>
                </div>
              </TimelineItem>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
