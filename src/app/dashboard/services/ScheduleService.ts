import Bugsnag from '@bugsnag/js';
import {
  Appointment,
  RescheduleAppointmentRequest,
  Status,
  User,
} from '@interface/appointment';
import { AnalyticsMetrics } from '@interface/client';
import { Clinic } from '@interface/clinic';
import { DayAvailability } from '@interface/dayAvailability';
import { Product } from '@interface/product';
import { Slot } from '@interface/slot';
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
        return '';
    }
  }

  static createAppointment = async (
    selectedTreatments: Product[],
    selectedSlot: Slot,
    selectedDay: Dayjs,
    selectedClinic: Clinic,
    user: User,
    selectedPacksTreatments: Product[],
    analyticsMetrics: AnalyticsMetrics
  ) => {
    const appointments: Appointment[] = [];
    let ids = selectedTreatments!.map(x => x.flowwwId).join(',');
    let treatments = selectedTreatments!.map(x => x.title).join(',');
    if (selectedPacksTreatments && selectedPacksTreatments.length) {
      ids = selectedPacksTreatments!
        .slice(0, 2)
        .map(x => x.flowwwId)
        .join(',');
      treatments = selectedPacksTreatments!.map(x => x.title).join(',');
    }
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
    } as Appointment);
    await ScheduleService.scheduleBulk(appointments);
  };

  static async getClinicSchedule(flowwwToken: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/v2/Next?token=${flowwwToken}`;
      const res = await fetch(url);
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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Status`;
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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/PerClinic?clinicId=${clinicId}&boxId=${boxId}`;
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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Finish`;
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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Confirm`;
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
    clinicId: string
  ): Promise<Array<DayAvailability>> {
    try {
      const url =
        `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/MonthAvailability?date=` +
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
        `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Slots?date=` +
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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Bulk`;

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
        `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Next?token=` +
        token;

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
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment`;

      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
    } catch (err: any) {
      Bugsnag.notify('Error cancel', err);
      return [];
    }
  }
  static async reschedule(reschedule: RescheduleAppointmentRequest) {
    try {
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Reschedule`;

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
      Bugsnag.notify('Error cancel', err);
      return [];
    }
  }
}
