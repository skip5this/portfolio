import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 1C: Binary Rainfall with Mouse Disruption
 * 
 * Columns of falling 0s and 1s (Matrix-style but refined).
 * Muted, nearly invisible. Mouse proximity disrupts the 
 * columns — characters scatter, change color, slow down.
 * Like dragging your hand through digital rain.
 * 
 * At the bottom, characters accumulate into readable text:
 * "AI" emerges from the fallen characters.
 * 
 * Principle: Motion serves navigation. One signature animation.
 * Use friction intentionally — the rain slows near cursor.
 */

interface Column {
  x: number;
  chars: { y: number; char: string; speed: number; alpha: number; hue: number }[];
  nextSpawn: number;
}

export function AIPortalAsciiV3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const columnsRef = useRef<Column[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const CHAR_SIZE = 14;
  const COL_SPACING = 18;
  const MOUSE_RADIUS = 160;

  const initColumns = useCallback((width: number) => {
    const cols: Column[] = [];
    const numCols = Math.ceil(width / COL_SPACING);
    for (let i = 0; i < numCols; i++) {
      cols.push({
        x: i * COL_SPACING + COL_SPACING / 2,
        chars: [],
        nextSpawn: Math.random() * 100,
      });
    }
    columnsRef.current = cols;
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
    const columns = columnsRef.current;

    // Semi-transparent clear for trail effect
    ctx.fillStyle = 'rgba(10, 10, 11, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${CHAR_SIZE}px "SF Mono", SFMono-Regular, ui-monospace, Menlo, monospace`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';

    for (const col of columns) {
      // Spawn new characters
      col.nextSpawn -= 1;
      if (col.nextSpawn <= 0) {
        col.chars.push({
          y: -CHAR_SIZE,
          char: Math.random() > 0.5 ? '1' : '0',
          speed: 0.8 + Math.random() * 1.5,
          alpha: 0.15 + Math.random() * 0.2,
          hue: 0,
        });
        col.nextSpawn = 8 + Math.random() * 25;
      }

      // Update and draw characters
      for (let i = col.chars.length - 1; i >= 0; i--) {
        const c = col.chars[i];
        
        // Mouse influence
        const dx = mouse.x - col.x;
        const dy = mouse.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const influence = 1 - (dist / MOUSE_RADIUS);
          const eased = influence * influence;
          
          // Slow down near mouse
          c.speed *= (1 - eased * 0.06);
          
          // Push away from mouse (horizontal displacement)
          const pushX = -dx * eased * 0.15;
          
          // Color shift
          c.hue = 220 + (col.x % 200); // blue-purple range
          c.alpha = Math.min(0.9, c.alpha + eased * 0.4);
          
          // Randomly flip character
          if (Math.random() < eased * 0.1) {
            c.char = c.char === '0' ? '1' : '0';
          }

          // Draw with displacement and color
          const saturation = 60 + eased * 40;
          const lightness = 50 + eased * 20;
          ctx.fillStyle = `hsla(${c.hue}, ${saturation}%, ${lightness}%, ${c.alpha})`;
          ctx.fillText(c.char, col.x + pushX, c.y);
        } else {
          // Normal rendering — very muted
          ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
          ctx.fillText(c.char, col.x, c.y);
        }

        // Fall
        c.y += c.speed;
        
        // Fade as approaching bottom
        if (c.y > height - 80) {
          c.alpha *= 0.97;
        }

        // Remove off-screen or faded
        if (c.y > height || c.alpha < 0.01) {
          col.chars.splice(i, 1);
        }
      }
    }

    // Subtle "AI" text at center, built from the rain aesthetic
    const aiAlpha = 0.06 + Math.sin(time * 0.4) * 0.02;
    ctx.font = `bold ${Math.min(width * 0.18, 160)}px "ABC Diatype Mono", "SF Mono", monospace`;
    ctx.fillStyle = `rgba(255, 255, 255, ${aiAlpha})`;
    ctx.textBaseline = 'middle';
    ctx.fillText('AI', width / 2, height / 2);
    
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

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
      if (ctx) {
        ctx.scale(dpr, dpr);
        // Clear fully on resize
        ctx.fillStyle = '#0a0a0b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      initColumns(rect.width);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initColumns, render]);

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
        
        {/* CTA */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="/ai"
            className="group inline-flex items-center gap-2 text-white/20 hover:text-white/70 transition-all duration-500 font-diatype-mono text-xs tracking-[0.15em] uppercase"
          >
            Explore AI Work
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
