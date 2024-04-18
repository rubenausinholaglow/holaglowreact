import { UpsellingData } from '@interface/upselling';
import { SvgReceiptEdit } from 'app/icons/Icons';
import { SvgArrow, SvgReceipt2, SvgUserSquare } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import DiagnosisImages from './DiagnosisImages';

dayjs.locale(spanishConf);

const mockedData = {
  images: [
    '/images/derma/multistep/Basart.png',
    '/images/derma/multistep/Basart.png',
    '/images/derma/multistep/Basart.png',
  ],
  professional: {
    name: 'Dr. Sonsoles Espí',
    imgSrc: '/images/derma/home/professionals/Sonsoles.png',
  },
  date: new Date('2024-04-17'),
  user: {
    name: 'Perico',
    surname: 'de los',
    secondSurname: 'palotes',
  },
  receipt: {
    expeditionDate: new Date('2024-04-27'),
    link: 'https://www.derma.holaglow.com',
  },
};

export default function FirstDiagnosis({ data }: { data: UpsellingData }) {
  const isReceiptDisabled = dayjs() > dayjs(data?.creationDate).add(10, 'day');

  return (
    <div className="overflow-hidden">
      <Flex
        layout="col-left"
        className="p-4 bg-white md:border border-derma-secondary400 rounded-2xl"
      >
        <Flex layout="row-left" className="w-full mb-6">
          <Image
            alt={mockedData.professional.name}
            height={48}
            width={48}
            src={mockedData.professional.imgSrc}
            className="rounded-full overflow-hidden mr-2"
          />
          <Text className="text-xs">
            <span className="font-semibold">
              {mockedData.professional.name}
            </span>
            {' · '}
            <span className="text-hg-black400">
              Publicado hace {dayjs().diff(dayjs(data.creationDate), 'day')}{' '}
              días
            </span>
          </Text>
        </Flex>
        <DiagnosisImages
          images={[data.photos[0], data.photos[1], data.photos[2]]}
          className="mb-4"
        />

        <div className="text-sm">
          <Text className="text-derma-primary mb-4 font-semibold">
            Hola {data.user.firstName}
          </Text>
          <Text className="mb-4">{data.diagnostic}</Text>
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
                {data?.user?.firstName} {data?.user?.lastName}{' '}
                {data?.user?.secondLastName}
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
              <Text className="text-hg-black500">Fecha expedición receta</Text>
              <Text className="text-derma-primary font-medium">
                {dayjs(data?.creationDate).format('DD/MM/YYYY')}
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
            href={data.receiptUrl}
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
            La receta tiene una validez de 10 días desde la fecha de emisión.
            Recuerda acudir a tu farmacia con la receta y tu documento de
            identidad para poder encargarla. Normalmente tardan unos 3 días en
            elaborarla y tiene un coste de entre 25 y 40€.
          </Text>
        </div>
      </Flex>
    </div>
  );
}
