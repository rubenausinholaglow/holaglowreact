import { Appointment, User } from '@interface/appointment';
import { AnalyticsMetrics } from '@interface/client';
import { Clinic } from '@interface/clinic';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
import { INITIAL_FILTERS } from 'app/tratamientos/utils/filters';
import dayjs, { Dayjs } from 'dayjs';
import { ProductFilters } from 'types/filters';
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
  selectedTreatments: Product[];
  selectedPacksTreatments?: Product[];
  selectedClinic?: Clinic;
  selectedSlot?: Slot;
  user?: User;
  selectedDay: Dayjs;
  previousAppointment: Appointment | undefined;
  analyticsMetrics: AnalyticsMetrics;
}

interface GlobalPersistActions {
  setStateProducts: (value: Product[]) => void;
  setClinics: (value: Clinic[]) => void;
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
  setSelectedTreatments: (value: Product[]) => void;
  setSelectedPackTreatments: (value: Product[]) => void;
  setSelectedClinic: (value?: Clinic) => void;
  setCurrentUser: (value?: User) => void;
  setSelectedSlot: (slot?: Slot) => void;
  setSelectedDay: (day: Dayjs) => void;
  setPreviousAppointment: (appointment: Appointment) => void;
  setAnalyticsMetrics: (analyticsMetrics: AnalyticsMetrics) => void;
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
      selectedTreatments: [],
      selectedPacksTreatments: [],
      selectedClinic: undefined,
      user: undefined,
      selectedDay: dayjs(),
      selectedSlot: undefined,
      previousAppointment: undefined,
      analyticsMetrics: {
        device: 0,
        locPhysicalMs: '',
        utmAdgroup: '',
        utmCampaign: '',
        utmContent: '',
        utmMedium: '',
        utmSource: '',
        utmTerm: '',
      },
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
      setSelectedPackTreatments: value => {
        set({ selectedPacksTreatments: value });
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
      setPreviousAppointment: value => {
        set({ previousAppointment: value });
      },
      setAnalyticsMetrics: value => {
        set({ analyticsMetrics: value });
      },
    }),
    {
      name: 'global-storage',
      version: 6,
    }
  )
);

interface GlobalStore {
  isModalOpen: boolean;
  showModalBackground: boolean;
  isMainScrollEnabled: boolean;
  filteredProducts: Product[];
  productFilters: ProductFilters;
}

interface GlobalActions {
  setIsModalOpen: (value: boolean) => void;
  setShowModalBackground: (value: boolean) => void;
  setIsMainScrollEnabled: (value: boolean) => void;
  setFilteredProducts: (value: Product[]) => void;
  setProductFilters: (value: ProductFilters) => void;
}

export const useGlobalStore = create<GlobalStore & GlobalActions>(set => ({
  isModalOpen: false,
  showModalBackground: false,
  isMainScrollEnabled: true,
  filteredProducts: [],
  productFilters: INITIAL_FILTERS,
  setIsModalOpen: (value: boolean) => {
    set({ isModalOpen: value });
  },
  setShowModalBackground: (value: boolean) => {
    set({ showModalBackground: value });
  },
  setIsMainScrollEnabled: (value: boolean) => {
    set({ isMainScrollEnabled: value });
  },
  setFilteredProducts: (value: Product[]) => {
    set({ filteredProducts: value });
  },
  setProductFilters: (value: ProductFilters) => {
    set({ productFilters: value });
  },
}));
