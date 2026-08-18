"use client";

import styles from "./RoyaltyModel.module.css";

export default function RoyaltyModel() {
  const scrollToContact = (modelText: string) => {
    const element = document.getElementById("contact");
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Automatically fill in challenge text area to show user intent
      const challengeEl = document.getElementById("challenge") as HTMLTextAreaElement;
      if (challengeEl) {
        challengeEl.value = `I am interested in exploring the: ${modelText}`;
        challengeEl.focus();
      }
    }
  };

  return (
    <section id="royalty" className={`section ${styles.royaltySection}`}>
      <div className="glow-bg glow-emerald" style={{ bottom: "20%", left: "10%" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge badge-emerald">PARTNERSHIP</span>
          <h2 className="section-title gradient-text-emerald">
            The Partnership Model: <br />We Win When You Win
          </h2>
        </div>

        {/* Model Split: Problem vs Alternative */}
        <div className={styles.modelSplit}>
          <div className={styles.problemCard}>
            <h3>The Problem with Normal Tech Services</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.95rem" }}>
              Here's how most agencies work: <br />
              <strong style={{ color: "var(--text-primary)" }}>You pay $50k → They build your product → They take the money → They leave</strong>
            </p>
            
            <ul className={styles.problemList}>
              <li className={styles.problemItem}>
                <span className={styles.crossIcon}>✗</span>
                <span>They don't care if you succeed or fail.</span>
              </li>
              <li className={styles.problemItem}>
                <span className={styles.crossIcon}>✗</span>
                <span>The more hours they work, the more money they make (the hourly trap).</span>
              </li>
              <li className={styles.problemItem}>
                <span className={styles.crossIcon}>✗</span>
                <span>After you launch, they are already focusing on the next client.</span>
              </li>
              <li className={styles.problemItem}>
                <span className={styles.crossIcon}>✗</span>
                <span>You are just a invoice number to them.</span>
              </li>
            </ul>
          </div>

          <div className={styles.alternativeCard}>
            <h3>Our Alternative: The Collaboration Model</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.95rem" }}>
              We offer two different paths depending on your startup stage and needs:
            </p>

            <div className={styles.optionsGrid}>
              <div className={styles.optionBlock}>
                <div className={styles.optionTitle}>Option 1</div>
                <div className={styles.optionHeader}>TRADITIONAL</div>
                <p className={styles.optionText}>
                  Fixed project-based pricing. You own the code completely. We are available for support after delivery. Best if you just need something built.
                </p>
              </div>

              <div className={styles.optionBlock}>
                <div className={styles.optionTitle}>Option 2</div>
                <div className={styles.optionHeader}>PARTNERSHIP</div>
                <p className={styles.optionText}>
                  Lower upfront cost (40-60% cheaper) + We share in your success with a small cut (5-10%) of sales. We stay invested in your growth long-term.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership breakdown */}
        <div className={styles.breakdownSection}>
          <h3 className={styles.breakdownTitle}>How the Partnership Model Works</h3>
          
          <div className={styles.breakdownGrid}>
            <div className={styles.mathPanel}>
              <h4 className={styles.mathTitle}>The Core Mechanics</h4>
              <div className={styles.mathSteps}>
                <div className={styles.mathStep}>
                  <div className={styles.mathNum}>1</div>
                  <span><strong>Less money upfront:</strong> 40% to 60% cheaper than traditional development rates.</span>
                </div>
                <div className={styles.mathStep}>
                  <div className={styles.mathNum}>2</div>
                  <span><strong>Small success share:</strong> We agree on 5-10% of generated sales revenue.</span>
                </div>
                <div className={styles.mathStep}>
                  <div className={styles.mathNum}>3</div>
                  <span><strong>Shared alignment:</strong> We only make our margins when your business grows.</span>
                </div>
              </div>
            </div>

            <div className={styles.examplePanel}>
              <h4 className={styles.exampleTitle}>A Real Example</h4>
              
              <div className={styles.exampleRates}>
                <div>
                  <div className={styles.rateLabel}>Normal Agency Charges</div>
                  <div className={styles.rateVal} style={{ textDecoration: "line-through", color: "var(--text-muted)" }}>$100,000</div>
                </div>
                <div>
                  <div className={styles.rateLabel}>Our Partnership Price</div>
                  <div className={styles.rateVal} style={{ color: "var(--emerald)" }}>$40,000 + 7% sales</div>
                </div>
              </div>

              <div className={styles.exampleTable}>
                <div className={styles.exampleRow}>
                  <span>You make $1,000,000</span>
                  <span>We get <strong>$70,000</strong></span>
                </div>
                <div className={styles.exampleRow}>
                  <span>You make $2,000,000</span>
                  <span>We get <strong>$140,000 total</strong></span>
                </div>
                <div className={styles.exampleRow}>
                  <span>You make $5,000,000</span>
                  <span>We get <strong>$175,000 total</strong> (payout capped or term: 3-5 years)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real terms grid */}
        <h3 className={styles.breakdownTitle} style={{ marginBottom: "30px" }}>What This Means (In Real Terms)</h3>
        <div className={styles.realTermsGrid}>
          <div className={styles.realTermsCard}>
            <h4>We Stay With You</h4>
            <ul className={styles.realTermsList}>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We don't disappear after launch.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We have real money at stake.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We check in every few months.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We make improvements without extra charging.</span>
              </li>
            </ul>
          </div>

          <div className={styles.realTermsCard}>
            <h4>We Tell You the Truth</h4>
            <ul className={styles.realTermsList}>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>If an idea won't work, we say it.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>If you need to change direction, we'll say it.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We push back on bad ideas because we lose money if they fail.</span>
              </li>
            </ul>
          </div>

          <div className={styles.realTermsCard}>
            <h4>We Help You Stay Ahead</h4>
            <ul className={styles.realTermsList}>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We add new tech if they serve your goals.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We search for new market opportunities.</span>
              </li>
              <li className={styles.realTermsItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>We help you catch up with competitors.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <h3 className={styles.breakdownTitle} style={{ marginBottom: "30px" }}>Which Model is Right for You?</h3>
        <div className={styles.tableContainer}>
          <table className={styles.compTable}>
            <thead>
              <tr>
                <th>What's Different</th>
                <th>Normal Agency</th>
                <th>Us (Partnership)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Upfront Money</td>
                <td>$100,000</td>
                <td>$40,000 - $60,000</td>
              </tr>
              <tr>
                <td>Wallet Impact</td>
                <td>Hurts a lot now</td>
                <td>Less pain now</td>
              </tr>
              <tr>
                <td>Why Do They Care?</td>
                <td>You paid them</td>
                <td>You are making money</td>
              </tr>
              <tr>
                <td>Post-Launch Help</td>
                <td>Costs more money</td>
                <td>Free (we are invested)</td>
              </tr>
              <tr>
                <td>Ideas & Strategy</td>
                <td>You think, they build</td>
                <td>We think together</td>
              </tr>
              <tr>
                <td>Who Takes the Risk?</td>
                <td>Just you</td>
                <td>Both of us</td>
              </tr>
              <tr>
                <td>Long-Term Stay</td>
                <td>No (just the project)</td>
                <td>Yes (while we profit)</td>
              </tr>
              <tr>
                <td>If You Make $5M in Sales</td>
                <td>You keep all $5M</td>
                <td>You keep $4.65M (we get 7%)</td>
              </tr>
              <tr>
                <td>Best For:</td>
                <td>• Quick projects<br />• Small changes<br />• Fast deadlines</td>
                <td>• Long-term growth<br />• Real partnerships<br />• Capital efficiency</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Scenario Comparisons */}
        <h3 className={styles.scenariosTitle}>Real-World Scenarios</h3>
        <div className={styles.scenariosGrid}>
          <div className={styles.scenarioCard}>
            <div className={styles.scenarioHeader}>Scenario 1</div>
            <h4 className={styles.scenarioTitle}>High-Growth Startup</h4>
            <ul className={styles.scenarioList}>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Goal: $100k MRR in 18 months</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Traditional: Pay $100k upfront (heavy hit to runway), they hand off the site, leaving you with tech debt or onboarding friction.</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Partnership: Pay $50k upfront (preserve cash). We scale the product together. When you hit MRR milestones, we capture alignment margins.</span>
              </li>
            </ul>
          </div>

          <div className={styles.scenarioCard}>
            <div className={styles.scenarioHeader}>Scenario 2</div>
            <h4 className={styles.scenarioTitle}>Simple MVP</h4>
            <ul className={styles.scenarioList}>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Goal: Get to product-market fit quick + cheap</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Traditional: Pay $40k for MVP, launch, and take over. No royalty needed. Option to add partnership on Phase 2 if desired.</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Partnership: Usually unnecessary for simple isolated launches. We will honestly tell you if Option 1 serves you better.</span>
              </li>
            </ul>
          </div>

          <div className={styles.scenarioCard}>
            <div className={styles.scenarioHeader}>Scenario 3</div>
            <h4 className={styles.scenarioTitle}>Enterprise Scale</h4>
            <ul className={styles.scenarioList}>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Goal: $10M+ revenue targets</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Traditional: Pay $150k for custom builds. Different agencies for subsequent phases, leading to lost context and code fragmentation.</span>
              </li>
              <li className={styles.scenarioItem}>
                <span className={styles.arrowIcon}>→</span>
                <span>Partnership: Pay $80k + share in upside. First-year growth pays extra margins. Continuity ensures codebase integrity and long-term momentum.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Client Quote */}
        <div className={styles.quoteBlock}>
          <p className={styles.quoteText}>
            "When they had skin in the game, everything changed. They weren't just building features—they were building a business with us."
          </p>
          <div className={styles.quoteAuthor}>— E-Commerce Partner CEO</div>
          <div className={styles.quoteMeta}>Revenue: $0 → $500k in first year</div>
        </div>

        {/* CTA Box */}
        <div className={styles.ctaBox}>
          <h3>Ready to Build Something Great?</h3>
          <p>Let's talk partnership. We'll figure out what model makes sense for you.</p>
          <div className={styles.ctaButtons}>
            <button 
              className="btn btn-emerald" 
              onClick={() => scrollToContact("Royalty / Partnership Model")}
            >
              I Want to Explore the Royalty Model
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => scrollToContact("Traditional Project Pricing")}
            >
              I Prefer Traditional Project-Based Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
