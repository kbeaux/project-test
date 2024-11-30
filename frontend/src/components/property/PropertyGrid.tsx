import { useTranslation } from "react-i18next";
import { Property } from '@/types/property';
import { PropertyCard } from './PropertyCard';
interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
}
export function PropertyGrid({
  properties,
  isLoading
}: PropertyGridProps) {
  const { t } = useTranslation();
  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>)}
      </div>;
  }
  if (properties.length === 0) {
    return <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("no.properties.found")}</h3>
        <p className="text-gray-500">{t("try.adjusting.your.search.criteria.to.find.more.properties.")}</p>
      </div>;
  }
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => <PropertyCard key={property.id} property={property} />)}
    </div>;
}