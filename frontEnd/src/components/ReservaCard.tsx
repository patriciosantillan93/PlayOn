import { Clock } from "lucide-react";
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
import { formatTime, getWeekDay } from "@/lib/utils";

export default function BookingCard({
  booking,
  onDelete,
}: {
  booking: ReservaFromDB;
  onDelete: (bookingId: number) => void;
}) {
  const { id, canchaId, fecha, horaInicio, horaFin } = booking;
  const weekDay = getWeekDay(booking.fecha);
  const formattedDate = booking.fecha.split("-").reverse().join("-");
  return (
    <Card className="overflow-hidden tracking-wider">
      <div className="dark:bg-slate-600">
        <CardHeader>
          <CardTitle className="flex justify-between items-center tracking-wide">
            {weekDay}, {formattedDate}
          </CardTitle>
          <CardDescription>Cancha Nº: {canchaId}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatTime(horaInicio)} - {formatTime(horaFin)}
              </span>
            </div>
          </div>
        </CardContent>
        {new Date(fecha) > new Date() && (
          <CardFooter>
            <Button
              className="dark:border dark:bg-background shadow-lg"
              onClick={() => onDelete(id)}
            >
              Cancelar
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  );
}
