"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./WhyChooseUs.module.css";

const reasons = [
  {
    tag: "Proven",
    title: "Experience Counts",
    desc: "Our team has built solutions for everyone from scrappy startups to Fortune 500 companies. We know what works. We know what fails. We've made every mistake so you don't have to.",
  },
  {
    tag: "Focused",
    title: "We Respect The Brief",
    desc: "We start with the business problem, then choose the clearest path forward. No bloated scope. No theatre. Just thoughtful work that earns its place.",
  },
  {
    tag: "Open",
    title: "Transparency Is Oxygen",
    desc: "No surprise invoices. No secret meetings. No vendor lock-in clauses hiding in the fine print. Your code is yours. Your data is yours. We'll help you leave if you want to. (You won't.)",
  },
  {
    tag: "Fast",
    title: "Speed Without Sacrifice",
    desc: "Fast doesn't mean sloppy. We move quick because we know what we're doing. Tested. Documented. Production-ready. Delivered when we said we would.",
  },
  {
    tag: "Precise",
    title: "The Right Tool for You",
    desc: "We pick the right tool for your problem, not the trendy tool we learned last month. React? Django? Node? AWS? GCP? We know them all. We'll pick what serves you best.",
  },
];

const marqueeItems = [
  "Experience", "Transparency", "Speed", "Trust", "Results",
  "Honesty", "Craft", "Care", "Excellence", "Clarity",
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    checkTouch();
    window.matchMedia('(hover: none)').addEventListener('change', checkTouch);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRowClick = useCallback((i: number) => {
    // On touch devices, clicking toggles open/close
    setActiveIndex((prev) => (prev === i ? null : i));
  }, []);

  const handleMouseEnter = useCallback((i: number) => {
    if (!isTouchDevice) setActiveIndex(i);
  }, [isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) setActiveIndex(null);
  }, [isTouchDevice]);

  return (
    <section id="why-us" className={styles.wrapper}>

      {/* ── Header ── */}
      <div className={styles.header} ref={headerRef}>
        <div>
          <span className={styles.eyebrow}>Why Choose Us</span>
          <h2 className={styles.headerTitle}>
            Not Like<br />
            <span className={styles.headerTitleLight}>The Others.</span>
          </h2>
        </div>
        <p className={styles.headerSub}>
          Five reasons why teams who've tried the rest choose us to build what matters most.
        </p>
      </div>

      {/* ── Accordion List ── */}
      <div className={styles.accordionList}>
        {reasons.map((r, i) => {
          const isOpen = activeIndex === i;
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              className={`${styles.accordionRow} ${isOpen ? styles.accordionOpen : ""}`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleRowClick(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRowClick(i); }}
            >
              <div className={styles.accordionTop}>
                <span className={styles.accIndex}>{String(i + 1).padStart(2, "0")}</span>

                <div className={styles.accMain}>
                  <span className={styles.accTag}>{r.tag}</span>
                  <h3 className={styles.accTitle}>{r.title}</h3>
                </div>

                {/* Animated arrow/plus indicator */}
                <div className={`${styles.accIndicator} ${isOpen ? styles.accIndicatorOpen : ""}`}>
                  <span />
                  <span />
                </div>
              </div>

              {/* Expandable description */}
              <div className={styles.accordionBody}>
                <div className={styles.accordionBodyInner}>
                  <p className={styles.accDesc}>{r.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Marquee ── */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item}</span>
          ))}
        </div>
      </div>

      {/* ── Closing Strip ── */}
      <div className={styles.closing}>
        <p className={styles.closingText}>
          Ready to work with a team that <span className={styles.closingAccent}>actually delivers?</span>
        </p>
        <a href="#contact" className={styles.closingCta}>
          Let's Talk <span className={styles.ctaArrow}>→</span>
        </a>
      </div>

    </section>
  );
}
