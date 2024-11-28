import { useState } from 'react';
import { getPropertyEstimate } from '@/lib/api/property';

export function usePropertyEstimate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const estimate = async (data: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getPropertyEstimate(data);
      setResult(result);
      return result;
    } catch (err) {
      setError('Failed to get property estimate');
      console.error('Estimate error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    estimate,
    result,
    isLoading,
    error,
    reset: () => {
      setResult(null);
      setError(null);
    },
  };
}