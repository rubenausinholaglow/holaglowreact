'use client';
import React, { useState } from 'react';
import { useSessionStore } from 'app/stores/globalStore';

import { SvgPlus, SvgSendMessage } from './WhatsAppIcons';

interface InputWppProps {
  userId: string;
}

export default function InputWpp({ userId }: InputWppProps) {
  const { userLoginResponse } = useSessionStore(state => state);
  const [input, setInput] = useState('');
  const [disableSendButton, setDisableSendButton] = useState(false);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendWhatsApp();
    }
  };

  async function sendWhatsApp() {
    setDisableSendButton(true);
    const token = userLoginResponse?.token;
    const body = JSON.stringify({
      userId: userId,
      text: input,
      taskId: '',
      agentId: '',
    });

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_CONTACTS_API + 'Tasks/SendWhatsapp',
        {
          cache: 'no-store',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: body,
        }
      );
      if (!res) {
        throw new Error('Network response was not OK');
      }
      setInput('');
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    } finally {
      setDisableSendButton(false);
    }
  }

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <button className="flex space-x-1 items-center px-0.5 py-2 hover:bg-gray-200 rounded-full">
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
    </div>
  );
}
