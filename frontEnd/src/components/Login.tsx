"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../hooks/useToast";
import { useRouter } from "next/navigation"; // If using Next.js

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
  closeDialog: () => void; // Add a prop to close the dialog
}

export function LoginForm({ onSuccess, closeDialog }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const router = useRouter(); // If using Next.js

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError("");
    setMessage("");

    const loginData = { email: data.email, password: data.password };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Login successful!");
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });

        // Store the token in localStorage
        localStorage.setItem("authToken", result.token);

        // Redirect to the complete reservation page
        router.push("/complete-reservation"); // Use your routing logic
        onSuccess(); // Call the onSuccess prop passed to the form

        // Close the dialog on success
        closeDialog(); // Close the dialog
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to log in");
        toast({
          title: "Error",
          description: errorData.error || "Failed to log in",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Network error or server is not available.");
      toast({
        title: "Error",
        description: "Network error or server is not available.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {message && <p className="text-green-500 text-xs">{message}</p>}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...form.register("email")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••"
          {...form.register("password")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full p-2 mt-4 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
