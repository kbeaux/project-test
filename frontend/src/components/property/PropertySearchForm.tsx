import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Search, MapPin } from "lucide-react";
import { PropertySearchParams } from "@/lib/api/property";
import { PropertyCategory, TransactionType } from "@/types/property";
const schema = yup.object().shape({
  city: yup.string(),
  zipCode: yup.string(),
  surfaceMin: yup.number().min(0).nullable(),
  surfaceMax: yup.number().min(0).nullable(),
  priceMin: yup.number().min(0).nullable(),
  priceMax: yup.number().min(0).nullable(),
  category: yup
    .mixed<PropertyCategory>()
    .oneOf(Object.values(PropertyCategory))
    .nullable(),
  transactionType: yup
    .mixed<TransactionType>()
    .oneOf(Object.values(TransactionType))
    .nullable(),
  lat: yup.number().min(-90).max(90).nullable(),
  lng: yup.number().min(-180).max(180).nullable(),
  radius: yup.number().min(0).nullable(),
});
interface PropertySearchFormProps {
  onSearch: (params: PropertySearchParams) => void;
  isLoading?: boolean;
  initialValues?: Partial<PropertySearchParams>;
}
export function PropertySearchForm({
  onSearch,
  isLoading,
  initialValues,
}: PropertySearchFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setValue,
  } = useForm<PropertySearchParams>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  // const category = watch('category');
  // const transactionType = watch('transactionType');
  const handleLocationSelect = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("lat", position.coords.latitude);
          setValue("lng", position.coords.longitude);
          setValue("radius", 5); // Default 5km radius
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSearch)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              {t("property.type")}
            </label>
            <select
              {...register("category")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">{t("all.categories")}</option>
              <option value={PropertyCategory.COMMERCIAL}>
                {t("commercial")}
              </option>
              <option value={PropertyCategory.OFFICE}>{t("office")}</option>
              <option value={PropertyCategory.RETAIL}>{t("retail")}</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="transactionType"
              className="block text-sm font-medium text-gray-700"
            >
              {t("transaction.type")}
            </label>
            <select
              {...register("transactionType")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">{t("all.types")}</option>
              <option value={TransactionType.SALE}>{t("sale")}</option>
              <option value={TransactionType.RENT}>{t("rent")}</option>
              <option value={TransactionType.TRANSFER}>{t("transfer")}</option>
            </select>
            {errors.transactionType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.transactionType.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              {t("location")}
            </label>
            <div className="mt-1 flex gap-2">
              <input
                {...register("city")}
                type="text"
                placeholder={t("city")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleLocationSelect}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700"
            >
              {t("zip.code")}
            </label>
            <input
              {...register("zipCode")}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={t("enter.zip.code")}
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="surface"
              className="block text-sm font-medium text-gray-700"
            >
              {t("surface.m.")}
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <input
                {...register("surfaceMin")}
                type="number"
                placeholder={t("min")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <input
                {...register("surfaceMax")}
                type="number"
                placeholder={t("max")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            {(errors.surfaceMin || errors.surfaceMax) && (
              <p className="mt-1 text-sm text-red-600">
                {errors.surfaceMin?.message || errors.surfaceMax?.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              {t("price.")}
            </label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <input
                {...register("priceMin")}
                type="number"
                placeholder={t("min")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <input
                {...register("priceMax")}
                type="number"
                placeholder={t("max")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            {(errors.priceMin || errors.priceMax) && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priceMin?.message || errors.priceMax?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-5 h-5 mr-2" />
          {isLoading ? "Searching..." : "Search Properties"}
        </button>
      </div>
    </form>
  );
}
