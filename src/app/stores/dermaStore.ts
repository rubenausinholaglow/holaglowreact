import { ImageListType } from 'react-images-uploading';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  id: string;
  pain: number;
  otherPain: string;
  symptoms: string[];
  skinType: number;
  skinSensibility: number;
  allergy: number;
  allergyInfo: string;
  illness: number;
  illnessInfo: string;
  medication: number;
  medicationInfo: string;
  lactating: number;
  pictures: ImageListType;
  extraInfo: string;
}

interface DermaActions {
  setId: (value: string) => void;
  setPain: (value: number) => void;
  setOtherPain: (value: string) => void;
  setSymptoms: (value: string[]) => void;
  setSkinType: (value: number) => void;
  setSkinSensibility: (value: number) => void;
  setAllergy: (value: number) => void;
  setAllergyInfo: (value: string) => void;
  setIllness: (value: number) => void;
  setIllnessInfo: (value: string) => void;
  setMedication: (value: number) => void;
  setMedicationInfo: (value: string) => void;
  setLactating: (value: number) => void;
  setPictures: (value: ImageListType) => void;
  setExtraInfo: (value: string) => void;
}

export const useDermaStore = create(
  persist<DermaStore & DermaActions>(
    set => ({
      id: '',
      setId: (value: string) => {
        set({ id: value });
      },
      pain: 6, // values from 0 to 5 are real values,
      setPain: (value: number) => {
        set({ pain: value });
      },
      otherPain: '',
      setOtherPain: (value: string) => {
        set({ otherPain: value });
      },
      symptoms: [],
      setSymptoms: (value: string[]) => {
        set({ symptoms: value });
      },
      skinType: 0,
      setSkinType: (value: number) => {
        set({ skinType: value });
      },
      skinSensibility: 0,
      setSkinSensibility: (value: number) => {
        set({ skinSensibility: value });
      },
      allergy: 0,
      setAllergy: (value: number) => {
        set({ allergy: value });
      },
      allergyInfo: '',
      setAllergyInfo: (value: string) => {
        set({ allergyInfo: value });
      },
      illness: 0,
      setIllness: (value: number) => {
        set({ illness: value });
      },
      illnessInfo: '',
      setIllnessInfo: (value: string) => {
        set({ illnessInfo: value });
      },
      medication: 0,
      setMedication: (value: number) => {
        set({ medication: value });
      },
      medicationInfo: '',
      setMedicationInfo: (value: string | undefined) => {
        set({ medicationInfo: value });
      },
      lactating: 0,
      setLactating: (value: number | undefined) => {
        set({ lactating: value });
      },
      pictures: [],
      setPictures: (value: ImageListType) => {
        set({ pictures: value });
      },
      extraInfo: '',
      setExtraInfo: (value: string) => {
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
