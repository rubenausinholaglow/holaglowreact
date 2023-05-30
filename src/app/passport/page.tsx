import Header from './Header';
import Treatments from './Treatments';
import Recomendations from './Recomendations';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import Doubts from './Doubts';

/* const fetchBudgetData = async (id: number) => {
  try {
    const budgetResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/budget?id=${id}`, {
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
}; */

export default async function Budget({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  /* const budgetID: any = searchParams.id;
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
  */

  return (
    <main className='text-hg-500'>
      <div className='flex flex-col w-[750px] mx-auto'>
        <Header />
        <Treatments />
        <Recomendations />
        <Issues />
        <PendingBonus />
        <Doubts />
      </div>
    </main>
  );
}
