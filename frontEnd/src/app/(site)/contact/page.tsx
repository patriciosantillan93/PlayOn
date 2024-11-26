"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/useToast";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@radix-ui/themes";

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(2, "Please enter a message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    setError("");
    setMessage("");

    const contactData = { email: data.email, message: data.message };

    try {
      const response = await fetch(`${API_URL}/email/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setMessage("Message sent successfully!");
        toast({
          title: "Success",
          description: "Your message has been sent.",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to send message");
        toast({
          title: "Error",
          description: errorData.error || "Failed to send message",
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
  }

  return (
    <section className="container bg-background mx-auto px-4 py-8 md:w-1/3">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Contact</h1>
      </div>
      <h1 className="text-xl font-bold mb-5">Send us your feedback</h1>
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
            Message
          </label>
          <textarea
            id="message"
            placeholder="Enter a message..."
            {...form.register("message")}
            className="w-full p-2 border rounded"
          />
          {form.formState.errors.message && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full dark:border"
        >
          {isLoading ? <Spinner /> : "Send"}
        </Button>
      </form>
    </section>
  );
}
