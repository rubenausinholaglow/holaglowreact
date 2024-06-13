import { isMobile } from 'react-device-detect';
import { Clinic } from '@interface/clinic';
import CheckHydration from '@utils/CheckHydration';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Flex } from 'designSystem/Layouts/Layouts';

export default function FooterSecondBlock({ clinics }: { clinics: Clinic[] }) {
  return (
    <CheckHydration>
      <Flex
        layout="col-left"
        className="gap-6 w-full md:w-1/4 text-xl font-semibold px-4 md:px-0 pb-6"
      >
        <SimpleAccordion trigger="Clínicas" isOpen={!isMobile}>
          <a href="/clinicas" id={'tmevent_footer'}>
            <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
              {clinics &&
                clinics.map(clinic => <li key={clinic.city}>{clinic.city}</li>)}
            </ul>
          </a>
        </SimpleAccordion>

        <SimpleAccordion trigger="Nosotrxs" isOpen={!isMobile}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <a href="/quienes-somos" id={'tmevent_footer'}>
              <li>Quiénes somos</li>
            </a>
            <a href="/quienes-somos" id={'tmevent_footer'}>
              <li>Equipo médico</li>
            </a>
          </ul>
        </SimpleAccordion>
        <SimpleAccordion trigger="Privacidad" isOpen={!isMobile}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <a href="/politica-de-privacidad" id={'tmevent_footer'}>
              <li>Política de privacidad</li>
            </a>
            <a href="/aviso-legal" id={'tmevent_footer'}>
              <li>Términos y condiciones</li>
            </a>
            <a href="/condiciones-black-friday" id={'tmevent_footer'}>
              <li>Condiciones Black Friday</li>
            </a>
          </ul>
        </SimpleAccordion>
      </Flex>
    </CheckHydration>
  );
}
