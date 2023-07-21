'use client';

import React, { useEffect, useState } from 'react';
import { Professional, ProfessionalType } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import { ERROR_FETCHING_PROFESSIONALS } from '@utils/textConstants';
import { Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export const ClinicProfessional = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [showProfessionalList, setShowProfessionalList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const clinicId = 'A1C0941E-5DC2-4433-9B03-2E5A9857F2C5';
        const professionalType = ProfessionalType.Medical;
        const professionalsData = await clinicService.getProfessionalsByClinic(
          clinicId,
          professionalType
        );
        if (typeof professionalsData === 'string') {
          setError(professionalsData);
        } else {
          setProfessionals(professionalsData);
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
      setShowProfessionalList(true);
    }
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

  console.log(professionals);

  return (
    <Flex layout="col-center" className="relative">
      {professionals.map(professional => (
        <div
          key={professional.name}
          onClick={() => handleProfessionalClick(professional)}
        >
          {showProfessionalList && (
            <Flex
              layout="row-left"
              className="absolute top-0 right-0 bg-white text-hg-black p-4 rounded-lg shadow-centered"
            >
              <ul>
                <li>Pepito</li>
                <li>Juanito</li>
                <li>Menganito</li>
                <li>Pulgarcito</li>
              </ul>

              {/* <p style={{ margin: 0, fontWeight: 'bold' }}>{professional.name}</p> */}
            </Flex>
          )}
          <Flex
            layout="col-center"
            className="aspect-square h-[40px] rounded-full bg-hg-lime text-hg-darkMalva cursor-pointer justify-center relative"
          >
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              {professional.name.slice(0, 2)}
            </p>
          </Flex>
        </div>
      ))}
      <button onClick={handleToggleProfessionalList}>
        {showProfessionalList}
      </button>
    </Flex>
  );
};
