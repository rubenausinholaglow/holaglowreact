'use client';

import { useRef, useState } from 'react';
import { Product } from '@interface/product';
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogWrapper,
} from 'app/(ssr)/homeSSR/components/Dialog';
import { SvgCross } from 'app/icons/IconsDs';
//import ModalSSR from 'app/(ssr)/homeSSR/components/ModalSSR';
import { Text } from 'designSystem/Texts/Texts';

import { useDeviceSizeSSR } from '../components/layout/Breakpoint';
import MobileFilters from './components/MobileFilters';

export default function Tratamientos({ products }: { products: Product[] }) {
  const deviceSize = useDeviceSizeSSR();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openModal, setOpenModal] = useState(false);

  /* 
  const {
    filteredProducts,
    setFilteredProducts,
    productFilters,
    setProductFilters,
    isModalOpen,
  } = useGlobalStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [showDashboardFilters, setShowDashboardFilters] = useState(true); 
  
  const metadataPacks = {
    title: 'Packs de tratamientos de medicina estética - Holaglow',
    description:
      'Elige uno de los packs para tratar de manera global tus objetivos estéticos y conseguir el resultado que deseas',
  };

  useEffect(() => {
    if (slug !== '') {
      if (slug !== 'packs') {
        let filterToApply = '';
        switch (slug) {
          case 'piel':
            filterToApply = 'Calidad de la Piel';
            break;
          case 'pelo':
            filterToApply = 'Caida del pelo';
            break;
          default:
            filterToApply =
              slug[0].toUpperCase() + slug.substr(1).toLowerCase();
            break;
        }
        const categoryExists = filterItems.some(x => {
          const exists = x.buttons.some(y => {
            if (y.value == filterToApply) return true;
          });
          return exists;
        });
        if (
          filterToApply &&
          productFilters.category.indexOf(filterToApply) == -1 &&
          categoryExists
        ) {
          if (filterToApply == 'Calidad de la Piel')
            filterToApply = 'Calidad Piel';
          productFilters.category.push(filterToApply);
        }
      } else {
        setSeoMetaData(metadataPacks.title, metadataPacks.description);
        productFilters.isPack = true;
      }
      setProductFilters(productFilters);
    }
  }, [slug, stateProducts]);
  
  useEffect(() => {
    processFilters();
    setIsHydrated(true);
  }, [productFilters]);

  useEffect(() => {
    if (!isModalOpen) {
      setIsMobileFiltersVisible(false);
    }
  }, [isModalOpen]);

  if (!isHydrated) {
    return <></>;
  }
  */

  /* function processFilters() {
    if (isDashboard) {
      if (isEmpty(filteredProducts)) {
        setFilteredProducts(dashboardProducts);
        setFilteredProducts(
          applyFilters({ products: dashboardProducts, filters: productFilters })
        );
      } else {
        setFilteredProducts(
          applyFilters({ products: filteredProducts, filters: productFilters })
        );
      }
    } else {
      if (isEmpty(filteredProducts)) {
        setFilteredProducts(stateProducts);
        setFilteredProducts(
          applyFilters({ products: stateProducts, filters: productFilters })
        );
      } else {
        setFilteredProducts(
          applyFilters({ products: filteredProducts, filters: productFilters })
        );
      }
    }
  } */

  return (
    <>
      <link rel="canonical" href="https://holaglow.com/tratamientos/" />

      <button onClick={() => setOpenModal(!openModal)}>Open modal</button>

      {/* <DialogModal ></DialogModal> */}

      <DialogWrapper>
        <DialogTrigger>obrir modal!</DialogTrigger>
        <DialogContent>
          <Text>OLAKEASE</Text>
          <DialogClose>
            <SvgCross />
          </DialogClose>
        </DialogContent>
      </DialogWrapper>

      {/*  <Dialog.Root open={openModal}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="bg-hg-black500 data-[state=open]:animate-overlayShow fixed inset-0"
            onClick={() => setOpenModal(!openModal)}
          />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
              Make changes to your profile here. Click save when youre done.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="Pedro Duarte"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@peduarte"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <SvgCross />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}
      {/* 
      <MobileFilters
        isVisible={isMobileFiltersVisible}
        setModalVisibility={setIsMobileFiltersVisible}
      />

      <div className="bg-hg-cream rounded-t-3xl overflow-hidden">
        <Container className="relative pt-8 pb-4">
          <Title
            isAnimated
            size="2xl"
            className="font-bold mb-6 lg:mb-12 lg:w-3/5 md:text-4xl lg:text-5xl"
          >
            Nuestros{' '}
            <Underlined color={HOLAGLOW_COLORS['secondary700']}>
              tratamientos
            </Underlined>
          </Title>
          <Image
            src={'/images/products/productsBg.png'}
            height={858}
            width={1395}
            alt="nuestros tratamientos"
            className="hidden lg:block absolute right-[5%] top-[10%] h-full w-auto scale-[160%]"
          />
        </Container>
        <Container className="px-0 md:px-4 pb-4 relative">
          <div className="lg:flex lg:flex-row lg:justify-between">
            <AnimateOnViewport
              origin={deviceSize.isMobile ? 'right' : 'bottom'}
            >
              <CategorySelector className="mb-4 lg:mb-0" />
            </AnimateOnViewport>
            <PackTypeFilter className="ml-4 md:ml-0" />
          </div>
        </Container>
      </div>
      {isEmpty(filteredProducts) && (
        <Flex layout="row-left" className="justify-center">
          <SvgSpinner
            fill={HOLAGLOW_COLORS['secondary']}
            height={50}
            width={50}
          />
        </Flex>
      )}
      {!isEmpty(filteredProducts) && (
        <div className="bg-hg-cream500 pb-32 relative">
          <Flex
            layout="row-left"
            className="justify-between py-8 md:py-0 md:mt-8 md:absolute w-full"
          >
            <Container>
              <AnimateOnViewport>
                <Flex layout="row-left" className="w-full justify-between">
                  <Button
                    type="tertiary"
                    size="sm"
                    className="mr-2"
                    customStyles="group-hover:bg-hg-secondary100"
                    onClick={() => {
                      deviceSize.isMobile
                        ? setIsMobileFiltersVisible(true)
                        : setShowDesktopFilters(!showDesktopFilters);
                    }}
                  >
                    <SvgFilters className="mr-2" />
                    <Flex layout="col-center">Filtrar</Flex>
                  </Button>

                  <div className="mr-auto">
                    <Text
                      size="xs"
                      className={`text-hg-secondary transition-opacity underline cursor-pointer ${
                        filterCount(productFilters) === 0
                          ? 'opacity-0'
                          : 'opacity-100'
                      }`}
                      onClick={() => {
                        setProductFilters({
                          isPack: false,
                          category: [],
                          zone: [],
                          clinic: [],
                          text: '',
                          price: [],
                          type: [],
                        });
                      }}
                    >
                      Borrar filtros ({filterCount(productFilters)})
                    </Text>
                  </div>
                  <Text size="xs">
                    {
                      filteredProducts.filter(product => product.visibility)
                        .length
                    }{' '}
                    productos
                  </Text>
                </Flex>
              </AnimateOnViewport>
            </Container>
          </Flex>

          <AccordionPrimitive.Root
            type="single"
            className="w-full bg-white"
            collapsible
            value={showDesktopFilters.toString()}
          >
            <AccordionPrimitive.Item value="true" className="w-full">
              <AccordionPrimitive.Content className="overflow-hidden w-full transition-all data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <Container className="pt-24 px-8 pb-12">
                  <DesktopFilters
                    showDesktopFilters={showDesktopFilters}
                    setShowDesktopFilters={setShowDesktopFilters}
                    isDashboard={false}
                  />
                </Container>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          </AccordionPrimitive.Root>

          <Container>
            <ul
              className={`transition-all grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-col gap-6 ${
                showDesktopFilters ? 'md:pt-12' : 'md:pt-24'
              }   pb-6`}
            >
              {filteredProducts.map(product => {
                if (product.visibility) {
                  return (
                    <li key={product.id}>
                      <ProductCard
                        product={product}
                        isDashboard={false}
                        className="h-full flex flex-col"
                      />
                    </li>
                  );
                }
              })}
            </ul>
          </Container>
        </div>
      )}

      <LookingFor /> */}
    </>
  );
}
