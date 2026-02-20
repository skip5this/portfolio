import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

// Blog post content — replace with real content
const postContent: Record<string, { title: string; date: string; tag: string; body: React.ReactNode }> = {
  'ai-removes-drudgery': {
    title: 'AI Removes the Drudgery. The Question is What Comes Next.',
    date: 'Feb 17, 2026',
    tag: 'AI + Design',
    body: (
      <>
        <p>
          There's a version of AI optimism that goes like this: AI handles the boring stuff, humans do the creative stuff. Everybody wins.
        </p>
        <p>
          It's a comforting story. It's also incomplete.
        </p>
        <p>
          Jevons Paradox tells us that when you make a resource more efficient, you don't use less of it — you use more. Coal-powered steam engines didn't reduce coal consumption. They exploded it. The efficiency created demand that didn't exist before.
        </p>
        <p>
          Apply that to creative work. AI removes the drudgery from design, writing, coding. The friction disappears. But friction wasn't just an obstacle — it was a filter. It forced decisions. It created constraints that shaped the work.
        </p>
        <p>
          When the cost of producing anything approaches zero, the bottleneck shifts. It shifts to taste. To judgment. To knowing which of the infinite possibilities is the right one. That's not a technical skill — it's a human one.
        </p>
        <p>
          The question isn't whether AI will handle the drudgery. It already does. The question is what we do with the space that opens up. Do we fill it with more output? Or do we fill it with more thought?
        </p>
        <p>
          I think the designers and builders who thrive in an AI-native world won't be the ones who produce the most. They'll be the ones who know when to stop producing and start thinking. The layer underneath the work — the why, the judgment, the philosophy — that becomes the differentiator.
        </p>
        <p>
          Robert Pirsig wrote about Quality as something you can't define but you know when you see it. That's the human contribution. Not the pixels, not the code. The care.
        </p>
      </>
    ),
  },
  'hbr-ai-reaction': {
    title: "HBR Said AI Practice is the New Competitive Advantage. They're Half Right.",
    date: 'Feb 14, 2026',
    tag: 'AI + Design',
    body: (
      <>
        <p>
          Harvard Business Review published an article arguing that companies with active AI practice will win. The ones who just talk about AI will lose. Hard to argue with that.
        </p>
        <p>
          But here's what they missed: practice without design thinking is just faster chaos.
        </p>
        <p>
          Most companies adopting AI are optimizing existing workflows. Take what we do, make it faster. That's table stakes. The real advantage isn't speed — it's reimagining the workflow entirely.
        </p>
        <p>
          I've seen this firsthand. When I work with AI coding agents, the value isn't that they write code faster. It's that the entire feedback loop changes. I built a Chrome extension that lets me click any element on a webpage and send it — with full context — to an AI agent. That's not "faster coding." That's a fundamentally different way of working.
        </p>
        <p>
          The competitive advantage isn't AI practice. It's AI practice informed by design — understanding the human experience around the technology, not just the technology itself. Companies that only optimize for throughput will produce more, faster. Companies that optimize for judgment will produce better.
        </p>
        <p>
          HBR got the urgency right. But the moat isn't "we use AI." The moat is "we understand how humans and AI work together." That's a design problem, not an engineering one.
        </p>
      </>
    ),
  },
  'loopin-case-study': {
    title: 'Building LoopIn: Giving AI Agents Eyes',
    date: 'Feb 2026',
    tag: 'Case Study',
    body: (
      <>
        <p>
          <em>Full case study coming soon. For now, visit the <Link to="/loopin/case-study" className="text-[#9E96B8] hover:text-[#9E96B8]/80 transition-colors underline underline-offset-4">LoopIn project page</Link>.</em>
        </p>
        <p>
          The short version: I was designing a UI in the browser and trying to describe what I was looking at to Claude Code. "The button with the gradient, the one next to the nav, no the other one..." It was absurd. The AI couldn't see what I could see.
        </p>
        <p>
          So I built a bridge. A Chrome extension that captures any element — HTML, computed styles, accessibility attributes, selectors — and sends it directly to the AI via MCP. Click what you see. The agent understands.
        </p>
        <p>
          It started as a hack. It became a Chrome extension, an npm package, an MCP server, and a landing page. Concept to shipped product in two weeks. The full case study will cover the design decisions, the technical architecture, and what it taught me about designing for human-AI collaboration.
        </p>
      </>
    ),
  },
};

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postContent[slug] : undefined;

  if (!post) return <Navigate to="/writing" replace />;

  return (
    <div className="font-sans bg-[#09090b] min-h-screen">
      {/* Header */}
      <header className="bg-[#09090b] border-b border-white/10 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[640px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/writing"
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-diatype">Writing</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[640px] mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-diatype font-medium text-white/30 uppercase tracking-wider">
              {post.tag}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-xs font-diatype text-white/30">
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-diatype-mono font-normal text-white mb-12 leading-snug">
            {post.title}
          </h1>

          {/* Body */}
          <div className="prose-custom space-y-6 text-base font-diatype text-white/70 leading-relaxed">
            {post.body}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
