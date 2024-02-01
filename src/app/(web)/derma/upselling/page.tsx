import { UpsellingData } from '@interface/upselling';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

export default function Upselling() {
  const fakeAPIResponse: UpsellingData = {
    userName: 'Pepito de los palotes',
    userPostalCode: '08013',
    expeditionDate: '2014-12-10',
    rutineType: 3,
    receiptUrl: 'https://www.google.com',
  };

  return (
    <DermaLayout hideButton>
      <UpsellingIntro data={fakeAPIResponse} />
      <UpsellingRoutines />
      <UpsellingPharmacies />
    </DermaLayout>
  );
}
