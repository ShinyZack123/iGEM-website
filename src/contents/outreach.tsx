
import "../assets/css/outreach.css"; 
import { FadeInSection } from "./FadeInSection";

export function Outreach() {
  const sections = [
    {
      title: "OUR PODCAST",
      description:
        "Tune in to our podcast where we discuss breakthroughs in biotechnology, iGEM projects, and the latest in science outreach. Stay updated with interviews with our iGEM team members.  ",
      img: "https://static.igem.wiki/teams/5602/outreach/img-6008.webp",
      side: "left",
      link: "https://www.youtube.com/watch?v=ejdvCYLErBY&list=PLRUaddqet4_SfE_nKnp5TdLBUNgH6yWMO",
    },
    {
      title: "iGEM FAIR",
      description:
        "To raise money, we hosted an iGEM fair, full of fun and exciting activities like temporary tattoos, water balloon fights and a fabulous bake sale with contributions from our talented team.",
      img: "https://static.igem.wiki/teams/5602/outreach/img-6007.webp",
      side: "right",
      
    },
    {
      title: "OUR MAGAZINE",
      description:
        "Within our school we released our own magazine with articles about synbio and general STEM discussions from each of our team members, in order to get all the students interested in the world of science. ",
      img: "https://static.igem.wiki/teams/5602/outreach/20251007-202536278-ios.webp",
      side: "left",
    },
    {
      title: "BAKE SALE",
      description:
        "We also hosted an additional bake sale in order to raise money for our project, which was highly successful thanks to our incredible contributions from team members! ",
      img: "https://static.igem.wiki/teams/5602/description/00c923d1-502e-4ed8-8b19-229ff20b1dc0.webp",
      side: "right",
    },
    
     
  ];

  return (
    <div className="outreach-container">
      {sections.map((section, i) => (
        <FadeInSection key={i}>
          <div className={`outreach-section ${section.side}`}>
            <div className="outreach-text">
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              {section.link && (
    <a
      href={section.link}
      target="_blank"
      rel="noopener noreferrer"
      className="outreach-link"
    >
      {section.title === "OUR PODCAST" ? "🎧 Listen Now" : "▶ Watch Video"}
    </a>
              )}
            </div>
            <div className="outreach-image">
              <img src={section.img} alt={section.title} />
            </div>
          </div>
        </FadeInSection>
      ))}
    </div>
  );
}
