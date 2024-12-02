import { BarChart, TrendingUp, Building2 } from "lucide-react";

interface InvestmentMetricsProps {
  metrics: {
    roi: number;
    marketGrowth: number;
    availableProperties: number;
  };
}

export function InvestmentMetrics({ metrics }: InvestmentMetricsProps) {
  const items = [
    {
      label: "Average ROI",
      value: `${metrics.roi}%`,
      icon: BarChart,
      description: "Annual return on investment",
    },
    {
      label: "Market Growth",
      value: `+${metrics.marketGrowth}%`,
      icon: TrendingUp,
      description: "Year over year appreciation",
    },
    {
      label: "Properties Available",
      value: metrics.availableProperties.toString(),
      icon: Building2,
      description: "Premium investment opportunities",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <item.icon className="h-8 w-8 text-blue-600" />
            <h3 className="ml-3 text-lg font-semibold text-gray-900">
              {item.label}
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">{item.value}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
