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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendWhatsApp();
    }
  };

  async function sendWhatsApp() {
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
    }
  }

  return (
    <div className="bg-grey-lighter px-4 py-4 flex items-center">
      <SvgPlus />
      <div className="flex-1 mx-4">
        <input
          placeholder="Escribe un mensaje"
          className="w-full border rounded px-2 py-2"
          name="whatsappInput"
          type="text"
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <button type="submit" onClick={sendWhatsApp}>
        <SvgSendMessage />
      </button>
    </div>
  );
}
