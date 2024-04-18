'use client';

import { useState } from 'react';
import { Diagnosis } from '@interface/derma/diagnosis';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgReceiptEdit } from 'app/icons/Icons';
import { SvgArrow, SvgReceipt2, SvgUserSquare } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import DiagnosisImages from './DiagnosisImages';

const ROUTINES = {
  day: [
    {
      text: 'Empieza el día limpiando tu piel con la <b>espuma limpiadora</b>',
      icon: 'SvgFoam',
    },
    {
      text: 'Aplica tu <b>crema hidratante de día</b> para Dermatitis',
      icon: 'SvgCream',
    },
    {
      text: 'Protege tu piel antes de salir de casa con el <b>protector solar 50+</b>',
      icon: 'SvgSun',
    },
  ],
  night: [
    {
      text: 'Utiliza la <b>espuma limpiadora</b> para limpiar tu rostro en profundidad y preparar la piel para la crema personalizada',
      icon: 'SvgFoam',
    },
    {
      text: 'Aplica una cantidad del tamaño de un guisante de tu <b>crema personalizada</b> y déjala actuar toda la noche. ¡Recuerda! Esta crema contiene principios activos médicos así que es importante no excederse de la cantidad recomendada en cada aplicación',
      icon: 'SvgCd',
    },
  ],
};

export default function RoutineExplanation() {
  const [activeSlider, setActiveSlider] = useState<'day' | 'night'>('day');

  return (
    <>
      <div className="md:hidden">
        <div className="w-full">
          <Flex layout="col-center">
            <ul className="inline-flex bg-white/50 p-1 rounded-full mb-4">
              <li
                className={`transition-all text-xs  py-2 px-4 rounded-full grow-0 cursor-pointer ${
                  activeSlider === 'day'
                    ? 'bg-derma-primary500 text-hg-secondary100'
                    : 'text-derma-primary'
                }`}
                onClick={() => setActiveSlider('day')}
              >
                Rutina día
              </li>
              <li
                className={`transition-all text-xs py-2 px-4 rounded-full grow-0 cursor-pointer ${
                  activeSlider === 'night'
                    ? 'bg-derma-primary500 text-hg-secondary100'
                    : 'text-derma-primary'
                }`}
                onClick={() => setActiveSlider('night')}
              >
                Rutina noche
              </li>
            </ul>
          </Flex>
          <ul className="flex flex-col gap-4 mb-8 w-full">
            {ROUTINES[activeSlider].map(routine => (
              <li
                key={routine.text}
                className="flex items-start justify-start gap-4"
              >
                <div className="bg-derma-primary500/30 p-2 rounded-full">
                  <DynamicIcon
                    name={routine.icon}
                    className="text-derma-primary"
                  />
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: routine.text }}
                  className="text-xs text-left"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hidden md:block">
        <Text className="text-lg font-semibold mb-2">Rutina día</Text>

        <ul className="flex flex-col gap-4 mb-8 w-full">
          {ROUTINES.day.map(routine => (
            <li
              key={routine.text}
              className="flex items-center justify-start gap-4"
            >
              <div className="bg-derma-primary500/30 p-2 rounded-full">
                <DynamicIcon
                  name={routine.icon}
                  className="text-derma-primary"
                />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: routine.text }}
                className="text-sm text-left"
              />
            </li>
          ))}
        </ul>

        <Text className="text-lg font-semibold mb-2">Rutina noche</Text>
        <ul className="flex flex-col gap-4 mb-8 w-full">
          {ROUTINES.night.map(routine => (
            <li
              key={routine.text}
              className="flex items-start justify-start gap-4"
            >
              <div className="bg-derma-primary500/30 p-2 rounded-full">
                <DynamicIcon
                  name={routine.icon}
                  className="text-derma-primary"
                />
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: routine.text }}
                className="text-sm text-left"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/50 p-4 text-xs rounded-2xl w-full">
        <Text className="font-semibold mb-2">¡No olvides ser constante!</Text>
        <Text>Sigue la rutina cada día para ver unos resultados óptimos.</Text>
      </div>
    </>
  );
}
