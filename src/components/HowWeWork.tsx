"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./HowWeWork.module.css";

// Load the Canvas component only on client (no SSR) to avoid hydration issues
const MagneticField = dynamic(() => import("./MagneticField"), { ssr: false });

const steps = [
  {
    number: "01",
    timeframe: "Week 1",
    title: "Get to Know You",
    description:
      "We ask lots of questions. What's broken? What works? What keeps you up at night? We listen and learn. We don't assume.",
    deliverable: "Full report of learnings + Ideas for fixing it",
  },
  {
    number: "02",
    timeframe: "Weeks 2–3",
    title: "Make a Plan",
    description:
      "We design the solution. We explain every choice. No secrets. You know exactly what we're building and why.",
    deliverable: "Clear roadmap + Timeline + Cost breakdown",
  },
  {
    number: "03",
    timeframe: "Weeks 4+",
    title: "Build It",
    description:
      "We build it well, not just fast. Daily talks. You see progress. You give feedback early. No surprises.",
    deliverable: "Software that works, not empty promises",
  },
  {
    number: "04",
    timeframe: "Launch & Beyond",
    title: "Launch & Stay",
    description:
      "We celebrate together. But we don't disappear. We stick around, explain everything, and stay 24/7.",
    deliverable: "A system you understand + Full long-term support",
  },
];

export default function HowWeWork() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className={styles.wrapper}>
      <div className={styles.splitContainer}>

        {/* ─── Left Side (Sticky) ─── */}
        <div className={styles.leftSide}>

          {/* Full-panel canvas animation */}
          <div className={styles.canvasWrap}>
            <MagneticField />
          </div>

          {/* Text sits above the canvas */}
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>Our Process</span>
            <h2 className={styles.title}>
              No Fluff.<br />
              <span className={styles.titleLight}>Just Results.</span>
            </h2>

          </div>

        </div>

        {/* ─── Right Side (Scrolling Cards) ─── */}
        <div className={styles.rightSide}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={styles.card}
              ref={el => { cardRefs.current[i] = el; }}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardNumber}>{step.number}</span>
                <span className={styles.cardTime}>{step.timeframe}</span>
              </div>
              <div className={styles.cardDivider} />
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.description}</p>
              <div className={styles.deliverPill}>
                <div className={styles.deliverDot} />
                <div className={styles.deliverContent}>
                  <span className={styles.deliverLabel}>You Get</span>
                  <span className={styles.deliverText}>{step.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
