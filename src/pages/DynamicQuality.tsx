import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Music, Calendar, Clock } from 'lucide-react';

// Episode data
const episodes = [
  {
    id: 1,
    title: "Dynamic Quality 8",
    date: "2023",
    duration: "2:00:00",
    mixcloudPath: "/dynamicquality/dynamicquality8/",
    description: "Another quality mix",
    tags: ["house", "soul", "electronic"],
    tracklist: []
  },
  {
    id: 2,
    title: "Dynamic Quality 7 — Best DQ tracks of 2022",
    date: "January 2023",
    duration: "2:13:49",
    mixcloudPath: "/dynamicquality/dynamicquality7-20230106-035737/",
    description: "The best tracks we played last year. All quality, always dynamic.",
    tags: ["house", "pop", "art rock", "soul", "r&b"],
    tracklist: [
      { artist: "Talk Talk", title: "I Believe in You" },
      { artist: "Nick Hakim", title: "Slid Under" },
      { artist: "Julia Jacklin", title: "Lydia Wears a Cross" },
      { artist: "Prince", title: "Mary Don't You Weep" },
      { artist: "Lana Del Rey", title: "Mariners Apartment Complex" },
      { artist: "The Impressions", title: "People Get Ready" },
      { artist: "Nick Hakim", title: "QADIR" },
      { artist: "Marvin Gaye", title: "Is That Enough" },
      { artist: "Isabelle Antena", title: "Ten Minutes" },
      { artist: "CASISDEAD", title: "Traction Control" },
      { artist: "Curtis Mayfield", title: "Do Do Wap Is Strong in Here" },
      { artist: "Marvin Gaye", title: "\"T\" Plays It Cool" },
      { artist: "Mk.gee", title: "cz" },
      { artist: "FKA twigs", title: "Meta Angel" },
      { artist: "ROSALÍA", title: "DIABLO" },
      { artist: "Sudan Archives", title: "Homesick (Gorgeous & Arrogant)" },
      { artist: "Yaya Bey", title: "Intro" },
      { artist: "Destiny's Child & Static", title: "Say My Name (Timbaland Remix)" },
      { artist: "Kenny Beats", title: "Still" },
      { artist: "Bones", title: "Glovebox" },
      { artist: "Sunday Service", title: "Father Stretch" },
      { artist: "Joy", title: "The Time Is Right" },
      { artist: "Omar S", title: "What's Good for the Goose (Dub Mix)" },
      { artist: "Joy Orbison", title: "Better" },
      { artist: "Rimbaudian", title: "She Taught Me How to Love" },
      { artist: "Omar S", title: "Money Hit the Floor" },
      { artist: "Troialexis & Omar S", title: "Can't Explain (R&B Mix)" },
      { artist: "Yaya Bey", title: "Pour Up" },
      { artist: "Sade", title: "I Couldn't Love You More (Mr. K Edit)" },
      { artist: "Jeshi feat. Obongjayar & WESTSIDE BOOGIE", title: "Protein v2" },
      { artist: "Hailu Mergia", title: "Yefikir Enguroguro" },
      { artist: "Taylor Swift", title: "Happiness" },
    ]
  },
];

/**
 * Dark Smoked Glass Panel Component
 */
function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-panel ${className}`}>
      {children}
      <style>{`
        .glass-panel {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}

/**
 * Mixcloud Widget Embed Component
 */
function MixcloudPlayer({ url, size = 'classic' }: { url: string; size?: 'picture' | 'classic' | 'mini' }) {
  // Mixcloud embed URL format
  const feedPath = url.replace('https://www.mixcloud.com', '');
  
  const heights: Record<string, number> = {
    picture: 400,
    classic: 120,
    mini: 60,
  };
  
  const widgetUrl = `https://www.mixcloud.com/widget/iframe/?hide_cover=1&dark=1&feed=${encodeURIComponent(feedPath)}`;
  
  return (
    <iframe
      width="100%"
      height={heights[size]}
      src={widgetUrl}
      frameBorder="0"
      allow="autoplay"
      className="rounded-lg"
    />
  );
}

