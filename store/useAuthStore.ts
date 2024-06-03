import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  return {
    token: null,
    setToken: (token) => {
      set(() => ({ token }));
    },
  };
});
