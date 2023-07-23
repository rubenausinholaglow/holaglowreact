export default class ScheduleService {
  static async getClinicSchedule(flowwwToken: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_SCHEDULE_API}Appointment/v2/Next?token=${flowwwToken}`;
      console.log(url);
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
}
