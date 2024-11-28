"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/useToast";
import { set } from "react-hook-form";

export default function PaymentForm({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: amount },
      });
      const clientSecret = data;

      const checkout = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      if (checkout.paymentIntent?.status !== "succeeded") {
        toast({
          title: "Payment failed",
          description: checkout.error?.message,
          variant: "destructive",
        });
        throw new Error("Payment failed.");
      }
      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4 ">
      <CardElement className="w-full rounded-md border p-3" />
      <Button variant="outline" type="submit">
        {isLoading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
}
