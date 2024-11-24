import { CanchaFromDB } from "@/interfaces/cancha";

export const fields: CanchaFromDB[] = [
  {
    id: 1,
    nombre: "Champions Arena",
    tipo: "soccer",
    precioPorHora: 80,
    imagen:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80",
    descripcion:
      "Professional-grade soccer field with FIFA-approved artificial turf",
    dimensiones: "100m x 64m",
    cantJugadores: 22,
    createdAt: new Date(Date.now()).toDateString(),
    updatedAt: new Date(Date.now()).toDateString(),
  },
  {
    id: 2,
    nombre: "Victory Court",
    tipo: "basketball",
    precioPorHora: 45,
    imagen:
      "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80",
    descripcion: "Indoor basketball court with professional flooring",
    dimensiones: "28m x 15m",
    cantJugadores: 10,
    createdAt: new Date(Date.now()).toDateString(),
    updatedAt: new Date(Date.now()).toDateString(),
  },
  {
    id: 3,
    nombre: "Center Court",
    tipo: "tennis",
    precioPorHora: 35,
    imagen:
      "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?auto=format&fit=crop&q=80",
    descripcion: "Premium tennis court with night lighting",
    dimensiones: "23.77m x 10.97m",
    cantJugadores: 4,
    createdAt: new Date(Date.now()).toDateString(),
    updatedAt: new Date(Date.now()).toDateString(),
  },
];
