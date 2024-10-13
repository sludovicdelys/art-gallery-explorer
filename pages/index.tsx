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

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const data = await fetchArtworks(1, 20); 
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

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col">
      <Head>
        <title>Art Gallery Explorer</title>
        <meta name="description" content="Explore artworks from the Rijksmuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-6">
        <h1 className="text-4xl font-bold text-left">Art Gallery Explorer</h1>
      </header>

      <main className="flex-grow flex items-center justify-center">
        {loading && <p className="text-center">Loading artworks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <Carousel 
            artworks={artworks}
            onImageClick={handleArtworkClick}
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