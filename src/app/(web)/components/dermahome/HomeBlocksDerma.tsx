'use client';

import { useEffect, useState } from 'react';
import { SvgArrow, SvgGoogle, SvgStar } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import ProfessionalsDerma from '../common/ProfessionalsDerma';
import StoriesDerma from '../common/StoriesDerma';
import FaqsDerma from './FaqsDerma';
import HeroDerma from './HeroDerma';
import HowItWorksDerma from './HowItWorksDerma';
import TestimonialsDerma from './TestimonialsDerma';
import TreatmentsDerma from './TreatmentsDerma';
import WhatsIncludedDerma from './WhatsIncludedDerma';

export default function HomeBlocksDerma() {
  const [floatingBarThreshold, setFloatingBarThreshold] = useState(0);

  useEffect(() => {
    const professionals = document.getElementById('professionals');

    if (professionals && floatingBarThreshold === 0) {
      const rect = professionals.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop + 125;

      setFloatingBarThreshold(elementTop);
    }
  }, []);

  return (
    <>
      <TreatmentsDerma />

      <div className="bg-derma-primary100">
        <HowItWorksDerma />
        <WhatsIncludedDerma />
      </div>

      <div className="bg-derma-secondary100 pt-12">
        <ProfessionalsDerma />
        <StoriesDerma />
        <TestimonialsDerma />
      </div>
      <div className="bg-derma-secondary300 py-12">
        <FaqsDerma />
      </div>
    </>
  );
}
