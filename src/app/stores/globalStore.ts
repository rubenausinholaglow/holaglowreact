import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  isMobile: boolean;
}

interface Actions {
  setIsMobile: (value: boolean) => void;
}

const useGlobalStore = create(
  persist<Store & Actions>(
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

export default useGlobalStore;
