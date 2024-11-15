import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from '../components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Button } from '../components/ui/button';
import { timeSlots } from '../data/timeSlots';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Field, TimeSlot } from '../types';
import { cn } from '../lib/utils';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../hooks/use-auth';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

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

type Step = 'selection' | 'confirmation';

export function BookingModal({ field, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<Step>('selection');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const { toast } = useToast();
  const { user } = useAuth();

  // Populate contact info with user details when available
  useEffect(() => {
    if (user) {
      setContactInfo(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  if (!field) return null;

  const fieldTimeSlots = timeSlots[field.id] || [];
  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  const handleConfirmBooking = () => {
    if (!selectedTimeSlot) return;
    
    // TODO: Implement actual booking logic
    console.log('Booking:', {
      fieldId: field.id,
      date: dateStr,
      timeSlot: selectedTimeSlot,
      contactInfo,
    });

    toast({
      title: "Booking Confirmed!",
      description: "You'll receive a confirmation email shortly.",
    });
    
    onClose();
    setStep('selection');
    setSelectedTimeSlot(null);
    setContactInfo({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      notes: '',
    });
  };

  const handleBack = () => {
    setStep('selection');
  };
  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book {field.name}</DialogTitle>
        </DialogHeader>

        {step === 'selection' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-medium mb-3">Select Date</h3>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
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
                          "w-full transition-transform duration-150",
                          selectedTimeSlot?.id === slot.id && "border-2 border-blue-500 bg-blue-100 transform scale-102",
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
                  onClick={() => setStep('confirmation')}
                >
                  Continue
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-6">
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Field:</span>
                <span className="font-medium">{field.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">
                  {selectedTimeSlot?.startTime} - {selectedTimeSlot?.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${field.hourlyRate}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input
                  id="notes"
                  value={contactInfo.notes}
                  onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                  placeholder="Any special requirements..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}