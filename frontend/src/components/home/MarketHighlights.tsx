import { useTranslation } from "react-i18next";
import { TrendingUp, ArrowUpRight, Building2, MapPin } from 'lucide-react';
const highlights = [{
  area: 'Central Paris',
  stats: {
    priceChange: '+5.2%',
    avgPrice: '12,500',
    inventory: '125'
  },
  trend: 'Growing demand for premium retail spaces',
  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
}, {
  area: 'La Défense',
  stats: {
    priceChange: '+3.8%',
    avgPrice: '9,800',
    inventory: '98'
  },
  trend: 'Increasing office space requirements',
  image: 'https://images.unsplash.com/photo-1583592643761-bf2ecd0e6f84?auto=format&fit=crop&w=800&q=80'
}, {
  area: 'Champs-Élysées',
  stats: {
    priceChange: '+7.1%',
    avgPrice: '15,200',
    inventory: '45'
  },
  trend: 'High demand for luxury retail locations',
  image: 'https://images.unsplash.com/photo-1503017964658-e2ff5a583c8e?auto=format&fit=crop&w=800&q=80'
}];
export function MarketHighlights() {
  const { t } = useTranslation();
  return <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t("market.highlights")}</h2>
          <p className="mt-4 text-lg text-gray-600">{t("stay.informed.about.the.latest.market.trends.and.opportunities")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48">
                <img src={highlight.image} alt={highlight.area} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <h3 className="text-xl font-semibold">{highlight.area}</h3>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <div className="flex items-center text-green-600 mb-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-semibold">
                        {highlight.stats.priceChange}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{t("yoy.growth")}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-900 mb-1">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span className="font-semibold">
                        €{highlight.stats.avgPrice}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{t("avg.m.")}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-900 mb-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span className="font-semibold">
                        {highlight.stats.inventory}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{t("properties")}</p>
                  </div>
                </div>

                <p className="text-gray-600">{highlight.trend}</p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}