import React from 'react';

export function LoopInTerminalDemo() {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl border border-white/10 overflow-hidden max-w-4xl">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
        <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
        <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        <span className="ml-2 text-white/30 font-diatype-mono text-xs">Claude Code — LoopIn MCP</span>
      </div>
      
      {/* Terminal content */}
      <div className="p-6 font-diatype-mono text-sm space-y-4">
        {/* User prompt */}
        <div>
          <span className="text-[#635bff]">❯ </span>
          <span className="text-white/80">What did I just capture?</span>
        </div>
        
        {/* Claude response */}
        <div className="text-white/60 space-y-3">
          <p>You captured a <span className="text-[#5CE0D2]">&lt;button&gt;</span> element from <span className="text-white/80">localhost:5173</span>:</p>
          
          <div className="bg-white/5 rounded-lg p-4 space-y-2 text-xs">
            <div><span className="text-[#635bff]">selector:</span> <span className="text-white/70">.hero-section &gt; button.cta-primary</span></div>
            <div><span className="text-[#635bff]">styles:</span> <span className="text-white/70">bg: #635bff, radius: 8px, padding: 12px 24px</span></div>
            <div><span className="text-[#635bff]">text:</span> <span className="text-white/70">"Get Started"</span></div>
            <div><span className="text-[#635bff]">instruction:</span> <span className="text-[#5CE0D2]">"make this button rounded with a hover glow"</span></div>
          </div>
          
          <p>I'll update the button styles now.</p>
        </div>
        
        {/* Action */}
        <div className="text-white/40 text-xs">
          <span className="text-[#28c840]">✓</span> Updated src/components/Hero.tsx — button now has rounded-full and hover:shadow-lg
        </div>
        
        {/* Cursor */}
        <div>
          <span className="text-[#635bff]">❯ </span>
          <span className="w-2 h-4 bg-white/60 inline-block animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
