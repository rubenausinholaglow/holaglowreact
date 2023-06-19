import Image from 'next/image';
import TaxData from './TaxData';
import RecipeData from './RecipeData';
import ThankYou from './ThankYou';
import PromoCode from 'app/user/budget/PromoCode';

const fetchRecipeData = async (id: number) => {
  try {
    const recipeResponse = await fetch(`https://holaglowcontactsapidev.azurewebsites.net/budget?id=${id}`, {
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

  const { discountCode = null, discountAmount = null } = recipeData ? recipeData : {};

  return (
    <main className='bg-[#fdf7fc] text-sm'>
      <section className='flex flex-col w-[750px] mx-auto p-12'>
        <Image className='mx-auto mb-16' src='/images/holaglow.svg' height='40' width='188' alt='Holaglow' />

        <TaxData />
        <RecipeData />
        <PromoCode discountCode={discountCode} discountAmount={discountAmount} backGround='#fdf7fc' />
        <ThankYou />
      </section>
    </main>
  );
}
