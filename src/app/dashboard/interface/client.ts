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
    [key: string]: any;
  }