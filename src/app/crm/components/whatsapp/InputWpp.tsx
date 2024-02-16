'use client';
import React, { useState } from 'react';
import useAsyncClient from '@utils/useAsyncClient';
import { useSessionStore } from 'app/stores/globalStore';

import DialogWpp from './DialogWpp';
import ModalTemplate from './ModalTemplate';
import { SvgPlus, SvgSendMessage } from './WhatsAppIcons';

interface InputWppProps {
  userId: string;
}

export default function InputWpp({ userId }: InputWppProps) {
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

  const handleDialogOption = (option: string) => {
    if (option === 'Template') {
      handleModalTemplate();
    }
  };

  const handleModalTemplate = () => {
    setOpenDialog(false);
    setOpenModalTemplate(!openModalTemplate);
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
      agentId: '',
    });
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
      />
      <ModalTemplate isOpen={openModalTemplate} handleModalTemplate={handleModalTemplate} />
    </div>
  );
}
