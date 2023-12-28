import { useEffect } from 'react';
import { User } from '@interface/appointment';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useRouter } from 'next/navigation';

import useRoutes from './useRoutes';

const useRegistration = (
  formData: Client,
  isDashboard: boolean,
  redirect: boolean,
  isEmbed: boolean
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

  console.log(isDashboard, isEmbed);

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
            selectedDay,
            selectedClinic!,
            user,
            selectedPacksTreatments!,
            analyticsMetrics,
            ''
          ).then(x => {
            if (isEmbed) {
              window.parent.postMessage(URL, routes.checkout.clinics);
            } else if (isDashboard) {
              router.push(routes.dashboard.checkIn.treatments);
            } else {
              router.push('/checkout/confirmation');
            }
          });
        }
      } else {
        if (!isDashboard) {
          if (redirect) {
            window.parent.location.href =
              'https://holaglow.com/checkout/clinicas';
          } else router.push('/checkout/clinicas');
        } else router.push(routes.dashboard.checkIn.treatments);
      }
    }
    return user;
  };
  return registerUser;
};

export default useRegistration;
