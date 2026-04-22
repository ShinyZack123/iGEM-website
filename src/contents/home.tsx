import React from "react";
import "../assets/css/home.css";
import { FadeInSection } from "./FadeInSection";

export function Home() {
  const projectTitle = "CRYPTOKNIGHT";
  const bannerText =
    "We are proud to have won Gold in the 2025 Jamboree";
  const bannerItems = Array.from({ length: 4 });

  return (
    <div className="home-wrapper">
      <div className="award-banner">
        <div className="award-banner__marquee">
          {[...Array(2)].map((_, loopIndex) =>
            bannerItems.map((_, i) => (
              <div className="award-banner__item" key={`${loopIndex}-${i}`}>
                <img
                  src="https://static.igem.wiki/teams/5602/headerimages/image-9-picsart-backgroundremover.avif"
                  alt="Gold medal"
                />
                <p className="award-banner__text">{bannerText}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-image">
        <img
          src="https://static.igem.wiki/teams/5602/headerimages/cryptoknight.webp"
          alt="Cryptoknight background"
        />
      </div>
      <div className="hero-text">
        <h1 className="project-title">
          {projectTitle.split("").map((char, i) => (
            <span
              key={i}
              className="letter"
              style={{ "--delay": `${i * 0.3}s` } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </h1>
        <h2 className="subtitle-lamp-on-image">
          SHINING A <span className="lamp">LAMP</span> ON CRYPTOSPORIDIOSIS
        </h2>
        <h2 className="subtitle-more">
          Scroll down to read more...
        </h2>
      </div>

      {/* Lamp Section */}
      <div className="lamp-section">
        {/* Section 1: THE PROBLEM */}
        <FadeInSection>
          <div className="lamp-item left">
            <div className="lamp-text">
              <h2 className="highlight">THE PROBLEM</h2>
              <p>
                Cryptosporidiosis is a waterborne parasitic disease found across the globe. It infects 5 - 7.5 million people each year, causing 20-200,000 child deaths and 8 million disability adjusted life years lost annually.
              </p>
            </div>
            <div className="lamp-image">
              <img src="https://static.igem.wiki/teams/5602/homepage/cryptoknighthomepageitems.webp" alt="Cryptosporidiosis problem" style={{
    width: '100%',
    height: '800px',
    objectFit: 'cover',
    objectPosition: 'center',
  }}/>
            </div>
          </div>
        </FadeInSection>

        {/* Section 2: CURRENT SOLUTIONS */}
        <FadeInSection>
          <div className="lamp-item right">
            <div className="lamp-text">
              <h2 className="highlight"style={{ color: "#43b9b1ff" }}>CURRENT SOLUTIONS</h2>
              <p>
                Current diagnostic methods include faecal smear microscopy and rt-QPCR. These require expensive equipment and specialist training that is simply inaccessible to many who suffer from Cryptosporidiosis. They are also low sensitivity, hovering around 40-60%, leading to only an estimated 2% of cases being successfully diagnosed.
              </p>
            </div>
            <div className="lamp-image">
              <img src="https://static.igem.wiki/teams/5602/homepage/homepageqpcr.webp" alt="Current diagnostic solutions"style={{
    width: '100%',
    height: '800px',
    objectFit: 'cover',
    objectPosition: 'center',
  }} />
            </div>
          </div>
        </FadeInSection>

        {/* Section 3: OUR SOLUTION */}
        <FadeInSection>
          <div className="lamp-item left">
            <div className="lamp-text">
              <h2 className="highlight"style={{ color: "#f9a93a" }}>OUR SOLUTION </h2>
              <p>
                <span className="lamp">LAMP (LOOP MEDIATED ISOTHERMAL AMPLIFICATION)</span><br />
                This year, CoL iGEM has developed a point-of-care diagnostic kit for cryptosporidiosis using LAMP, a highly sensitive, efficient and sequence-specific isothermal nucleic acid amplification method. Our test kit detects the 18s ribosomal RNA, a highly conserved region of RNA found in high numbers and low variation across all parasitic cryptosporidium species.
              </p>
            </div>
            <div className="lamp-image">
              <img src="https://static.igem.wiki/teams/5602/homepage/homepagelamp.webp" alt="LAMP solution" style={{
    width: '100%',
    height: '900px',
    objectFit: 'cover',
    objectPosition: 'center',
  }}/>
            </div>
            
          </div>
        </FadeInSection>
        <img src="https://static.igem.wiki/teams/5602/home/home18srrna-allprimers.webp" alt="Cryptosporidiosis problem" style={{ width: '1300px', objectFit: 'cover' }}/>
      </div>
    </div>
  );
}
