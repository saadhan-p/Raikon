"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "Services", id: "services" },
  { label: "Collaboration", id: "collaboration" },
  { label: "How We Work", id: "process" },
  { label: "Why Choose Us", id: "why-us" },
  { label: "Partnership Model", id: "royalty" },
  { label: "Case Studies", id: "cases" },
];

const scrollPhrases = [
  "You made it ",
  "Looking sharp ",
  "Well deserved ",
  "Nicely done ",
  "Keep going ",
  "Quite the look ",
  "Simply elegant ",
  "Good things ahead ",
  "Looking refined ",
  "Onward and upward ",
  "A fine choice ",
  "You’ve got this ",
  "Effortlessly good ",
  "Keep it classy ",
  "Nicely put ",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phrase, setPhrase] = useState(scrollPhrases[0]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      // The hero wordmark finishes moving at window.innerHeight * 0.72
      if (window.scrollY >= window.innerHeight * 0.72) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 450) {
            setPhrase(scrollPhrases[Math.floor(Math.random() * scrollPhrases.length)]);
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating pill header bar */}
      <header className={`${styles.header} ${scrolled ? styles.headerVisible : ""}`}>
        <div className={styles.headerBar}>
          <div className={styles.brandIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#E14E26">
              <path d="M11.2 2.4L2.8 13.6h7.6l-1.6 8 8.8-11.2h-7.6l1.6-8z" />
            </svg>
          </div>
          <span className={styles.centerMeta}>{phrase}</span>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Full screen dropdown menu */}
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.menuOverlayOpen : ""}`}>
        <div className={styles.menuInner}>
          <nav className={styles.navList}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={styles.navItem}
                onClick={(e) => handleLinkClick(e, item.id)}
              >
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className={styles.menuFooter}>
            <a
              href="#contact"
              className={styles.ctaOutline}
              onClick={(e) => handleLinkClick(e, "contact")}
            >
              LET&#39;S BUILD SOMETHING
            </a>
            <div className={styles.ctaRow}>
              <a
                href="#contact"
                className={styles.ctaLight}
                onClick={(e) => handleLinkClick(e, "contact")}
              >
                SCHEDULE A CALL
              </a>
              <a
                href="#royalty"
                className={styles.ctaDark}
                onClick={(e) => handleLinkClick(e, "royalty")}
              >
                START A PROJECT
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
