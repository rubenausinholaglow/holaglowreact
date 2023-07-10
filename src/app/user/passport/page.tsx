import Doubts from './Doubts';
import Header from './Header';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import Recomendations from './Recomendations';
import Treatments from './Treatments';

const fetchPassportData = async (id: number) => {
  try {
    const passportResponse = await fetch(
      `https://holaglowcontactsapi.azurewebsites.net/BeautyPass?id=${id}`,
      {
        cache: 'no-store',
      }
    );

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
  const passportID = searchParams.id;
  const passportData = await fetchPassportData(Number(passportID));

  const {
    appointment = null,
    previousAppointments = null,
    pendingVouchers = null,
  } = passportData ? passportData : {};

  return (
    <main className="flex flex-col w-[750px] mx-auto text-hg-500">
      {appointment ? (
        <>
          <Header />
          <Treatments
            appointment={appointment}
            previousAppointments={previousAppointments}
          />
          <Recomendations appointment={appointment} />
          <Issues appointment={appointment} />
          <PendingBonus pendingVouchers={pendingVouchers} />
          <Doubts />
        </>
      ) : (
        <p className="p-8">Passport unavailable: some data is missing</p>
      )}
    </main>
  );
}
