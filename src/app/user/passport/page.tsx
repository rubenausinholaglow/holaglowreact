import Header from './Header';
import Treatments from './Treatments';
import Recomendations from './Recomendations';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import Doubts from './Doubts';

const fetchPassportData = async (id: number) => {
  try {
    const passportResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/BeautyPass?id=${id}`, {
      cache: 'no-store',
    });

    if (!passportResponse) {
      throw new Error('Network response was not OK');
    }

    const passPortData = await passportResponse.json();
    return passPortData;
    console.log(passPortData);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function Passport({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const passportID: any = searchParams.id;
  const passportData = await fetchPassportData(passportID);

  const { appointment } = passportData;
  const { previousAppointments } = passportData;
  const { pendingVouchers } = passportData;

  return (
    <main className='flex flex-col w-[750px] mx-auto text-hg-500'>
      <Header />
      <Treatments appointment={appointment} previousAppointments={previousAppointments} />
      <Recomendations appointment={appointment} />
      <Issues appointment={appointment} />
      <PendingBonus pendingVouchers={pendingVouchers} />
      <Doubts />
    </main>
  );
}
