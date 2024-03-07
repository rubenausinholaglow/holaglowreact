'use client';

import { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { UpsellingData } from '@interface/upselling';
import { SvgSend } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';

export default function UpsellingPharmacies({
  data,
}: {
  data: UpsellingData | null;
}) {
  const [pharmacyPostalCode, setPharmacyPostalCode] = useState<
    string | undefined
  >(data?.user?.postalCode);
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

    if (event.target.value.length === 5) {
      setGoogleMapSrc(
        `https://www.google.com/maps/embed/v1/search?q=farmacias+cerca+del+codigo+postal+${event.target.value},+España&zoom=15&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`
      );
    }
  };

  function renderGoogleMap() {
    return (
      <div
        className={`overflow-hidden max-w-full w-full rounded-3xl md:w-3/5`}
        style={{ height: '450px' }}
      >
        <div id="g-mapdisplay" className="h-full w-full max-w-full">
          <iframe
            className="h-full w-full border-none"
            src={googleMapSrc}
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-derma-secondary300 pb-12">
      <Container>
        <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
          <div className="w-full md:w-2/5">
            <Title size="2xl" className="text-derma-primary mb-8">
              Buscador de farmacia
            </Title>

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

          {googleMapSrc && renderGoogleMap()}
        </Flex>
      </Container>
    </div>
  );
}
