import Bugsnag from '@bugsnag/js';
import { Appointment, Status } from '@interface/appointment';
import { DayAvailability } from '@interface/dayAvailability';
import { Slot } from '@interface/slot';

export default class ScheduleService {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
      return err;
    }
  }
  static async next(token: string): Promise<Appointment[]> {
    try {
      const url =
        `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/Next?token?` +
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
    } catch (err) {
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
    } catch (err) {
      return [];
    }
  }
}
