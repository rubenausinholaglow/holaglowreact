'use client';

import { useState } from 'react';
import FinanceService from '@services/FinanceService';
import ROUTES from '@utils/routes';
import { SvgSpinner } from 'app/icons/Icons';
import {
  SvgCheckSquare,
  SvgCheckSquareActive,
  SvgCross,
} from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'designSystem/Dialog/Dialog';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

const ROUTINES = ['Antiaging', 'Acné', 'Rosácea', 'Melasma'];

const cancelReasons = [
  'Ya he conseguido mis objetivos',
  'No he visto mejoras en mi piel',
  'He tenido problemas con los envíos',
  'Me parece muy caro',
  'La atención no ha sido lo que buscaba',
  'Otros',
];

export default function SubscriptionCard({
  subscriptionData,
  pain,
}: {
  subscriptionData: any;
  pain: number;
}) {
  const router = useRouter();

  const [reasons, setReasons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelSubscription = async () => {
    await FinanceService.cancelSubscription(subscriptionData.referenceId, 2);

    setIsLoading(true);

    setTimeout(() => {
      location.reload();
    }, 250);
  };

  return (
    <Flex
      layout="col-left"
      className="w-full p-4 bg-white rounded-2xl border border-derma-secondary500"
    >
      <Flex layout="row-between" className="items-start w-full">
        <div>
          <Text className="font-semibold">Suscripción trimestral</Text>
          <Text className="text-sm mb-6 text-hg-black500">
            Rutina facial personalizada para {ROUTINES[pain]}
          </Text>
        </div>
        {subscriptionData.status === 1 && subscriptionData.active && (
          <Text className="bg-hg-green text-white px-2 py-1 rounded-md text-sm font-thin ml-4 shrink-0">
            activa
          </Text>
        )}

        {subscriptionData.status === 2 && subscriptionData.active && (
          <Text className="bg-hg-error text-white px-2 py-1 rounded-md text-sm font-thin ml-4 shrink-0">
            cancelada
          </Text>
        )}
      </Flex>

      <ul className="flex flex-col gap-2 w-full text-xs">
        <li className="w-full flex justify-between items-center">
          <Text className="text-hg-black400">Precio</Text>
          <Text className="text-hg-black500 font-semibold">75€</Text>
        </li>
        <li className="w-full flex justify-between items-center">
          <Text className="text-hg-black400">Fecha de renovación</Text>
          <Text className="text-derma-primary font-semibold">
            {dayjs(subscriptionData.creationDate)
              .add(3, 'month')
              .format('DD/MM/YYYY')}
          </Text>
        </li>
      </ul>
      {subscriptionData.status === 1 && subscriptionData.active && (
        <div className="self-end">
          <Dialog>
            <DialogTrigger>
              <Flex layout="row-center" className="w-full">
                <Button type="white" className="mt-8 ml-auto">
                  Cancelar suscripción
                  <SvgCross className="h-3 w-3 ml-2" />
                </Button>
              </Flex>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[500px] bg-derma-secondary300">
              <div className="p-4">
                <Title className="font-gtUltra font-thin text-derma-primary pr-4 mb-4">
                  Explícanos los motivos por los que quieres cancelar tu
                  suscripción
                </Title>

                <ul className="flex flex-col gap-4 mb-4 text-sm">
                  {cancelReasons.map(reason => (
                    <li
                      className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                        reasons.includes(reason)
                          ? 'bg-derma-primary500/20'
                          : 'bg-derma-secondary400'
                      }`}
                      key={reason}
                      onClick={() => {
                        if (reasons.includes(reason)) {
                          setReasons(reasons.filter(item => item !== reason));
                        } else {
                          setReasons([...reasons, reason]);
                        }
                      }}
                    >
                      <Text>{reason}</Text>
                      {reasons.includes(reason) ? (
                        <SvgCheckSquareActive className="h-6 w-6" />
                      ) : (
                        <SvgCheckSquare className="h-6 w-6" />
                      )}
                    </li>
                  ))}
                </ul>

                <Button
                  size="xl"
                  type="whiteDerma"
                  onClick={() => handleCancelSubscription()}
                >
                  {isLoading ? (
                    <>
                      Cancelando
                      <SvgSpinner className="ml-4 h-8 w-8" />
                    </>
                  ) : (
                    <>
                      Cancelar suscripción
                      <SvgCross className="ml-4 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Flex>
  );
}
