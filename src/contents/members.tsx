import { useEffect, useState } from "react";
import { FaUsers, FaDna, FaMicrochip, FaHandshake } from "react-icons/fa";
import "../assets/css/members.css";

export function Members() {
  const [openBio, setOpenBio] = useState<string | null>(null);

  const toggleBio = (name: string) => {
    setOpenBio((prev) => (prev === name ? null : name));
  };

  const getIcon = (section: string) => {
    switch (section) {
      case "Team Leaders":
        return <FaUsers />;
      case "Biology":
        return <FaDna />;
      case "Hardware":
        return <FaMicrochip />;
      case "Human Practices":
        return <FaHandshake />;
      default:
        return null;
    }
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="section-header">
      <span className="icon">{getIcon(title)}</span> {title}
    </h2>
  );

  useEffect(() => {
    if (openBio) {
      document.body.classList.add("members-body-locked");
    } else {
      document.body.classList.remove("members-body-locked");
    }

    return () => {
      document.body.classList.remove("members-body-locked");
    };
  }, [openBio]);

  useEffect(() => {
    if (!openBio) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenBio(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openBio]);

  const TeamGrid = ({ members }: { members: any[] }) => (
    <div className="team-grid">
      {members.map((member) => {
        const isOpen = openBio === member.name;

        return (
          <div className="team-card" key={member.name}>
            <div className="card-inner">
              <div className="card-face card-front">
                <div className="card-top">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="card-image"
                  />
                  <div>
                    <h3 className="card-name">{member.name}</h3>
                    <p className="card-role">{member.role}</p>
                  </div>
                </div>

                <button
                  className="card-button"
                  onClick={() => toggleBio(member.name)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleBio(member.name);
                    }
                  }}
                  aria-label={isOpen ? "Hide Bio" : "View Bio"}
                >
                  {isOpen ? "Hide Bio" : "View Bio"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSection = (title: string, members: any[]) => (
    <section className="section-block">
      <SectionHeader title={title} />
      <TeamGrid members={members} />
    </section>
  );

  // Team arrays
  const teamLeaders = [
    {
      name: "Aarush Bhatt",
      role: "Biology Team Leader",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/aarush-bhatt.webp",
      bio: "A dedicated worker and head of biology, Aarush Bhatt’s dedication to iGEM is obvious (his lock screen is the iGEM logo…). Whether it’s making Leprosy Day pamphlets or an animation of transcription and translation (that went into WAY too much detail), Aarush is clearly in love with biology. Aarush’s passion in his role as biology team leader is evident through his constant suggestions of new ideas and solutions throughout the project, rallying for the project's focus to be on Lyme disease before proposing cryptosporidiosis once we discovered Lyme to be a bit of a lost cause… This, alongside his superior knowledge (leaving his surrounding team members feeling rather confused yet impressed), cements his role as biology team leader. He’s contributed far more to the project than can be listed in a brief description. A stand out moment was his (unfortunately unpublished) podcast episode on the spliceosome and the lost tapes of his accidental triple stutter (iykyk). Beyond the laser focussed research, Aarush also is extremely creative, running his own heartfelt blog, frequently and secretly perused by members of the team to gain true insight into their leader’s mind. Most impressive is his self published book (which fellow leaders Shenxy and Annabelle would peruse in maths lessons), as well as his unwavering love for his younger sister. His quirks of Randomly capitalising Important words is beloved yet frustrating, often mysteriously popping up in presentations and then furiously being edited out…",
    },
    {
      name: "Annabelle Jackson",
      role: "Hardware Team Leader",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/annabelle-jackson.webp",
      bio: "As Head of Hardware, Annabelle Jackson runs a ship not unlike that of Theseus’. With so many team additions, removals and absentees, one may begin to question the existence of a Hardware vessel, yet Annabelle manages to gracefully direct it toward the Jambouree. Despite this, Annabelle has controlled the hardware hive-mind into creating the best (objectively) wiki, hardware and modelling projects that have come out of City of London Schools. There really is no other person who has the engineering prowess and undefatigable ability to set hardware deadlines at such strange hours of the day as Annabelle; the perfect skill set for an engineer.",
    },
    {
      name: "Shenxy Loong",
      role: "Human Practices Team Leader",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/shenxy-loong.webp",
      bio: "Shenxy is the most employed unemployed person we know—single-handedly herding the iGEM team through endless emails and last-minute reminders. She is incredibly adept at remembering what to do when and who to contact in which situations, and has a particularly interesting ability to get work done (notably Canva docs and PowerPoints)—whether or not the team necessarily wants to do it. She has pulled many all-nighters editing the various things the iGEM team needs to produce, and her scathing wit (and every so often, scalding rage) is something of legend amongst the team. Shenxy was also responsible for initially proposing water-ether emulsion to solve the magnesium issue, the final solution chosen to isolate the cryptosporidium oocysts. Human Practices was seemingly made for her, and she excels in every aspect of the role as the team’s lead. She has written enough emails to fill up most of the library of babel and has planned and hosted so many meetings that sometimes it is difficult to tell when one begins and when another ends. Outside of iGEM, she runs a booming Vinted and eBay reselling business, proving that economics isn’t just a degree to her, it’s also a side hustle waiting to happen.",
    },
  ];

  const biologyMembers = [
    {
      name: "Alex Avaliani",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/alex-avaliani.webp",
      bio: "Despite there being no other Alex-es in our team, Alex is known unanimously as Alex A, one of three alliterative names in CoL iGEM. Perhaps his name is representative of his stellar grades, all A*s across the board. On a serious note, Alex A is extremely serious. Dedicated to the success of our project, he is involved in all aspects, from bake sales to bio research. As the highest scorer in our entrance exam, we knew Alex A would be a force to be reckoned with. More worried about ovarian cancer than any girl on the team, Alex A led the ovarian diagnosis research team for four months before the idea was deemed infeasible. He also helped run multiple whole school assemblies and has regularly provided critical feedback on project ideas. In our Cryptosporidiosis project, he was responsible for ideas of enzyme modification, selecting our plasmid backbone, and worked on fusion protein designs (among many, many other things). As humble as ever, Alex A is not a fan of being plastered over social media, preferring to let others take on the face and mantle, while remaining the engine which works tirelessly in the background. We wish him the best of luck for medical school.",
    },
    {
      name: "Iris Brodie",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/iris-brodie.webp",
      bio: "Iris helped us organise and lead the iGEM bake sale, and despite missing a few iGEM meetings for channel swim practice, her presence has been delightful and brought a lovely sociable aspect to an otherwise dead team.",
    },
    {
      name: "Sriya Ghosh-Iyengar",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/sriya-ghoshiyengar.webp",
      bio: "A breath of fresh air in this team of serious, deadpan CLS boys, Sriya brings life and reality to our iGEM team. She is a hard-working member of the biology team, and her endless excitement and sense of style makes her an immediate icon whenever she walks into room 505. Contributing to the project throughout its various stages, Sriya was an active participant while researching prospective ideas (albeit very emotionally connected to the ideas that got cut) and helped to develop lab protocols and adapt the project in response to feedback from experts. An English student as well as a scientist, Sriya is the designated proof reader (code for scut work) for written work/presentations put together by the Bio team. Sriya was one of the brave explorers that made the journey all the way to Tonbridge, representing the team at their science conference. She even managed to answer a couple of relevant questions from the audience in between ogling at all the rugby boys!",
    },
    {
      name: "Zara Leghari",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/zara-leghari.webp",
      bio: "Zara is an incredibly dedicated biology researcher who has fully supported the team throughout, putting almost as much effort into the project as her Letterboxd reviews!",
    },
    {
      name: "Jamie Marini Howells",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/jamie-marini-howells.webp",
      bio: "Before defecting to a maths degree, Jamie Marini Howells (no hyphen) was locked into the biology team, consistently producing a large volume of research at an impressive rate. His initial proposal for the project, tackling the sequestration of iron oxides from the polluted air of the tube, was later overturned in favour of LAMP, despite making it quite far in the elimination rounds. A keen member of the education troupe, he was instrumental in the creation of our teaching materials and lesson plans, as well as delivering multiple lessons to primary school children. Some other iconic education moments include (unpublished) podcast moments- notably, an unfortunate food comparison with Mars. However, a short stint as Aarush’s undersecretary, an investment proposal time crunch, and becoming Mr Hall’s beloved in-between left behind a shell of a being, whose sole wish was to move to modelling-happening too late and leaving a gaping hole in his personal statement. Since then, Jamie has been left in a purgatory between the Hardware and Biology team, and the once nearly-leader has been scrounging for modelling scraps. We hope he learns to start PowerPoint projects way ahead of deadlines as he heads off to uni!",
    },
    {
      name: "Aishe Stone",
      role: "Biology Team Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/aishe-stone.webp",
      bio: "So locked into iGEM that she took a terrifying trip to rural Wales for the Project Promotion Video, CoL iGEM would not be the same without Aishe Stone. One of our most consistent workers in the bio team, she has been instrumental in contributing to finding the modifications necessary for the enzymes involved in the LAMP reaction, searching through the deepest corners of obscure science journals to find the exact point mutations that can make our beloved Bst polymerase even more thermostable and efficient. Beyond iGEM, Aishe is an (occasionally) amazing pool player, taking regular marketplace trips after school with Lucinda, Shenxy or Maahika just to smoke them in the game (with a bit of luck).",
    },
    {
      name: "Luke Tan",
      role: "Biology Member and Wiki Artist",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/luke-tan.webp",
      bio: "While Luke is one of the few members of the Biology team planning on NOT pursuing a STEM-related career (shock horror), he still remains a strongly committed and insightful participant, whether that’s through his frequent contributions to the teams’ discussions, or his role as impromptu (yet expert) cameraman in the filming of the Project Promotion Video. Luke was responsible for researching primer design and possible problems, as well design software. A pro at crunching through research papers, Luke also investigated lab methods for LAMP, reverse transcriptase issues, and helped investigate magnesium issues and spent multiple hours working on fixing the issue. His artistic skills were used to design the CryptoKnight for the website banner, and we wish him the best of luck with his Architecture career, as we are sure his dedication to iGEM (having never skipped a meeting to play poker) will translate into academic rigour for this competitive course.",
    },
  ];

  const hardwareMembers = [
    {
      name: "Harriet Chubb",
      role: "General Hardware",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/harriet-chubb.webp",
      bio: "Armed with precise calculations and cat companionship, Harriet somehow balances advanced equations with fostering kittens, proving that both formulas and felines can coexist in perfect harmony. Her maths skills are so sharp they could cut through steel (or at least through the most stubborn simulation bugs), and her patience rivals that of a cat waiting by an empty food bowl. Whether she’s solving problems for the project or giving abandoned kittens a second chance, Harriet is always building something, be it better models or cat-friendly homes.",
    },
    {
      name: "Platon Pushnya",
      role: "General Hardware",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/platon-pushnya.webp",
      bio: "Despite being a late addition to the CoL iGEM Hardware Team, Platon has surely dedicated several hours to the project (in tandem with ChatGPT Premium). Standing 72 inches above the ground, this proud Ukrainian has dedicated countless hours to the CoL Italian SynBio Brainrot Instagram page, making iGEM accessible to all and determined not to be just another brick in the wall of scientific jargon. (Pink Floyd, anyone?)Not only does he hold success in International Maths competitions, he plays Fives outside school with teachers and is chronically jobless. However, don’t let his wisdom and knowledge fool you, for his yap (at midnight) on the team WhatsApp chat feels akin to a facetious middle child, when it comes to solving potential issues at hand. Spending time with Platon is a privilege, especially if you can be invited to his opulent abode, try his sophisticated cocktails, and win £50 against him over the poker table.",
    },
    {
      name: "Lucinda Stevens",
      role: "Wiki and Design",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/lucinda-stevens.webp",
      bio: "Our resident artist is always ready to take up work, whether that’s contributing biology research to initial ideas or being on hand to help out with HP education efforts. The least suspecting member of our team to be taking Biology A-Level (and hence an unfortunate victim of the occasional mansplaining), Lucinda has been the power behind many of our projects, from creating our team logo and poster for the Tonbridge Science Symposium, to designing a complex bingo for teaching primary school children phenotypes. After swearing never to touch HTML again after year 9, she rediscovered a love for programming and has become our main constructor and coder for the wiki. A master of design, albeit with a slightly pretentious music taste, Lucinda created striking visuals that transformed the website into a polished, intuitive site. This experience has equipped her with the necessary skills for future studies in architecture - just like buildings, she built our wiki from the ground up. Whilst her immense contributions to the team are no secret, her natural hair colour still remains a mystery to all.",
    },
    {
      name: "Zack Zlatarev",
      role: "Modelling and Hardware",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/zack-zlatarev-igem.webp",
      bio: "It’s difficult to know whether Zack Zlatarev has contributed more to the Biology or Hardware team this year. Maybe he has finally realised that the only way to avoid the Computer Science homeless shelter (where he might bump into fellow teammate Lucinda) is to pivot his career into bio-tech. Despite a few setbacks with quoting Elon Musk as his source on initial biological research projects, Zack has more than proved himself in every element of hardware - from designing and re-designing the diagnostics kit multiple times to modelling the complex mathematical equations that carried our whole project. \n Being so dedicated to the iGEM grind, he can recite the whole modelling document by heart and draw out all the hardware designs in seconds without breaking a sweat. Maybe this is why he earned the internal title of “omniscient overlord of hardware”. \n If Zack could wish for one thing, it would be to make the day 30 hours long. He simply has very little time to do things like relax, sleep and shower* after a 4 hour iGEM modelling session and working on his personal entrepreneurial ventures. \n *he does actually shower.",
    },
  ];

  const humanPracticesMembers = [
    {
      name: "Henry Bartter",
      role: "Human Practices Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/henry-bartter.webp",
      bio: "The best and only male in the Human Practices team, Henry has been instrumental in emailing around the boys’ school for iGEM. He always has a positive and joyous attitude in meetings (possibly linked to brainstorming our next TikTok idea) and is eager to infiltrate the bio team as he wishes to pursue the sciences in university. The diabolical 3:1 instagram follower to following ratio can be explained as Henry is always on top of his work and brings a happy attitude to an otherwise dreary project, making him someone you’d not regret getting to know! In charge of funding and grants, Henry has been instrumental in organising the sending of emails and applying to every grant under the sun. He also runs the brother iGEM club at CLS, dedicating many hours to powerpointing for the future generations of synbio!",
    },
    {
      name: "Mars Kajan",
      role: "Human Practices Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/mars-kajan.webp",
      bio: "A never ending stream of dentist appointments and Gold DofE barely prevented Matanhi ‘Mars’ Kajan from emailing nearly every company in the world begging for money. Her LAMDA and GCSE Drama qualifications were clearly put to use during the filming of our project promotion video - her acting skills were out of this world!",
    },
    {
      name: "Maahika Pandey",
      role: "Human Practices Member",
      photo:
        "https://static.igem.wiki/teams/5602/teammembericons/maahika-pandey.webp",
      bio: "Despite being caught playing Roblox in sessions, it is difficult to deny that Maahika is locked into iGEM. The academic comeback from the teary-eyed GCSE student to inhabiting the school library 24/7 needs to be studied-just as much as Maahika’s academic content, as she is constantly on the grind. Somehow through all the library lock-in sessions and marketplace pool games, Maahika is able to carve out a plethora of time to dedicate to iGEM, as co-heading our fundraising with Henry means sending countless follow up emails, and setting others work. Despite seemingly always one chemistry lesson away from a crash out, Maahika Pandey is the kind of person who brightens up every room she walks into. And if you manage to spend enough time with her, you might just get to meet Manish and Payal, and understand where her stunning looks come from.",
    },
  ];

  const otherContributors = [
    {
      name: "Ms Ostermann - CLS",
      bio: "Ms Ostermann has been incredibly helpful and supportive throughout the entire iGEM process—helping us to organise a variety of events, as well as being invaluable in the process of getting into contact with the wide variety of people who have helped us so far."
    },
    {
      name: "Mr Hennigan - CLS",
      bio: "Mr Hennigan’s firm belief in our project and his continued support and enthusiasm have helped the team to be able to have access to all of the resources that we need."
    },
    {
      name: "Dr Pawlowic - Bio",
      bio: "Dr Pawlowic has provided the necessary expertise and guidance to help us to refine and improve our project, and understand the need for our project (in the context of the people and communities it would be serving). She has been an invaluable resource for guiding the very basics of the project, and we are very thankful for that."
    },
    {
      name: "Dr Ana Garcia Mingo - Bio",
      bio: "Dr Ana Garcia Mingo was central in the early development of the project, as she helped us to understand the need for our project, especially in low-resource areas. In particular, she helped us to understand the feasibility of LAMP as a diagnostic core in a point of care diagnostic, and specifically for LAMP. Her boundless enthusiasm and endless knowledge have been very helpful."
    },
    {
      name: "Ms Meehitiya - CLSG",
      bio: "Ms Meehitiya has been incredibly helpful with our project, providing much-needed feedback on both the synthetic biology, but also helping our leaders navigate their first large leadership project. Her untimely departure from CLSG did not prevent her continuing her PI duties, for which we are extremely grateful."
    },
    {
      name: "Ms Sridhar - CLSG",
      bio: "Ms Sridhar has been an invaluable PI, providing consistent support in our weekly meetings with her and Ms Meehitiya. We are incredibly grateful for her helping us sort out a multitude of issues (ranging from theoretical to team dynamics to organisation), as well as aiding us in jamboree admin."
    },
    {
      name: "Dr Tibbits - CLSG",
      bio: "Dr Tibbits has helped us greatly in the process of setting up the iGEM team."
    },
    {
      name: "Twist - Bio",
      bio: "Twist have been incredibly generous, and have donated material we used."
    },
    {
      name: "Genscript - Bio",
      bio: "Genscript have been incredibly generous, and have donated material we used."
    },
    {
      name: "IDT - Bio",
      bio: "IDT have been incredibly generous, and have donated the Primers we used."
    },
    {
      name: "Mr Hall - CLS",
      bio: "Mr Hall been with us since the beginning."
    },
    {
      name: "Dr Markiv - Bio",
      bio: "Dr Markiv has been incredibly generous with both the time he devoted to us and help with explaining certain laboratory procedures when the biology team visited the KCL labs where he works on multiple weekends. Without the resources and equipment he made accessible to us, partly through donation, we would not be where we are today. The project has greatly benefitted from his wealth of knowledge and willingness to communicate and help throughout the majority of this project. Working in the labs alongside Dr Markiv has most certainly been a highlight of the iGEM experience, and to that we would like to say an extremely grateful thanks."
    },
    {
      name: "Dr Pehova - Hardware",
      bio: "Dr Pehova provided incredibly useful insight and support into the mathematical modelling of our project. Her knowledge of mathematical applications in biology helped us to improve the model. Dr Pehova’s incredible support on the modelling that we had done was invaluable, and we are grateful for the time and effort she put into reading our modelling and discussing it with us."
    },
    {
      name: "Mr Ives - CLSG",
      bio: "Despite not officially being one of our PIs, we would like to thank Mr Ives for his various support throughout the year. From helping set up our GoFundMe, to checking up with our progress with our education visits, (almost) all his suggestions have been useful (we made a Gantt chart but it didn’t work out)."
    },
    {
      name: "Ms Watson (CJS) ",
      bio: "Ms Watson kindly helped facilitate an opportunity for us to come to CJS (City Junior School) to teach their pupils about synthetic biology. We appreciate her patience and flexibility, as the lessons were arranged rather last minute."
    },
    {
      name: "Mr Saunders (Carpenter's)",
      bio: "Mr. Saunders was enthusiastic about our proposed lesson plans to teach the students at Carpenter's from the get go. We would like to thank him for his unwavering confidence in our teaching skills, as well as freeing the day for his pupils and hosting us."
    },
    
    {
      name: "Ms Ghosh Bose (CLSG lab tech) - CLSG",
      bio: "We would like to thank Ms Ghosh Bose for always being ready to fulfill any request we would have for equipment, whether it would be for a small scale practical or for a large trip involving lugging multiple trays of breakable glassware across London. She was incredibly accommodating and we are grateful for her help."
    },
    {
      name: "Ms Bouchelkia (CLSG lab tech) - CLSG",
      bio: "We would like to thank Ms Bouchelkia for her willingness to help from the moment she joined the school. She has been our point of contact for orders, and her enthusiasm and dedication to our team has been invaluable."
    },
    {
      name: "2024 iGEM Team (CoL)",
      bio: "Numerous members of the previous year’s team came to our big meetings from September and throughout the iGEM process. They provided invaluable feedback for our initial ideas, and advice on everything from outreach to how to manage such a large team to the most efficient methods to design parts. We would especially like to thank past leaders Ewan, Reya, and Lili, and Angus on the biology team for their support."
    }
  ];

  const allMembers = [
    ...teamLeaders,
    ...biologyMembers,
    ...hardwareMembers,
    ...humanPracticesMembers,
  ];

  const openMemberData =
    allMembers.find((member) => member.name === openBio) ?? null;

  const overlayTitleId = openBio ? "member-bio-dialog-title" : undefined;

  return (
    <main className="members-wrapper">
      {openMemberData && (
        <>
          <div
            className="members-overlay"
            aria-hidden="true"
            onClick={() => setOpenBio(null)}
          />
          <div
            className="members-overlay-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={overlayTitleId}
            onClick={() => setOpenBio(null)}
          >
            <button
              type="button"
              className="members-overlay-close"
              onClick={(event) => {
                event.stopPropagation();
                setOpenBio(null);
              }}
              aria-label="Close bio"
            >
              ×
            </button>

            <div className="members-overlay-body">
              {openMemberData.bio
                .split("\n")
                .map((segment: string, index: number) => {
                  const text = segment.trim();
                  if (!text) {
                    return null;
                  }
                  return <p key={index}>{text}</p>;
                })}
            </div>

            <span className="members-overlay-hint">
              Click anywhere or press Esc to close
            </span>
          </div>
        </>
      )}
      <div className="members-banner-wrapper">
        <img
          src="https://static.igem.wiki/teams/5602/headerimages/20250916-160635000-ios.webp"
          alt="Team Banner"
          className="members-banner-image"
        />
      </div>

    
      {renderSection("Team Leaders", teamLeaders)}
      {renderSection("Biology", biologyMembers)}
      {renderSection("Hardware", hardwareMembers)}
      {renderSection("Human Practices", humanPracticesMembers)}

      
      <section className="section-block">
        <h2 className="section-header">Other Contributors & Supporters</h2>
        <div className="other-contributors">
          {otherContributors.map((member) => (
            <div key={member.name} className="other-contributor">
              <h3>{member.name}</h3>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
