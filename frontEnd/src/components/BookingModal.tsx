import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";
import { Button } from "../components/ui/button";
import { timeSlots } from "@/data/timeSlots";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { TimeSlot } from "@/interfaces/reserva";
import { CanchaFromDB } from "@/interfaces/cancha";
import { useToast } from "@/hooks/useToast";
import { DayPicker } from "react-day-picker";
import { useSendEmail } from "@/hooks/useSendEmail";
import "react-day-picker/style.css";
import { useSession } from "next-auth/react";
import { Spinner } from "@radix-ui/themes";
import { CreateBooking } from "@/actions/bookings";

export default function BookingModal({
  field,
  isOpen,
  onClose,
}: {
  field: CanchaFromDB | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"selection" | "confirmation">("selection");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();

  // Initialize the email sending hook outside of the function
  const { sendEmail, isLoading, error } = useSendEmail();

  // Populate contact info with user details when available
  useEffect(() => {
    if (session?.user) {
      setContactInfo((prev) => ({
        ...prev,
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
      }));
    }
  }, [session]);

  if (!field) return null;

  const fieldTimeSlots = timeSlots[field.id] || [];
  // const { sendEmail } = useSendEmail();

  async function handleConfirmBooking() {
    if (!session || !session.user?.id) {
      toast({
        title: "Booking Error",
        description: "Please login to confirm booking.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTimeSlot) {
      toast({
        title: "Booking Error",
        description: "Please select a time slot.",
        variant: "destructive",
      });
      return;
    }

    const newBooking = {
      userId: Number(session.user.id),
      canchaId: Number(field?.id),
      fecha: format(selectedDate, "yyyy-MM-dd"),
      horaInicio: selectedTimeSlot.startTime,
      horaFin: selectedTimeSlot.endTime,
    };
    try {
      console.log(newBooking + " NEW BOOKING");
      // await sendEmail({
      //   email: contactInfo.email,
      //   field: field?.name,
      //   selectedDate,
      //   selectedTimeSlot: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`,
      // });
      const insertedBooking = await CreateBooking(newBooking);
      if (!insertedBooking) {
        throw new Error("Failed to create booking");
      }
      toast({
        title: "Booking Confirmed!",
        description: "Check your email for booking details.",
      });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Booking Error: " + error.message);
        toast({
          title: "Booking Error",
          description:
            error.message || "There was an issue confirming your booking.",
          variant: "destructive",
        });
      }
    }
  }

  const handleBack = () => {
    setMessage("");
    setStep("selection");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-h-screen overflow-scroll ">
        <DialogHeader>
          <DialogTitle>Book {field.nombre}</DialogTitle>
        </DialogHeader>

        {step === "selection" ? (
          <>
            <div className=" flex flex-col sm:flex-row justify-center items-start gap-6 mt-4 p-2  rounded-lg ">
              <div className="h-full w-full ">
                <h3 className="font-medium mb-3">Select Date</h3>
                <DayPicker
                  disabled={{ before: new Date() }}
                  required
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-fit rounded-md border p-4 shadow-lg "
                />
              </div>
              <div className="h-full w-full ">
                <h3 className="font-medium mb-3">Available Time Slots</h3>
                <ScrollArea className="rounded-md border p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-2 p-1">
                    {fieldTimeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={
                          selectedTimeSlot?.id === slot.id
                            ? "default"
                            : "outline"
                        }
                        className={`
                          "border-2 transition-transform duration-150",
                          ${
                            selectedTimeSlot?.id === slot.id &&
                            "border-2 border-[#0000ff]  font-bold"
                          }
                          ${
                            !slot.isAvailable && "opacity-50 cursor-not-allowed"
                          }
                        `}
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
              <div className="font-semibold">
                {selectedTimeSlot && <span>Total: ${field.precioPorHora}</span>}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    handleBack();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!selectedTimeSlot}
                  onClick={() => setStep("confirmation")}
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
                <span className="font-medium">{field.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {format(selectedDate, "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">
                  {selectedTimeSlot?.startTime} - {selectedTimeSlot?.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">${field.precioPorHora}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value })
                    }
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
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input
                  id="notes"
                  value={contactInfo.notes}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, notes: e.target.value })
                  }
                  placeholder="Any special requirements..."
                />
              </div>
            </div>

            <div className="message">
              <p>{message}</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={
                  !contactInfo.name || !contactInfo.email || !contactInfo.phone
                }
              >
                {isLoading ? <Spinner /> : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
