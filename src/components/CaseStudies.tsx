"use client";

import { useState } from "react";
import styles from "./CaseStudies.module.css";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  id: string;
  tabLabel: string;
  industry: string;
  challenge: string;
  metrics: Metric[];
  quote: string;
  author: string;
}

const casesData: CaseStudy[] = [
  {
    id: "ecommerce",
    tabLabel: "E-Commerce Startup",
    industry: "E-Commerce",
    challenge: "We were growing, but our website couldn't keep up. Load times were killing conversions. Our tech was held together with duct tape.",
    metrics: [
      { value: "1.1s", label: "Load Time (was 6.2s, 78% improvement)" },
      { value: "+34%", label: "Conversion Rate increase" },
      { value: "-40%", label: "Infrastructure Cost decrease" },
      { value: "8 min", label: "Automated deployment time" }
    ],
    quote: "They didn't just fix our website. They taught us to think differently about technology.",
    author: "CEO, E-Commerce Platform"
  },
  {
    id: "finance",
    tabLabel: "Financial Services",
    industry: "Fintech",
    challenge: "We needed enterprise-grade security, but couldn't wait 6 months for delivery. We needed it to work with our legacy systems. We needed someone who understood finance.",
    metrics: [
      { value: "Exceeds", label: "Industry Security Standards" },
      { value: "100%", label: "Compliance Pass (zero findings)" },
      { value: "6 Weeks", label: "Integration time (was 6 months)" },
      { value: "High", label: "Team Morale Improvement" }
    ],
    quote: "They get it. They're not just developers—they're partners.",
    author: "CTO, Fintech Solutions"
  },
  {
    id: "saas",
    tabLabel: "SaaS Scaling",
    industry: "SaaS / Cloud",
    challenge: "Our backend database was bottlenecking under peak hours. Page response times were peaking at 5 seconds, causing heavy user drop-off. We needed database tuning and cloud optimization.",
    metrics: [
      { value: "-85%", label: "Database query latency" },
      { value: "10x", label: "Peak user capacity scale" },
      { value: "-50%", label: "Server bills (GCP auto-scale)" },
      { value: "99.99%", label: "API system uptime" }
    ],
    quote: "They rewrote our core database adapters in a weekend and saved our product launch.",
    author: "COO, SaaS Analytics"
  },
  {
    id: "logistics",
    tabLabel: "AI Logistics",
    industry: "AI / Operations",
    challenge: "We had complex routing algorithms that took 12 minutes to calculate in Python. We needed to port this to high-performance C++ and build a modern React control panel.",
    metrics: [
      { value: "4.5s", label: "Calculations (was 12m, 99% faster)" },
      { value: "Instant", label: "Panel response time" },
      { value: "-15%", label: "Customer delivery times" },
      { value: "+42%", label: "Driver satisfaction survey" }
    ],
    quote: "The speed increase allowed us to do real-time routing. Game changer.",
    author: "Head of Operations, LogiRoute"
  }
];

export default function CaseStudies() {
  const [activeCaseId, setActiveCaseId] = useState("ecommerce");
  const activeCase = casesData.find((c) => c.id === activeCaseId) || casesData[0];

  return (
    <section id="cases" className={`section ${styles.casesSection}`}>
      <div className="glow-bg glow-primary" style={{ bottom: "5%", left: "5%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">CASE STUDIES</span>
          <h2 className="section-title gradient-text">
            Results That Speak Louder <br />Than Marketing Copy
          </h2>
        </div>

        {/* Case Switcher Tabs */}
        <ul className={styles.caseNav}>
          {casesData.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setActiveCaseId(c.id)}
                className={`${styles.caseBtn} ${activeCaseId === c.id ? styles.caseBtnActive : ""}`}
              >
                {c.tabLabel}
              </button>
            </li>
          ))}
        </ul>

        {/* Active Case Details */}
        <div className={styles.caseContent}>
          <div className={styles.caseGrid}>
            <div className={styles.challengeCol}>
              <h3><span>⚠️</span> THE CHALLENGE</h3>
              <p className={styles.challengeText}>"{activeCase.challenge}"</p>
              
              <div className={styles.quoteBlock}>
                <p className={styles.quoteText}>"{activeCase.quote}"</p>
                <div className={styles.quoteAuthor}>— {activeCase.author}</div>
              </div>
            </div>

            <div className={styles.resultsCol}>
              <h3><span>🏆</span> THE RESULTS</h3>
              
              <div className={styles.metricsGrid}>
                {activeCase.metrics.map((metric, i) => (
                  <div key={i} className={styles.metricCard}>
                    <div className={styles.metricValue}>{metric.value}</div>
                    <div className={styles.metricLabel}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
