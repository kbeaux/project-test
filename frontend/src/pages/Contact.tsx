import { ContactForm } from '@/components/contact/ContactForm';
import { GoogleMap } from '@/components/contact/GoogleMap';
import { Building, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = {
  address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
  phone: '+33 1 23 45 67 89',
  email: 'contact@realestatepro.com',
  hours: 'Monday - Friday: 9:00 AM - 6:00 PM',
  location: {
    lat: 48.8566,
    lng: 2.3522,
  },
};

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Get in touch with our team of real estate experts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Building className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                  <p className="mt-1 text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Business Hours
                  </h3>
                  <p className="mt-1 text-gray-600">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <GoogleMap
              center={contactInfo.location}
              zoom={15}
              markers={[
                {
                  position: contactInfo.location,
                  title: 'RealEstate Pro Office',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}