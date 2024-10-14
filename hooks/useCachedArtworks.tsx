import { useState, useCallback } from 'react';
import { Artwork } from '../utils/api';

const useCachedArtworks = () => {
  const [cache, setCache] = useState<{ [key: number]: Artwork[] }>({});

  const getCachedArtworks = useCallback((page: number) => {
    return cache[page];
  }, [cache]);

  const setCachedArtworks = useCallback((page: number, artworks: Artwork[]) => {
    setCache(prevCache => ({
      ...prevCache,
      [page]: artworks
    }));
  }, []);

  return { getCachedArtworks, setCachedArtworks };
};

export default useCachedArtworks;