"use server";

import { signOut } from "@/auth";
import { LoginDto, UserFromDB } from "@/interfaces/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function login(loginData: LoginDto) {
  const response = await fetch(`${API_URL}/auth/login`, {
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
  const loggedInUser: UserFromDB = {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
    role: data.user.role,
  };

  return {
    success: true,
    payload: loggedInUser,
  };
}

export async function logOut() {
  return signOut({ redirectTo: "/" });
}
