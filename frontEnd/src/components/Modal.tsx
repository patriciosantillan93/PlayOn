"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { usedSharedState } from '@/context/useSharedState';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string | null;
  selectedDate: Date | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedTime, selectedDate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const {userData, setUserData} = usedSharedState()


  useEffect(() => {
    // Assuming there's a way to check if the user is authenticated
    // For example, checking if a token exists in localStorage or a context
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  if (!isOpen) return null;

  const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : "Not selected";

  const handleConfirm = () => {
    setUserData("holita")
    if (!isAuthenticated) {
      // If not authenticated, redirect to login
      router.push("/login") ;  // Change to your login page path
    } else {
      // After login, this page will be accessed; we can redirect to the completion page
      router.push("/complete-reservation");  // Adjust to your confirmation page
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm your Reservation</h2>
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Time:</strong> {selectedTime || "Not selected"}</p>

        <div className="mt-4 flex justify-between">
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm}  // Handle the conditional navigation
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
