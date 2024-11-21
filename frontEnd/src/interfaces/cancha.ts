export interface Cancha {
  name: string;
  type: "soccer" | "basketball" | "tennis" | "volleyball";
  hourlyRate?: number | null;
  imageUrl?: string | null;
  description?: string | null;
  dimensions?: string | null;
  maxPlayers?: number | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface CanchaFromDB extends Cancha {
  id: string;
}
