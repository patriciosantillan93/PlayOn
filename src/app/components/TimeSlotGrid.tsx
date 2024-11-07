"use client"
// components/TimeSlotGrid.tsx
import React from 'react';

interface TimeSlotGridProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  setSelectedDate: (date: Date | null) => void;
  dates: Date[]; // List of dates passed in as a prop
  timeSlots: string[]; // List of time slots passed in as a prop
  openModal: (time: string) => void; // Function passed from Scheduler component
}

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ 
  selectedDate, 
  selectedTime, 
  setSelectedTime, 
  setSelectedDate, 
  dates, 
  timeSlots, 
  openModal // Destructure openModal here
}) => {
  return (
    <div className="time-slot-grid">
      <div className="grid grid-cols-5 gap-4">
        {dates.map((date, index) => (
          <div key={index} className="date-column">
            <h4 className="text-center font-bold">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h4>
            <div className="flex flex-col">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    setSelectedDate(date);
                    openModal(time); // Call openModal when a time is selected
                  }}
                  className={`time-slot-button ${selectedTime === time && selectedDate?.getTime() === date.getTime() ? 'selected' : ''}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotGrid;
