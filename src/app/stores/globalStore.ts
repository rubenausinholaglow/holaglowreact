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
  products: Product[];
  isMobile: boolean;
  deviceSize: DeviceSize;
}

interface GlobalPersistActions {
  setStateProducts: (value: Product[]) => void;
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
}

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      products: [],
      deviceSize: {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isWideScreen: false,
      },
      isMobile: true,
      setStateProducts: (value: Product[]) => {
        set({ products: value });
      },
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
    set({ isModalOpen: value });
  },
  setIsMainScrollEnabled: (value: boolean) => {
    set({ isMainScrollEnabled: value });
  },
}));
