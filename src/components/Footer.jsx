import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import { SITE, locationLabel } from "@/constants/site";
import ProtectedEmail from "./ProtectedEmail";

function Footer() {
  const socials = [
    { label: "GitHub", href: SITE.github, icon: FaGithub },
    { label: "LinkedIn", href: SITE.linkedin, icon: FaLinkedin },
  ].filter((s) => s.href);

  return (
    <footer className="footer">
      <div className="footer-container items-center">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <ProtectedEmail className="flex items-center gap-2 hover:text-white">
            <FiMail aria-hidden="true" />
          </ProtectedEmail>
          <p className="flex items-center gap-2 cursor-default">
            <FiMapPin aria-hidden="true" />
            {locationLabel}
          </p>
        </div>

        <div className="socials">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${SITE.brand} on ${label}`}
              className="icon"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2 items-center md:items-end">
          {SITE.pt2cUrl && (
            <a
              href={SITE.pt2cUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              PT2C <FiExternalLink aria-hidden="true" />
            </a>
          )}
          <p className="md:text-end cursor-default">
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
