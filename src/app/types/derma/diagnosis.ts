export interface DiagnosticData {
  user: {
    flowwwToken: string;
    firstName: string;
    lastName: string;
    secondLastName: string;
    blockCommunications: boolean;
    country: string;
    commercialCheck: boolean;
    privacyCheck: boolean;
    phonePrefix: string;
    city: string;
    province: string;
    address: string;
    birthday: string;
    dni: string;
    postalCode: string;
    phone: string;
    email: string;
    id: string;
    creationDate: string;
    active: boolean;
  };
  diagnostic: Diagnostic[];
  id: string;
  creationDate: string;
  active: boolean;
}

export interface Diagnostic {
  professionalComment: string;
  professional: {
    name: string;
    mail: string;
    phoneNumber: string;
    title: string;
    tittleAbbreviation: string;
    description: string;
    urlPhoto: string;
    collegiateNumber: string;
    flowwwId: string;
    professionalType: number;
    doctoraliaId: string;
    authorDescription: string;
    professionalSinceYear: number;
    id: string;
    creationDate: string;
    active: boolean;
  } | null;
  userComment: string;
  front: string;
  left: string;
  right: string;
  receiptUrl: string;
  routine: number;
  id: string;
  creationDate: string;
  active: boolean;
}
