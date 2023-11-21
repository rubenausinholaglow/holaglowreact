'use client';

import 'react-datepicker/dist/react-datepicker.css';
import './datePickerStyle.css';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Appointment } from '@interface/appointment';
import { Slot } from '@interface/slot';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgHour, SvgLocation, SvgSpinner } from 'icons/Icons';
import { SvgCheck, SvgPhone, SvgSadIcon } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { DayAvailability } from './../../dashboard/interface/dayAvailability';
import Agenda from './Agenda';

export default function AgendaCheckout() {
  return <Agenda isDashboard={false}></Agenda>;
}
