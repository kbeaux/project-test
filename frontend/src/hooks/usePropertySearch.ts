import { useState } from 'react';
import { searchProperties, SearchResponse } from '@/lib/api/search';
import { PropertySearchParams } from '@/types/search';

export function usePropertySearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResponse | null>(null);

  const search = async (params: PropertySearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await searchProperties(params);
      setResults(data);
    } catch (err) {
      setError('Failed to fetch properties');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResults(null);
    setError(null);
  };

  return {
    search,
    reset,
    results,
    isLoading,
    error,
  };
}