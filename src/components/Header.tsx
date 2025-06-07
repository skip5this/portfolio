import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

type Section = 'hero' | 'strike' | 'fountain' | 'about' | 'contact';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  
  useEffect(() => {
    // Create an Intersection Observer to detect which section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the section name from the element's class list
          const sectionElement = entry.target as HTMLElement;
          if (sectionElement.classList.contains('bg-hero')) {
            setCurrentSection('hero');
          } else if (sectionElement.classList.contains('bg-strike')) {
            setCurrentSection('strike');
          } else if (sectionElement.classList.contains('bg-fountain')) {
            setCurrentSection('fountain');
          } else if (sectionElement.classList.contains('bg-gray-50')) {
            setCurrentSection('about');
          } else if (sectionElement.classList.contains('bg-white')) {
            setCurrentSection('contact');
          }
        }
      });
    }, {
      threshold: 0.9 // Trigger when section is 90% visible
    });

    // Observe all sections
    document.querySelectorAll('section, .bg-hero').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const getHeaderBackground = () => {
    switch (currentSection) {
      case 'hero':
        return 'bg-hero';
      case 'strike':
        return 'bg-strike';
      case 'fountain':
        return 'bg-fountain';
      case 'about':
        return 'bg-gray-50';
      case 'contact':
      default:
        return 'bg-white';
    }
  };

  return (
    <header className={`sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100 transition-colors duration-300 ${getHeaderBackground()}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="font-diatype-mono font-medium text-lg">Dynamic Quality</div>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 font-diatype">
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
          <nav className={`absolute top-full left-0 right-0 border-b border-gray-100 py-4 md:hidden ${getHeaderBackground()}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col space-y-4 items-center font-diatype">
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