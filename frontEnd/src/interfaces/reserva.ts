export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  fieldId?: string;
}

export interface Reserva {
  id: string;
  fieldId: string;
  date: string;
  timeSlot: TimeSlot;
  customerName: string;
  customerEmail: string;
  totalPrice?: number | null;
}

export interface CreateReservaDto {
  userId: number;
  canchaId: number;
  fecha: string; // Format date to YYYY-MM-DD
  horaInicio: string;
  horaFin: string; // (formatted as "HH:mm" or "HH:mm:ss")
}

export interface ReservaFromDB {
  id: number;
  userId: string;
  canchaId: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  updatedAt: string;
  createdAt: string;
}
