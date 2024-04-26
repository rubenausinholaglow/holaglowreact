import { useState } from 'react';
import Bugsnag from '@bugsnag/js';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import {
  CHECK_IN_INCORRECT,
  EMAIL_REQUIRED,
  INVALID_EMAIL_FORMAT,
  INVALID_PHONE_FORMAT,
  PHONE_REQUIRED,
} from '@utils/textConstants';
import { getClinicToSet } from '@utils/utils';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Status } from 'app/types/appointment';

interface FormData {
  email: string;
  phone: string;
}

interface ValidationErrors {
  email?: string;
  phone?: string;
}

interface Props {
  name: string;
  hour: string;
  professional: string;
  professionalId: string;
  userId: string;
  boxId: string;
  clinicId: string;
}

const useFormHook = (onScanSuccess: (props: Props) => void) => {
  const initialFormData: FormData = {
    email: '',
    phone: '',
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean | undefined>(undefined);
  const [showAgenda, setShowAgenda] = useState<boolean | undefined>(undefined);
  const { setCurrentUser, clinics } = useGlobalPersistedStore(state => state);
  const { setSelectedClinic } = useSessionStore(state => state);

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!formData.email) {
      newErrors.email = EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = INVALID_EMAIL_FORMAT;
    }

    if (!formData.phone) {
      newErrors.phone = PHONE_REQUIRED;
    } else if (!/^\d{9}$/.test(formData.phone)) {
      newErrors.phone = INVALID_PHONE_FORMAT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const ValidateUser = async (email: string, phone: string) => {
    try {
      const data = await UserService.checkUser(email);
      if (data && data.phone === phone) {
        return data;
      }
    } catch (error: any) {
      Bugsnag.notify(error);
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCheckIn(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      setCheckIn(CHECK_IN_INCORRECT);
      return;
    }

    const user = await ValidateUser(formData.email, formData.phone);

    if (user) {
      try {
        setCurrentUser(user);
        const { id, flowwwToken, firstName } = user;
        const appointmentInfo =
          await ScheduleService.getClinicScheduleByToken(flowwwToken);
        if (!appointmentInfo) {
          setShowAgenda(true);
          setIsChecked(false);
          setIsLoading(false);
          setFormData(initialFormData);
          return;
        }
        await ScheduleService.updatePatientStatusAppointment(
          appointmentInfo.id,
          id,
          Status.CheckIn
        );
        const props: Props = {
          name: firstName,
          hour: appointmentInfo.startTime,
          professional: appointmentInfo.clinicProfessionalName,
          professionalId: appointmentInfo.clinicProfessionalId,
          userId: id,
          boxId: appointmentInfo.boxId,
          clinicId: appointmentInfo.clinicId,
        };

        setSelectedClinic(getClinicToSet(clinics, appointmentInfo.clinicId));
        onScanSuccess(props);
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    } else {
      setIsChecked(false);
      setCheckIn(CHECK_IN_INCORRECT);
    }

    setIsLoading(false);
    setFormData(initialFormData);
  };

  const handleInputChange = (fieldName: keyof FormData, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return {
    formData,
    errors,
    isLoading,
    checkIn,
    handleInputChange,
    handleSubmit,
    isChecked,
    showAgenda,
  };
};

export default useFormHook;
