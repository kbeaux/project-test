import { useTranslation } from "react-i18next";
import { Property } from '@/types/property';
import { GoogleMap } from '@/components/contact/GoogleMap';
import { MapPin } from 'lucide-react';
interface PropertyLocationProps {
  property: Property;
}
export function PropertyLocation({
  property
}: PropertyLocationProps) {
  const { t } = useTranslation();
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t("location")}</h2>
      
      <div className="flex items-start mb-4">
        <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-2" />
        <div>
          <p className="text-gray-900">{property.location.address}</p>
          <p className="text-gray-600">
            {property.location.city}, {property.location.zipCode}
          </p>
        </div>
      </div>

      <div className="h-[400px] rounded-lg overflow-hidden">
        <GoogleMap center={{
        lat: property.location.latitude,
        lng: property.location.longitude
      }} zoom={15} markers={[{
        position: {
          lat: property.location.latitude,
          lng: property.location.longitude
        },
        title: property.type
      }]} />
      </div>
    </div>;
}