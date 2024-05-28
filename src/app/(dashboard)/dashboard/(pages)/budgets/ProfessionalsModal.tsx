'use client';

import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { fetchClinics } from '@utils/fetch';
import { getClinicToSet } from '@utils/utils';
import {
  SvgAdd,
  SvgGoogle,
  SvgInjection,
  SvgMedal,
  SvgShieldTick,
  SvgUsers,
} from 'app/icons/IconsDs';
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
import { isEmpty } from 'lodash';
import Image from 'next/image';

const MOCKUP_PROFESSIONALS = [
  {
    name: 'Sonsoles Espi',
    resultImages: [
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/13.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/13.jpg',
        id: '45580398-65b1-4877-ad1e-15d60acc3473',
        creationDate: '2024-05-22T07:43:11.9933333',
        active: true,
      },
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/12.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/12.jpg',
        id: 'c2b47e6f-afd9-4805-aadf-30e4c3232bea',
        creationDate: '2024-05-22T07:43:11.99',
        active: true,
      },
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/9.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/9.jpg',
        id: '332891a8-bf8d-409f-97e2-798543060d1d',
        creationDate: '2024-05-22T07:43:11.9733333',
        active: true,
      },
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/8.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/8.jpg',
        id: '8722d837-dc4d-4f6f-b767-830a601f36b1',
        creationDate: '2024-05-22T07:43:11.9666667',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/4.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/4.jpg',
        id: 'cf7aeab8-0e6a-4c89-bb44-9287951f1328',
        creationDate: '2024-03-18T14:34:59.67',
        active: true,
      },
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/10.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/10.jpg',
        id: '21759dbf-588a-4e2a-81ce-99a4a855ecbb',
        creationDate: '2024-05-22T07:43:11.98',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/1.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/1.jpg',
        id: '3691e6c2-b504-4f4b-85bd-9a3a01dd95d1',
        creationDate: '2024-03-18T14:34:59.63',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/2.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/2.jpg',
        id: '957e012b-1b15-435d-8bec-a87fabf161a8',
        creationDate: '2024-03-18T14:34:59.66',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/5.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/5.jpg',
        id: 'a080b688-0027-4099-a246-b74fb41fcfb0',
        creationDate: '2024-03-18T14:34:59.6733333',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/3.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/3.jpg',
        id: 'e1b1582d-0032-4ba1-a1b2-b8134f2013e2',
        creationDate: '2024-03-18T14:34:59.6666667',
        active: true,
      },
      {
        urlAfter:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/11.jpg',
        urlBefore:
          'https://budgetimages.blob.core.windows.net/images/antes-y-despues/aumento-labios/11.jpg',
        id: 'd7dffdd3-8808-4861-a9ea-e84ced8fc79e',
        creationDate: '2024-05-22T07:43:11.9833333',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/7.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/7.jpg',
        id: '7f31c7ac-9622-4bca-92cf-f8e63b799bf5',
        creationDate: '2024-03-18T14:34:59.68',
        active: true,
      },
      {
        urlAfter:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/6.jpg',
        urlBefore:
          'https://www.holaglow.com/imagenes/antes-y-despues/aumento-labios/6.jpg',
        id: 'cbe38f1c-58b8-4a88-b24a-fe323eabf486',
        creationDate: '2024-03-18T14:34:59.6766667',
        active: true,
      },
    ],
  },
];

