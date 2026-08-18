"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string, triggerCallAlert = false) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      if (triggerCallAlert) {
        setTimeout(() => {
          alert("Mock Calendar: Slot booking modal would open here!");
        }, 800);
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Left Column: CTA */}
          <div className={styles.leftCol}>
            <h3 className="gradient-text">
              Most tech companies are a gamble. <br />
              <span className="gradient-text-emerald">We're an investment.</span>
            </h3>
            
            <div className={styles.ctaGroup}>
              <button 
                className="btn btn-primary" 
                onClick={() => scrollToSection("contact")}
              >
                Get Started
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => scrollToSection("contact", true)}
              >
                Schedule a Call
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => scrollToSection("cases")}
              >
                Check Our Case Studies
              </button>
            </div>
          </div>

          {/* Right Column: Brand Voice */}
          <div className={styles.rightCol}>
            <div className={styles.brandVoice}>
              <p style={{ color: "var(--text-primary)", fontWeight: "600", marginBottom: "8px" }}>
                "The tech should serve your business, not the other way around."
              </p>
              <p style={{ marginBottom: "8px" }}>
                And if we're building it together, we both win when it works.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                Still have questions? Send us a challenge in the contact form. A real human (not a bot) will respond within hours.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Footer: Meta Info & Copyright */}
        <div className={styles.subFooter}>
          <div className={styles.copyright}>
            © {currentYear} RAIKON. We fix tech problems. We don't create them.
          </div>
          
          <div className={styles.locationInfo}>
            <div>Based in San Francisco, CA | Serving businesses globally</div>
            <div style={{ color: "var(--text-primary)" }}>Available 24/7 | Response time: Usually under 1 hour</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
