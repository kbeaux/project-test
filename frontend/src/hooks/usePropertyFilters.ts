import { useState } from "react";
import { PropertySearchParams } from "@/types/search";

export function usePropertyFilters() {
  const [filters, setFilters] = useState<PropertySearchParams>({});

  const updateFilters = (newFilters: Partial<PropertySearchParams>) => {
    setFilters((current) => ({
      ...current,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}
