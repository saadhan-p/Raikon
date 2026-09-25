"use client";

import { useEffect, useRef } from "react";

interface AttractorProps {
  className?: string;
}

// ── Types ──────────────────────────────────────────────────────────────────
interface Node {
  x: number;
  y: number;
  pulse: number;      // 0..1 animation phase
  pulseSpeed: number;
  size: number;
  brightness: number;
}

interface Trace {
  // Axis-aligned L-shaped path: start → corner → end
  x0: number; y0: number;   // origin node centre
  cx: number; cy: number;   // corner
  x1: number; y1: number;   // dest node centre
  progress: number;          // 0..1 drawing progress
  speed: number;
  alpha: number;
  width: number;
  // data packet running along the trace
  packetT: number;           // 0..1 position along trace
  packetSpeed: number;
  packetAlive: boolean;
  color: string;             // trace colour (orange accent or dim white)
}

// ── Helpers ────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function pointOnTrace(trace: Trace, t: number): { x: number; y: number } {
  // First half goes x0,y0 → cx,y0; second half goes cx,y0 → x1,y1
  if (t < 0.5) {
    const u = t * 2;
    return { x: lerp(trace.x0, trace.cx, u), y: trace.y0 };
  } else {
    const u = (t - 0.5) * 2;
    return { x: trace.cx, y: lerp(trace.y0, trace.y1, u) };
  }
}

function drawLTrace(
  ctx: CanvasRenderingContext2D,
  trace: Trace,
  progress: number
) {
  // Progress along the total path length = |x0→cx| + |cx→y1|
  const segA = Math.abs(trace.cx - trace.x0);
  const segB = Math.abs(trace.y1 - trace.y0);
  const total = segA + segB || 1;
  const drawnLen = progress * total;

  ctx.lineWidth = trace.width;
  ctx.strokeStyle = trace.color;
  ctx.lineCap = "square";
  ctx.beginPath();

  if (drawnLen <= segA) {
    // Still in first segment
    const endX = lerp(trace.x0, trace.cx, drawnLen / segA);
    ctx.moveTo(trace.x0, trace.y0);
    ctx.lineTo(endX, trace.y0);
  } else {
    // First segment complete + partial second
    const rem = drawnLen - segA;
    const endY = lerp(trace.y0, trace.y1, rem / segB);
    ctx.moveTo(trace.x0, trace.y0);
    ctx.lineTo(trace.cx, trace.y0);
    ctx.lineTo(trace.cx, endY);
  }

  ctx.stroke();
}

