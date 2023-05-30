import Footer from './Footer';

const fetchClinicData = async (id: number) => {
  try {
    const clinicResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/budget?id=${id}`, {
      cache: 'no-store',
    });

    if (!clinicResponse) {
      throw new Error('Network response was not OK');
    }

    const clinicData = await clinicResponse.json();
    return clinicData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const clinicData = await fetchClinicData(199);
  const { clinicInfo = null } = clinicData ? clinicData : {};

  return (
    <main className='flex flex-col w-[750px] mx-auto'>
      {children}
      <Footer clinicInfo={clinicInfo} />
    </main>
  );
}
