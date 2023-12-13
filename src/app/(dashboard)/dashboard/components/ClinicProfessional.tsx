'use client';

import React, { useEffect, useState } from 'react';
import { ERROR_FETCHING_PROFESSIONALS } from '@dashboardUtils/textConstants';
import clinicService from '@services/ClinicService';
import {
  Professional,
  ProfessionalType,
} from 'app/(dashboard)/dashboard/interface/clinic';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { SvgLogout, SvgUserOctagon } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

import { useCartStore } from '../(pages)/budgets/stores/userCartStore';
import Timer from './ui/Timer';

export const ClinicProfessional = () => {
  const setProfessionalsInStore = useCartStore(state => state.setProfessionals);

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [beautyAdvisors, setBeautyAdvisors] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [showProfessionalList, setShowProfessionalList] = useState(false);
  const [color, setColor] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { storedClinicId, storedClinicProfessionalId } =
    useGlobalPersistedStore(state => state);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionalType = ProfessionalType.All;
        const professionalsData = await clinicService.getProfessionalsByClinic(
          storedClinicId,
          professionalType
        );

        if (typeof professionalsData === 'string') {
          setError(professionalsData);
        } else {
          setProfessionals(professionalsData);
          setProfessionalsInStore(professionalsData);
        }
      } catch (error) {
        setError(ERROR_FETCHING_PROFESSIONALS + (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  useEffect(() => {
    if (professionals.length > 0) {
      setBeautyAdvisors(
        professionals.filter(
          professional =>
            professional.professionalType === 2 ||
            professional.professionalType === 3
        )
      );

      setSelectedProfessional(
        professionals.filter(
          professional => professional.id === storedClinicProfessionalId
        )[0]
      );
    }
  }, [professionals]);

  const handleProfessionalClick = (professional: Professional) => {
    if (selectedProfessional?.name === professional.name) {
      setShowProfessionalList(prevState => !prevState);
    } else {
      setSelectedProfessional(professional);
    }
    setShowProfessionalList(false);
  };

  const handleTimerColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleToggleProfessionalList = () => {
    setShowProfessionalList(prevState => !prevState);
  };

  if (loading) {
    return (
      <SvgSpinner height={20} width={20} fill={HOLAGLOW_COLORS['primary']} />
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isEmpty(selectedProfessional)) {
    return <></>;
  }

  return (
    <Flex layout="col-center" className="relative p-4">
      <Flex
        layout="col-left"
        className={`
            transition-all pointer-events-none absolute top-0 right-0 w-[400px] rounded-b-3xl py-8
            bg-white text-hg-black text-left -translate-y-full z-10
            ${showProfessionalList && 'translate-y-0 pointer-events-auto'}`}
      >
        <ul className="w-full flex flex-col my-8">
          {beautyAdvisors.map(professional => (
            <li
              onClick={() => handleProfessionalClick(professional)}
              key={professional.name}
              className=" py-4 cursor-pointer hover:font-semibold border-b border-hg-black300 text-sm"
            >
              <Flex className="px-8 gap-2">
                <SvgUserOctagon />
                {professional.name}
              </Flex>
            </li>
          ))}

          <li className="py-4 cursor-pointer hover:font-semibold text-sm">
            <Flex className="px-8 gap-2">
              <SvgLogout height={20} width={20} className="mr-1" />
              Cerrar sesión
            </Flex>
          </li>
        </ul>
        <Button
          type="tertiary"
          className="ml-8"
          onClick={() => handleToggleProfessionalList()}
        >
          Cerrar
        </Button>
      </Flex>

      <Flex className="gap-2 z-10">
        <Text className="text-sm font-semibold">
          ¡Hola {selectedProfessional.name}!
        </Text>
        <Flex
          layout="col-center"
          onClick={() =>
            beautyAdvisors.length > 1 && handleToggleProfessionalList()
          }
          className={`aspect-square h-[32px] rounded-full ${color} justify-center relative ${
            beautyAdvisors.length > 1 && 'cursor-pointer'
          }`}
        >
          <Text className="text-sm">
            {selectedProfessional
              ? selectedProfessional.name
                  .split(' ')
                  .map(word => word.charAt(0))
                  .join('')
              : professionals[0].name
                  .split(' ')
                  .map(word => word.charAt(0))
                  .join('')}
          </Text>
        </Flex>
        <Timer onColorChange={handleTimerColorChange} />
      </Flex>
    </Flex>
  );
};
