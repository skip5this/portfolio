import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { Footer } from '../components/Footer';

const defaultTweaks = {
  borderWidth: 2.25,
  borderColor: '#9E96B8',
  borderOpacity: 1,
  bgOpacity: 0.08,
  borderRadius: 7,
  transitionMs: 330,
  easing: 'ease-in-out' as string,
  tagBadgeBg: '#9E96B8',
  tagBadgeSize: 0.65,
  tagBadgeOffsetY: -22,
  hoverScale: 1,
  glowSpread: 0,
  glowOpacity: 0,
};

type Tweaks = typeof defaultTweaks;

/* ─── 1. Dev Tweaks Panel (floating, draggable — remove before production) ─── */
function DevTweaksPanel({ tweaks, onChange, onReset }: {
  tweaks: Tweaks;
  onChange: (key: keyof Tweaks, value: number | string) => void;
  onReset: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [pos, setPos] = useState({ x: 20, y: 80 });
  const dragRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);

  const onDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragRef.current = { sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      setPos({ x: dragRef.current.px + (ev.clientX - dragRef.current.sx), y: dragRef.current.py + (ev.clientY - dragRef.current.sy) });
    };
    const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [pos]);

  const slider = (label: string, key: keyof Tweaks, min: number, max: number, step: number) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{label}</span>
        <span style={{ fontSize: '0.7rem', color: '#9E96B8', fontFamily: "'SF Mono', monospace" }}>
          {typeof tweaks[key] === 'number' ? (tweaks[key] as number).toFixed(step < 1 ? 2 : step < 10 ? 1 : 0) : tweaks[key]}
        </span>
      </div>
      <input type="range" min={min} max={max} step={step} value={tweaks[key] as number}
        onChange={e => onChange(key, parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: '#9E96B8', height: 2 }} />
    </div>
  );

  return (
    <div data-control-panel="true" style={{
      position: 'fixed', top: pos.y, left: pos.x, zIndex: 10001,
      width: open ? 220 : 'auto',
      background: 'rgba(250,250,250,0.97)', border: '1px solid rgba(0,0,0,0.12)',
      borderRadius: 10, backdropFilter: 'blur(16px)',
      fontFamily: "-apple-system, sans-serif", overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    }}>
      <div onMouseDown={onDown} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 12px', cursor: 'grab', userSelect: 'none',
        borderBottom: open ? '1px solid rgba(0,0,0,0.08)' : 'none',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(0,0,0,0.9)', fontSize: '0.75rem', fontWeight: 600 }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.25)', letterSpacing: 2 }}>⠿</span> Dev Tweaks
        </span>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.3)', padding: 2 }}>
          <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease' }} />
        </button>
      </div>
      {open && (
        <div style={{ padding: '8px 12px 12px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 4 }}>Border</p>
          {slider('Width', 'borderWidth', 0.5, 4, 0.25)}
          {slider('Opacity', 'borderOpacity', 0, 1, 0.05)}
          {slider('Radius', 'borderRadius', 0, 16, 1)}
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 12 }}>Fill</p>
          {slider('Background', 'bgOpacity', 0, 0.3, 0.01)}
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 12 }}>Animation</p>
          {slider('Duration (ms)', 'transitionMs', 0, 500, 10)}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: '0.7rem', color: 'rgba(0,0,0,0.9)' }}>Easing</span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'].map(e => (
                <button key={e} onClick={() => onChange('easing', e)} style={{
                  padding: '2px 6px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  fontSize: '0.65rem', fontFamily: "'SF Mono', monospace",
                  background: tweaks.easing === e ? '#9E96B8' : 'rgba(0,0,0,0.06)',
                  color: tweaks.easing === e ? '#fff' : 'rgba(0,0,0,0.4)',
                }}>{e}</button>
              ))}
            </div>
          </div>
          {slider('Scale', 'hoverScale', 1, 1.1, 0.005)}
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 12 }}>Glow</p>
          {slider('Spread', 'glowSpread', 0, 20, 1)}
          {slider('Opacity', 'glowOpacity', 0, 0.5, 0.02)}
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 12 }}>Tag Badge</p>
          {slider('Size (rem)', 'tagBadgeSize', 0.5, 1, 0.05)}
          {slider('Offset Y', 'tagBadgeOffsetY', -30, 0, 1)}
          <p style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, marginTop: 12 }}>Color</p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {['#9E96B8', '#9E96B8', '#4ade80', '#f472b6', '#facc15', '#9E96B8', '#ef4444'].map(c => (
              <button key={c} onClick={() => { onChange('borderColor', c); onChange('tagBadgeBg', c); }} style={{
                width: 18, height: 18, borderRadius: 4, border: tweaks.borderColor === c ? '2px solid rgba(0,0,0,0.8)' : '1px solid rgba(0,0,0,0.15)',
                background: c, cursor: 'pointer', padding: 0,
              }} />
            ))}
          </div>
          <button onClick={onReset} style={{
            width: '100%', marginTop: 14, padding: '5px 0', borderRadius: 4,
            background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)',
            color: 'rgba(0,0,0,0.85)', fontSize: '0.7rem', cursor: 'pointer',
          }}>Reset defaults</button>
        </div>
      )}
    </div>
  );
}

