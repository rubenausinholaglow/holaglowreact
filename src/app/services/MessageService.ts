import {
  ERROR_RESPONSE_MESSAGE,
  ERROR_SEND_MESSAGE,
} from '@utils/textConstants';
import { ProfessionalType } from 'app/types/clinic';
import {
  CrisalixUserData,
  GoToPageData,
  PatientArrivedData,
  PaymentCreatedData,
  StartAppointmentData,
} from 'app/types/FrontEndMessages';
import { MessageSent } from 'app/types/message';

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

  public async patientArrived(
    patientArrived: PatientArrivedData
  ): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}PatientArrived`;
    return this.sendRequest(url, patientArrived);
  }

  public async crisalixUser(crisalixUserData: CrisalixUserData): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}CrisalixUser`;
    return this.sendRequest(url, crisalixUserData);
  }

  public async paymentCreated(
    PaymentCreatedData: PaymentCreatedData
  ): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}PaymentCreated`;
    return this.sendRequest(url, PaymentCreatedData);
  }

  public async goToPage(goToPageData: GoToPageData): Promise<any> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}GoToPage`;
    return this.sendRequest(url, goToPageData);
  }

  public async startAppointment(
    startAppontmentData: StartAppointmentData
  ): Promise<boolean> {
    const url = `${process.env.NEXT_PUBLIC_CLINICS_API}StartAppointment`;
    return this.sendRequest(url, startAppontmentData);
  }
}

export const messageService = new MessageService();
