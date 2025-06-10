import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

type Section = 'hero' | 'strike' | 'fountain' | 'aioz' | 'about' | 'contact';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    // Create an Intersection Observer to detect which section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHasScrolled(true);
          // Get the section name from the element's class list
          const sectionElement = entry.target as HTMLElement;
          if (sectionElement.classList.contains('bg-hero')) {
            setCurrentSection('hero');
          } else if (sectionElement.classList.contains('bg-strike')) {
            setCurrentSection('strike');
          } else if (sectionElement.classList.contains('bg-fountain')) {
            setCurrentSection('fountain');
          } else if (sectionElement.classList.contains('bg-aioz')) {
            setCurrentSection('aioz');
          } else if (sectionElement.classList.contains('bg-gray-50')) {
            setCurrentSection('about');
          } else if (sectionElement.classList.contains('bg-white')) {
            setCurrentSection('contact');
          }
        }
      });
    }, {
      threshold: isMobile ? 0.15 : 0.5, // Lower threshold on mobile
      rootMargin: isMobile ? '-20% 0px' : '0px' // Adjust the detection area on mobile
    });

    // Observe all sections with a more specific selector for mobile
    const selector = isMobile ? 
      'section[class*="bg-"], div[class*="bg-hero"], div[class*="bg-strike"], div[class*="bg-fountain"]' :
      'section, .bg-hero';
    
    document.querySelectorAll(selector).forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isMobile]); // Re-run when isMobile changes

  const getHeaderBackground = () => {
    if (!hasScrolled) return 'bg-hero';
    
    switch (currentSection) {
      case 'hero':
        return 'bg-hero';
      case 'strike':
        return 'bg-strike';
      case 'fountain':
        return 'bg-fountain';
      case 'aioz':
        return 'bg-aioz';
      case 'about':
        return 'bg-gray-50';
      case 'contact':
      default:
        return 'bg-white';
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const headerHeight = 56; // Adjusted header height to match actual height (py-4 = 32px + some extra for border)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-10 backdrop-blur-sm shadow-sm transition-colors duration-300 ${getHeaderBackground()}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
        <div className="font-diatype font-medium">Nakamoto Design Co</div>
        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8 font-diatype">
          <a href="#projects" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '.bg-strike')}>
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
              <a href="#projects" className="hover:text-gray-600 transition-colors" onClick={(e) => handleNavClick(e, '.bg-strike')}>
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