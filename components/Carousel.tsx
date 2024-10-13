import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '../utils/api';
import { getOptimizedImageUrl } from '../utils/api';

interface CarouselProps {
    artworks: Artwork[];
    onImageClick: (index: number) => void;
}

export default function Carousel({ artworks, onImageClick }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };
  
    return (
      <div className="w-full relative">
        <div className="absolute top-0 left-0 bg-gray-800 text-white px-3 py-1 rounded z-10">
          {currentIndex + 1} / {artworks.length}
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-3/4 aspect-w-16 aspect-h-9 mb-4">
            <Image
              src={getOptimizedImageUrl(artworks[currentIndex].webImage.url, 800)}
              alt={artworks[currentIndex].title}
              layout="fill"
              objectFit="contain"
              onClick={() => onImageClick(currentIndex)}
              className="cursor-pointer"
            />
          </div>
          <div className="w-full grid grid-cols-10 gap-2">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`aspect-w-1 aspect-h-1 overflow-hidden cursor-pointer ${
                  index === currentIndex ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={getOptimizedImageUrl(artwork.webImage.url, 100)}
                  alt={artwork.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}