/**
 * Tracklist Component
 */
function Tracklist({ tracks }: { tracks: { artist: string; title: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  const displayTracks = expanded ? tracks : tracks.slice(0, 5);
  
  if (tracks.length === 0) return null;
  
  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">Tracklist</h4>
      <ul className="space-y-2">
        {displayTracks.map((track, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="text-white/30 w-5 text-right flex-shrink-0">{i + 1}</span>
            <div>
              <span className="text-white">{track.artist}</span>
              <span className="text-white/40"> — </span>
              <span className="text-white/60">{track.title}</span>
            </div>
          </li>
        ))}
      </ul>
      {tracks.length > 5 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-white/40 hover:text-white/60 text-sm transition-colors"
        >
          {expanded ? '← Show less' : `+ ${tracks.length - 5} more tracks`}
        </button>
      )}
    </div>
  );
}

/**
 * Episode Card Component
 */
function EpisodeCard({ episode, featured = false }: { episode: typeof episodes[0]; featured?: boolean }) {
  const [showTracklist, setShowTracklist] = useState(false);
  
  return (
    <GlassPanel className={`p-6 ${featured ? '' : 'hover:bg-white/10'} transition-colors`}>
      <div className="flex items-start gap-4">
        {/* Placeholder artwork */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="w-8 h-8 text-white/40" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1 truncate">{episode.title}</h3>
          {episode.description && (
            <p className="text-white/50 text-sm mb-2 line-clamp-2">{episode.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-white/60 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {episode.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {episode.duration}
            </span>
          </div>
          
          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {episode.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-white/5 rounded text-white/40 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <a 
              href={`https://www.mixcloud.com${episode.mixcloudPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Play on Mixcloud
            </a>
            {episode.tracklist.length > 0 && (
              <button
                onClick={() => setShowTracklist(!showTracklist)}
                className="px-4 py-2 text-white/60 hover:text-white text-sm transition-colors"
              >
                {showTracklist ? 'Hide' : 'Tracklist'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Tracklist */}
      {showTracklist && <Tracklist tracks={episode.tracklist} />}
    </GlassPanel>
  );
}

/**
 * Dynamic Quality Main Page
 */
export function DynamicQuality() {
  return (
    <div className="min-h-screen relative bg-black">
      {/* Background - full bleed gradient */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-800/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <a 
                href="https://www.mixcloud.com/dynamicquality/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                Mixcloud ↗
              </a>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Title */}
            <GlassPanel className="inline-block px-8 py-6 mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Dynamic Quality
              </h1>
              <p className="text-white/60 mt-2 text-lg">
                A radio show by Scott Bell
              </p>
            </GlassPanel>
            
            {/* Latest Episode Player */}
            <GlassPanel className="p-6 max-w-2xl mx-auto">
              <h2 className="text-white/60 text-sm uppercase tracking-wider mb-4">Latest Episode</h2>
              <MixcloudPlayer 
                url="https://www.mixcloud.com/dynamicquality/" 
                size="classic" 
              />
            </GlassPanel>
            
            {/* Scroll indicator */}
            <div className="mt-16 text-white/40 animate-bounce">
              <span className="text-sm">Scroll for archive</span>
              <div className="mt-2">↓</div>
            </div>
          </div>
        </section>

        {/* Episode Archive */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-8">Archive</h2>
            
            <div className="space-y-4">
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
              
              {/* Placeholder for more episodes */}
              <GlassPanel className="p-8 text-center">
                <p className="text-white/40">More episodes coming soon...</p>
                <a 
                  href="https://www.mixcloud.com/dynamicquality/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
                >
                  View all on Mixcloud
                </a>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center text-white/40 text-sm">
            <p>© {new Date().getFullYear()} Dynamic Quality. All mixes for promotional purposes only.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
