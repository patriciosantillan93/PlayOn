"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CompleteReservation.module.css'; // Import your CSS module
import ReservationSummary from '../components/ReservationSummary'; // Import the component for reservation summary
import ReservationActions from '../components/ReservationActions'; // Import actions (confirm, cancel, etc.)

const CompleteReservation: React.FC = () => {
  const router = useRouter();
  const [reservationData, setReservationData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem("authToken");
    if (!token) {
      // If no token, redirect to the login page
      router.push("/login");
    } else {
      // Use placeholder data for reservation
      setReservationData({
        id: 1,
        field: 'Soccer Field A',
        date: '2024-11-15',
        time: '3:00 PM - 4:00 PM',
        user: 'John Doe',
        status: 'Pending',
      });
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <h2>Complete Your Reservation</h2>
      {error && <p className={styles.error}>{error}</p>}
      {reservationData ? (
        <>
          <ReservationSummary data={reservationData} /> {/* Reservation summary component */}
          <ReservationActions /> {/* Actions (confirm, cancel, etc.) */}
        </>
      ) : (
        <p>Loading reservation details...</p>
      )}
    </div>
  );
};

export default CompleteReservation;
