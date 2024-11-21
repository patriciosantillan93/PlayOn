export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  fieldId: string;
}

export interface Reserva {
  id: string;
  fieldId: string;
  date: string;
  timeSlot: TimeSlot;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
}

export interface ReservaFromDB {
  id: string;
  fieldId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
