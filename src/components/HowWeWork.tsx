"use client";

import styles from "./HowWeWork.module.css";

interface StepItem {
  number: number;
  timeframe: string;
  title: string;
  description: string;
  deliverable: string;
}

const stepsData: StepItem[] = [
  {
    number: 1,
    timeframe: "Week 1",
    title: "GET TO KNOW YOU",
    description: "We ask lots of questions. What's broken? What works? What keeps you up at night? We listen and learn. We don't assume.",
    deliverable: "A full report of what we learned + Ideas for fixing it"
  },
  {
    number: 2,
    timeframe: "Weeks 2 - 3",
    title: "MAKE A PLAN",
    description: "We design the solution. We explain every choice. No secrets. You know exactly what we're building and why.",
    deliverable: "A clear roadmap + Timeline + Cost breakdown"
  },
  {
    number: 3,
    timeframe: "Weeks 4+",
    title: "BUILD IT",
    description: "We build it well, not just fast. Daily talks. You see progress. You give feedback early. No surprises. Weekly demos show real work.",
    deliverable: "Software that works, not empty promises"
  },
  {
    number: 4,
    timeframe: "Launch & Beyond",
    title: "LAUNCH & STAY",
    description: "Launch day: We celebrate together. But we don't disappear. We stick around. We explain how everything works. We help your team. We're there 24/7.",
    deliverable: "A system you understand + Full, long-term support"
  }
];

export default function HowWeWork() {
  return (
    <section id="process" className={`section ${styles.processSection}`}>
      <div className="glow-bg glow-primary" style={{ top: "20%", right: "10%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">OUR PROCESS</span>
          <h2 className="section-title gradient-text">
            No Fluff. No Jargon. <br />Just Results.
          </h2>
          <p className="section-subtitle">
            Most agencies talk a big game. We show you the plan.
          </p>
        </div>

        <div className={styles.timeline}>
          {stepsData.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              
              <div className={styles.cardContent}>
                <div className={styles.stepHeader}>{step.timeframe}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
                
                <div className={styles.deliverables}>
                  <h4 className={styles.deliverablesTitle}>You Get:</h4>
                  <p className={styles.deliverablesText}>{step.deliverable}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
