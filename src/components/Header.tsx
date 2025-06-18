import React, { useState, useEffect, useCallback } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

type Section = 'hero' | 'strike' | 'fountain' | 'aioz' | 'about' | 'contact';

// Define section selectors and their corresponding background classes
const SECTIONS = [
  { name: 'hero' as Section, selector: '.bg-hero', background: 'bg-hero' },
  { name: 'strike' as Section, selector: 'section.bg-strike', background: 'bg-strike' },
  { name: 'fountain' as Section, selector: 'section.bg-fountain', background: 'bg-fountain' },
  { name: 'aioz' as Section, selector: 'section.bg-aioz', background: 'bg-aioz' },
  { name: 'about' as Section, selector: '#about', background: 'bg-gray-50' },
  { name: 'contact' as Section, selector: '#contact', background: 'bg-white' }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  
  // Calculate which section is at the top of the viewport (under the header)
  const calculateCurrentSection = useCallback(() => {
    const headerHeight = 80; // Account for header height
    const scrollY = window.scrollY;
    
    // Find the section that crosses the header line
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const { name, selector } = SECTIONS[i];
      const element = document.querySelector(selector);
      if (!element) continue;
      
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      
      // If this section starts at or above the header line, it's the current section
      if (elementTop <= scrollY + headerHeight) {
        return name;
      }
    }
    
    // Default to hero if no section is found
    return 'hero';
  }, []);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const newSection = calculateCurrentSection();
      setCurrentSection(newSection);
    };
    
    // Set initial section
    handleScroll();
    
    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [calculateCurrentSection]);

  const getHeaderBackground = () => {
    const section = SECTIONS.find(s => s.name === currentSection);
    return section?.background || 'bg-hero';
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, selector: string) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={`sticky top-0 z-10 backdrop-blur-sm shadow-sm transition-colors duration-300 ${getHeaderBackground()}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
        <div className="font-diatype font-medium text-gray-500">🔮</div>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 font-diatype">
          <a href="#projects" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, 'section.bg-strike')}>
            Projects
          </a>
          <a href="#about" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '#about')}>
            About
          </a>
          <a href="#contact" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '#contact')}>
            Contact
          </a>
        </nav>
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className={`absolute top-full left-0 right-0 border-b border-gray-100 py-4 md:hidden ${getHeaderBackground()}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-16 flex flex-col space-y-4 items-center font-diatype">
              <a href="#projects" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, 'section.bg-strike')}>
                Projects
              </a>
              <a href="#about" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '#about')}>
                About
              </a>
              <a href="#contact" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}