import React from 'react';

interface AIProject {
  title: string;
  description: string;
  status: 'live' | 'building';
  url: string;
  color: string;
  glowColor: string;
}

const projects: AIProject[] = [
  {
    title: 'LoopIn',
    description: 'Browser → Agent bridge',
    status: 'building',
    url: 'https://github.com/skip5this/LoopIn',
    color: '#3B5BFF',
    glowColor: 'rgba(59, 91, 255, 0.4)'
  },
  {
    title: 'A11y Copilot',
    description: 'Real-time accessibility',
    status: 'live',
    url: 'https://github.com/skip5this',
    color: '#4ADEAC',
    glowColor: 'rgba(74, 222, 172, 0.4)'
  },
  {
    title: 'mix-id',
    description: 'Audio fingerprinting',
    status: 'live',
    url: 'https://github.com/skip5this/mix-id',
    color: '#F07068',
    glowColor: 'rgba(240, 112, 104, 0.4)'
  },
  {
    title: 'Designer Persona',
    description: 'Design thinking for LLMs',
    status: 'building',
    url: 'https://github.com/skip5this',
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.4)'
  }
];

export function AIProjects() {
  return (
    <section className="relative bg-[#0a0a0b] overflow-hidden">
      {/* Thin white grid lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Vertical lines */}
        <div className="absolute left-[16.6%] top-0 bottom-0 w-px bg-white/[0.07]" />
        <div className="absolute left-[33.3%] top-0 bottom-0 w-px bg-white/[0.07]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-px bg-white/[0.07]" />
        <div className="absolute left-[66.6%] top-0 bottom-0 w-px bg-white/[0.07]" />
        <div className="absolute left-[83.3%] top-0 bottom-0 w-px bg-white/[0.07]" />
        {/* Horizontal lines */}
        <div className="absolute top-[25%] left-0 right-0 h-px bg-white/[0.07]" />
        <div className="absolute top-[50%] left-0 right-0 h-px bg-white/[0.07]" />
        <div className="absolute top-[75%] left-0 right-0 h-px bg-white/[0.07]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-16 md:py-24">
        {/* Header area */}
        <div className="flex justify-between items-start mb-16 md:mb-24">
          <div>
            <h2 className="text-2xl font-diatype-mono font-medium text-white mb-2">AI Tools</h2>
            <p className="text-white/40 text-sm font-diatype-mono">Open source · Built for agents</p>
          </div>
          <span className="text-white/30 font-diatype-mono text-xl">2025–26</span>
        </div>

        {/* Projects grid with blobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0 relative">
          {/* Divider lines for grid */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.12]" />
          <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-white/[0.12]" />

          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-8 md:p-12 min-h-[280px] md:min-h-[320px] transition-all duration-500"
              style={{
                borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Blob */}
              <div
                className="absolute transition-all duration-700 ease-out rounded-full group-hover:scale-110"
                style={{
                  width: index % 2 === 0 ? '140px' : '100px',
                  height: index % 2 === 0 ? '140px' : '100px',
                  background: `radial-gradient(circle at 40% 40%, ${project.color}, ${project.color}dd)`,
                  boxShadow: `0 0 60px ${project.glowColor}, 0 0 120px ${project.glowColor}`,
                  top: index < 2 ? '20%' : '15%',
                  right: index % 2 === 0 ? '10%' : 'auto',
                  left: index % 2 === 1 ? '55%' : 'auto',
                }}
              />

              {/* Secondary smaller blob */}
              <div
                className="absolute transition-all duration-1000 ease-out rounded-full opacity-60 group-hover:opacity-80"
                style={{
                  width: '40px',
                  height: '40px',
                  background: project.color,
                  top: index < 2 ? '60%' : '55%',
                  right: index % 2 === 0 ? '35%' : 'auto',
                  left: index % 2 === 1 ? '25%' : 'auto',
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-white font-diatype-mono font-medium text-xl">{project.title}</h3>
                  {project.status === 'live' ? (
                    <span className="text-[10px] font-diatype-mono text-white/40 uppercase tracking-widest">Live</span>
                  ) : (
                    <span className="text-[10px] font-diatype-mono text-white/30 uppercase tracking-widest">Dev</span>
                  )}
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-white/50 text-sm font-diatype-mono mb-3">{project.description}</p>
                <span className="text-white/20 text-xs font-diatype-mono group-hover:text-white/50 transition-colors duration-300">
                  View →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mt-16 md:mt-24 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-white/20 text-xs font-diatype-mono uppercase tracking-[0.2em]">Nakamoto Design Corp</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}
