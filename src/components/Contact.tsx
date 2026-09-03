"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";

const STEPS = [
  {
    id: "name",
    number: "01",
    question: "What's your name?",
    placeholder: "Chhota Bheem",
    type: "text",
    hint: "First name is fine",
  },
  {
    id: "email",
    number: "02",
    question: "Where can we reach you?",
    placeholder: "chhota@company.com",
    type: "email",
    hint: "We'll never spam you",
  },
  {
    id: "project",
    number: "03",
    question: "What are we building?",
    placeholder: "Tell us about your challenge…",
    type: "textarea",
    hint: "The wilder, the better",
  },
];

const TAGS = ["Web App", "Mobile", "Branding", "AI Product", "E-commerce", "Other"];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const currentStep = STEPS[activeStep];
  const currentValue = formData[currentStep.id as keyof typeof formData];
  const progress = (activeStep / STEPS.length) * 100;

  useEffect(() => {
    const el = inputRef.current;
    if (el) el.focus();
  }, [activeStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [currentStep.id]: e.target.value }));
  };

  const advance = () => {
    if (!currentValue.trim()) return;
    if (activeStep < STEPS.length - 1) {
      setActiveStep((s) => s + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep.type !== "textarea") {
      e.preventDefault();
      advance();
    }
    if (e.key === "Enter" && e.metaKey && currentStep.type === "textarea") {
      e.preventDefault();
      advance();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const reset = () => {
    setFormData({ name: "", email: "", project: "" });
    setActiveStep(0);
    setSelectedTags([]);
    setIsSubmitted(false);
    setIsSubmitting(false);
  };

  const isLastStep = activeStep === STEPS.length - 1;

  return (
    <section id="contact" className={styles.wrapper}>
      <div className={styles.inner}>

        {/* ════ LEFT PANEL ════ */}
        <div className={styles.leftPanel}>
          <div className={styles.leftTop}>
            <span className={styles.eyebrow}>Start a Project</span>
            <h2 className={styles.headline}>
              Let&apos;s<br />
              <em className={styles.headlineEm}>Build</em><br />
              Something<br />
              <span className={styles.headlineLight}>Brilliant.</span>
            </h2>
          </div>

          <div className={styles.leftBottom}>
            <div className={styles.statRow}>
              <span className={styles.statNum}>∞</span>
              <span className={styles.statLabel}>ideas we&apos;re ready for</span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT PANEL — FORM ════ */}
        <div className={styles.rightPanel}>

          {isSubmitted ? (

            /* ── Success ── */
            <div className={styles.successScreen}>
              <span className={styles.successEyebrow}>Transmission received</span>
              <h3 className={styles.successTitle}>
                You&apos;re in,<br />{formData.name.split(" ")[0]}.
              </h3>
              <p className={styles.successText}>
                We&apos;ve got your brief and we&apos;re already thinking about it.
                A real human will ping you at <strong>{formData.email}</strong> within 48 hours.
              </p>
              {selectedTags.length > 0 && (
                <div className={styles.successTags}>
                  {selectedTags.map((t) => (
                    <span key={t} className={styles.successTag}>{t}</span>
                  ))}
                </div>
              )}
              <button className={styles.resetBtn} onClick={reset}>
                Send another brief ↻
              </button>
            </div>

          ) : (

            /* ── Multi-step Form ── */
            <form className={styles.form} onSubmit={handleSubmit} noValidate>

              {/* Progress bar */}
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Step counter dots */}
              <div className={styles.stepCounter}>
                {STEPS.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`${styles.stepDot} ${i === activeStep ? styles.stepDotActive : ""} ${i < activeStep ? styles.stepDotDone : ""}`}
                    onClick={() => i <= activeStep && setActiveStep(i)}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>

              {/* Question area */}
              <div className={styles.questionArea} key={activeStep}>
                <p className={styles.stepNum}>{currentStep.number} / 03</p>
                <label htmlFor={currentStep.id} className={styles.questionLabel}>
                  {currentStep.question}
                </label>

                <div className={`${styles.inputWrap} ${focused ? styles.inputWrapFocused : ""}`}>
                  {currentStep.type === "textarea" ? (
                    <textarea
                      id={currentStep.id}
                      name={currentStep.id}
                      value={currentValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder={currentStep.placeholder}
                      className={styles.textarea}
                      rows={4}
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      required
                    />
                  ) : (
                    <input
                      type={currentStep.type}
                      id={currentStep.id}
                      name={currentStep.id}
                      value={currentValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder={currentStep.placeholder}
                      className={styles.input}
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      required
                    />
                  )}
                  <span className={styles.inputHint}>{currentStep.hint}</span>
                </div>

                {/* Tag selector on last step */}
                {isLastStep && (
                  <div className={styles.tagArea}>
                    <p className={styles.tagLabel}>What type of project?</p>
                    <div className={styles.tags}>
                      {TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ""}`}
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                {activeStep > 0 && (
                  <button
                    type="button"
                    className={styles.backBtn}
                    onClick={() => setActiveStep((s) => s - 1)}
                  >
                    ← Back
                  </button>
                )}

                {isLastStep ? (
                  <button
                    type="submit"
                    className={`${styles.nextBtn} ${styles.submitBtnFinal}`}
                    disabled={!currentValue.trim() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.spinner} />
                    ) : (
                      <>Send Brief <span className={styles.btnArrow}>→</span></>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.nextBtn}
                    onClick={advance}
                    disabled={!currentValue.trim()}
                  >
                    Next <span className={styles.btnArrow}>→</span>
                  </button>
                )}
              </div>

              <p className={styles.hintText}>
                {currentStep.type === "textarea"
                  ? "⌘ + Enter to continue"
                  : "Press Enter ↵ to continue"}
              </p>

            </form>
          )}
        </div>
      </div>
    </section>
  );
}
