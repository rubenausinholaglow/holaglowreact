import Image from 'next/image';
import TaxData from '../TaxData';

const fetchRecipeData = async (id: number) => {
  try {
    const recipeResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/BeautyPass?id=${id}`, {
      cache: 'no-store',
    });

    if (!recipeResponse) {
      throw new Error('Network response was not OK');
    }

    const recipeData = await recipeResponse.json();
    console.log(recipeData);
    return recipeData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

export default async function Passport({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recipeID: any = searchParams.id;
  const recipeData = await fetchRecipeData(recipeID);

  const { appointment = null, previousAppointments = null, pendingVouchers = null } = recipeData ? recipeData : {};

  return (
    <main className='bg-[#fdf7fc] text-sm'>
      <section className='flex flex-col w-[750px] mx-auto p-12'>
        <Image className='mx-auto mb-16' src='/images/holaglow.svg' height='40' width='188' alt='Holaglow' />

        <TaxData />
        <RecipeData />
      </section>
    </main>
  );
}
