'use client';
import React, { useState } from 'react';
import Bugsnag from '@bugsnag/js';
import useAsyncClient from '@utils/useAsyncClient';
import { WhatsappMessages } from 'app/crm/types/Contact';
import {
  getFileType,
  isAllowedExtensionImage,
  isAllowedExtensionVideo,
} from 'app/crm/utils/fileUtils';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import EmojiPicker from 'emoji-picker-react';
import Image from 'next/image';

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
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);

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

  const handleSendFile = async (fileBlob: File) => {
    const formData = new FormData();
    formData.append('file', fileBlob);
    formData.append('taskId', '');
    formData.append('userId', userId);
    formData.append('agentId', agentId);
    formData.append('fileName', fileBlob?.name);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONTACTS_API}/Tasks/SendWhatsappFile`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (response.ok) {
        const resultResponse = await response.json();
        const dateTime = dayjs(new Date());
        const newWhatsappMessage: WhatsappMessages = {
          id: '',
          text: '',
          creationDate: dateTime.toString(),
          time: dateTime.toString(),
          urlFile: resultResponse?.data?.urlFile,
        };

        setWhatsappMessages((prevState: WhatsappMessages[]) => [
          ...prevState,
          newWhatsappMessage,
        ]);
      } else {
        const resultResponse = await response.json();
        Bugsnag.notify(`Error al subir la imagen`, resultResponse);
      }
    } catch (error) {
      Bugsnag.notify(`Error al subir la imagen`);
    }
  };

  const validateFile = (file: File) => {
    const typeFile = getFileType(file.type);

    if (typeFile === 'image') {
      return isAllowedExtensionImage(file.name);
    }
    if (typeFile === 'video') {
      return isAllowedExtensionVideo(file.name);
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      handleSendFile(file);
    }
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

  const onEmojiClick = (event: any) => {
    setInput(prevInput => prevInput + event.emoji);
    setOpenEmojiDialog(false);
  };

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <button
        className="flex space-x-1 items-center px-0.5 py-2 hover:bg-gray-200 rounded-full"
        onClick={handleDialog}
      >
        <SvgPlus />
      </button>
      <button className="flex space-x-1 items-center px-0.5 py-2 hover:bg-gray-200 rounded-full">
        <Image
          alt="emojiIcon"
          className="emoji-icon"
          width={25}
          height={25}
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setOpenEmojiDialog(val => !val)}
        />
        {openEmojiDialog && (
          <div className="absolute bottom-0">
            <EmojiPicker onEmojiClick={onEmojiClick} lazyLoadEmojis />
          </div>
        )}
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
