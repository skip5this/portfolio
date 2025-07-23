import React, { useRef, useState, useEffect } from 'react';
import { ImageCredit } from './ImageCredit';

// Custom cursor styles
const cursorStyles = `
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 300ms ease;
    transform: translate(-50%, -50%);
  }
  
  .custom-cursor.hover {
    transform: translate(-50%, -50%) scale(3);
  }
`;

interface DirectionCarouselProps {
  directions: {
    title: string;
    images: string[];
    alt: string;
  }[];
}

export function DirectionCarousel({ directions }: DirectionCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const [currentDirection, setCurrentDirection] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setLastX(e.pageX);
    setLastTime(Date.now());
    setVelocity(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
    
    // Calculate velocity
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;
    if (timeDiff > 0) {
      const currentVelocity = (e.pageX - lastX) / timeDiff;
      setVelocity(currentVelocity);
    }
    setLastX(e.pageX);
    setLastTime(currentTime);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const currentScroll = scrollRef.current.scrollLeft;
      const directionIndex = Math.round(currentScroll / containerWidth);
      const targetScroll = directionIndex * containerWidth;
      
      // Update current direction
      setCurrentDirection(directionIndex);
      
      // Snap to nearest direction
      const startScroll = currentScroll;
      const distance = targetScroll - startScroll;
      const duration = 400; // Increased from 200ms to 400ms
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 2); // Changed from cubic to quadratic for smoother easing
        
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = startScroll + (distance * easeOut);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setLastX(e.touches[0].pageX);
    setLastTime(Date.now());
    setVelocity(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
    
    // Calculate velocity
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;
    if (timeDiff > 0) {
      const currentVelocity = (e.touches[0].pageX - lastX) / timeDiff;
      setVelocity(currentVelocity);
    }
    setLastX(e.touches[0].pageX);
    setLastTime(currentTime);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const currentScroll = scrollRef.current.scrollLeft;
      const directionIndex = Math.round(currentScroll / containerWidth);
      const targetScroll = directionIndex * containerWidth;
      
      // Update current direction
      setCurrentDirection(directionIndex);
      
      // Snap to nearest direction
      const startScroll = currentScroll;
      const distance = targetScroll - startScroll;
      const duration = 400; // Increased from 200ms to 400ms
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 2); // Changed from cubic to quadratic for smoother easing
        
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = startScroll + (distance * easeOut);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  const navigateToDirection = (directionIndex: number) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const targetScroll = directionIndex * containerWidth;
      
      // Update current direction
      setCurrentDirection(directionIndex);
      
      // Smooth scroll to target direction
      const startScroll = scrollRef.current.scrollLeft;
      const distance = targetScroll - startScroll;
      const duration = 200;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        
        if (scrollRef.current) {
          scrollRef.current.scrollLeft = startScroll + (distance * easeOut);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  // Custom cursor handlers
  const handleCursorMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCursorEnter = () => {
    setIsHovering(true);
  };

  const handleCursorLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="w-full">
      {/* Custom cursor */}
      <style>{cursorStyles}</style>
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          display: isHovering ? 'block' : 'none'
        }}
      />
      
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide cursor-none select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleCursorMove(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={(e) => {
          handleMouseUp();
          handleCursorLeave();
        }}
        onMouseEnter={handleCursorEnter}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex snap-x snap-mandatory pb-4 select-none">
          {directions.map((direction, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-full snap-start"
            >
              <div className="w-full">
                <h3 className="text-lg font-diatype-mono font-normal text-white mb-4 text-center">
                  {direction.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-8 xl:gap-16">
                  {direction.images.map((image, phoneIndex) => (
                    <div 
                      key={phoneIndex}
                      className="flex justify-center"
                    >
                      <img 
                        src={image} 
                        alt={`${direction.alt} - screen ${phoneIndex + 1}`}
                        className="w-auto h-auto max-h-[812px] rounded-[16px] md:rounded-[24px] lg:rounded-[32px] xl:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out border-[8px] md:border-[12px] lg:border-[16px] xl:border-[20px] border-[#141414] object-contain pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Credit for Direction 2 */}
                {index === 1 && (
                  <div className="flex justify-center mt-4">
                    <ImageCredit credit="Joshua Philippe" />
                  </div>
                )}
                
                {/* Credit for Direction 3 */}
                {index === 2 && (
                  <div className="flex justify-center mt-4">
                    <ImageCredit credit="Logan" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {directions.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToDirection(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 hover:scale-110 ${
              index === currentDirection ? 'bg-white' : 'bg-gray-400'
            }`}
            aria-label={`Navigate to direction ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 