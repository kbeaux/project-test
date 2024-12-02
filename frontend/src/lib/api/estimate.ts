import api from "@/lib/axios";

export interface EstimateFormData {
  category: string;
  type: string;
  transactionType: string;
  surface: number;
  location: {
    address: string;
    city: string;
    zipCode: string;
  };
  features: {
    condition: string;
    yearBuilt: number;
    parking: boolean;
    elevator: boolean;
    airConditioning: boolean;
  };
}

export interface EstimateResult {
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  confidence: number;
  comparables: number;
}

export async function getPropertyEstimate(
  data: EstimateFormData,
): Promise<EstimateResult> {
  const { data: result } = await api.post("/properties/estimate", data);
  return result;
}
