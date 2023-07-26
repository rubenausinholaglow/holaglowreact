'use client';

import React, { useEffect, useState } from 'react';
import { Professional, ProfessionalType } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import { ERROR_FETCHING_PROFESSIONALS } from '@utils/textConstants';
import { Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { useCartStore } from '../(pages)/budgets/stores/userCartStore';

export const ClinicProfessional = () => {
  const setProfessionalsInStore = useCartStore(state => state.setProfessionals);

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [showProfessionalList, setShowProfessionalList] = useState(false);
  const [GuidClinic] = useState(localStorage.getItem('ClinicId') || '');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const clinicId = GuidClinic;
        const professionalType = ProfessionalType.Medical;

        const professionalsData = await clinicService.getProfessionalsByClinic(
          clinicId,
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

  const handleProfessionalClick = (professional: Professional) => {
    if (selectedProfessional?.name === professional.name) {
      setShowProfessionalList(prevState => !prevState);
    } else {
      setSelectedProfessional(professional);
    }
    setShowProfessionalList(false);
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

  if (isEmpty(professionals[0].name)) {
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
          {professionals.map(professional => (
            <li
              onClick={() => handleProfessionalClick(professional)}
              key={professional.name}
              className="px-2 py-1 cursor-pointer hover:font-semibold"
            >
              {professional.name}
            </li>
          ))}
        </ul>
      </Flex>
      <Flex
        layout="col-center"
        onClick={() =>
          professionals.length > 1 && handleToggleProfessionalList()
        }
        className={`aspect-square h-[40px] rounded-full bg-hg-lime text-hg-darkMalva justify-center relative ${
          professionals.length > 1 && 'cursor-pointer'
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
    </Flex>
  );
};
