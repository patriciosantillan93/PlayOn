import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (email: string, password: string) => {
        try {
          const loginData = { email, password };

          const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });

          if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
          }

          const data = await response.json(); // Assuming the backend returns the user data.
          set({ user: data }); // Update the state with the logged-in user's data.
        } catch (error) {
          console.error('Error logging in:', error);
``        }
      },
      register: async (name: string, email: string, password: string) => {
        // TODO: Implement actual registration logic with your backend
        // This is just a mock implementation
        const mockUser = {
          id: '1',
          name,
          email,
        };
        set({ user: mockUser });
      },
      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);