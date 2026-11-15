"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";

function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (link) => pathname === link || pathname.startsWith(`${link}/`);

  return (
    <header className={`navbar ${scrolled || open ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link className="logo" href="/">
          K1W1
        </Link>

        <nav className="desktop" aria-label="Main">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link href={link} aria-current={isActive(link) ? "page" : undefined}>
                  <span className={isActive(link) ? "text-white" : "text-white-50"}>{name}</span>
                  <span className={`underline ${isActive(link) ? "w-full" : ""}`} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="contact-btn group"
            aria-current={isActive("/contact") ? "page" : undefined}
          >
            <div className="inner">
              <span>Contact me</span>
            </div>
          </Link>
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/menu.svg" alt="" className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Main">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <Link
                  href={link}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={isActive(link) ? "text-white" : "text-white-50"}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={isActive("/contact") ? "text-white" : "text-white-50"}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default NavBar;
