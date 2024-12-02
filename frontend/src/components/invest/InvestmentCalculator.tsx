import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calculator, DollarSign, Percent, Clock } from "lucide-react";
interface CalculatorInputs {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  expenses: number;
}
interface CalculatorResults {
  monthlyPayment: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
  totalReturn: number;
}
export function InvestmentCalculator() {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    purchasePrice: 500000,
    downPayment: 100000,
    interestRate: 3.5,
    loanTerm: 20,
    monthlyRent: 3000,
    expenses: 500,
  });
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const calculateResults = () => {
    const loanAmount = inputs.purchasePrice - inputs.downPayment;
    const monthlyInterest = inputs.interestRate / 100 / 12;
    const totalPayments = inputs.loanTerm * 12;

    // Calculate monthly mortgage payment using the loan amortization formula
    const monthlyPayment =
      (loanAmount *
        monthlyInterest *
        Math.pow(1 + monthlyInterest, totalPayments)) /
      (Math.pow(1 + monthlyInterest, totalPayments) - 1);

    // Calculate annual cash flow
    const annualRent = inputs.monthlyRent * 12;
    const annualExpenses = inputs.expenses * 12;
    const annualMortgage = monthlyPayment * 12;
    const annualCashFlow = annualRent - annualExpenses - annualMortgage;

    // Calculate cash on cash return
    const cashOnCashReturn = (annualCashFlow / inputs.downPayment) * 100;

    // Calculate total return including appreciation (estimated at 3% per year)
    const annualAppreciation = inputs.purchasePrice * 0.03;
    const totalReturn =
      ((annualCashFlow + annualAppreciation) / inputs.downPayment) * 100;
    setResults({
      monthlyPayment,
      annualCashFlow,
      cashOnCashReturn,
      totalReturn,
    });
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          {t("investment calculator")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("purchase.price.")}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={inputs.purchasePrice}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  purchasePrice: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("down payment.")}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={inputs.downPayment}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  downPayment: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("interest rate.")}
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              step="0.1"
              value={inputs.interestRate}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  interestRate: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("loan term years.")}
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={inputs.loanTerm}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  loanTerm: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("monthly rent.")}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={inputs.monthlyRent}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  monthlyRent: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("monthly expenses.")}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={inputs.expenses}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  expenses: Number(e.target.value),
                })
              }
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        onClick={calculateResults}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("calculate roi")}
      </button>

      {results && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">{t("monthly payment")}</p>
            <p className="text-lg font-semibold">
              €{Math.round(results.monthlyPayment).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">{t("annual cash flow")}</p>
            <p className="text-lg font-semibold">
              €{Math.round(results.annualCashFlow).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">{t("cash on cash return")}</p>
            <p className="text-lg font-semibold">
              {results.cashOnCashReturn.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              {t("total.return.with.appreciation.")}
            </p>
            <p className="text-lg font-semibold">
              {results.totalReturn.toFixed(2)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
