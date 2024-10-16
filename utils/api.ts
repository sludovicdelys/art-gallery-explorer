const API_KEY = process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Artwork {
    id: string;
    objectNumber: string;
    title: string;
    principalOrFirstMaker: string;
    webImage: {
        url: string;
        width: number;
        height: number;
    };
}
  
export interface ArtworkDetails extends Artwork {
    description: string;
    dating: {
        presentingDate: string;
    };
}
  
export async function fetchArtworks(page: number = 1, pageSize: number = 10): Promise<{ artObjects: Artwork[] }> {
    const url = `${BASE_URL}/collection?key=${API_KEY}&imgonly=true&p=${page}&ps=${pageSize}&s=artist`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch artworks');
    }
    return response.json();
}
  
export async function fetchArtworkDetails(objectNumber: string): Promise<{ artObject: ArtworkDetails }> {
    const url = `${BASE_URL}/collection/${objectNumber}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch artwork details');
    }
    return response.json();
}

export function getOptimizedImageUrl(url: string, width: number): string {
    const baseUrl = url.split('=')[0];
    if (url.includes('=s')) {
        return url.replace(/=s\d+/, `=s${width}`);
    } else {
        return `${baseUrl}=s${width}`;
    }
}