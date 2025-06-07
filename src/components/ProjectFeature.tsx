import React from 'react';

interface ProjectFeatureProps {
  title: string;
  year: string;
  images: string[];
  backgroundColor: string;
}

export const ProjectFeature: React.FC<ProjectFeatureProps> = ({
  title,
  year,
  images,
  backgroundColor
}) => {
  return (
    <section className={`${backgroundColor} py-16`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-diatype-mono">{title}</h2>
          <span className="text-gray-500 font-diatype-mono">{year}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`${title} screenshot ${index + 1}`}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 