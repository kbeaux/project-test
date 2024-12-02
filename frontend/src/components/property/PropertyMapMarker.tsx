import { Property } from "@/types/property";
import { Building2 } from "lucide-react";

interface PropertyMapMarkerProps {
  property: Property;
  isSelected?: boolean;
  onClick?: () => void;
}

export function PropertyMapMarker({
  property,
  isSelected,
  onClick,
}: PropertyMapMarkerProps) {
  return (
    <div
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2
        cursor-pointer transition-all duration-200
        ${isSelected ? "scale-125 z-10" : "hover:scale-110"}
      `}
      onClick={onClick}
    >
      <div className="relative">
        <Building2
          className={`
            h-6 w-6
            ${isSelected ? "text-blue-600" : "text-gray-700"}
          `}
        />
        {isSelected && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-white rounded-lg shadow-lg p-2 text-xs whitespace-nowrap">
              €{property.price.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
