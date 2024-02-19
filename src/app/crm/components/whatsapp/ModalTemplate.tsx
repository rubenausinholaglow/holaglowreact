import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import useAsyncClient from '@utils/useAsyncClient';
import { useSessionStore } from 'app/stores/globalStore';

interface ModalTemplateProps {
  isOpen: boolean;
  userId: string;
  agentId: string;
  handleModalTemplate: () => void;
}

interface Option {
  params: number;
  label: string;
  value: string;
  link: boolean;
}
export default function ModalTemplate({
  isOpen,
  userId,
  agentId,
  handleModalTemplate,
}: ModalTemplateProps) {
  const { userLoginResponse } = useSessionStore(state => state);
  const [templateSelected, setTemplateSelected] =
    useState<SingleValue<Option>>(null);
  const { postData } = useAsyncClient(
    `${process.env.NEXT_PUBLIC_CONTACTS_API}Tasks/SendWhatsappTemplate`,
    'PUT'
  );
  const options: Option[] = [
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

  const handleCancel = () => {
    handleModalTemplate();
  };

  const handleConfirm = async () => {
    const headers = {
      Authorization: 'Bearer ' + userLoginResponse?.token,
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      userId: userId,
      id: templateSelected?.params,
      params: [templateSelected?.params],
      taskId: '',
      agentId: agentId,
      preview: templateSelected?.label,
    });    
    
    await postData(body, headers);
    handleModalTemplate();
  };

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
              onChange={(event: SingleValue<Option>) =>
                setTemplateSelected(event)
              }
            />

            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCancel}
            >
              Cerrar
            </button>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleConfirm}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
}
