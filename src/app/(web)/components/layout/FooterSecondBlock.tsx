'use client';

import { Clinic } from '@interface/clinic';
import CheckHydration from '@utils/CheckHydration';
import ROUTES from '@utils/routes';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import SimpleAccordion from 'designSystem/Accordion/SimpleAccordion';
import { Flex } from 'designSystem/Layouts/Layouts';
import isEmpty from 'lodash/isEmpty';

export default function FooterSecondBlock({ clinics }: { clinics: Clinic[] }) {
  return (
    <CheckHydration>
      <Flex
        layout="col-left"
        className="gap-6 w-full md:w-1/3 text-xl font-semibold px-4 md:px-0 pb-6"
      >
        <a href={ROUTES.aboutUs} id={'tmevent_nav_menu_click'}>
          <p className="font-semibold">Sobre nosotros</p>
        </a>

        {!isEmpty(clinics) && (
          <SimpleAccordion trigger="Clínicas" isOpen={!isMobile()}>
            <ul className="text-sm pt-4 font-normal flex flex-col">
              {clinics.map(clinic => (
                <li key={clinic.city}>
                  <a
                    className="py-2 block"
                    href={ROUTES.clinics}
                    id={'tmevent_nav_menu_click'}
                  >
                    {clinic.city}
                  </a>
                </li>
              ))}
            </ul>
          </SimpleAccordion>
        )}
        <a href={ROUTES.blog} id={'tmevent_nav_menu_click'}>
          <p className="font-semibold">Blog</p>
        </a>

        <SimpleAccordion trigger="Privacidad" isOpen={!isMobile()}>
          <ul className="text-xs pt-4 font-normal flex flex-col gap-2">
            <li>
              <a
                className="py-2 block"
                href={ROUTES.statics.privacyPolicy}
                id={'tmevent_nav_menu_click'}
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                className="py-2 block"
                href={ROUTES.statics.termsAndConditions}
                id={'tmevent_nav_menu_click'}
              >
                Términos y condiciones
              </a>
            </li>
          </ul>
        </SimpleAccordion>
      </Flex>
    </CheckHydration>
  );
}
