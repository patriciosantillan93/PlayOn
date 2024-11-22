export interface Cancha {
  nombre: string;
  tipo: "soccer" | "basketball" | "tennis" | "volleyball";
  precioPorHora?: number | null;
  imagen?: string | null;
  descripcion?: string | null;
  dimensiones?: string | null;
  cantJugadores?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface CanchaFromDB extends Cancha {
  id: number;
  nombre: string;
  createdAt: string;
  updatedAt: string;
}
