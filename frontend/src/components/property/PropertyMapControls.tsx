import { MapPin, List, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyMapControlsProps {
  view: 'map' | 'grid';
  onViewChange: (view: 'map' | 'grid') => void;
  onLocationClick: () => void;
  useLocation: boolean;
}

export function PropertyMapControls({
  view,
  onViewChange,
  onLocationClick,
  useLocation,
}: PropertyMapControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onViewChange('grid')}
        className={cn(
          'p-2 rounded-md',
          view === 'grid'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <Grid className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => onViewChange('map')}
        className={cn(
          'p-2 rounded-md',
          view === 'map'
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <List className="h-5 w-5" />
      </button>

      <button
        onClick={onLocationClick}
        className={cn(
          'p-2 rounded-md',
          useLocation
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <MapPin className="h-5 w-5" />
      </button>
    </div>
  );
}