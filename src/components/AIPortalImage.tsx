import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 4: ASCII Art Image with Interactive Ripple
 * 
 * An abstract shape/pattern rendered entirely in ASCII characters.
 * Mouse creates ripples that distort the character mapping.
 * Characters shift density and color on hover, like waking something up.
 * The image is a generative neural-network-inspired pattern.
 */

const ASCII_RAMP = ' .·:;+*#%@';
const ASCII_RAMP_REVERSED = '@%#*+;:·. ';

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  time: number;
}

export function AIPortalImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<Ripple[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const hoverTimeRef = useRef(0);

  const CELL_W = 10;
  const CELL_H = 18;

  // Generate the base image pattern — a neural network / brain-like shape
  const getBaseValue = useCallback((x: number, y: number, width: number, height: number, time: number) => {
    const nx = (x / width) * 2 - 1;
    const ny = (y / height) * 2 - 1;
    
    // Central circular gradient
    const dist = Math.sqrt(nx * nx + ny * ny);
    const circle = Math.max(0, 1 - dist * 1.2);
    
    // Layered sine waves for neural network pattern
    const wave1 = Math.sin(nx * 8 + time * 0.3) * Math.cos(ny * 6 + time * 0.2) * 0.3;
    const wave2 = Math.sin((nx + ny) * 5 + time * 0.15) * 0.2;
    const wave3 = Math.cos(nx * 12 - time * 0.4) * Math.sin(ny * 10 + time * 0.25) * 0.15;
    
    // Radial connections (like neural pathways)
    const angle = Math.atan2(ny, nx);
    const radialPulse = Math.sin(angle * 6 + dist * 8 - time * 0.5) * 0.2 * circle;
    
    // Nodes (bright spots like neurons)
    let nodes = 0;
    const nodePositions = [
      [0, 0], [0.3, 0.4], [-0.4, 0.3], [0.2, -0.5], [-0.3, -0.3],
      [0.5, 0], [-0.5, 0.1], [0, 0.5], [0.1, -0.3], [-0.2, 0.4],
      [0.4, -0.2], [-0.1, -0.5], [0.35, 0.25], [-0.35, -0.15]
    ];
    
    for (const [px, py] of nodePositions) {
      const ndist = Math.sqrt((nx - px) ** 2 + (ny - py) ** 2);
      const pulse = Math.sin(time * 1.5 + px * 10 + py * 7) * 0.5 + 0.5;
      nodes += Math.max(0, 0.15 - ndist) * 8 * (0.6 + pulse * 0.4);
    }
    
    // Connections between nodes (lines)
    let connections = 0;
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const [ax, ay] = nodePositions[i];
      const [bx, by] = nodePositions[i + 1];
      
      // Distance from point to line segment
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, Math.min(1, ((nx - ax) * dx + (ny - ay) * dy) / (len * len)));
      const projX = ax + t * dx;
      const projY = ay + t * dy;
      const lineDist = Math.sqrt((nx - projX) ** 2 + (ny - projY) ** 2);
      
      const pulse = Math.sin(time * 2 + t * 10 + i * 3) * 0.5 + 0.5;
      connections += Math.max(0, 0.03 - lineDist) * 15 * (0.3 + pulse * 0.7);
    }
    
    const value = circle * 0.4 + wave1 + wave2 + wave3 + radialPulse + nodes + connections;
    return Math.max(0, Math.min(1, value));
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
    const ripples = ripplesRef.current;

    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(width / CELL_W);
    const rows = Math.ceil(height / CELL_H);

    ctx.font = `${CELL_H - 4}px "SF Mono", SFMono-Regular, ui-monospace, Menlo, monospace`;
    ctx.textBaseline = 'top';

    // Mouse proximity tracking
    const mouseDist = (cx: number, cy: number) => {
      return Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
    };

    // Update hover time for smooth transitions
    const isHovering = mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height;
    if (isHovering) {
      hoverTimeRef.current = Math.min(1, hoverTimeRef.current + 0.02);
    } else {
      hoverTimeRef.current = Math.max(0, hoverTimeRef.current - 0.01);
    }

    // Update ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += 3;
      ripples[i].strength *= 0.97;
      if (ripples[i].strength < 0.01 || ripples[i].radius > ripples[i].maxRadius) {
        ripples.splice(i, 1);
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cx = col * CELL_W + CELL_W / 2;
        const cy = row * CELL_H + CELL_H / 2;

        // Base image value
        let value = getBaseValue(cx, cy, width, height, time);

        // Apply ripple distortions
        for (const ripple of ripples) {
          const rdist = Math.sqrt((cx - ripple.x) ** 2 + (cy - ripple.y) ** 2);
          const ringDist = Math.abs(rdist - ripple.radius);
          if (ringDist < 30) {
            const rippleEffect = Math.cos((ringDist / 30) * Math.PI * 0.5) * ripple.strength;
            value = Math.min(1, value + rippleEffect * 0.4);
          }
        }

        // Mouse proximity glow
        const md = mouseDist(cx, cy);
        if (md < 200) {
          const intensity = 1 - md / 200;
          value = Math.min(1, value + intensity * 0.25);
        }

        // Map to ASCII character
        const charIndex = Math.floor(value * (ASCII_RAMP.length - 1));
        const char = ASCII_RAMP[Math.min(charIndex, ASCII_RAMP.length - 1)];

        if (char === ' ') continue; // Skip empty cells for performance

        // Color: base is white, but near mouse or at high values, add color
        let alpha = value * 0.8;
        
        if (md < 200) {
          const intensity = 1 - md / 200;
          // Cycle through colors based on position
          const hue = (Math.atan2(cy - mouse.y, cx - mouse.x) * 180 / Math.PI + 360) % 360;
          const saturation = 60 + intensity * 40;
          const lightness = 50 + intensity * 20;
          alpha = Math.min(1, alpha + intensity * 0.3);
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        } else if (value > 0.6) {
          // High-value areas get subtle blue tint
          const blueness = (value - 0.6) / 0.4;
          ctx.fillStyle = `rgba(${150 + blueness * 50}, ${180 + blueness * 50}, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }

        ctx.fillText(char, col * CELL_W, row * CELL_H);
      }
    }

    // Subtle center text that's part of the image
    const centerAlpha = 0.15 + Math.sin(time * 0.5) * 0.05;
    ctx.font = `bold ${Math.min(width * 0.15, 120)}px "ABC Diatype Mono", "SF Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255, 255, 255, ${centerAlpha})`;
    ctx.fillText('AI', width / 2, height / 2);
    
    // Reset alignment
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    timeRef.current += 0.016;
    animFrameRef.current = requestAnimationFrame(render);
  }, [getBaseValue]);

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
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    ripplesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: 400,
      strength: 1,
      time: 0,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  return (
    <section className="relative bg-[#0a0a0b]">
      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair"
        style={{ minHeight: '500px', height: '60vh', maxHeight: '700px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
        
        {/* Overlay CTA */}
        <div className="absolute inset-0 flex flex-col items-end justify-end p-8 md:p-16 pointer-events-none">
          <a
            href="/ai"
            className="group pointer-events-auto inline-flex items-center gap-3 text-white/25 hover:text-white/80 transition-all duration-500 font-diatype-mono text-xs tracking-[0.15em] uppercase"
          >
            Enter
            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>

        {/* Top label */}
        <div className="absolute top-0 left-0 p-8 md:p-16 pointer-events-none">
          <span className="text-white/15 font-diatype-mono text-xs tracking-[0.2em] uppercase">
            Scott Bell · AI
          </span>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
