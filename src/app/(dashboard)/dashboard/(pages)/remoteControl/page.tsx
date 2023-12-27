'use client';

import MainLayout from 'app/(web)/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Title, Underlined } from 'designSystem/Texts/Texts';

import DashboardMenuItem from '../menu/DashboardMenuItem';
import { menuItems } from './MenuItems';
import ValidateComment from './validate';

export default function RemoteControl({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = useGlobalPersistedStore(state => state);

  return (
    <MainLayout isDashboard>
      <div className="mt-8">
        <Title className="text-xl mb-4">¡Hola {user?.firstName}!</Title>
        <Title className="font-bold text-5xl mb-8">
          Tu <Underlined color={HOLAGLOW_COLORS['primary']}>glow</Underlined>,
          <br />
          tus normas
        </Title>
        <div className="grid grid-cols-3 mb-12">
          {menuItems.map(item => (
            <DashboardMenuItem
              key={item.title}
              iconSrc={item.iconSrc}
              altText={item.altText}
              title={item.title}
              link={
                item.link.includes('flowwwToken')
                  ? item.link.replace('flowwwToken', user?.flowwwToken || '')
                  : item.link
              }
              target={item.target}
            />
          ))}
        </div>
        <ValidateComment />
      </div>
    </MainLayout>
  );
}
