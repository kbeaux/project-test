import api from '@/lib/axios';

export interface PropertySubmission {
  category: string;
  transactionType: string;
  surface: number;
  price: number;
  description: string;
  location: {
    address: string;
    city: string;
    zipCode: string;
  };
  images: File[];
}

export async function submitProperty(data: PropertySubmission): Promise<void> {
  const formData = new FormData();
  
  // Append property data
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'images' && key !== 'location') {
      formData.append(key, value.toString());
    }
  });

  // Append location data
  Object.entries(data.location).forEach(([key, value]) => {
    formData.append(`location[${key}]`, value);
  });

  // Append images
  data.images.forEach((image, index) => {
    formData.append(`images[${index}]`, image);
  });

  await api.post('/properties', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}