import React, { useRef, useState, useEffect } from 'react';

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

  return (
    <div className="w-full">
      <div 
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex gap-8 snap-x snap-mandatory pb-4 select-none">
          {directions.map((direction, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-full snap-start"
            >
              <div className="bg-[#141414] rounded-[40px] p-4 shadow-lg">
                <h3 className="text-lg font-diatype-mono font-normal text-white mb-4 text-center">
                  {direction.title}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {direction.images.map((image, phoneIndex) => (
                    <div 
                      key={phoneIndex}
                      className="flex justify-center"
                    >
                      <img 
                        src={image} 
                        alt={`${direction.alt} - screen ${phoneIndex + 1}`}
                        className="w-auto h-auto max-h-[700px] md:max-h-[600px] lg:max-h-[700px] rounded-[20px] object-contain pointer-events-none"
                      />
                    </div>
                  ))}
                </div>
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