'use client';

import { useEffect } from 'react';
import { Accordion, AccordionItem } from '@radix-ui/react-accordion';
import ROUTES from '@utils/routes';
import { SvgAngleDown, SvgReceiptEdit } from 'app/icons/Icons';
import {
  SvgArrow,
  SvgCheckCircle,
  SvgReceipt2,
  SvgUserSquare,
} from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import {
  AccordionContent,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

import DiagnosisImages from './DiagnosisImages';
import ProfesionalHeader from './ProfessionalHeader';

dayjs.locale(spanishConf);

export default function Diagnosis({
  user,
  diagnosis,
  index,
  isFirstDiagnosis = false,
  isVisible = true,
}: {
  user: any;
  diagnosis: any;
  index: number;
  isFirstDiagnosis?: boolean;
  isVisible?: boolean;
}) {
  const isReceiptDisabled =
    dayjs() > dayjs(diagnosis?.creationDate).add(10, 'day');

  const { setUserId, setDiagnosticId } = useDermaStore(state => state);

  useEffect(() => {
    setUserId(user.id);
    setDiagnosticId(diagnosis.id);
  }, []);

  return (
    <div className="overflow-hidden">
      <Flex
        layout="col-left"
        className="p-4 bg-white md:border border-derma-secondary400 rounded-3xl"
      >
        <Accordion
          type="single"
          defaultValue="isOpen"
          collapsible={!isVisible}
          className="w-full"
        >
          <AccordionItem
            value={isVisible ? 'isOpen' : 'isClosed'}
            className="w-full"
          >
            <AccordionTrigger className="w-full flex items-center justify-center">
              <Flex layut="row-between" className="w-full ">
                <ProfesionalHeader diagnosis={diagnosis} />
                {!isVisible && (
                  <SvgAngleDown className="transition-transform group-data-[state=open]:rotate-180" />
                )}
              </Flex>
            </AccordionTrigger>
            <AccordionContent
              className={diagnosis.professional !== null ? 'mt-4' : ''}
            >
              {diagnosis?.front && diagnosis?.left && diagnosis?.right && (
                <DiagnosisImages
                  images={[diagnosis?.front, diagnosis?.left, diagnosis?.right]}
                  className="mb-4"
                />
              )}

              {diagnosis.userComment !== '' && (
                <Text className="bg-hg-black100 mb-8 p-4 text-xs text-hg-black500 rounded-xl border-l-4 border-hg-black300">
                  {diagnosis.userComment}
                </Text>
              )}

              {diagnosis?.professionalComment ? (
                <>
                  <Text className="text-derma-primary mb-2 font-semibold">
                    Hola {user.firstName},
                  </Text>
                  <Text className="mb-4 text-sm">
                    {diagnosis?.professionalComment}
                  </Text>
                </>
              ) : (
                <Flex className="p-4 text-sm rounded-2xl bg-derma-primary300/20  items-start">
                  <SvgCheckCircle className="w-4 h-4 shrink-0 mr-3 text-derma-primary mt-1" />
                  <div>
                    <Text>
                      Hemos recibido correctamente tu información. El médico la
                      revisará y actualizará tu seguimiento en un plazo de 3
                      días.
                    </Text>
                    <Button
                      size="sm"
                      type="white"
                      className="mt-4"
                      href={`${ROUTES.derma.diagnostico.seguimiento}?index=${index}`}
                    >
                      Editar información <SvgArrow className="h-4 w-4 ml-3" />
                    </Button>
                  </div>
                </Flex>
              )}

              {isFirstDiagnosis && (
                <>
                  <Button
                    size="lg"
                    type="tertiary"
                    className="w-full mb-4"
                    customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2 cursor-default"
                  >
                    <div className=" mr-2 bg-derma-primary500/20 rounded-full p-1.5">
                      <SvgUserSquare className="h-[18px] w-[18px]" />
                    </div>
                    <Flex layout="col-left" className="w-full text-xs">
                      <Text className="text-hg-black500">Paciente</Text>
                      <Text className="text-derma-primary font-medium">
                        {user?.firstName} {user?.lastName}{' '}
                        {user?.secondLastName}
                      </Text>
                    </Flex>
                  </Button>

                  <Button
                    size="lg"
                    type="tertiary"
                    className="w-full mb-4"
                    customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2 cursor-default"
                  >
                    <div className=" mr-2 bg-derma-primary500/20 rounded-full p-1.5">
                      <SvgReceipt2 className="h-[18px] w-[18px]" />
                    </div>
                    <Flex layout="col-left" className="w-full text-xs">
                      <Text className="text-hg-black500">
                        Fecha expedición receta
                      </Text>
                      <Text className="text-derma-primary font-medium">
                        {dayjs(diagnosis?.creationDate).format('DD/MM/YYYY')}
                      </Text>
                    </Flex>
                  </Button>

                  <Button
                    size="xl"
                    type={isReceiptDisabled ? 'disabled' : 'derma'}
                    className={`w-full mb-4 ${
                      isReceiptDisabled ? 'pointer-events-none' : ''
                    }`}
                    customStyles={`group font-normal justify-start pl-2 pr-4 ${
                      isReceiptDisabled ? 'bg-hg-black100' : ''
                    }`}
                    href={diagnosis.receiptUrl}
                    target="_blank"
                  >
                    <Flex
                      layout="row-center"
                      className="transition-all h-11 w-11 mr-2 bg-derma-primary500 rounded-full p-2 group-hover:bg-white"
                    >
                      <SvgReceiptEdit className="h-6 w-6" />
                    </Flex>
                    <Text>Descarga tu receta (PDF)</Text>
                    <SvgArrow className="ml-auto" />
                  </Button>

                  <Text className="text-xs text-hg-black500 text-center">
                    La receta tiene una validez de 10 días desde la fecha de
                    emisión. Recuerda acudir a tu farmacia con la receta y tu
                    documento de identidad para poder encargarla. Normalmente
                    tardan unos 3 días en elaborarla y tiene un coste de entre
                    25 y 40€.
                  </Text>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Flex>
    </div>
  );
}
