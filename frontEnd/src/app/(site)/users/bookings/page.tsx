"use client";

import { DeleteBooking } from "@/actions/bookings";
import BookingCard from "@/components/ReservaCard";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/useToast";
import { ReservaFromDB } from "@/interfaces/reserva";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ConfirmActionModal from "@/components/ConfirmActionModal";

export default function MyBookings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<ReservaFromDB[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [viewPastBookings, setViewPastBookings] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const now = new Date();
  const currentDateTime = now.getTime();

  const futureBookings = bookings.filter((b) => {
    const bookingDateTime = new Date(`${b.fecha}T${b.horaInicio}`).getTime();
    return bookingDateTime > currentDateTime; // Future bookings
  });

  const pastBookings = bookings.filter((b) => {
    const bookingDateTime = new Date(`${b.fecha}T${b.horaFin}`).getTime();
    return bookingDateTime <= currentDateTime; // Past bookings
  });

  const displayBookings = viewPastBookings ? pastBookings : futureBookings;

  useEffect(() => {
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
            <Button
              variant="outline"
              onClick={() => setViewPastBookings(!viewPastBookings)}
            >
              {viewPastBookings ? "See upcoming" : "See past"}
            </Button>
          </div>
          <div className="w-full flex flex-col justify-start gap-5 p-5 ">
            {displayBookings
              .sort((a, b) => {
                // Convert fecha strings to Date objects
                const dateA = new Date(a.fecha);
                const dateB = new Date(b.fecha);
                // Return the difference in milliseconds
                return dateB.getTime() - dateA.getTime();
              })
              .map((b) => (
                <div key={b.id}>
                  <BookingCard
                    booking={b}
                    onDelete={() => {
                      setSelectedBookingId(b.id);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              ))}
          </div>
        </>
      )}
      <ConfirmActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDeleteBooking(selectedBookingId!)}
        message={`Are you sure you want to cancel your booking?`}
      />
    </section>
  );
}
