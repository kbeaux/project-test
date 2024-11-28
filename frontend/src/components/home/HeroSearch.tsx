import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { PropertyCategory, TransactionType } from '@/types/property';
import { PropertySearchParams } from '@/types/search';
import { cn } from '@/lib/utils';

interface HeroSearchProps {
  onSearch: (params: PropertySearchParams) => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [activeTab, setActiveTab] = useState('business');
  const [location, setLocation] = useState('');
  const [surfaceMin, setSurfaceMin] = useState('');
  const [surfaceMax, setSurfaceMax] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [useLocation, setUseLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: PropertySearchParams = {
      ...(location && { city: location }),
      ...(surfaceMin && { surfaceMin: parseInt(surfaceMin) }),
      ...(surfaceMax && { surfaceMax: parseInt(surfaceMax) }),
      ...(budgetMin && { priceMin: parseInt(budgetMin) }),
      ...(budgetMax && { priceMax: parseInt(budgetMax) }),
    };

    switch (activeTab) {
      case 'business':
        params.category = PropertyCategory.COMMERCIAL;
        break;
      case 'retail':
        params.category = PropertyCategory.RETAIL;
        break;
      case 'office':
        params.category = PropertyCategory.OFFICE;
        break;
    }

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

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="flex flex-col">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('business')}
            className={cn(
              'flex-1 px-6 py-4 text-sm font-medium',
              activeTab === 'business'
                ? 'text-gray-900 bg-gray-50 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            Business Transfer & Lease
          </button>
          <button
            onClick={() => setActiveTab('retail')}
            className={cn(
              'flex-1 px-6 py-4 text-sm font-medium',
              activeTab === 'retail'
                ? 'text-gray-900 bg-gray-50 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            Retail Walls
          </button>
          <button
            onClick={() => setActiveTab('office')}
            className={cn(
              'flex-1 px-6 py-4 text-sm font-medium',
              activeTab === 'office'
                ? 'text-gray-900 bg-gray-50 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            )}
          >
            Office Space
          </button>
        </div>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or Postal Code"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setUseLocation(!useLocation)}
                  className={cn(
                    'inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                    useLocation
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surface (m²)
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={surfaceMin}
                  onChange={(e) => setSurfaceMin(e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={surfaceMax}
                  onChange={(e) => setSurfaceMax(e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget (€)
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Properties
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}