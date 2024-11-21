import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserFromDB, LoginDto, RegisterDto } from "@/interfaces/user";

interface AuthState {
  user: UserFromDB | null;
  setUser: (user: UserFromDB | null) => void;
  login: (
    loginData: LoginDto
  ) => Promise<{ id: any; name: any; email: any } | null>;
  register: (registerData: RegisterDto) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      login: async (loginData) => {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Invalid email or password");
        }

        const data = await response.json();

        // Store the user and token
        const loggedInUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        };

        // Store the user and token in localStorage or sessionStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("authToken", data.token);

        // Update the state in your auth context
        set({ user: loggedInUser }); // Call setUser to update the state

        return loggedInUser; // Return the user for further processing if necessary
      },
      //
      register: async (registerData) => {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        });

        if (!response.ok) {
          // Extract error message from the backend
          const errorData = await response.json();

          if (response.status === 400) {
            throw new Error(errorData.error || "User already exists");
          } else if (response.status === 500) {
            throw new Error(errorData.error || "Server error occurred");
          } else {
            throw new Error("Unexpected error occurred");
          }
        }

        return await response.json(); // Return the user data or success message
      },

      logout: () => {
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
