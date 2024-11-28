import { Point } from 'geojson';

export function calculateDistance(
  point1: Point,
  point2: Point,
  unit: 'km' | 'm' = 'km',
): number {
  const R = unit === 'km' ? 6371 : 6371000; // Earth's radius in km or m
  const lat1 = toRadians(point1.coordinates[1]);
  const lat2 = toRadians(point2.coordinates[1]);
  const deltaLat = toRadians(point2.coordinates[1] - point1.coordinates[1]);
  const deltaLon = toRadians(point2.coordinates[0] - point1.coordinates[0]);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function createLocationPoint(lat: number, lng: number): Point {
  return {
    type: 'Point',
    coordinates: [lng, lat],
  };
}

export function validatePriceRange(min?: number, max?: number): boolean {
  if (min === undefined || max === undefined) return true;
  return min <= max;
}

export function validateSurfaceRange(min?: number, max?: number): boolean {
  if (min === undefined || max === undefined) return true;
  return min <= max && min >= 0;
}