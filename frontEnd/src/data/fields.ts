import { CanchaFromDB } from "@/interfaces/cancha";

export const fields: CanchaFromDB[] = [
  {
    id: "1",
    name: "Champions Arena",
    type: "soccer",
    hourlyRate: 80,
    imageUrl:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80",
    description:
      "Professional-grade soccer field with FIFA-approved artificial turf",
    dimensions: "100m x 64m",
    maxPlayers: 22,
    createdAt: new Date(Date.now()),
  },
  {
    id: "2",
    name: "Victory Court",
    type: "basketball",
    hourlyRate: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&q=80",
    description: "Indoor basketball court with professional flooring",
    dimensions: "28m x 15m",
    maxPlayers: 10,
    createdAt: new Date(Date.now()),
  },
  {
    id: "3",
    name: "Center Court",
    type: "tennis",
    hourlyRate: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?auto=format&fit=crop&q=80",
    description: "Premium tennis court with night lighting",
    dimensions: "23.77m x 10.97m",
    maxPlayers: 4,
    createdAt: new Date(Date.now()),
  },
];
