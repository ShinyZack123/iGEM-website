import { Inspirations, InspirationLink } from "../components/Inspirations";

export function Results() {
  const links: InspirationLink[] = [
    { year: 2024, teamName: "Heidelberg", pageName: "results" },
    { year: 2024, teamName: "Marburg", pageName: "results" },
    { year: 2024, teamName: "EPFL", pageName: "results" },
    { year: 2024, teamName: "UToronto", pageName: "results" },
    { year: 2024, teamName: "Marburg", pageName: "results" },
    { year: 2024, teamName: "Sydney-Australia", pageName: "results" },
    { year: 2024, teamName: "Toulouse-INSA-UPS", pageName: "results" },
    { year: 2024, teamName: "BNDS-China", pageName: "results" },
    { year: 2024, teamName: "Vilnius-Lithuania", pageName: "results" },
    { year: 2024, teamName: "XMU-China", pageName: "results" },
    { year: 2023, teamName: "Estonia-TUIT", pageName: "results" },
  ];

  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-8">
          <h2>What Should this Page Contain?</h2>
          <hr />
          <ul>
            <li>
              Clearly and objectively describe the results of your experiments
              and research.
            </li>
            <li>Use tables, graphs, and images to visualize your data.</li>
            <li>
              Discuss the implications of your findings in the context of your
              project goals.
            </li>
            <li>
              Highlight any trends, patterns, or significant observations.
            </li>
            <li>
              Include an analysis summary section to synthesize your findings
              and discuss their overall significance.
            </li>
            <li>
              Outline your future plans for the project, including potential
              applications, further research, and development.
            </li>
            <li>
              Explain what went wrong and what you learned from these
              experiences.
            </li>
            <li>Discuss potential improvements or alternative approaches.</li>
            <li>
              Emphasize the importance of scientific honesty and transparency.
            </li>
          </ul>
        </div>
        <Inspirations inspirationLinkList={links} />
      </div>
    </>
  );
}
