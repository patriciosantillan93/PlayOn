import { ReservaFromDB, TimeSlot } from "@/interfaces/reserva";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTimeSlots(
  bookings: ReservaFromDB[],
  date: string,
  fieldId?: number,
  workingHours?: { start: string; end: string }
) {
  const slots: TimeSlot[] = [];
  const startHour = workingHours
    ? parseInt(workingHours.start.split(":")[0])
    : 8;
  const endHour = workingHours ? parseInt(workingHours.end.split(":")[0]) : 22;

  console.log("bookings", bookings);
  for (let hour = startHour; hour < endHour; hour++) {
    const id = `${fieldId ?? "999"}-${date}-${hour}`;
    const startTime = `${hour.toString().padStart(2, "0")}:00:00`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:00:00`;
    const isAvailable = !bookings.some((b) => {
      return b.horaInicio === startTime && b.horaFin === endTime;
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

// convert "HH:MM:SS" to "HH:MM"
export function formatTime(timeString: string) {
  // Split the time string by ":" and take the first two parts (HH and MM)
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
}
