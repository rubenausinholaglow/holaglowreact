import Bugsnag from '@bugsnag/js';
import { getTreatmentId } from '@utils/userUtils';
import {
  Appointment,
  RescheduleAppointmentRequest,
  Status,
  User,
} from 'app/types/appointment';
import { AnalyticsMetrics } from 'app/types/client';
import { Clinic } from 'app/types/clinic';
import { DayAvailability, MonthAvailabilityResponse } from 'app/types/dayAvailability';
import { Product } from 'app/types/product';
import { Slot } from 'app/types/slot';
import dayjs, { Dayjs } from 'dayjs';

export default class ScheduleService {
  static getExternalReference(analyticsMetrics: AnalyticsMetrics): string {
    switch (analyticsMetrics.utmSource) {
      case 'google':
      case 'cpc':
        return '16';
      case 'instagram':
      case 'ig':
        return '17';
      case 'facebook':
      case 'fb':
      case 'an':
      case 'msg':
        return '18';
      case 'tiktok':
        return '20';
      default:
        if (analyticsMetrics.externalReference)
          return analyticsMetrics.externalReference;
        return '';
    }
  }

  static getScheduleUrl(): string {
    let url = process.env.NEXT_PUBLIC_SCHEDULE_API;
    if (
      window &&
      window.location &&
      window.location.href &&
      window.location.href.includes('derma')
    )
      url = process.env.NEXT_PUBLIC_DERMASCHEDULE_API;
    return url!;
  }
  static createAppointment = async (
    selectedTreatments: Product[],
    selectedSlot: Slot,
    selectedDay: Dayjs,
    selectedClinic: Clinic,
    user: User,
    selectedPacksTreatments: Product[],
    analyticsMetrics: AnalyticsMetrics,
    paymentId: string
  ) => {
    const appointments: Appointment[] = [];
    let treatments = selectedTreatments!.map(x => x.title).join(',');
    if (
      selectedPacksTreatments &&
      selectedPacksTreatments.length &&
      treatments.indexOf('Probador') < 0
    ) {
      treatments = selectedPacksTreatments!.map(x => x.title).join(',');
    }
    const ids = getTreatmentId(selectedTreatments, selectedPacksTreatments!);
    const format = 'YYYY-MM-DD';
    const comment = 'Tratamiento visto en web: ' + treatments;

    appointments.push({
      box: selectedSlot!.box,
      endTime:
        dayjs(selectedDay)!.format(format) +
        ' ' +
        selectedSlot!.endTime +
        ':00',
      id: '0',
      startTime:
        dayjs(selectedDay)!.format(format) +
        ' ' +
        selectedSlot!.startTime +
        ':00',
      treatment: ids,
      clientId: user?.flowwwToken,
      comment: comment,
      treatmentText: treatments,
      referralId: '',
      externalReference: ScheduleService.getExternalReference(analyticsMetrics),
      isPast: false,
      clinicId: selectedClinic?.flowwwId,
      isCancelled: false,
      paymentId: paymentId,
    } as Appointment);
    return await ScheduleService.scheduleBulk(appointments);
  };

  static async getClinicScheduleByToken(
    flowwwToken: string
  ): Promise<any | undefined> {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/v2/Next?token=${flowwwToken}`;
      const res = await fetch(url);
      if (res.status === 204) {
        return undefined;
      }

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error getAppointmentsPerClinic', err);
      return err;
    }
  }

  static async getClinicSchedule(appointmentId: string) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/${appointmentId}/Start`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error getClinicSchedule', err);
      return err;
    }
  }

  static async updatePatientStatusAppointment(
    appointmentId: string,
    id: string,
    status: Status
  ) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/Status`;
      const requestBody = {
        appointmentId: appointmentId,
        userId: id,
        status: status,
      };

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error updatePatientStatusAppointment', err);
      return '';
    }
  }
  static async getAppointmentsPerClinic(clinicId: string, boxId: string) {
    try {
      let url = `${ScheduleService.getScheduleUrl()}Appointment/PerClinic?clinicId=${clinicId}`;
      if (boxId) {
        url = `${url}&boxId=${boxId}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error getAppointmentsPerClinic', err);
      return err;
    }
  }

  static async finish(appointmentId: string, comments: string, userId: string) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/Finish`;
      const requestBody = {
        appointmentId: appointmentId,
        userId: userId,
        comments: comments,
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        return res.ok;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error finishing appointment', err);
      return '';
    }
  }
  static async confirm(appointmentId: string) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/Confirm`;
      const requestBody = {
        appointmentId: appointmentId,
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        return await res.json();
      } else {
        return null;
      }
    } catch (err: any) {
      Bugsnag.notify('Error confirming appointment', err);
      return null;
    }
  }

  static async getMonthAvailability(
    date: string,
    treatment: string,
    clinicId: string,
    isDerma : boolean,
  ): Promise<MonthAvailabilityResponse | Array<DayAvailability>> {
    try {
      const url =
        `${ScheduleService.getScheduleUrl()}Appointment/MonthAvailability?date=` +
        date +
        `&treatment=` +
        treatment +
        `&clinicId=` +
        clinicId;
      const res = await fetch(url);
      if (res.ok) {
          const data = await res.json();
          return isDerma ? data : (data as MonthAvailabilityResponse);
      } else {
          return isDerma ? [] : ({} as MonthAvailabilityResponse);
      }
    } catch (err: any) {
      Bugsnag.notify('Error getting monthavailability', err);
      return isDerma ? [] : ({} as MonthAvailabilityResponse);
    }
  }

  static async getMonthAvailabilityv2(
    date: string,
    treatment: string,
    clinicId: string
  ): Promise<Array<DayAvailability>> {
    try {
      const url =
        `${ScheduleService.getScheduleUrl()}Appointment/MonthAvailabilityv2?date=` +
        date +
        `&treatment=` +
        treatment +
        `&clinicId=` +
        clinicId;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error getting monthavailability', err);
      return [];
    }
  }

  static async getSlots(
    date: string,
    treatment: string,
    clinicId: string
  ): Promise<Array<Slot>> {
    try {
      const url =
        `${ScheduleService.getScheduleUrl()}Appointment/Slots?date=` +
        date +
        `&treatment=` +
        treatment +
        `&clinicId=` +
        clinicId;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error getting slots', err);
      return [];
    }
  }

  static async getSlotsv2(
    date: string,
    treatment: string,
    clinicId: string
  ): Promise<Array<Slot>> {
    try {
      const url =
        `${ScheduleService.getScheduleUrl()}Appointment/Slotsv2?date=` +
        date +
        `&treatment=` +
        treatment +
        `&clinicId=` +
        clinicId;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error getting slots', err);
      return [];
    }
  }

  static async scheduleBulk(appointments: Appointment[]) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/Bulk`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointments),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (err: any) {
      Bugsnag.notify('Error scheduleBulk', err);
      return err;
    }
  }
  static async next(token: string): Promise<Appointment[]> {
    try {
      const url =
        `${ScheduleService.getScheduleUrl()}Appointment/Next?token=` + token;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error next', err);
      return [];
    }
  }
  static async cancel(appointment: Appointment) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment`;

      await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      return [];
    } catch (err: any) {
      Bugsnag.notify('Error cancel', err);
      return [];
    }
  }
  static async reschedule(reschedule: RescheduleAppointmentRequest) {
    try {
      const url = `${ScheduleService.getScheduleUrl()}Appointment/Reschedule`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reschedule),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error reschedule', err);
      return [];
    }
  }
}
