import React from 'react';

const ReservationActions: React.FC<{ reservationId: number }> = ({ reservationId }) => {
  const handleConfirm = () => {
    // Logic to confirm the reservation
    console.log(`Reservation ${reservationId} confirmed!`);
  };

  const handleCancel = () => {
    // Logic to cancel the reservation
    console.log(`Reservation ${reservationId} cancelled!`);
  };

  return (
    <div>
      <button onClick={handleConfirm}>Confirm Reservation</button>
      <button onClick={handleCancel}>Cancel Reservation</button>
    </div>
  );
};

export default ReservationActions;
