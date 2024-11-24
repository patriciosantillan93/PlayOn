"use client";

import { DeleteBooking } from "@/actions/bookings";
import BookingCard from "@/components/ReservaCard";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { ReservaFromDB } from "@/interfaces/reserva";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState<ReservaFromDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/");
    }
    fetch(`${API_URL}/reservas/usuario/${session.data?.user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setIsLoading(false);
      });
  }, []);

  async function handleDeleteBooking(id: number) {
    setIsLoading(true);
    try {
      const result = await DeleteBooking(id);
      if (result) {
        toast({
          title: "Booking Deleted!",
          description: result.message,
        });
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Booking Error:",
          description: error.message || "Error cancelling booking.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="container  bg-background mx-auto px-4 py-8">
      <Toaster />
      {bookings.length === 0 ? (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">No registered bookings</h1>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
          </div>
          <div className="w-full flex flex-col justify-start gap-5 p-5 ">
            {bookings.map((booking) => (
              <div key={booking.id}>
                <BookingCard booking={booking} onDelete={handleDeleteBooking} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
