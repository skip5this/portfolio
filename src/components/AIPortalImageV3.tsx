import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 4C: Constellation Map
 * 
 * Points scattered like stars. Mouse proximity draws lines 
 * between nearby points — creating constellations that form 
 * and dissolve as you move. Points near cursor glow with 
 * the Oto Nové color palette.
 * 
 * The metaphor: AI connections emerging from proximity.
 * You are the catalyst that creates the network.
 * 
 * Principle: Design for outcomes — the interaction IS the message.
 * The user creates the pattern. Progressive disclosure.
 */

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  hue: number;
  radius: number;
}

export function AIPortalImageV3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const pointsRef = useRef<Point[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const NUM_POINTS = 200;
  const CONNECT_DIST = 100;
  const MOUSE_RADIUS = 250;
  const PALETTE = [220, 170, 280, 10, 45]; // blue, teal, purple, coral, yellow

  const initPoints = useCallback((width: number, height: number) => {
    const points: Point[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseAlpha: 0.05 + Math.random() * 0.1,
        hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        radius: 1 + Math.random() * 1.5,
      });
    }
    pointsRef.current = points;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const mouse = mouseRef.current;
    const points = pointsRef.current;

    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isActive = mouse.x > 0 && mouse.y > 0;

    // Update points
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Gentle mouse attraction
      if (isActive) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 30) {
          p.vx += (dx / dist) * 0.003;
          p.vy += (dy / dist) * 0.003;
        }
      }

      // Damping
      p.vx *= 0.999;
      p.vy *= 0.999;
    }

    // Draw connections (only near mouse for performance and aesthetics)
    if (isActive) {
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const aDist = Math.sqrt((mouse.x - a.x) ** 2 + (mouse.y - a.y) ** 2);
        if (aDist > MOUSE_RADIUS) continue;

        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const bDist = Math.sqrt((mouse.x - b.x) ** 2 + (mouse.y - b.y) ** 2);
          if (bDist > MOUSE_RADIUS) continue;

          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < CONNECT_DIST) {
            const lineAlpha = (1 - dist / CONNECT_DIST) * 0.15;
            const mouseInfluence = Math.min(1 - aDist / MOUSE_RADIUS, 1 - bDist / MOUSE_RADIUS);
            
            ctx.strokeStyle = `hsla(${a.hue}, 50%, 60%, ${lineAlpha * mouseInfluence})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw points
    for (const p of points) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let alpha = p.baseAlpha;
      let radius = p.radius;
      let colored = false;

      if (isActive && dist < MOUSE_RADIUS) {
        const influence = 1 - (dist / MOUSE_RADIUS);
        const eased = influence * influence;
        alpha = p.baseAlpha + eased * 0.8;
        radius = p.radius + eased * 3;
        colored = true;

        // Glow
        if (eased > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + eased * 8, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 60%, 50%, ${eased * 0.08})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      
      if (colored) {
        ctx.fillStyle = `hsla(${p.hue}, 60%, 65%, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }
      ctx.fill();
    }

    timeRef.current += 0.016;
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initPoints(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initPoints, render]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <section className="relative bg-[#0a0a0b]">
      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair"
        style={{ minHeight: '450px', height: '55vh', maxHeight: '650px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Minimal center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <a 
            href="/ai"
            className="pointer-events-auto text-white/8 hover:text-white/40 transition-colors duration-1000 font-diatype-mono text-6xl md:text-8xl font-medium tracking-tight"
          >
            AI
          </a>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
