import { useState } from "react";
import { Property } from "@/types/property";

const MAX_COMPARE_ITEMS = 4;

export function usePropertyCompare() {
  const [compareList, setCompareList] = useState<Property[]>([]);

  const addToCompare = (property: Property) => {
    if (compareList.length >= MAX_COMPARE_ITEMS) {
      return false;
    }

    if (!compareList.find((p) => p.id === property.id)) {
      setCompareList((current) => [...current, property]);
      return true;
    }

    return false;
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList((current) => current.filter((p) => p.id !== propertyId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (propertyId: string) => {
    return compareList.some((p) => p.id === propertyId);
  };

  return {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isFull: compareList.length >= MAX_COMPARE_ITEMS,
  };
}
