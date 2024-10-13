import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '../utils/api';
import { getOptimizedImageUrl } from '../utils/api';;

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
        <div className="w-full">
        <div className="relative aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden">
          <Image
            src={getOptimizedImageUrl(artworks[currentIndex].webImage.url, 1200)}
            alt={artworks[currentIndex].title}
            layout="fill"
            objectFit="cover"
            onClick={() => onImageClick(currentIndex)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={getOptimizedImageUrl(artwork.webImage.url, 100)}
                alt={artwork.title}
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
}