import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface DermaStore {
  id: string;
  pain: undefined | number;
  otherPain: string;
  symptoms: string[];
  gender: undefined | number;
  age: undefined | number;
  skinType: number;
  skinSensibility: number;
  skinColor: undefined | number;
  secondaryConcerns: string[];
  routine: number;
  routineProducts: string[];
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
  userId: string;
  diagnosticId: string;
  userIdRecover: string;
}

interface DermaActions {
  setId: (value: string) => void;
  setPain: (value: undefined | number) => void;
  setOtherPain: (value: string) => void;
  setSymptoms: (value: string[]) => void;
  setGender: (value: undefined | number) => void;
  setAge: (value: undefined | number) => void;
  setSkinType: (value: number) => void;
  setSkinSensibility: (value: number) => void;
  setSkinColor: (value: undefined | number) => void;
  setSecondaryConcerns: (value: string[]) => void;
  setRoutine: (value: number) => void;
  setRoutineProducts: (value: string[]) => void;
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
  setUserId: (value: string) => void;
  setDiagnosticId: (value: string) => void;
  setUserIdRecover: (value: string) => void;
}

export const useDermaStore = create(
  persist<DermaStore & DermaActions>(
    set => ({
      id: '',
      setId: (value: string) => {
        set({ id: value });
      },
      pain: undefined,
      setPain: (value: undefined | number) => {
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
      gender: undefined,
      setGender: (value: undefined | number) => {
        set({ gender: value });
      },
      age: undefined,
      setAge: (value: undefined | number) => {
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
      skinColor: undefined,
      setSkinColor: (value: undefined | number) => {
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
      routineProducts: [],
      setRoutineProducts: (value: string[]) => {
        set({ routineProducts: value });
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
      userId: '',
      setUserId: (value: string) => {
        set({ userId: value });
      },
      diagnosticId: '',
      setDiagnosticId: (value: string) => {
        set({ diagnosticId: value });
      },
      userIdRecover: '',
      setUserIdRecover: (value: string) => {
        set({ userIdRecover: value });
      },
    }),
    {
      name: 'derma-storage',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
