import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalPersistStore {
  isMobile: boolean;
}

interface GlobalPersistActions {
  setIsMobile: (value: boolean) => void;
}

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      isMobile: true,
      setIsMobile: value => {
        set({ isMobile: value });
      },
    }),
    {
      name: 'global-storage',
    }
  )
);

interface GlobalStore {
  isModalOpen: boolean;
  isMainScrollEnabled: boolean;
}

interface GlobalActions {
  setIsModalOpen: (value: boolean) => void;
  setIsMainScrollEnabled: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalStore & GlobalActions>(set => ({
  isModalOpen: false,
  isMainScrollEnabled: true,
  setIsModalOpen: (value: boolean) => {
    set({ isModalOpen: value, isMainScrollEnabled: !value });
  },
  setIsMainScrollEnabled: (value: boolean) => {
    set({ isMainScrollEnabled: value });
  },
}));
