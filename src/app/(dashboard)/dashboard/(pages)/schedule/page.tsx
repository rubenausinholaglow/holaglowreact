'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { fetchClinics, fetchProducts } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import CheckoutClinicSelector from 'app/(web)/checkout/components/CheckoutClinicSelector';
import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import { useCartStore } from '../budgets/stores/userCartStore';

export default function Page() {
  const {
    stateProducts,
    clinics,
    storedClinicId,
    setClinics,
    setStateProducts,
    setDashboardProducts,
  } = useGlobalPersistedStore(state => state);
  const {
    selectedClinic,
    setSelectedClinic,
    selectedTreatments,
    setSelectedTreatments,
  } = useSessionStore(state => state);
  const cart = useCartStore(state => state.cart);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const ROUTES = useRoutes();

  useEffect(() => {
    setStateProducts([]);
    setDashboardProducts([]);
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getDashboardProducts(true);
        const products = data.map((product: Product) => ({
          ...product,
          visibility: true,
        }));
        products.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setDashboardProducts(products);
      } catch (error: any) {
        console.log('error');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
    const clinic = clinics.filter(clinic => clinic.id === storedClinicId);

    setSelectedClinic(clinic[0]);
  }, [clinics]);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts({ isDerma: false });
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }
    const allCategoryNames: string[] = stateProducts.reduce(
      (categoryNames: string[], product) => {
        const productCategories = product.category.map(
          category => category.name
        );
        return [...categoryNames, ...productCategories];
      },
      []
    );

    const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

    setProductCategories(uniqueCategoryNames);
    setTreatments();
  }, [stateProducts]);

  async function setTreatments() {
    try {
      setSelectedTreatments([]);
      const validTypes = [1, 2, 5, 7];
      const productsInCart: Product[] = cart
        .filter(cartItem => validTypes.includes(cartItem.type))
        .map(cartItem => {
          const productInCart: Product = {
            id: cartItem.id,
            title: cartItem.title,
            description: cartItem.description,
            detail: cartItem.detail,
            price: cartItem.price,
            isPack: cartItem.isPack,
            zone: cartItem.zone,
            order: cartItem.order,
            upgrades: cartItem.upgrades,
            category: cartItem.category,
            appliedProducts: cartItem.appliedProducts,
            clinicDetail: cartItem.clinicDetail,
            cardBackgroundColor: cartItem.cardBackgroundColor,
            extraInformation: cartItem.extraInformation,
            preTreatmentInfo: cartItem.preTreatmentInfo,
            postTreatmentInfo: cartItem.postTreatmentInfo,
            packUnities: cartItem.packUnities,
            discounts: cartItem.discounts,
            tags: cartItem.tags,
            packMoreInformation: cartItem.packMoreInformation,
            relatedProducts: cartItem.relatedProducts,
            flowwwId: cartItem.flowwwId,
            durationMin: cartItem.durationMin,
            durationMax: cartItem.durationMax,
            beforeAndAfterImages: cartItem.beforeAndAfterImages,
            applicationTimeMinutes: cartItem.applicationTimeMinutes,
            type: cartItem.type,
            visibility: cartItem.visibility,
            sessions: cartItem.sessions,
            productCardImagePosition: cartItem.productCardImagePosition,
            longDescription: cartItem.longDescription,
            numProductCardPhotos: cartItem.numProductCardPhotos,
            videoUrl: cartItem.videoUrl,
            emlaType: cartItem.emlaType,
          };

          return productInCart;
        });

      setSelectedTreatments(productsInCart);
    } catch (error: any) {
      Bugsnag.notify(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <App>
      <MainLayout isDashboard>
        <Container className="mt-4">
          {!selectedClinic && (
            <>
              <Title className="font-semibold mb-8">Selecciona clínica</Title>

              <CheckoutClinicSelector isDashboard className="mb-8" />
            </>
          )}

          {selectedClinic && (
            <>
              <Title className="font-semibold mb-8">
                {cart.length == 0 ? 'Selecciona tratamiento' : 'Tratamientos'}
              </Title>
              <Flex layout="col-left" className="gap-3 w-full">
                {!isEmpty(productCategories) && !isLoading ? (
                  <TreatmentAccordionSelector isDashboard />
                ) : (
                  <SvgSpinner className="w-full mb-4" />
                )}
              </Flex>

              <Button
                onClick={() => {
                  if (selectedTreatments.length > 0) {
                    router.push(
                      `${ROUTES.dashboard.checkIn.agenda}?isCheckin=false`
                    );
                  }
                }}
                disabled={selectedTreatments.length == 0}
              >
                Continuar
              </Button>
            </>
          )}
        </Container>
      </MainLayout>
    </App>
  );
}
