import { ProductType } from "@interface/product";


type ClinicBoxMapping = {
    [clinicId: string]: {
        [boxId: string]: {
            name: string;
            type: ProductType;
        };
    };
};

const CLINIC_BOXS: ClinicBoxMapping = {
    "4": {
        "6": { name: "MED2", type: ProductType.Medical },
        "5": { name: "HYDR", type: ProductType.Esthetic }, 
        "3": { name: "MED", type: ProductType.Medical },
        "2": { name: "ZG2", type: ProductType.Others }, 
        "1": { name: "ZG", type: ProductType.Others }, 
    },
    "1": {
        "12": { name: "MED2", type: ProductType.Medical },
        "11": { name: "HYDR", type: ProductType.Esthetic }, 
        "6": { name: "MED", type: ProductType.Medical },
        "5": { name: "ZG2", type: ProductType.Others }, 
        "10": { name: "ZG", type: ProductType.Others }, 
    },
    "5": {
        "5": { name: "MED2", type: ProductType.Medical },
        "1": { name: "HYDR", type: ProductType.Esthetic }, 
        "4": { name: "MED", type: ProductType.Medical },
        "3": { name: "ZG2", type: ProductType.Others }, 
        "2": { name: "ZG", type: ProductType.Others }, 
    }
};

export { CLINIC_BOXS };


export interface AppointmentStatus {
    text: string;
    color: string;
    bg: string;
  }

  export const APPOINTMENT_STATUS = {
    0: {
      text: 'Pendiente',
      color: 'white',
      bg: 'hg-secondary700',
    },
    1: {
      text: 'Cancelada',
      color: 'hg-orange',
      bg: 'hg-orange/50',
    },
    2: {
      text: 'No show',
      color: 'white',
      bg: 'hg-error',
    },
    3: {
      text: 'Movida',
      color: 'hg-tertiary',
      bg: 'hg-tertiary500',
    },
    4: {
      text: 'Confirmada',
      color: 'white',
      bg: 'hg-secondary700',
    },
    5: {
      text: 'Finalizada',
      color: 'white',
      bg: 'black',
    },
    6: {
      text: 'En visita',
      color: 'white',
      bg: 'hg-green',
    },
    7: {
      text: 'Esperando',
      color: 'white',
      bg: 'orange-600',
    },
  };