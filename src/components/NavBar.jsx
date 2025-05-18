"use client";
import React from "react";
import { navLinks } from "@/constants";

function NavBar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleSroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(true);
    };

    window.addEventListener("scroll", handleSroll);

    return () => window.removeEventListener("scroll", handleSroll);
  }, []);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a className="logo" href="#hero">
          K1W1
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#contact" className="contact-btn group">
          <div className="inner">
            <span>Contact me </span>
          </div>
        </a>
      </div>
    </header>
  );
}

export default NavBar;
