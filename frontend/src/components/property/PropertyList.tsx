import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";
import { PropertyCard } from "./PropertyCard";
import { PropertyFilters } from "./PropertyFilters";
import { useState } from "react";
import { Filter } from "lucide-react";
interface PropertyListProps {
  properties: Property[];
  isLoading?: boolean;
  onFilter: (filters: any) => void;
}
export function PropertyList({
  properties,
  isLoading,
  onFilter,
}: PropertyListProps) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="relative">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {t("available properties")}
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Filter className="h-4 w-4 mr-2" />
          {t("filters")}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {showFilters && (
          <div className="lg:col-span-1">
            <PropertyFilters
              onFilter={onFilter}
              onClose={() => setShowFilters(false)}
              onReset={() => onFilter({})}
              isOpen={showFilters}
            />
          </div>
        )}

        <div className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
