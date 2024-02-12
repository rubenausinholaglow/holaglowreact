import { dermaService } from '@services/DermaService';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';

import UpsellingIntro from './components/UpsellingIntro';
import UpsellingPharmacies from './components/UpsellingPharmacies';
import UpsellingRoutines from './components/UpsellingRoutines';

export default async function Upselling() {
  const apiResponse = await dermaService.getRoutine('617628726');

  return (
    <>
      {apiResponse && (
        <DermaLayout hideButton>
          <UpsellingIntro data={apiResponse!} />
          <UpsellingRoutines data={apiResponse!} />
          <UpsellingPharmacies data={apiResponse!} />
        </DermaLayout>
      )}
    </>
  );
}
