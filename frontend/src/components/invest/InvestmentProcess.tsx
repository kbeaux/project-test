import { Briefcase, Search, Calculator, Handshake } from 'lucide-react';

const steps = [
  {
    title: 'Property Selection',
    description: 'Browse our curated selection of premium commercial properties',
    icon: Search,
  },
  {
    title: 'Investment Analysis',
    description: 'Calculate potential returns and evaluate market conditions',
    icon: Calculator,
  },
  {
    title: 'Expert Consultation',
    description: 'Meet with our investment advisors to refine your strategy',
    icon: Briefcase,
  },
  {
    title: 'Deal Completion',
    description: 'Seamless transaction process with full support',
    icon: Handshake,
  },
];

export function InvestmentProcess() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Investment Process
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gray-200" />
            )}
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 rounded-full p-3">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}