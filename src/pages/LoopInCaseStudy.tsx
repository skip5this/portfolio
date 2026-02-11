import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';
import { AnimatedLink } from '../components/AnimatedLink';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export function LoopInCaseStudy() {
  return (
    <div className="font-sans text-gray-800 bg-[#0c0c0c] min-h-screen">
      {/* Header */}
      <header className="bg-[#0c0c0c] border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/loopin" 
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to LoopIn</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero / Coming Soon */}
      <section className="pt-40 md:pt-48 pb-20 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-5xl">🔗</span>
          </div>
          
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-diatype-mono font-normal text-white mb-6">
            LoopIn Case Study
          </h1>
          
          {/* Coming Soon Banner */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#635bff]/20 border border-[#635bff]/40 rounded-full mb-10">
            <span className="w-2 h-2 bg-[#635bff] rounded-full animate-pulse"></span>
            <span className="text-[#635bff] font-diatype font-medium">Case study in progress</span>
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl mb-10">
            The story of bridging the gap between what you see and what you build.
          </p>
          
          <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed font-diatype text-white/60 max-w-3xl">
            How a simple frustration with the Claude Code workflow sparked a tool that tightens the feedback loop between browser and code editor.
          </p>
        </div>
      </section>

      {/* The Spark */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            The Spark
          </h2>
          
          <div className="max-w-3xl space-y-8">
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              Working with Claude Code is powerful—until you need to talk about something visual. You're staring at a button that's the wrong shade of blue, but describing it means taking a screenshot, uploading it, explaining which element you mean, copy-pasting HTML...
            </p>
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              The loop between "seeing a problem" and "Claude understanding it" was too long.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl">
              What if you could just... click it?
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            The Problem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
            <div className="space-y-8">
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                Coding agents like Claude Code are incredible at understanding code—but they're blind to the rendered result. They can't see the 3px misalignment, the wrong hover state, or the button that doesn't quite match the design.
              </p>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                Designers and developers constantly context-switch: browser → screenshot → editor → paste → explain. Every step is friction. Every step breaks flow.
              </p>
            </div>
            
            {/* Placeholder for problem illustration */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 flex items-center justify-center min-h-[300px]">
              <p className="text-white/30 font-diatype-mono text-sm text-center">
                [ Illustration: The broken feedback loop ]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Insight */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            The Insight
          </h2>
          
          <div className="max-w-3xl space-y-8">
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              Claude Code already has MCP (Model Context Protocol)—a way for tools to feed information directly into the conversation. What if the browser could become one of those tools?
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl">
              Click an element. Add context. Claude sees exactly what you see—selector, styles, and all.
            </p>
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              No screenshots. No copy-pasting. No describing "the third button from the left." Just point, click, and talk.
            </p>
          </div>
        </div>
      </section>

      {/* Design Decisions */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-16">
            Design Decisions
          </h2>
          
          <div className="space-y-20">
            {/* Decision 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                  Why "capture mode" instead of always-on?
                </h3>
                <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                  Early prototypes tried intercepting all clicks, but it made normal browsing impossible. The toggle creates a clear "I'm working with Claude now" mode—intentional, not intrusive.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/30 font-diatype-mono text-sm text-center py-12">
                  [ Capture mode toggle demo ]
                </p>
              </div>
            </div>
            
            {/* Decision 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                  Why include instructions at capture time?
                </h3>
                <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                  Context decays fast. The moment you click an element, you know exactly what you want changed. Capturing that intent immediately—"make this green" or "fix the padding"—keeps the feedback tight.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/30 font-diatype-mono text-sm text-center py-12">
                  [ Instruction dialog demo ]
                </p>
              </div>
            </div>
            
            {/* Decision 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                  Bookmarklet vs. Chrome Extension
                </h3>
                <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                  We started with a bookmarklet for fast iteration—zero install, works anywhere. But for polish and keyboard shortcuts, a proper extension was worth the extra complexity. We kept both: bookmarklet for trying it fast, extension for daily use.
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <p className="text-white/30 font-diatype-mono text-sm text-center py-12">
                  [ Extension popup screenshot ]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Build */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            The Build
          </h2>
          
          <div className="max-w-3xl space-y-8 mb-16">
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              LoopIn is a human-AI collaboration project. The design direction and product decisions come from a designer's perspective. The implementation—from MCP server to Chrome extension—was built through conversation with Claude.
            </p>
            <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
              It's a tool for Claude Code, built with Claude Code.
            </p>
          </div>
          
          <ArchitectureDiagram />
        </div>
      </section>

      {/* What's Next */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            What's Next
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="text-white font-diatype font-medium mb-2">Multi-element capture</h3>
              <p className="text-white/50 font-diatype text-sm">
                Select multiple elements to show relationships and patterns.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-2xl mb-4">⚠️</div>
              <h3 className="text-white font-diatype font-medium mb-2">Error capture</h3>
              <p className="text-white/50 font-diatype text-sm">
                Auto-capture console errors and network failures for debugging.
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-2xl mb-4">⚛️</div>
              <h3 className="text-white font-diatype font-medium mb-2">React integration</h3>
              <p className="text-white/50 font-diatype text-sm">
                Hook into React DevTools to capture component names and file paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reflections */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <div className="w-16 h-px bg-[#635bff] mb-6"></div>
          
          <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10">
            Reflections
          </h2>
          
          <div className="max-w-3xl space-y-12">
            <div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                AI agents need senses, not just instructions
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                The biggest friction in working with coding agents isn't capability—it's perception. Claude can write any CSS you describe, but it can't see the result. LoopIn taught me that the next wave of AI tools won't just be smarter—they'll be more connected to the world they're changing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                Design the seams, not just the surfaces
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                The interesting design problem wasn't the UI of the extension—it was the handoff between human and AI. When does the human point? When does the AI act? How much context is enough? These seams between human intent and AI action are where the real design work lives.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">
                Building with AI changes how you think about building
              </h3>
              <p className="text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-white/60">
                LoopIn was built through conversation with an AI coding agent—the same kind of agent it's designed to help. That feedback loop shaped the product. Every friction I felt while building became a feature I added. The best way to design for AI workflows is to live inside one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-8 md:px-16 lg:px-32 xl:px-48 border-t border-white/10">
        <div className="max-w-[1680px] mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] font-diatype font-light text-white max-w-4xl mb-10">
            Want to try it yourself?
          </p>
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <AnimatedLink 
              to="/loopin"
              className="text-lg lg:text-xl font-diatype text-white hover:text-white/80 transition-colors"
            >
              Get LoopIn
            </AnimatedLink>
            <AnimatedLink 
              href="https://github.com/skip5this/LoopIn"
              className="text-lg lg:text-xl font-diatype text-white/60 hover:text-white transition-colors"
            >
              View on GitHub
            </AnimatedLink>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
