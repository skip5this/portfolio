import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 1B: Minimal ASCII Reveal
 * 
 * Much more restrained than v1. Mostly empty black space.
 * A single line of text "AI" in the center, rendered in 
 * large ASCII characters. As mouse moves, a spotlight 
 * reveals hidden characters underneath — like shining a 
 * flashlight on a wall of code. Outside the spotlight, 
 * everything is near-invisible.
 * 
 * Principle: Less is more. Progressive disclosure.
 * The emptiness IS the design. The interaction IS the content.
 */

const CHARS = '01·:;+*#@%=<>{}[]|/\\~';

export function AIPortalAsciiV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const gridRef = useRef<string[][]>([]);
  const hasMovedRef = useRef(false);

  const CELL_W = 11;
  const CELL_H = 18;
  const SPOTLIGHT_RADIUS = 120;

  const initGrid = useCallback((cols: number, rows: number) => {
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
      }
      grid.push(row);
    }
    gridRef.current = grid;
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
    const time = timeRef.current;
    const grid = gridRef.current;

    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(width / CELL_W);
    const rows = Math.ceil(height / CELL_H);

    // Ensure grid is initialized
    if (grid.length === 0 || grid.length !== rows) {
      initGrid(cols, rows);
    }

    ctx.font = `${CELL_H - 4}px "SF Mono", SFMono-Regular, ui-monospace, Menlo, monospace`;
    ctx.textBaseline = 'top';

    const isActive = mouse.x > 0 && mouse.y > 0;

    // Slowly cycle some characters
    if (Math.random() < 0.05) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (grid[r] && grid[r][c]) {
        grid[r][c] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!grid[r]) continue;
        const char = grid[r][c];
        const cx = c * CELL_W + CELL_W / 2;
        const cy = r * CELL_H + CELL_H / 2;

        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha;
        if (isActive && dist < SPOTLIGHT_RADIUS) {
          const intensity = 1 - (dist / SPOTLIGHT_RADIUS);
          const eased = intensity * intensity; // quadratic easing for softer edge
          alpha = eased * 0.7;
          
          // Color near center of spotlight
          if (dist < SPOTLIGHT_RADIUS * 0.4) {
            const colorIntensity = 1 - (dist / (SPOTLIGHT_RADIUS * 0.4));
            const hue = (Math.atan2(dy, dx) * 180 / Math.PI + 180 + time * 20) % 360;
            ctx.fillStyle = `hsla(${hue}, 60%, 65%, ${eased * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          }
        } else {
          // Ambient: nearly invisible, just faint flickers
          alpha = 0.015 + Math.sin(time * 0.5 + c * 0.3 + r * 0.7) * 0.01;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        if (alpha > 0.005) {
          ctx.fillText(char, c * CELL_W, r * CELL_H);
        }
      }
    }

    // Center hint text (fades out once mouse moves)
    if (!hasMovedRef.current) {
      const hintAlpha = 0.12 + Math.sin(time * 0.8) * 0.04;
      ctx.font = `13px "ABC Diatype Mono", "SF Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(255, 255, 255, ${hintAlpha})`;
      ctx.fillText('move your cursor', width / 2, height / 2);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
    }

    timeRef.current += 0.016;
    animFrameRef.current = requestAnimationFrame(render);
  }, [initGrid]);

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
      const cols = Math.ceil(rect.width / CELL_W);
      const rows = Math.ceil(rect.height / CELL_H);
      initGrid(cols, rows);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initGrid, render]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    hasMovedRef.current = true;
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
        className="relative w-full cursor-none"
        style={{ minHeight: '450px', height: '55vh', maxHeight: '650px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Minimal CTA — bottom right */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16">
          <a
            href="/ai"
            className="text-white/15 hover:text-white/60 transition-colors duration-700 font-diatype-mono text-xs tracking-[0.15em] uppercase"
          >
            AI Work →
          </a>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
