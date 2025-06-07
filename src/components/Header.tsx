import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-medium text-xl">Portfolio</div>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#projects" className="hover:text-gray-600 transition-colors">
            Projects
          </a>
          <a href="#about" className="hover:text-gray-600 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-gray-600 transition-colors">
            Contact
          </a>
        </nav>
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 py-4 md:hidden">
            <div className="max-w-7xl mx-auto px-4 flex flex-col space-y-4 items-center">
              <a href="#projects" className="hover:text-gray-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Projects
              </a>
              <a href="#about" className="hover:text-gray-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
              <a href="#contact" className="hover:text-gray-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}