import api from "@/lib/axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function register(userData: RegisterData): Promise<AuthResponse> {
  const { data } = await api.post("/auth/register", userData);
  return data;
}

export async function getProfile() {
  const { data } = await api.get("/auth/profile");
  return data;
}
