import React from 'react';
import Select from 'react-select';

interface ModalTemplateProps {
  isOpen: boolean;
  handleModalTemplate: () => void;
}
export default function ModalTemplate({
  isOpen,
  handleModalTemplate,
}: ModalTemplateProps) {
  const options = [
    {
      value: 'TEMPLATE 1',
      label: 'HOLA! Encantado de bla bla bla {1} para bla bla bla {2}',
      params: 2,
      link: true,
    },
    {
      value: 'TEMPLATE 2',
      label: 'HOLA! Encantado de bla bla bla {1}',
      params: 1,
      link: false,
    },
  ];

  const handleOnSelect = () => {};

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => {}}
      >
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">
              Selecciona un template
            </h2>
            <Select
              options={options}
              className={`w-full mb-2 bg-white`}
              placeholder="Seleccionar template..."
              blurInputOnSelect={true}
              isSearchable={false}
              isClearable={true}
            />

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleModalTemplate}
            >
              Cerrar
            </button>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleModalTemplate}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
}
