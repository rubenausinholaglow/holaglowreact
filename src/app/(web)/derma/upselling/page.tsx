import { UpsellingData } from '@interface/upselling';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

const fakeAPIResponse: UpsellingData = {
  userName: 'Pepito de los palotes',
  userPostalCode: '08013',
  expeditionDate: '2014-12-10',
  rutineType: 0,
  receiptUrl: 'https://www.google.com',
};

export default function Upselling() {
  return (
    <DermaLayout hideButton>
      <UpsellingIntro data={fakeAPIResponse} />
      <UpsellingRoutines data={fakeAPIResponse} />
      <UpsellingPharmacies data={fakeAPIResponse} />
    </DermaLayout>
  );
}
