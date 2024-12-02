import { useTranslation } from "react-i18next";
import { TrendingUp, Users, Building2 } from "lucide-react";
const stats = [
  {
    label: "Total Investment Volume",
    value: "€250M+",
    icon: TrendingUp,
  },
  {
    label: "Active Investors",
    value: "500+",
    icon: Users,
  },
  {
    label: "Properties Under Management",
    value: "1,200+",
    icon: Building2,
  },
];
export function InvestmentStats() {
  const { t } = useTranslation();
  return (
    <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
      <h2 className="text-2xl font-bold mb-8 text-center">
        {t("our.investment.track.record")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">
              <stat.icon className="h-8 w-8" />
            </div>
            <p className="text-3xl font-bold mb-2">{stat.value}</p>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
