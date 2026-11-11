import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import { SITE, locationLabel } from "@/constants/site";
import Container from "./layout/Container";
import ProtectedEmail from "./ProtectedEmail";

const PAGES = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

function Footer() {
  const socials = [
    { label: "GitHub", href: SITE.github, icon: FaGithub },
    { label: "LinkedIn", href: SITE.linkedin, icon: FaLinkedin },
  ].filter((s) => s.href);

  return (
    <footer className="mt-10 border-t border-black-50 text-white-50">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="text-xl font-semibold text-white">
              {SITE.brand}
            </Link>
            <p className="mt-3 max-w-xs text-sm">Freelance software developer building websites, web apps and mobile apps.</p>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <FiMapPin aria-hidden="true" />
              {locationLabel}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="mb-3 text-sm font-semibold text-white">Pages</p>
            <ul className="flex flex-col gap-2 text-sm">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
              {SITE.pt2cUrl && (
                <li>
                  <a href={SITE.pt2cUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                    PT2C <FiExternalLink aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Get in touch</p>
            <ProtectedEmail className="flex items-center gap-2 text-sm hover:text-white">
              <FiMail aria-hidden="true" />
            </ProtectedEmail>
            <div className="mt-4 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.brand} on ${label}`}
                  className="flex size-10 items-center justify-center rounded-lg border border-black-50 bg-black-100 hover:bg-black-50 transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-black-50 pt-6 text-xs">
          © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
