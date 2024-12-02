import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, register as apiRegister } from "./api/auth";
import type { LoginCredentials, RegisterData } from "./api/auth";

interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  } | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        const { accessToken, user } = await apiLogin(credentials);
        set({
          token: accessToken,
          user,
          isAuthenticated: true,
        });
      },
      register: async (data) => {
        const { accessToken, user } = await apiRegister(data);
        set({
          token: accessToken,
          user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
