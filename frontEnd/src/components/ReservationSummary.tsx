
import React, { useState } from 'react';

const ReservationSummary: React.FC = () => {
    return (
      <div className="w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold">Hay Equipo FS</h2>
        <img src="/path/to/club-logo.png" alt="Club Logo" className="w-24 h-24 my-4" />
        <div className="text-gray-700 space-y-2">
          <p>Fecha: <strong>02/11/2024</strong></p>
          <p>Turno: <strong>17:00 - 18:00</strong></p>
          <p>Cancha: <strong>Cancha 2 - Futbol 5</strong></p>
          <p>Precio: <strong>$16000</strong></p>
          <p>Seña / Adelanto: <strong>$5000</strong></p>
        </div>
      </div>
    );
  };

  export default ReservationSummary