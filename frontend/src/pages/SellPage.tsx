import { SellForm } from "@/components/sell/SellForm";
import { Building2, Calculator, Users } from "lucide-react";

const benefits = [
  {
    title: "Expert Valuation",
    description: "Get an accurate market value for your property",
    icon: Calculator,
  },
  {
    title: "Wide Network",
    description: "Access to qualified buyers and investors",
    icon: Users,
  },
  {
    title: "Full Support",
    description: "Professional guidance throughout the process",
    icon: Building2,
  },
];

export function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sell or Rent Your Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your commercial property with us and reach qualified buyers and
            tenants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Property Details
          </h2>
          <SellForm />
        </div>
      </div>
    </div>
  );
}
