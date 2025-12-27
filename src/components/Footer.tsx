import React from 'react';
export function Footer() {
  return <footer className="py-8 bg-black">
      <div className="container mx-auto px-4 text-center space-y-2">
        <p className="text-white/60 text-sm font-diatype">
          © 2025 Scott Bell — Designed, built, and deployed in-house (my house).
        </p>
        <p className="text-white/40 text-sm font-diatype max-w-2xl mx-auto">
          Deeply grateful to the team: Joshua, Gina, Namson, Tom, Matt, Rei, and Logan.
        </p>
      </div>
    </footer>;
}