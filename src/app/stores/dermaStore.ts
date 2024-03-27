import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  pain: number | undefined;
  symptoms: string[];
  skinType: number | undefined;
  skinSensitivity: number | undefined;
  allergies: number | undefined;
  allergiesInfo: string | undefined;
  illnesses: number | undefined;
  illnessesInfo: string | undefined;
  medicines: number | undefined;
  medicinesInfo: string | undefined;
  lactancy: number | undefined;
  gender: string | undefined;
  pictures: [];
}

interface DermaActions {
  setPain: (value: number | undefined) => void;
  setSymptoms: (value: string[]) => void;
  setSkinType: (value: number | undefined) => void;
  setSkinSensitivity: (value: number | undefined) => void;
  setAllergies: (value: number | undefined) => void;
  setAllergiesInfo: (value: string | undefined) => void;
  setIllnesses: (value: number | undefined) => void;
  setIllnessesInfo: (value: string | undefined) => void;
  setMedicines: (value: number | undefined) => void;
  setMedicinesInfo: (value: string | undefined) => void;
  setLactancy: (value: number | undefined) => void;
  setGender: (value: string | undefined) => void;
  setPictures: (value: []) => void;
}

export const useDermaStore = create(
  persist<DermaStore & DermaActions>(
    set => ({
      pain: undefined,
      setPain: (value: number | undefined) => {
        set({ pain: value });
      },
      symptoms: [],
      setSymptoms: (value: string[]) => {
        set({ symptoms: value });
      },
      skinType: undefined,
      setSkinType: (value: number | undefined) => {
        set({ skinType: value });
      },
      skinSensitivity: undefined,
      setSkinSensitivity: (value: number | undefined) => {
        set({ skinSensitivity: value });
      },
      allergies: undefined,
      setAllergies: (value: number | undefined) => {
        set({ allergies: value });
      },
      allergiesInfo: undefined,
      setAllergiesInfo: (value: string | undefined) => {
        set({ allergiesInfo: value });
      },
      illnesses: undefined,
      setIllnesses: (value: number | undefined) => {
        set({ illnesses: value });
      },
      illnessesInfo: undefined,
      setIllnessesInfo: (value: string | undefined) => {
        set({ illnessesInfo: value });
      },
      medicines: undefined,
      setMedicines: (value: number | undefined) => {
        set({ medicines: value });
      },
      medicinesInfo: undefined,
      setMedicinesInfo: (value: string | undefined) => {
        set({ medicinesInfo: value });
      },
      lactancy: undefined,
      setLactancy: (value: number | undefined) => {
        set({ lactancy: value });
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
