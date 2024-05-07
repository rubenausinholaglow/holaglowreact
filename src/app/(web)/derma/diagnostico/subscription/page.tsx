import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCross } from 'app/icons/IconsDs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function Subscription() {
  return (
    <div className="bg-derma-secondary300 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <Container className="pb-12">
          <Title className="text-derma-primary font-thin mb-4">
            Gestiona tu suscripción
          </Title>

          <Flex
            layout="col-left"
            className="w-full p-4 bg-white rounded-2xl mb-4"
          >
            <Flex className="items-start">
              <div>
                <Text className="font-semibold">Suscripción trimestral</Text>
                <Text className="text-sm mb-6 text-hg-black500">
                  Rutina facial personalizada para <b>Melasma</b>
                </Text>
              </div>
              <Text className="bg-hg-green text-white px-2 py-1 rounded-md text-sm font-thin ml-4 shrink-0">
                activa
              </Text>
            </Flex>

            <ul className="flex flex-col gap-3 w-full text-xs">
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Precio</Text>
                <Text className="text-hg-black500 font-semibold">75€</Text>
              </li>
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Fecha de renovación</Text>
                <Text className="text-derma-primary font-semibold">
                  01/06/2024
                </Text>
              </li>
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Fecha límite de baja</Text>
                <Text className="text-hg-black500 font-semibold">
                  01/09/2024
                </Text>
              </li>
            </ul>
            <Button type="white" className="mt-8 ml-auto">
              Cancelar suscripción
              <SvgCross className="h-3 w-3 ml-2" />
            </Button>
          </Flex>

          <Flex
            layout="col-left"
            className="w-full p-4 bg-white rounded-2xl mb-4"
          >
            <Flex className="items-start">
              <div>
                <Text className="font-semibold">Suscripción trimestral</Text>
                <Text className="text-sm mb-6 text-hg-black500">
                  Rutina facial personalizada para <b>Melasma</b>
                </Text>
              </div>
              <Text className="bg-hg-error text-white px-2 py-1 rounded-md text-sm font-thin ml-4 shrink-0">
                cancelada
              </Text>
            </Flex>

            <ul className="flex flex-col gap-3 w-full text-xs">
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Precio</Text>
                <Text className="text-hg-black500 font-semibold">75€</Text>
              </li>
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Fecha de renovación</Text>
                <Text className="text-derma-primary font-semibold">
                  01/06/2024
                </Text>
              </li>
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Fecha límite de baja</Text>
                <Text className="text-hg-black500 font-semibold">
                  01/09/2024
                </Text>
              </li>
            </ul>
          </Flex>

          <Flex
            layout="col-left"
            className="w-full p-4 bg-white rounded-2xl mb-4"
          >
            <Text className="font-semibold">Compra única</Text>
            <Text className="text-sm mb-6 text-hg-black500">
              Rutina facial personalizada durante 3 meses para <b>Acné</b>
            </Text>
            <ul className="flex flex-col gap-3 w-full text-xs">
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Precio</Text>
                <Text className="text-hg-black500 font-semibold">99€</Text>
              </li>
              <li className="w-full flex justify-between items-center">
                <Text className="text-hg-black400">Fecha de compra</Text>
                <Text className="text-derma-primary font-semibold">
                  01/06/2024
                </Text>
              </li>
            </ul>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
