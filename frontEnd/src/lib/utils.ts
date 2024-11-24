import { ReservaFromDB, TimeSlot } from "@/interfaces/reserva";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTimeSlots(
  reservations: ReservaFromDB[],
  fieldId?: number,
  date?: string,
  workingHours?: { start: string; end: string }
) {
  const slots: TimeSlot[] = [];
  const startHour = workingHours
    ? parseInt(workingHours.start.split(":")[0])
    : 8;
  const endHour = workingHours ? parseInt(workingHours.end.split(":")[0]) : 22;

  for (let hour = startHour; hour < endHour; hour++) {
    const id = `${fieldId ?? "999"}-${hour}`;
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

    const isAvailable = !reservations.some((reservation) => {
      return (
        reservation.horaInicio < endTime && reservation.horaFin > startTime
      );
    });

    slots.push({
      id,
      startTime,
      endTime,
      isAvailable,
    });
  }

  return slots;
}
