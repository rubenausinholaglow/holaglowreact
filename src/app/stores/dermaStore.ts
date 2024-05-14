import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  id: string;
  pain: number;
  otherPain: string;
  symptoms: string[];
  gender: number;
  age: number;
  skinType: number;
  skinSensibility: number;
  skinColor: number;
  secondaryConcerns: string[];
  routine: number;
  routineProduct: number;
  routineTime: number;
  sunscreen: number;
  allergy: number;
  allergyInfo: string;
  illness: number;
  illnessInfo: string;
  medication: number;
  medicationInfo: string;
  lactating: number;
  picturesUrls: Array<string>;
  extraInfo: string;
  feedbackStep: number;
}

interface DermaActions {
  setId: (value: string) => void;
  setPain: (value: number) => void;
  setOtherPain: (value: string) => void;
  setSymptoms: (value: string[]) => void;
  setGender: (value: number) => void;
  setAge: (value: number) => void;
  setSkinType: (value: number) => void;
  setSkinSensibility: (value: number) => void;
  setSkinColor: (value: number) => void;
  setSecondaryConcerns: (value: string[]) => void;
  setRoutine: (value: number) => void;
  setRoutineProduct: (value: number) => void;
  setRoutineTime: (value: number) => void;
  setSunscreen: (value: number) => void;
  setAllergy: (value: number) => void;
  setAllergyInfo: (value: string) => void;
  setIllness: (value: number) => void;
  setIllnessInfo: (value: string) => void;
  setMedication: (value: number) => void;
  setMedicationInfo: (value: string) => void;
  setLactating: (value: number) => void;
  setPicturesUrls: (value: Array<string>) => void;
  setExtraInfo: (value: string) => void;
  setFeedbackStep: (value: number) => void;
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
      gender: 0,
      setGender: (value: number) => {
        set({ gender: value });
      },
      age: 0,
      setAge: (value: number) => {
        set({ age: value });
      },
      skinType: 0,
      setSkinType: (value: number) => {
        set({ skinType: value });
      },
      skinSensibility: 0,
      setSkinSensibility: (value: number) => {
        set({ skinSensibility: value });
      },
      skinColor: 0,
      setSkinColor: (value: number) => {
        set({ skinColor: value });
      },
      secondaryConcerns: [],
      setSecondaryConcerns: (value: string[]) => {
        set({ secondaryConcerns: value });
      },
      routine: 0,
      setRoutine: (value: number) => {
        set({ routine: value });
      },
      routineProduct: 0,
      setRoutineProduct: (value: number) => {
        set({ routineProduct: value });
      },
      routineTime: 0,
      setRoutineTime: (value: number) => {
        set({ routineTime: value });
      },
      sunscreen: 0,
      setSunscreen: (value: number) => {
        set({ sunscreen: value });
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
      picturesUrls: [],
      setPicturesUrls: (value: Array<string>) => {
        set({ picturesUrls: value });
      },
      extraInfo: '',
      setExtraInfo: (value: string) => {
        set({ extraInfo: value });
      },
      feedbackStep: 1,
      setFeedbackStep: (value: number) => {
        set({ feedbackStep: value });
      },
    }),
    {
      name: 'derma-storage',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
