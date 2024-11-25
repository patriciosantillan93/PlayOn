"use server";

import { signIn } from "@/auth";
import { LoginDto, RegisterDto } from "@/interfaces/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function login(loginData: LoginDto) {
  const email = loginData.email;
  const password = loginData.password;

  await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
  return { success: true };
}

export async function register(registerData: RegisterDto) {
  const response = await fetch(`${API_URL}/auth/register`, {
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
}
