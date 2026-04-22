import { useState } from "react";
import "../assets/css/model.css";

const faqs = [
  {
    question: "What is Cryptosporidiosis?",
    answer: `Cryptosporidiosis (Crypto) is a disease caused by the parasite *Cryptosporidium*. This microscopic parasite infects people through contaminated water or unclean surfaces. Symptoms include diarrhoea, nausea, and abdominal pain. 

Most healthy adults can fight off infection relatively easily, but young children, the elderly, and the immunocompromised are at severe risk. Rapid, large-scale diagnostics are essential to prevent outbreaks and ensure proper medical care.`,
  },
  {
    question: "What is LAMP?",
    answer: `Loop-Mediated Isothermal Amplification (LAMP) is a nucleic acid amplification method similar to PCR, but with several advantages. It operates constantly at around 65°C, removing the need for thermocyclers and electricity.

LAMP uses six primers that can be customised to a specific sequence, making it highly specific and sensitive. Additionally, it tolerates PCR inhibitors commonly found in stool samples, allowing reliable detection of *Cryptosporidium* oocysts.`,
  },
  {
    question: "What is 18S rRNA?",
    answer: `18S ribosomal RNA is genetic material found in the ribosomes of *Cryptosporidium* oocysts. It exists in thousands of copies and is highly conserved across parasitic species, making it an ideal target for a specific LAMP reaction to diagnose all crypto strains.`,
  },
  {
    question: "What do you need for LAMP to work?",
    answer: `To perform LAMP, you need:
- A strand-displacing DNA polymerase (e.g., Bst DNA polymerase)
- A unique set of 4–6 primers
- Nucleotides
- A reaction buffer
- A consistent isothermal heat source`,
  },
  {
    question: "What are the different stages of LAMP?",
    answer: `1. **Primer Annealing** – Specific primers anneal to the target DNA sequence.  
2. **Polymerase Activity** – The strand-displacing DNA polymerase begins synthesis, extending from annealed primers.  
3. **Amplification and Looping** – Primer design and strand displacement form looped DNA structures and repeated sequences.  
4. **Exponential Amplification** – Loops provide multiple initiation points for polymerase activity, enabling rapid amplification.`,
  },
  {
    question: "What are the advantages of LAMP?",
    answer: `**Simplicity and Portability:** LAMP’s isothermal nature allows reactions using basic tools like a water bath — ideal for field use.  
**Minimal Sample Prep:** LAMP tolerates natural inhibitors, requiring less preparation than PCR.  
**Visual Detection:** Positive results can be detected visually by eye, ideal for point-of-care testing.`,
  },
  {
    question: "How is LAMP different from PCR?",
    answer: `**Reaction Temperature:** PCR cycles between ~90°C, 55°C, and 75°C; LAMP runs at a constant 65°C.  
**Generated Product:** PCR produces uniform single-length amplicons, while LAMP forms long concatemers via a “dumbbell” DNA structure.  
**Duration:** PCR typically takes 1.5 hours or more, whereas LAMP completes within 30–40 minutes.`,
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="model-page">
      <div className="project-context-wrapper">
        <h1 className="project-context-title">LAMP Diagnostic FAQ</h1>

        {faqs.map((faq, index) => (
          <div className="model-subsection" key={index}>
            <button
              className="model-subsection-button"
              onClick={() => toggle(index)}
            >
              {faq.question}
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            <div
              className={`model-subsection-content ${
                openIndex === index ? "open" : ""
              }`}
              style={{
                maxHeight: openIndex === index ? "800px" : "0",
              }}
            >
              <p className="project-description">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
