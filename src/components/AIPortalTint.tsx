import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 4B-Tint: Breathing Grid on Soft Blue
 * 
 * Same breathing grid but on a pale blue background.
 * Sits between the green hero and pink Strike — the blue
 * creates a nice triadic color relationship.
 * Dots are darker blue/navy, mouse adds vibrant pops.
 * Feels cohesive with the portfolio's pastel palette.
 */

// Simple noise function for organic blob boundary
function simpleNoise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.8 + t * 0.7) * 0.3 +
    Math.cos(y * 0.6 + t * 0.5) * 0.3 +
    Math.sin((x + y) * 0.5 + t * 1.1) * 0.2 +
    Math.cos(x * 1.3 - y * 0.9 + t * 0.3) * 0.2
  );
}

export function AIPortalTint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const DOT_SPACING = 28;
  const BASE_RADIUS = 0.8;
  const MAX_RADIUS = 8;
  const MOUSE_RADIUS = 280;
  const LERP_FACTOR = 0.08;
  
  // Pale blue background
  const BG_COLOR = '#dbeafe'; // tailwind blue-100
  const DOT_BASE_COLOR = { r: 30, g: 58, b: 138 }; // navy blue

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const targetMouse = mouseRef.current;
    const time = timeRef.current;

    // Lerp smooth mouse toward actual mouse
    const sm = smoothMouseRef.current;
    if (targetMouse.x < -500) {
      sm.x += (targetMouse.x - sm.x) * 0.03;
      sm.y += (targetMouse.y - sm.y) * 0.03;
    } else {
      sm.x += (targetMouse.x - sm.x) * LERP_FACTOR;
      sm.y += (targetMouse.y - sm.y) * LERP_FACTOR;
    }
    const mouse = sm;

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);
    const offsetX = (width - (cols - 1) * DOT_SPACING) / 2;
    const offsetY = (height - (rows - 1) * DOT_SPACING) / 2;

    const isActive = mouse.x > -500 && mouse.y > -500;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = offsetX + c * DOT_SPACING;
        const cy = offsetY + r * DOT_SPACING;

        const wave = Math.sin(time * 1.2 + c * 0.15 + r * 0.15) * 0.5 + 0.5;
        const wave2 = Math.sin(time * 0.8 - c * 0.1 + r * 0.2) * 0.5 + 0.5;
        const breathe = (wave + wave2) / 2;

        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Organic wobble on the radius boundary
        const noiseVal = simpleNoise(cx * 0.01, cy * 0.01, time);
        const wobbleRadius = MOUSE_RADIUS + noiseVal * 40;

        let radius = BASE_RADIUS + breathe * 1.2;
        let colored = false;
        let hue = 0;
        let influence = 0;

        if (isActive && dist < wobbleRadius) {
          influence = 1 - (dist / wobbleRadius);
          const eased = influence * influence * influence;
          
          radius = BASE_RADIUS + breathe * 2 + eased * (MAX_RADIUS - BASE_RADIUS);
          
          // Colors that complement pale blue: deep blue, teal, purple, white
          const palette = [220, 200, 260, 180, 240];
          const angle = Math.atan2(dy, dx);
          const paletteIndex = Math.floor(((angle * 180 / Math.PI + 360) % 360) / 72);
          hue = palette[paletteIndex % palette.length];
          colored = eased > 0.05;
        }

        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(0.5, radius), 0, Math.PI * 2);
        
        if (colored) {
          const eased = influence * influence * influence;
          const saturation = 60 + eased * 30;
          const lightness = 30 + eased * 25;
          const alpha = 0.3 + eased * 0.7;
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        } else {
          const { r: dr, g: dg, b: db } = DOT_BASE_COLOR;
          const alpha = 0.06 + breathe * 0.08;
          ctx.fillStyle = `rgba(${dr}, ${dg}, ${db}, ${alpha})`;
        }
        
        ctx.fill();
      }
    }

    // Subtle connection lines near mouse
    if (isActive) {
      const { r: dr, g: dg, b: db } = DOT_BASE_COLOR;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const cx = offsetX + c * DOT_SPACING;
          const cy = offsetY + r * DOT_SPACING;
          const nx = cx + DOT_SPACING;
          const midX = (cx + nx) / 2;
          const dist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - cy) ** 2);
          
          if (dist < MOUSE_RADIUS * 0.7) {
            const lineAlpha = (1 - dist / (MOUSE_RADIUS * 0.7)) * 0.08;
            ctx.strokeStyle = `rgba(${dr}, ${dg}, ${db}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(nx, cy);
            ctx.stroke();
          }
        }
      }
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = offsetX + c * DOT_SPACING;
          const cy = offsetY + r * DOT_SPACING;
          const ny = cy + DOT_SPACING;
          const midY = (cy + ny) / 2;
          const dist = Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - midY) ** 2);
          
          if (dist < MOUSE_RADIUS * 0.7) {
            const lineAlpha = (1 - dist / (MOUSE_RADIUS * 0.7)) * 0.08;
            ctx.strokeStyle = `rgba(${dr}, ${dg}, ${db}, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx, ny);
            ctx.stroke();
          }
        }
      }
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
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [render]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <section className="relative">
      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair"
        style={{ minHeight: '450px', height: '55vh', maxHeight: '650px', background: BG_COLOR }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Corner label — bigger, more prominent */}
        <div className="absolute top-8 left-8 md:top-12 md:left-16">
          <span className="font-diatype-mono text-2xl font-medium tracking-[0.1em] uppercase" style={{ color: 'rgba(30,58,138,0.2)' }}>AI · 2025–26</span>
        </div>
        
        {/* CTA — bigger, more visible */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16">
          <a href="/ai" className="transition-colors duration-700 font-diatype-mono text-base tracking-[0.15em] uppercase" style={{ color: 'rgba(30,58,138,0.3)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(30,58,138,0.7)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(30,58,138,0.3)'}
          >
            Enter →
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
