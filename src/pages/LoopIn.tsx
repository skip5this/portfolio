import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { Footer } from '../components/Footer';

/* ─── Interactive Demo Component ─── */

interface CapturedElement {
  tag: string;
  selector: string;
  dimensions: { width: number; height: number };
  text: string;
  html: string;
  rect: DOMRect;
}

function InteractiveDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ rect: DOMRect; tag: string } | null>(null);
  const [captured, setCaptured] = useState<CapturedElement | null>(null);
  const [showSource, setShowSource] = useState(false);
  const [instruction, setInstruction] = useState('');

  const getRelativeRect = useCallback((rect: DOMRect) => {
    if (!demoRef.current) return { top: 0, left: 0, width: 0, height: 0 };
    const parent = demoRef.current.getBoundingClientRect();
    return {
      top: rect.top - parent.top,
      left: rect.left - parent.left,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    if (captured) return;
    const target = e.target as HTMLElement;
    if (!target.dataset.demo) return;
    e.stopPropagation();
    setHovered({ rect: target.getBoundingClientRect(), tag: target.tagName.toLowerCase() });
  }, [captured]);

  const handleMouseLeave = useCallback(() => {
    if (!captured) setHovered(null);
  }, [captured]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.dataset.demo) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = target.getBoundingClientRect();
    const tag = target.tagName.toLowerCase();
    const classes = target.className ? `.${target.className.split(' ').slice(0, 2).join('.')}` : '';
    setCaptured({
      tag,
      selector: `${tag}${classes}`,
      dimensions: { width: Math.round(rect.width), height: Math.round(rect.height) },
      text: target.textContent?.slice(0, 80) || '',
      html: target.outerHTML.slice(0, 200),
      rect,
    });
    setHovered(null);
  }, []);

  const close = () => {
    setCaptured(null);
    setShowSource(false);
    setInstruction('');
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Demo label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
      }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
          background: '#4ade80', animation: 'pulse 2s infinite',
        }} />
        <span style={{
          fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
          fontFamily: "'SF Mono', monospace", letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Live demo — hover &amp; click elements below
        </span>
      </div>

      {/* Demo area */}
      <div
        ref={demoRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          position: 'relative',
          background: '#111113',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '2rem',
          cursor: captured ? 'default' : 'crosshair',
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Mock UI elements */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div data-demo="true" style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #635bff)',
          }} />
          <div>
            <h4 data-demo="true" style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, color: '#fafafa' }}>
              Acme Dashboard
            </h4>
            <p data-demo="true" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              Settings → Profile
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <button data-demo="true" style={{
            padding: '8px 16px', borderRadius: 6,
            background: '#6366f1', border: 'none', color: '#fff',
            fontSize: '0.85rem', fontWeight: 500, cursor: 'crosshair',
          }}>Save changes</button>
          <button data-demo="true" style={{
            padding: '8px 16px', borderRadius: 6,
            background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', cursor: 'crosshair',
          }}>Cancel</button>
        </div>

        <div data-demo="true" style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 8, padding: '12px 16px',
          fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)',
        }}>
          Your profile has been updated successfully. Changes will take effect on next login.
        </div>

        {/* Hover overlay */}
        {hovered && demoRef.current && (() => {
          const r = getRelativeRect(hovered.rect);
          return (
            <div style={{
              position: 'absolute',
              top: r.top, left: r.left,
              width: r.width, height: r.height,
              border: '1.5px solid #6366f1',
              background: 'rgba(99,102,241,0.08)',
              borderRadius: 4,
              pointerEvents: 'none',
              transition: 'all 0.1s ease',
            }}>
              <span style={{
                position: 'absolute', top: -22, left: 0,
                background: '#6366f1', color: '#fff',
                fontSize: '0.65rem', fontWeight: 600,
                padding: '2px 6px', borderRadius: 3,
                fontFamily: "'SF Mono', monospace",
              }}>{hovered.tag}</span>
            </div>
          );
        })()}
      </div>

      {/* Capture dialog */}
      {captured && (
        <div style={{
          position: 'absolute', bottom: -8, right: -8,
          width: 340, maxWidth: 'calc(100% - 16px)',
          background: '#111113',
          border: '0.5px solid rgba(255,255,255,0.1)',
          borderRadius: 10,
          padding: '1.25rem',
          zIndex: 10,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                background: '#6366f1', color: '#fff',
                fontSize: '0.7rem', fontWeight: 600,
                padding: '2px 8px', borderRadius: 4,
                fontFamily: "'SF Mono', monospace",
                textTransform: 'uppercase',
              }}>{captured.tag}</span>
              <span style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
                fontFamily: "'SF Mono', monospace",
              }}>Element captured</span>
            </div>
            <button onClick={close} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', padding: 4,
            }}>
              <X size={14} />
            </button>
          </div>

          {/* Selector */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 6, padding: '8px 10px', marginBottom: 12,
            fontFamily: "'SF Mono', monospace", fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.6)', wordBreak: 'break-all',
          }}>
            {captured.selector}
          </div>

          {/* Dimensions */}
          <div style={{
            display: 'flex', gap: 16, marginBottom: 12,
            fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)',
            fontFamily: "'SF Mono', monospace",
          }}>
            <span>{captured.dimensions.width} × {captured.dimensions.height}px</span>
          </div>

          {/* Source toggle */}
          <button
            onClick={() => setShowSource(!showSource)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6366f1', fontSize: '0.75rem',
              fontFamily: "'SF Mono', monospace",
              padding: 0, marginBottom: showSource ? 8 : 12,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <ChevronDown size={12} style={{
              transform: showSource ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
            }} />
            View source
          </button>
          {showSource && (
            <pre style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 6, padding: '8px 10px', marginBottom: 12,
              fontFamily: "'SF Mono', monospace", fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.5)', overflowX: 'auto',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
              maxHeight: 80,
            }}>
              {captured.html}
            </pre>
          )}

          {/* Instruction input */}
          <textarea
            value={instruction}
            onChange={e => setInstruction(e.target.value)}
            placeholder="Add context... &quot;Make this green&quot;"
            style={{
              width: '100%', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 6, padding: '8px 10px',
              fontFamily: "-apple-system, sans-serif",
              fontSize: '0.8rem', color: '#fafafa',
              resize: 'none', height: 56, marginBottom: 12,
              outline: 'none',
            }}
          />

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              title="Demo mode — install LoopIn to capture for real"
              style={{
                flex: 1, padding: '8px 0', borderRadius: 6,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem',
                fontWeight: 500, cursor: 'not-allowed',
              }}
            >Capture only</button>
            <button
              title="Demo mode — install LoopIn to send to your agent"
              style={{
                flex: 1, padding: '8px 0', borderRadius: 6,
                background: 'rgba(99,102,241,0.3)',
                border: '1px solid rgba(99,102,241,0.4)',
                color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem',
                fontWeight: 500, cursor: 'not-allowed',
              }}
            >Send</button>
          </div>

          <p style={{
            fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)',
            textAlign: 'center', marginTop: 8, marginBottom: 0,
          }}>
            This is a demo. Install LoopIn to capture &amp; send to your agent.
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
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
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 8, padding: '1rem 0',
          color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem',
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
  return (
    <div className="min-h-screen" style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
      background: '#09090b',
      color: '#fafafa',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 1.6,
    }}>

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
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 100, padding: '6px 16px',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#6366f1', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.8rem', color: '#6366f1',
              fontWeight: 500, letterSpacing: '0.02em',
            }}>Coming to Chrome Web Store</span>
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

      {/* Interactive Demo */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <InteractiveDemo />
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

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
      <section style={{ padding: '5rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
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

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 0, flexWrap: 'wrap',
        }}>
          {[
            { label: 'Browser', sub: 'Chrome Extension' },
            { label: 'WebSocket', sub: 'Local server' },
            { label: 'MCP Server', sub: 'stdio' },
            { label: 'AI Agent', sub: 'Claude / Cursor / etc.' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '0.75rem 1.25rem',
                textAlign: 'center',
                minWidth: 100,
              }}>
                <p style={{ fontSize: '0.85rem', fontWeight: 500, margin: 0, color: '#fafafa' }}>{item.label}</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', margin: 0, fontFamily: "'SF Mono', monospace" }}>{item.sub}</p>
              </div>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', padding: '0 8px' }}>→</span>
              )}
            </div>
          ))}
        </div>

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
            { label: 'TXT', title: 'Text Select', desc: 'Highlight and capture text.' },
            { label: 'FRZ', title: 'Freeze', desc: 'Pause animations mid-state.' },
            { label: 'LOG', title: 'Task List', desc: 'Track captures in a session panel.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#111113', padding: '1.25rem' }}>
              <p style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: '0.75rem',
                color: '#635bff',
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
    </div>
  );
}
