import { useEffect } from 'react';
import { InvestmentCalculator } from '@/components/invest/InvestmentCalculator';
import { InvestmentOpportunities } from '@/components/invest/InvestmentOpportunities';
import { InvestmentProcess } from '@/components/invest/InvestmentProcess';
import { InvestmentFeatures } from '@/components/invest/InvestmentFeatures';
import { InvestmentStats } from '@/components/invest/InvestmentStats';
import { MarketTrends } from '@/components/invest/MarketTrends';
import { useInvestment } from '@/hooks/useInvestment';

export function InvestPage() {
  const { loadProperties, properties, isLoading } = useInvestment();

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investment Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover prime commercial properties with excellent investment potential
            in sought-after locations.
          </p>
        </div>

        {/* Investment Stats */}
        <div className="mb-12">
          <InvestmentStats />
        </div>

        {/* Investment Calculator */}
        <div className="mb-12">
          <InvestmentCalculator />
        </div>

        {/* Market Trends */}
        <div className="mb-12">
          <MarketTrends />
        </div>

        {/* Investment Process */}
        <div className="mb-12">
          <InvestmentProcess />
        </div>

        {/* Investment Features */}
        <div className="mb-12">
          <InvestmentFeatures />
        </div>

        {/* Investment Properties */}
        <div className="mb-12">
          <InvestmentOpportunities
            properties={properties}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}