import { create } from 'zustand';

interface DermaStore {
  inquietudes: string | undefined;
  sensaciones: string | undefined;
  descripcionPiel: string | undefined;
  sensibilidad: string | undefined;
  genero: string | undefined;
}

interface DermaActions {
  setInquietudes: (value: string) => void;
  setSensaciones: (value: string) => void;
  setDescripcionPiel: (value: string) => void;
  setSensibilidad: (value: string) => void;
  setGenero: (value: string) => void;
}

export const useDermaStore = create<DermaStore & DermaActions>(set => ({
  inquietudes: undefined,
  sensaciones: undefined,
  descripcionPiel: undefined,
  sensibilidad: undefined,
  genero: undefined,
  setInquietudes: (value: string) => {
    set({ inquietudes: value });
  },
  setSensaciones: (value: string) => {
    set({ sensaciones: value });
  },
  setDescripcionPiel: (value: string) => {
    set({ descripcionPiel: value });
  },
  setSensibilidad: (value: string) => {
    set({ sensibilidad: value });
  },
  setGenero: (value: string) => {
    set({ genero: value });
  },
}));
