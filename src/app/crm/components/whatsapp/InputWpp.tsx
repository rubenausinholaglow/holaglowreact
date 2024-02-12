"use client";
import React, { useState } from 'react';
import { useSessionStore } from 'app/stores/globalStore';

import {
  SvgEmojiFace,
  SvgMicrophone,
  SvgPlus,
  SvgSendMessage,
} from './WhatsAppIcons';

interface InputWppProps {
  setWhatsappList: (whatsapp: any) => void;
  userId: string;
}

export default function InputWpp({ setWhatsappList, userId }: InputWppProps) {
  const { userLoginResponse } = useSessionStore(state => state);
  const [input, setInput] = useState('');

  async function sendWhatsApp() {
    const token = userLoginResponse?.token;
    const body = JSON.stringify({
      userId: userId,
      text: input,
      taskId: '',
      agentId: "",
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
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  }

  return (
    <div
      className="bg-grey-lighter px-4 py-4 flex items-center"
      style={{ height: '92rem' }}
    >
      <div>
        <SvgEmojiFace />
        <SvgPlus />
      </div>
      <div className="flex-1 mx-4">
        <input
          placeholder="Escribe un mensaje"
          className="w-full border rounded px-2 py-2"
          name="whatsappInput"
          type="text"
          onChange={e => setInput(e.currentTarget.value)}
        />
      </div>
      <div>{input.length > 0 ? <button onClick={sendWhatsApp}><SvgSendMessage /></button>: <SvgMicrophone />}</div>
    </div>
  );
}
