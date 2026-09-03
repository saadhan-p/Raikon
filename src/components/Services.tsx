"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./Services.module.css";

interface Service {
  id: string;
  num: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  metric: string;
  metricLabel: string;
}

const scrollPhrases = [
  "You made it.",
  "Looking sharp.",
  "Well deserved.",
  "Nicely done.",
  "Keep going.",
  "Quite the look.",
  "Simply elegant.",
  "Good things ahead.",
  "Looking refined.",
  "Onward and upward.",
  "A fine choice.",
  "You’ve got this.",
  "Effortlessly good.",
  "Keep it classy.",
  "Nicely put.",
];

const services: Service[] = [
  {
    id: "web",
    num: "01",
    title: "Web Development",
    category: "DIGITAL PRODUCTS",
    tagline: "Websites that sell while you sleep.",
    description:
      "We don't build pretty websites — we build revenue machines. Every pixel is engineered to move visitors through a journey that ends in action. Booked calls. Paid invoices. Brand believers.",
    features: [
      "Conversion-first architecture",
      "Sub-2s load times, anywhere in the world",
      "Mobile-first, always",
      "CMS you can actually use yourself",
    ],
    metric: "3×",
    metricLabel: "avg. conversion lift",
  },
  {
    id: "software",
    num: "02",
    title: "Software Engineering",
    category: "CUSTOM ENGINEERING",
    tagline: "Your unfair advantage, written in code.",
    description:
      "Off-the-shelf software is everyone's solution — so it's no one's edge. We build exactly what your business needs. Lean, fast, and impossible to replicate.",
    features: [
      "Built around your exact workflows",
      "Grows with you as you scale",
      "Clean, documented, handover-ready code",
      "No vendor lock-in. Ever.",
    ],
    metric: "100%",
    metricLabel: "bespoke to your ops",
  },
  {
    id: "cloud",
    num: "03",
    title: "Cloud Infrastructure",
    category: "SCALABILITY",
    tagline: "Built for the moment it all goes viral.",
    description:
      "Traffic spikes shouldn't be a crisis. We architect cloud systems that scale in seconds, cost less when quiet, and never let a big moment become a big failure.",
    features: [
      "Auto-scaling on demand",
      "Predictable billing — no surprise invoices",
      "Global CDN & edge delivery",
      "Disaster recovery built in",
    ],
    metric: "99.99%",
    metricLabel: "uptime guarantee",
  },
  {
    id: "cyber",
    num: "04",
    title: "Cybersecurity",
    category: "PROTECTION",
    tagline: "We think like attackers. So yours can't win.",
    description:
      "Most companies find out about a breach from their customers. We make sure you never have that conversation. Proactive, relentless, invisible.",
    features: [
      "Penetration testing & red-team exercises",
      "24/7 threat monitoring & response",
      "GDPR, ISO 27001 & HIPAA alignment",
      "Staff phishing & social engineering training",
    ],
    metric: "24/7",
    metricLabel: "active threat monitoring",
  },
  {
    id: "support",
    num: "05",
    title: "Support & Maintenance",
    category: "PARTNERSHIP",
    tagline: "A team that answers at 3 AM. Seriously.",
    description:
      "We don't ghost after launch. Real people, real response times, real accountability. We treat your system like it's ours — because in many ways, it still is.",
    features: [
      "15-minute guaranteed first response",
      "Proactive monitoring — we fix before you notice",
      "Monthly performance & security reports",
      "Dedicated account contact — no ticket queues",
    ],
    metric: "<15min",
    metricLabel: "average response time",
  },
  {
    id: "consulting",
    num: "06",
    title: "Strategy & Consulting",
    category: "INTELLIGENCE",
    tagline: "Cut through tech noise. Move faster.",
    description:
      "We've seen what works and what bankrupts. Bring us in before you spend a rupee on software, vendors, or rebuilds. Our clients save an average of 40% on tech spend.",
    features: [
      "Digital transformation roadmaps",
      "Vendor selection & contract negotiation",
      "Tech stack audit & optimisation",
      "Cost-reduction analysis (avg. 40% savings)",
    ],
    metric: "40%",
    metricLabel: "avg. tech cost savings",
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<Service | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [phrases, setPhrases] = useState<string[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    checkTouch();
    window.matchMedia('(hover: none)').addEventListener('change', checkTouch);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [active]);

  // Update phrases randomly on scroll
  useEffect(() => {
    setPhrases(services.map(() => scrollPhrases[Math.floor(Math.random() * scrollPhrases.length)]));

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 450) {
            setPhrases(services.map(() => scrollPhrases[Math.floor(Math.random() * scrollPhrases.length)]));
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={styles.section}
      onMouseMove={handleMouseMove}
    >
      {/* Floating cursor metric tag */}
      {hovered && (
        <div
          className={styles.cursorTag}
          style={{ transform: `translate(${mouse.x + 18}px, ${mouse.y - 12}px)` }}
        >
          {services.find((s) => s.id === hovered)?.metric}
        </div>
      )}

      {/* Section header */}
      <div className={styles.sectionHeader}>
        <div className={styles.sectionMeta}>
          <span className={styles.metaTag}>Services</span>
          <span className={styles.metaDivider}>/</span>
          <span className={styles.metaCount}>06 capabilities</span>
        </div>
        <div className={styles.svcTitleBlock}>
          <h2 className={styles.svcHeading}>
            <span className={styles.svcHeadLight}>What we</span>
            <span className={styles.svcHeadBold}>build for you.</span>
          </h2>
          <p className={styles.svcSub}>
            Six weapons. One team.<br />Zero compromises.
          </p>
        </div>
      </div>

      {/* The list */}
      <div className={styles.list}>
        {services.map((svc, index) => (
          <button
            key={svc.id}
            className={`${styles.row} ${hovered === svc.id ? styles.rowActive : ""}`}
            onMouseEnter={() => !isTouchDevice && setHovered(svc.id)}
            onMouseLeave={() => !isTouchDevice && setHovered(null)}
            onClick={() => setActive(svc)}
          >
            <span className={styles.rowNum}>{svc.num}</span>
            <span className={styles.rowTitle}>{svc.title}</span>
            <span className={styles.rowDescriptor}>{svc.tagline}</span>
            <span className={styles.rowYear}>{phrases[index] || ""}</span>
            <span className={styles.rowArrow}>↗</span>
          </button>
        ))}
      </div>

      {/* Bottom band */}
      <div className={styles.bottomBand}>
        <p className={styles.bottomCopy}>Not sure where to start?</p>
        <a href="#contact" className={styles.bottomCta}>
          Let&apos;s talk — it&apos;s free <span>↗</span>
        </a>
      </div>

      {/* ── Drawer ── */}
      {active && (
        <>
          {/* Scrim */}
          <div
            className={styles.scrim}
            onClick={() => setActive(null)}
          />

          {/* Panel */}
          <div className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="service-drawer-title">
            {/* Close */}
            <button
              className={styles.drawerClose}
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Decorative background number */}
            <span className={styles.drawerBgNum}>{active.num}</span>

            {/* Content */}
            <div className={styles.drawerContent}>
              <div className={styles.drawerMeta}>
                <span className={styles.drawerNum}>{active.num}</span>
                <span className={styles.drawerCategory}>{active.category}</span>
              </div>

              <h3 id="service-drawer-title" className={styles.drawerTitle}>{active.title}</h3>
              <p className={styles.drawerTagline}>&ldquo;{active.tagline}&rdquo;</p>
              <p className={styles.drawerDesc}>{active.description}</p>

              <ul className={styles.drawerFeatures}>
                {active.features.map((f, i) => (
                  <li key={i} className={styles.drawerFeature}>
                    <span className={styles.featureDot} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className={styles.drawerStat}>
                <span className={styles.drawerStatVal}>{active.metric}</span>
                <span className={styles.drawerStatLabel}>{active.metricLabel}</span>
              </div>

              <a href="#contact" className={styles.drawerCta} onClick={() => setActive(null)}>
                Start this project <span>↗</span>
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
