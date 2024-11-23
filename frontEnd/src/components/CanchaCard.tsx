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
  return (
    <Card className="overflow-hidden ">
      <div className="dark:bg-slate-800">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={field.imagen ?? ""}
            alt={field.nombre}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {field.nombre}
            <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
              {field.tipo.charAt(0).toUpperCase() + field.tipo.slice(1)}
            </span>
          </CardTitle>
          <CardDescription>{field.descripcion}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm ">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Up to {field.cantJugadores} players</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>{field.dimensiones}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              <span>${field.precioPorHora}/hour</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="border w-full "
            onClick={() => onBookNow(field.id)}
          >
            Book Now
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
