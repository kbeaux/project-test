import api from "@/lib/axios";
import { Property } from "@/types/property";

export interface InvestmentMetrics {
  roi: number;
  marketGrowth: number;
  rentalYield: number;
}

export async function getInvestmentProperties(): Promise<Property[]> {
  const { data } = await api.get("/properties/investment");
  return data;
}

export async function getPropertyMetrics(
  propertyId: string,
): Promise<InvestmentMetrics> {
  const { data } = await api.get(`/properties/${propertyId}/metrics`);
  return data;
}

export async function calculateInvestmentReturn(params: {
  purchasePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  expenses: number;
}): Promise<{
  monthlyPayment: number;
  annualCashFlow: number;
  cashOnCashReturn: number;
}> {
  const { data } = await api.post("/properties/calculate-roi", params);
  return data;
}
