import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ImageCredit } from '../components/ImageCredit';

// Import Strike project images
import strike1 from '../assets/images/strike1.png';
import strike2 from '../assets/images/strike2.png';
import strike3 from '../assets/images/strike3.png';
import strike4 from '../assets/images/strike4.png';
import strikeLogo from '../assets/images/Strike logo.svg';
import strikeBanner from '../assets/images/Strike-banner.png';

export function StrikeCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const images = [strike1, strike2, strike3, strike4];
  const lightboxSlides = images.map(src => ({ src }));

  // Handle scroll direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past initial 100px
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">
      {/* Header with back button */}
      <header className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Strike Case Study</h1>
          </div>
        </div>
      </header>

      {/* Hero section - mirroring ProjectFeature layout */}
      <section className="bg-strike h-[90vh] flex flex-col justify-center">
        {/* Image grid - same as ProjectFeature */}
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <img 
                  src={image} 
                  alt={`Strike screenshot ${index + 1}`}
                  className="w-full h-auto rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      </section>

      {/* Introduction section */}
      <section className="bg-black text-white pt-16 pb-10">
        <div className="px-6 md:px-12 lg:px-24">
          {/* Strike logo */}
          <div className="mb-8">
            <img 
              src={strikeLogo} 
              alt="Strike logo" 
              className="w-8 h-8"
            />
          </div>
          
          {/* Introduction heading */}
          <h2 className="text-4xl font-diatype-mono font-bold mb-6">Introduction</h2>
          
          {/* Introduction text */}
          <p className="text-lg md:text-xl lg:text-2xl xl:text-[2rem] leading-[1.6] md:leading-[1.5] lg:leading-[1.4] xl:leading-[1.35] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype text-gray-300">
            Strike is one of the world's leading Bitcoin companies, live in over 100+ countries and trusted by more than 1.5 million users. Its mission is simple but bold: change how money moves across the globe. But our mobile app wasn't keeping up.
          </p>
        </div>
      </section>

      {/* Banner section */}
      <section className="w-full px-6 md:px-12 lg:px-24 bg-black py-8">
        <div className="flex w-full h-full">
          {/* Banner image */}
          <div className="w-full flex flex-col items-center">
            <img 
              src={strikeBanner} 
              alt="Strike banner" 
              className="w-full h-auto object-contain"
            />
            <div className="mt-1 w-full flex justify-end">
              <a 
                href="https://theafrix.co/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <ImageCredit credit="The Afrix" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem statement section */}
      <section className="bg-black text-white pt-4 pb-12">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl font-diatype font-light text-gray-300">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] mb-8">
              Users were confused about which currency they were using. The style felt playful instead of global. Some features, like "Top People" on the homepage, didn't add real value and only made the experience noisier. Even basic things, like understanding wallet balances, weren't as clear as they needed to be.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em]">
              I saw this as an opportunity—a chance to help Strike level up and build the product it deserved.
            </p>
          </div>
        </div>
      </section>

      {/* Case study content */}
      <main className="px-6 md:px-12 lg:px-24 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Strike: Lightning Network Payment App
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8 max-w-2xl font-diatype leading-[1.6]">
            A comprehensive case study of my work on Strike, a revolutionary Bitcoin Lightning Network payment application.
          </p>
          
          {/* Placeholder content - we'll expand this later */}
          <div className="bg-gray-50 p-8 rounded-lg max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Case Study Content Coming Soon</h2>
            <p className="text-gray-600">
              This case study will include detailed information about the project scope, 
              technical challenges, design decisions, and outcomes. We'll structure this 
              content in the next phase.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 