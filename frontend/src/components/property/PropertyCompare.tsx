import { Property } from '@/types/property';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useImageUrl } from '@/hooks/useImageUrl';

interface PropertyCompareProps {
  properties: Property[];
  onRemove: (id: string) => void;
  className?: string;
}

export function PropertyCompare({ properties, onRemove, className }: PropertyCompareProps) {
  const { getImageUrl } = useImageUrl();
  if (properties.length === 0) return null;

  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {properties.map((property) => (
          <div key={property.id} className="relative">
            <button
              onClick={() => onRemove(property.id)}
              className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>

            <img
              src={getImageUrl(property.images[0])}
              alt={property.displayRef}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {property.type}
                </h3>
                <p className="text-sm text-gray-500">
                  {property.location.city}, {property.location.zipCode}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-semibold">
                    €{property.price.toLocaleString()}
                    {property.transactionType === 'RENT' && '/month'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Surface</p>
                  <p className="font-semibold">{property.surface}m²</p>
                </div>
                <div>
                  <p className="text-gray-500">Price/m²</p>
                  <p className="font-semibold">
                    €{Math.round(property.price / property.surface).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-semibold">{property.category}</p>
                </div>
              </div>

              {property.features.length > 0 && (
                <div>
                  <p className="text-gray-500 mb-2">Features</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {property.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}