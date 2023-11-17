import { Appointment, User } from '@interface/appointment';
import { AnalyticsMetrics } from '@interface/client';
import { Clinic } from '@interface/clinic';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
import { INITIAL_FILTERS } from 'app/tratamientos/utils/filters';
import dayjs, { Dayjs } from 'dayjs';
import { ProductFilters } from 'types/filters';
import { Promo } from 'types/promo';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type DeviceSize = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
};

interface SessionStore {
  analyticsMetrics: AnalyticsMetrics;
  isMobile: boolean;
  deviceSize: DeviceSize;
  selectedTreatments: Product[];
  selectedPacksTreatments?: Product[];
  selectedClinic?: Clinic;
  selectedSlot?: Slot;
  selectedDay: Dayjs;
  previousAppointment: Appointment | undefined;
}
interface SessionActions {
  setAnalyticsMetrics: (analyticsMetrics: AnalyticsMetrics) => void;
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
  setSelectedTreatments: (value: Product[]) => void;
  setSelectedPackTreatments: (value: Product[]) => void;
  setSelectedClinic: (value?: Clinic) => void;
  setSelectedSlot: (slot?: Slot) => void;
  setSelectedDay: (day: Dayjs) => void;
  setPreviousAppointment: (appointment: Appointment) => void;
}

interface GlobalPersistStore {
  stateProducts: Product[];
  clinics: Clinic[];
  user?: User;
  promo: Promo | undefined;
  remoteControl: boolean;
  ignoreMessages: boolean;
  storedClinicId: string | '';
  storedBoxId: string | '';
  storedAppointmentId: string | '';
}

interface GlobalPersistActions {
  setStateProducts: (value: Product[]) => void;
  setClinics: (value: Clinic[]) => void;
  setCurrentUser: (value?: User) => void;
  setPromos: (value: Promo) => void;
  setRemoteControl: (remoteControl: boolean) => void;
  setIgnoreMessages: (ignoreMessages: boolean) => void;
  setClinicId: (storedClinicId: string) => void;
  setBoxId: (setBoxId: string) => void;
  setAppointmentId: (storedAppointmentId: string) => void;
}

export const useSessionStore = create(
  persist<SessionStore & SessionActions>(
    set => ({
      analyticsMetrics: {
        device: 0,
        locPhysicalMs: '',
        utmAdgroup: '',
        utmCampaign: '',
        utmContent: '',
        utmMedium: '',
        utmSource: '',
        utmTerm: '',
        treatmentText: '',
        externalReference: '',
        interestedTreatment: '',
        treatmentPrice: 0,
      },
      deviceSize: {
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isWideScreen: false,
      },
      selectedTreatments: [],
      selectedPacksTreatments: [],
      selectedClinic: undefined,
      selectedDay: dayjs(),
      selectedSlot: undefined,
      previousAppointment: undefined,
      isMobile: true,
      setAnalyticsMetrics: value => {
        set({ analyticsMetrics: value });
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
      setSelectedSlot: value => {
        set({ selectedSlot: value });
      },
      setSelectedDay: value => {
        set({ selectedDay: value });
      },
      setPreviousAppointment: value => {
        set({ previousAppointment: value });
      },
    }),
    {
      name: 'session-storage',
      version: 2,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      promo: undefined,
      stateProducts: [],
      clinics: [],
      user: undefined,
      setStateProducts: (value: Product[]) => {
        set({ stateProducts: value });
      },
      setClinics: (value: Clinic[]) => {
        set({ clinics: value });
      },
      setCurrentUser: value => {
        set({ user: value });
      },
      setPromos: (value: Promo) => {
        set({ promo: value });
      },
      remoteControl: false,
      setRemoteControl: value => {
        set({ remoteControl: value });
      },
      ignoreMessages: false,
      setIgnoreMessages: value => {
        set({ ignoreMessages: value });
      },
      storedClinicId: '',
      setClinicId: value => {
        set({ storedClinicId: value });
      },
      storedBoxId: '',
      setBoxId: value => {
        set({ storedBoxId: value });
      },
      storedAppointmentId: '',
      setAppointmentId: value => {
        set({ storedAppointmentId: value });
      },
    }),
    {
      name: 'global-storage',
      version: 10,
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