/* ─── 2. LoopIn Toolbar (slim bar at bottom — like the real extension) ─── */
interface CapturedElement {
  tag: string;
  selector: string;
  dimensions: { width: number; height: number };
  text: string;
  html: string;
  clickX: number;
  clickY: number;
  posX: number;
  posY: number;
  videoFrame?: { currentTime: number; duration: number; paused: boolean };
}

function LoopInToolbar({ captureActive, onToggleCapture, captured, onDismissCapture, captures, onAddCapture, onSendAll, paused, onTogglePause }: {
  captureActive: boolean;
  onToggleCapture: () => void;
  paused: boolean;
  onTogglePause: () => void;
  captured: CapturedElement | null;
  onDismissCapture: () => void;
  captures: CapturedElement[];
  onAddCapture: (c: CapturedElement) => void;
  onSendAll: () => void;
}) {
  const [showList, setShowList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10002, background: '#111116', border: '1px solid rgba(158,150,184,0.3)',
          borderRadius: 10, padding: '10px 20px', color: '#fafafa', fontSize: '0.85rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)', animation: 'toastIn 0.25s ease',
          fontFamily: "-apple-system, sans-serif", whiteSpace: 'nowrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>🔗</span><span>{toast}</span>
          </div>
        </div>
      )}

      {/* Capture Info Panel — pops up above toolbar on click */}
      {captured && (
        <div data-control-panel="true" style={{
          position: 'fixed',
          top: captured.posY,
          left: captured.posX,
          width: 340, maxWidth: 'calc(100vw - 40px)', zIndex: 10000,
          background: '#0a0a0f', borderRadius: 14,
          boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          fontFamily: "-apple-system, sans-serif",
          animation: 'captureIn 0.2s ease',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: '#9E96B8', color: '#1a1a1a', fontSize: '0.65rem', fontWeight: 600,
                padding: '2px 8px', borderRadius: 4, fontFamily: "'SF Mono', monospace", textTransform: 'uppercase',
              }}>{captured.tag}</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', fontFamily: "'SF Mono', monospace" }}>
                {captured.dimensions.width}×{captured.dimensions.height}
              </span>
              {captured.videoFrame && (
                <span style={{ fontSize: '0.65rem', color: '#9E96B8', fontFamily: "'SF Mono', monospace" }}>
                  ▶ {captured.videoFrame.currentTime.toFixed(1)}s / {captured.videoFrame.duration.toFixed(1)}s
                </span>
              )}
            </div>
            <button onClick={onDismissCapture} style={{
              background: 'transparent', border: '1px solid transparent',
              borderRadius: 6, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px 8px', fontSize: '0.7rem',
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
            >✕</button>
          </div>
          <div style={{ padding: '16px 20px' }}>
            {/* Instruction */}
            <textarea placeholder='Add context... "Make this green"' style={{
              width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: 8, padding: '10px 12px', fontFamily: "-apple-system, sans-serif",
              fontSize: '0.8rem', color: '#fafafa', resize: 'none', height: 100, marginBottom: 16, outline: 'none',
            }} />
            {/* Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { if (captured) onAddCapture(captured); showToast('Capture saved to list'); onDismissCapture(); }} style={{
                flex: 1, padding: '10px 0', borderRadius: 8,
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >Capture</button>
              <button onClick={() => showToast('Connect LoopIn to your coding agent via MCP to send captures directly')} style={{
                flex: 1, padding: '10px 0', borderRadius: 8,
                background: '#9E96B8', border: 'none',
                color: '#1a1a1a', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7A7394'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#9E96B8'; }}
              >Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Capture List Panel */}
      {showList && captures.length > 0 && (
        <div data-control-panel="true" style={{
          position: 'fixed', bottom: 60, right: 20, width: 280, zIndex: 10000,
          background: '#0a0a0f', borderRadius: 12,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          fontFamily: "-apple-system, sans-serif", animation: 'captureIn 0.2s ease',
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#fafafa', fontWeight: 500 }}>Captures ({captures.length})</span>
            <button onClick={onSendAll} style={{
              padding: '4px 12px', borderRadius: 6, background: '#9E96B8', border: 'none',
              color: '#1a1a1a', fontSize: '0.7rem', fontWeight: 500, cursor: 'pointer',
            }}>Send all</button>
          </div>
          <div style={{ padding: '8px 16px 12px', maxHeight: 200, overflowY: 'auto' }}>
            {captures.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0',
                borderBottom: i < captures.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              }}>
                <span style={{
                  background: '#9E96B8', color: '#1a1a1a', fontSize: '0.6rem', fontWeight: 600,
                  padding: '1px 6px', borderRadius: 3, fontFamily: "'SF Mono', monospace",
                }}>{c.tag}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {c.text || c.selector}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings / MCP Panel */}
      {showSettings && !minimized && (
        <div data-control-panel="true" style={{
          position: 'fixed', bottom: 60, right: 20, width: 300, zIndex: 10000,
          background: '#0a0a0f', borderRadius: 12,
          boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
          fontFamily: "-apple-system, sans-serif", animation: 'captureIn 0.2s ease',
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#fafafa', margin: 0 }}>Connect to MCP</h3>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
              Link LoopIn to your coding agent
            </p>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, margin: '0 0 12px' }}>
              Add LoopIn as an MCP server in your agent's config to send captures directly.
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: 8, padding: '10px 12px', marginBottom: 12,
            }}>
              <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', margin: '0 0 6px', fontFamily: "'SF Mono', monospace" }}>Server address</p>
              <code style={{
                fontSize: '0.8rem', color: '#9E96B8', fontFamily: "'SF Mono', monospace",
              }}>ws://localhost:3456</code>
            </div>
            <a href="https://github.com/skip5this/LoopIn#setup" target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textAlign: 'center', padding: '8px 0', borderRadius: 8,
              background: '#9E96B8', color: '#1a1a1a', fontSize: '0.8rem', fontWeight: 500,
              textDecoration: 'none',
            }}>View setup guide</a>
          </div>
        </div>
      )}

      {/* Floating Toolbar — matches actual Chrome extension */}
      {!minimized && (<div data-control-panel="true" style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
        display: 'flex', alignItems: 'center', gap: 4,
        background: '#111116', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 4,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 12,
      }}>
        {/* Capture toggle */}
        <button onClick={onToggleCapture} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: captureActive ? 'rgba(158,150,184,0.12)' : 'transparent',
          color: captureActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
          fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em',
          transition: 'all 0.15s ease', whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => { if (!captureActive) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
          onMouseLeave={e => { if (!captureActive) e.currentTarget.style.background = 'transparent'; }}
        >
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: captureActive ? '#22c55e' : 'rgba(255,255,255,0.2)',
            boxShadow: 'none',
            animation: 'none',
          }} />
          Capture
        </button>

        {/* Pause */}
        <button onClick={onTogglePause} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: paused ? 'rgba(158,150,184,0.12)' : 'transparent',
          color: paused ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
          transition: 'all 0.15s ease',
        }}
          onMouseEnter={e => { if (!paused) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; } }}
          onMouseLeave={e => { if (!paused) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; } }}
          title={paused ? 'Resume videos' : 'Pause videos'}
        >
          {paused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          )}
        </button>

        {/* Tasks / Clipboard */}
        <button onClick={() => {
          if (captures.length === 0) { showToast('No captures saved yet'); return; }
          setShowList(!showList); setShowSettings(false);
        }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: showList ? 'rgba(6,182,212,0.15)' : 'transparent',
          color: showList ? '#9E96B8' : 'rgba(255,255,255,0.45)',
          transition: 'all 0.15s ease', position: 'relative',
        }}
          onMouseEnter={e => { if (!showList) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; } }}
          onMouseLeave={e => { if (!showList) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; } }}
          title="Task list"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
          </svg>
          {captures.length > 0 && (
            <span style={{
              position: 'absolute', top: 0, right: 0,
              width: 16, height: 16, background: '#9E96B8', borderRadius: 8,
              color: '#1a1a1a', fontSize: 10, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #111116',
            }}>{captures.length}</span>
          )}
        </button>

        {/* Settings */}
        <button onClick={() => { setShowSettings(!showSettings); setShowList(false); }} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'transparent', color: 'rgba(255,255,255,0.45)',
          transition: 'all 0.15s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          title="Settings"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>

        {/* Minimize */}
        <button onClick={() => setMinimized(true)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 8, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'transparent', color: 'rgba(255,255,255,0.45)',
          transition: 'all 0.15s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
          title="Minimize"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="14" y1="10" x2="21" y2="3" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>)}

      {/* Minimized state — just a small pill */}
      {minimized && (
        <button data-control-panel="true" onClick={() => setMinimized(false)} style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, background: '#111116', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
          color: 'rgba(255,255,255,0.5)', transition: 'all 0.15s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          title="Expand LoopIn"
        >
          {/* Maximize arrows — reversed direction */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          {captureActive && (
            <div style={{
              position: 'absolute', top: -2, right: -2,
              width: 10, height: 10, borderRadius: '50%',
              background: '#22c55e', border: '2px solid #111116',
            }} />
          )}
        </button>
      )}

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes captureIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loopinPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </>
  );
}

