import { useCallback, useState } from "react";

interface GeolocationState {
  lat?: number;
  lng?: number;
  error?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({});

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({ error: "Geolocation is not supported by your browser" });
      return Promise.reject(new Error("Geolocation not supported"));
    }

    return new Promise<GeolocationState>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newState = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setState(newState);
          resolve(newState);
        },
        (error) => {
          const errorMessage = "Failed to get your location";
          setState({ error: errorMessage });
          reject(new Error(errorMessage));
          console.error(errorMessage, error);
        },
      );
    });
  }, []);

  const clearLocation = useCallback(() => {
    setState({});
  }, []);

  return {
    ...state,
    getLocation,
    clearLocation,
  };
}
