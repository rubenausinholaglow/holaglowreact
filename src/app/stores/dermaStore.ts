import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  pain: string | undefined;
  symptoms: string[];
  skinType: string | undefined;
  skinSensitivity: string | undefined;
  alergies: string | undefined;
  gender: string | undefined;
  pictures: [];
}

interface DermaActions {
  setPain: (value: string | undefined) => void;
  setSymptoms: (value: string[]) => void;
  setSkinType: (value: string | undefined) => void;
  setSkinSensitivity: (value: string) => void;
  setAlergies: (value: string | undefined) => void;
  setGender: (value: string | undefined) => void;
  setPictures: (value: []) => void;
}

export const useDermaStore = create(
  persist<DermaStore & DermaActions>(
    set => ({
      pain: undefined,
      setPain: (value: string | undefined) => {
        set({ pain: value });
      },
      symptoms: [],
      setSymptoms: (value: string[]) => {
        set({ symptoms: value });
      },
      skinType: undefined,
      setSkinType: (value: string | undefined) => {
        set({ skinType: value });
      },
      skinSensitivity: undefined,
      setSkinSensitivity: (value: string | undefined) => {
        set({ skinSensitivity: value });
      },
      alergies: undefined,
      setAlergies: (value: string | undefined) => {
        set({ alergies: value });
      },
      gender: undefined,
      setGender: (value: string | undefined) => {
        set({ gender: value });
      },
      pictures: [],
      setPictures: (value: []) => {
        set({ pictures: value });
      },
    }),
    {
      name: 'derma-storage',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
