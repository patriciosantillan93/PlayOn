import { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from '../components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { timeSlots } from '../data/timeSlots';
import { Field, TimeSlot } from '../types';
import { cn } from '../lib/utils';

interface BookingModalProps {
  field: Field | null;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingModalProps {
  field: Field | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ field, isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  if (!field) return null;

  const fieldTimeSlots = timeSlots[field.id] || [];
  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  const handleBooking = () => {
    if (!selectedTimeSlot) return;
    // TODO: Implement actual booking logic
    console.log('Booking:', {
      fieldId: field.id,
      date: dateStr,
      timeSlot: selectedTimeSlot,
    });
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book {field.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div >
            <h3 className="font-medium mb-3">Select Date</h3>
            <div className="h-[300px]"> 
            <Calendar  />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Available Time Slots</h3>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <div className="grid grid-cols-2 gap-2">
                {fieldTimeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTimeSlot?.id === slot.id ? "default" : "outline"}
                    className={cn(
                      "w-full",
                      !slot.isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!slot.isAvailable}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot.startTime} - {slot.endTime}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-muted-foreground">
            {selectedTimeSlot && (
              <span>
                Total: ${field.hourlyRate}
              </span>
            )}
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={!selectedTimeSlot}
              onClick={handleBooking}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}