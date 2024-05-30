import Bugsnag from '@bugsnag/js';
import { ClinicReview, Professional, ProfessionalType } from 'app/types/clinic';

export default class clinicService {
  static async getProfessionalsByClinic(
    id: string,
    professionalType: ProfessionalType
  ): Promise<Professional[] | string> {
    // eslint-disable-next-line no-useless-catch
    try {
      let url = `${process.env.NEXT_PUBLIC_CLINICS_API}Clinics/${id}`;
      if (professionalType !== ProfessionalType.All) {
        url += `?professionalType=${professionalType}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data as Professional[];
      } else {
        Bugsnag.notify('Error getProfessionalsByClinic' + res);
        return [];
      }
    } catch (err) {
      Bugsnag.notify('Error getProfessionalsByClinic: ' + err);
      return [];
    }
  }

  static async getClinics() {
    try {
      const url = `${process.env.NEXT_PUBLIC_CLINICS_API}Clinics`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        Bugsnag.notify('Error getClinics' + res);
        return [];
      }
    } catch (err) {
      Bugsnag.notify('Error getting clinics: ' + err);
      return [];
    }
  }
  static async getReviews(): Promise<ClinicReview[]> {
    try {
      const url = `${process.env.NEXT_PUBLIC_CLINICS_API}Clinics/Reviews`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        Bugsnag.notify('Error getClinics' + res);
        return [];
      }
    } catch (err) {
      Bugsnag.notify('Error getting clinics: ' + err);
      return [];
    }
  }
}
