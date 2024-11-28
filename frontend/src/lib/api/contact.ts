import api from '@/lib/axios';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(data: ContactFormData): Promise<void> {
  await api.post('/contact', data);
}