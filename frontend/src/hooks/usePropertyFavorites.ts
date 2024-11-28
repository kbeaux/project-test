import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { getFavorites, addToFavorites, removeFromFavorites } from '@/lib/api/favorites';
import { useAuth } from '@/lib/auth';

export function usePropertyFavorites() {
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (propertyId: string) => {
    try {
      await addToFavorites(propertyId);
      await loadFavorites();
    } catch (err) {
      setError('Failed to add to favorites');
      console.error('Error adding favorite:', err);
      throw err;
    }
  };

  const removeFavorite = async (propertyId: string) => {
    try {
      await removeFromFavorites(propertyId);
      await loadFavorites();
    } catch (err) {
      setError('Failed to remove from favorites');
      console.error('Error removing favorite:', err);
      throw err;
    }
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(favorite => favorite.id === propertyId);
  };

  return {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}