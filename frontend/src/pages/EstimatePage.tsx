import { useState } from 'react';
import { EstimateForm } from '@/components/estimate/EstimateForm';
import { Building2, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    name: 'Property Details',
    description: 'Tell us about your property',
    icon: Building2,
  },
  {
    id: 2,
    name: 'Market Analysis',
    description: 'We analyze market data',
    icon: TrendingUp,
  },
  {
    id: 3,
    name: 'Processing',
    description: 'Calculating estimate',
    icon: Clock,
  },
  {
    id: 4,
    name: 'Results',
    description: 'Get your estimate',
    icon: CheckCircle,
  },
];

export function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimateResult, setEstimateResult] = useState<any>(null);

  const handleEstimateSubmit = async (data: any) => {
    try {
      // Simulate API call with steps
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep(4);
      setEstimateResult({
        estimatedPrice: Math.floor(Math.random() * (2000000 - 500000) + 500000),
        priceRange: {
          min: Math.floor(Math.random() * (1800000 - 400000) + 400000),
          max: Math.floor(Math.random() * (2200000 - 600000) + 600000),
        },
        confidence: 85,
        comparables: 12,
      });
    } catch (error) {
      console.error('Estimation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Estimate Your Property Value
          </h1>
          <p className="text-lg text-gray-600">
            Get an accurate estimate based on market data and property characteristics
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.id}
                  className={`${
                    stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
                  } relative`}
                >
                  <div className="flex items-center">
                    <div
                      className={`${
                        step.id <= currentStep
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      } h-12 w-12 rounded-full flex items-center justify-center`}
                    >
                      <step.icon
                        className={`${
                          step.id <= currentStep
                            ? 'text-white'
                            : 'text-gray-500'
                        } h-6 w-6`}
                        aria-hidden="true"
                      />
                    </div>
                    {stepIdx !== steps.length - 1 && (
                      <div
                        className={`hidden sm:block absolute top-0 right-0 h-12 w-20 ${
                          step.id < currentStep
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                        style={{
                          width: '100%',
                          height: '2px',
                          transform: 'translateX(2rem)',
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-900">
                      {step.name}
                    </span>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form or Results */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 4 && estimateResult ? (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Property Valuation Results
              </h2>
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">Estimated Value</p>
                  <p className="text-4xl font-bold text-blue-600">
                    €{estimateResult.estimatedPrice.toLocaleString()}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Price Range</p>
                    <p className="font-semibold">
                      €{estimateResult.priceRange.min.toLocaleString()} - €
                      {estimateResult.priceRange.max.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Confidence Score</p>
                    <p className="font-semibold">{estimateResult.confidence}%</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500">
                    This estimate is based on {estimateResult.comparables} comparable
                    properties in your area sold in the last 12 months.
                  </p>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setEstimateResult(null);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start New Estimate
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EstimateForm onSubmit={handleEstimateSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}