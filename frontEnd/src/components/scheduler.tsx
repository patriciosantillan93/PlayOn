"use client"; // Add this line at the top of your Scheduler component

import React, { useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter
import FieldDetail from './fieldDetail';
import TimeSlotGrid from './TimeSlotGrid';
import Modal from './Modal';

interface SchedulerProps {
  title: string;
  content: string;
  imageUrl: string;
}

const Scheduler: React.FC<SchedulerProps> = ({ title, content, imageUrl }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // router = useRouter();  // Now we can safely use useRouter here

  const timeSlots = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"];

  // Generate the next 'numDays' from the start date
  const generateDates = (start: Date, numDays: number): Date[] => {
    const datesArray: Date[] = [];
    for (let i = 0; i < numDays; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + i);  // Add i days to start date
      datesArray.push(nextDate);
    }
    return datesArray;
  };

  const dates = generateDates(startDate, 5);

  // Handle navigation for next and previous days
  const handleNextDays = () => {
    setStartDate(new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000)); // Move to the next 5 days
  };

  const handlePreviousDays = () => {
    setStartDate(new Date(startDate.getTime() - 5 * 24 * 60 * 60 * 1000)); // Move to the previous 5 days
  };

  // Open modal with selected time
  const openModal = (time: string) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Section - Field Details */}
      <div className="w-1/3 p-6 bg-gray-50 border-r">
        <FieldDetail title={title} content={content} imageUrl={imageUrl} />
      </div>
      
      {/* Right Section - Time Slot Selector */}
      <div className="w-2/3 p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePreviousDays} className="p-2">
            {/* Left Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6v12z"/>
            </svg>
          </button>
          <button onClick={handleNextDays} className="p-2">
            {/* Right Arrow SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6v12z"/>
            </svg>
          </button>
        </div>
        
        <TimeSlotGrid 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          selectedTime={selectedTime} 
          setSelectedTime={setSelectedTime} 
          dates={dates} 
          timeSlots={timeSlots} 
          openModal={openModal} // Pass openModal function to TimeSlotGrid
        />
      </div>
      
      {/* Modal for Time Slot Selection */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        selectedTime={selectedTime} 
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Scheduler;
