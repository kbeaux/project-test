import { useTranslation } from "react-i18next";
import { Building2, TrendingUp, BarChart, Users } from "lucide-react";
const features = [
  {
    title: "Premium Locations",
    description: "Access to exclusive properties in prime commercial areas",
    icon: Building2,
  },
  {
    title: "Market Analysis",
    description: "In-depth market research and growth potential assessment",
    icon: TrendingUp,
  },
  {
    title: "ROI Optimization",
    description: "Strategies to maximize your investment returns",
    icon: BarChart,
  },
  {
    title: "Expert Support",
    description: "Dedicated team of real estate investment professionals",
    icon: Users,
  },
];
export function InvestmentFeatures() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        {t("why.invest.with.us")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">
              <feature.icon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
