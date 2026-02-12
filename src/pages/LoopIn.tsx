import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Github } from 'lucide-react';
import { Footer } from '../components/Footer';
import { AnimatedLink } from '../components/AnimatedLink';
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
    <div className="font-sans text-gray-800 bg-[#0c0c0c] min-h-screen">
      {/* Header */}
      <header className="bg-[#0c0c0c]/80 backdrop-blur-xl border-b border-white/[0.06] fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-diatype">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — Typography-driven, full dark */}
      <section className="pt-48 pb-32 md:pt-56 md:pb-40 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-diatype-mono font-normal text-white mb-8 tracking-[-0.03em]">
            LoopIn
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] leading-[1.75] tracking-[-0.02em] font-diatype font-light text-white/90 max-w-4xl mb-8">
            Tighten the loop between your browser and your agent.
          </p>
          
          <p className="text-lg md:text-xl font-diatype text-white/40 max-w-2xl leading-[1.75]">
            Click any element on any webpage. Add context. Send it straight to your coding agent. No more screenshots or copy-pasting HTML.
          </p>
        </div>
      </section>

      {/* How It Works — tight, confident */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/[0.06]">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-12 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-lg md:text-xl font-diatype-mono font-normal text-white/50 mb-20 uppercase tracking-[0.1em]">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            <div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Click any element
              </h3>
              <p className="text-base lg:text-lg font-diatype text-white/40 leading-[1.75]">
                Toggle capture mode and click on anything. LoopIn grabs the HTML, computed styles, and selector automatically.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Add context
              </h3>
              <p className="text-base lg:text-lg font-diatype text-white/40 leading-[1.75]">
                Tell your agent what you want. "Make this button green." "Fix the alignment." "Add a hover effect."
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Claude sees it
              </h3>
              <p className="text-base lg:text-lg font-diatype text-white/40 leading-[1.75]">
                Your agent gets the element data via MCP. It sees exactly what you see — selector, styles, and all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo — with context */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-12 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-lg md:text-xl font-diatype-mono font-normal text-white/50 mb-12 uppercase tracking-[0.1em]">
            See it in action
          </h2>
          
          <LoopInTerminalDemo />
        </div>
      </section>

      {/* Get Started — merged installation + quick start */}
      <section className="py-24 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/[0.06]">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-12 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-lg md:text-xl font-diatype-mono font-normal text-white/50 mb-20 uppercase tracking-[0.1em]">
            Get started
          </h2>
          
          <div className="max-w-3xl space-y-20">
            {/* Step 1: Clone */}
            <div>
              <div className="text-sm font-diatype-mono text-[#635bff] mb-3">01</div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Clone the repo
              </h3>
              <p className="text-base lg:text-lg font-diatype text-white/40 leading-[1.75] mb-6">
                Load the extension folder in Chrome via <code className="bg-white/[0.06] px-2 py-0.5 rounded text-sm text-white/60">chrome://extensions</code> with Developer mode enabled.
              </p>
              <a 
                href="https://github.com/skip5this/LoopIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-white/80 font-diatype text-sm rounded-lg transition-colors border border-white/[0.06]"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
            
            {/* Step 2: MCP Config */}
            <div>
              <div className="text-sm font-diatype-mono text-[#635bff] mb-3">02</div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Add to Claude Code
              </h3>
              <p className="text-base lg:text-lg font-diatype text-white/40 leading-[1.75] mb-6">
                Add this to your <code className="bg-white/[0.06] px-2 py-0.5 rounded text-sm text-white/60">~/.claude.json</code>:
              </p>
              <div className="relative">
                <pre className="bg-white/[0.03] text-white/70 p-6 rounded-lg font-diatype-mono text-sm overflow-x-auto border border-white/[0.06]">
                  {mcpConfig}
                </pre>
                <button
                  onClick={copyMcpConfig}
                  className="absolute top-4 right-4 p-2 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors"
                >
                  {copiedMcp ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/40" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Step 3: Use it */}
            <div>
              <div className="text-sm font-diatype-mono text-[#635bff] mb-3">03</div>
              <h3 className="text-2xl lg:text-3xl font-diatype font-normal text-white mb-4">
                Start capturing
              </h3>
              
              {/* Keyboard shortcut */}
              <div className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.06] mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-diatype text-sm">Toggle capture mode</span>
                  </div>
                  <kbd className="px-3 py-1.5 bg-white/[0.06] rounded-md text-white/60 font-diatype-mono text-xs border border-white/[0.06]">
                    ⌘ Shift C
                  </kbd>
                </div>
              </div>
              
              {/* Example prompts */}
              <p className="text-sm font-diatype text-white/30 mb-4">Try asking your agent:</p>
              <div className="space-y-2">
                {[
                  "What did I just capture?",
                  "List all my captures",
                  "Any pending tasks?"
                ].map((prompt, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-white/[0.03] rounded-lg px-4 py-3 group cursor-pointer hover:bg-white/[0.06] transition-colors border border-white/[0.04]"
                    onClick={() => copyPrompt(prompt)}
                  >
                    <code className="text-white/50 font-diatype-mono text-sm">{prompt}</code>
                    {copiedPrompt === prompt ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-40 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/[0.06]">
        <div className="max-w-[1680px] mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] leading-[1.75] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl mb-12">
            Built for Claude Code users. Works anywhere — capture from production sites, competitor UIs, or design inspiration.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a 
              href="https://github.com/skip5this/LoopIn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#635bff] hover:bg-[#5046e5] text-white font-diatype font-medium text-sm rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <AnimatedLink 
              to="/loopin/case-study"
              arrow={false}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-diatype text-white/40 hover:text-white/70 transition-colors"
            >
              Read the case study
            </AnimatedLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
