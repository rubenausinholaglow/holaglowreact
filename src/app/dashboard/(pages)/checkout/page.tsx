'use client';

import { useEffect, useState } from 'react';
import { Budget } from '@interface/budget';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { ERROR_POST } from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { Title } from 'components/Texts';
import router from 'next/router';

import { CartTotal } from '../budgets/minicart/Cart';
import { useCartStore } from '../budgets/stores/userCartStore';
import ProductCard from '../budgets/treatments/ProductCard';
import ProductDiscountForm from './components/ProductDiscountForm';

const Page = () => {
  const cart = useCartStore(state => state.cart);

  const [GuidUser, SetGuidUser] = useState('');
  const [GuidClinic, SetGuidClinic] = useState('');
  const [GuidProfessional, SetGuidProfessional] = useState('');

  useEffect(() => {
    SetGuidUser(localStorage.getItem('id') || '');
    SetGuidClinic(localStorage.getItem('ClinicId') || '');
    SetGuidProfessional(localStorage.getItem('ClinicProfessionalId') || '');
  }, []);

  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.price * (product.quantity as number),
      0
    );
  }

  console.log(cart);

  return (
    <Container>
      <Flex layout="col-left">
        <Title size="xl" className="text-left mb-4">
          Resumen
        </Title>

        <ul className="w-full">
          {cart?.map(product => (
            <li key={product.id} className="mb-4">
              <ProductCard isCheckout product={product} />
            </li>
          ))}
        </ul>
      </Flex>
      <Flex layout="col-left">
        <CartTotal isCheckout />
        <ProductDiscountForm />
      </Flex>
    </Container>
  );
};

export default Page;
