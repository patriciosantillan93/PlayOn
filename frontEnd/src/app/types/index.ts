export type Field = {
  id: string;
  name: string;
  type: 'soccer' | 'basketball' | 'tennis' | 'volleyball';
  hourlyRate: number;
  imageUrl: string;
  description: string;
  dimensions: string;
  maxPlayers: number;
};

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  fieldId: string;
};

export type Booking = {
  id: string;
  fieldId: string;
  date: string;
  timeSlot: TimeSlot;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
};