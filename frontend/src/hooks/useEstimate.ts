import { useState } from "react";
import {
  getPropertyEstimate,
  EstimateFormData,
  EstimateResult,
} from "@/lib/api/estimate";

export function useEstimate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const estimate = async (data: EstimateFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await getPropertyEstimate(data);
      setResult(result);
      return result;
    } catch (err) {
      setError("Failed to get property estimate");
      console.error("Estimate error:", err);
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
  };
}
