import { User } from '@interface/appointment';
import { Client } from '@interface/client';
import { Product } from '@interface/product';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as utils from '@utils/validators';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useRouter } from 'next/navigation';

import useRoutes from './useRoutes';

export const validFormData = (client: Client, errors: string[]): boolean => {
  const requiredFields = ['email', 'phone', 'name', 'surname'];
  const isEmailValid = utils.validateEmail(client.email);
  const areAllFieldsFilled = requiredFields.every(
    field => client[field] !== ''
  );

  const res =
    areAllFieldsFilled &&
    isEmailValid &&
    client.termsAndConditionsAccepted &&
    errors.length == 0;
  return res;
};

export const getTreatmentId = (
  selectedTreatments: Product[],
  selectedPacksTreatments: Product[]
) => {
  let ids = '';
  if (
    selectedPacksTreatments &&
    selectedPacksTreatments.length > 0 &&
    selectedTreatments[0].id !=
      process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID?.toLowerCase()
  ) {
    ids = selectedPacksTreatments!
      .slice(0, 2)
      .map(x => x.flowwwId)
      .join(',');
  } else if (selectedTreatments && selectedTreatments.length > 0) {
    ids = selectedTreatments!.map(x => x.flowwwId).join(',');
  } else ids = '902';
  return ids;
};

export const useRegistration = (
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
    selectedPack,
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
            '',
            selectedPack
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
