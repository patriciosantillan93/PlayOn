import { TimeSlot } from "@/interfaces/reserva";

const generateTimeSlots = (fieldId: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 8; // 8 AM
  const endHour = 22; // 10 PM

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      id: `${fieldId}-${hour}`,
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
      isAvailable: Math.random() > 0.3, // Randomly set availability for demo
      fieldId,
    });
  }

  return slots;
};

export const timeSlots: Record<string, TimeSlot[]> = {
  "1": generateTimeSlots("1"),
  "2": generateTimeSlots("2"),
  "3": generateTimeSlots("3"),
};
