import Image from 'next/image';
import { useState } from 'react';
import { Artwork as ArtworkType } from '../utils/api';

interface ArtworkProps {
  artwork: ArtworkType;
  onArtworkClick: (objectNumber: string) => void;
}

export default function Artwork({ artwork, onArtworkClick }: ArtworkProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={() => onArtworkClick(artwork.objectNumber)}
    >
      <div className="aspect-w-1 aspect-h-1 w-full">
        <Image
          src={artwork.webImage.url}
          alt={artwork.title}
          layout="fill"
          objectFit="cover"
          className={`duration-700 ease-in-out ${
            isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 truncate">{artwork.title}</h2>
        <p className="text-gray-600 truncate">{artwork.principalOrFirstMaker}</p>
      </div>
    </div>
  );
}