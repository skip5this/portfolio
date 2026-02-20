import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  tag: string;
}

const posts: BlogPost[] = [
  {
    slug: 'ai-removes-drudgery',
    title: 'AI Removes the Drudgery. The Question is What Comes Next.',
    subtitle: 'On Jevons Paradox, creative automation, and why removing friction doesn\'t mean removing meaning.',
    date: 'Feb 17, 2026',
    tag: 'AI + Design',
  },
  {
    slug: 'hbr-ai-reaction',
    title: 'HBR Said AI Practice is the New Competitive Advantage. They\'re Half Right.',
    subtitle: 'A reaction to Harvard Business Review\'s argument — and what they missed about the design layer.',
    date: 'Feb 14, 2026',
    tag: 'AI + Design',
  },
  {
    slug: 'loopin-case-study',
    title: 'Building LoopIn: Giving AI Agents Eyes',
    subtitle: 'How a frustration with Claude Code became a Chrome extension, an MCP server, and a new way to think about human-AI collaboration.',
    date: 'Feb 2026',
    tag: 'Case Study',
  },
];

export function Writing() {
  return (
    <div className="font-sans bg-[#09090b] min-h-screen">
      {/* Header */}
      <header className="bg-[#09090b] border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[640px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-diatype">Scott Bell</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[640px] mx-auto">
          {/* Page title */}
          <h1 className="text-3xl md:text-4xl font-diatype-mono font-normal text-white mb-4">
            Writing
          </h1>
          <p className="text-lg font-diatype text-white/50 mb-16 leading-relaxed">
            On AI, design, and the layer underneath.
          </p>

          {/* Posts */}
          <div className="space-y-0">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/writing/${post.slug}`}
                className="block group"
              >
                <article
                  className="py-8 border-t border-white/10"
                  style={i === posts.length - 1 ? { borderBottom: '1px solid rgba(255,255,255,0.1)' } : {}}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-diatype font-medium text-white/30 uppercase tracking-wider">
                      {post.tag}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-xs font-diatype text-white/30">
                      {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-diatype font-medium text-white group-hover:text-white/80 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm font-diatype text-white/40 leading-relaxed">
                    {post.subtitle}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
