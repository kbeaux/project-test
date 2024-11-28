import { Property } from '@/types/property';
import { Building2, Ruler, Tag } from 'lucide-react';

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{property.type}</h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {property.transactionType}
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">{property.category}</span>
            </div>
            <div className="flex items-center">
              <Ruler className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-600">{property.surface}m²</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-blue-600 font-semibold">
                €{property.price.toLocaleString()}
                {property.transactionType === 'RENT' && '/month'}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{property.description}</p>
        </div>

        {property.features.length > 0 && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="grid grid-cols-2 gap-4">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {property.heating && (
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">Heating Type:</span>
                <span className="ml-2 text-gray-900">{property.heating.type}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}