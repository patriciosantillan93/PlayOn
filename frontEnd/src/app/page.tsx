// app/page.tsx
"use client";

import React, { useState } from "react";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import FieldCard from "@/components/CanchaCard";
import BookingModal from "@/components/BookingModal";
import { fields } from "@/data/fields";
import { Cancha, CanchaFromDB } from "@/interfaces/cancha";

function App() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<CanchaFromDB | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredFields =
    selectedType === "all"
      ? fields
      : fields.filter((field) => field.type === selectedType);

  const handleBookNow = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      setSelectedField(field);
      setIsBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <main className="container mx-auto px-4 py-8">
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
      </main>
    </div>
  );
}

export default App;
