import { useTranslation } from "react-i18next";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Upload } from 'lucide-react';
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  position: yup.string().required('Position is required'),
  experience: yup.string().required('Years of experience is required'),
  message: yup.string().required('Cover letter is required'),
  cv: yup.mixed().required('CV is required')
});
interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  cv: FileList;
}
interface Job {
  id: number;
  title: string;
}
interface ApplicationFormProps {
  selectedJob: Job | undefined;
}
export function ApplicationForm({
  selectedJob
}: ApplicationFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = async (data: ApplicationFormData) => {
    try {
      // TODO: Implement API call to submit application
      console.log('Form data:', data);
      reset();
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };
  return <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("first.name")}</label>
            <input type="text" {...register('firstName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("last.name")}</label>
            <input type="text" {...register('lastName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("email")}</label>
            <input type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("phone")}</label>
            <input type="tel" {...register('phone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("position")}</label>
          <select {...register('position')} defaultValue={selectedJob?.title || ''} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">{t("select.a.position")}</option>
            <option value="Commercial Real Estate Agent">{t("commercial.real.estate.agent")}</option>
            <option value="Property Manager">{t("property.manager")}</option>
            <option value="Real Estate Market Analyst">{t("real.estate.market.analyst")}</option>
          </select>
          {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("years.of.experience")}</label>
          <select {...register('experience')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">{t("select.experience")}</option>
            <option value="0-2">{t("0.2.years")}</option>
            <option value="3-5">{t("3.5.years")}</option>
            <option value="5-10">{t("5.10.years")}</option>
            <option value="10+">{t("10.years")}</option>
          </select>
          {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("cover.letter")}</label>
          <textarea {...register('message')} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder={t("tell.us.about.yourself.and.why.you.re.interested.in.this.position.")} />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{t("upload.cv")}</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="cv" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>{t("upload.a.file")}</span>
                  <input id="cv" type="file" {...register('cv')} className="sr-only" accept=".pdf,.doc,.docx" />
                </label>
                <p className="pl-1">{t("or.drag.and.drop")}</p>
              </div>
              <p className="text-xs text-gray-500">{t("pdf.doc.docx.up.to.10mb")}</p>
            </div>
          </div>
          {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>;
}