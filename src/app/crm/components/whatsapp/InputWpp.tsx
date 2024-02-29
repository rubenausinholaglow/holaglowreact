'use client';
import React, { useState } from 'react';
import useAsyncClient from '@utils/useAsyncClient';
import { WhatsappMessages } from 'app/crm/types/Contact';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';

import DialogWpp from './DialogWpp';
import ModalTemplate from './ModalTemplate';
import { SvgPlus, SvgSendMessage } from './WhatsAppIcons';

interface InputWppProps {
  userId: string;
  agentId: string;
  setWhatsappMessages: (value: any) => void;
}

export default function InputWpp({
  userId,
  agentId,
  setWhatsappMessages,
}: InputWppProps) {
  const { userLoginResponse } = useSessionStore(state => state);
  const [input, setInput] = useState('');
  const [disableSendButton, setDisableSendButton] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModalTemplate, setOpenModalTemplate] = useState(false);

  const { postData } = useAsyncClient(
    `${process.env.NEXT_PUBLIC_CONTACTS_API}Tasks/SendWhatsapp`,
    'PUT'
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendWhatsApp();
    }
  };

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSendFile = async (fileBlob : File) => {
    const formData = new FormData();
    formData.append('file', fileBlob);
    formData.append('taskId', "");
    formData.append('userId', userId);
    formData.append('agentId', agentId);
    formData.append("fileName", fileBlob?.name)
    

    try {
      const response = await fetch(
        `https://localhost:7103/Tasks/SendWhatsappFile`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const responseResult = await response.json();
      if(responseResult.ok){
        setInput(responseResult?.file);
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleSendFile(file);
  }

  const handleDialogOption = (option: string) => {
    if (option === 'Template') {
      handleModalTemplate();
    }
  };

  const handleModalTemplate = () => {
    setOpenDialog(false);
    setOpenModalTemplate(!openModalTemplate);
  };

  const handleNewMessage = (text: string) => {
    const dateTime = dayjs(new Date());
    const newWhatsappMessage: WhatsappMessages = {
      id: '',
      text: text,
      creationDate: dateTime.toString(),
      time: dateTime.toString(),
    };
    setWhatsappMessages((prevState: WhatsappMessages[]) => [
      ...prevState,
      newWhatsappMessage,
    ]);
  };

  const sendWhatsApp = () => {
    setDisableSendButton(true);
    const token = userLoginResponse?.token;

    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      userId: userId,
      text: input,
      taskId: '',
      agentId: agentId,
    });
    handleNewMessage(input);
    postData(body, headers);
    setInput('');
    setDisableSendButton(false);
  };

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <button
        className="flex space-x-1 items-center px-0.5 py-2 hover:bg-gray-200 rounded-full"
        onClick={handleDialog}
      >
        <SvgPlus />
      </button>
      <div className="flex-1 mx-4">
        <input
          placeholder="Escribe un mensaje"
          className="w-full border rounded px-2 py-2"
          name="whatsappInput"
          type="text"
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
          autoComplete="off"
        />
      </div>

      <button
        className="flex space-x-2 items-center px-2 py-2 hover:bg-gray-200 rounded-full"
        onClick={sendWhatsApp}
        disabled={disableSendButton}
      >
        <SvgSendMessage />
      </button>
      <DialogWpp
        isOpenDialog={openDialog}
        handleDialog={handleDialog}
        handleDialogOption={handleDialogOption}
        handleFileChange={handleFileChange}
      />
      <ModalTemplate
        agentId={agentId}
        userId={userId}
        isOpen={openModalTemplate}
        handleModalTemplate={handleModalTemplate}
        handleNewMessage={handleNewMessage}
      />
    </div>
  );
}
