import Header from './Header';
import Treatments from './Treatments';
import Recomendations from './Recomendations';
import Issues from './Issues';
import PendingBonus from './PendingBonus';
import Doubts from './Doubts';

export default async function Budget() {
  return (
    <main className='flex flex-col w-[750px] mx-auto text-hg-500'>
      <Header />
      <Treatments />
      <Recomendations />
      <Issues />
      <PendingBonus />
      <Doubts />
    </main>
  );
}
