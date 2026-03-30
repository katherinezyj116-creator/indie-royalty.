import { create } from "zustand";

type Profile = {
  id: string;
  email: string;
  name: string | null;
};

type AuthState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  reset: () => void;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  reset: () => set({ profile: null }),
  hydrate: async () => {
    try {
      const response = await fetch("/api/auth/me", { credentials: "include" });
      if (!response.ok) {
        set({ profile: null });
        return;
      }
      const payload = await response.json();
      set({ profile: payload.profile });
    } catch (error) {
      console.error("hydrate auth error", error);
      set({ profile: null });
    }
  },
}));
