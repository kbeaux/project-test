import { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { PropertyCategory, TransactionType } from '@/types/property';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (params: any) => void;
  className?: string;
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [useLocation, setUseLocation] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: any = {
      ...(location && { city: location }),
      ...(category && { category }),
      ...(transactionType && { transactionType }),
    };

    if (useLocation && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch({
            ...params,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            radius: 5, // Default 5km radius
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          onSearch(params);
        }
      );
    } else {
      onSearch(params);
    }
  };

  const handleLocationToggle = () => {
    setUseLocation(!useLocation);
  };

  return (
    <form onSubmit={handleSearch} className={cn('w-full', className)}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or Postal Code"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {Object.values(PropertyCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {Object.values(TransactionType).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleLocationToggle}
            className={cn(
              'px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
              useLocation
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-gray-700'
            )}
          >
            <MapPin className="h-5 w-5" />
          </button>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}