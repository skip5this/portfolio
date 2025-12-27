import React, { useState, useEffect, useRef } from 'react';
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
import oldHometab from '../assets/images/old-Home tab.png';
import oldAccountTab from '../assets/images/old-Account tab.png';
import oldLightning from '../assets/images/old-Lightning.png';
import oldModal from '../assets/images/old-modal.png';
import boltCharacter from '../assets/images/bolt-character.gif';
import goalsImage from '../assets/images/Goals.png';
import cardSort from '../assets/images/card-sort.png';

import dontTrustVerify from '../assets/images/Don\'t trust verify.png';

import buyBitcoin from '../assets/images/Buybitcoin.gif';
import r1d1Home from '../assets/images/r1d1-home.png';
import r1d1Btc from '../assets/images/r1d1-btc.png';
import r1d1Transfer from '../assets/images/r1d1transfer.png';
import r1d1Home2 from '../assets/images/r1d1-home2.gif';
import r1d12Money from '../assets/images/r1d12-Money.png';
import r1d2Bitcoin from '../assets/images/r1d2-Bitcoin.png';
import r1d2Menu from '../assets/images/r1d2-Menu.png';
import r1d2Valid from '../assets/images/r1d2-Valid.png';
import r1d31 from '../assets/images/r1d3-1.png';
import r1d32 from '../assets/images/r1d3-2.png';
import r1d33 from '../assets/images/r1d3-3.png';
import r1d34 from '../assets/images/r1d3-4.png';
import r2d11 from '../assets/images/r2d1-1.png';
import r2d12 from '../assets/images/r2d1-2.png';
import r2d21 from '../assets/images/r2d2-1.png';
import r2d22 from '../assets/images/r2d2-2.png';
import r2d31 from '../assets/images/r2d3-1.png';
import r2d32 from '../assets/images/r2d3-2.png';
import planeTransition from '../assets/images/plane-transition.png';
import wallPosters from '../assets/images/wallposters.png';
import splashes from '../assets/images/splashes.png';
import typeImage from '../assets/images/type.png';
import accessibilityImage from '../assets/images/accessability.png';
import semanticImage from '../assets/images/semantic.png';
import tokensImage from '../assets/images/tokens.png';
import annotationImage from '../assets/images/Annotation.png';
import roadmapImage from '../assets/images/roadmap.png';
import appInPhoneImage from '../assets/images/appinphone.png';
import bootScreenImage from '../assets/images/bootscreen.png';
import systemMap2 from '../assets/images/system-map2.png';
import midfi2 from '../assets/images/midfi-2.png';
import bottomRowExps from '../assets/images/BottomRowExps.png';
import testflightImage from '../assets/images/testflight.png';
import storybookImage from '../assets/images/Storybook and project tracker.png';
import fixTheMoneyWhite from '../assets/images/Fix the money white.png';
import manuelaImage from '../assets/images/Manuela.png';
import spotGif from '../assets/images/Spot.gif';
import payInStoreGif from '../assets/images/PayInStore.gif';
import strikeCircleGuy from '../assets/images/strike-circle-guy.gif';
import boltGuy from '../assets/images/bolt-guy.gif';
import balloonsPhoneRight from '../assets/images/Balloonsphoneright.gif';
import middlePhone from '../assets/images/Middlephone.gif';
import paperplanePhone from '../assets/images/Paperplanephone.gif';
import grabCursor from '../assets/images/Cursor/Grab.svg';
import grabbedCursor from '../assets/images/Cursor/Grabbed.svg';
import { DirectionCarousel } from '../components/DirectionCarousel';
import { Round2Carousel } from '../components/Round2Carousel';
import { Footer } from '../components/Footer';

