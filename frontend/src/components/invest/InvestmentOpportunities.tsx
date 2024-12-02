import { Property } from "@/types/property";
import { PropertyCard } from "../property/PropertyCard";
import { BarChart, TrendingUp, Building2 } from "lucide-react";

interface InvestmentOpportunitiesProps {
  properties: Property[];
  isLoading?: boolean;
}

export function InvestmentOpportunities({
  properties,
  isLoading,
}: InvestmentOpportunitiesProps) {
  const metrics = [
    {
      label: "Average ROI",
      value: "12.5%",
      icon: BarChart,
      description: "Annual return on investment",
    },
    {
      label: "Market Growth",
      value: "+8.3%",
      icon: TrendingUp,
      description: "Year over year appreciation",
    },
    {
      label: "Properties Available",
      value: properties.length.toString(),
      icon: Building2,
      description: "Premium investment opportunities",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Investment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <metric.icon className="h-8 w-8 text-blue-600" />
              <h3 className="ml-3 text-lg font-semibold text-gray-900">
                {metric.label}
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {metric.value}
            </p>
            <p className="text-sm text-gray-600">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>
    </div>
  );
}
