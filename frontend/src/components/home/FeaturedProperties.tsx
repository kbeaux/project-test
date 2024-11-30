import { useTranslation } from "react-i18next";
import { useEffect, useState } from 'react';
import { getRecentProperties } from '@/lib/api/property';
import { Property } from '@/types/property';
import { PropertyCard } from '../property/PropertyCard';
export function FeaturedProperties() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        const data = await getRecentProperties();
        setProperties(data);
      } catch (err) {
        setError('Failed to load featured properties');
        console.error('Error loading properties:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProperties();
  }, []);
  if (error) {
    return <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-800">{error}</p>
      </div>;
  }
  return <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t("featured.properties")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? [...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>) : properties.slice(0, 6).map(property => <PropertyCard key={property.id} property={property} />)}
        </div>
      </div>
    </div>;
}