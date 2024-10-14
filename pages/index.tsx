import { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchArtworks, fetchArtworkDetails, Artwork as ArtworkType, ArtworkDetails } from '../utils/api';
import ArtworkModal from '../components/ArtworkModal';
import Carousel from '../components/Carousel';

export default function Home() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artworkDetails, setSelectedArtwork] = useState<ArtworkDetails | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadArtworks(page);
  }, [page]);

  const loadArtworks = async (pageNumber: number) => {
    try {
      setLoading(true);
      const data = await fetchArtworks(pageNumber, 10); 
      setArtworks(data.artObjects);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Error loading artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkClick = async (index: number) => {
    try {
      const data = await fetchArtworkDetails(artworks[index].objectNumber);
      setSelectedArtwork(data.artObject);
    } catch (err) {
      console.error('Failed to fetch artwork details:', err);
    }
  };

  const handlePreviousCollection = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextCollection = () => {
    setPage(page + 1);
  };


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Head>
        <title>Rijksmuseum Gallery Explorer</title>
        <meta name="description" content="Explore artworks from the Rijksmuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        {loading && <p className="text-center">Loading artworks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <Carousel 
            artworks={artworks}
            onImageClick={handleArtworkClick}
            onPreviousCollection={handlePreviousCollection}
            onNextCollection={handleNextCollection}
          />
        )}
      </main>

      {artworkDetails && (
        <ArtworkModal 
          artwork={artworkDetails}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </div>
  );
}