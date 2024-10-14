import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '../utils/api';
import { getOptimizedImageUrl } from '../utils/api';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  artworks: Artwork[];
  onImageClick: (index: number) => void;
  onPreviousCollection: () => void;
  onNextCollection: () => void;
}

export default function Carousel({ artworks, onImageClick, onPreviousCollection, onNextCollection }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    const handlePrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        onPreviousCollection();
      }
    };
  
    const handleNext = () => {
      if (currentIndex < artworks.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onNextCollection();
      }
    };
  
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Rijksmuseum Gallery Explorer</h1>
        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={getOptimizedImageUrl(artworks[currentIndex].webImage.url, 800)}
            alt={artworks[currentIndex].title}
            width={800}
            height={600}
            layout="responsive"
            objectFit="contain"
            onClick={() => onImageClick(currentIndex)}
            className="cursor-pointer"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {artworks.length}
          </div>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onPreviousCollection}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Previous collection
          </button>
          <button
            onClick={onNextCollection}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full flex items-center transition-colors"
          >
            Next collection
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer ${
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
    );
}