import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Property } from '@/types/property';

interface PropertyMapProps {
  properties: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (property: Property) => void;
}

export function PropertyMap({
  properties,
  center,
  zoom = 12,
  onMarkerClick,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const mapCenter = center || {
            lat: properties[0]?.location.latitude || 48.8566,
            lng: properties[0]?.location.longitude || 2.3522,
          };

          const map = new google.maps.Map(mapRef.current, {
            center: mapCenter,
            zoom,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
          });

          googleMapRef.current = map;

          // Clear existing markers
          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];

          // Add new markers
          properties.forEach((property) => {
            const marker = new google.maps.Marker({
              position: {
                lat: property.location.latitude,
                lng: property.location.longitude,
              },
              map,
              title: property.displayRef,
            });

            if (onMarkerClick) {
              marker.addListener('click', () => onMarkerClick(property));
            }

            markersRef.current.push(marker);
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [properties, center, zoom, onMarkerClick]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}