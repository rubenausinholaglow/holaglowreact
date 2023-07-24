import Footer from '../Footer';
import AlmaPayment from './AlmaPayment';
import Header from './Header';
import Legal from './Legal';
import Products from './Products';
import PromoCode from './PromoCode';
import Simulation from './Simulation';

const fetchBudgetData = async (id: number) => {
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
  const budgetID = Number(searchParams.id);
  const budgetData = await fetchBudgetData(budgetID);

  const {
    clinicInfo = null,
    products = null,
    totalPrice = null,
    totalPriceWithIVA = null,
    simulations = null,
    discountCode = null,
    discountAmount = null,
    referenceId = null,
    creationDate = null,
  } = budgetData ? budgetData : {};

  return (
    <div className="flex flex-col text-hg-black">
      {products && simulations ? (
        <>
          <Header clinicInfo={clinicInfo} />
          <hr className="bg-hg-lime h-[4px] border-0" />

          {products.length > 0 && (
            <Products
              products={products}
              totalPrice={totalPrice}
              totalPriceWithIVA={totalPriceWithIVA}
              referenceId={referenceId}
              creationDate={creationDate}
            />
          )}
          <AlmaPayment totalPrice={totalPriceWithIVA} />
          {simulations.length > 0 && <Simulation simulations={simulations} />}
          <PromoCode
            discountCode={discountCode}
            discountAmount={discountAmount}
          />
          <Legal />
          <Footer clinicInfo={clinicInfo} />
        </>
      ) : (
        <p className="p-8">Budget unavailable: some data is missing</p>
      )}
    </div>
  );
}
