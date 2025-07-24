import React from 'react';
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
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-white' : 'text-gray-600'}>
        ★
      </span>
    ));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-24">
        {/* Left column - Summary and Ratings */}
        <div className="lg:col-span-1 flex flex-col h-full">
          {/* Direction Title */}
          <div>
            <h3 className="text-lg font-diatype-mono font-normal mb-6 whitespace-pre-line">
              {title.split('\n').map((line, index) => (
                <div key={index} className={index === 0 ? 'text-secondary-grey' : 'text-white'}>
                  {line}
                </div>
              ))}
            </h3>
          </div>
          
          {/* Summary */}
          <div className="mb-8">
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
          
          {/* Ratings - pushed to bottom */}
          <div className="mt-auto lg:mb-4">
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
        
        {/* Phone images - 2x2 on mobile, side by side on desktop */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left phone image */}
          <div className="flex flex-col items-start">
            <div className="text-white font-diatype text-sm mb-2">Cash Surface</div>
            <div className="w-full max-w-[400px] h-px bg-white/20 mb-6"></div>
            <img 
              src={leftImage} 
              alt={`${alt} - left screen`}
              className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] object-contain pointer-events-none"
            />
          </div>
          
          {/* Right phone image */}
          <div className="flex flex-col items-start">
            <div className="text-white font-diatype text-sm mb-2">Bitcoin Surface</div>
            <div className="w-full max-w-[400px] h-px bg-white/20 mb-6"></div>
            <img 
              src={rightImage} 
              alt={`${alt} - right screen`}
              className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] object-contain pointer-events-none"
            />
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