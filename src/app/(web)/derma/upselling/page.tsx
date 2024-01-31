'use client';

import { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgReceipt2, SvgReceiptEdit } from 'app/icons/Icons';
import {
  SvgArrow,
  SvgSend,
  SvgUserSquare,
  SvgWarning,
} from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, TitleDerma } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function Upselling() {
  const [pharmacyPostalCode, setPharmacyPostalCode] = useState<
    string | undefined
  >('08013');
  const [googleMapSrc, setGoogleMapSrc] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setGoogleMapSrc(
      `https://www.google.com/maps/embed/v1/search?q=farmacias+cerca+del+codigo+postal+${pharmacyPostalCode},+España&zoom=15&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
    );
  }, []);

  const handlePharmacyPostalCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPharmacyPostalCode(event.target.value);

    /*     if (event.target.value.length === 5) {
      setGoogleMapSrc(
        `https://www.google.com/maps/embed/v1/search?q=farmacias+cerca+del+codigo+postal+${pharmacyPostalCode},+España&zoom=10&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
      );
    } */
  };

  return (
    <DermaLayout hideButton>
      <Container>
        <Flex layout="col-left" className="w-full md:flex-row py-6 md:py-12">
          <Text className="font-gtUltraThin text-xl text-derma-primary text-center mb-8 md:text-left md:w-1/2 md:text-5xl md:font-gtUltraBold">
            ¡Ya tenemos tu fórmula personalizada!
          </Text>

          <div className="md:w-1/2">
            <Button
              size="lg"
              type="tertiary"
              className="w-full mb-4"
              customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2"
            >
              <SvgUserSquare className="h-8 w-8 mr-2 bg-derma-primary500/20 rounded-full p-1.5" />
              <Flex layout="col-left" className="w-full text-xs">
                <Text className="text-hg-black500">Paciente</Text>
                <Text className="text-derma-primary font-medium">
                  Lluís Tallada Crespí
                </Text>
              </Flex>
            </Button>

            <Button
              size="lg"
              type="tertiary"
              className="w-full mb-4"
              customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2"
            >
              <SvgReceipt2 className="h-8 w-8 mr-2 bg-derma-primary500/20 rounded-full p-1.5" />
              <Flex layout="col-left" className="w-full text-xs">
                <Text className="text-hg-black500">
                  Fecha expedición receta
                </Text>
                <Text className="text-derma-primary font-medium">
                  {dayjs().format('DD/MM/YYYY')}
                </Text>
              </Flex>
            </Button>

            <Button
              size="xl"
              type="tertiary"
              className="w-full mb-4"
              customStyles="border-none bg-derma-primary text-white font-normal justify-start pl-2 pr-4"
            >
              <Flex
                layout="row-center"
                className="h-12 w-12 mr-2 bg-derma-primary500 rounded-full p-2"
              >
                <SvgReceiptEdit className="h-6 w-6" />
              </Flex>
              <Text>Ver receta (PDF)</Text>
              <SvgArrow className="ml-auto" />
            </Button>
          </div>
        </Flex>
      </Container>

      <div className="bg-derma-secondary300 pb-12">
        <div className="bg-derma-tertiary text-white pt-6 pb-12 md:py-4 md:mb-16">
          <Container>
            <Flex className="gap-2 text-sm items-start">
              <SvgWarning className="shrink-0 -mt-0.5" />
              <Text>
                <span className="font-semibold">Recuerda:</span>{' '}
                <br className="md:hidden" />
                Las recetas tienen una validez de 10 días desde la fecha de
                prescripción
              </Text>
            </Flex>
          </Container>
        </div>

        <Container className="bg-derma-primary500 rounded-3xl py-6 -mt-5 mb-12 md:mt-0 md:mb-16">
          <TitleDerma size="2xl" className="text-white mb-4">
            Selecciona tu rutina
          </TitleDerma>
          <Text className="mb-8">
            Según tu consulta con el Dr. Pepito, estos productos pueden ayudarte
          </Text>

          <Flex
            layout="col-left"
            className="w-full gap-6 md:grid md:grid-flow-col"
          >
            <Flex
              layout="col-left"
              className="bg-derma-secondary400 py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-6 mb-4 md:mb-8 md:flex-col h-full">
                <Image
                  src="/images/derma/upselling/seguimiento.png"
                  alt="Seguimiento online con tu dermatólogo"
                  height={516}
                  width={360}
                  className="w-1/2 shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Seguimiento online con tu dermatólogo
                  </Text>
                  <Text className="text-3xl font-bold">49€</Text>
                  <Text className="text-sm text-hg-error font-medium line-through">
                    PVP 59 €
                  </Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  type="tertiary"
                  customStyles="border-none bg-derma-secondary100 text-derma-tertiary"
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Reservar cita
                </Button>
              </Flex>
            </Flex>

            <Flex
              layout="col-left"
              className="bg-derma-secondary400 py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-6 mb-4 md:mb-8 md:flex-col h-full">
                <Image
                  src="/images/derma/upselling/rutinaFacial.png"
                  alt="Rutina Facial Derma by Holaglow"
                  height={448}
                  width={392}
                  className="w-1/2 shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="mb-4 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs">
                    Rutina{' '}
                    <span className="hidden md:inline">personalizada</span>{' '}
                    antiaging
                  </Text>
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Tu rutina facial completa
                  </Text>
                  <Text className="text-3xl font-bold">129€</Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  type="tertiary"
                  customStyles="border-none bg-derma-secondary100 text-derma-tertiary"
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Comprar rutina
                </Button>
              </Flex>
            </Flex>

            <Flex
              layout="col-left"
              className="bg-derma-tertiary text-white py-6 px-4 md:px-6 rounded-3xl h-full"
            >
              <Flex className="gap-2 mb-4 md:mb-8 md:flex-col">
                <Image
                  src="/images/derma/upselling/packDerma.png?1"
                  alt="Solución completa. Rutina facial y revisión médica."
                  height={482}
                  width={426}
                  className="w-[60%] shrink-0"
                />

                <Flex layout="col-left" className="w-full">
                  <Text className="mb-4 bg-hg-secondary300 text-hg-secondary py-1 px-2 rounded-full text-xs">
                    Rutina{' '}
                    <span className="hidden md:inline">personalizada</span>{' '}
                    antiaging
                  </Text>
                  <Text className="text-md mb-3 md:text-lg md:font-semibold">
                    Solución completa. Tu rutina facial más revisión médica
                  </Text>
                  <Text className="text-3xl font-bold">139€</Text>
                  <Text className="text-sm text-hg-error font-medium line-through">
                    PVP 198 €
                  </Text>
                </Flex>
              </Flex>

              <Flex layout="row-center" className="justify-between w-full">
                <Button
                  type="tertiary"
                  customStyles="border-none bg-derma-secondary100 text-derma-tertiary"
                >
                  Saber más
                </Button>
                <Button
                  type="tertiary"
                  size="lg"
                  customStyles="border-none text-white bg-derma-primary"
                >
                  Comprar rutina
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>

        <Container>
          <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
            <div className="md:w-2/5">
              <TitleDerma size="2xl" className="text-derma-primary mb-8">
                Buscador de farmacia
              </TitleDerma>

              <div className="w-full relative mb-4">
                <div className="absolute z-10 top-5 right-4 inline-block border border-derma-primary rounded-[6px] p-1">
                  <SvgSend className="text-derma-primary h-4 w-4" />
                </div>
                <TextInputField
                  label="Código postal"
                  labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
                  inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300"
                  placeholder="Escribe aquí"
                  value={pharmacyPostalCode || ''}
                  onChange={event => handlePharmacyPostalCode(event)}
                  disableBgIcons
                />
              </div>
            </div>

            {googleMapSrc && (
              <div
                className={`overflow-hidden max-w-full w-full md:w-3/5`}
                style={{ height: '450px' }}
              >
                <div id="g-mapdisplay" className="h-full w-full max-w-full">
                  <iframe
                    className="h-full w-full border-none"
                    src={googleMapSrc}
                  ></iframe>
                </div>
              </div>
            )}
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
