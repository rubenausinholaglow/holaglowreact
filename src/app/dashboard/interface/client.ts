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
  analyticsMetrics: AnalyticsMetrics;
  interestedTreatment: string;
  treatmentPrice: number;
  [key: string]: any;
}
export interface ClientUpdate {
  id: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  birthday: string;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
export interface AnalyticsMetrics {
  device: number;
  locPhysicalMs: string;
  utmAdgroup: string;
  utmCampaign: string;
  utmContent: string;
  utmMedium: string;
  utmSource: string;
  utmTerm: string;
  treatmentText: string;
}
