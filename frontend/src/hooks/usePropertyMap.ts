import { useState, useCallback } from 'react';
import { Property } from '@/types/property';

export function usePropertyMap() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState(12);

  const centerOnProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
    setMapCenter({
      lat: property.location.latitude,
      lng: property.location.longitude,
    });
    setMapZoom(15);
  }, []);

  const resetMap = useCallback(() => {
    setSelectedProperty(null);
    setMapCenter(null);
    setMapZoom(12);
  }, []);

  return {
    selectedProperty,
    mapCenter,
    mapZoom,
    centerOnProperty,
    resetMap,
  };
}