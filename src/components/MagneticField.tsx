"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  opacity: number;
}

interface AttractorProps {
  className?: string;
}

export default function MagneticField({ className }: AttractorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 600;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track scroll velocity
    const onScroll = () => {
      const current = window.scrollY;
      velocityRef.current = current - lastScrollRef.current;
      lastScrollRef.current = current;
      scrollRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Spawn a particle
    const spawn = (): Particle => {
      const edge = Math.random();
      let x: number, y: number;
      if (edge < 0.25) { x = Math.random() * canvas.width; y = -5; }
      else if (edge < 0.5) { x = canvas.width + 5; y = Math.random() * canvas.height; }
      else if (edge < 0.75) { x = Math.random() * canvas.width; y = canvas.height + 5; }
      else { x = -5; y = Math.random() * canvas.height; }
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        opacity: 0,
      };
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife; // stagger initial lives
      particles.push(p);
    }

    let frame = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      frame++;

      const W = canvas.width;
      const H = canvas.height;
      const scrollY = scrollRef.current;
      const vel = velocityRef.current;

      // Decay velocity
      velocityRef.current *= 0.85;

      ctx.clearRect(0, 0, W, H);

      // Dynamic gravity wells based on scroll
      const t = frame * 0.005;
      const wells = [
        {
          x: W * 0.5 + Math.sin(t * 0.7) * W * 0.2,
          y: H * 0.35 + Math.cos(t * 0.5) * H * 0.1,
          strength: 180 + vel * 3,
        },
        {
          x: W * 0.5 + Math.cos(t * 0.4) * W * 0.25,
          y: H * 0.65 + Math.sin(t * 0.6) * H * 0.12,
          strength: 140 + vel * 2,
        },
        {
          // A scroll-position anchored well — shifts vertically as you scroll
          x: W * 0.5 + Math.sin(scrollY * 0.003 + t) * W * 0.3,
          y: H * 0.5 + ((scrollY * 0.02) % H) * 0.4,
          strength: 100,
        },
      ];

      // Draw connection lines between nearby particles first
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            const alpha = (1 - dist / 60) * 0.15 * a.opacity * b.opacity;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        // Apply gravity wells
        for (const well of wells) {
          const dx = well.x - p.x;
          const dy = well.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5 && dist < 300) {
            const force = (well.strength / (dist * dist)) * 0.5;
            p.vx += dx * force;
            p.vy += dy * force;
          }
          // Repel when too close
          if (dist < 50) {
            p.vx -= (dx / dist) * 0.8;
            p.vy -= (dy / dist) * 0.8;
          }
        }

        // Subtle noise / wander
        p.vx += (Math.random() - 0.5) * 0.08;
        p.vy += (Math.random() - 0.5) * 0.08;

        // Scroll adds a vertical drift
        p.vy += vel * 0.04;

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3;
          p.vy = (p.vy / speed) * 3;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in/out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) p.opacity = lifeRatio / 0.1;
        else if (lifeRatio > 0.8) p.opacity = 1 - (lifeRatio - 0.8) / 0.2;
        else p.opacity = 1;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.7})`;
        ctx.fill();

        // Respawn dead or out-of-bounds particles
        if (p.life >= p.maxLife || p.x < -50 || p.x > W + 50 || p.y < -50 || p.y > H + 50) {
          Object.assign(p, spawn());
          p.life = 0;
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
