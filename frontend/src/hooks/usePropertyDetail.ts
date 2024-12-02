import { useState, useEffect } from "react";
import { getPropertyById, getNearbyProperties } from "@/lib/api/property";
import { Property } from "@/types/property";

export function usePropertyDetail(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [nearbyProperties, setNearbyProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperty() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getPropertyById(id);
        setProperty(data);

        // Load nearby properties if location is available
        if (data.location.latitude && data.location.longitude) {
          const nearby = await getNearbyProperties(
            data.location.latitude,
            data.location.longitude,
            2, // 2km radius
          );
          setNearbyProperties(nearby.filter((p) => p.id !== data.id));
        }
      } catch (err) {
        setError("Failed to load property details");
        console.error("Error loading property:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  return {
    property,
    nearbyProperties,
    isLoading,
    error,
  };
}
