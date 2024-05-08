import Bugsnag from '@bugsnag/js';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { DiagnosticData } from '@interface/derma/diagnosis';
import {
  ERROR_GET_DERMADIAGNOSIS,
  ERROR_GET_DERMAROUTINES,
  ERROR_SET_DIAGNOSTIC_COMMENT,
  ERROR_UPDATE_DERMAQUESTIONS,
  ERROR_UPLOAD_IMAGE,
} from '@utils/textConstants';

export const dermaService = {
  update: async (derma: DermaQuestions) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMACONTACTS_API}Derma`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(derma),
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_UPDATE_DERMAQUESTIONS);
        throw new Error(ERROR_UPDATE_DERMAQUESTIONS);
      }

      return await response.text();
    } catch (error) {
      Bugsnag.notify(error + ERROR_UPDATE_DERMAQUESTIONS);
      throw new Error(ERROR_UPDATE_DERMAQUESTIONS);
    }
  },
  getRoutine: async (phone: string): Promise<DiagnosticData> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMAPATIENTS_API}DermaRoutines?phone=` +
          phone,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_GET_DERMAROUTINES);
        throw new Error(ERROR_GET_DERMAROUTINES);
      }

      return await response.json();
    } catch (error) {
      Bugsnag.notify(error + ERROR_GET_DERMAROUTINES);
      throw new Error(ERROR_GET_DERMAROUTINES);
    }
  },
  getDiagnosis: async (phone: string): Promise<DiagnosticData> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMAPATIENTS_API}dermahistorial?phone=` +
          phone,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_GET_DERMADIAGNOSIS);
        throw new Error(ERROR_GET_DERMADIAGNOSIS);
      }

      return await response.json();
    } catch (error) {
      Bugsnag.notify(error + ERROR_GET_DERMADIAGNOSIS);
      throw new Error(ERROR_GET_DERMADIAGNOSIS);
    }
  },
  uploadImage: async (
    userId: string | undefined,
    file: Blob,
    fileName: string,
    referenceId: string,
    diagnosticId: string
  ): Promise<string> => {
    const formdata = new FormData();
    if (userId) formdata.append('UserId', userId);
    formdata.append('ReferenceId', referenceId);
    formdata.append('files', file);
    formdata.append('FileName', fileName);
    formdata.append('DiagnosticId', diagnosticId);

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_DERMAPATIENTS_API}Image`,
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        return result;
      })
      .catch(error => {
        Bugsnag.notify(error + ERROR_UPLOAD_IMAGE);
        throw new Error(ERROR_UPLOAD_IMAGE);
      });
  },

  addDiagnosticComment: async (diagnosticId: string, comment: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMAPATIENTS_API}dermahistorial`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            diagnosticid: diagnosticId,
            comment: comment,
          }),
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_SET_DIAGNOSTIC_COMMENT);
        throw new Error(ERROR_SET_DIAGNOSTIC_COMMENT);
      }

      return await response.text();
    } catch (error) {
      Bugsnag.notify(error + ERROR_SET_DIAGNOSTIC_COMMENT);
      throw new Error(ERROR_SET_DIAGNOSTIC_COMMENT);
    }
  },
};
