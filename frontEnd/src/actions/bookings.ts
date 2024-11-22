"use server";

import { CreateReservaDto, ReservaFromDB } from "@/interfaces/reserva";

export async function CreateBooking(
  bookingData: CreateReservaDto
): Promise<ReservaFromDB> {
  console.log(bookingData + " BOOKING DATA");
  const response = await fetch("http://localhost:5000/reservas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create booking");
  }

  const insertedBooking: ReservaFromDB = await response.json();
  if (!insertedBooking) {
    throw new Error("Failed to create booking");
  }
  return insertedBooking;
}
