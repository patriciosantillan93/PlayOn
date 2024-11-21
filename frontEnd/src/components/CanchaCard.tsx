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
  onBookNow: (fieldId: string) => void;
}

export default function FieldCard({ field, onBookNow }: FieldCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={field.imageUrl ?? ""}
          alt={field.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {field.name}
          <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
            {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
          </span>
        </CardTitle>
        <CardDescription>{field.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Up to {field.maxPlayers} players</span>
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span>{field.dimensions}</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            <span>${field.hourlyRate}/hour</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onBookNow(field.id)}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
