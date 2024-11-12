import React from 'react';
import ReservationSummary from '../components/ReservationSummary';
import PersonalInformation from '../components/PersonalInformation';
import Modal from './Modal';

const ReservationConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-2xl font-bold mt-8">Ya casi terminamos!</h1>
      <p className="text-gray-600 mb-8">
        Para completar tu reserva en Hay Equipo FS, por favor chequeá tus datos y luego confirmá.
      </p>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 flex space-x-6">
        <ReservationSummary />
        <PersonalInformation />
      </div>

      <p className="text-center text-gray-500 mt-4 text-sm">
        Algunos clubes pueden solicitar una seña para confirmar la reserva. Cada club tiene su propia política de cancelación, por lo que recomendamos hacerlo con 24 horas de anticipación para evitar penalizaciones.
      </p>

      <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Confirmar reserva
      </button>

    </div>
  );
};

export default ReservationConfirmation;