"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section, footer"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );

    sections.forEach((section) => {
      section.classList.add("motion-section");
      const items = Array.from(
        section.querySelectorAll<HTMLElement>(
          '[class*="card"], [class*="step"], [class*="faqItem"], [class*="model"], [class*="featureItem"]',
        ),
      );
      items.forEach((item, index) => {
        item.classList.add("motion-item");
        item.style.setProperty("--motion-delay", `${Math.min(index, 8) * 55}ms`);
      });
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
