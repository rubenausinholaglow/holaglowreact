import Header from './Header';
import Footer from './Footer';
import Treatments from './Treatments';

const fetchPassportData = async (id: number) => {
  try {
    const passportResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/passport?id=${id}`);

    if (!passportResponse) {
      throw new Error('Network response was not OK');
    }

    const passportData = await passportResponse.json();
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
  const tempClinicInfo = {
    address: 'c. de Andrés Mellado, 3   28015 Madrid',
    phone: '682 417 208',
    id: 'ae90eeb6-e853-4711-6273-08db585635e5',
    creationDate: '0001-01-01T00:00:00',
  };

  return (
    <main className='text-hg-500'>
      <div className='flex flex-col w-[750px] mx-auto'>
        <Header clinicInfo={tempClinicInfo} />
        <Treatments />
        <Footer clinicInfo={tempClinicInfo} />
      </div>
    </main>
  );
}
