// components/Scheduler.tsx
"use client";
import React, { useState } from 'react';
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

  const timeSlots = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"];

  // Generate the next 5 dates from the start date
  const generateDates = (start: Date, numDays: number) => {
    const datesArray = [];
    for (let i = 0; i < numDays; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + i);
      datesArray.push(nextDate);
    }
    return datesArray;
  };

  const dates = generateDates(startDate, 5);

  const handleNextDays = () => {
    setStartDate(new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000));
  };

  const handlePreviousDays = () => {
    setStartDate(new Date(startDate.getTime() - 5 * 24 * 60 * 60 * 1000));
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
        />
      </div>
    </div>
  );
};

export default Scheduler;
