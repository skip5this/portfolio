import React, { useState, useEffect, useRef } from 'react';
import { ImageCredit } from './ImageCredit';

interface Round2DirectionProps {
  title: string;
  summary: string;
  ratings: {
    goal: string;
    rating: number; // 1-5 stars
  }[];
  leftImage: string;
  rightImage: string;
  alt: string;
  credit?: string;
}

export function Round2Direction({ 
  title, 
  summary, 
  ratings, 
  leftImage, 
  rightImage, 
  alt, 
  credit 
}: Round2DirectionProps) {
  const phonesSectionRef = useRef<HTMLDivElement>(null);
  const [phoneRotation, setPhoneRotation] = useState(-2);

  // Handle phone rotation on scroll
  useEffect(() => {
    const handlePhoneRotation = () => {
      if (!phonesSectionRef.current) return;

      const section = phonesSectionRef.current;
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
      setPhoneRotation(rotation);
    };

    window.addEventListener('scroll', handlePhoneRotation, { passive: true });
    window.addEventListener('resize', handlePhoneRotation, { passive: true });
    handlePhoneRotation(); // Initial calculation
    return () => {
      window.removeEventListener('scroll', handlePhoneRotation);
      window.removeEventListener('resize', handlePhoneRotation);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-white' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  return (
    <div className="w-full">
      {/* Mobile: flex-col, Desktop: grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto] gap-8 lg:gap-12">
        {/* Direction Title - Mobile: order 1, Desktop: column 1, row 1 */}
        <div className="order-1 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2">
          <h3 className="text-lg font-diatype-mono font-normal mb-6 lg:mb-4 whitespace-pre-line">
            {title.split('\n').map((line, index) => (
              <div key={index} className={index === 0 ? 'text-secondary-grey' : 'text-white'}>
                {line}
              </div>
            ))}
          </h3>
        </div>
        
        {/* Phone images - Mobile: order 2, Desktop: columns 2-3, rows 1-3 (spans all rows) */}
        <div ref={phonesSectionRef} className="order-2 lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-4 grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-12 lg:self-start">
          {/* Left phone image */}
          <div className="flex flex-col items-start transition-transform duration-300 ease-out" style={{ transform: `rotate(${phoneRotation}deg)` }}>
            <div className="text-white font-diatype text-sm mb-2">Cash Surface</div>
            <div className="w-full max-w-[400px] h-px bg-white/20 mb-6"></div>
            <img 
              src={leftImage} 
              alt={`${alt} - left screen`}
              className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] object-contain pointer-events-none"
            />
          </div>
          
          {/* Right phone image */}
          <div className="flex flex-col items-start transition-transform duration-300 ease-out" style={{ transform: `rotate(${phoneRotation}deg)` }}>
            <div className="text-white font-diatype text-sm mb-2">Bitcoin Surface</div>
            <div className="w-full max-w-[400px] h-px bg-white/20 mb-6"></div>
            <img 
              src={rightImage} 
              alt={`${alt} - right screen`}
              className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] object-contain pointer-events-none"
            />
          </div>
        </div>
        
        {/* Key Concepts - Mobile: order 3, Desktop: column 1, row 2 (middle) */}
        <div className="order-3 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:mt-4">
          <h4 className="text-white font-diatype font-medium mb-4">Key Concepts</h4>
          <div className="text-secondary-grey font-diatype text-sm leading-relaxed space-y-2">
            {summary.split('. ').map((point, index) => (
              point.trim() && (
                <div key={index} className="flex items-start">
                  <span className="text-secondary-grey mr-3 flex-shrink-0 mt-0">•</span>
                  <span className="flex-1">{point.trim()}</span>
                </div>
              )
            ))}
          </div>
        </div>
        
        {/* Ratings - Mobile: order 4, Desktop: column 1, row 3 (bottom) */}
        <div className="order-4 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 lg:mt-4 lg:mb-4">
          <h4 className="text-white font-diatype font-medium mb-4">Project Goals</h4>
          <div className="space-y-4">
            {ratings.map((item, index) => (
              <div key={index} className="flex">
                <div className="w-px bg-white/20 mr-4 flex-shrink-0 self-stretch"></div>
                <div className="flex-1">
                  <div className="flex text-sm mb-2">
                    {renderStars(item.rating)}
                  </div>
                  <p className="text-secondary-grey font-diatype text-sm leading-relaxed">
                    {item.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Credit */}
      {credit && (
        <div className="flex justify-center mt-6">
          <ImageCredit credit={credit} />
        </div>
      )}
    </div>
  );
} 