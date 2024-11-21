"use server";

import { signOut } from "@/auth";
import { LoginDto, UserFromDB } from "@/interfaces/user";

export async function login(loginData: LoginDto) {
  console.log("login function");

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
  const loggedInUser: UserFromDB = {
    id: data.user.id,
    name: data.user.name,
    email: data.user.email,
  };

  return {
    success: true,
    payload: loggedInUser,
  };
}

export async function logOut() {
  return signOut({ redirectTo: "/" });
}
