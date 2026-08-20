"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) {
      alert("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.wrapper}>
      <div className={styles.splitContainer}>

        {/* ─── Left Side: Typography ─── */}
        <div className={styles.leftSide}>
          <div>
            <span className={styles.eyebrow}>Start a Project</span>
            <h2 className={styles.title}>
              Let's<br />
              <span className={styles.titleLight}>Build It.</span>
            </h2>
          </div>


        </div>

        {/* ─── Right Side: Brutalist Form ─── */}
        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            {isSubmitted ? (
              <div className={styles.successBox}>
                <h3 className={styles.successTitle}>Received.</h3>
                <p className={styles.successText}>
                  Thanks, {formData.name}. We've got your message.
                  A real human will review it and get back to you within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", project: "" });
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>01. What's your name?</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Chhota Bheem"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>02. Where can we reach you?</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="chhota@company.com"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="project" className={styles.formLabel}>03. What are we building?</label>
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    placeholder="Tell us about your challenge..."
                    className={styles.textAreaField}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit Request"}
                  <span className={styles.submitArrow}>→</span>
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
