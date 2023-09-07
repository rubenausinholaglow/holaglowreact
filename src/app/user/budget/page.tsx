import Footer from '../Footer';
import { type Product as ProductType } from '../types';
import Header from './Header';
import Legal from './Legal';
import PaymentOptions from './PaymentOptions';
import Products from './Products';
import PromoCode from './PromoCode';
import Simulation from './Simulation';

const fetchBudgetData = async (id: string) => {
  try {
    const budgetResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CONTACTS_API}budget?id=${id}`,
      {
        cache: 'no-store',
      }
    );

    if (!budgetResponse) {
      throw new Error('Network response was not OK');
    }

    const budgetData = await budgetResponse.json();
    return budgetData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function Budget({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const budgetID = searchParams.id;

  let budgetData;

  if (typeof budgetID === 'string') {
    budgetData = await fetchBudgetData(budgetID);
  }

  const {
    clinicInfo = null,
    products = null,
    totalPrice = null,
    totalPriceWithIVA = null,
    simulations = null,
    discountCode = null,
    referenceId = null,
    creationDate = null,
    priceDiscount = null,
    percentageDiscount = null,
    manualPrice = null,
  } = budgetData ? budgetData : {};

  const productsWithDiscountPrice = products.map((product: ProductType) => {
    let priceWithDiscount = product.price;

    if (product.priceDiscount > 0) {
      priceWithDiscount = product.priceDiscount;
    }

    if (product.percentageDiscount > 0) {
      priceWithDiscount =
        priceWithDiscount - priceWithDiscount * product.percentageDiscount;
    }

    return {
      ...product,
      priceWithDiscount: priceWithDiscount,
    };
  });

  const totalProductsPrice = productsWithDiscountPrice.reduce(
    (total: number, product: ProductType) => {
      if (product.priceWithDiscount) {
        return total + product.priceWithDiscount;
      }

      return total;
    },
    0
  );

  const budgetTotalPriceWithDiscount = () => {
    let total = totalProductsPrice;

    if (manualPrice > 0) {
      total = manualPrice;
    }

    if (priceDiscount > 0) {
      total = total - priceDiscount;
    }

    if (percentageDiscount > 0) {
      total = total - total * percentageDiscount;
    }

    return total;
  };

  return (
    <div className="flex flex-col text-hg-black">
      {products && simulations ? (
        <>
          <Header clinicInfo={clinicInfo} />
          <hr className="bg-hg-lime h-[4px] border-0" />

          {products.length > 0 && (
            <Products
              products={products}
              referenceId={referenceId}
              creationDate={creationDate}
              priceDiscount={priceDiscount}
              percentageDiscount={percentageDiscount}
              manualPrice={manualPrice}
              productsWithDiscountPrice={productsWithDiscountPrice}
              totalProductsPrice={totalProductsPrice}
              budgetTotalPriceWithDiscount={budgetTotalPriceWithDiscount()}
            />
          )}
          <PaymentOptions totalPrice={budgetTotalPriceWithDiscount()} />
          {simulations.length > 0 && <Simulation simulations={simulations} />}
          <PromoCode discountCode={discountCode} discountAmount={50} />
          <Legal />
          <Footer clinicInfo={clinicInfo} />
        </>
      ) : (
        <p className="p-8">Budget unavailable: some data is missing</p>
      )}
    </div>
  );
}
