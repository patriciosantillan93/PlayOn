"use client";

import { fields } from "@/data/fields";
import { ReservaFromDB } from "@/interfaces/reserva";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

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
            <p>{booking.fecha}</p>
            <p>{booking.horaInicio}</p>
            <p>{booking.horaFin}</p>
            <p>{booking.canchaId}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
