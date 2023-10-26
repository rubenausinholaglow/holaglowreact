'use client';

import { useEffect, useState } from 'react';
import { Clinic } from '@interface/clinic';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAngle } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

export default function Clinics({ className = '' }: { className?: string }) {
  const { deviceSize, clinics } = useGlobalPersistedStore(state => state);

  const [selectedClinic, setSelectedClinic] = useState<Clinic>();
  const [mapHeight, setMapHeight] = useState(0);
  const [googleMapAddress, setGoogleMapAddress] = useState('');

  useEffect(() => {
    if (!isEmpty(selectedClinic)) {
      const mapLayer = document.querySelector('#mapLayer');

      if (mapLayer) {
        const mapLayerElement = mapLayer as HTMLElement;
        setMapHeight(mapLayerElement.offsetHeight);
      }

      const formattedAddress = selectedClinic.address.replace(/ /g, '+');
      const formattedCity = selectedClinic.city.replace(/ /g, '+');

      setGoogleMapAddress(`${formattedAddress},${formattedCity}`);
    }
  }, [selectedClinic]);

  return (
    <div className={className}>
      <div className="relative bg-white">
        <Container className="py-12 md:py-16">
          <Title size="2xl" className="font-bold mb-8 md:w-1/2">
            Nuestras <br className="hidden md:block" />
            <Underlined color={HOLAGLOW_COLORS['primary']}>clínicas</Underlined>
          </Title>
          <Accordion className={`w-full flex flex-col gap-4`}>
            {deviceSize.isMobile &&
              clinics.map((clinic, index) => (
                <AccordionItem
                  className="w-full"
                  key={index}
                  value={index.toString()}
                >
                  <AccordionTrigger className="w-full">
                    <div
                      key="clinic.city"
                      className={
                        selectedClinic && selectedClinic.city === clinic.city
                          ? 'bg-hg-primary300'
                          : 'bg-hg-black100'
                      }
                      onClick={() => setSelectedClinic(clinics[index])}
                    >
                      <Flex
                        layout="row-center"
                        className="w-full text-xs transition-all justify-between cursor-pointer p-3 "
                      >
                        <Flex layout="col-left">
                          <Text size="lg" className="font-semibold mb-2">
                            {clinic.city}
                          </Text>
                          <address className="text-xs text-left not-italic mb-2">
                            {clinic.address}
                          </address>
                        </Flex>
                        <SvgAngle
                          height={24}
                          width={24}
                          className="rotate-90 md:rotate-0"
                        />
                      </Flex>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-hg-black100 overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                    <div
                      className={`overflow-hidden max-w-full w-full h-[300px]`}
                    >
                      <div
                        id="g-mapdisplay"
                        className="h-full w-full max-w-full"
                      >
                        <iframe
                          className="h-full w-full border-none"
                          src={`https://www.google.com/maps/embed/v1/place?q=Holaglow,+${googleMapAddress},+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                        ></iframe>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>

          {/* desktop clinic selector */}
          {!deviceSize.isMobile && (
            <>
              <div className="hidden md:flex w-1/2">
                <Flex layout="col-left" className="gap-4 mr-24 w-full">
                  {clinics.map((clinic, index) => (
                    <Flex
                      layout="row-center"
                      className={`transition-all w-full justify-between bg-hg-black100 p-4 cursor-pointer ${
                        selectedClinic && selectedClinic.city === clinic.city
                          ? 'bg-hg-primary300'
                          : 'bg-hg-black100'
                      } `}
                      key={clinic.city}
                      onClick={() => setSelectedClinic(clinics[index])}
                    >
                      <Flex layout="col-left">
                        <Text size="lg" className="font-semibold mb-2">
                          {clinic.city}
                        </Text>
                        <address className="text-left not-italic mb-2 text-xs">
                          {clinic.address}
                        </address>
                      </Flex>
                      <SvgAngle height={24} width={24} />
                    </Flex>
                  ))}
                </Flex>
              </div>
              <div
                id="mapLayer"
                className="absolute bg-slate-400 top-0 bottom-0 right-0 left-1/2 hidden md:block"
              >
                <div
                  className={`overflow-hidden max-w-full w-full`}
                  style={{ height: `${mapHeight}px` }}
                >
                  <div id="g-mapdisplay" className="h-full w-full max-w-full">
                    <iframe
                      className="h-full w-full border-none"
                      src={`https://www.google.com/maps/embed/v1/place?q=Holaglow,+${googleMapAddress},+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
                    ></iframe>
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}
