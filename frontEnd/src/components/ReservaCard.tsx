import { Users, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReservaFromDB } from "@/interfaces/reserva";

export default function BookingCard({
  booking,
  onDelete,
}: {
  booking: ReservaFromDB;
  onDelete: (bookingId: number) => void;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="dark:bg-slate-600">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Fecha: {booking.fecha}
          </CardTitle>
          <CardDescription>Cancha Nº: {booking.canchaId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Nombre jugadores:</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Desde: {booking.horaInicio}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>Hasta: {booking.horaFin}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="dark:border dark:bg-background shadow-lg"
            onClick={() => onDelete(booking.id)}
          >
            Cancelar
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
