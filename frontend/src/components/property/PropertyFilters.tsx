import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Filter, X } from 'lucide-react';
import { PropertyCategory, TransactionType } from '@/types/property';

const schema = yup.object().shape({
  category: yup.string().oneOf(Object.values(PropertyCategory)),
  transactionType: yup.string().oneOf(Object.values(TransactionType)),
  surfaceMin: yup.number().min(0),
  surfaceMax: yup.number().min(0),
  priceMin: yup.number().min(0),
  priceMax: yup.number().min(0),
});

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function PropertyFilters({
  onFilter,
  onReset,
  isOpen,
  onClose,
}: PropertyFiltersProps) {
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onFilter)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {Object.values(PropertyCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                {...register('transactionType')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {Object.values(TransactionType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surface (m²)
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  {...register('surfaceMin')}
                  placeholder="Min"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  {...register('surfaceMax')}
                  placeholder="Max"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (€)
              </label>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  {...register('priceMin')}
                  placeholder="Min"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  {...register('priceMax')}
                  placeholder="Max"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}