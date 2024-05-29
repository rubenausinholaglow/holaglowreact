import { LoginResponse } from '@interface/Login';
import { PaymentBank, PaymentInitResponse } from '@interface/payment';
import { INITIAL_FILTERS } from 'app/(web)/tratamientos/utils/filters';
import { Appointment, User, UserCheckin } from 'app/types/appointment';
import { Post } from 'app/types/blog';
import { AnalyticsMetrics, Client } from 'app/types/client';
import { Clinic } from 'app/types/clinic';
import { ProductFilters } from 'app/types/filters';
import { PackUnitiesScheduled, Product } from 'app/types/product';
import { Promo } from 'app/types/promo';
import { Slot } from 'app/types/slot';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type DeviceSize = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWideScreen: boolean;
};

export enum TypeOfPayment {
  Free,
  Reservation,
  Full,
}

interface SessionStore {
  analyticsMetrics: AnalyticsMetrics;
  client: Client | undefined;
  isMobile: boolean;
  deviceSize: DeviceSize;
  selectedTreatments: Product[];
  selectedPack?: Product;
  previousSelectedTreatments: Product[];
  selectedPacksTreatments?: Product[];
  selectedClinic?: Clinic;
  selectedSlot?: Slot;
  selectedDay: Dayjs | undefined;
  previousAppointment: Appointment | undefined;
  payment: PaymentInitResponse | undefined;
  userLoginResponse: LoginResponse | undefined;
  typeOfPayment: TypeOfPayment;
  appointmentUrl: string;
  dermaPhone: string;
  treatmentPacks: PackUnitiesScheduled[];
}
interface SessionActions {
  setAnalyticsMetrics: (analyticsMetrics: AnalyticsMetrics) => void;
  setClient: (client: Client) => void;
  setIsMobile: (value: boolean) => void;
  setDeviceSize: (value: DeviceSize) => void;
  setSelectedTreatments: (value: Product[]) => void;
  setSelectedPack: (value: Product | undefined) => void;
  setPreviousSelectedTreatments: (value: Product[]) => void;
  setSelectedClinic: (value?: Clinic) => void;
  setSelectedSlot: (slot?: Slot) => void;
  setSelectedDay: (day?: Dayjs) => void;
  setPreviousAppointment: (appointment: Appointment) => void;
  setPayment: (payment: PaymentInitResponse | undefined) => void;
  setUserLoginResponse: (userLoginResponse: LoginResponse | undefined) => void;
  setTypeOfPayment: (typeOfPayment: TypeOfPayment) => void;
  setAppointmentUrl: (url: string) => void;
  setDermaPhone: (phone: string) => void;
  setTreatmentPacks: (treatment: PackUnitiesScheduled[]) => void;
}

interface GlobalPersistStore {
  stateProducts: Product[];
  dermaProducts: Product[];
  dashboardProducts: Product[];
  clinics: Clinic[];
  user?: User;
  promo: Promo | undefined;
  blogPosts: Post[] | undefined;
  remoteControl: boolean;
  ignoreMessages: boolean;
  storedClinicId: string | '';
  storedBoxId: string | '';
  storedAppointmentId: string | '';
  userCheckin?: UserCheckin;
  checkSimulator: boolean;
  storedClinicFlowwwId: string | '';
  storedClinicProfessionalId: string | '';
  storedBudgetId: string | '';
  activePayment: PaymentBank;
  isCallCenter: boolean;
  extraInfo: boolean;
}

interface GlobalPersistActions {
  setStateProducts: (value: Product[]) => void;
  setDermaProducts: (value: Product[]) => void;
  setDashboardProducts: (value: Product[]) => void;
  setClinics: (value: Clinic[]) => void;
  setCurrentUser: (value?: User) => void;
  setPromos: (value: Promo) => void;
  setBlogPosts: (value: Post[]) => void;
  setRemoteControl: (remoteControl: boolean) => void;
  setIgnoreMessages: (ignoreMessages: boolean) => void;
  setClinicId: (storedClinicId: string) => void;
  setBoxId: (setBoxId: string) => void;
  setAppointmentId: (storedAppointmentId: string) => void;
  setUserCheckIn: (value?: UserCheckin) => void;
  setCheckSimulator: (value?: boolean) => void;
  setClinicFlowwwId: (value?: string) => void;
  setClinicProfessionalId: (value?: string) => void;
  setBudgetId: (value?: string) => void;
  setActivePayment: (value?: PaymentBank) => void;
  setIsCallCenter: (value?: boolean) => void;
  setExtraInfo: (value?: boolean) => void;
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
      client: undefined,
      selectedTreatments: [],
      selectedPack: undefined,
      previousSelectedTreatments: [],
      selectedPacksTreatments: [],
      selectedClinic: undefined,
      selectedDay: undefined,
      selectedSlot: undefined,
      previousAppointment: undefined,
      isMobile: true,
      payment: undefined,
      userLoginResponse: undefined,
      typeOfPayment: TypeOfPayment.Free,
      appointmentUrl: '',
      dermaPhone: '',
      treatmentPacks: [],
      setAppointmentUrl: value => {
        set({ appointmentUrl: value });
      },
      setClient: value => {
        set({ client: value });
      },
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
      setSelectedPack: value => {
        set({ selectedPack: value });
      },
      setPreviousSelectedTreatments: value => {
        set({ previousSelectedTreatments: value });
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
      setPayment: value => {
        set({ payment: value });
      },
      setUserLoginResponse: value => {
        set({ userLoginResponse: value });
      },
      setTypeOfPayment: value => {
        set({ typeOfPayment: value });
      },
      setDermaPhone: value => {
        set({ dermaPhone: value });
      },
      setTreatmentPacks: value => {
        set({ treatmentPacks: value });
      },
    }),
    {
      name: 'session-storage',
      version: 27,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useGlobalPersistedStore = create(
  persist<GlobalPersistStore & GlobalPersistActions>(
    set => ({
      promo: undefined,
      blogPosts: undefined,
      stateProducts: [],
      dermaProducts: [],
      dashboardProducts: [],
      clinics: [],
      user: undefined,
      setStateProducts: (value: Product[]) => {
        set({ stateProducts: value });
      },
      setDermaProducts: (value: Product[]) => {
        set({ dermaProducts: value });
      },
      setDashboardProducts: (value: Product[]) => {
        set({ dashboardProducts: value });
      },
      setClinics: (value: Clinic[]) => {
        set({ clinics: value });
      },
      setCurrentUser: value => {
        set({ user: value });
      },
      userCheckin: undefined,
      setUserCheckIn: value => {
        set({ userCheckin: value });
      },
      setPromos: (value: Promo) => {
        set({ promo: value });
      },
      setBlogPosts: (value: Post[]) => {
        set({ blogPosts: value });
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
      checkSimulator: false,
      setCheckSimulator: value => {
        set({ checkSimulator: value });
      },
      storedClinicFlowwwId: '',
      setClinicFlowwwId: value => {
        set({ storedClinicFlowwwId: value });
      },
      storedClinicProfessionalId: '',
      setClinicProfessionalId: value => {
        set({ storedClinicProfessionalId: value });
      },
      storedBudgetId: '',
      setBudgetId: value => {
        set({ storedBudgetId: value });
      },
      activePayment: PaymentBank.None,
      setActivePayment: value => {
        set({ activePayment: value });
      },
      isCallCenter: false,
      setIsCallCenter: value => {
        set({ isCallCenter: value });
      },
      extraInfo: false,
      setExtraInfo: value => {
        set({ extraInfo: value });
      },
    }),
    {
      name: 'global-storage',
      version: 66,
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
