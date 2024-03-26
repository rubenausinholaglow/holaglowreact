import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  pain: string | undefined;
  categories: string[];
  skinType: string | undefined;
  gender: string | undefined;
  pictures: [];
}

interface DermaActions {
  setPain: (value: string | undefined) => void;
  setCategories: (value: string[]) => void;
  setSkinType: (value: string | undefined) => void;
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
      categories: [],
      setCategories: (value: string[]) => {
        set({ categories: value });
      },
      skinType: undefined,
      setSkinType: (value: string | undefined) => {
        set({ skinType: value });
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