/* ─── Page-Level Hover Overlay ─── */
function PageOverlay({ tweaks, active, onHoverChange }: { tweaks: Tweaks; active: boolean; onHoverChange?: (tag: string | null) => void }) {
  const [hoverRect, setHoverRect] = useState<{ top: number; left: number; width: number; height: number; tag: string; label: string } | null>(null);
  const lastTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      setHoverRect(null);
      return;
    }

    const isControlPanel = (el: HTMLElement): boolean => {
      let node: HTMLElement | null = el;
      while (node) {
        if (node.dataset?.controlPanel || node.dataset?.overlay) return true;
        node = node.parentElement;
      }
      return false;
    };

    const handleMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === lastTarget.current) return;
      lastTarget.current = target;

      // Skip html, body, the overlay itself, and the control panel
      if (!target || target === document.body || target === document.documentElement) {
        setHoverRect(null);
        onHoverChange?.(null);
        return;
      }
      if (isControlPanel(target)) {
        setHoverRect(null);
        onHoverChange?.(null);
        return;
      }
      if (target.dataset?.overlay) return;

      const rect = target.getBoundingClientRect();

      // Skip elements that cover most of the viewport (full-page wrappers)
      if (rect.width >= window.innerWidth * 0.95 && rect.height >= window.innerHeight * 0.9) {
        setHoverRect(null);
        onHoverChange?.(null);
        return;
      }

      const tag = target.tagName.toLowerCase();
      // Build a richer label: tag.class or tag#id + dimensions
      let label = tag;
      if (target.id) {
        label += `#${target.id}`;
      } else if (target.className && typeof target.className === 'string') {
        const classes = target.className.trim().split(/\s+/).slice(0, 2).join('.');
        if (classes) label += `.${classes}`;
      }
      // If still bare (no class/id), add dimensions
      if (label === tag) {
        label += ` · ${Math.round(rect.width)}×${Math.round(rect.height)}`;
      }
      setHoverRect({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        tag,
        label,
      });
      onHoverChange?.(tag);
    };

    const handleLeave = () => {
      setHoverRect(null);
      lastTarget.current = null;
      onHoverChange?.(null);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [active, onHoverChange]);

  if (!active || !hoverRect) return null;

  const hexToRgb = (hex: string) => {
    const m = hex.replace('#', '').match(/.{2}/g);
    return m ? m.map(x => parseInt(x, 16)).join(',') : '34,211,238';
  };
  const rgb = hexToRgb(tweaks.borderColor);

  return (
    <>
      <div data-overlay="true" style={{
        position: 'absolute',
        top: hoverRect.top, left: hoverRect.left,
        width: hoverRect.width, height: hoverRect.height,
        border: `${tweaks.borderWidth}px solid rgba(${rgb},${tweaks.borderOpacity})`,
        background: `rgba(${rgb},${tweaks.bgOpacity})`,
        borderRadius: tweaks.borderRadius,
        pointerEvents: 'none',
        transition: `all ${tweaks.transitionMs}ms ${tweaks.easing}`,
        transform: `scale(${tweaks.hoverScale})`,
        boxShadow: tweaks.glowSpread > 0 ? `0 0 ${tweaks.glowSpread}px rgba(${rgb},${tweaks.glowOpacity})` : 'none',
        zIndex: 9998,
      }}>
        <span style={{
          position: 'absolute', top: tweaks.tagBadgeOffsetY, left: 0,
          background: tweaks.tagBadgeBg, color: '#1a1a1a',
          fontSize: `${tweaks.tagBadgeSize}rem`, fontWeight: 600,
          padding: '2px 6px', borderRadius: 3,
          fontFamily: "'SF Mono', monospace",
        }}>{hoverRect.label}</span>
      </div>
    </>
  );
}

