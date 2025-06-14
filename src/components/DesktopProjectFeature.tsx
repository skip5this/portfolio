import React from 'react';

interface DesktopProjectFeatureProps {
  title: string;
  year: string;
  images: string[];
  backgroundColor: string;
}

export const DesktopProjectFeature: React.FC<DesktopProjectFeatureProps> = ({
  title,
  year,
  images,
  backgroundColor,
}) => {
  return (
    <section data-section="aioz" className={`${backgroundColor} pt-16 pb-16 space-y-16`}>
      {/* Title container - matches ProjectFeature exactly */}
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-diatype-mono">{title}</h2>
          <span className="text-gray-500 font-diatype-mono">{year}</span>
        </div>
      </div>

      {/* Top image - constrained to container width */}
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="relative">
          <img 
            src={images[0]} 
            alt={`${title} screenshot 1`}
            className="w-full h-auto relative rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>

      {/* Bottom two images */}
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.slice(1).map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`${title} screenshot ${index + 2}`}
                className="w-full h-auto relative rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 