import React from 'react';
import { ClientDetails } from 'app/crm/types/Contact';


interface CardContactProps {
  contactInfo: ClientDetails;
}

export default function CardContact({ contactInfo }: CardContactProps) {
  const { firstName, lastName, secondLastName, flowwwToken } = contactInfo;
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
      <div className="bg-gray-200 px-6 py-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {`${firstName} ${lastName} ${secondLastName} (${flowwwToken})`}
        </h3>
      </div>

      <div className="px-6 py-4">
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Recordatorio
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agendar Llamada
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Nueva Cita
          </button>
        </div>

        <div className="flex space-x-2">
          <div className="mt-4">
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comentarios"
              type="text"
              placeholder="Agregar comentarios"
            />
          </div>

          <div className="mt-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