// ── Component ──────────────────────────────────────────────────────────────
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

    // ── Colour palette ──────────────────────────────────────────────────
    const ACCENT   = "rgba(232, 80, 42,";   // orange
    const DIM      = "rgba(255, 255, 255,";  // white

    // ── Grid layout ─────────────────────────────────────────────────────
    const COLS = 11;
    const ROWS = 8;
    let nodes: Node[] = [];
    let traces: Trace[] = [];

    const buildGrid = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Jitter nodes off a regular grid for organic look
      nodes = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const baseX = (c / (COLS - 1)) * W;
          const baseY = (r / (ROWS - 1)) * H;
          const jX = (Math.random() - 0.5) * (W / COLS) * 0.55;
          const jY = (Math.random() - 0.5) * (H / ROWS) * 0.55;
          nodes.push({
            x: Math.max(20, Math.min(W - 20, baseX + jX)),
            y: Math.max(20, Math.min(H - 20, baseY + jY)),
            pulse: Math.random(),
            pulseSpeed: 0.006 + Math.random() * 0.01,
            size: 1.5 + Math.random() * 2,
            brightness: 0.2 + Math.random() * 0.6,
          });
        }
      }

      // Create traces between "nearby" nodes on the grid
      traces = [];
      const totalNodes = nodes.length;
      for (let i = 0; i < totalNodes; i++) {
        // Each node connects to up to 2 neighbours
        const candidates: number[] = [];
        for (let j = 0; j < totalNodes; j++) {
          if (i === j) continue;
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const W2 = canvas.width;
          const H2 = canvas.height;
          if (d < (W2 / COLS) * 2.2) candidates.push(j);
        }
        const take = Math.min(2, candidates.length);
        for (let k = 0; k < take; k++) {
          const j = candidates[Math.floor(Math.random() * candidates.length)];
          const a = nodes[i];
          const b = nodes[j];
          const isAccent = Math.random() < 0.2;
          traces.push({
            x0: a.x, y0: a.y,
            cx: b.x, cy: a.y,
            x1: b.x, y1: b.y,
            progress: 0,
            speed: 0.0008 + Math.random() * 0.001,
            alpha: isAccent ? (0.35 + Math.random() * 0.4) : (0.08 + Math.random() * 0.14),
            width: isAccent ? 1.2 : 0.6,
            packetT: 0,
            packetSpeed: 0.004 + Math.random() * 0.006,
            packetAlive: false,
            color: isAccent
              ? `${ACCENT}${(0.35 + Math.random() * 0.35).toFixed(2)})`
              : `${DIM}${(0.08 + Math.random() * 0.12).toFixed(2)})`,
          });
        }
      }
    };

    const resize = () => {
      if (!canvas.offsetWidth || !canvas.offsetHeight) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Scroll tracking ─────────────────────────────────────────────────
    const onScroll = () => {
      const current = window.scrollY;
      velocityRef.current = current - lastScrollRef.current;
      lastScrollRef.current = current;
      scrollRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Draw loop ────────────────────────────────────────────────────────
    let frame = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) return;
      frame++;
      const vel = Math.abs(velocityRef.current);
      velocityRef.current *= 0.88;

      // Dark background — very slightly transparent so bg shows through
      ctx.fillStyle = "rgba(8, 8, 8, 0.82)";
      ctx.fillRect(0, 0, W, H);

      // ── Grow traces ─────────────────────────────────────────────────
      for (const tr of traces) {
        // Speed boost on fast scroll
        const boost = 1 + vel * 0.04;
        tr.progress = Math.min(1, tr.progress + tr.speed * boost);

        drawLTrace(ctx, tr, tr.progress);

        // Spawn data packet when trace is fully drawn
        if (tr.progress >= 1) {
          if (!tr.packetAlive) {
            tr.packetAlive = true;
            tr.packetT = 0;
          }
        }

        // Animate packet
        if (tr.packetAlive) {
          tr.packetT += tr.packetSpeed * (1 + vel * 0.03);
          if (tr.packetT > 1) {
            tr.packetT = 0;
          }
          const pt = pointOnTrace(tr, tr.packetT);
          const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 6);
          grd.addColorStop(0, "rgba(232, 80, 42, 0.95)");
          grd.addColorStop(0.4, "rgba(232, 80, 42, 0.35)");
          grd.addColorStop(1, "rgba(232, 80, 42, 0)");
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Tiny bright core
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 180, 140, 0.95)";
          ctx.fill();
        }

        // Occasionally redraw a trace to keep it fresh / cycling
        if (tr.progress >= 1 && Math.random() < 0.0002) {
          tr.progress = 0;
          tr.packetAlive = false;
        }
      }

      // ── Draw nodes (junction pads) ──────────────────────────────────
      for (const n of nodes) {
        n.pulse = (n.pulse + n.pulseSpeed) % 1;
        const glow = (Math.sin(n.pulse * Math.PI * 2) + 1) / 2;

        // Outer glow ring
        const grdNode = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.size * 6);
        grdNode.addColorStop(0, `rgba(232, 80, 42, ${(glow * 0.18 * n.brightness).toFixed(3)})`);
        grdNode.addColorStop(1, "rgba(232, 80, 42, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = grdNode;
        ctx.fill();

        // Square pad (PCB junction style)
        const halfPad = n.size * 1.6;
        const padAlpha = (0.2 + glow * 0.5) * n.brightness;
        ctx.fillStyle = `rgba(232, 80, 42, ${padAlpha.toFixed(3)})`;
        ctx.fillRect(n.x - halfPad, n.y - halfPad, halfPad * 2, halfPad * 2);

        // Tiny centre dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 170, ${(0.4 + glow * 0.5).toFixed(3)})`;
        ctx.fill();
      }

      // ── Scanline shimmer ────────────────────────────────────────────
      // A very subtle horizontal shimmer line that sweeps down over time
      const scanY = ((frame * 0.4) % H);
      const scanGrd = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrd.addColorStop(0, "rgba(255,255,255,0)");
      scanGrd.addColorStop(0.5, "rgba(255,255,255,0.025)");
      scanGrd.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = scanGrd;
      ctx.fillRect(0, scanY - 2, W, 4);
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
