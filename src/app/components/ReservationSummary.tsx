import React from 'react';

const ReservationSummary: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h3>Reservation Details</h3>
      <p><strong>Field:</strong> {data.field}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Time:</strong> {data.time}</p>
      <p><strong>User:</strong> {data.user}</p>
      <p><strong>Status:</strong> {data.status}</p>
    </div>
  );
};

export default ReservationSummary;
