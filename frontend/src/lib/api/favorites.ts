import api from "@/lib/axios";
import { Property } from "@/types/property";

export async function getFavorites(): Promise<Property[]> {
  const { data } = await api.get("/favorites");
  return data;
}

export async function addToFavorites(propertyId: string): Promise<void> {
  await api.post(`/favorites/${propertyId}`);
}

export async function removeFromFavorites(propertyId: string): Promise<void> {
  await api.delete(`/favorites/${propertyId}`);
}
