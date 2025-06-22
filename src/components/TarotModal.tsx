import React, { useState } from 'react';
import { TarotCard } from './TarotCard';
import { tarotCards } from '../data/tarotCards';

interface TarotModalProps {
  onClose: () => void;
}

export function TarotModal({ onClose }: TarotModalProps) {
  const [stage, setStage] = useState<'prompt' | 'card' | 'reveal'>('prompt');
  const [selectedCard, setSelectedCard] = useState<typeof tarotCards[0] | null>(null);

  const handleCardClick = () => {
    // Randomly select a tarot card
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    setSelectedCard(randomCard);
    setStage('reveal');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          aria-label="Close tarot reading"
        >
          ✕
        </button>
        
        <div className="text-center">
          {stage === 'prompt' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-diatype-mono">The Mystic's Tarot</h2>
              <p className="font-diatype">
                Close your eyes and think deeply about a question you seek guidance on...
              </p>
              <button 
                onClick={() => setStage('card')} 
                className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors font-diatype"
              >
                I have my question
              </button>
            </div>
          )}
          
          {stage === 'card' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-diatype-mono">Select Your Card</h2>
              <p className="font-diatype">Click the card to reveal your fortune</p>
              <div className="flex justify-center">
                <TarotCard isRevealed={false} onClick={handleCardClick} />
              </div>
            </div>
          )}
          
          {stage === 'reveal' && selectedCard && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-diatype-mono">Your Reading</h2>
              <div className="flex justify-center">
                <TarotCard 
                  isRevealed={true} 
                  cardImage={selectedCard.image} 
                  onClick={() => {}} 
                />
              </div>
              <h3 className="text-xl font-semibold font-diatype-mono">{selectedCard.name}</h3>
              <p className="font-diatype text-gray-300">{selectedCard.meaning}</p>
              <button 
                onClick={onClose} 
                className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors font-diatype"
              >
                Close Reading
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 