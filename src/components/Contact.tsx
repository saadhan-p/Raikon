"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    challenge: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.challenge) {
      alert("Please fill in the required fields (Name, Email, Challenge).");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2000);
  };

  return (
    <section id="contact" className={`section ${styles.contactSection}`}>
      <div className="glow-bg glow-primary" style={{ bottom: "-100px", right: "-100px" }}></div>

      <div className="container">
        <div className="section-header">
          <span className="badge">CONTACT</span>
          <h2 className="section-title gradient-text">
            Let's Talk. <br />No Pressure. No Sales Pitch.
          </h2>
        </div>

        <div className={styles.contactGrid}>
          {/* Info Column */}
          <div className={styles.infoCol}>
            <p className={styles.subTitle}>
              Send us a message. Tell us what's keeping you up at night. <br /><br />
              We'll either help you directly, or connect you with someone who can. 
              (Sometimes honesty means saying "this isn't for us.") <br /><br />
              But probably? <strong>We'll blow your expectations out of the water.</strong>
            </p>

            <div className={styles.altCtaGroup}>
              {/* Call Booking */}
              <div className={styles.altCtaBlock}>
                <h4><span>📅</span> Prefer a call? Sure.</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Book a quick 20-minute intro call directly with our engineering team. No sales reps, just tech builders.
                </p>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); alert("Mock Calendar: Slot booking modal would open here!"); }} 
                  className={styles.calendarLink}
                >
                  Book 20-min Intro Call →
                </a>
              </div>

              {/* Newsletter */}
              <div className={styles.altCtaBlock}>
                <h4><span>✉️</span> Just lurking? Cool.</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Subscribe to our newsletter (sent 2x/month): "Tech insights that actually apply to your business."
                </p>
                
                {newsletterSubscribed ? (
                  <p style={{ color: "var(--emerald)", fontSize: "0.9rem", fontWeight: "600", marginTop: "12px" }}>
                    ✓ Subscribed! Welcome to the club.
                  </p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className={styles.newsletterInput}
                      required
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: "10px 16px", fontSize: "0.85rem" }}>
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={styles.formCol}>
            {isSubmitted ? (
              <div className={styles.successBox}>
                <span className={styles.successIcon}>🚀</span>
                <h3 className={styles.successTitle}>We're On It!</h3>
                <p className={styles.successText}>
                  Thanks, {formData.name}. We've received your request about "{formData.project || "your project"}". <br /><br />
                  A real engineer will look over your challenge and reply within a few hours.
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", project: "", challenge: "" });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Your Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name" 
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Your Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com" 
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="project">Company/Project Name</label>
                  <input 
                    type="text" 
                    id="project" 
                    name="project" 
                    value={formData.project}
                    onChange={handleInputChange}
                    placeholder="Acme Corp" 
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="challenge">What's your biggest challenge right now? *</label>
                  <textarea 
                    id="challenge" 
                    name="challenge" 
                    value={formData.challenge}
                    onChange={handleInputChange}
                    placeholder="Tell us what is broken, what your timeline is, or what model you want to explore..." 
                    className={styles.textAreaField}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Challenge..." : "I'm Ready to Fix This"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
