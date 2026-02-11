import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 4A-W: Landscape ASCII — Teal background, auto-ripple
 * 
 * Simplified: teal bg like Strike's pink. Dark ASCII characters form
 * a subtle landscape. Auto-ripples pulse through periodically.
 * Mouse just nudges nearby characters slightly — no color change.
 * Quiet, cohesive, not trying too hard.
 */

const ASCII_RAMP = ' .·:;+=*#%@';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

const IMAGE_URL = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop&q=80';

// Soft teal background — not full saturated, more like a muted/pastel teal
const BG_COLOR = '#b2dfdb'; // muted teal (like mint/seafoam)
const CHAR_COLOR = { r: 0, g: 60, b: 55 }; // dark teal/forest for characters

export function AIPortalImageWarhol() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const brightnessGridRef = useRef<number[][]>([]);
  const imageBitmapRef = useRef<HTMLCanvasElement | null>(null);
  const lastAutoRippleRef = useRef(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const CELL_W = 7;
  const CELL_H = 12;
  const MOUSE_RADIUS = 150; // subtle nudge zone
  const AUTO_RIPPLE_INTERVAL = 2.0; // seconds between auto-ripples

  const sampleImage = useCallback((targetCols: number, targetRows: number) => {
    const imgCanvas = imageBitmapRef.current;
    if (!imgCanvas) return;
    const ctx = imgCanvas.getContext('2d');
    if (!ctx) return;
    const imgW = imgCanvas.width;
    const imgH = imgCanvas.height;
    const grid: number[][] = [];
    const imgAspect = imgW / imgH;
    const gridAspect = (targetCols * CELL_W) / (targetRows * CELL_H);

    for (let r = 0; r < targetRows; r++) {
      const row: number[] = [];
      for (let c = 0; c < targetCols; c++) {
        let srcX: number, srcY: number;
        if (gridAspect > imgAspect) {
          srcX = (c / targetCols) * imgW;
          const visH = imgW / gridAspect;
          srcY = (imgH - visH) / 2 + (r / targetRows) * visH;
        } else {
          srcY = (r / targetRows) * imgH;
          const visW = imgH * gridAspect;
          srcX = (imgW - visW) / 2 + (c / targetCols) * visW;
        }
        srcX = Math.max(0, Math.min(imgW - 1, Math.floor(srcX)));
        srcY = Math.max(0, Math.min(imgH - 1, Math.floor(srcY)));
        const pixel = ctx.getImageData(srcX, srcY, 1, 1).data;
        const lum = (pixel[0] * 0.299 + pixel[1] * 0.587 + pixel[2] * 0.114) / 255;
        let p: number;
        if (lum < 0.12) p = 0;
        else if (lum < 0.28) p = 0.25;
        else if (lum < 0.48) p = 0.5;
        else if (lum < 0.68) p = 0.75;
        else p = 1.0;
        row.push(p);
      }
      grid.push(row);
    }
    brightnessGridRef.current = grid;
  }, []);

  const generateFallback = useCallback((cols: number, rows: number): number[][] => {
    const map: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: number[] = [];
      const ny = r / rows;
      for (let c = 0; c < cols; c++) {
        const nx = c / cols;
        const m1 = Math.max(0, 1 - Math.abs(ny - 0.5 + Math.sin(nx * 8) * 0.15) * 3);
        const m2 = Math.max(0, 1 - Math.abs(ny - 0.55 + Math.sin(nx * 5 + 2) * 0.12) * 3.5);
        const sky = ny < 0.35 ? 0.1 + ny * 0.3 : 0;
        let val = Math.max(m1 * 0.8, m2 * 0.6, sky);
        if (val < 0.12) val = 0;
        else if (val < 0.3) val = 0.25;
        else if (val < 0.55) val = 0.5;
        else val = 0.85;
        row.push(val);
      }
      map.push(row);
    }
    return map;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const time = timeRef.current;
    const ripples = ripplesRef.current;
    const grid = brightnessGridRef.current;
    const mouse = mouseRef.current;

    dimensionsRef.current = { width, height };

    // Auto-ripple
    if (time - lastAutoRippleRef.current > AUTO_RIPPLE_INTERVAL) {
      lastAutoRippleRef.current = time;
      // Random position, weighted toward center-ish area
      const rx = width * 0.15 + Math.random() * width * 0.7;
      const ry = height * 0.15 + Math.random() * height * 0.7;
      ripples.push({
        x: rx, y: ry,
        radius: 0,
        maxRadius: 500,
        strength: 0.4, // gentler than click ripples
      });
    }

    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!grid.length) {
      timeRef.current += 0.016;
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const rows = grid.length;
    const cols = grid[0]?.length || 0;

    ctx.font = `${CELL_H - 2}px "SF Mono", SFMono-Regular, ui-monospace, Menlo, monospace`;
    ctx.textBaseline = 'top';

    // Update ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += 2.5;
      ripples[i].strength *= 0.985;
      if (ripples[i].strength < 0.005 || ripples[i].radius > ripples[i].maxRadius) {
        ripples.splice(i, 1);
      }
    }

    const { r: cr, g: cg, b: cb } = CHAR_COLOR;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let drawX = col * CELL_W;
        let drawY = row * CELL_H;
        const cx = drawX + CELL_W / 2;
        const cy = drawY + CELL_H / 2;

        let value = grid[row][col];

        // Gentle breathing
        const breathe = Math.sin(time * 0.4 + col * 0.04 + row * 0.06) * 0.025;
        const breathe2 = Math.sin(time * 0.7 - col * 0.03 + row * 0.04) * 0.02;
        value = Math.max(0, Math.min(1, value + breathe + breathe2));

        // Ripple influence — shifts brightness
        for (const ripple of ripples) {
          const rdist = Math.sqrt((cx - ripple.x) ** 2 + (cy - ripple.y) ** 2);
          const ringDist = Math.abs(rdist - ripple.radius);
          if (ringDist < 30) {
            const fx = Math.cos((ringDist / 30) * Math.PI * 0.5) * ripple.strength;
            value = Math.min(1, Math.max(0, value + fx * 0.6));
          }
        }

        // Mouse proximity — subtle displacement toward cursor, no color change
        if (mouse.x > -500) {
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS && dist > 1) {
            const influence = (1 - dist / MOUSE_RADIUS);
            const eased = influence * influence;
            // Nudge character position slightly toward mouse
            drawX += (dx / dist) * eased * 2.5;
            drawY += (dy / dist) * eased * 1.5;
          }
        }

        const charIndex = Math.floor(value * (ASCII_RAMP.length - 1));
        const char = ASCII_RAMP[Math.min(charIndex, ASCII_RAMP.length - 1)];
        if (char === ' ') continue;

        // All characters are the same dark teal color, just varying alpha
        const alpha = 0.06 + value * 0.35;
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha})`;
        ctx.fillText(char, drawX, drawY);
      }
    }

    timeRef.current += 0.016;
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    let loaded = false;

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
      if (loaded && imageBitmapRef.current) sampleImage(cols, rows);
      else brightnessGridRef.current = generateFallback(cols, rows);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = img.naturalWidth;
      offscreen.height = img.naturalHeight;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.drawImage(img, 0, 0);
        imageBitmapRef.current = offscreen;
        loaded = true;
        const rect = container.getBoundingClientRect();
        sampleImage(Math.ceil(rect.width / CELL_W), Math.ceil(rect.height / CELL_H));
      }
    };
    img.onerror = () => {
      const rect = container.getBoundingClientRect();
      brightnessGridRef.current = generateFallback(Math.ceil(rect.width / CELL_W), Math.ceil(rect.height / CELL_H));
    };
    img.src = IMAGE_URL;

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animFrameRef.current); };
  }, [render, sampleImage, generateFallback]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Manual click ripples are a bit stronger than auto ones
    ripplesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 500,
      strength: 0.6,
    });
  }, []);

  const handleMouseLeave = useCallback(() => { mouseRef.current = { x: -1000, y: -1000 }; }, []);

  return (
    <section className="relative" style={{ background: BG_COLOR }}>
      <div
        ref={containerRef}
        className="relative w-full cursor-default overflow-hidden"
        style={{ minHeight: '480px', height: '55vh', maxHeight: '700px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        
        {/* Text overlay — matches hero section layout */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto w-full px-4 md:px-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-diatype-mono font-medium text-gray-800 leading-none">
              AI
            </h2>
            <p className="text-xl md:text-2xl lg:text-3xl font-diatype-mono text-gray-500 mt-2 md:mt-3">
              Explorations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
