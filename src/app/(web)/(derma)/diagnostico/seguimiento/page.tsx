'use client';

import { useEffect, useState } from 'react';
import { DiagnosticData } from '@interface/derma/diagnosis';
import { dermaService } from '@services/DermaService';
import CheckHydration from '@utils/CheckHydration';
import { useSessionStore } from 'app/stores/globalStore';

import Seguimiento from './Seguimiento';

export default function SeguimientoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { dermaPhone } = useSessionStore(state => state);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosticData | null>(
    null
  );
  const index = searchParams.index;

  useEffect(() => {
    const fetchData = async () => {
      const response: DiagnosticData =
        await dermaService.getDiagnosis(dermaPhone);
      setDiagnosisData(response);
    };
    if (dermaPhone) fetchData();
  }, [dermaPhone]);

  if (!diagnosisData || index == null) {
    return <></>;
  }

  return (
    <CheckHydration>
      <Seguimiento
        userId={diagnosisData?.user?.id}
        diagnostic={diagnosisData?.diagnostic[Number(index)]}
      />
    </CheckHydration>
  );
}
