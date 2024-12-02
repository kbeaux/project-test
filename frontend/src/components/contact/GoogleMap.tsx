import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers?: Marker[];
}

export function GoogleMap({ center, zoom, markers = [] }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is missing");
      return;
    }

    const initMap = async () => {
      const loader = new Loader({
        apiKey,
        version: "weekly",
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          });

          googleMapRef.current = map;

          markers.forEach((marker) => {
            new google.maps.Marker({
              position: marker.position,
              map,
              title: marker.title,
            });
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, [center, zoom, markers]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
}
