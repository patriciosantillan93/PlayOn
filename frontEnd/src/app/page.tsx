"use client";

import React, { useEffect, useState } from "react";
import FieldCard from "@/components/CanchaCard";
import BookingModal from "@/components/BookingModal";
import { CanchaFromDB } from "@/interfaces/cancha";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<CanchaFromDB | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [fields, setFields] = useState<CanchaFromDB[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/canchas`)
      .then((res) => res.json())
      .then((data) => {
        setFields(data);
        setLoading(false);
      });
  }, []);

  const filteredFields =
    selectedType === "all"
      ? fields
      : fields.filter((field) => field.tipo === selectedType);

  const handleBookNow = (fieldId: number) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      setSelectedField(field);
      setIsBookingModalOpen(true);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (fields.length === 0) return <p>No fields available</p>;
  return (
    <section className="container bg-background mx-auto px-4 py-8">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Courts</h1>
        <div className="flex items-center gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-[180px] border border-gray-300 rounded p-2 "
          >
            <option value="all">All Sports</option>
            <option value="soccer">Soccer</option>
            <option value="basketball">Basketball</option>
            <option value="tennis">Tennis</option>
            <option value="volleyball">Volleyball</option>
          </select>
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFields.map((field) => (
          <FieldCard key={field.id} field={field} onBookNow={handleBookNow} />
        ))}
      </div>

      <BookingModal
        allowBookings
        field={selectedField}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedField(null);
        }}
      />
    </section>
  );
}
