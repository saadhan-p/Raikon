"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Contact.module.css";

// Character scramble pool for the decoding animation
const SCRAMBLE_CHARS = "!@#$%^&*01ABXZ<>?/|\\▒░█▓";
function scramble(text: string, progress: number): string {
  return text
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i / text.length < progress) return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

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
  const [submitPhase, setSubmitPhase] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [transmissionId, setTransmissionId] = useState("");
  const [focused, setFocused] = useState(false);
  const [scrambleLabel, setScrambleLabel] = useState("TRANSMITTING BRIEF");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const scrambleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentStep = STEPS[activeStep];
  const currentValue = formData[currentStep.id as keyof typeof formData];
  const progress = (activeStep / STEPS.length) * 100;

  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const el = inputRef.current;
    if (el && !isSubmitting && !isSubmitted) {
      el.focus({ preventScroll: true });
    }
  }, [activeStep, isSubmitting, isSubmitted]);

  // Character scramble loop while submitting
  useEffect(() => {
    if (!isSubmitting) {
      if (scrambleRef.current) clearInterval(scrambleRef.current);
      setScrambleLabel("TRANSMITTING BRIEF");
      return;
    }
    const TARGET = "TRANSMITTING BRIEF";
    let prog = 0;
    scrambleRef.current = setInterval(() => {
      prog = Math.min(prog + 0.045, 1);
      setScrambleLabel(scramble(TARGET, prog));
      if (prog >= 1) {
        // Reset and scramble again for a loop effect
        setTimeout(() => { prog = 0; }, 600);
      }
    }, 55);
    return () => { if (scrambleRef.current) clearInterval(scrambleRef.current); };
  }, [isSubmitting]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.project) return;
    
    setIsSubmitting(true);
    setSubmitPhase(1);

    const phaseTimer1 = setTimeout(() => setSubmitPhase(2), 700);
    const phaseTimer2 = setTimeout(() => setSubmitPhase(3), 1400);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          tags: selectedTags,
        }),
      });

      const data = await res.json();
      if (data.transmissionId) {
        setTransmissionId(data.transmissionId);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2200);
    }
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
    setSubmitPhase(1);
    setTransmissionId("");
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

        {/* ════ RIGHT PANEL — FORM & TRANSMISSION ════ */}
        <div className={styles.rightPanel}>

          {isSubmitting ? (

            /* ── Oscilloscope Waveform Submitting Animation ── */
            <div className={styles.transmittingConsole} role="status" aria-live="polite">

              {/* Live SVG oscilloscope waveform */}
              <div className={styles.waveformWrap} aria-hidden="true">
                <svg className={styles.waveformSvg} viewBox="0 0 320 80" preserveAspectRatio="none">
                  {/* Static baseline */}
                  <line x1="0" y1="40" x2="320" y2="40" className={styles.waveBaseline} />
                  {/* Animated sine wave — primary */}
                  <polyline className={styles.waveLine1}
                    points="0,40 10,28 20,40 30,52 40,40 50,22 60,40 70,58 80,40 90,25 100,40 110,55 120,40 130,20 140,40 150,60 160,40 170,26 180,40 190,54 200,40 210,21 220,40 230,59 240,40 250,24 260,40 270,56 280,40 290,23 300,40 310,57 320,40"
                  />
                  {/* Faint echo wave — offset */}
                  <polyline className={styles.waveLine2}
                    points="0,40 16,32 32,40 48,48 64,40 80,28 96,40 112,52 128,40 144,26 160,40 176,54 192,40 208,30 224,40 240,50 256,40 272,27 288,40 304,53 320,40"
                  />
                  {/* Moving scan cursor */}
                  <line x1="0" y1="0" x2="0" y2="80" className={styles.waveScanLine} />
                  {/* Tick marks on baseline */}
                  {[40,80,120,160,200,240,280].map(x => (
                    <line key={x} x1={x} y1="36" x2={x} y2="44" className={styles.waveTick} />
                  ))}
                </svg>

                {/* Channel labels */}
                <div className={styles.waveLabels}>
                  <span className={styles.waveCh}>CH1</span>
                  <span className={styles.waveScramble}>{scrambleLabel}</span>
                  <span className={styles.waveHz}>24.0 kHz</span>
                </div>
              </div>

              <div className={styles.transmitInfo}>
                <div className={styles.telemetryTag}>
                  <span className={styles.telemetryDot} />
                  <span>SIGNAL LOCKED — DISPATCHING</span>
                </div>

                <div className={styles.phaseTracker}>
                  <div className={`${styles.phaseStep} ${submitPhase >= 1 ? styles.phaseStepActive : ""}`}>
                    <span className={styles.phaseNum}>01</span>
                    <span className={styles.phaseLabel}>PACKAGING PROJECT BRIEF</span>
                  </div>
                  <div className={`${styles.phaseStep} ${submitPhase >= 2 ? styles.phaseStepActive : ""}`}>
                    <span className={styles.phaseNum}>02</span>
                    <span className={styles.phaseLabel}>ENCRYPTING TRANSMISSION</span>
                  </div>
                  <div className={`${styles.phaseStep} ${submitPhase >= 3 ? styles.phaseStepActive : ""}`}>
                    <span className={styles.phaseNum}>03</span>
                    <span className={styles.phaseLabel}>DISPATCHING TO STUDIO</span>
                  </div>
                </div>

                <div className={styles.frequencyBar}>
                  <div className={styles.freqTrack} />
                </div>
              </div>
            </div>

          ) : isSubmitted ? (

            /* ── Success Screen with Minimal Engaging Graphic ── */
            <div className={styles.successScreen}>
              <div className={styles.successHeaderRow}>
                {/* Bold slash-mark badge — no circles */}
                <div className={styles.successBadgeGraphic}>
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                    {/* Corner bracket — top-left */}
                    <path d="M4 16 L4 4 L16 4" stroke="#E14E26" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Corner bracket — bottom-right */}
                    <path d="M28 40 L40 40 L40 28" stroke="#E14E26" strokeWidth="2" fill="none" strokeLinecap="square"/>
                    {/* Bold diagonal slash — the check */}
                    <line x1="12" y1="32" x2="32" y2="12" stroke="#E14E26" strokeWidth="2.5" strokeLinecap="square" className={styles.slashDraw}/>
                    {/* Second shorter slash for compound mark */}
                    <line x1="8" y1="24" x2="18" y2="14" stroke="#E14E26" strokeWidth="1" strokeLinecap="square" strokeOpacity="0.4" className={styles.slashDraw2}/>
                  </svg>
                </div>
                <div className={styles.telemetryPill}>
                  <i className={styles.greenPulse} />
                  <span>TRANSMISSION SECURED [ 200 OK ]</span>
                </div>
              </div>

              <span className={styles.successEyebrow}>
                {transmissionId ? `REFERENCE // ${transmissionId}` : "TRANSMISSION CONFIRMED"}
              </span>

              <h3 className={styles.successTitle}>
                Brief received,<br />{formData.name.split(" ")[0]}.
              </h3>

              <p className={styles.successText}>
                Thank you for reaching out. We have received your project details and our team is currently reviewing them. We will be in touch with you directly within 24–48 hours.
              </p>

              {selectedTags.length > 0 && (
                <div className={styles.successTags}>
                  {selectedTags.map((t) => (
                    <span key={t} className={styles.successTag}>{t}</span>
                  ))}
                </div>
              )}

              <div className={styles.successMetaFooter}>
                <button className={styles.resetBtn} onClick={reset}>
                  Send another brief ↻
                </button>
                <span className={styles.registryNote}>CONFIDENTIAL &amp; DIRECT</span>
              </div>
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
