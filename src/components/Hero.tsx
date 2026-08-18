"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Background visual glows */}
      <div className="glow-bg glow-primary"></div>
      <div className="glow-bg glow-purple" style={{ bottom: "5%" }}></div>

      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badgeContainer}>
            <span className="badge">INTRODUCING RAIKON</span>
          </div>

          <h1 className={`${styles.headline} gradient-text`}>
            Your Idea Deserves Better Than Generic Tech
          </h1>

          <p className={styles.subheadline}>
            We don't build websites. We build digital weapons for businesses that refuse to blend in.
          </p>

          <div className={styles.copyBlock}>
            <p className={styles.copyIntro}>
              Most startups get boring, copy-paste solutions. <br />
              <span className="gradient-text-emerald" style={{ fontSize: "1.4rem", fontWeight: "700" }}>You're not most startups.</span>
            </p>

            <ul className={styles.bullets}>
              <li className={styles.bulletItem}>
                <span className={styles.checkIcon}>✓</span> Super-fast websites
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.checkIcon}>✓</span> Real security that works
              </li>
              <li className={styles.bulletItem}>
                <span className={styles.checkIcon}>✓</span> Code that makes sense
              </li>
            </ul>

            <p className={styles.copyOutro}>
              While other companies are slow, you're making sales.
            </p>

            <h3 className={styles.differentTitle}>What makes us different:</h3>
            <div className={styles.differentGrid}>
              <div className={styles.differentItem}>
                <span className={styles.arrow}>→</span>
                <span className={styles.differentText}>
                  We win when you win (we share your success money)
                </span>
              </div>
              <div className={styles.differentItem}>
                <span className={styles.arrow}>→</span>
                <span className={styles.differentText}>
                  We work like partners, not just hired help
                </span>
              </div>
              <div className={styles.differentItem}>
                <span className={styles.arrow}>→</span>
                <span className={styles.differentText}>
                  We give you ideas, not just build what you ask
                </span>
              </div>
              <div className={styles.differentItem}>
                <span className={styles.arrow}>→</span>
                <span className={styles.differentText}>
                  Your success is our success
                </span>
              </div>
            </div>
          </div>

          <div className={styles.ctaGroup}>
            <button 
              className="btn btn-primary" 
              onClick={() => scrollToSection("contact")}
            >
              Let's Build Something Fearless
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => scrollToSection("royalty")}
            >
              Explore the Growth Partnership Model
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
