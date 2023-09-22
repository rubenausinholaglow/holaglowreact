import { Product } from '@interface/product';
import { PaymentTable } from 'app/user/budget/PaymentOptions';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductPaymentOptions({
  totalPrice,
}: {
  totalPrice: number;
}) {
  return (
    <Container className="bg-[url('/images/product/paymentOptions.png')] md:bg-[url('/images/product/paymentOptions-desktop.png')] bg-cover bg-center md:rounded-3xl">
      <Flex className="md:gap-16">
        <div className="w-1/2"></div>
        <div className="w-1/2 py-8 md:py-12">
          <PaymentTable totalPrice={totalPrice} tableStyles="md:w-1/2" />
        </div>
      </Flex>
    </Container>
  );
}
