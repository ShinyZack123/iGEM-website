import {
  Attributions,
  Description,
  Home,
  HumanPractices,
  Notebook,
  SafetyAndSecurity,
  Members,
  Education,
  Design,
  Model,
  Parts,
  HardwareTimeline,
  HardwareMain,
  FAQs,
  Outreach
} from "./contents";

interface Base {
  name: string | undefined;
}

class Folder implements Base {
  name: string | undefined;
  folder: Page[] | undefined;
}

class Page implements Base {
  name: string | undefined;
  title: string | undefined;
  path: string | undefined;
  component: React.FC | undefined;
  lead: string | undefined;
  headerImage?: string; 
}

const Pages: (Page | Folder)[] = [
  {
    name: "Home",
    title: "Welcome",
    path: "/",
    component: Home,
    lead: "Welcome to the official wiki page for COL iGEM 2025! Updates to come...",
  },
  {
    name: "Team",
    folder: [
      {
        name: "Members",
        title: "Meet Our Team",
        path: "/team",
        component: Members,
        lead: "This page is dedicated to introducing the individuals who made our iGEM project possible. Here, you'll find information about our team members, instructors, and advisors.",
        headerImage: 'https://static.igem.wiki/teams/5602/design/img-6006.webp'
      },
      {
        name: "Attributions",
        title: "Attributions",
        path: "/attributions",
        component: Attributions,
        lead: "Acknowledging the people, mentors, and organizations who guided and supported our journey.",
      },
    ],
  },
  {
    name: "Project",
    folder: [
      {
        name: "Description",
        title: "Project Description",
        path: "/description",
        component: Description,
        lead: "Bringing our ideas to life: the story and purpose of our project.",
      },
      {
        name: "Contribution",
        title: "Contribution",
        path: "/contribution",
        component: Parts,
        lead: "An overview of the essential biological parts that drive our iGEM project, as well as how we have designed materials to aid future teams.",
      },

      
      {name: "Engineering",
        title: "Engineering",
        path: "/engineering",
        component: Design,
        lead: "On this page, we will delve into the specifics of the LAMP reaction, and the development of our vectors for expression of 18s rRNA and our fusion protein.",
      },
      {name: "FAQs",
        title: "FAQs",
        path: "/faqs",
        component: FAQs,
        lead: "Frequently asked questions that people often have about our project are answered here",
      },
      
      
      
    ],
  },
  {
    name: "Wet Lab",
    folder: [

        
        
      
      {
        name: "Notebook",
        title: "Notebook",
        path: "/notebook",
        component: Notebook,
        lead: "The following is a notebook detailing the protocols and results of our wet-lab, including photographs and data."

      },
      
      {
        name: "Safety and Security",
        title: "Safety and Security",
        path: "/safety-and-security",
        component: SafetyAndSecurity,
        lead: "It is extremely important to consider the safety and security precautions when carrying out a project, displayed here is what we have considered.",
      },
    ],
  },
  {
    name: "Hardware",
    folder: [
      {
        name: "Hardware",
        title: "Hardware",
        path: "/hardwaremain",
        component: HardwareMain,
        lead: "Our hardware development focuses on creating cost-effective, user-friendly solutions for practical testing.",
      },
      {
        name: "Model",
        title: "Model",
        path: "/model",
        component: Model,
        lead: "In our mathematical modeling section, we will cover how we modelled the expression of our new fusion protein in an e.coli bacteria, the peak activity of our reverse transcriptase and the concentration of products in the LAMP reaction using ordinary differential equations similar to those of PCR.", 

      },
      {
        name: "Timeline",
        title: "Timeline",
        path: "/hardwaretimeline",
        component: HardwareTimeline,
        lead: "This timeline showcases how each step of our hardware design improves usability, efficiency, and accessibility.",
      },
      
      
    ],
  },
  {
    name: "Engagement",
    folder: [
      {
     name: "Education",
        title: "Education",
        path: "/education",
        component: Education,
        lead: "Education is at the heart of our mission to spread science beyond the lab.",
      },
    
      {
        name: "Human Practices",
        title: "Human Practices",
        path: "/human-practices",
        component: HumanPractices,
        lead: "Our Human Practices work critically examines how our project may influence society and the world, ensuring that our research is both responsible and impactful.",
      },
     {name: "Outreach",
        title: "Outreach",
        path: "/outreach",
        component: Outreach,
        lead: "Futher tasks we have undertaken in order to expand our outreach and teach the world about our project and synthetic biology as a whole.",
      },
      
    ],
  },

  
  
];

export default Pages;
