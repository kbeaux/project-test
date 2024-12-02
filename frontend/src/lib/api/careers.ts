import api from "@/lib/axios";

export interface JobApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  cv: File;
}

export async function submitApplication(
  application: JobApplication,
): Promise<void> {
  const formData = new FormData();
  Object.entries(application).forEach(([key, value]) => {
    formData.append(key, value);
  });

  await api.post("/careers/apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
