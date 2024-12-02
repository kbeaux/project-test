import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PropertyCategory, TransactionType } from "@/types/property";
const schema = yup.object().shape({
  category: yup
    .string()
    .oneOf(Object.values(PropertyCategory))
    .required("Property category is required"),
  type: yup.string().required("Property type is required"),
  transactionType: yup
    .string()
    .oneOf(Object.values(TransactionType))
    .required("Transaction type is required"),
  surface: yup
    .number()
    .positive("Surface must be positive")
    .required("Surface is required"),
  location: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    zipCode: yup.string().required("Zip code is required"),
  }),
  features: yup.object().shape({
    condition: yup.string().required("Property condition is required"),
    yearBuilt: yup
      .number()
      .min(1800)
      .max(new Date().getFullYear())
      .required("Year built is required"),
    parking: yup.boolean(),
    elevator: yup.boolean(),
    airConditioning: yup.boolean(),
  }),
});
interface EstimateFormProps {
  onSubmit: (data: any) => void;
}
export function EstimateForm({ onSubmit }: EstimateFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-sm p-8"
    >
      <div className="space-y-8">
        {/* Property Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("property.category")}
            </label>
            <select
              {...register("category")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">{t("select.category")}</option>
              {Object.values(PropertyCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
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
              <option value="">{t("select.type")}</option>
              {Object.values(TransactionType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.transactionType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.transactionType.message}
              </p>
            )}
          </div>
        </div>

        {/* Surface */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("surface.area.m.")}
          </label>
          <input
            type="number"
            {...register("surface")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.surface && (
            <p className="mt-1 text-sm text-red-600">
              {errors.surface.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{t("location")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("address")}
              </label>
              <input
                type="text"
                {...register("location.address")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.location?.address && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.address.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("city")}
              </label>
              <input
                type="text"
                {...register("location.city")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.location?.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("zip.code")}
              </label>
              <input
                type="text"
                {...register("location.zipCode")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.location?.zipCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.zipCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {t("property.features")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("condition")}
              </label>
              <select
                {...register("features.condition")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">{t("select.condition")}</option>
                <option value="NEW">{t("new")}</option>
                <option value="EXCELLENT">{t("excellent")}</option>
                <option value="GOOD">{t("good")}</option>
                <option value="FAIR">{t("fair")}</option>
                <option value="NEEDS_WORK">{t("needs.work")}</option>
              </select>
              {errors.features?.condition && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.features.condition.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("year.built")}
              </label>
              <input
                type="number"
                {...register("features.yearBuilt")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.features?.yearBuilt && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.features.yearBuilt.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("features.parking")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {t("parking.available")}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("features.elevator")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {t("elevator")}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("features.airConditioning")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                {t("air.conditioning")}
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("get.estimate")}
          </button>
        </div>
      </div>
    </form>
  );
}
