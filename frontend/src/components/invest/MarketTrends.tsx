import { useTranslation } from "react-i18next";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
const marketTrends = [
  {
    area: "Central Paris",
    priceChange: "+5.2%",
    trend: "up",
    avgPrice: "12,500",
    demand: "High",
  },
  {
    area: "La Défense",
    priceChange: "+3.8%",
    trend: "up",
    avgPrice: "9,800",
    demand: "Medium",
  },
  {
    area: "Champs-Élysées",
    priceChange: "+7.1%",
    trend: "up",
    avgPrice: "15,200",
    demand: "Very High",
  },
];
export function MarketTrends() {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          {t("market trends")}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("area")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("price change yoy.")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("avg price m.")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t("demand")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {marketTrends.map((trend, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trend.area}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    {trend.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        trend.trend === "up" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {trend.priceChange}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  €{trend.avgPrice}
                  {t(".m.")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trend.demand === "High" ? "bg-green-100 text-green-800" : trend.demand === "Very High" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {trend.demand}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
