import { environment } from '../config/environment';

export const useImageUrl = () => {
  const getImageUrl = (imagePath: string | undefined): string => {
    if (!imagePath) return '/default-image.jpg'; // Image par défaut si pas de chemin
    return `${environment.apiUrl}/${imagePath}`;
  };

  return { getImageUrl };
}; 