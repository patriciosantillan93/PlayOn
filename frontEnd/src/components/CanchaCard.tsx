import { Users, Ruler, CircleDollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CanchaFromDB } from "@/interfaces/cancha";
interface FieldCardProps {
  field: CanchaFromDB;
  onBookNow: (fieldId: number) => void;
}
export default function FieldCard({ field, onBookNow }: FieldCardProps) {
  const {
    id,
    nombre,
    imagen,
    tipo,
    descripcion,
    dimensiones,
    precioPorHora,
    cantJugadores,
  } = field;
  return (
    <Card className="overflow-hidden ">
      <div className="dark:bg-slate-800 h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={imagen ?? ""}
            alt={nombre}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {nombre}
            <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </span>
          </CardTitle>
          <CardDescription>{descripcion}</CardDescription>
        </CardHeader>
        <div className="flex flex-col justify-between flex-grow">
          <CardContent>
            <div className="space-y-2 text-sm ">
              {cantJugadores && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Up to {cantJugadores} players</span>
                </div>
              )}
              {dimensiones && (
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span>{dimensiones}</span>
                </div>
              )}
              {precioPorHora && (
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${precioPorHora}/hour</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="border w-full " onClick={() => onBookNow(id)}>
              Book Now
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