/* ─── Collapsible Install Section ─── */

function CollapsibleInstall() {
  const [open, setOpen] = useState(false);
  const [copiedMcp, setCopiedMcp] = useState(false);

  const mcpConfig = `{
  "mcpServers": {
    "loopin": {
      "command": "node",
      "args": ["/path/to/loopin/dist/server.js"]
    }
  }
}`;

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <button
        data-control-panel="true"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, padding: '1rem 1.5rem',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
          transition: 'all 0.15s ease',
        }}
      >
        <span>Can't wait? Install from source</span>
        <ChevronDown size={14} style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
        }} />
      </button>

      {open && (
        <div style={{ padding: '0 0 2rem', animation: 'fadeIn 0.2s ease' }}>
          <div className="space-y-8" style={{ textAlign: 'center' }}>
            {/* Step 1 */}
            <div>
              <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>01</p>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.4rem', color: '#fafafa' }}>Clone &amp; load extension</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Clone the repo. Open <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>chrome://extensions</code>, enable Developer mode, load the <code style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.8rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>extension/</code> folder.
              </p>
              <div
                className="inline-flex items-center gap-3 cursor-pointer"
                style={{
                  background: '#111113',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: '0.75rem 1.25rem',
                  fontFamily: "'SF Mono', monospace",
                  fontSize: '0.85rem',
                }}
                onClick={() => navigator.clipboard.writeText('git clone https://github.com/skip5this/LoopIn')}
              >
                <span style={{ color: 'rgba(255,255,255,0.35)' }}>$</span>
                <span style={{ color: '#4ade80' }}>git clone</span>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>https://github.com/skip5this/LoopIn</span>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>02</p>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.75rem', color: '#fafafa' }}>Add MCP config</h3>
              <div className="relative text-left">
                <pre style={{
                  background: '#111113',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  padding: '1rem 1.25rem',
                  fontFamily: "'SF Mono', monospace",
                  fontSize: '0.8rem',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.6)',
                  overflowX: 'auto',
                }}>
                  {mcpConfig}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(mcpConfig);
                    setCopiedMcp(true);
                    setTimeout(() => setCopiedMcp(false), 2000);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', color: copiedMcp ? '#4ade80' : 'rgba(255,255,255,0.4)' }}
                >
                  {copiedMcp ? '✓' : '⎘'}
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>03</p>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.4rem', color: '#fafafa' }}>Start capturing</h3>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '0.6rem 1rem',
              }}>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Toggle capture mode</span>
                <kbd style={{
                  fontFamily: "'SF Mono', monospace", fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '3px 8px', borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>⌘ Shift C</kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Page ─── */

export function LoopIn() {
  const [tweaks, setTweaks] = useState<Tweaks>({ ...defaultTweaks });
  const [captureActive, setCaptureActive] = useState(true);
  const [videoPaused, setVideoPaused] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);
  const [captured, setCaptured] = useState<CapturedElement | null>(null);
  const capturedRef = useRef(captured);
  capturedRef.current = captured;
  const [captures, setCaptures] = useState<CapturedElement[]>([]);
  const updateTweak = useCallback((key: keyof Tweaks, value: number | string) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
  }, []);
  const resetTweaks = useCallback(() => setTweaks({ ...defaultTweaks }), []);

  const toggleVideoPause = useCallback(() => {
    const videos = document.querySelectorAll('video');
    const shouldPause = !videoPaused;
    videos.forEach(v => shouldPause ? v.pause() : v.play());
    setVideoPaused(shouldPause);
  }, [videoPaused]);

  // Click handler for capturing elements
  useEffect(() => {
    if (!captureActive) return;
    const handleClick = (e: MouseEvent) => {
      if (capturedRef.current) return; // already showing a capture panel
      const target = e.target as HTMLElement;
      if (!target || target === document.body || target === document.documentElement) return;
      // Skip control panels
      let node: HTMLElement | null = target;
      while (node) {
        if (node.dataset?.controlPanel || node.dataset?.overlay) return;
        node = node.parentElement;
      }
      // Skip nav links
      if (target.closest('nav') || target.closest('a[href]')) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      const rect = target.getBoundingClientRect();
      const tag = target.tagName.toLowerCase();
      const classes = target.className && typeof target.className === 'string' ? `.${target.className.split(' ').slice(0, 2).join('.')}` : '';
      // Only include video frame data when clicking directly on a video element
      let videoFrame: CapturedElement['videoFrame'] | undefined;
      const videoEl = target.tagName === 'VIDEO' ? target as HTMLVideoElement : target.closest('video') as HTMLVideoElement | null;
      if (videoEl) {
        videoFrame = { currentTime: videoEl.currentTime, duration: videoEl.duration, paused: videoEl.paused };
      }

      setCaptured({
        tag,
        selector: `${tag}${classes}`,
        dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
        text: target.textContent?.slice(0, 80) || '',
        html: target.outerHTML.slice(0, 200),
        clickX: e.clientX,
        clickY: e.clientY,
        posX: Math.min(e.clientX + 10, window.innerWidth - 360),
        posY: Math.min(e.clientY + 10, window.innerHeight - 350),
        videoFrame,
      });
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [captureActive]);

  return (
    <div className="min-h-screen" style={{
      position: 'relative',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
      background: '#09090b',
      color: '#fafafa',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 1.6,
      cursor: captureActive ? 'crosshair' : 'default',
    }}>

      {/* Page-level hover overlay */}
      <PageOverlay tweaks={tweaks} active={captureActive && !captured} onHoverChange={setHoveredTag} />

      {/* Dev Tweaks Panel (remove before production) */}
      {/* <DevTweaksPanel tweaks={tweaks} onChange={updateTweak} onReset={resetTweaks} /> */}

      {/* LoopIn Toolbar + Capture Panel */}
      <LoopInToolbar
        captureActive={captureActive}
        onToggleCapture={() => setCaptureActive(p => !p)}
        paused={videoPaused}
        onTogglePause={toggleVideoPause}
        captured={captured}
        onDismissCapture={() => setCaptured(null)}
        captures={captures}
        onAddCapture={(c) => setCaptures(prev => [...prev, c])}
        onSendAll={() => setCaptures([])}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between" style={{
        background: 'rgba(9,9,11,0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 2rem',
      }}>
        <Link
          to="/"
          className="flex items-center gap-2 no-underline transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fafafa')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/loopin/case-study"
            className="no-underline transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fafafa')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            Case Study
          </Link>
          <a
            href="https://github.com/skip5this/LoopIn"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors flex items-center gap-1.5"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fafafa')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '8rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          {/* Chrome Web Store badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(158,150,184,0.1)',
            border: '1px solid rgba(158,150,184,0.2)',
            borderRadius: 100, padding: '6px 16px',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#9E96B8', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.8rem', color: '#9E96B8',
              fontWeight: 500, letterSpacing: '0.02em',
            }}>Coming to Chrome Web Store</span>
          </div>

          {/* Logo + Name */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 12, marginBottom: '1.5rem',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/loopin-icon.png" alt="LoopIn" style={{ width: 56, height: 56, objectFit: 'contain' }} />
            </div>
            <span style={{
              fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em',
              color: '#fafafa',
            }}>LoopIn</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            marginBottom: '1.5rem',
          }}>
            Give your AI<br />agent eyes.
          </h1>

          {/* Lead */}
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 480,
            margin: '0 auto 1rem',
            lineHeight: 1.6,
          }}>
            Your AI coding agent is powerful but blind. It can write code, refactor components, and debug — but it can't see what you're looking at in the browser.
          </p>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 480,
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}>
            LoopIn fixes that. Point. Click. Your agent gets full context — DOM, styles, accessibility data, component hierarchy.
          </p>

          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '0.5rem',
          }}>
            Chrome Extension · MCP Server · Open Source
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          How it works
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          {[
            { step: '01', title: 'Activate', desc: 'Toggle capture mode with ⌘⇧C or the extension icon.' },
            { step: '02', title: 'Click', desc: 'Click any element. LoopIn captures DOM, styles, a11y data, and React components.' },
            { step: '03', title: 'Send', desc: 'Add context and send directly to your agent via MCP. Zero copy-paste.' },
          ].map(item => (
            <div key={item.step}>
              <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>{item.step}</p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* Architecture Flow */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Architecture
        </h2>

        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '75%',
            margin: '0 auto',
            display: 'block',
          }}
        >
          <source src="/loopin-architecture.webm?v=4" type="video/webm" />
          <source src="/loopin-architecture.mp4?v=4" type="video/mp4" />
        </video>

        <p style={{
          fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
          textAlign: 'center', marginTop: '1.5rem',
        }}>
          All data stays local. Nothing leaves your machine.
        </p>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* Feature Grid */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          textAlign: 'center',
          marginBottom: '2.5rem',
        }}>
          Everything your agent needs.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          {[
            { label: 'HTML', title: 'Element', desc: 'Tag, classes, inner content.' },
            { label: 'CSS', title: 'Styles', desc: 'Computed colors, spacing, layout.' },
            { label: 'DOM', title: 'Selector', desc: 'Unique path to the element.' },
            { label: 'A11Y', title: 'Accessibility', desc: 'ARIA roles, labels, attributes.' },
            { label: 'JSX', title: 'Components', desc: 'React hierarchy via fiber tree.' },
            { label: 'CTX', title: 'Context', desc: 'Heading context, data attributes.' },
            /* Text Select, Freeze, Task List removed — not core to agent needs */
          ].map((item, i) => (
            <div key={i} style={{ background: '#111113', padding: '1.25rem' }}>
              <p style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: '0.75rem',
                color: '#9E96B8',
                marginBottom: '0.4rem',
              }}>{item.label}</p>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: '0.3rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <p style={{
          fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
          textAlign: 'center', marginTop: '2rem', lineHeight: 1.6,
          maxWidth: 440, marginLeft: 'auto', marginRight: 'auto',
        }}>
          Built for builders working with Claude, Cursor, Copilot, or any MCP-compatible agent.
        </p>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* CTA */}
      <section className="text-center" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Chrome Web Store banner */}
          <div style={{
            background: '#111113',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '2.5rem 2rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: '1rem',
            }}>
              {/* Chrome icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" fill="rgba(255,255,255,0.3)" />
              </svg>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>Chrome Web Store</span>
            </div>
            <h2 style={{
              fontSize: '1.5rem', fontWeight: 600,
              letterSpacing: '-0.02em', marginBottom: '0.5rem',
            }}>
              Coming soon.
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem',
              marginBottom: '1.5rem',
            }}>
              LoopIn is being prepared for the Chrome Web Store. One-click install, auto-updates.
            </p>
            <a
              href="https://github.com/skip5this/LoopIn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#fafafa',
                color: '#09090b',
                fontWeight: 600,
                borderRadius: 6,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Star on GitHub
            </a>
          </div>

          {/* Secondary links */}
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/loopin/case-study"
              style={{
                color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* Collapsed install section */}
      <section style={{ padding: '2rem 1.5rem 4rem' }}>
        <CollapsibleInstall />
      </section>

      <Footer />

      {/* Spacer for toolbar */}
      <div style={{ height: 50 }} />
    </div>
  );
}
