"use client";

import { DeleteBooking } from "@/actions/bookings";
import BookingCard from "@/components/ReservaCard";

import { ReservaFromDB } from "@/interfaces/reserva";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const params = useParams<{ id: string }>();
  const [bookings, setBookings] = useState<ReservaFromDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(params);
  useEffect(() => {
    fetch(`http://localhost:5000/reservas/usuario/${params.id}`)
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
        setBookings(bookings.filter((booking) => booking.id !== id));
        alert(result.message);
      }
    } catch (error) {
      alert("Error deleting booking");
    } finally {
      setIsLoading(false);
    }
  }
  
  if (isLoading) return <p>Loading...</p>;
  if (bookings.length === 0) return <p>No data</p>;
  return (
    <section className="container min-h-screen bg-background mx-auto px-4 py-8">
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
    </section>
  );
}
