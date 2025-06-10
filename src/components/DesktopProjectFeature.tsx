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
    <section className={`${backgroundColor} pt-16 pb-16 space-y-8`}>
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
          <div className="absolute inset-0 -bottom-12 blur-2xl bg-[#ACB0AC]/30 rounded-3xl" />
          <img 
            src={images[0]} 
            alt={`${title} screenshot 1`}
            className="w-full h-auto relative"
          />
        </div>
      </div>

      {/* Bottom two images */}
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.slice(1).map((image, index) => (
            <div key={index} className="relative">
              <div className="absolute inset-0 -bottom-12 blur-2xl bg-[#ACB0AC]/30 rounded-3xl" />
              <img 
                src={image} 
                alt={`${title} screenshot ${index + 2}`}
                className="w-full h-auto relative"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 