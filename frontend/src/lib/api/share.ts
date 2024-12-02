import api from "@/lib/axios";

export interface ShareData {
  propertyId: string;
  recipientEmail?: string;
  message?: string;
  platform?: "email" | "facebook" | "twitter" | "linkedin";
}

export async function shareProperty(data: ShareData): Promise<void> {
  await api.post("/properties/share", data);
}

export function getShareUrl(propertyId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/properties/${propertyId}`;
}
