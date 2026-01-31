import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Footer } from '../components/Footer';

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
      <header className="bg-[#0c0c0c] border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 md:pt-48 pb-20 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          {/* Logo/Icon */}
          <div className="mb-8">
            <span className="text-5xl">🔗</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-diatype-mono font-normal text-white mb-6">
            LoopIn
          </h1>
          
          {/* Tagline - large statement */}
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl mb-10">
            Tighten the loop between your browser and Claude Code.
          </p>
          
          {/* Value prop */}
          <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60 max-w-3xl">
            Click any element on any webpage. Add context. Send it directly to Claude Code. 
            No more screenshots, copy-pasting HTML, or describing UI manually.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          {/* Keyline */}
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-16">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <div>
              <div className="text-4xl mb-6">👆</div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                Click any element
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                Toggle capture mode and click on any element on any webpage. LoopIn grabs the HTML, styles, and selector.
              </p>
            </div>
            
            {/* Step 2 */}
            <div>
              <div className="text-4xl mb-6">💬</div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                Add context
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                Tell Claude what you want: "make this button green" or "fix the alignment" or "add a hover effect."
              </p>
            </div>
            
            {/* Step 3 */}
            <div>
              <div className="text-4xl mb-6">⚡</div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                Claude sees it
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                Ask Claude Code about your captures. It sees exactly what you see—selector, styles, and all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Placeholder */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 max-w-4xl">
            <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
              <p className="text-white/40 font-diatype-mono text-sm">
                [ Demo GIF coming soon ]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          {/* Keyline */}
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-16">
            Get started
          </h2>
          
          <div className="max-w-3xl space-y-16">
            {/* Step 1: Extension */}
            <div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                1. Install the Chrome extension
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60 mb-6">
                Add LoopIn to your browser with one click.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center px-6 py-3 bg-[#635bff] hover:bg-[#5046e5] text-white font-diatype font-medium rounded-lg transition-colors"
              >
                Add to Chrome
                <span className="ml-2 text-sm opacity-75">(Coming soon)</span>
              </a>
            </div>
            
            {/* Step 2: MCP Config */}
            <div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                2. Add to Claude Code
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60 mb-6">
                Add this to your <code className="bg-white/10 px-2 py-1 rounded text-base">~/.claude.json</code>:
              </p>
              <div className="relative">
                <pre className="bg-white/5 text-white/80 p-6 rounded-lg font-diatype-mono text-sm overflow-x-auto border border-white/10">
                  {mcpConfig}
                </pre>
                <button
                  onClick={copyMcpConfig}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {copiedMcp ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          {/* Keyline */}
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-16">
            Quick start
          </h2>
          
          <div className="max-w-3xl space-y-8">
            {/* Keyboard shortcut */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-diatype font-medium mb-1">Toggle capture mode</h3>
                  <p className="text-white/40 text-sm font-diatype">Enable/disable element selection</p>
                </div>
                <kbd className="px-4 py-2 bg-white/10 rounded-lg text-white/80 font-diatype-mono text-sm">
                  Ctrl+Shift+C
                </kbd>
              </div>
            </div>
            
            {/* Example prompts */}
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-diatype font-medium mb-6">Example prompts for Claude Code</h3>
              <div className="space-y-3">
                {[
                  "What did I just capture?",
                  "List all my captures",
                  "Any pending tasks?"
                ].map((prompt, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3 group cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => copyPrompt(prompt)}
                  >
                    <code className="text-white/70 font-diatype-mono text-sm">{prompt}</code>
                    {copiedPrompt === prompt ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Links */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl mb-10">
            Built for Claude Code users. Works anywhere—capture from production sites, competitor UIs, or design inspiration.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a 
              href="https://github.com/skip5this/LoopIn" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-white/90 text-black font-diatype font-medium rounded-lg transition-colors"
            >
              View on GitHub
            </a>
            <Link 
              to="/loopin/case-study"
              className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-white/40 text-white font-diatype font-medium rounded-lg transition-colors"
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
