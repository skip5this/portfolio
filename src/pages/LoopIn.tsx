import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Footer } from '../components/Footer';
import { LoopInTerminalDemo } from '../components/LoopInTerminalDemo';

export function LoopIn() {
  const [copiedMcp, setCopiedMcp] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const mcpConfig = `{
  "mcpServers": {
    "loopin": {
      "command": "node",
      "args": ["/path/to/loopin/dist/server.js"]
    }
  }
}`;

  const copyMcpConfig = () => {
    navigator.clipboard.writeText(mcpConfig);
    setCopiedMcp(true);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="min-h-screen" style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif",
      background: '#09090b',
      color: '#fafafa',
      WebkitFontSmoothing: 'antialiased',
      lineHeight: 1.6,
    }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8" style={{
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
      <section className="min-h-screen flex flex-col justify-center items-center text-center" style={{ padding: '6rem 2rem 4rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Tag */}
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            Chrome Extension · MCP Server · Open Source
          </p>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.75rem, 10vw, 5rem)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            marginBottom: '1.5rem',
          }}>
            Click it.<br />Send it.<br />Fix it.
          </h1>

          {/* Lead */}
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 440,
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}>
            Tighten the loop between your browser and your agent. Click any element, add context, send it directly.
          </p>

          {/* Install command */}
          <div 
            className="inline-flex items-center gap-3 cursor-pointer transition-colors"
            style={{
              background: '#111113',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '0.875rem 1.5rem',
              fontFamily: "'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Code', monospace",
              fontSize: '0.95rem',
            }}
            onClick={() => {
              navigator.clipboard.writeText('git clone https://github.com/skip5this/LoopIn');
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>$</span>
            <span style={{ color: '#4ade80' }}>git clone</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>https://github.com/skip5this/LoopIn</span>
          </div>

          <p style={{
            marginTop: '1.25rem',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            Load as unpacked extension in Chrome. Connect to <a href="https://claude.ai/code" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Claude Code</a> via MCP.
          </p>
        </div>
      </section>

      {/* Terminal Demo */}
      <section style={{ padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <LoopInTerminalDemo />
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* How It Works */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
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

        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>01</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.4rem' }}>Click</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Toggle capture mode. Click any element on any page.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>02</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.4rem' }}>Annotate</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Add context. "Make this green." "Fix the spacing."
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>03</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.4rem' }}>Send</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Your agent gets HTML, styles, a11y data, and React components via MCP.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* What Gets Captured */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '1.75rem',
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
            { label: 'A11Y', title: 'Accessibility', desc: 'ARIA roles, labels, and attributes.' },
            { label: 'JSX', title: 'Components', desc: 'React component hierarchy via fiber tree.' },
            { label: 'CTX', title: 'Context', desc: 'Heading context, data attributes.' },
            { label: 'TXT', title: 'Text Select', desc: 'Highlight and capture text passages.' },
            { label: 'FRZ', title: 'Freeze', desc: 'Pause animations to capture exact states.' },
            { label: 'LOG', title: 'Task List', desc: 'Track all captures in a live session panel.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#111113', padding: '1.5rem' }}>
              <p style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: '0.8rem',
                color: '#635bff',
                marginBottom: '0.5rem',
              }}>{item.label}</p>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '0.4rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', maxWidth: 640, margin: '0 auto' }} />

      {/* Setup */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          Setup
        </h2>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="text-center">
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>01</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.4rem' }}>Load the extension</h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Clone the repo. Open <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.85rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>chrome://extensions</span>, enable Developer mode, load the <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.85rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4 }}>extension/</span> folder.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>02</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.75rem' }}>Add to Claude Code</h3>
            <div className="relative text-left">
              <pre style={{
                background: '#111113',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: '1rem 1.25rem',
                fontFamily: "'SF Mono', SFMono-Regular, ui-monospace, monospace",
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.7)',
                overflowX: 'auto',
              }}>
                {mcpConfig}
              </pre>
              <button
                onClick={copyMcpConfig}
                className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {copiedMcp ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                )}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <p style={{ fontFamily: "'SF Mono', monospace", fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>03</p>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 500, marginBottom: '0.75rem' }}>Start capturing</h3>
            
            {/* Keyboard shortcut */}
            <div className="flex items-center justify-between text-left" style={{
              background: '#111113',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '0.75rem 1.25rem',
              marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '0.95rem' }}>Toggle capture mode</span>
              <kbd style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
                background: 'rgba(255,255,255,0.06)',
                padding: '4px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.06)',
              }}>⌘ Shift C</kbd>
            </div>

            {/* Example prompts */}
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>
              Try asking your agent:
            </p>
            <div className="space-y-2 text-left">
              {[
                "What did I just capture?",
                "List all my captures",
                "Any pending tasks?"
              ].map((prompt, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between cursor-pointer transition-colors group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 8,
                    padding: '0.65rem 1rem',
                  }}
                  onClick={() => copyPrompt(prompt)}
                >
                  <code style={{
                    fontFamily: "'SF Mono', monospace",
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.5)',
                  }}>{prompt}</code>
                  {copiedPrompt === prompt ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-20 group-hover:opacity-40 transition-opacity" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center" style={{
        padding: '6rem 1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            Built for agents.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1rem',
            marginBottom: '2rem',
          }}>
            Works anywhere — production sites, competitor UIs, design inspiration.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/skip5this/LoopIn"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity"
              style={{
                padding: '0.8rem 1.25rem',
                background: '#fafafa',
                color: '#09090b',
                fontWeight: 600,
                border: 'none',
                borderRadius: 6,
                fontSize: '0.9rem',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              View on GitHub
            </a>
            <Link
              to="/loopin/case-study"
              className="transition-colors"
              style={{
                padding: '0.8rem 1.25rem',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
