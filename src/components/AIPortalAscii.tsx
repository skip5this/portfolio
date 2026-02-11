import React, { useRef, useEffect, useCallback } from 'react';

/**
 * Concept 1: Living ASCII Field
 * 
 * A field of random characters on black. As the mouse moves,
 * characters in a radius transform — noise becomes signal.
 * "AI TOOLS" emerges from the chaos around the cursor.
 * Characters glow with color as they activate.
 */

const CHARS_NOISE = '01@#$%&*+=<>{}[]|/\\~`^?!;:,.·';
const CHARS_ACTIVE = '10';
const HIDDEN_WORDS = ['AI', 'TOOLS', 'AGENT', 'BUILD', 'LOOP', 'CODE', 'DESIGN'];

interface Cell {
  char: string;
  targetChar: string;
  x: number;
  y: number;
  brightness: number;
  targetBrightness: number;
  hue: number;
  noiseOffset: number;
  wordChar: string | null;
  flickerSpeed: number;
}

export function AIPortalAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cellsRef = useRef<Cell[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const CELL_SIZE = 16;
  const REVEAL_RADIUS = 150;
  const GLOW_RADIUS = 250;

  const initCells = useCallback((width: number, height: number) => {
    const cols = Math.ceil(width / CELL_SIZE);
    const rows = Math.ceil(height / CELL_SIZE);
    const cells: Cell[] = [];

    // Place hidden words at random positions
    const wordPlacements: { x: number; y: number; char: string; hue: number }[] = [];
    const hues = [220, 170, 0, 280, 350]; // blue, teal, yellow, purple, coral
    
    for (let i = 0; i < 40; i++) {
      const word = HIDDEN_WORDS[Math.floor(Math.random() * HIDDEN_WORDS.length)];
      const startCol = Math.floor(Math.random() * (cols - word.length));
      const row = Math.floor(Math.random() * rows);
      const hue = hues[Math.floor(Math.random() * hues.length)];
      
      for (let c = 0; c < word.length; c++) {
        wordPlacements.push({
          x: startCol + c,
          y: row,
          char: word[c],
          hue
        });
      }
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const wordPlacement = wordPlacements.find(w => w.x === col && w.y === row);
        
        cells.push({
          char: CHARS_NOISE[Math.floor(Math.random() * CHARS_NOISE.length)],
          targetChar: CHARS_NOISE[Math.floor(Math.random() * CHARS_NOISE.length)],
          x: col * CELL_SIZE,
          y: row * CELL_SIZE,
          brightness: 0.06 + Math.random() * 0.04,
          targetBrightness: 0.06 + Math.random() * 0.04,
          hue: wordPlacement ? wordPlacement.hue : 0,
          noiseOffset: Math.random() * Math.PI * 2,
          wordChar: wordPlacement ? wordPlacement.char : null,
          flickerSpeed: 0.5 + Math.random() * 2,
        });
      }
    }

    cellsRef.current = cells;
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mouse = mouseRef.current;
    const time = timeRef.current;

    ctx.fillStyle = '#0a0a0b';
    ctx.fillRect(0, 0, width, height);

    ctx.font = `${CELL_SIZE - 2}px "SF Mono", SFMono-Regular, ui-monospace, Menlo, monospace`;
    ctx.textBaseline = 'top';

    for (const cell of cellsRef.current) {
      const dx = mouse.x - (cell.x + CELL_SIZE / 2);
      const dy = mouse.y - (cell.y + CELL_SIZE / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Determine target state based on mouse proximity
      if (dist < REVEAL_RADIUS) {
        const intensity = 1 - (dist / REVEAL_RADIUS);
        cell.targetBrightness = 0.4 + intensity * 0.6;
        
        if (cell.wordChar) {
          cell.targetChar = cell.wordChar;
        } else {
          cell.targetChar = CHARS_ACTIVE[Math.floor(Math.random() * CHARS_ACTIVE.length)];
        }
      } else if (dist < GLOW_RADIUS) {
        const intensity = 1 - ((dist - REVEAL_RADIUS) / (GLOW_RADIUS - REVEAL_RADIUS));
        cell.targetBrightness = 0.06 + intensity * 0.2;
        cell.targetChar = CHARS_NOISE[Math.floor(Math.random() * CHARS_NOISE.length)];
      } else {
        cell.targetBrightness = 0.04 + Math.sin(time * cell.flickerSpeed + cell.noiseOffset) * 0.03;
        
        // Slowly cycle noise characters
        if (Math.random() < 0.01) {
          cell.targetChar = CHARS_NOISE[Math.floor(Math.random() * CHARS_NOISE.length)];
        }
      }

      // Lerp brightness
      cell.brightness += (cell.targetBrightness - cell.brightness) * 0.12;
      
      // Swap char occasionally
      if (Math.random() < 0.08 || (dist < REVEAL_RADIUS && cell.char !== cell.targetChar)) {
        cell.char = cell.targetChar;
      }

      // Color: word chars get their hue, others get subtle white
      if (cell.wordChar && dist < REVEAL_RADIUS) {
        const intensity = 1 - (dist / REVEAL_RADIUS);
        const saturation = 80 + intensity * 20;
        const lightness = 40 + intensity * 30;
        ctx.fillStyle = `hsla(${cell.hue}, ${saturation}%, ${lightness}%, ${cell.brightness})`;
      } else if (dist < GLOW_RADIUS) {
        // Subtle color bleed near cursor
        const nearestWord = cellsRef.current.find(c => 
          c.wordChar && 
          Math.abs(c.x - cell.x) < CELL_SIZE * 3 && 
          Math.abs(c.y - cell.y) < CELL_SIZE * 3
        );
        if (nearestWord && dist < REVEAL_RADIUS * 1.5) {
          ctx.fillStyle = `hsla(${nearestWord.hue}, 40%, 60%, ${cell.brightness * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${cell.brightness})`;
        }
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${cell.brightness})`;
      }

      ctx.fillText(cell.char, cell.x + 2, cell.y + 2);
    }

    // Draw thin grid lines (very subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    const gridSpacing = CELL_SIZE * 8;
    
    for (let x = gridSpacing; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = gridSpacing; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
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
      initCells(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);
    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initCells, render]);

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
        style={{ minHeight: '500px', height: '60vh', maxHeight: '700px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
        />
        
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center pointer-events-auto">
            <a
              href="/ai"
              className="group inline-flex items-center gap-2 text-white/30 hover:text-white/80 transition-all duration-500 font-diatype-mono text-sm tracking-[0.2em] uppercase"
            >
              <span className="w-8 h-px bg-white/20 group-hover:bg-white/60 group-hover:w-12 transition-all duration-500" />
              Explore AI Work
              <span className="w-8 h-px bg-white/20 group-hover:bg-white/60 group-hover:w-12 transition-all duration-500" />
            </a>
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#e5e5e5] to-transparent" />
      </div>
    </section>
  );
}
