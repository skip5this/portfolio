import React from 'react';

interface TarotCardProps {
  isRevealed: boolean;
  cardImage?: string;
  onClick: () => void;
}

export function TarotCard({ isRevealed, cardImage, onClick }: TarotCardProps) {
  const cardBackImage = 'https://images.unsplash.com/photo-1576075796033-848ff6c12d29?q=80&w=1974&auto=format&fit=crop';

  return (
    <div className="relative w-56 h-96 cursor-pointer group perspective-1000" onClick={onClick}>
      {/* Card Back */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-lg shadow-lg transform preserve-3d ${
          isRevealed ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0'
        }`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        <img 
          src={cardBackImage} 
          alt="Tarot card back" 
          className="w-full h-full object-cover rounded-lg border-2 border-yellow-600" 
        />
      </div>
      
      {/* Card Front */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ease-in-out rounded-lg shadow-lg transform preserve-3d ${
          isRevealed ? 'rotate-y-0' : 'rotate-y-180 opacity-0 pointer-events-none'
        }`}
        style={{ backfaceVisibility: 'hidden' }}
      >
        {cardImage && (
          <img 
            src={cardImage} 
            alt="Tarot card" 
            className="w-full h-full object-cover rounded-lg border-2 border-yellow-600" 
          />
        )}
      </div>
    </div>
  );
} 