export function StrikeCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [oldPhoneLightboxOpen, setOldPhoneLightboxOpen] = useState(false);
  const [oldPhoneLightboxIndex, setOldPhoneLightboxIndex] = useState(0);
  const [designSystemLightboxOpen, setDesignSystemLightboxOpen] = useState(false);
  const [designSystemLightboxIndex, setDesignSystemLightboxIndex] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [quoteRotation, setQuoteRotation] = useState(-2);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);

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

  // Handle quote box rotation on scroll
  useEffect(() => {
    const handleQuoteRotation = () => {
      if (!testimonialsSectionRef.current) return;

      const section = testimonialsSectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;
      
      // Calculate section position
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const sectionCenter = sectionTop + sectionHeight / 2;
      
      // Calculate distance from section center to viewport center
      // When section center is above viewport center, rotation starts at -2
      // When section center is below viewport center, rotation ends at +2
      const distanceFromCenter = sectionCenter - viewportCenter;
      
      // Normalize the distance: use section height + viewport height as the range
      const maxDistance = (sectionHeight + windowHeight) / 2;
      const normalizedDistance = distanceFromCenter / maxDistance;
      
      // Map normalized distance to rotation: -1 to +1 maps to -2 to +2 degrees
      let progress = (normalizedDistance + 1) / 2; // Convert from [-1, 1] to [0, 1]
      
      // Clamp progress between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      // Map from -2 to +2 degrees
      const rotation = -2 + (progress * 4);
      setQuoteRotation(rotation);
    };

    window.addEventListener('scroll', handleQuoteRotation, { passive: true });
    window.addEventListener('resize', handleQuoteRotation, { passive: true });
    handleQuoteRotation(); // Initial calculation
    return () => {
      window.removeEventListener('scroll', handleQuoteRotation);
      window.removeEventListener('resize', handleQuoteRotation);
    };
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openOldPhoneLightbox = (index: number) => {
    setOldPhoneLightboxIndex(index);
    setOldPhoneLightboxOpen(true);
  };

  const openDesignSystemLightbox = (index: number) => {
    setDesignSystemLightboxIndex(index);
    setDesignSystemLightboxOpen(true);
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
      <section className="bg-strike min-h-[60vh] md:h-[90vh] flex flex-col justify-center pt-16">
        {/* Image grid - same as ProjectFeature */}
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {images.map((image, index) => (
              <div key={index} className={`relative w-full md:py-0 ${
                index < 2 ? 'pt-8 md:pt-0' : 'pb-8 md:pb-0'
              }`}>
                <img 
                  src={image} 
                  alt={`Strike screenshot ${index + 1}`}
                  className="w-auto h-auto rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
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

        {/* Old Phone Lightbox */}
        <Lightbox
          open={oldPhoneLightboxOpen}
          close={() => setOldPhoneLightboxOpen(false)}
          index={oldPhoneLightboxIndex}
          slides={[
            { src: oldHometab },
            { src: oldAccountTab },
            { src: oldLightning },
            { src: oldModal }
          ]}
        />

        {/* Design System Lightbox */}
        <Lightbox
          open={designSystemLightboxOpen}
          close={() => setDesignSystemLightboxOpen(false)}
          index={designSystemLightboxIndex}
          slides={[
            { src: tokensImage },
            { src: semanticImage },
            { src: accessibilityImage },
            { src: typeImage },
            { src: annotationImage },
            { src: systemMap2 },
            { src: midfi2 }
          ]}
        />
      </section>

      {/* Introduction section */}
      <section className="bg-black text-white pt-40 md:pt-48 pb-0">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Strike logo */}
          <div className="mb-8">
            <img 
              src={strikeLogo} 
              alt="Strike logo" 
              className="w-8 h-8"
            />
          </div>
          
          {/* Introduction heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-diatype-mono font-normal mb-6">Introduction</h2>
          
          {/* Introduction text */}
          <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.6] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl font-diatype text-secondary-grey">
            Strike is one of the world's leading Bitcoin companies, available in over 100 countries and trusted by more than 1.5 million users. Its mission is bold yet simple: to change how money moves globally. But the mobile app had fallen behind—so we were brought in to apply a recent rebrand from the ground up.
          </p>
        </div>
      </section>

      {/* Phone showcase section */}
      <section className="bg-black text-white pt-40 md:pt-48 pb-20 md:pb-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Title and keyline with left margin */}
          <div className="mb-12 md:mb-16">
            <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
            <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white">
              Strike before the facelift
            </h2>
          </div>
          
          {/* Phone grid - reusing hero section behavior */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-8 xl:gap-12">
              {[
                { image: oldHometab, alt: 'Old home tab' },
                { image: oldAccountTab, alt: 'Old account tab' },
                { image: oldLightning, alt: 'Old lightning' },
                { image: oldModal, alt: 'Old modal' }
              ].map((item, index) => (
                <div key={index} className={`relative w-full md:py-0 ${
                  index < 2 ? 'pt-8 md:pt-0' : 'pb-8 md:pb-0'
                }`}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.alt}
                      className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer border-[4px] md:border-[8px] lg:border-[12px] xl:border-[16px] border-[#141414]"
                      onClick={() => openOldPhoneLightbox(index)}
                    />
                  ) : (
                    <div className="w-auto h-auto max-h-[812px] bg-gray-800 rounded-[40px] flex items-center justify-center border-[4px] md:border-[8px] lg:border-[12px] xl:border-[16px] border-[#141414]">
                      <span className="text-gray-400 text-sm">{item.alt}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem statement section */}
      <section className="bg-black text-white pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="max-w-6xl font-diatype font-light text-gray-300">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] text-white">
              Users were confused about which currency they were using. The style felt playful instead of global. Some features, like "Top People" on the homepage, didn't add real value and only made the experience noisier. Even basic things, like understanding wallet balances, weren't as clear as they needed to be.
            </p>
          </div>
        </div>
      </section>



      {/* Banner section */}
      <section className="w-full bg-black py-16 md:py-24">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
        <div className="flex w-full h-full">
          {/* Banner image */}
          <div className="w-full flex flex-col items-center">
            <img 
              src={strikeBanner} 
              alt="Strike banner" 
              className="w-auto h-auto object-contain"
            />
            {/* Caption and Credit */}
            <div className="flex justify-between items-center mt-2 w-full">
              <div className="text-white font-diatype-mono text-xs">
                Example of the new Strike branding
              </div>
              <div className="text-gray-400 font-diatype-mono text-xs">
                Credit: <a href="https://theafrix.co/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">The Afrix</a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Stepping Up section */}
      <section className="bg-black text-white pt-20 md:pt-32 pb-0">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Illustration */}
          <div className="flex justify-start mb-12 md:mb-16">
            <a 
              href="https://shotopop.com/strike" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={boltCharacter} 
                alt="Lightning character illustration"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </a>
          </div>
          
          {/* Text content */}
          <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
            <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
              Stepping Up
            </h2>
            <div className="space-y-8">
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                I was excited to lead this mobile rebrand. It was one of the biggest projects I'd ever headed up, and I knew it would stretch me as both a designer and a leader.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                It was fast-paced, demanding, and incredibly fulfilling. We were a small, scrappy team working long days, driven by the belief that we could make something better. It became one of the products I'm most proud of in my career.
              </p>
            </div>
          </div>
          
          {/* Pink line */}
          <div className="mt-40 md:mt-48">
            <div className="w-16 h-px bg-[#FFC4C4]"></div>
          </div>
        </div>
      </section>

      {/* Setting the compass section */}
      <section className="bg-black text-white pt-40 md:pt-48 pb-20 md:pb-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Heading and intro paragraph */}
          <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mb-24 md:mb-32">
            <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
              Setting the compass
            </h2>
            <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
              Before diving in, I believe in setting clear goals. They're the compass that keeps the team aligned and the work focused. For this project, we zeroed in on three:
            </p>
          </div>
          
          {/* Goals and Venn diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Goals content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">Business Goal</h3>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Grow volume in revenue-driving features: global send, buy Bitcoin, and merchant spend.
                </p>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">User Goal</h3>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Help people find, send, buy, and spend—fast and friction-free.
                </p>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] font-diatype font-normal text-white mb-4">Project Goal</h3>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Create an app framework that brings the brand to life while making navigation simpler and clearer.
                </p>
              </div>
            </div>
            
            {/* Venn diagram */}
            <div className="flex items-center justify-center lg:justify-end">
              <img 
                src={goalsImage} 
                alt="Project goals venn diagram"
                className="w-auto h-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Finding Clarity section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text content */}
            <div>
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Finding Clarity
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Card sorting revealed how users naturally grouped concepts — and the insight was simple but powerful: cash (USD/USDT) and Bitcoin needed to live apart.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  When these worlds were blended, people got confused. Once separated, the app felt intuitive.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  That realization inspired a card-based design: two distinct "planes" for cash and Bitcoin—connected when needed, yet clearly their own. Elegant, obvious, right for the brand.
                </p>
              </div>
            </div>
            
            {/* Card sort image */}
            <div className="flex items-center justify-center lg:justify-end">
              <img 
                src={cardSort} 
                alt="Card sorting results showing app categories"
                className="w-auto h-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Building the Blueprint section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* System map image and text in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-6">
            {/* Text content */}
            <div>
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Building the Blueprint
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  From there, we built a system map. For me, that's like laying the foundation of a house. Without it, you risk jumping into high-fidelity screens without knowing how the rooms connect.
                </p>
                <div>
                  <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-white mb-4">
                    The system map:
                  </p>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                      • Aligned the team on how the app should be organized
                    </p>
                    <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                      • Helped us spot potential conflicts early
                    </p>
                    <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                      • Became a single source of truth we could refer back to when details got messy
                    </p>
                  </div>
                </div>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  It wasn't fixed in stone, but it gave everyone—from design to product to engineering—a shared vision for how the new app could work.
                </p>
              </div>
            </div>
            
            {/* System map image */}
            <div className="flex items-center justify-center lg:justify-end">
              <img 
                src={systemMap2} 
                alt="System map showing app architecture and user flows"
                className="w-full h-auto max-w-full object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                onClick={() => openDesignSystemLightbox(5)}
              />
            </div>
          </div>
          

        </div>
      </section>

      {/* Exploring the Design section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Text and Wireframe image in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-16 md:mb-24">
            {/* Text content */}
            <div>
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Exploring the Design
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Next, we moved into low-fidelity wireframes, deliberately keeping things rough so we could focus on content and flow before worrying about visuals. FigJam was our tool of choice because it kept us constrained to simple shapes and text, forcing clarity.
                </p>
              </div>
            </div>
            
            {/* Wireframe image */}
            <div className="flex items-center justify-center lg:justify-end">
              <img 
                src={midfi2} 
                alt="Mid-fidelity wireframes showing app flows and user journeys"
                className="w-full h-auto max-w-full object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                onClick={() => openDesignSystemLightbox(6)}
              />
            </div>
          </div>
          

        </div>
      </section>

      {/* Three Design Directions section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Bitcoin hand illustration */}
          <div className="flex justify-start mb-12 md:mb-16">
            <a 
              href="https://shotopop.com/strike" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={buyBitcoin} 
                alt="Bitcoin purchase animation"
                className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </a>
          </div>
          
          <div className="space-y-6">
                              <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl font-diatype font-light text-white">
                  Once we were confident in the content and architecture, we stepped into mid-fidelity designs.
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl font-diatype font-light text-white">
                  We ran two rounds of explorations, each time creating three distinct directions.
                </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.6] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl font-diatype text-secondary-grey">
                Why three? We had three designers focusing on visuals at that stage, and giving each person a direction allowed us to explore more ground. Leadership would pick a favorite, and we'd refine it further in the next round. There were no heated debates, just collaborative discussions and healthy feedback loops.
              </p>
                        </div>
            
            {/* Title and keyline with left margin */}
            <div className="mt-40 md:mt-48 mb-12 md:mb-16">
              <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
              <h3 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white">
                Round 1
              </h3>
            </div>
            
            <DirectionCarousel 
              directions={[
              {
                title: "Direction 1",
                images: [r1d1Home2, r1d1Home, r1d1Btc, r1d1Transfer],
                alt: "Design direction 1 showing app screens"
              },
              {
                title: "Direction 2", 
                images: [r1d12Money, r1d2Bitcoin, r1d2Menu, r1d2Valid],
                alt: "Design direction 2 showing app screens"
              },
              {
                title: "Direction 3",
                images: [r1d31, r1d32, r1d33, r1d34],
                alt: "Design direction 3 showing app screens"
              }
            ]}
          />
          
          {/* Title and keyline with left margin for Round 2 */}
          <div className="mb-12 md:mb-16 mt-40 md:mt-48">
            <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
            <h3 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white">
              Round 2
            </h3>
          </div>
          
          <Round2Carousel 
            directions={[
              {
                title: "Direction 1\nSwiss Army Knife",
                summary: "Planes as \"Cards\". Cards have preview and full states that allow for progressive disclosure (i.e, reduces cognitive overload). No real navigation, all content takes place on \"one page\". Secondary card surfaces are transparent that emphasize the layers. Background illustration will change between \"Dollars\" and \"Bitcoin\" to better help the user understand they are in a different \"section\".",
                ratings: [
                  {
                    goal: "Increase volume to monetized features including Global Send, Pay in Store, and Buy Bitcoin.",
                    rating: 4
                  },
                  {
                    goal: "Make it easier for users to know at a single glance what all the key features of Strike are (e.g., Swiss army knife)",
                    rating: 5
                  },
                  {
                    goal: "Develop a new framework that better differentiates between Cash and Bitcoin so users aren't confused as to what currency they are sending / requesting.",
                    rating: 4
                  },
                  {
                    goal: "Develop a new information architecture that will gracefully scale to accommodate at least 3 new (not cash or bitcoin related) features",
                    rating: 5
                  }
                ],
                leftImage: r2d11,
                rightImage: r2d12,
                alt: "Design direction 1 showing app screens"
              },
              {
                title: "Direction 2\nRestrained",
                summary: "Planes as 'Pages'. Pages are one long scroll, there is no preview / full state. Primary and secondary actions are dictated by order of reveal. Visual transition between pages (friction) helps user better understand shift between Cash and Bitcoin. Restrained visual approach, no cards or surfaces. Pills are used to indicate 'pages' and 'categories'. Developing micro-animations and transitions between pages and cards will help us better convey to the user a change is taking place within app if we pursue a more minimal facing app aesthetic.",
                ratings: [
                  {
                    goal: "Increase volume to monetized features including Global Send, Pay in Store, and Buy Bitcoin.",
                    rating: 3
                  },
                  {
                    goal: "Make it easier for users to know at a single glance what all the key features of Strike are (e.g., Swiss army knife)",
                    rating: 2
                  },
                  {
                    goal: "Develop a new framework that better differentiates between Cash and Bitcoin so users aren't confused as to what currency they are sending / requesting.",
                    rating: 5
                  },
                  {
                    goal: "Develop a new information architecture that will gracefully scale to accommodate at least 3 new (not cash or bitcoin related) features",
                    rating: 3
                  }
                ],
                leftImage: r2d21,
                rightImage: r2d22,
                alt: "Design direction 2 showing app screens"
              },
              {
                title: "Direction 3\nPower Bar",
                summary: "Planes as \"tabs\". \"Power bar\" breaks app into two distinct sections, should have some element of personalization that allows us to serve up repeated actions. All primary actions / information are displayed in card surfaces, all secondary actions are in labels.",
                ratings: [
                  {
                    goal: "Increase volume to monetized features including Global Send, Pay in Store, and Buy Bitcoin.",
                    rating: 5
                  },
                  {
                    goal: "Make it easier for users to know at a single glance what all the key features of Strike are (e.g., Swiss army knife)",
                    rating: 4
                  },
                  {
                    goal: "Develop a new framework that better differentiates between Cash and Bitcoin so users aren't confused as to what currency they are sending / requesting.",
                    rating: 5
                  },
                  {
                    goal: "Develop a new information architecture that will gracefully scale to accommodate at least 3 new (not cash or bitcoin related) features",
                    rating: 3
                  }
                ],
                leftImage: r2d31,
                rightImage: r2d32,
                alt: "Design direction 3 showing app screens"
              }
            ]}
          />
          
          {/* Plane Transition Image */}
          <div className="mt-40 md:mt-48">
            <img 
              src={planeTransition} 
              alt="Plane transition showing design evolution"
              className="w-full h-auto object-contain rounded-lg"
            />
            
            {/* Caption and Credit */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-white font-diatype-mono text-xs">
                Direction 2 transition experiments
              </div>
              <div className="text-gray-400 font-diatype-mono text-xs">
                Credit: Joshua Philippe
              </div>
            </div>
          </div>

          {/* Wall Posters Image */}
          <div className="mt-40 md:mt-48">
            <img 
              src={wallPosters} 
              alt="Wall posters showing design concepts"
              className="w-full h-auto object-contain rounded-lg"
            />
            {/* Caption and Credit */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-white font-diatype-mono text-xs">
                Design concept posters
              </div>
              <div className="text-gray-400 font-diatype-mono text-xs">
                Credit: <a href="https://theafrix.co/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">The Afrix</a>
              </div>
            </div>
          </div>

          {/* Evolving the Design System section */}
          <div className="mt-40 md:mt-48">
            {/* Spot gif illustration */}
            <div className="flex justify-start mb-12 md:mb-16">
              <a 
                href="https://shotopop.com/strike" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={spotGif} 
                  alt="Spot character"
                  className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
                />
              </a>
            </div>
            
            <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Evolving the Design System
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  While we were exploring visuals and flows, we were also rethinking the design system. Thankfully, the old app—even if it wasn't the most beautiful—had a solid foundation. We took what worked, like the semantic color system, and typography stack we'd already built, and evolved it into something sharper and more modern.
                </p>
                
                <div>
                  <h3 className="text-white font-diatype font-medium mb-4 text-lg md:text-xl lg:text-[1.5rem] xl:text-[1.8rem]">We created:</h3>
                  <ul className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.6] font-diatype text-secondary-grey space-y-2">
                    <li className="flex items-start">
                      <span className="text-secondary-grey mr-3 flex-shrink-0 mt-0">•</span>
                      <span>A robust color system with semantic tokens</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-grey mr-3 flex-shrink-0 mt-0">•</span>
                      <span>A refined typography scale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-grey mr-3 flex-shrink-0 mt-0">•</span>
                      <span>Components tested for accessibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary-grey mr-3 flex-shrink-0 mt-0">•</span>
                      <span>Documentation to help engineering bring it all to life</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  There were debates over details—like how to handle table rows and specific UI patterns—but we worked through them as a team. In the end, we left the design system in a much stronger place.
                </p>
              </div>
            </div>
          </div>

          {/* Design System 2x2 Grid */}
          <div className="mt-32 md:mt-40 bg-[#141414] rounded-lg p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <div>
                <img 
                  src={tokensImage} 
                  alt="Design tokens and components"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openDesignSystemLightbox(0)}
                />
              </div>
              <div>
                <img 
                  src={semanticImage} 
                  alt="Semantic color system"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openDesignSystemLightbox(1)}
                />
              </div>
              <div>
                <img 
                  src={accessibilityImage} 
                  alt="Accessibility guidelines and testing"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openDesignSystemLightbox(2)}
                />
              </div>
              <div>
                <img 
                  src={typeImage} 
                  alt="Typography system specifications"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openDesignSystemLightbox(3)}
                />
              </div>
              <div className="col-span-2">
                <img 
                  src={annotationImage} 
                  alt="Design system annotations"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openDesignSystemLightbox(4)}
                />
              </div>
            </div>
          </div>

          {/* Wearing Two Hats section */}
          <div className="mt-40 md:mt-48">
            <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Wearing Two Hats
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  One of my biggest challenges—and biggest learnings—was balancing my role as both design leader and hands-on designer.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  I ran the project like clockwork: <span className="text-white">regular check-ins, clear schedules, and structured roadmaps</span>. It gave me space to jump into design myself—to push pixels and contribute screens alongside.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  We synced closely with product to keep everything connected and ensure our work could actually be built.
                </p>
              </div>
            </div>
          </div>

          {/* Q1 2024 Roadmap */}
          <div className="mt-40 md:mt-48">
            <img 
              src={roadmapImage} 
              alt="Q1 2024 Mobile bluesky sprint roadmap"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Navigating Curveballs section */}
          <div className="mt-40 md:mt-48">
            <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Navigating Curveballs
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  Halfway through, we hit two big curveballs: <span className="text-white">Layoffs reduced our product design team from five to three.</span>
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  A brand-new initiative landed on our plate: <span className="text-white">launching Strike in 65 additional countries</span> and <span className="text-white">building a global wallet</span> — all ahead of a major Bitcoin Conference presentation just two months away.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  It would have been easy to feel overwhelmed. But the team stayed motivated. We were excited about what we were building, and that sense of shared purpose kept us going—even during long days and high-pressure moments.
                </p>
              </div>
            </div>
          </div>

          {/* App Icon and Boot Screen */}
          <div className="mt-32 md:mt-40 bg-[#141414] rounded-lg p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <div>
                <img 
                  src={appInPhoneImage} 
                  alt="Strike app icon in phone interface"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                />
              </div>
              <div>
                <img 
                  src={bootScreenImage} 
                  alt="Strike app boot screen"
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning the Hard Way section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
            <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
              Learning the Hard Way
            </h2>
            <div className="space-y-8">
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                Not everything went smoothly.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                During QA, we tried an experimental bottom navigation. It was a single flipper button to switch between pages. We thought it was clever. Engineering hated it.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                Even though we tested it with users, the sample size was too small, and we were a little blinded by how cool we thought it was. Eventually, we admitted the truth: sometimes clarity beats cleverness. We switched back to a standard bottom nav. It was the right call.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                If I could go back, I'd skip the fancy nav entirely. I've learned <span className="text-white">it's better to be clear than clever</span>.
              </p>
            </div>
          </div>
          
          {/* Bottom row experiments image */}
          <div className="mt-40 md:mt-48 bg-[#141414] rounded-lg p-4 md:p-5 lg:p-6">
            <img 
              src={bottomRowExps} 
              alt="Bottom navigation design experiments showing Card, Detached Pill, and Attached Tab approaches"
              className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
            />
          </div>

          {/* TestFlight and Storybook images */}
          <div className="mt-16 md:mt-24 bg-[#141414] rounded-lg p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
              <img 
                src={testflightImage} 
                alt="TestFlight app showing Strike app builds"
                className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              />
              <img 
                src={storybookImage} 
                alt="Storybook component library and project tracker"
                className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Launch and looking back section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text content */}
            <div>
              <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
                Launch and looking back
              </h2>
              <div className="space-y-8">
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  We made it. We launched on time. And seeing the new app live in the App Store—now with a 4.8-star rating—felt incredible.
                </p>
                <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                  One of the proudest moments was watching <a href="https://www.youtube.com/watch?v=GbbRSsp4ocs&t=1045s" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-colors">Jack Mallers present our designs on stage at the Bitcoin 2023 Conference</a>. Seeing our screens up there, larger than life felt surreal.
                </p>
              </div>
            </div>
            
            {/* Statistics box */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-strike rounded-[40px] md:rounded-[50px] lg:rounded-[60px] p-12 md:p-16 lg:p-20 xl:p-24 flex flex-col items-center justify-center min-w-[280px] md:min-w-[320px] lg:min-w-[380px] xl:min-w-[420px]">
                <div className="text-black font-diatype font-medium text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4">
                  4.8 / 5
                </div>
                <div className="text-black font-diatype text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  21k reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phone GIFs section */}
      <section className="bg-black text-white pt-40 md:pt-48 pb-20 md:pb-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          {/* Phone grid */}
          <div className="bg-[#141414] rounded-lg p-4 md:p-5 lg:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              {[
                { image: paperplanePhone, alt: 'Paper plane phone animation' },
                { image: middlePhone, alt: 'Middle phone animation' },
                { image: balloonsPhoneRight, alt: 'Balloons phone animation' }
              ].map((item, index) => (
                <img 
                  key={index}
                  src={item.image} 
                  alt={item.alt}
                  className="w-full h-auto object-contain rounded-lg hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I learned section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl">
            <h2 className="text-xl md:text-2xl lg:text-[1.75rem] xl:text-[2rem] font-diatype-mono font-normal text-white mb-10 tracking-wide">
              What I learned
            </h2>
            <div className="space-y-8">
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                Leading the Strike mobile rebrand taught me a few things:
              </p>
              <ul className="space-y-2 text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                <li className="flex items-start">
                  <span className="mr-3 flex-shrink-0 mt-0 text-secondary-grey">•</span>
                  <span><span className="text-white">Start alignment early.</span> It saves time later.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex-shrink-0 mt-0 text-secondary-grey">•</span>
                  <span><span className="text-white">Clarity beats cleverness.</span> Every time.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex-shrink-0 mt-0 text-secondary-grey">•</span>
                  <span><span className="text-white">You can balance leading and designing.</span> If you build good systems, both roles thrive.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 flex-shrink-0 mt-0 text-secondary-grey">•</span>
                  <span><span className="text-white">Even big curveballs are manageable</span> when you have a team united by purpose.</span>
                </li>
              </ul>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                Mostly, I learned I can lead big, complex projects, and that I can have fun doing it.
              </p>
              <p className="text-base md:text-lg lg:text-xl xl:text-[1.75rem] leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-[1.7] font-diatype text-secondary-grey">
                I'm proud of what we built. And I'm even more excited for what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and Graphics section */}
      <section ref={testimonialsSectionRef} className="bg-black text-white py-20 md:py-32">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-stretch">
            {/* Top-left: Manuela Rios Testimonial */}
            <div 
              className="md:col-span-2 bg-strike rounded-3xl md:rounded-[40px] p-8 md:p-10 lg:p-12 transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${quoteRotation}deg)` }}
            >
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-diatype font-medium text-gray-700">
                  The bottom line is that any company would be lucky to work with Scott.
                </h3>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-diatype text-gray-700">
                  I worked directly with Scott at Strike from 2021 to 2023. Scott's dedication to his craft, exceptional work ethic, and keen eye for design make him a standout professional in the industry. His expertise in UI design, design systems, and UX is truly remarkable, but what sets him apart is his innate ability to lead projects from inception to completion through great collaboration and effective project management.
                </p>
                <p className="text-sm md:text-base font-diatype text-gray-700">
                  Manuela Rios - President at Strike
                </p>
              </div>
            </div>

            {/* Top-right: Manuela Rios Poster */}
            <div className="flex items-stretch justify-center md:justify-end">
              <img 
                src={manuelaImage} 
                alt="Manuela Rios spotlight poster" 
                className="w-full h-full rounded-3xl md:rounded-[40px] object-cover"
                style={{ objectPosition: 'top right' }}
              />
            </div>

            {/* Bottom-left: Fix the money graphic */}
            <div className="flex items-stretch justify-center md:justify-start">
              <img 
                src={fixTheMoneyWhite} 
                alt="Fix the money, fix the world" 
                className="w-full h-full rounded-3xl md:rounded-[40px] object-cover"
              />
            </div>

            {/* Bottom-right: Joshua Phillipe Testimonial */}
            <div 
              className="md:col-span-2 bg-strike rounded-3xl md:rounded-[40px] p-8 md:p-10 lg:p-12 transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${quoteRotation}deg)` }}
            >
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-diatype font-medium text-gray-700">
                  Scott's impact on the team has been immense.
                </h3>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-diatype text-gray-700">
                  A highly talented product designer, his creativity, dedication, and work ethic left a lasting mark on Strike. Across both mobile and desktop platforms, he consistently delivered exceptional design work.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed font-diatype text-gray-700">
                  His easygoing, collaborative nature made him approachable and helped foster a positive, enjoyable work environment. Even under pressure, Scott stayed calm and composed.
                </p>
                <p className="text-sm md:text-base font-diatype text-gray-700">
                  Joshua Phillipe - Head of Design at Fold (ex Strike)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* That's all folks section */}
      <section className="bg-black text-white py-32 md:py-48 lg:py-64">
        <div className="px-8 md:px-16 lg:px-32 xl:px-48 max-w-[1680px] mx-auto">
          <div className="flex flex-col items-center justify-center space-y-12 md:space-y-16">
            <a 
              href="https://shotopop.com/strike" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={spotGif} 
                alt="Spot character" 
                className="w-auto h-auto max-w-[200px] md:max-w-[300px]"
              />
            </a>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl font-diatype text-white">
              That's all folks
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 