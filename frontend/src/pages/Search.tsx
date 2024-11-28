import { useState } from 'react';
import { PropertySearchForm } from '@/components/property/PropertySearchForm';
import { PropertySearchParams, PropertySearchResponse, searchProperties } from '@/lib/api/property';
import { Property } from '@/types/property';

export function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<PropertySearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: PropertySearchParams) => {
    try {
      setIsLoading(true);
      setError(null);
      const results = await searchProperties(params);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to fetch properties. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Properties</h1>
          <PropertySearchForm
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {searchResults && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {searchResults.total} Properties Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.data.map((property: Property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={property.images[0] || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2940&auto=format&fit=crop'}
                      alt={property.displayRef}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {property.type}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {property.location.address}, {property.location.city}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium">
                        €{property.price.toLocaleString()}
                        {property.transactionType === 'RENT' && '/month'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {property.surface}m²
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}