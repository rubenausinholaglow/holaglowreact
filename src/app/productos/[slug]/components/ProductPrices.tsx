import Select from 'react-select';
import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
import * as icon from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

const UPGRADE_TYPES: Record<
  string,
  {
    title: string;
    icon: string;
  }
> = {
  '0': {
    title: 'Ácido Hialurónico',
    icon: 'Injection',
  },
  '1': {
    title: 'BabyBotox',
    icon: 'Injection',
  },
  '2': {
    title: 'Botox',
    icon: 'Injection',
  },
  '3': {
    title: 'Piel',
    icon: 'Injection',
  },
  '4': {
    title: 'Piel Profunda',
    icon: 'Injection',
  },
  '5': {
    title: 'Vitaminas',
    icon: 'Medicine',
  },
};

function upgradeItem(item: any) {
  const iconComponentName = `Svg${UPGRADE_TYPES[item.type.toString()].icon}`;
  const IconComponent = (icon as any)[iconComponentName] || null;

  return (
    <Flex layout="row-left">
      <IconComponent
        height={16}
        width={16}
        className="text-hg-secondary mr-2"
      />
      <Text>{UPGRADE_TYPES[item.type.toString()].title}</Text>
    </Flex>
  );
}

export default function ProductPrices({ product }: { product: Product }) {
  const router = useRouter();
  const { deviceSize } = useGlobalPersistedStore(state => state);

  const selectOptions = [
    { value: 'codigo-de-barras', label: 'Código de barras' },
    { value: 'labios', label: 'Labios' },
    { value: 'menton', label: 'Mentón' },
    { value: 'ojeras', label: 'Ojeras' },
  ];

  const isSessionProduct = product.upgrades?.every(upgrade => {
    const regex = / x /;
    return regex.test(upgrade.product.title);
  });

  return (
    <div
      className="bg-gradient from-hg-secondary500 to-hg-primary300"
      id="prices"
    >
      <Container className="py-12">
        <Title size="2xl" className="font-bold mb-6">
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            Personaliza
          </Underlined>{' '}
          tu experiencia
        </Title>

        <Flex layout="col-left" className="md:flex-row mb-8 gap-8">
          {!isSessionProduct && !product.isPack && (
            <>
              <Flex className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary">
                <Accordion isOpen>
                  <AccordionItem value="accordion">
                    <AccordionTrigger>
                      <Flex layout="col-left" className="p-3">
                        <Flex layout="row-between" className="w-full">
                          <Text
                            size="xl"
                            className="text-hg-secondary font-semibold"
                          >
                            {product.price} €
                          </Text>
                          <Flex layout="row-right">
                            <Text
                              size="xs"
                              className="py-1 px-2 bg-hg-pink/20 text-hg-pink rounded-md"
                            >
                              Básico
                            </Text>

                            <SvgAdd
                              height={24}
                              width={24}
                              className="ml-4 group-radix-state-open:hidden"
                            />
                            <SvgMinus
                              height={24}
                              width={24}
                              className="ml-4 hidden group-radix-state-open:block"
                            />
                          </Flex>
                        </Flex>
                        <Text className="font-semibold">{product.title}</Text>
                      </Flex>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2">
                        <Flex
                          layout="col-left"
                          className="bg-hg-black50 p-3 gap-4 rounded-xl"
                        >
                          <Flex layout="row-left">
                            <SvgInjection
                              height={16}
                              width={16}
                              className="text-hg-secondary mr-2"
                            />
                            <Text>{product.description}</Text>
                          </Flex>

                          <Button
                            type="tertiary"
                            customStyles="bg-hg-primary"
                            onClick={() => {
                              router.push(`/checkout/clinic`);
                            }}
                            className="mt-4"
                          >
                            Reservar cita
                            <SvgArrow height={16} width={16} className="ml-2" />
                          </Button>
                        </Flex>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Flex>

              {product.upgrades?.map((upgrade: any) => {
                const { product }: { product: Product } = upgrade;

                return (
                  <Flex
                    key={product.id}
                    className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
                  >
                    <Accordion>
                      <AccordionItem value="accordion">
                        <AccordionTrigger>
                          <Flex layout="col-left" className="p-3">
                            <Flex layout="row-between" className="w-full">
                              <Text
                                size="xl"
                                className="text-hg-secondary font-semibold"
                              >
                                {product.price} €
                              </Text>
                              <Flex layout="row-right">
                                <Text
                                  size="xs"
                                  className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                                >
                                  Upgrade
                                </Text>
                                <SvgAdd
                                  height={24}
                                  width={24}
                                  className="ml-4 group-radix-state-open:hidden"
                                />
                                <SvgMinus
                                  height={24}
                                  width={24}
                                  className="ml-4 hidden group-radix-state-open:block"
                                />
                              </Flex>
                            </Flex>
                            <Text className="font-semibold">
                              {product.title}
                            </Text>
                          </Flex>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pt-2">
                            <Flex
                              layout="col-left"
                              className="bg-hg-black50 p-3 gap-2 rounded-xl"
                            >
                              {product.packUnities.map(item =>
                                upgradeItem(item)
                              )}

                              <Accordion>
                                <AccordionItem value="accordion">
                                  <AccordionContent>
                                    <p className="pl-5 pt-3 pb-0">
                                      {product?.packMoreInformation}
                                    </p>
                                  </AccordionContent>
                                  <AccordionTrigger>
                                    <span className="text-hg-secondary underline block text-left pt-3 pl-5">
                                      + info
                                    </span>
                                  </AccordionTrigger>
                                </AccordionItem>
                              </Accordion>

                              <Button
                                type="tertiary"
                                customStyles="bg-hg-primary"
                                className="mt-4"
                              >
                                Reservar cita
                                <SvgArrow
                                  height={16}
                                  width={16}
                                  className="ml-2"
                                />
                              </Button>
                            </Flex>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Flex>
                );
              })}
            </>
          )}

          {isSessionProduct && deviceSize.isMobile && (
            <Flex
              layout="col-left"
              className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
            >
              <Text className="font-semibold p-3">
                {product.title.slice(0, -4)}
              </Text>

              <Flex layout="col-left" className="pt-2 gap-4 w-full">
                <Flex
                  layout="row-between"
                  className="items-start bg-hg-black50 p-3 gap-4 rounded-xl w-full"
                >
                  <div>
                    <Text
                      size="xl"
                      className="text-hg-secondary font-semibold mb-2"
                    >
                      {product.price} €
                    </Text>
                    <Flex className="text-sm">
                      <icon.SvgTimeLeft
                        className="text-hg-secondary mr-2"
                        height={16}
                        width={16}
                      />
                      {product.sessions}{' '}
                      {product.sessions === 1 ? 'sesión' : 'sesiones'}
                    </Flex>
                  </div>
                  <Button
                    type="tertiary"
                    customStyles="bg-hg-primary"
                    onClick={() => {
                      router.push(`/checkout/clinic`);
                    }}
                  >
                    Reservar cita
                    <SvgArrow height={16} width={16} className="ml-2" />
                  </Button>
                </Flex>

                {product.upgrades?.map((upgrade, index) => {
                  return (
                    <Flex
                      key={`session-${index + 1}`}
                      layout="row-between"
                      className="items-start bg-hg-black50 p-3 gap-4 rounded-xl w-full"
                    >
                      <div>
                        <Text
                          size="xl"
                          className="text-hg-secondary font-semibold mb-2"
                        >
                          {upgrade.product.price} €
                        </Text>
                        <Flex className="text-sm">
                          <icon.SvgTimeLeft
                            className="text-hg-secondary mr-2"
                            height={16}
                            width={16}
                          />
                          {upgrade.product.sessions}{' '}
                          {upgrade.product.sessions === 1
                            ? 'sesión'
                            : 'sesiones'}
                        </Flex>
                      </div>
                      <Button
                        type="tertiary"
                        customStyles="bg-hg-primary"
                        onClick={() => {
                          router.push(`/checkout/clinic`);
                        }}
                      >
                        Reservar cita
                        <SvgArrow height={16} width={16} className="ml-2" />
                      </Button>
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
          )}

          {isSessionProduct && !deviceSize.isMobile && (
            <>
              <Flex
                layout="col-left"
                className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
              >
                <Text className="font-semibold p-3">
                  {product.title.slice(0, -4)}
                </Text>

                <Flex layout="col-left" className="pt-2 gap-4 w-full">
                  <Flex
                    layout="row-between"
                    className="items-start bg-hg-black50 p-3 gap-4 rounded-xl w-full"
                  >
                    <div>
                      <Text
                        size="xl"
                        className="text-hg-secondary font-semibold mb-2"
                      >
                        {product.price} €
                      </Text>
                      <Flex className="text-sm">
                        <icon.SvgTimeLeft
                          className="text-hg-secondary mr-2"
                          height={16}
                          width={16}
                        />
                        {product.sessions}{' '}
                        {product.sessions === 1 ? 'sesión' : 'sesiones'}
                      </Flex>
                    </div>
                    <Button
                      type="tertiary"
                      customStyles="bg-hg-primary"
                      onClick={() => {
                        router.push(`/checkout/clinic`);
                      }}
                    >
                      Reservar cita
                      <SvgArrow height={16} width={16} className="ml-2" />
                    </Button>
                  </Flex>
                </Flex>
              </Flex>

              {product.upgrades?.map((upgrade, index) => {
                return (
                  <Flex
                    key={`session-${index + 1}`}
                    layout="col-left"
                    className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
                  >
                    <Text className="font-semibold p-3">
                      {product.title.slice(0, -4)}
                    </Text>

                    <Flex layout="col-left" className="pt-2 gap-4 w-full">
                      <Flex
                        layout="row-between"
                        className="items-start bg-hg-black50 p-3 gap-4 rounded-xl w-full"
                      >
                        <div>
                          <Text
                            size="xl"
                            className="text-hg-secondary font-semibold mb-2"
                          >
                            {upgrade.product.price} €
                          </Text>
                          <Flex className="text-sm">
                            <icon.SvgTimeLeft
                              className="text-hg-secondary mr-2"
                              height={16}
                              width={16}
                            />
                            {upgrade.product.sessions}{' '}
                            {upgrade.product.sessions === 1
                              ? 'sesión'
                              : 'sesiones'}
                          </Flex>
                        </div>
                        <Button
                          type="tertiary"
                          customStyles="bg-hg-primary"
                          onClick={() => {
                            router.push(`/checkout/clinic`);
                          }}
                        >
                          Reservar cita
                          <SvgArrow height={16} width={16} className="ml-2" />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </>
          )}

          {product.isPack && (
            <Flex layout="col-left" className="w-full gap-4">
              <Flex
                layout="col-left"
                className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary"
              >
                <Flex layout="row-between" className="w-full p-2 mb-4">
                  <Text size="xl" className="font-semibold text-hg-secondary">
                    1.299 €
                  </Text>
                  <Text
                    size="xs"
                    className="py-1 px-2 bg-hg-orange/20 text-hg-orange rounded-md"
                  >
                    Upgrade
                  </Text>
                </Flex>

                <Flex
                  layout="col-left"
                  className="bg-hg-black50 p-3 gap-2 rounded-xl w-full"
                >
                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        borderRadius: '12px',
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      singleValue: (baseStyles, state) => ({
                        ...baseStyles,
                        color: state.hasValue
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black300']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />

                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />
                  <Flex layout="row-left">
                    <SvgInjection
                      height={16}
                      width={16}
                      className="text-hg-secondary mr-2"
                    />
                    <Text className="font-semibold">{product.title}</Text>
                  </Flex>

                  <Select
                    options={selectOptions}
                    className="w-full mb-2"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        background: state.hasValue
                          ? 'url("/images/forms/formCheck.svg") no-repeat center right 6px'
                          : 'url("/images/forms/formAngle.svg") no-repeat center right 6px',
                        borderColor: state.isFocused
                          ? `${HOLAGLOW_COLORS['secondary']}`
                          : `${HOLAGLOW_COLORS['black']}`,
                      }),
                      indicatorSeparator: () => ({ display: 'none' }),
                      indicatorsContainer: () => ({ display: 'none' }),
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>

        <Flex className="bg-white/30 md:bg-transparent p-4 rounded-xl w-full md:w-auto gap-8 justify-center">
          <Text>Comparte</Text>
          <icon.SvgInstagram />
          <icon.SvgFacebook />
          <icon.SvgX />
          <icon.SvgShare />
        </Flex>
      </Container>
    </div>
  );
}
