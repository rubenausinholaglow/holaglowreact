'use client';

import React, { useEffect, useState } from 'react';
import { Professional, ProfessionalType } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import { ERROR_FETCHING_PROFESSIONALS } from '@utils/textConstants';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
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

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const professionalType = ProfessionalType.All;
        const professionalsData = await clinicService.getProfessionalsByClinic(
          localStorage.getItem('ClinicId') || '',
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
          professional =>
            professional.id === localStorage.getItem('ClinicProfessionalId')
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
    return <SvgSpinner height={20} width={20} fill={HOLAGLOW_COLORS['lime']} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (isEmpty(selectedProfessional)) {
    return <></>;
  }

  return (
    <Flex layout="col-center" className="relative">
      <Flex
        layout="row-left"
        className={`
            transition-all opacity-0 pointer-events-none absolute top-[20px] right-[20px] 
            bg-white text-hg-black p-2 rounded-lg border border-hg-black/20 text-left 
            ${showProfessionalList && 'opacity-1 pointer-events-auto'}`}
      >
        <ul className="w-[125px]">
          {beautyAdvisors.map(professional => (
            <li
              onClick={() => handleProfessionalClick(professional)}
              key={professional.name}
              className="px-2 py-1 cursor-pointer hover:font-semibold text-black"
            >
              {professional.name}
            </li>
          ))}
        </ul>
      </Flex>
      <Flex
        layout="col-center"
        onClick={() =>
          beautyAdvisors.length > 1 && handleToggleProfessionalList()
        }
        className={`aspect-square h-[40px] rounded-full ${color}  text-white justify-center relative ${
          beautyAdvisors.length > 1 && 'cursor-pointer'
        }`}
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          {selectedProfessional
            ? selectedProfessional.name
                .split(' ')
                .map(word => word.charAt(0))
                .join('')
            : professionals[0].name
                .split(' ')
                .map(word => word.charAt(0))
                .join('')}
        </p>
      </Flex>
      <Timer onColorChange={handleTimerColorChange} />
    </Flex>
  );
};
