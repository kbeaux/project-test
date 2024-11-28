import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';

interface PropertySimilarProps {
  properties: Property[];
}

export function PropertySimilar({ properties }: PropertySimilarProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Similar Properties Nearby
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.slice(0, 4).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}