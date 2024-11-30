import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowRightCircle } from 'lucide-react';
import { Property } from '@/types/property';
import { PropertyCompareButton } from './PropertyCompareButton';
import { cn } from '@/lib/utils';
import { useImageUrl } from '@/hooks/useImageUrl';

interface PropertyCardProps {
  property: Property;
  onCompare?: (property: Property) => void;
  isComparing?: boolean;
  disableCompare?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PropertyCard({
  property,
  onCompare,
  isComparing,
  disableCompare,
  onClick,
  className,
}: PropertyCardProps) {
  const { getImageUrl } = useImageUrl();
  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onCompare) {
      onCompare(property);
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={getImageUrl(property.images[0])}
          alt={property.displayRef}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {property.category}
          </span>
        </div>
        {onCompare && (
          <div className="absolute top-4 right-4">
            <PropertyCompareButton
              onClick={(e?: React.MouseEvent) => handleCompareClick(e as React.MouseEvent)}
              isComparing={isComparing || false}
              disabled={disableCompare}
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {property.type}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location.city}, {property.location.zipCode}
            </div>
          </div>
          <Link
            to={`/properties/${property.id}`}
            className="text-blue-600 hover:text-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowRightCircle className="h-5 w-5" />
          </Link>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Building2 className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-sm text-gray-500">{property.surface}m²</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-blue-600">
              €{property.price.toLocaleString()}
            </span>
            {property.transactionType === 'RENT' && (
              <span className="text-sm text-gray-500">/month</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}