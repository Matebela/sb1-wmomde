import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const VALID_CREDENTIALS = {
  email: 'samba@sambasci.com',
  password: 'AIisAwesome!'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      set({ user: { email, isAuthenticated: true } });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null }),
}));