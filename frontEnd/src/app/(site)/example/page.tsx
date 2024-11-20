"use client";

import React, { useState } from 'react';
import Scheduler from '../../components/scheduler';

// Define the type for scheduler data
interface SchedulerData {
  title: string;
  content: string;
  imageUrl: string;
}

const ExamplePage = () => {
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Data for the schedulers
  const schedulersData: SchedulerData[] = [
    {
      title: "Cancha 2 Padel",
      content: "Techada - Con Luz - Piso",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      title: "Cancha 1 Padel",
      content: "Techada - Con Luz - Piso",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      title: "Cancha 3 Padel",
      content: "Destechada - Con Luz - Sintetico",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Column - Scheduler List */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <ul className="space-y-4">
          {schedulersData.map((scheduler, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md">
              <Scheduler
                title={scheduler.title}
                content={scheduler.content}
                imageUrl={scheduler.imageUrl}
              />
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right Column - Information Cards */}
      <div className="w-1/3 p-4 bg-gray-200 flex flex-col space-y-4">
        <div className="info-card bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold">Complex Info Card 1</h3>
          <p>Information about the complex, such as amenities or features.</p>
        </div>
        <div className="info-card bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold">Complex Info Card 2</h3>
          <p>Additional information about the complex, such as rules or contact info.</p>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
