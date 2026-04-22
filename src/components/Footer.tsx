import { stringToSlug } from "../utils";

export function Footer() {
  const teamYear = import.meta.env.VITE_TEAM_YEAR || "2025";
  const teamName = import.meta.env.VITE_TEAM_NAME || "Team Name";
  const teamSlug = stringToSlug(teamName);

  return (
    <footer className="footer-simple">
      <div className="footer-container">
        <p className="footer-thanks">
          We'd like to thank our sponsor: <br />
           <strong>Michael Hennigan</strong>
        </p>

        <p className="footer-source">
          Source code:{" "}
          <a
            href={`https://gitlab.igem.org/${teamYear}/${teamSlug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            gitlab.igem.org/{teamYear}/{teamSlug}
          </a>
        </p>

        <p className="footer-socials">
  <a 
    href="https://www.instagram.com/igem_col/?hl=en" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:underline"
  >
    Instagram
  </a>
  &nbsp;&nbsp;
  <a 
    href="https://www.tiktok.com/@cityigem" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:underline"
  >
    TikTok
  </a>
</p>


        <p className="footer-license">
          © {teamYear} - Content on this site is licensed under a{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons Attribution 4.0 International license
          </a>.
        </p>
      </div>
    </footer>
  );
}
