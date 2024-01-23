'use client';
import { useEffect, useState } from 'react';
import useRoutes from '@utils/useRoutes';
import { SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();
  const ROUTES = useRoutes();
  const { userLoginResponse } = useSessionStore(state => state);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!userLoginResponse) {
      router.push(ROUTES.crm.authentication);
    }
    setIsHydrated(true);
  });

  if (!isHydrated) {
    return <></>;
  }

  if (userLoginResponse)
    return (
      <Flex className="items-center justify-center flex-col p-4 ">
        <div className="mb-4">Menú CRM</div>
      </Flex>
    );
  else
    return (
      <Flex className="items-center justify-center flex-col p-4  h-[800px]">
        <SvgSpinner className="w-full justify-center" />
      </Flex>
    );
}
