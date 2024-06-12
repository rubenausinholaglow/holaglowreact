'use client';

import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Clinic } from '@interface/clinic';
import CheckHydration from '@utils/CheckHydration';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import { SvgAngle } from 'app/icons/IconsDs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import CustomMap from './CustomMap';
import FullScreenLoading from './FullScreenLayout';

export default function ClinicsSelector({ clinics }: { clinics: Clinic[] }) {
  const [selectedAccordion, setSelectedAccordion] = useState<string>('3');
  const [selectedClinic, setSelectedClinic] = useState<Clinic>();
  const [mapHeight, setMapHeight] = useState(0);
  const [googleMapAddress, setGoogleMapAddress] = useState('');

  useEffect(() => {
    if (!isMobile && clinics.length > 0) setSelectedClinic(clinics[0]);
  }, [clinics]);

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
    <CheckHydration>
      <Accordion
        className={`w-full flex flex-col gap-4`}
        value={selectedAccordion}
      >
        {isMobile &&
          clinics &&
          clinics.map((clinic, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className={`w-full rounded-2xl overflow-hidden
                ${
                  selectedAccordion === index.toString()
                    ? 'bg-hg-secondary100 border border-hg-secondary300'
                    : 'bg-derma-secondary300 border border-transparent'
                }`}
            >
              <AccordionTrigger className="w-full">
                <AnimateOnViewport>
                  <div
                    id={'tmevent_clinics_module'}
                    key="clinic.city"
                    onClick={() => {
                      if (index.toString() === selectedAccordion) {
                        setSelectedAccordion('3');
                      } else {
                        setSelectedAccordion(index.toString());
                      }

                      setSelectedClinic(clinics[index]);
                    }}
                  >
                    <Flex
                      layout="row-center"
                      className="w-full text-xs transition-all justify-between cursor-pointer p-3 "
                    >
                      <Flex layout="col-left">
                        <Text size="lg" className="font-semibold mb-2">
                          {clinic.city}
                        </Text>
                        <address className="text-sm not-italic text-left">
                          {clinic?.address}, {clinic?.district},{' '}
                          {clinic?.zipCode} {clinic?.province}
                          <br />
                          {clinic?.addressExtraInfo}
                        </address>
                      </Flex>

                      <SvgAngle
                        height={24}
                        width={24}
                        className="rotate-90 md:rotate-0"
                      />
                    </Flex>
                  </div>
                </AnimateOnViewport>
              </AccordionTrigger>
              <AccordionContent className="bg-hg-secondary100 overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp relative">
                <FullScreenLoading />
                <div className="overflow-hidden max-w-full w-full h-[300px] relative z-10">
                  {selectedClinic && (
                    <CustomMap
                      address={googleMapAddress}
                      selectedClinic={selectedClinic}
                    />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>

      {!isMobile && (
        <>
          <div className="flex w-1/2">
            <Flex layout="col-left" className="gap-4 mr-24 w-full">
              {clinics.map((clinic, index) => (
                <Flex
                  id={'tmevent_clinics_module'}
                  layout="row-center"
                  className={`transition-all w-full justify-between bg-hg-black100 py-6 px-4 cursor-pointer rounded-2xl ${
                    selectedClinic && selectedClinic.city === clinic.city
                      ? 'bg-hg-secondary100 border border-hg-secondary300'
                      : 'bg-derma-secondary300 border border-transparent'
                  } `}
                  key={clinic.city}
                  onClick={() => setSelectedClinic(clinics[index])}
                >
                  <Flex layout="col-left">
                    <Text size="lg" className="font-semibold mb-2">
                      {clinic.city}
                    </Text>
                    <address className="text-xs not-italic">
                      {clinic?.address}, {clinic?.district}, {clinic?.zipCode}{' '}
                      {clinic?.province}
                      <br />
                      {clinic?.addressExtraInfo}
                    </address>
                  </Flex>
                  <SvgAngle height={24} width={24} />
                </Flex>
              ))}
            </Flex>
          </div>
          <div
            id="mapLayer"
            className="absolute top-0 bottom-0 right-0 left-1/2"
          >
            <FullScreenLoading />
            <div
              className="overflow-hidden max-w-full w-full relative z-10"
              style={{ height: `${mapHeight}px` }}
            >
              {selectedClinic && (
                <CustomMap
                  address={googleMapAddress}
                  selectedClinic={selectedClinic}
                />
              )}
            </div>
          </div>
        </>
      )}
    </CheckHydration>
  );
}
