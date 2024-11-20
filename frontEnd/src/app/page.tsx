// app/page.tsx
"use client"

import React, { useState } from 'react';
import './styles/globals.css';
import { Toaster } from './components/ui/toaster';
// import { Header } from './components/Headerx';
import { FieldCard } from './components/CanchaCard';
import { BookingModal } from './components/BookingModal';
import { fields } from './data/fields';
import { Field } from './types';
import * as Dialog from '@radix-ui/react-dialog';

function App() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredFields = selectedType === 'all' 
    ? fields 
    : fields.filter(field => field.type === selectedType);

  const handleBookNow = (fieldId: string) => {
    const field = fields.find(f => f.id === fieldId);
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
            <FieldCard
              key={field.id}
              field={field}
              onBookNow={handleBookNow}
            />
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

        {/* <Dialog.Root open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="fixed bg-white rounded shadow-lg p-6 max-w-md mx-auto top-1/4 left-1/2 transform -translate-x-1/2">
            {selectedField && (
              <>
                <Dialog.Title className="text-xl font-semibold mb-4">
                  Book {selectedField.name}
                </Dialog.Title>
                <p className="text-muted-foreground mb-4">
                  {selectedField.description}
                </p>
                <p className="text-sm">Type: {selectedField.type}</p>
                <p className="text-sm">Max Players: {selectedField.maxPlayers}</p>
                <p className="text-sm">Dimensions: {selectedField.dimensions}</p>
                <p className="text-sm">Rate: ${selectedField.hourlyRate}/hour</p>
                <div className="mt-6">
                  <button
                    className="bg-primary text-white rounded py-2 px-4 hover:bg-primary-dark transition-colors"
                    onClick={() => setIsBookingModalOpen(false)}
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            )}
            <Dialog.Close asChild>
              <button
                className="absolute top-2 right-2 text-muted-foreground hover:text-primary"
                aria-label="Close"
              >
                &times;
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root> */}
      </main>
    </div>
  );
}

export default App;
