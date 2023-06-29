export interface Client {
  email: string;
  phone: string;
  name: string;
  surname: string;
  secondSurname: string;
  termsAndConditionsAccepted: boolean;
  receiveCommunications: boolean;
  page: string;
  externalReference: string;
  analyticsMetrics: {
    device: number;
    locPhysicalMs: string;
    utmAdgroup: string;
    utmCampaign: string;
    utmContent: string;
    utmMedium: string;
    utmSource: string;
    utmTerm: string;
  };
  interestedTreatment: string;
  treatmentPrice: number;
}


export interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchBarProps {
  email: string;
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleCheckUser: () => void;
}

export interface RegistrationFormProps {
  formData: Client;
  handleFieldChange: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  handleContinue: () => void;
  error: string;
  show: boolean;
}