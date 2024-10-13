import { useState, useEffect } from 'react';
import Head from 'next/head';
import { fetchArtworks, fetchArtworkDetails, Artwork as ArtworkType, ArtworkDetails } from '../utils/api';
import Artwork from '../components/Artwork';
import ArtworkModal from '../components/ArtworkModal';

export default function Home() {
  const [artworks, setArtworks] = useState<ArtworkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkDetails | null>(null);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      const data = await fetchArtworks();
      setArtworks(data.artObjects);
    } catch (err) {
      setError('Failed to load artworks. Please try again later.');
      console.error('Error loading artworks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkClick = async (objectNumber: string) => {
    try {
      const data = await fetchArtworkDetails(objectNumber);
      setSelectedArtwork(data.artObject);
    } catch (err) {
      console.error('Failed to fetch artwork details:', err);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Art Gallery Explorer</title>
        <meta name="description" content="Explore artworks from the Rijksmuseum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Art Gallery Explorer</h1>
        {loading && <p className="text-center">Loading artworks...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((artwork) => (
              <Artwork 
                key={artwork.id} 
                artwork={artwork} 
                onArtworkClick={handleArtworkClick}
              />
            ))}
          </div>
        )}
        {selectedArtwork && (
          <ArtworkModal 
            artwork={selectedArtwork} 
            onClose={() => setSelectedArtwork(null)}
          />
        )}
      </main>
    </div>
  );
}