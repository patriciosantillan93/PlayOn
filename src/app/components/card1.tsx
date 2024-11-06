"use client"
import React from 'react';
import TimeSlotGrid from './TimeSlotGrid';
import DateSelector from './DateSelector';

interface CardFieldsProps {
  title: string;
  content: string;
  imageUrl?: string;
  selectedDate: Date | null;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  setSelectedDate: (date: Date) => void;
}

const CardFields: React.FC<CardFieldsProps> = ({
  title,
  content,
  imageUrl,
  selectedDate,
  selectedTime,
  setSelectedTime,
  setSelectedDate
}) => {
  return (
    <div className="card-container">
      <div className="card-details">
        {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
        <h2 className="card-title">{title}</h2>
        <p className="card-content">{content}</p>
      </div>
      <div className="card-calendar">
        <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <TimeSlotGrid selectedDate={selectedDate} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </div>
    </div>
  );
};

export default CardFields;
