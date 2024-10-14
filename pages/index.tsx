import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { fetchArtworks, fetchArtworkDetails, Artwork as ArtworkType, ArtworkDetails } from '../utils/api';
import ArtworkModal from '../components/ArtworkModal';
import Carousel from '../components/Carousel';
import ArtLoader from '../components/ArtLoader';
import useCachedArtworks from '../hooks/useCachedArtworks';

export default function Home() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artworkDetails, setSelectedArtwork] = useState<ArtworkDetails | null>(null);
  const [page, setPage] = useState(1);
  const { getCachedArtworks, setCachedArtworks } = useCachedArtworks();

  const loadArtworks = useCallback(async (pageNumber: number) => {
    const cachedArtworks = getCachedArtworks(pageNumber);
    if (cachedArtworks) {
      setArtworks(cachedArtworks);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchArtworks(pageNumber, 10);
      setArtworks(data.artObjects);
      setCachedArtworks(pageNumber, data.artObjects);
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
  }, [getCachedArtworks, setCachedArtworks]);

  useEffect(() => {
    loadArtworks(page);
  }, [page, loadArtworks]);


  const handleArtworkClick = async (index: number) => {
    try {
      const data = await fetchArtworkDetails(artworks[index].objectNumber);
      setSelectedArtwork(data.artObject);
    } catch (err) {
      console.error('Failed to fetch artwork details:', err);
    }
  };

  const handlePreviousCollection = useCallback(() => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  }, [page]);

  const handleNextCollection = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Head>
        <title>Rijksmuseum Gallery Explorer</title>
        <meta name="description" content="Explore artworks from the Rijksmuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Rijksmuseum Gallery Explorer</h1>
        
        {loading ? (
          <div className="mt-8">
            <ArtLoader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : (
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