import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface DesktopProjectFeatureProps {
  title: string;
  year: string;
  images: string[];
  backgroundColor: string;
  companyUrl?: string;
}

export const DesktopProjectFeature: React.FC<DesktopProjectFeatureProps> = ({
  title,
  year,
  images,
  backgroundColor,
  companyUrl
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Convert images to lightbox format
  const lightboxSlides = images.map(src => ({ src }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section data-section="aioz" className={`${backgroundColor} pt-16 pb-16`}>
      {/* Title container - matches ProjectFeature exactly */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-6">
        <div className="flex justify-between items-center">
          {companyUrl ? (
            <a 
              href={companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl font-diatype-mono font-medium hover:underline hover:decoration-1 hover:underline-offset-4 transition-all duration-500"
            >
              {title}
            </a>
          ) : (
            <h2 className="text-3xl font-diatype-mono font-medium">{title}</h2>
          )}
          <span className="text-gray-500 font-diatype-mono text-lg">{year}</span>
        </div>
      </div>

      {/* Top image - constrained to container width */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-8">
        <div className="relative">
          <img 
            src={images[0]} 
            alt={`${title} screenshot 1`}
            className="w-full h-auto relative rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => openLightbox(0)}
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
                className="w-full h-auto relative rounded-sm shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                onClick={() => openLightbox(index + 1)}
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
  );
}; 