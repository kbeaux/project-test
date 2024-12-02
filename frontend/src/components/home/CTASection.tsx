import { Link } from "react-router-dom";
import { Building2, Calculator, TrendingUp } from "lucide-react";

const ctas = [
  {
    title: "Sell Your Property",
    description: "Get a free valuation and expert advice",
    icon: Building2,
    buttonText: "Start Selling",
    href: "/sell",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Property Valuation",
    description: "Know the true value of your property",
    icon: Calculator,
    buttonText: "Get Estimate",
    href: "/estimate",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Investment Opportunities",
    description: "Discover prime investment properties",
    icon: TrendingUp,
    buttonText: "Invest Now",
    href: "/invest",
    image:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=800&q=80",
  },
];

export function CTASection() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctas.map((cta, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={cta.image}
                alt={cta.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <cta.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {cta.title}
                </h3>
                <p className="text-gray-200 mb-4">{cta.description}</p>
                <Link
                  to={cta.href}
                  className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors w-fit"
                >
                  {cta.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
