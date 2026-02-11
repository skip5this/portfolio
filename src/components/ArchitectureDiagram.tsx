import React from 'react';

export function ArchitectureDiagram() {
  return (
    <div className="bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        {/* Browser */}
        <div className="flex-1 text-center">
          <div className="bg-[#635bff]/20 border border-[#635bff]/40 rounded-xl p-6 mb-3">
            <div className="text-3xl mb-2">🌐</div>
            <h4 className="text-white font-diatype-mono text-sm font-medium">Browser</h4>
            <p className="text-white/40 font-diatype text-xs mt-1">Chrome Extension</p>
          </div>
          <div className="text-white/30 font-diatype-mono text-xs space-y-1">
            <div>Click elements</div>
            <div>Add instructions</div>
            <div>Capture errors</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center gap-1 py-4 md:py-0">
          <div className="hidden md:block text-white/30 text-2xl">→</div>
          <div className="md:hidden text-white/30 text-2xl">↓</div>
          <span className="text-white/20 font-diatype-mono text-[10px]">HTTP</span>
        </div>

        {/* MCP Server */}
        <div className="flex-1 text-center">
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-3">
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="text-white font-diatype-mono text-sm font-medium">MCP Server</h4>
            <p className="text-white/40 font-diatype text-xs mt-1">Node.js + Express</p>
          </div>
          <div className="text-white/30 font-diatype-mono text-xs space-y-1">
            <div>Store captures</div>
            <div>Queue tasks</div>
            <div>Serve to Claude</div>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex flex-col items-center gap-1 py-4 md:py-0">
          <div className="hidden md:block text-white/30 text-2xl">→</div>
          <div className="md:hidden text-white/30 text-2xl">↓</div>
          <span className="text-white/20 font-diatype-mono text-[10px]">stdio</span>
        </div>

        {/* Claude Code */}
        <div className="flex-1 text-center">
          <div className="bg-[#635bff]/20 border border-[#635bff]/40 rounded-xl p-6 mb-3">
            <div className="text-3xl mb-2">🤖</div>
            <h4 className="text-white font-diatype-mono text-sm font-medium">Claude Code</h4>
            <p className="text-white/40 font-diatype text-xs mt-1">AI Coding Agent</p>
          </div>
          <div className="text-white/30 font-diatype-mono text-xs space-y-1">
            <div>Read captures</div>
            <div>Understand context</div>
            <div>Edit code</div>
          </div>
        </div>
      </div>
    </div>
  );
}
