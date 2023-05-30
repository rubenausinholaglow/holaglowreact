import Header from './Header';
import Products from './Products';
import AlmaPayment from './AlmaPayment';
import Simulation from './Simulation';
import PromoCode from './PromoCode';
import Legal from './Legal';
import Footer from './Footer';

const fetchBudgetData = async (id: number) => {
  try {
    const budgetResponse = await fetch(`https://holaglowcontactsapi.azurewebsites.net/budget?id=${id}`, {
      cache: 'no-store',
    });

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
  const budgetID: any = searchParams.id;
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
    <main className='text-hg-500'>
      {products && simulations ? (
        <div className='flex flex-col w-[750px] mx-auto'>
          <Header clinicInfo={clinicInfo} />
          <hr className='bg-gradient-to-r from-hg-500  to-[#FC44FB] to-70% h-[4px] border-0' />

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
          <PromoCode discountCode={discountCode} discountAmount={discountAmount} />
          {/* <Legal /> */}
          <Footer clinicInfo={clinicInfo} />
        </div>
      ) : (
        <p className='p-8'>Budget unavailable: some data is missing</p>
      )}
    </main>
  );
}
