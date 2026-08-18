"use client";

import { useState } from "react";
import styles from "./Collaboration.module.css";

type TabId = "philosophy" | "brainstorm" | "pipeline";

export default function Collaboration() {
  const [activeTab, setActiveTab] = useState<TabId>("philosophy");

  return (
    <section id="collaboration" className={`section ${styles.collaborationSection}`}>
      <div className="glow-bg glow-purple" style={{ top: "30%", left: "5%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">COLLABORATION</span>
          <h2 className="section-title gradient-text">
            Ideas Over Specs. <br />Collaboration Over Commands.
          </h2>
          <p className="section-subtitle">
            You didn't hire an order-taker. You hired a thinking partner. <br />
            Here's what real collaboration looks like in practice.
          </p>
        </div>

        {/* Tab Navigation */}
        <ul className={styles.tabNav}>
          <li>
            <button
              onClick={() => setActiveTab("philosophy")}
              className={`${styles.tabBtn} ${activeTab === "philosophy" ? styles.tabBtnActive : ""}`}
            >
              Our Philosophy
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("brainstorm")}
              className={`${styles.tabBtn} ${activeTab === "brainstorm" ? styles.tabBtnActive : ""}`}
            >
              How We Brainstorm
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`${styles.tabBtn} ${activeTab === "pipeline" ? styles.tabBtnActive : ""}`}
            >
              The Pipeline
            </button>
          </li>
        </ul>

        {/* Tab Contents */}
        <div className={styles.tabContent}>
          {activeTab === "philosophy" && (
            <div className={styles.philosophyGrid}>
              <div className={styles.textBlock}>
                <h3>We Don't Just Build For You. We Build WITH You.</h3>
                <p>
                  Tired of vendors who take your money and disappear? We're different. 
                  We collaborate like partners because that's what we are. Your wins are our wins. 
                  Your innovation fuels our innovation. We grow together, or we don't grow at all.
                </p>
                <p>
                  Most agencies show up, take the spec, and build it. We show up, listen to 
                  your vision, then ask the hard questions: "What if we did this differently?", 
                  "Have you considered this angle?", "What if we combined your idea with this emerging technology?".
                </p>
                <p>
                  We bring our experience, you bring your business knowledge. Together, we create 
                  something neither of us would have alone.
                </p>
              </div>

              <div className={styles.benefitsList}>
                <div className={styles.benefitCard}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div>
                    <h4 className={styles.benefitTitle}>Better Ideas</h4>
                    <p className={styles.benefitText}>They come from combining your knowledge with our technical creativity. We challenge assumptions.</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div>
                    <h4 className={styles.benefitTitle}>Faster Execution</h4>
                    <p className={styles.benefitText}>No rework because we validate before building. No surprises because we communicate constantly.</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div>
                    <h4 className={styles.benefitTitle}>Lower Risk</h4>
                    <p className={styles.benefitText}>Test ideas cheaply before making big investments. Pivot quickly when data says you should.</p>
                  </div>
                </div>

                <div className={styles.benefitCard}>
                  <span className={styles.benefitIcon}>✓</span>
                  <div>
                    <h4 className={styles.benefitTitle}>Real Accountability</h4>
                    <p className={styles.benefitText}>We're not just contractors hitting deliverables. We're partners held accountable to growth metrics.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brainstorm" && (
            <div className={styles.brainstormGrid}>
              <div className={styles.brainstormCard}>
                <h3><span>💡</span> Weekly Brainstorm Sessions</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                  Every week, we sit down together for 1 hour. Not a boring meeting. Not a problem-fixing session. A real brainstorm where ideas flow.
                </p>
                <ul className={styles.brainstormBulletList}>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>First 10 min:</strong> Talk about sales, customer feedback, what's happening.</span>
                  </li>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>Next 20 min:</strong> Throw out ideas (even crazy ones).</span>
                  </li>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>Next 20 min:</strong> Pick the best 3-4 ideas.</span>
                  </li>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>Last 10 min:</strong> Choose one to try.</span>
                  </li>
                </ul>
                <div style={{ marginTop: "20px", padding: "16px", background: "rgba(99, 102, 241, 0.05)", borderRadius: "8px", border: "1px dashed rgba(99, 102, 241, 0.2)" }}>
                  <strong style={{ color: "var(--text-primary)" }}>The Real Magic:</strong> You know your customers. We know tech. Together? We get ideas neither of us would have alone.
                </div>
              </div>

              <div className={styles.brainstormCard}>
                <h3><span>📊</span> Checking the Real Numbers</h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                  We look at actual analytics together: revenue, retention, feature usage, page speed, competitor movements, and emerging opportunities.
                </p>
                <ul className={styles.brainstormBulletList}>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>We Ask:</strong> "Why are customers leaving?", "Only 10% use this—should we kill it or fix it?"</span>
                  </li>
                  <li className={styles.brainstormBullet}>
                    <span className={styles.bulletDot}>→</span>
                    <span><strong>We Tell The Truth:</strong> When something isn't working, we say it. We tell you the hard truth, not pretty lies.</span>
                  </li>
                </ul>

                <h3 style={{ marginTop: "24px" }}><span>🧪</span> Testing Before Building</h3>
                <div className={styles.ideaSplit}>
                  <div className={styles.ideaSplitBlock}>
                    <h4 style={{ color: "#ef4444" }}>Wrong Way (Agencies)</h4>
                    <ul>
                      <li>✗ You have an idea</li>
                      <li>✗ They build it blindly</li>
                      <li>✗ You launch</li>
                      <li>✗ It doesn't work</li>
                    </ul>
                  </div>
                  <div className={styles.ideaSplitBlock}>
                    <h4 style={{ color: "var(--emerald)" }}>Our Way</h4>
                    <ul>
                      <li>✓ You have an idea</li>
                      <li>✓ We make quick prototype</li>
                      <li>✓ Real people test it</li>
                      <li>✓ We build the real thing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pipeline" && (
            <div className={styles.pipelineTimeline}>
              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>Week 1</div>
                <h3 className={styles.pipelineTitle}>Ideation Sprint</h3>
                <ul className={styles.pipelineList}>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Monday: You bring the challenge.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Wednesday: We present 5 potential angles.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Friday: You pick the direction.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>Week 2</div>
                <h3 className={styles.pipelineTitle}>Validation Sprint</h3>
                <ul className={styles.pipelineList}>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Monday: Build clickable prototype.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Wednesday: User testing (real customers).</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Friday: Data review + pivot or proceed decision.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>Week 3+</div>
                <h3 className={styles.pipelineTitle}>Build Sprint</h3>
                <ul className={styles.pipelineList}>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>We build the real version.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Daily standups keep us aligned.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>You see working features, not promises.</span>
                  </li>
                </ul>
              </div>

              <div className={styles.pipelineCard}>
                <div className={styles.pipelineHeader}>Ongoing</div>
                <h3 className={styles.pipelineTitle}>Optimization</h3>
                <ul className={styles.pipelineList}>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Launch metrics show what's working.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>We iterate based on real behavior.</span>
                  </li>
                  <li className={styles.pipelineItem}>
                    <span>•</span>
                    <span>Ideas get tested against data, not ego.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
