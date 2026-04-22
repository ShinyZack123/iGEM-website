import React, { useEffect, useRef, useState } from "react";
import "../assets/css/education.css";

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

const quotes = [
  {
    id: 1,
    text: "During the iGEM talk for Year 5 and 6, we had lots of fun making strands of DNA with sweets (and eating them!) We also answered questions and talked with our partners about characteristics, trying to work out if they were genetic or not. Altogether, I learnt a lot!",
    author: "Pupil, City Junior School",
  },
  {
    id: 2,
    text: "I loved the DNA lesson, it was so sweet!",
    author: "Pupil, City Junior School",
  },
  {
    id: 3,
    text: "iGEM is an organisation set up to solve problems such as climate change and they also came to our school to tell us about DNA",
    author: "Pupil, City Junior School",
  },
];

const feedbacks = [
  {
    id: 1,
    paragraphs: [
      "Right from the word go, you could see that the team had put a huge amount of preparation into the day. This was especially evident when they presented the lessons and engaged the children with practical activities.",
      "Feedback from the class teachers showed that the team had excellent subject knowledge and were putting over quite complex concepts yet in a way that 9-11 year olds were able to understand.",
      "The children were both engaged and enthused by the subject matter, gaining huge enrichment for their science journeys. The lessons enabled the children to carry out studies in a way that they have never done before.",
      "In short, the children thoroughly enjoyed the day, gaining a tremendous amount through the activities. The teachers were very impressed by the subject knowledge of the team and the professional manner in which they conducted themselves.",
    ],
    author: "Carpenters Primary Science Teacher",
  },
];

