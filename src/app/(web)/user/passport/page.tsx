import Footer from '../Footer';
import Doubts from './Doubts';
import Header from './Header';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import ProductsUsed from './ProductsUsed';
import Recomendations from './Recomendations';
import Treatments from './Treatments';

const fetchPassportData = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_CONTACTS_API}/BeautyPass?id=${id}`;
    console.log(url);
    const passportResponse = await fetch(
      url,

      {
        cache: 'no-store',
      }
    );

    console.log(passportResponse);

    if (!passportResponse) {
      throw new Error('Network response was not OK');
    }

    const passPortData = await passportResponse.json();

    return passPortData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function Passport({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const passportID = searchParams.id as string;
  const passportData = await fetchPassportData(passportID);
  console.log(passportData);

  const {
    appointment = null,
    previousAppointments = null,
    pendingVouchers = null,
  } = passportData ? passportData : {};

  return (
    <main className="flex flex-col w-[750px] mx-auto text-hg-black">
      {appointment ? (
        <>
          <Header />
          <Treatments
            appointment={appointment}
            previousAppointments={previousAppointments}
          />
          <ProductsUsed productsUsed={appointment.productsUsed} />
          <Recomendations appointment={appointment} />
          <Issues appointment={appointment} />
          <PendingBonus pendingVouchers={pendingVouchers} />
          <Doubts />
          <Footer clinicInfo={appointment.clinic} />
        </>
      ) : (
        <p className="p-8">Passport unavailable: some data is missing</p>
      )}
    </main>
  );
}
