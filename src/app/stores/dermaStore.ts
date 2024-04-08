import { ImageListType, ImageType } from 'react-images-uploading';
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
  extraInfo: string;
}
interface DermaPictureStore {
  picture: ImageType | undefined;
}
interface DermaPictureTwoStore {
  pictureTwo: ImageType | undefined;
}
interface DermaPictureThreeStore {
  pictureThree: ImageType | undefined;
}

interface DermaPictureActions {
  setPicture: (value: ImageType | undefined) => void;
}
interface DermaPictureTwoActions {
  setPictureTwo: (value: ImageType | undefined) => void;
}
interface DermaPictureThreeActions {
  setPictureThree: (value: ImageType | undefined) => void;
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
  setExtraInfo: (value: string) => void;
}

export const useDermaImageOneStore = create(
  persist<DermaPictureStore & DermaPictureActions>(
    set => ({
      picture: undefined,
      setPicture: (value: ImageType | undefined) => {
        set({ picture: value });
      },
    }),
    {
      name: 'derma-imageone',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export const useDermaImageTwoStore = create(
  persist<DermaPictureTwoStore & DermaPictureTwoActions>(
    set => ({
      pictureTwo: undefined,
      setPictureTwo: (value: ImageType | undefined) => {
        set({ pictureTwo: value });
      },
    }),
    {
      name: 'derma-imagetwo',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export const useDermaImageThreeStore = create(
  persist<DermaPictureThreeStore & DermaPictureThreeActions>(
    set => ({
      pictureThree: undefined,
      setPictureThree: (value: ImageType | undefined) => {
        set({ pictureThree: value });
      },
    }),
    {
      name: 'derma-imagethree',
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
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