export const Education = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const introRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const extraRef = useRef<HTMLElement>(null); // <-- ADDED: declare extraRef
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const sections = [
      { id: "introduction", ref: introRef },
      { id: "timeline", ref: timelineRef },
      { id: "beyond", ref: extraRef }, // <-- ADDED: include beyond/exraRef in observer
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -60% 0px",
      }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const schools = [
    {
      id: 1,
      name: "Tonbridge School",
      date: "7th March 2025",
      images: [
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-0439.webp",
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-0434-1.webp",
      ],
      description: (
        <>
          At the Tonbridge Science Conference{" "}
          <strong>"From Quantum Mechanics to Medical Breakthroughs"</strong>, we
          attended lectures by <strong>Dr. Craig Sawyer</strong>, who discussed
          advancements in particle physics at CERN,{" "}
          <strong>Dr. Sam Adegbola</strong>, who spoke on human genetics and its
          medical applications, and <strong>Professor Stuart Mackenzie</strong>,
          who presented on animal magnetoreception in chemistry. We also
          participated in a poster session, where we displayed our{" "}
          <strong>iGEM poster</strong>, highlighting past projects, current
          initiatives, and the impact of synthetic biology on solving real-world
          problems. Additionally, we presented to a group of 30 during the
          student presentation session on <strong>iGEM</strong> (International
          Genetically Engineered Machine). Our presentation covered past iGEM
          projects such as <strong>cocaine purification in the Thames</strong>,
          as well as our current potential research solutions.
        </>
      ),
    },
    {
      id: 2,
      name: "City Junior School",
      date: "19th March 2025",
      images: [
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-1971.webp",
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-1972.webp",
      ],
      description: (
        <>
          On the 19th of March, we were extremely grateful for the opportunity
          to go to our school’s junior counterpart to deliver teaching lessons
          to Years 5 and 6. Our lessons included an introduction to{" "}
          <strong>genetic biology</strong>, covering{" "}
          <strong>cells, microscopes, and DNA</strong>. We compared cells to the
          <em> “Lego bricks of life”</em>. The session was made interactive with{" "}
          <strong>“guess the cell” games</strong> and <strong>bingo</strong> to
          ensure students understood that cells were only present in living
          things, and to establish the link between genes and characteristics.
          We then delved into the idea of <strong>genetic engineering</strong>,
          which we described as simply <em>“cutting and pasting genes”</em>. To
          further develop their knowledge, we held <strong>Q&A sessions</strong>{" "}
          and encouraged the kids to ask questions. Finally, we allowed them to{" "}
          <strong>
            design their own genetically engineered plants or animals
          </strong>{" "}
          and discussed their ideas with them.
        </>
      ),
    },
    {
      id: 3,
      name: "Carpenters Primary School",
      date: "1st April 2025",
      images: [
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-2164.webp",
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/img-4499.webp",
      ],
      description: (
        <>
          On 1st April, members of our team visited Carpenters Primary School to
          teach <strong>synthetic biology</strong> to students in Years 5 and 6.
          We covered an introduction to <strong>cells, nuclei, and DNA</strong>,
          followed by a <strong>strawberry DNA extraction experiment</strong>{" "}
          where students witnessed real-life DNA! The day was full of fun games
          and interactive sessions — students even got to use{" "}
          <strong>microscopes</strong>! We discussed{" "}
          <strong>genes, dominant and recessive alleles, and mutations</strong>,
          explained through Mr Men games and plant genetics. Later we explored{" "}
          <strong>genetic engineering</strong> — simplified as{" "}
          <em>“cutting and pasting genes”</em>. We wrapped up with a{" "}
          <strong>mini quiz</strong>. We thoroughly enjoyed the experience and
          hope the students enjoy using their new microscopes.
        </>
      ),
    },
    {
      id: 4,
      name: "Eastcourt Primary School",
      date: "4th April 2025",
      images: [
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/4b09ed6d-5fd0-418e-8263-245b9ae33779.webp",
        "https://static.igem.wiki/teams/5602/headerimages/educationdays/db2470fb-b90d-41ea-940f-7c6d781d4e13.webp",
      ],
      description: (
        <>
          On 4th April 2025, six team members visited Eastcourt School to teach{" "}
          <strong>synthetic biology</strong> to Year 6 students. We began with
          an introduction to fundamental biological concepts like{" "}
          <strong>cells, DNA, and RNA</strong>, before diving into the
          principles and real-world applications of synthetic biology. To help
          explain <strong>genes, alleles, and mutations</strong>, we used
          interactive activities like the <strong>Mr Men game</strong>. One of
          the highlights was when students{" "}
          <strong>designed their own species</strong>, encouraging creativity
          and practical application. Unexpectedly, the session concluded with a
          lively <strong>debate on ethics</strong> in genetic engineering. The
          students contributed insightful ideas and showed enthusiasm for
          scientific ethics.
        </>
      ),
    },
    {
      id: 5,
      name: "Virtual School Refugee Teaching",
      date: "30th April 2025",

      description: (
        <>
          On 30th April 2025, we had the opportunity to teach a group of{" "}
          <strong>young refugees</strong> supported by the City of London’s
          Virtual School. Many were new to English and formal education, so we
          tailored our session to be simple and engaging. We introduced them to
          the basics of <strong>biology</strong> and the{" "}
          <strong>iGEM competition</strong>, explaining how synthetic biology
          can solve real-world problems. Their <strong>curiosity</strong> was
          inspiring, and we felt privileged to welcome them into our community.
        </>
      ),
    },
  ];

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const prevQuote = () => {
    setQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  return (
    <div className="education-page-wrapper">
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
              Teaching
            </a>
          </li>
          <li className={activeSection === "beyond" ? "active" : ""}>
            {" "}
            {/* <-- ADDED nav li */}
            <a
              href="#beyond"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection("beyond");
                extraRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Beyond the Classroom
            </a>
          </li>
        </ul>
      </nav>

      <main className="education-content">
        <section
          id="introduction"
          ref={introRef}
          className="education-intro-wrapper"
        >
          <h1 className="education-timeline-title">Introduction</h1>
          <p className="intro-description">
            As part of our commitment to{" "}
            <strong>public engagement and scientific outreach</strong>, our team
            has taken part in a number of educational events across different
            age groups and communities. From{" "}
            <strong>teaching synthetic biology</strong> to primary school
            children, to presenting complex genetic concepts at{" "}
            <strong>national science conferences</strong>, our goal has been to{" "}
            <strong>
              inspire curiosity, promote understanding, and share the real-world
              impact
            </strong>{" "}
            of synthetic biology and iGEM.
          </p>
        </section>

        <section
          id="timeline"
          ref={timelineRef}
          className="education-timeline-wrapper"
        >
          <h1 className="education-timeline-title">Teaching</h1>

          <div className="education-timeline">
            {schools.map(({ id, name, date, description, images }) => (
              <TimelineItem key={id}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h2 className="timeline-school-name">{name}</h2>
                  <p className="timeline-date">{date}</p>

                  {images && images.length > 0 && (
                    <div className="timeline-image-wrapper">
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${name} event ${idx + 1}`}
                          className="timeline-image"
                        />
                      ))}
                    </div>
                  )}

                  <p className="timeline-description">{description}</p>
                </div>
              </TimelineItem>
            ))}
          </div>

          <div className="quotes-carousel-wrapper">
            <h2 className="quotes-title">Feedback</h2>

            <div className="quotes-carousel">
              <span className="quote-mark left">“</span>
              <div
                className="quotes-track"
                style={{
                  transform: `translateX(-${quoteIndex * 100}%)`,
                }}
              >
                {quotes.map(({ id, text, author }) => (
                  <blockquote key={id} className="quote-slide">
                    <p>{text}</p>
                    <cite>— {author}</cite>
                  </blockquote>
                ))}
              </div>
              <span className="quote-mark right">”</span>
            </div>

            <div className="quote-controls">
              <button onClick={prevQuote} aria-label="Previous quote">
                ‹
              </button>
              <button onClick={nextQuote} aria-label="Next quote">
                ›
              </button>
            </div>
          </div>

          <div className="feedback-wrapper">
            {feedbacks.map(({ id, paragraphs, author }) => (
              <blockquote key={id} className="feedback-item">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <cite>— {author}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* New Section */}
        <section id="beyond" ref={extraRef} className="education-extra-wrapper">
          <h1 className="education-timeline-title">Beyond the Classroom</h1>
          <p>
            In addition to school visits, we hosted and participated in a number
            of <strong>academic events</strong>. At the{" "}
            <strong>Tonbridge Science Conference</strong>, “From Quantum
            Mechanics to Medical Breakthroughs,” we attended{" "}
            <strong>lectures from leading scientists</strong>, including{" "}
            <strong>Dr. Craig Sawyer</strong> on particle physics at CERN,{" "}
            <strong>Dr. Sam Adegbola</strong> on human genetics and medicine,
            and <strong>Professor Stuart Mackenzie</strong> on magnetoreception
            in animals. We also contributed to the conference by presenting our
            iGEM poster, showcasing past projects, current initiatives, and the
            role of synthetic biology in addressing real-world problems. During
            the <strong>student presentation session</strong>, we discussed
            previous iGEM projects such as cocaine purification in the Thames
            alongside our current research ideas. With{" "}
            <strong>over 350 people in attendance</strong>, the conference
            provided valuable exposure and an opportunity to engage with both
            students and researchers.
          </p>
          <p>
            In August, we <strong>hosted a symposium</strong> with five other
            iGEM teams, where we <strong>presented our ideas</strong>,{" "}
            <strong>received constructive feedback</strong>, and engaged in{" "}
            <strong>Q&amp;A sessions</strong>. The event included a talk from a
            medical doctor and a <strong>keynote presentation</strong> by our
            teammate Jamie on markov chains, which helped spark discussions on
            scientific collaboration, ethical considerations, and the future of
            synthetic biology.
          </p>
          <p>
            Beyond these ventures, we also designed the{" "}
            <strong>City Scientist Times</strong>, printing and distributing the
            magazine to <strong>over 700 people</strong>. The magazine consisted
            of articles written by our team in various topics within the
            sciences at a range of complexities to ensure that{" "}
            <strong>readers across all age groups</strong> would have something
            to enjoy.
          </p>
          <p>
            At both CLS and CLSG we ran an <strong>iGEM club</strong> where each
            week we taught younger years about synthetic biology and{" "}
            <strong>exposed them to new concepts</strong> regarding DNA and
            molecular biology <strong>not covered in their curriculum</strong>.
            At CLS, we ran a <strong>DNA extraction experiment</strong> to allow
            the pupils to gain <strong>hands on experience</strong> of what they
            had been learning about.
          </p>
          <p>
            We also recorded a <strong>series of podcasts</strong> covering
            synthetic biology in the modern world, from investment to
            spliceosomes, which we hope to release soon. The aim of these
            podcasts was to provide an{" "}
            <strong>alternative form of media</strong> which people could
            consume while enjoy other day to day actives, while keeping up will
            all things biology!
          </p>
        </section>

        <section id="beyond" ref={extraRef} className="education-extra-wrapper">
          <h1 className="education-timeline-title">Accessibility</h1>
          <p>
            As the theme of our human practices this project is ‘making iGEM
            accessible to everyone and anyone,’ we implemented some helpful
            features on the website. <br /> The first is an easier-to-read font for
            people with dyslexia and secondly, a high contrast mode for
            partially-sighted or colourblind people. We thought these changes
            were essential to increase accessibility of the project regardless
            of readers’ disabilities. These options can be toggled on and off
            via the settings icon in the header.
          </p>
        </section>

        <section id="beyond" ref={extraRef} className="education-extra-wrapper">
          <h1 className="education-timeline-title">Education Materials</h1>
          <li>
            <a
              href="https://static.igem.wiki/teams/5602/education/teaching-whole-day-plan.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whole day teaching plan
            </a>
          </li>
        </section>
      </main>
    </div>
  );
};
