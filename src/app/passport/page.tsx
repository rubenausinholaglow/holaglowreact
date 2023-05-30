import Header from './Header';
import Treatments from './Treatments';
import Recomendations from './Recomendations';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import Doubts from './Doubts';
import Footer from './Footer';

const fetchPassportData = async (id: number) => {
  try {
    const budgetResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/budget?id=${id}`, {
      cache: 'no-store',
    });

    if (!budgetResponse) {
      throw new Error('Network response was not OK');
    }

    const passportData = await budgetResponse.json();
    return passportData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function Budget({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  /* const budgetID: any = searchParams.id;
   */
  const passportData = await fetchPassportData(199);

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
  } = passportData ? passportData : {};

  return (
    <main className='text-hg-500'>
      <div className='flex flex-col w-[750px] mx-auto'>
        <Header />
        <Treatments />
        <Recomendations />
        <Issues />
        <PendingBonus />
        <Doubts />
        <Footer clinicInfo={clinicInfo} />
      </div>
    </main>
  );
}
