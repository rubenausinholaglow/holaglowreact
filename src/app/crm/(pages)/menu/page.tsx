'use client';
import useRoutes from '@utils/useRoutes';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();
  const ROUTES = useRoutes();

  return (
    <Flex className="items-center justify-center flex-col p-4 ">
      <div className="mb-4">Menú CRM</div>
    </Flex>
  );
}
