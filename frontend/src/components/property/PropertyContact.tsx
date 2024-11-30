import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Property } from '@/types/property';
import { Building2, Mail, Phone, Send } from 'lucide-react';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  message: yup.string().required('Message is required')
});
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}
interface PropertyContactProps {
  property: Property;
}
export function PropertyContact({
  property
}: PropertyContactProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      message: `I am interested in this ${property.type.toLowerCase()} (Ref: ${property.displayRef})`
    }
  });
  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('data', data);
      setIsSubmitting(true);
      // TODO: Implement API call to send inquiry
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error sending inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t("contact.agency")}</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <Building2 className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-900">{property.agency?.commercialName}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-900">{property.agency?.phone}</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-900">{property.agency?.email}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("send.inquiry")}</h3>
        
        {submitSuccess ? <div className="text-center py-4">
            <p className="text-green-600 font-medium">{t("your.inquiry.has.been.sent.successfully.")}</p>
          </div> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input type="text" {...register('name')} placeholder={t("your.name")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <input type="email" {...register('email')} placeholder={t("your.email")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <input type="tel" {...register('phone')} placeholder={t("your.phone.number")} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <textarea {...register('message')} rows={4} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>}
      </div>
    </div>;
}