export default function ProfessionalsModal() {
  const professionalsModalRef = useRef<HTMLButtonElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const { selectedClinic, setSelectedClinic } = useSessionStore(state => state);
  const { clinics, storedClinicId, setClinics } = useGlobalPersistedStore(
    state => state
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      if (professionalsModalRef.current) {
        professionalsModalRef.current.click();
      }
    }
  }, [isHydrated]);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }

    if (isEmpty(selectedClinic)) {
      setSelectedClinic(getClinicToSet(clinics, storedClinicId));
    }
  }, [clinics]);

  return (
    <Dialog>
      <DialogTrigger>
        <button ref={professionalsModalRef} id="test" className="hidden">
          Modal médicos
        </button>
      </DialogTrigger>
      <DialogContent className="w-4/5">
        <div className="p-6">
          <Title size="2xl" className="font-gtUltra text-hg-secondary">
            Nuestras profesionales
          </Title>
        </div>

        <Carousel>
          <div>
            <div className="p-6">
              <Flex layout="row-left" className="gap-8 items-start mb-8">
                <div className="w-1/2 relative aspect-square bg-hg-secondary100 rounded-2xl">
                  <Image
                    alt="profe"
                    src="https://www.holaglow.com/_next/image?url=https%3A%2F%2Fbudgetimages.blob.core.windows.net%2Fimages%2Fprofessionals%2FSonsoles.png&w=1920&q=75"
                    fill
                    className="object-cover"
                  />
                </div>
                <ul>
                  <li className="font-light font-gtUltra text-2xl">
                    Sonsoles Espi
                  </li>
                  <li className="font-light text-hg-black500">
                    Directora médico
                  </li>
                  <li className="font-light text-hg-black500 mb-8">
                    N. de colegiada 505 015 795
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
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgUsers className="text-hg-black h-6 w-6" />
                  </div>
                  +750 pacientes atendidos
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgInjection className="text-hg-black h-6 w-6" />
                  </div>
                  +3500 tratamientos aplicados
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgMedal className="text-hg-black h-6 w-6" />
                  </div>
                  98% de clientes satisfechos
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgShieldTick className="text-hg-black h-6 w-6" />
                  </div>
                  <span>
                    4,9 valoración{' '}
                    <SvgGoogle className="inline-block h-5 w-14" />
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-derma-secondary300">
              <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                Más sobre Sonsoles
              </Title>

              <ul className="flex flex-col gap-4">
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>
                    <b>Directora médico en Holaglow, X años.</b>
                    <br />
                    Como directora médico es responsable de supervisar y
                    garantizar la calidad de los servicios médicos en todas las
                    clínicas de Holaglow. Coordina y lidera al equipo médico,
                    asegurando el cumplimiento de los estándares de salud y
                    calidad.
                    <br />
                    También supervisa la formación continua del personal médico
                    y colabora en el diseño y mejora de tratamientos estéticos.
                  </div>
                </li>
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>Médico estético de Holaglow Barcelona</div>
                </li>
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>
                    <b>Clínicas Dorsia Zaragoza</b>
                    <br />
                    Médico estético especializada en tratamientos faciales.
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6">
              <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                Resultados
              </Title>

              <Carousel
                controlstyles="px-4"
                hasControls={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                dragEnabled={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                touchEnabled={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                visibleSlides={2}
                hasCounter={
                  isMobile && MOCKUP_PROFESSIONALS[0].resultImages?.length > 1
                }
                className={`md:px-0 rounded-xl aspect-[2/1] ${
                  MOCKUP_PROFESSIONALS[0].resultImages?.length < 2 && !isMobile
                    ? 'w-1/2'
                    : ''
                }
        `}
              >
                {MOCKUP_PROFESSIONALS[0].resultImages
                  ?.sort(function x(a, b) {
                    return a.urlBefore!.localeCompare(b.urlBefore!, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                    });
                  })
                  .map(item => (
                    <div className="px-4" key={item.id}>
                      <div className="overflow-hidden relative aspect-square">
                        <div className="relative aspect-square">
                          <div
                            itemScope
                            itemType="https://schema.org/ImageObject"
                          >
                            <Image
                              src={item.urlBefore || ''}
                              alt="antes y despues"
                              fill
                              className="object-cover rounded-3xl"
                            />
                            <span className="hidden" itemProp="license">
                              https://www.holaglow.com/aviso-legal
                            </span>
                            <span className="hidden" itemProp="contentUrl">
                              {item.urlBefore}
                            </span>
                            <span
                              className="hidden"
                              itemProp="creator"
                              itemType="https://schema.org/Organization"
                              itemScope
                            >
                              <meta itemProp="name" content="Holaglow" />
                            </span>
                            <span className="hidden" itemProp="creditText">
                              Holaglow
                            </span>
                            <span className="hidden" itemProp="copyrightNotice">
                              Glow Lab SL
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>

          <div>
            <div className="p-6">
              <Flex layout="row-left" className="gap-8 items-start mb-8">
                <div className="w-1/2 relative aspect-square bg-hg-secondary100 rounded-2xl">
                  <Image
                    alt="profe"
                    src="https://www.holaglow.com/_next/image?url=https%3A%2F%2Fbudgetimages.blob.core.windows.net%2Fimages%2Fprofessionals%2FSonsoles.png&w=1920&q=75"
                    fill
                    className="object-cover"
                  />
                </div>
                <ul>
                  <li className="font-light font-gtUltra text-2xl">
                    Sonsoles Espi
                  </li>
                  <li className="font-light text-hg-black500">
                    Directora médico
                  </li>
                  <li className="font-light text-hg-black500 mb-8">
                    N. de colegiada 505 015 795
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
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgUsers className="text-hg-black h-6 w-6" />
                  </div>
                  +750 pacientes atendidos
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgInjection className="text-hg-black h-6 w-6" />
                  </div>
                  +3500 tratamientos aplicados
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgMedal className="text-hg-black h-6 w-6" />
                  </div>
                  98% de clientes satisfechos
                </li>
                <li className="flex gap-2 justify-left items-center rounded-2xl bg-hg-secondary700 font-semibold text-white p-4">
                  <div className="bg-white p-2 rounded-full">
                    <SvgShieldTick className="text-hg-black h-6 w-6" />
                  </div>
                  <span>
                    4,9 valoración{' '}
                    <SvgGoogle className="inline-block h-5 w-14" />
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-derma-secondary300">
              <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                Más sobre Sonsoles
              </Title>

              <ul className="flex flex-col gap-4">
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>
                    <b>Directora médico en Holaglow, X años.</b>
                    <br />
                    Como directora médico es responsable de supervisar y
                    garantizar la calidad de los servicios médicos en todas las
                    clínicas de Holaglow. Coordina y lidera al equipo médico,
                    asegurando el cumplimiento de los estándares de salud y
                    calidad.
                    <br />
                    También supervisa la formación continua del personal médico
                    y colabora en el diseño y mejora de tratamientos estéticos.
                  </div>
                </li>
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>Médico estético de Holaglow Barcelona</div>
                </li>
                <li className="flex justify-start">
                  <SvgAdd className="shrink-0 mr-2 h-5 w-5 text-hg-black400" />
                  <div>
                    <b>Clínicas Dorsia Zaragoza</b>
                    <br />
                    Médico estético especializada en tratamientos faciales.
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6">
              <Title className="text-hg-secondary font-light font-gtUltra text-xl mb-4">
                Resultados
              </Title>

              <Carousel
                controlstyles="px-4"
                hasControls={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                dragEnabled={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                touchEnabled={MOCKUP_PROFESSIONALS[0].resultImages?.length > 1}
                visibleSlides={2}
                hasCounter={
                  isMobile && MOCKUP_PROFESSIONALS[0].resultImages?.length > 1
                }
                className={`md:px-0 rounded-xl aspect-[2/1] ${
                  MOCKUP_PROFESSIONALS[0].resultImages?.length < 2 && !isMobile
                    ? 'w-1/2'
                    : ''
                }
        `}
              >
                {MOCKUP_PROFESSIONALS[0].resultImages
                  ?.sort(function x(a, b) {
                    return a.urlBefore!.localeCompare(b.urlBefore!, undefined, {
                      numeric: true,
                      sensitivity: 'base',
                    });
                  })
                  .map(item => (
                    <div className="px-4" key={item.id}>
                      <div className="overflow-hidden relative aspect-square">
                        <div className="relative aspect-square">
                          <div
                            itemScope
                            itemType="https://schema.org/ImageObject"
                          >
                            <Image
                              src={item.urlBefore || ''}
                              alt="antes y despues"
                              fill
                              className="object-cover rounded-3xl"
                            />
                            <span className="hidden" itemProp="license">
                              https://www.holaglow.com/aviso-legal
                            </span>
                            <span className="hidden" itemProp="contentUrl">
                              {item.urlBefore}
                            </span>
                            <span
                              className="hidden"
                              itemProp="creator"
                              itemType="https://schema.org/Organization"
                              itemScope
                            >
                              <meta itemProp="name" content="Holaglow" />
                            </span>
                            <span className="hidden" itemProp="creditText">
                              Holaglow
                            </span>
                            <span className="hidden" itemProp="copyrightNotice">
                              Glow Lab SL
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
