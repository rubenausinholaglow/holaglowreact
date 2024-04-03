import { ImageListType } from 'react-images-uploading';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  pain: number | undefined;
  symptoms: string[];
  skinType: number | undefined;
  skinSensibility: number | undefined;
  allergy: number | undefined;
  allergyInfo: string | undefined;
  illness: number | undefined;
  illnessInfo: string | undefined;
  medication: number | undefined;
  medicationInfo: string | undefined;
  lactating: number | undefined;
  pictures: ImageListType;
  extraInfo: string | undefined;
}

interface DermaActions {
  setPain: (value: number | undefined) => void;
  setSymptoms: (value: string[]) => void;
  setSkinType: (value: number | undefined) => void;
  setSkinSensibility: (value: number | undefined) => void;
  setAllergy: (value: number | undefined) => void;
  setAllergyInfo: (value: string | undefined) => void;
  setIllness: (value: number | undefined) => void;
  setIllnessInfo: (value: string | undefined) => void;
  setMedication: (value: number | undefined) => void;
  setMedicationInfo: (value: string | undefined) => void;
  setLactating: (value: number | undefined) => void;
  setPictures: (value: ImageListType) => void;
  setExtraInfo: (value: string) => void;
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
      skinSensibility: undefined,
      setSkinSensibility: (value: number | undefined) => {
        set({ skinSensibility: value });
      },
      allergy: undefined,
      setAllergy: (value: number | undefined) => {
        set({ allergy: value });
      },
      allergyInfo: undefined,
      setAllergyInfo: (value: string | undefined) => {
        set({ allergyInfo: value });
      },
      illness: undefined,
      setIllness: (value: number | undefined) => {
        set({ illness: value });
      },
      illnessInfo: undefined,
      setIllnessInfo: (value: string | undefined) => {
        set({ illnessInfo: value });
      },
      medication: undefined,
      setMedication: (value: number | undefined) => {
        set({ medication: value });
      },
      medicationInfo: undefined,
      setMedicationInfo: (value: string | undefined) => {
        set({ medicationInfo: value });
      },
      lactating: undefined,
      setLactating: (value: number | undefined) => {
        set({ lactating: value });
      },
      pictures: [],
      setPictures: (value: ImageListType) => {
        set({ pictures: value });
      },
      extraInfo: undefined,
      setExtraInfo: (value: string | undefined) => {
        set({ extraInfo: value });
      },
    }),
    {
      name: 'derma-storage',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
