import { create } from "zustand";

type Profile = {
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  profile: Profile | null;
  setAuth: (payload: { token: string; profile: Profile }) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  profile: null,
  setAuth: ({ token, profile }) => set({ token, profile }),
  reset: () => set({ token: null, profile: null }),
}));
