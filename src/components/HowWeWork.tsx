"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./HowWeWork.module.css";

const MagneticField = dynamic(() => import("./MagneticField"), { ssr: false });

const steps = [
  {
    number: "01",
    tag: "Week 1",
    title: "Get to Know You",
    description: "We ask lots of questions. What's broken? What works? What keeps you up at night? We listen and learn. We don't assume.",
    deliverable: "Full report of learnings + Ideas for fixing it",
  },
  {
    number: "02",
    tag: "Weeks 2–3",
    title: "Make a Plan",
    description: "We design the solution. We explain every choice. No secrets. You know exactly what we're building and why.",
    deliverable: "Clear roadmap + Timeline + Cost breakdown",
  },
  {
    number: "03",
    tag: "Weeks 4+",
    title: "Build It",
    description: "We build it well, not just fast. Daily talks. You see progress. You give feedback early. No surprises.",
    deliverable: "Software that works, not empty promises",
  },
  {
    number: "04",
    tag: "Launch & Beyond",
    title: "Launch & Stay",
    description: "We celebrate together. But we don't disappear. We stick around, explain everything, and stay 24/7.",
    deliverable: "A system you understand + Full long-term support",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const total = Math.min(scrolled / scrollable, 1);
      const index = Math.min(Math.floor(total * steps.length), steps.length - 1);
      setActiveIndex(index);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 50);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step = steps[activeIndex];

  return (
    <section id="process" ref={sectionRef} className={styles.wrapper}>
      <div className={styles.sticky}>

        {/* Canvas particles */}
        <div className={styles.canvasBg}><MagneticField /></div>

        {/* Left panel */}
        <div className={styles.leftPanel}>
          <p className={styles.eyebrow}>Our Process</p>
          <h2 className={styles.headline}>
            No Fluff.<br />
            <span className={styles.headlineMuted}>Just Results.</span>
          </h2>

          <div className={styles.dotRow}>
            {steps.map((s, i) => (
              <div
                key={s.number}
                className={`${styles.dotItem} ${i === activeIndex ? styles.dotActive : i < activeIndex ? styles.dotDone : ""}`}
              >
                <div className={styles.dotCircle}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800 }}>{s.number}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — inline styles guarantee no global overrides */}
        <div className={styles.rightPanel}>
          <div style={{ position: "relative", width: "100%", maxWidth: 560 }}>

            {/* Ghost large number watermark */}
            <div style={{
              position: "absolute",
              top: -40,
              left: -10,
              fontSize: "clamp(10rem, 18vw, 18rem)",
              fontWeight: 900,
              letterSpacing: "-0.07em",
              lineHeight: 1,
              color: "rgba(255,255,255,0.04)",
              userSelect: "none",
              pointerEvents: "none",
              transition: "color 0.8s ease",
              zIndex: 0,
            }}>
              {step.number}
            </div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 1 }}>

              {/* Tag */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#e8502a",
                marginBottom: "1.5rem",
              }}>
                <span style={{ display: "inline-block", width: 28, height: 2, background: "#e8502a", borderRadius: 1 }} />
                {step.tag}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: "clamp(3rem, 5.5vw, 6rem)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                color: "#ffffff",
                margin: "0 0 2rem",
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.65,
                margin: "0 0 2.5rem",
                maxWidth: 480,
              }}>
                {step.description}
              </p>

              {/* Deliverable */}
              <div style={{
                display: "inline-flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1.25rem 1.5rem",
                border: "1px solid rgba(232,80,42,0.2)",
                borderRadius: 14,
                background: "rgba(232,80,42,0.04)",
              }}>
                <span style={{ color: "#e8502a", fontSize: "1rem", marginTop: 2 }}>↗</span>
                <div>
                  <div style={{
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    marginBottom: "0.3rem",
                  }}>You Get</div>
                  <div style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.4,
                  }}>
                    {step.deliverable}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom progress */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}
