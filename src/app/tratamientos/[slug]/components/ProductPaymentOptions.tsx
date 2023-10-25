import { PaymentTable } from 'app/user/budget/PaymentOptions';
import { Container, Flex } from 'designSystem/Layouts/Layouts';

export default function ProductPaymentOptions({
  totalPrice,
}: {
  totalPrice: number;
}) {
  return (
    <Container className="px-0 md:mt-16 md:px-4">
      <div className="bg-[url('/images/product/paymentOptions.png')] md:bg-[url('/images/product/paymentOptions-desktop.png')] bg-cover bg-center md:rounded-3xl">
        <Flex className="md:gap-16">
          <div className="w-1/2"></div>
          <div className="w-1/2 py-8 md:py-12 pr-4">
            <PaymentTable totalPrice={totalPrice} tableStyles="md:w-1/2" />
          </div>
        </Flex>
      </div>
    </Container>
  );
}
