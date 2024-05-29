'use client';

import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
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
import { Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import { PROFESSIONALS_BY_CITY } from './professionalsData';

export default function ProfessionalsModal() {
  const professionalsModalRef = useRef<HTMLButtonElement>(null);
  const professionalsCarouselRef = useRef<HTMLDivElement>(null);

  const [isHydrated, setIsHydrated] = useState(false);
  const [professionalsByCity, setProfessionalsByCity] = useState<object[]>([]);

  const { storedClinicId } = useGlobalPersistedStore(state => state);
  const { hasSeenDashboardProfessionals, setHasSeenDashboardProfessionals } =
    useSessionStore(state => state);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      setProfessionalsByCity(
        storedClinicId
          ? PROFESSIONALS_BY_CITY.filter(
              (item: any) => item.cityId === storedClinicId
            )[0].professionals
          : PROFESSIONALS_BY_CITY[0].professionals
      );

      if (professionalsModalRef.current && !hasSeenDashboardProfessionals) {
        professionalsModalRef.current.click();
        setHasSeenDashboardProfessionals(true);
      }
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

                  <ul className="grid grid-cols-2 grid-rows-2 gap-4 w-full text-hg-black500">
                    {professional.bullets.map((bullet: any) => (
                      <li
                        key={bullet.icon}
                        className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4"
                      >
                        <div className="bg-white p-2 rounded-full">
                          <DynamicIcon
                            name={bullet.icon}
                            className="text-hg-black h-6 w-6"
                          />
                        </div>
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-derma-secondary300">
                  <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                    Más sobre {professional.name}
                  </Title>

                  <ul className="flex flex-col gap-4">
                    {professional.experience.map((experience: any) => (
                      <li key={experience} className="flex justify-start">
                        <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                        <div>{experience}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6">
                  <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                    Resultados
                  </Title>

                  <Carousel
                    controlstyles="px-4"
                    hasControls={professional.resultsImages?.length > 1}
                    dragEnabled={professional.resultsImages?.length > 1}
                    touchEnabled={professional.resultsImages?.length > 1}
                    visibleSlides={2}
                    hasCounter={
                      isMobile && professional.resultsImages?.length > 1
                    }
                    className={`md:px-0 rounded-xl aspect-[2/1] ${
                      professional.resultsImages?.length < 2 && !isMobile
                        ? 'w-1/2'
                        : ''
                    }`}
                  >
                    {professional.resultsImages.map((image: string) => (
                      <div className="px-4" key={image}>
                        <div className="overflow-hidden relative aspect-square">
                          <div className="relative aspect-square">
                            <div
                              itemScope
                              itemType="https://schema.org/ImageObject"
                            >
                              <Image
                                src={image || ''}
                                alt="antes y despues"
                                fill
                                className="object-cover rounded-3xl"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            ))}
          </Carousel>

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
        </div>
      </DialogContent>
    </Dialog>
  );
}
