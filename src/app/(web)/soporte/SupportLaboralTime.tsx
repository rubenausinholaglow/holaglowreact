import React from 'react';
import { SvgPhone } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';

const SupportLaboralTime = () => {
  return (
    <div className="mt-6 justify-center items-center">
      <Text size="md" className="leading-6 mb-10 text-center">
        Contacte por teléfono de Lunes a Viernes
        <br />
        De 10 a 14h y de 15 a 19h
        <br />
        <a href="tel:+34 682 417 208">(+34) 682 417 208</a>
        <br />
        <Button
          type="secondary"
          size="xl"
          className="mb-8 mt-6"
          href="tel:682417208"
          id={'tmevent_help_module_click'}
        >
          <SvgPhone className="mr-4" />
          Llámanos ahora
        </Button>
      </Text>
    </div>
  );
};

export default SupportLaboralTime;
