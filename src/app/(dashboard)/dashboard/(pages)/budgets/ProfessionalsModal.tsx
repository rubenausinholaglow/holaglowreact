'use client';

import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Professional } from '@interface/clinic';
import clinicService from '@services/ClinicService';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgAdd, SvgArrow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import Carousel from 'designSystem/Carousel/Carousel';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'designSystem/Dialog/Dialog';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { PROFESSIONALS_BY_CITY } from './professionalsData';

export function ProfessionalDashboardCarousel() {
  const [isHydrated, setIsHydrated] = useState(false);
  const professionalsCarouselRef = useRef<HTMLDivElement>(null);
  const [professionalsByCity, setProfessionalsByCity] = useState<
    Professional[]
  >([]);
  const { storedClinicId } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const fetchProfessionals = async () => {
      const professionalsByCity = await clinicService.getProfessionalsByClinic(
        storedClinicId,
        1
      );

      setProfessionalsByCity(professionalsByCity as Professional[]);
    };

    if (isHydrated) {
      fetchProfessionals();
    }
  }, [isHydrated]);

  function handleSlideForwards() {
    if (professionalsCarouselRef.current) {
      const nextButton = professionalsCarouselRef.current.querySelector(
        '.handleControls .carousel__next-button'
      ) as HTMLButtonElement;

      if (nextButton) {
        nextButton.click();
      }
    }
  }

  function handleSlideBackwards() {
    if (professionalsCarouselRef.current) {
      const backButton = professionalsCarouselRef.current.querySelector(
        '.handleControls .carousel__back-button'
      ) as HTMLButtonElement;

      if (backButton) {
        backButton.click();
      }
    }
  }

  if (isEmpty(professionalsByCity)) {
    return <></>;
  }

  return (
    <div ref={professionalsCarouselRef} id="test" className="relative">
      <Carousel
        dragEnabled={false}
        hasControls
        controlstyles="opacity-0 h-0 handleControls p-0 m-0"
      >
        {professionalsByCity.map((professional: any) => (
          <div key={professional.name}>
            <div className="p-6">
              <Flex layout="row-left" className="gap-8 items-start mb-8">
                <div className="w-1/2 relative aspect-square bg-hg-secondary100 rounded-2xl">
                  <Image
                    alt="profe"
                    src={professional.urlPhoto}
                    fill
                    className="object-cover"
                  />
                </div>
                <ul>
                  <li className="font-light font-gtUltra text-2xl">
                    {professional.name}
                  </li>
                  <li className="font-light text-hg-black500">
                    {professional.title}
                  </li>
                  <li className="font-light text-hg-black500 mb-8">
                    N. de colegiada {professional.collegiateNumber}
                  </li>
                  <li className="font-light text-hg-black500 text-sm">
                    Afiliada a la Sociedad Española de Medicina Estética
                    <Image
                      src="/images/dashboard/budgets/seme.svg"
                      height={100}
                      width={100}
                      alt="SEME"
                      className="mt-2"
                    />
                  </li>
                </ul>
              </Flex>
              <ul className="flex  gap-4 w-full text-hg-black500">
                {PROFESSIONALS_BY_CITY.filter(
                  item => item.id === professional.id
                )[0].bullets.map((bullet: any) => (
                  <li
                    key={bullet.icon}
                    className="flex flex-col gap-2 justify-start items-center rounded-2xl bg-derma-secondary500 text-white p-4 w-1/4"
                  >
                    <DynamicIcon
                      name={bullet.icon}
                      className="text-hg-secondary h-10 w-10"
                    />
                    <Text className="text-center text-hg-secondary text-xl font-semibold font-gtUltra">
                      {bullet.value}
                    </Text>
                    <Text className="text-center text-hg-black500 text-xs">
                      {bullet.text}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-derma-secondary400">
              <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4 text-left">
                Más sobre {professional.name}
              </Title>

              <ul className="flex flex-col gap-4">
                {PROFESSIONALS_BY_CITY.filter(
                  item => item.id === professional.id
                )[0].experience.map((experience: any) => (
                  <li key={experience} className="flex justify-start text-left">
                    <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                    <div>{experience}</div>
                  </li>
                ))}
              </ul>
            </div>

            {professional.beforeAndAfterImages?.length > 0 && (
              <div className="p-6">
                <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4 text-left">
                  Resultados
                </Title>

                <Carousel
                  controlstyles="px-4"
                  hasControls={professional.beforeAndAfterImages?.length > 1}
                  dragEnabled={professional.beforeAndAfterImages?.length > 1}
                  touchEnabled={professional.beforeAndAfterImages?.length > 1}
                  visibleSlides={2}
                  hasCounter={
                    isMobile && professional.beforeAndAfterImages?.length > 1
                  }
                  className={`md:px-0 rounded-xl aspect-[2/1] ${
                    professional.beforeAndAfterImages?.length < 2 && !isMobile
                      ? 'w-1/2'
                      : ''
                  }`}
                >
                  {professional.beforeAndAfterImages.map(
                    (item: { id: string; urlAfter: string }) => (
                      <div className="px-4" key={item.id}>
                        <div className="overflow-hidden relative aspect-square">
                          <div className="relative aspect-square">
                            <div
                              itemScope
                              itemType="https://schema.org/ImageObject"
                            >
                              <Image
                                src={item.urlAfter || ''}
                                alt="antes y despues"
                                fill
                                className="object-cover rounded-3xl"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </Carousel>
              </div>
            )}
          </div>
        ))}
      </Carousel>

      {professionalsByCity.length > 1 && (
        <div className="sticky bottom-0 left-0 right-0 w-full bg-white p-4">
          <Flex layout="row-right" className="gap-4 justify-end">
            <div
              className="bg-hg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center ml-auto cursor-pointer"
              onClick={() => handleSlideBackwards()}
            >
              <SvgArrow className="rotate-180" />
            </div>
            <div
              className="bg-hg-secondary text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
              onClick={() => handleSlideForwards()}
            >
              <SvgArrow />
            </div>
          </Flex>
        </div>
      )}
    </div>
  );
}

export default function ProfessionalsModal() {
  const professionalsModalRef = useRef<HTMLButtonElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const { hasSeenDashboardProfessionals, setHasSeenDashboardProfessionals } =
    useSessionStore(state => state);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      if (professionalsModalRef.current && !hasSeenDashboardProfessionals) {
        professionalsModalRef.current.click();
        setHasSeenDashboardProfessionals(true);
      }
    }
  }, [isHydrated]);

  return (
    <Dialog>
      <DialogTrigger>
        <button ref={professionalsModalRef} className="hidden">
          Modal médicos
        </button>
      </DialogTrigger>
      <DialogContent className="w-4/5">
        <div className="p-6">
          <Title size="2xl" className="font-gtUltra text-hg-secondary">
            Nuestras profesionales
          </Title>
        </div>

        <ProfessionalDashboardCarousel />
      </DialogContent>
    </Dialog>
  );
}
