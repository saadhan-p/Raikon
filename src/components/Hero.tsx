"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Hero.module.css";

const capabilities = ["Hyper-Optimized Architecture", "Unbreakable Infrastructure", "Pixel-Perfect Engineering"];
const principles = ["Skin in the game", "Relentless innovation", "Engineered for scale", "Beyond the launch"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string>("");
  const [lang, setLang] = useState<"NL" | "EN">("EN");
  const [cursor, setCursor] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false,
  });
  const [raikonAtHeader, setRaikonAtHeader] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY, visible: true });
    if (heroRef.current) {
      heroRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      heroRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor(c => ({ ...c, visible: false }));
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs} : ${mins} : ${secs}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateBrand = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.72), 0), 1);
      // Scale Y start and travel distance with viewport height for mobile
      const isMobile = window.innerWidth < 768;
      const startY = isMobile ? window.innerHeight * 0.22 : 210;
      const travelY = isMobile ? startY - 28 : 185;
      hero.style.setProperty("--brand-scale", String(1 - progress * 0.87));
      hero.style.setProperty("--brand-y", `${startY - progress * travelY}px`);
      hero.style.setProperty("--brand-opacity", "1");
      hero.style.setProperty("--scroll-offset", `${window.scrollY}px`);
      setRaikonAtHeader(progress >= 1);
    };
    updateBrand();
    window.addEventListener("scroll", updateBrand, { passive: true });
    window.addEventListener("resize", updateBrand);
    return () => { window.removeEventListener("scroll", updateBrand); window.removeEventListener("resize", updateBrand); };
  }, []);

  return (
    <section id="hero" className={styles.scrollHero} ref={heroRef}>
      {/* ── Video Background ── */}
      <video
        className={styles.videoBg}
        src="/videos/play_720p.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={styles.videoOverlay} aria-hidden="true" />
      {cursor.visible && !raikonAtHeader && (
        <div
          className={styles.cursorLabel}
          style={{ transform: `translate(${cursor.x + 20}px, ${cursor.y + 20}px)` }}
        >
          <span>[ SCROLL DOWN ]</span>
        </div>
      )}
      <a className={styles.introMark} href="#hero" aria-label="Raikon home">
        raikon
        <span>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.2 2.4L2.8 13.6h7.6l-1.6 8 8.8-11.2h-7.6l1.6-8z" />
          </svg>
        </span>
      </a>
      <div className="container">
        <div className={styles.openingFrame}>
          <div
            className={styles.metaStrip}
            style={{
              opacity: raikonAtHeader ? 0 : 1,
              pointerEvents: raikonAtHeader ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            <div className={styles.metaLeft}>
              <span>5+ PROJECTS</span>
              <span>MYSURU BASED</span>
              <span className={styles.clockSpan}>
                [ <i className={styles.redDot}></i> {time || "20 : 57 : 41"} ]
              </span>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.metaLabel}>FOLLOW US</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM +</a>
              <a href="https://www.linkedin.com/company/raikon-tech" target="_blank" rel="noopener noreferrer">LINKEDIN +</a>
              <button
                className={styles.langToggle}
                onClick={() => setLang(lang === "EN" ? "NL" : "EN")}
                aria-label="Toggle language"
              >
                <span className={lang === "NL" ? styles.langActive : ""}></span>
                <span className={styles.langDot}></span>
                <span className={lang === "EN" ? styles.langActive : ""}>EN</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.openingCopy}>
          <div className={styles.creativeHeadline}>
            <span className={styles.parallaxWord} style={{ '--speed': '0.05' } as React.CSSProperties}>YOUR IDEA</span>
            <span className={styles.parallaxWord} style={{ '--speed': '-0.08' } as React.CSSProperties}>DESERVES</span>
            <span className={styles.parallaxWord} style={{ '--speed': '0.08' } as React.CSSProperties}>BETTER THAN</span>
            <span className={styles.parallaxWord} style={{ '--speed': '-0.04' } as React.CSSProperties}>GENERIC TECH.</span>
          </div>
          <div className={styles.descWrapper}>
            <p>We don&apos;t build websites. We build digital weapons for businesses that refuse to blend in.</p>
          </div>
        </div>

        <div className={styles.differencePanel}>
          <div className={styles.panelHeader}><span>THE RAIKON DIFFERENCE</span><span>01 / UNCOMPROMISING QUALITY</span></div>
          <div className={styles.signalList}>{capabilities.map((capability, index) => <span key={capability}><b>0{index + 1}</b>{capability}<i>✦</i></span>)}</div>
          <div className={styles.panelFooter}>
            <p>Templates are for the uninspired. We forge bespoke digital experiences that captivate and convert.<br /><strong>Refuse to be ordinary.</strong></p>
            <p>Speed isn&apos;t just a feature, it&apos;s a foundation. While competitors buffer, your brand accelerates.</p>
          </div>
          <div className={styles.principleStrip}>{principles.map((principle, index) => <span key={principle}><b>0{index + 1}</b>{principle}</span>)}</div>
        </div>
        <div className={styles.ctaRow}><a href="#contact">LET&apos;S BUILD SOMETHING FEARLESS <b>↗</b></a><a href="#royalty">EXPLORE THE PARTNERSHIP MODEL <b>↓</b></a></div>
      </div>
    </section>
  );
}
