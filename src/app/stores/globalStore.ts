import { Product } from '@interface/product';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DeviceSize = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
};
interface GlobalPersistStore {
  isMobile: boolean;
  deviceSize: DeviceSize;
}

interface GlobalPersistActions {
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
}

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      deviceSize: {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isWideScreen: false,
      },
      isMobile: true,
      setIsMobile: value => {
        set({ isMobile: value });
      },
      setDeviceSize: value => {
        set({ deviceSize: value });
      },
    }),
    {
      name: 'global-storage',
    }
  )
);

interface GlobalStore {
  products: Product[];
  isModalOpen: boolean;
  isMainScrollEnabled: boolean;
}

interface GlobalActions {
  setStateProducts: (value: Product[]) => void;
  setIsModalOpen: (value: boolean) => void;
  setIsMainScrollEnabled: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalStore & GlobalActions>(set => ({
  products: [],
  isModalOpen: false,
  isMainScrollEnabled: true,
  setStateProducts: (value: Product[]) => {
    set({ products: value });
  },
  setIsModalOpen: (value: boolean) => {
    set({ isModalOpen: value });
  },
  setIsMainScrollEnabled: (value: boolean) => {
    set({ isMainScrollEnabled: value });
  },
}));
