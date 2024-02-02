import { User } from '@interface/appointment';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useRouter } from 'next/navigation';
import * as utils from '@utils/validators';

import useRoutes from './useRoutes';

export const validFormData = (client: Client, errors: string[]): boolean => {
  const requiredFields = ['email', 'phone', 'name', 'surname'];
  const isEmailValid = utils.validateEmail(client.email);
  const areAllFieldsFilled = requiredFields.every(
    field => client[field] !== ''
  );

  var res =
    areAllFieldsFilled &&
    isEmailValid &&
    client.termsAndConditionsAccepted &&
    errors.length == 0;
  return res;
};

const useRegistration = (
  formData: Client,
  isDashboard: boolean,
  redirect: boolean,
  isEmbed: boolean,
  lastStep = false
) => {
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    analyticsMetrics,
  } = useSessionStore(state => state);

  const router = useRouter();
  const routes = useRoutes();

  const { setCurrentUser } = useGlobalPersistedStore(state => state);

  const registerUser = async (
    formData: Client,
    isDashboard: boolean,
    redirect: boolean,
    createAppointment: boolean
  ): Promise<User | undefined> => {
    const formDatacopy = { ...formData };
    formDatacopy.analyticsMetrics = analyticsMetrics;
    formDatacopy.phone = formData.phone
      .replace(formDatacopy.phonePrefix, '')
      .replaceAll(' ', '');
    formDatacopy.interestedTreatment = analyticsMetrics.treatmentText;
    if (analyticsMetrics.externalReference)
      formDatacopy.externalReference = analyticsMetrics.externalReference;
    const user = await UserService.registerUser(formDatacopy);
    if (user) {
      user.flowwwToken = user.clinicToken;
    }
    if (user) {
      setCurrentUser(user);
      if (selectedSlot && selectedClinic) {
        if (createAppointment) {
          await ScheduleService.createAppointment(
            selectedTreatments,
            selectedSlot!,
            selectedDay!,
            selectedClinic!,
            user,
            selectedPacksTreatments!,
            analyticsMetrics,
            ''
          ).then(x => {
            if (isEmbed) {
              window.parent.postMessage(URL, routes.checkout.clinics);
            }

            if (isDashboard) {
              router.push(routes.dashboard.checkIn.treatments);
            } else {
              router.push('/checkout/confirmation');
            }
          });
        }
      } else {
        if (isEmbed) {
          window.parent.postMessage(URL, routes.checkout.clinics);
        }
        if (lastStep) {
          if (!isDashboard) {
            if (redirect) {
              window.parent.location.href =
                'https://holaglow.com/checkout/clinicas';
            } else router.push('/checkout/clinicas');
          } else router.push(routes.dashboard.checkIn.treatments);
        }
      }
    }
    return user;
  };
  return registerUser;
};

export default useRegistration;
