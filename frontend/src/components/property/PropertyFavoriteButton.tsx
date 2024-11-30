import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface PropertyFavoriteButtonProps {
  onClick: () => void;
  isFavorite: boolean;
  disabled?: boolean;
  className?: string;
}

export function PropertyFavoriteButton({
  onClick,
  isFavorite,
  disabled,
  className,
}: PropertyFavoriteButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        isFavorite
          ? 'text-red-600 hover:text-red-700'
          : 'text-gray-400 hover:text-gray-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={isFavorite ? t('Remove from favorites') : t('Add to favorites')}
    >
      <Heart
        className={cn(
          'h-6 w-6',
          isFavorite && 'fill-current'
        )}
      />
    </button>
  );
}