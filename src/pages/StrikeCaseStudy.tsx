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
import oldHometab from '../assets/images/old-Home tab.png';
import oldAccountTab from '../assets/images/old-Account tab.png';
import oldLightning from '../assets/images/old-Lightning.png';
import oldModal from '../assets/images/old-modal.png';
import boltCharacter from '../assets/images/bolt-character.gif';
import goalsImage from '../assets/images/Goals.png';
import cardSort from '../assets/images/card-sort.png';
import systemMap from '../assets/images/system-map.png';
import dontTrustVerify from '../assets/images/Don\'t trust verify.png';
import midfi from '../assets/images/midfi.png';
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
import { DirectionCarousel } from '../components/DirectionCarousel';

export function StrikeCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [oldPhoneLightboxOpen, setOldPhoneLightboxOpen] = useState(false);
  const [oldPhoneLightboxIndex, setOldPhoneLightboxIndex] = useState(0);
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

  const openOldPhoneLightbox = (index: number) => {
    setOldPhoneLightboxIndex(index);
    setOldPhoneLightboxOpen(true);
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
      </section>

      {/* Introduction section */}
      <section className="bg-black text-white pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          {/* Strike logo */}
          <div className="mb-8">
            <img 
              src={strikeLogo} 
              alt="Strike logo" 
              className="w-8 h-8"
            />
          </div>
          
          {/* Introduction heading */}
          <h2 className="text-4xl font-diatype-mono font-normal mb-6">Introduction</h2>
          
          {/* Introduction text */}
          <p className="text-[1.6rem] leading-[1.6] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype text-secondary-grey">
            Strike is one of the world's leading Bitcoin companies, live in over 100+ countries and trusted by more than 1.5 million users. Its mission is simple but bold: change how money moves across the globe. But our mobile app wasn't keeping up.
          </p>
        </div>
      </section>

      {/* Banner section */}
      <section className="w-full bg-black py-16 md:py-24">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
        <div className="flex w-full h-full">
          {/* Banner image */}
          <div className="w-full flex flex-col items-center">
            <img 
              src={strikeBanner} 
              alt="Strike banner" 
              className="w-auto h-auto object-contain"
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
        </div>
      </section>

      {/* Problem statement section */}
      <section className="bg-black text-white pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          <div className="max-w-6xl font-diatype font-light text-gray-300">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] mb-8 text-white">
              Users were confused about which currency they were using. The style felt playful instead of global. Some features, like "Top People" on the homepage, didn't add real value and only made the experience noisier. Even basic things, like understanding wallet balances, weren't as clear as they needed to be.
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] text-white">
              I saw this as an opportunity—a chance to help Strike level up and build the product it deserved.
            </p>
          </div>
        </div>
      </section>

      {/* Phone showcase section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          {/* Title and keyline with left margin */}
          <div className="mb-12 md:mb-16">
            <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
            <h2 className="text-[2rem] font-diatype-mono font-normal text-white">
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
                      className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer border-[8px] md:border-[12px] lg:border-[16px] xl:border-[20px] border-[#141414]"
                      onClick={() => openOldPhoneLightbox(index)}
                    />
                  ) : (
                    <div className="w-auto h-auto max-h-[812px] bg-gray-800 rounded-[40px] flex items-center justify-center border-[20px] border-[#141414]">
                      <span className="text-gray-400 text-sm">{item.alt}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stepping Up section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div>
              <h2 className="text-[2rem] font-diatype-mono font-normal text-white mb-8">
                Stepping Up
              </h2>
              <div className="space-y-6">
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  I was excited to lead this mobile rebrand. It was one of the biggest projects I'd ever headed up, and I knew it would stretch me as both a designer and a leader.
                </p>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  It was fast-paced, demanding, and incredibly fulfilling. We were a small, scrappy team working long days, driven by the belief that we could make something better. It became one of the products I'm most proud of in my career.
                </p>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="flex justify-center lg:justify-end">
              <a 
                href="https://shotopop.com/strike" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={boltCharacter} 
                  alt="Lightning character illustration"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Setting the compass section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          {/* Intro paragraph */}
          <div className="mb-12 md:mb-16">
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype font-light text-white">
              Before diving in, I believe in setting clear goals. They're the compass that keeps the team aligned and the work focused. For this project, we zeroed in on three:
            </p>
          </div>
          
          {/* Venn diagram and goals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Venn diagram */}
            <div className="flex justify-center lg:justify-start h-full">
              <img 
                src={goalsImage} 
                alt="Project goals venn diagram"
                className="w-auto h-full max-w-full object-contain"
              />
            </div>
            
            {/* Goals content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-diatype-mono font-normal text-white mb-4">Business Goal</h3>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  Grow volume in features that drive revenue—global send, buying Bitcoin, and spending at merchants.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-diatype-mono font-normal text-white mb-4">User Goal</h3>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  Help users quickly find what they need so they can send funds, buy Bitcoin, and spend without friction.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl md:text-2xl font-diatype-mono font-normal text-white mb-4">Project Goal</h3>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  Create a new app framework that brings the brand to life and makes the experience simpler, clearer, and easier to navigate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finding Clarity section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <div>
              <h2 className="text-[2rem] font-diatype-mono font-normal text-white mb-8">
                Finding Clarity
              </h2>
              <div className="space-y-6">
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  We used card sorting to understand how people naturally group concepts. The sessions revealed a key insight: we needed to separate the cash (USD/USDT) side of the app from the Bitcoin side.
                </p>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  These worlds were blended together, creating confusion. Once separated, it felt obvious. This insight led to a visual idea: a card-based UI where cash and Bitcoin lived on separate "planes," yet could still connect when needed.
                </p>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  It offered clarity—and a certain elegance—that felt right for the brand.
                </p>
              </div>
            </div>
            
            {/* Card sort image */}
            <div className="flex justify-center lg:justify-end">
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
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          {/* Text and Don't trust verify image in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-6">
            {/* Text content */}
            <div>
              <h2 className="text-[2rem] font-diatype-mono font-normal text-white mb-8">
                Building the Blueprint
              </h2>
              <div className="space-y-6">
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  From there, we built a system map. For me, that's like laying the foundation of a house. Without it, you risk jumping into high-fidelity screens without knowing how the rooms connect.
                </p>
                <div>
                  <p className="text-[1.6rem] leading-[1.6] font-diatype text-white mb-4">
                    The system map:
                  </p>
                  <div className="space-y-4">
                    <p className="text-[1.6rem] leading-[1.6] font-diatype text-white">
                      • Aligned the team on how the app should be organized
                    </p>
                    <p className="text-[1.6rem] leading-[1.6] font-diatype text-white">
                      • Helped us spot potential conflicts early
                    </p>
                    <p className="text-[1.6rem] leading-[1.6] font-diatype text-white">
                      • Became a single source of truth we could refer back to when details got messy
                    </p>
                  </div>
                </div>
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  It wasn't fixed in stone, but it gave everyone—from design to product to engineering—a shared vision for how the new app could work.
                </p>
              </div>
            </div>
            
            {/* Don't trust verify image */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex flex-col items-end">
                <img 
                  src={dontTrustVerify} 
                  alt="Don't trust verify graphic"
                  className="w-auto h-auto max-w-full object-contain"
                />
                <div className="mt-1">
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
          </div>
          
          {/* System map image - full width */}
          <div className="w-full">
            <img 
              src={systemMap} 
              alt="System map showing app architecture and user flows"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Exploring the Design section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
          {/* Text and Bitcoin GIF in two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-24">
            {/* Text content */}
            <div>
              <h2 className="text-[2rem] font-diatype-mono font-normal text-white mb-8">
                Exploring the Design
              </h2>
              <div className="space-y-6">
                <p className="text-[1.6rem] leading-[1.6] font-diatype text-secondary-grey">
                  Next, we moved into low-fidelity wireframes, deliberately keeping things rough so we could focus on content and flow before worrying about visuals. FigJam was our tool of choice because it kept us constrained to simple shapes and text, forcing clarity.
                </p>
              </div>
            </div>
            
            {/* Bitcoin GIF */}
            <div className="flex justify-center lg:justify-end">
              <a 
                href="https://shotopop.com/strike" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src={buyBitcoin} 
                  alt="Bitcoin purchase animation"
                  className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                />
              </a>
            </div>
          </div>
          
          {/* Mid-fi wireframes - full width */}
          <div className="w-full">
            <img 
              src={midfi} 
              alt="Mid-fidelity wireframes showing app flows and user journeys"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Three Design Directions section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1680px] mx-auto">
                    <div className="space-y-6 mb-24">
                              <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype font-light text-white">
                  Once we were confident in the content and architecture, we stepped into mid-fidelity designs.
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl xl:text-[2.8rem] leading-[1.4] md:leading-[1.35] lg:leading-[1.3] xl:leading-[1.25] tracking-[-0.02em] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype font-light text-white">
                  We ran two rounds of explorations, each time creating three distinct directions.
                </p>
              <p className="text-[1.6rem] leading-[1.6] max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl font-diatype text-secondary-grey">
                Why three? We had three designers focusing on visuals at that stage, and giving each person a direction allowed us to explore more ground. Leadership would pick a favorite, and we'd refine it further in the next round. There were no heated debates, just collaborative discussions and healthy feedback loops.
              </p>
                        </div>
            
            {/* Title and keyline with left margin */}
            <div className="mb-12 md:mb-16">
              <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
              <h3 className="text-[2rem] font-diatype-mono font-normal text-white">
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
          <div className="mb-12 md:mb-16 mt-20 md:mt-24">
            <div className="w-16 h-px bg-[#FFC4C4] mb-6"></div>
            <h3 className="text-[2rem] font-diatype-mono font-normal text-white">
              Round 2
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
        </div>
      </section>
    </div>
  );
} 