import { useState } from "react";
import {
  getInvestmentProperties,
  getPropertyMetrics,
  calculateInvestmentReturn,
  InvestmentMetrics,
} from "@/lib/api/invest";
import { Property } from "@/types/property";

export function useInvestment() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [metrics, setMetrics] = useState<InvestmentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getInvestmentProperties();
      setProperties(data);
    } catch (err) {
      setError("Failed to load investment properties");
      console.error("Investment properties error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMetrics = async (propertyId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPropertyMetrics(propertyId);
      setMetrics(data);
    } catch (err) {
      setError("Failed to load property metrics");
      console.error("Property metrics error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateReturn = async (params: {
    purchasePrice: number;
    downPayment: number;
    interestRate: number;
    loanTerm: number;
    monthlyRent: number;
    expenses: number;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      return await calculateInvestmentReturn(params);
    } catch (err) {
      setError("Failed to calculate investment return");
      console.error("ROI calculation error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    properties,
    metrics,
    isLoading,
    error,
    loadProperties,
    loadMetrics,
    calculateReturn,
  };
}
