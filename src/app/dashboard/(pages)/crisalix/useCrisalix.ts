import {
  CrisalixActions,
  CrisalixUser,
  CrisalixUserList,
  INITIAL_STATE_CRISALIXUSERLIST,
} from '@interface/crisalix';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCrisalix = create(
  persist<CrisalixUserList & CrisalixActions>(
    (set, get) => ({
      crisalixUser: INITIAL_STATE_CRISALIXUSERLIST.crisalixUser,
      addCrisalixUser: (newUser: CrisalixUser) => {
        set(state => ({
          crisalixUser: [...state.crisalixUser, newUser],
        }));
      },
      removeCrisalixUser: (userRemove: CrisalixUser) => {
        set(state => ({
          crisalixUser: state.crisalixUser.filter(
            user => user.id !== userRemove.id
          ),
        }));
      },
    }),
    {
      name: 'CrisalixUser',
    }
  )
);
