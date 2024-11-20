
import React, { useState } from 'react';

const PersonalInformation: React.FC = () => {
    return (
      <div className="w-1/2 p-6 space-y-4">
        <h2 className="text-xl font-semibold">Información personal</h2>
  
        <div className="space-y-2">
          <label className="block text-gray-700">Nombre</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Tu nombre" />
  
          <label className="block text-gray-700">Teléfono</label>
          <div className="flex space-x-2">
            <select className="p-2 border border-gray-300 rounded">
              <option>US +1</option>
              <option>AR +54</option>
              {/* Add other countries here */}
            </select>
            <input type="tel" className="flex-grow p-2 border border-gray-300 rounded" placeholder="123-456-7890" />
          </div>
  
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="email@example.com" />
        </div>
      </div>
    );
  };
  
  export default PersonalInformation