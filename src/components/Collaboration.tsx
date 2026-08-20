"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Collaboration.module.css";

const getSceneProgress = (
  scrollY: number, 
  containerTop: number, 
  viewportHeight: number, 
  sceneIndex: number
) => {
  const sceneHeight = viewportHeight; 
  const sceneStart = containerTop + (sceneIndex * sceneHeight);
  const sceneEnd = sceneStart + sceneHeight;

  if (scrollY < sceneStart) return 0;
  if (scrollY > sceneEnd) return 1;

  return (scrollY - sceneStart) / sceneHeight;
};

const calculateStyle = (progress: number) => {
  let opacity = 0;
  let scale = 1;
  let translateY = 0;

  if (progress < 0.2) {
    opacity = progress / 0.2;
    scale = 0.95 + (progress / 0.2) * 0.05;
    translateY = 20 - (progress / 0.2) * 20;
  } else if (progress >= 0.2 && progress < 0.8) {
    opacity = 1;
    scale = 1;
    translateY = 0;
  } else {
    const fadeOutProgress = (progress - 0.8) / 0.2;
    opacity = 1 - fadeOutProgress;
    scale = 1 + fadeOutProgress * 0.05;
    translateY = - (fadeOutProgress * 20);
  }

  return { opacity, scale, translateY };
};

export default function Collaboration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let containerTop = 0;
    let viewportHeight = window.innerHeight;

    const updateMeasurements = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerTop = rect.top + window.scrollY;
      }
      viewportHeight = window.innerHeight;
    };

    const updateParallax = () => {
      const scrollY = window.scrollY;

      sceneRefs.current.forEach((sceneEl, index) => {
        if (!sceneEl) return;
        
        const progress = getSceneProgress(scrollY, containerTop, viewportHeight, index);
        const { opacity, scale, translateY } = calculateStyle(progress);
        
        sceneEl.style.opacity = opacity.toString();
        sceneEl.style.transform = `translateY(${translateY}px) scale(${scale})`;
      });

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    updateMeasurements();
    animationFrameId = requestAnimationFrame(updateParallax);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  return (
    <section id="collaboration" ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyViewport}>
        
        {/* Scene 0 */}
        <div className={styles.scene} ref={el => { sceneRefs.current[0] = el; }}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.headline}>Ideas Over Specs.</h2>
            <h2 className={`${styles.headline} ${styles.sceneOutline}`}>Collaboration Over Commands.</h2>
          </div>
        </div>

        {/* Scene 1 */}
        <div className={styles.scene} ref={el => { sceneRefs.current[1] = el; }}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.headline}>We build <span className={styles.accent}>WITH</span> you.</h2>
            <div className={styles.tableGrid}>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Approach</span>
                <span className={styles.tableValue}>We collaborate like partners, not just vendors.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Alignment</span>
                <span className={styles.tableValue}>Your wins are our wins.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 2 */}
        <div className={styles.scene} ref={el => { sceneRefs.current[2] = el; }}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.headline}>Validation First.</h2>
            <div className={styles.tableGrid}>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Strategy</span>
                <span className={styles.tableValue}>Test ideas cheaply and pivot quickly.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Outcome</span>
                <span className={styles.tableValue}>No rework because we validate before building.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 3 */}
        <div className={styles.scene} ref={el => { sceneRefs.current[3] = el; }}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.headline}>The Brainstorm.</h2>
            <div className={styles.tableGrid}>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Frequency</span>
                <span className={styles.tableValue}>Every week. 1 hour.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Format</span>
                <span className={styles.tableValue}>No boring meetings.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Process</span>
                <span className={styles.tableValue}>We look at real analytics, throw out ideas, and pick the best one to try.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 4 */}
        <div className={styles.scene} ref={el => { sceneRefs.current[4] = el; }}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.headline}>The Magic.</h2>
            <div className={styles.tableGrid}>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>You</span>
                <span className={styles.tableValue}>Know your customers inside and out.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Us</span>
                <span className={styles.tableValue}>Know the absolute limits of tech.</span>
              </div>
              <div className={styles.tableRow}>
                <span className={styles.tableLabel}>Result</span>
                <span className={styles.tableValue}>Together, we get ideas neither of us would have alone.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
