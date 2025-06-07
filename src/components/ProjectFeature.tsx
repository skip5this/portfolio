import React from 'react';

type LayoutPattern = 'grid' | 'split';

interface ProjectFeatureProps {
  title: string;
  year: string;
  images: string[];
  backgroundColor: string;
  layout?: LayoutPattern;
}

export const ProjectFeature: React.FC<ProjectFeatureProps> = ({
  title,
  year,
  images,
  backgroundColor,
  layout = 'grid'  // default to grid layout
}) => {
  return (
    <section className={`${backgroundColor} py-16`}>
      {/* Title container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-diatype-mono">{title}</h2>
          <span className="text-gray-500 font-diatype-mono">{year}</span>
        </div>
      </div>

      {layout === 'grid' ? (
        // Regular 3-column grid layout
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`${title} screenshot ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Split layout - one image top, two images bottom
        <>
          {/* Top row - full width image */}
          <div className="max-w-7xl mx-auto">
            <img 
              src={images[0]} 
              alt={`${title} screenshot 1`}
              className="w-full h-auto"
            />
          </div>
          {/* Bottom row - two images */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`${title} screenshot ${index + 2}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}; 