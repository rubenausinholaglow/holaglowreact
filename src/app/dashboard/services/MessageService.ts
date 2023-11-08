import { ProfessionalType } from '@interface/clinic';
import { MessageSent } from '@interface/message';
import {
  ERROR_RESPONSE_MESSAGE,
  ERROR_SEND_MESSAGE,
} from '@utils/textConstants';

class MessageService {
  private async sendRequest(url: string, data: object): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(ERROR_RESPONSE_MESSAGE);
      }

      return await response.json();
    } catch (error) {
      throw new Error(ERROR_SEND_MESSAGE);
    }
  }

  public async sendMessage(
    professionalId: string,
    professionalType: ProfessionalType
  ): Promise<any> {
    const messageSent: MessageSent = {
      professionalId: professionalId,
      professionalType: professionalType,
    };

    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}Message`;

    return this.sendRequest(url, messageSent);
  }

  public async PatientArrived(props: any): Promise<any> {
    const patientArrived: any = {
      clinicId: props.clinicId,
      boxId: props.boxId,
    };

    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}PatientArrived`;

    return this.sendRequest(url, patientArrived);
  }

  public async StartAppointment(props: any): Promise<any> {
    const startAppointment: any = {
      clinicId: props.clinic.id,
      boxId: props.boxId,
      flowwwToken: props.lead.user.flowwwToken,
    };

    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}StartAppointment`;

    return this.sendRequest(url, startAppointment);
  }

  public async CrisalixUser(props: any): Promise<any> {
    const crisalixUser: any = {
      clinicId: props.clinicId,
      boxId: props.boxId,
      id: props.id,
      playerId: props.playerId,
      playerToken: props.playerToken,
    };

    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}CrisalixUser`;
    return this.sendRequest(url, crisalixUser);
  }

  public async PaymentCreated(props: any): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}PaymentCreated`;
    return this.sendRequest(url, props);
  }
}

export const messageService = new MessageService();
