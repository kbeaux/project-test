import { useState } from "react";
import { usePropertySearch } from "@/hooks/usePropertySearch";
import { usePropertyCompare } from "@/hooks/usePropertyCompare";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { PropertyCompare } from "@/components/property/PropertyCompare";
import { PropertySearchParams } from "@/types/search";
import { Filter } from "lucide-react";

export function SearchPage() {
  const { search, results, isLoading, error } = usePropertySearch();
  const { compareList, addToCompare, removeFromCompare, isInCompare, isFull } =
    usePropertyCompare();
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (params: PropertySearchParams) => {
    search(params);
  };

  const handleFilter = (filters: PropertySearchParams) => {
    search({ ...filters });
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <SearchFilters onFilter={handleFilter} onReset={() => search({})} />
          </div>
        )}

        {compareList.length > 0 && (
          <PropertyCompare
            properties={compareList}
            onRemove={removeFromCompare}
            className="mb-8"
          />
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {results && (
          <SearchResults
            properties={results.data}
            total={results.total}
            isLoading={isLoading}
            onCompare={addToCompare}
            isComparing={isInCompare}
            disableCompare={isFull}
          />
        )}
      </div>
    </div>
  );
}
