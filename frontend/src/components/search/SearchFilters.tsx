import { cn } from "@/lib/utils";
import { PropertyCategory, TransactionType } from "@/types/property";
import { yupResolver } from "@hookform/resolvers/yup";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
const schema = yup.object().shape({
  category: yup.string().oneOf(Object.values(PropertyCategory)),
  transactionType: yup.string().oneOf(Object.values(TransactionType)),
  city: yup.string(),
  zipCode: yup.string(),
  surfaceMin: yup.number().min(0).nullable(),
  surfaceMax: yup.number().min(0).nullable(),
  priceMin: yup.number().min(0).nullable(),
  priceMax: yup.number().min(0).nullable(),
  useCurrentLocation: yup.boolean(),
});
interface SearchFiltersProps {
  onFilter: (data: any) => void;
  onReset: () => void;
  initialValues?: any;
  className?: string;
}
export function SearchFilters({
  onFilter,
  onReset,
  initialValues,
  className,
}: SearchFiltersProps) {
  const { t } = useTranslation();
  const [useLocation, setUseLocation] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });
  const handleLocationToggle = () => {
    if (!useLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue("lat", position.coords.latitude);
          setValue("lng", position.coords.longitude);
          setValue("radius", 5); // Default 5km radius
          setUseLocation(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    } else {
      setValue("lat", null);
      setValue("lng", null);
      setValue("radius", null);
      setUseLocation(false);
    }
  };
  const handleReset = () => {
    reset();
    onReset();
    setUseLocation(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onFilter)}
      className={cn("space-y-6", className)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("category")}
          </label>
          <select
            {...register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">{t("all categories")}</option>
            {Object.values(PropertyCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.category.message")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("transaction.type")}
          </label>
          <select
            {...register("transactionType")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">{t("all types")}</option>
            {Object.values(TransactionType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.transactionType && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.transactionType.message")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("location")}
          </label>
          <div className="mt-1 flex gap-2">
            <input
              {...register("city")}
              type="text"
              placeholder={t("city")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleLocationToggle}
              className={cn(
                "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                useLocation
                  ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                  : "bg-white text-gray-700 hover:bg-gray-50",
              )}
            >
              <MapPin className="h-4 w-4" />
            </button>
          </div>
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.city.message")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("zip.code")}
          </label>
          <input
            {...register("zipCode")}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.zipCode.message")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("surface.m.")}
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              {...register("surfaceMin")}
              type="number"
              placeholder={t("min")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              {...register("surfaceMax")}
              type="number"
              placeholder={t("max")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {(errors.surfaceMin || errors.surfaceMax) && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.surfaceMin?.message") ||
                t("errors.surfaceMax?.message")}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("price.")}
          </label>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <input
              {...register("priceMin")}
              type="number"
              placeholder={t("min")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              {...register("priceMax")}
              type="number"
              placeholder={t("max")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          {(errors.priceMin || errors.priceMax) && (
            <p className="mt-1 text-sm text-red-600">
              {t("errors.priceMin?.message") || t("errors.priceMax ?.message")}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t("reset")}
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {t("apply filters")}
        </button>
      </div>
    </form>
  );
}
