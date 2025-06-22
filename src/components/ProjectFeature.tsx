import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type LayoutPattern = 'grid' | 'split';

interface ProjectFeatureProps {
  title: string;
  year: string;
  images: string[];
  backgroundColor: string;
  layout?: LayoutPattern;
  companyUrl?: string;
}

export const ProjectFeature: React.FC<ProjectFeatureProps> = ({
  title,
  year,
  images,
  backgroundColor,
  layout = 'grid',  // default to grid layout
  companyUrl
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Determine grid columns based on number of images
  const getGridCols = () => {
    if (images.length === 4) {
      return 'grid-cols-1 md:grid-cols-4'; // 1 column on mobile, 4 across on desktop
    }
    return 'grid-cols-1 md:grid-cols-3'; // Default: 1 on mobile, 3 on desktop
  };

  // Convert images to lightbox format
  const lightboxSlides = images.map(src => ({ src }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className={`${backgroundColor} ${layout === 'split' ? 'pt-0 pb-8' : 'pt-16 pb-16'}`}>
      {/* Title container */}
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <div className={`flex justify-between items-center ${layout === 'split' ? 'mb-0' : 'mb-6'}`}>
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

      {layout === 'grid' ? (
        // Regular grid layout - responsive based on number of images
        <div className="max-w-7xl mx-auto px-4 md:px-16">
          <div className={`grid ${getGridCols()} gap-12`}>
            {images.map((image, index) => (
              <div key={index} className="relative w-full">
                <img 
                  src={image} 
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-auto rounded-[20px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Split layout - one image top, two images bottom
        <>
          {/* Top row - full width image */}
          <img 
            src={images[0]} 
            alt={`${title} screenshot 1`}
            className="w-full h-auto cursor-pointer"
            onClick={() => openLightbox(0)}
          />
          {/* Bottom row - two images */}
          <div className="max-w-7xl mx-auto px-4 md:px-16 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`${title} screenshot ${index + 2}`}
                    className="w-full h-auto cursor-pointer"
                    onClick={() => openLightbox(index + 1)}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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