import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Building2, Upload } from 'lucide-react';
import { PropertyCategory, TransactionType } from '@/types/property';
import { useSellProperty } from '@/hooks/useSellProperty';
const schema = yup.object().shape({
  category: yup.string().required('Property category is required'),
  transactionType: yup.string().required('Transaction type is required'),
  surface: yup.number().required('Surface area is required').positive(),
  price: yup.number().required('Price is required').positive(),
  description: yup.string().required('Description is required'),
  location: yup.object().shape({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('Zip code is required')
  }),
  images: yup.mixed().required('At least one image is required')
});
export function SellForm() {
  const { t } = useTranslation();
  const {
    submit,
    isSubmitting,
    error,
    success
  } = useSellProperty();
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: any) => {
    try {
      await submit(data);
      reset();
    } catch (error) {
      console.error('Error submitting property:', error);
    }
  };
  return <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>}

      {success && <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-600">{t("property.submitted.successfully.")}</p>
        </div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t("property.category")}</label>
          <select {...register('category')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">{t("select.category")}</option>
            {Object.values(PropertyCategory).map(category => <option key={category} value={category}>
                {category}
              </option>)}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("transaction.type")}</label>
          <select {...register('transactionType')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">{t("select.type")}</option>
            {Object.values(TransactionType).map(type => <option key={type} value={type}>
                {type}
              </option>)}
          </select>
          {errors.transactionType && <p className="mt-1 text-sm text-red-600">{errors.transactionType.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("surface.area.m.")}</label>
          <input type="number" {...register('surface')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.surface && <p className="mt-1 text-sm text-red-600">{errors.surface.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("price.")}</label>
          <input type="number" {...register('price')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t("location")}</label>
        <div className="mt-1 grid grid-cols-1 gap-y-4">
          <input {...register('location.address')} placeholder={t("address")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          <div className="grid grid-cols-2 gap-4">
            <input {...register('location.city')} placeholder={t("city")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            <input {...register('location.zipCode')} placeholder={t("zip.code")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
        </div>
        {(errors.location?.address || errors.location?.city || errors.location?.zipCode) && <p className="mt-1 text-sm text-red-600">{t("please.fill.in.all.location.fields")}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t("description")}</label>
        <textarea {...register('description')} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">{t("images")}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>{t("upload.files")}</span>
                <input id="images" type="file" multiple {...register('images')} className="sr-only" accept="image/*" />
              </label>
              <p className="pl-1">{t("or.drag.and.drop")}</p>
            </div>
            <p className="text-xs text-gray-500">{t("png.jpg.gif.up.to.10mb.each")}</p>
          </div>
        </div>
        {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? 'Submitting...' : 'Submit Property'}
      </button>
    </form>;
}