import { User } from '@interface/appointment';
import { Clinic } from '@interface/clinic';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DeviceSize = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
};
interface GlobalPersistStore {
  stateProducts: Product[];
  clinics: Clinic[];
  isMobile: boolean;
  deviceSize: DeviceSize;
  selectedTreatments?: Product[];
  selectedClinic?: Clinic;
  selectedSlot?: Slot;
  user?: User;
  selectedDay: Dayjs;
}

interface GlobalPersistActions {
  setStateProducts: (value: Product[]) => void;
  setClinics: (value: Clinic[]) => void;
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
  setSelectedTreatments: (value: Product[]) => void;
  setSelectedClinic: (value: Clinic) => void;
  setCurrentUser: (value: User) => void;
  setSelectedSlot: (slot: Slot) => void;
  setSelectedDay: (day: Dayjs) => void;
}

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      stateProducts: [],
      clinics: [],
      deviceSize: {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isWideScreen: false,
      },
      isMobile: true,
      selectedTreatment: undefined,
      selectedClinic: undefined,
      user: undefined,
      selectedDay: dayjs(),
      selectedSlot: undefined,
      setStateProducts: (value: Product[]) => {
        set({ stateProducts: value });
      },
      setClinics: (value: Clinic[]) => {
        set({ clinics: value });
      },
      setIsMobile: value => {
        set({ isMobile: value });
      },
      setDeviceSize: value => {
        set({ deviceSize: value });
      },
      setSelectedTreatments: value => {
        set({ selectedTreatments: value });
      },
      setSelectedClinic: value => {
        set({ selectedClinic: value });
      },
      setCurrentUser: value => {
        set({ user: value });
      },
      setSelectedSlot: value => {
        set({ selectedSlot: value });
      },
      setSelectedDay: value => {
        set({ selectedDay: value });
      },
    }),
    {
      name: 'global-storage',
    }
  )
);

interface GlobalStore {
  isModalOpen: boolean;
  showModalBackground: boolean;
  isMainScrollEnabled: boolean;
}

interface GlobalActions {
  setIsModalOpen: (value: boolean) => void;
  setShowModalBackground: (value: boolean) => void;
  setIsMainScrollEnabled: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalStore & GlobalActions>(set => ({
  isModalOpen: false,
  showModalBackground: false,
  isMainScrollEnabled: true,
  setIsModalOpen: (value: boolean) => {
    set({ isModalOpen: value });
  },
  setShowModalBackground: (value: boolean) => {
    set({ showModalBackground: value });
  },
  setIsMainScrollEnabled: (value: boolean) => {
    set({ isMainScrollEnabled: value });
  },
}));
