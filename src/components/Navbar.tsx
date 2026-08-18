"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#" className={styles.logo} onClick={(e) => handleLinkClick(e, "hero")}>
          RAIKON<span className={styles.logoDot}></span>
        </a>

        <button 
          className={styles.menuBtn} 
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          )}
        </button>

        <nav className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksActive : ""}`}>
          <li>
            <a href="#services" className={styles.navLink} onClick={(e) => handleLinkClick(e, "services")}>
              Services
            </a>
          </li>
          <li>
            <a href="#collaboration" className={styles.navLink} onClick={(e) => handleLinkClick(e, "collaboration")}>
              Collaboration
            </a>
          </li>
          <li>
            <a href="#process" className={styles.navLink} onClick={(e) => handleLinkClick(e, "process")}>
              How We Work
            </a>
          </li>
          <li>
            <a href="#why-us" className={styles.navLink} onClick={(e) => handleLinkClick(e, "why-us")}>
              Why Choose Us
            </a>
          </li>
          <li>
            <a href="#royalty" className={styles.navLink} onClick={(e) => handleLinkClick(e, "royalty")}>
              Partnership Model
            </a>
          </li>
          <li>
            <a href="#cases" className={styles.navLink} onClick={(e) => handleLinkClick(e, "cases")}>
              Case Studies
            </a>
          </li>
          <li>
            <a href="#faq" className={styles.navLink} onClick={(e) => handleLinkClick(e, "faq")}>
              FAQ
            </a>
          </li>
          <li>
            <a href="#contact" className="btn btn-primary" style={{ padding: "8px 20px", fontSize: "0.9rem" }} onClick={(e) => handleLinkClick(e, "contact")}>
              Let's Build
            </a>
          </li>
        </nav>
      </div>
    </header>
  );
}
