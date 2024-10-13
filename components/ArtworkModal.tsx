import Image from 'next/image';
import { ArtworkDetails } from '../utils/api';

interface ArtworkModalProps {
  artwork: ArtworkDetails | null;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: ArtworkModalProps) {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{artwork.title}</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <Image
              src={artwork.webImage.url}
              alt={artwork.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-gray-600 mb-2"><strong>Artist:</strong> {artwork.principalOrFirstMaker}</p>
          <p className="text-gray-600 mb-2"><strong>Date:</strong> {artwork.dating.presentingDate}</p>
          <p className="text-gray-700 mb-4">{artwork.description}</p>
          <button 
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}