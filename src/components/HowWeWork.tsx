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

        {/* Right panel — CSS classes handle responsive sizing */}
        <div className={styles.rightPanel}>
          <div className={styles.stepContent}>

            {/* Ghost large number watermark */}
            <div className={styles.stepGhost}>
              {step.number}
            </div>

            {/* Content */}
            <div className={styles.stepContentInner}>

              {/* Tag */}
              <div className={styles.stepTag}>
                <span className={styles.stepTagBar} />
                {step.tag}
              </div>

              {/* Title */}
              <h3 className={styles.stepTitle}>
                {step.title}
              </h3>

              {/* Description */}
              <p className={styles.stepDesc}>
                {step.description}
              </p>

              {/* Deliverable */}
              <div className={styles.stepDeliverable}>
                <span className={styles.deliverableIcon}>↗</span>
                <div>
                  <div className={styles.deliverableLabel}>You Get</div>
                  <div className={styles.deliverableValue}>
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
