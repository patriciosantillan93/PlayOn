"use client";

import { CanchaFromDB } from "@/interfaces/cancha";
import { useState } from "react";
import BookingModal from "./BookingModal";
import FieldCard from "./CanchaCard";

export default function FieldsComponent(fields: CanchaFromDB[]) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<CanchaFromDB | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredFields =
    selectedType === "all"
      ? fields
      : fields.filter((field) => field.tipo === selectedType);

  const handleBookNow = (fieldId: number) => {
    console.log("Booking field with ID:", fieldId);
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      setSelectedField(field);
      setIsBookingModalOpen(true);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Available Fields</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-[180px] border border-gray-300 rounded p-2 bg-white"
          >
            <option value="all">All Sports</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="tennis">Tennis</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFields.map((field) => (
          <FieldCard key={field.id} field={field} onBookNow={handleBookNow} />
        ))}
      </div>

      <BookingModal
        field={selectedField}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedField(null);
        }}
      />
    </>
  );
}
