import api from "@/lib/axios";
import { PropertySearchParams } from "@/types/search";
import { Property } from "@/types/property";

export interface SearchResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
}

export async function searchProperties(
  params: PropertySearchParams,
): Promise<SearchResponse> {
  const { data } = await api.get("/properties/search", { params });
  return data;
}

export async function getNearbyProperties(
  lat: number,
  lng: number,
  radius: number = 5,
): Promise<Property[]> {
  const { data } = await api.get("/properties/search/nearby", {
    params: { lat, lng, radius },
  });
  return data;
}
