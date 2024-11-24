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

export async function GetBookingsByFieldID(
  date: string,
  fieldId?: number
): Promise<ReservaFromDB[]> {
  if (!fieldId) {
    throw new Error("Missing Field ID");
  }
  const response = await fetch(
    `http://localhost:5000/reservas/cancha/${fieldId}?fecha=${date}` // YYYY-MM-DD
  );
  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }
  return await response.json();
}

export async function GetBookingsByUserID(
  userId: number
): Promise<ReservaFromDB[]> {
  const response = await fetch(
    `http://localhost:5000/reservas/usuario/${userId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to get bookings");
  }

  const bookings: ReservaFromDB[] = await response.json();
  if (!bookings) {
    throw new Error("Failed to get bookings");
  }
  return bookings;
}

export async function DeleteBooking(bookingId: number): Promise<any> {
  const response = await fetch(`http://localhost:5000/reservas/${bookingId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete booking");
  }

  return response.json();
}
