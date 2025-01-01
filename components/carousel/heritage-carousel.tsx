// components/carousel/heritage-carousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { PhotoCard } from './photo-card';

const heritagePhotos = [
  {
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
    title: "Gateway of India",
    description: "A historic arch monument built in the early 20th century"
  },
  {
    image: "https://images.unsplash.com/photo-1594817060351-8f3de84b7e0e",
    title: "Bandra Sealink",
    description: "A sealink monument built in the early 20th century"
  },
  {
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66",
    title: "CST Railway Station",
    description: "UNESCO World Heritage Site and historic railway terminus"
  },
  {
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445",
    title: "Marine Drive",
    description: "The Queen's Necklace - Mumbai's iconic waterfront"
  },
  {
    image: "https://images.unsplash.com/photo-1598840793639-074bc0ac3d1e",
    title: "Haji Ali Dargah",
    description: "Historic mosque and dargah on an islet off Mumbai"
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    title: "Elephanta Caves",
    description: "Ancient cave temples dedicated to Lord Shiva"
  }
];

export function HeritageCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rotatePhotos = useCallback(() => {
    if (!isPaused) {
      setActiveIndex((prev) => (prev + 1) % heritagePhotos.length);
    }
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(rotatePhotos, 3000);
    return () => clearInterval(interval);
  }, [rotatePhotos]);

  return (
    <div 
      className="relative w-full h-[600px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-full">
        {heritagePhotos.map((photo, index) => (
          <PhotoCard
            key={photo.title}
            {...photo}
            isActive={index === activeIndex}
            index={(index - activeIndex + heritagePhotos.length) % heritagePhotos.length}
          />
        ))}
      </div>
    </div>
  );
}
