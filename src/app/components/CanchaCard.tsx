import { Field } from '../types';
import { Users, Ruler, CircleDollarSign } from 'lucide-react';

interface FieldCardProps {
  field: Field;
  onBookNow: (fieldId: string) => void;
}

export function FieldCard({ field, onBookNow }: FieldCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={field.imageUrl}
          alt={field.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">{field.name}</h2>
          <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
            {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
          </span>
        </div>
        <p className="text-muted-foreground mb-4">{field.description}</p>
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
      </div>
      <div className="p-4">
        <button
          className="w-full bg-primary text-white rounded py-2 hover:bg-primary-dark transition-colors"
          onClick={() => onBookNow(field.id)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
