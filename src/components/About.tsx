import React from 'react';

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-diatype-mono font-medium mb-8">About</h2>
          <div className="space-y-6 font-diatype">
            <p className="text-lg leading-relaxed">
              I'm a digital product designer with over a decade of making the
              complex feel simple. My background spans fintech, AI, Web3, and
              consumer apps, with products I've designed reaching millions of users
              across 100+ countries. I've led at $1B+ market cap scale, launched
              products from zero to one, built many systems from scratch, taught
              professionally, mentored teams, and worked hands-on across research,
              UX, and visual design.
            </p>
            <p className="text-lg leading-relaxed">
              I'm drawn to design as a way of making sense—and making things
              make sense. My process is shaped by systems thinking,
              philosophical curiosity, and a respect for the hidden logic
              beneath the surface. I believe good design reveals structure,
              invites clarity, and brings coherence to complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}