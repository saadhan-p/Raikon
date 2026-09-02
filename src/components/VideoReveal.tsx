"use client";

import { useEffect, useRef } from "react";
import styles from "./VideoReveal.module.css";

/**
 * Bolt SVG path: M11.2 2.4L2.8 13.6h7.6l-1.6 8 8.8-11.2h-7.6l1.6-8z  (viewBox 0 0 24 24)
 * Points (x/24, y/24) as percentages:
 *   (11.2/24, 2.4/24)   = (46.67%, 10%)
 *   (2.8/24, 13.6/24)   = (11.67%, 56.67%)
 *   (10.4/24,13.6/24)   = (43.33%, 56.67%)
 *   (8.8/24, 21.6/24)   = (36.67%, 90%)
 *   (17.6/24,10.4/24)   = (73.33%, 43.33%)
 *   (10/24,  10.4/24)   = (41.67%, 43.33%)
 */

// 6-point full-rectangle (morphs naturally to the 6-point bolt below)
const RECT: [number, number][] = [
  [0,   0  ],
  [0,   100],
  [50,  100],
  [100, 100],
  [100, 0  ],
  [50,  0  ],
];

// 6-point lightning bolt (same point-count as RECT for smooth clip-path interpolation)
const BOLT: [number, number][] = [
  [46.67, 10   ],
  [11.67, 56.67],
  [43.33, 56.67],
  [36.67, 90   ],
  [73.33, 43.33],
  [41.67, 43.33],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildClipPath(progress: number): string {
  const points = RECT.map(([rx, ry], i) => {
    const [bx, by] = BOLT[i];
    return `${lerp(rx, bx, progress).toFixed(2)}% ${lerp(ry, by, progress).toFixed(2)}%`;
  });
  return `polygon(${points.join(", ")})`;
}

export default function VideoReveal() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLHeadingElement>(null);
  const hintRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section   = sectionRef.current;
    const container = containerRef.current;
    const overlay   = overlayRef.current;
    if (!section || !container || !overlay) return;

    const onScroll = () => {
      const rect        = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight;
      const vh          = window.innerHeight;

      // overall 0→1 as section scrolls
      const scrolled  = -rect.top;
      const progress  = Math.min(Math.max(scrolled / (totalHeight - vh), 0), 1);

      // Phase 1: rectangle → bolt clip-path (uses full scroll progress)
      const p1 = easeInOutCubic(progress);

      // Apply clip-path morph
      container.style.clipPath = buildClipPath(p1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (container.style as any).webkitClipPath = buildClipPath(p1);

      // Keep scale at 1 since zoom animation is removed
      container.style.transform = "translate(-50%, -50%) scale(1)";

      if (taglineRef.current) {
        // Fade in the tagline during the last 15% of the scroll (0.85 -> 1.0)
        const tagOpacity = Math.max((progress - 0.85) / 0.15, 0);
        taglineRef.current.style.opacity = `${tagOpacity}`;
        taglineRef.current.style.transform = `translate(-50%, ${10 - tagOpacity * 10}px)`;
      }

      if (hintRef.current) {
        // Fade out hint earlier (0.6 -> 0.75) before the tagline appears
        const hintOpacity = Math.max(1 - (progress - 0.6) / 0.15, 0);
        hintRef.current.style.opacity = `${hintOpacity}`;
      }

      section.style.setProperty("--p", `${progress}`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef} className={styles.revealSection}>
      <div className={styles.sticky}>

        {/* Full-screen dark flood at the very end */}
        <div ref={overlayRef} className={styles.overlay} />

        {/* Morphing container */}
        <div ref={containerRef} className={styles.box}>
          <video
            className={styles.video}
            src="/videos/play_720p.mp4"
            autoPlay muted loop playsInline preload="auto"
            aria-hidden="true"
          />
        </div>

        {/* Tagline that appears at the end */}
        <h2 ref={taglineRef} className={styles.tagline}>
          Tech that strikes <span>different.</span>
        </h2>

        {/* Hint */}
        <p ref={hintRef} className={styles.hint}>SCROLL DOWN ↓</p>
      </div>
    </div>
  );
}
