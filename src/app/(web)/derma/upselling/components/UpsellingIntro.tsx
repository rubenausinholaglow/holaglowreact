import { UpsellingData } from '@interface/upselling';
import { SvgReceipt2, SvgReceiptEdit } from 'app/icons/Icons';
import { SvgArrow, SvgUserSquare } from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function UpsellingIntro({ data }: { data: UpsellingData }) {
  return (
    <Container>
      <Flex layout="col-left" className="w-full md:flex-row py-6 md:py-12">
        <Text className="font-gtUltraThin text-xl text-derma-primary text-center mb-8 md:text-left md:w-1/2 md:text-5xl md:font-gtUltraBold">
          ¡Ya tenemos tu fórmula personalizada!
        </Text>

        <div className="md:w-1/2">
          <Button
            size="lg"
            type="tertiary"
            className="w-full mb-4"
            customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2"
          >
            <SvgUserSquare className="h-8 w-8 mr-2 bg-derma-primary500/20 rounded-full p-1.5" />
            <Flex layout="col-left" className="w-full text-xs">
              <Text className="text-hg-black500">Paciente</Text>
              <Text className="text-derma-primary font-medium">
                {data.userName}
              </Text>
            </Flex>
          </Button>

          <Button
            size="lg"
            type="tertiary"
            className="w-full mb-4"
            customStyles="border-none bg-hg-black50 text-derma-primary font-normal justify-start p-5 pl-2"
          >
            <SvgReceipt2 className="h-8 w-8 mr-2 bg-derma-primary500/20 rounded-full p-1.5" />
            <Flex layout="col-left" className="w-full text-xs">
              <Text className="text-hg-black500">Fecha expedición receta</Text>
              <Text className="text-derma-primary font-medium">
                {dayjs(data.expeditionDate).format('DD/MM/YYYY')}
              </Text>
            </Flex>
          </Button>

          <Button
            size="xl"
            type="derma"
            className="w-full mb-4"
            customStyles="group font-normal justify-start pl-2 pr-4"
            href={data.receiptUrl}
            target="_blank"
          >
            <Flex
              layout="row-center"
              className="transition-all h-12 w-12 mr-2 bg-derma-primary500 rounded-full p-2 group-hover:bg-white"
            >
              <SvgReceiptEdit className="h-6 w-6" />
            </Flex>
            <Text>Ver receta (PDF)</Text>
            <SvgArrow className="ml-auto" />
          </Button>
        </div>
      </Flex>
    </Container>
  );
}
