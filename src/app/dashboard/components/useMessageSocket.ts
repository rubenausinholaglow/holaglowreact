import {
  INITIAL_STATE_MESSAGESOCKETLIST,
  MessageSocket,
  MessageSocketActions,
  MessageSocketList,
} from '@interface/messageSocket';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMessageSocket = create(
  persist<MessageSocketList & MessageSocketActions>(
    (set, get) => ({
      messageSocket: INITIAL_STATE_MESSAGESOCKETLIST.messageSocket,
      addMessageSocket: (newMessageSocket: MessageSocket) => {
        const messageAleradyExists = get().messageSocket.some(
          msg =>
            msg.message?.messageId === newMessageSocket?.message?.messageId &&
            msg.message?.messageId &&
            newMessageSocket?.message?.messageId
        );
        if (!messageAleradyExists) {
          set(state => ({
            messageSocket: [...state.messageSocket, newMessageSocket],
          }));
        }
      },
      removeMessageSocket: (messageSocket: MessageSocket) => {
        set(state => ({
          messageSocket: state.messageSocket.filter(
            msg => msg.messageType !== messageSocket.messageType
          ),
        }));
      },
    }),
    {
      name: 'MessageSocket',
    }
  )
);
