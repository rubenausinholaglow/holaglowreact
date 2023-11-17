'use client';

import { GoToPageData } from '@interface/FrontEndMessages';
import { messageService } from '@services/MessageService';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import Image from 'next/image';
import Link from 'next/link';

import { DashboardMenuItemProps } from '../../utils/props';

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({
  iconSrc,
  altText,
  title,
  link,
  target,
}) => {
  const { storedBoxId, storedClinicId, ignoreMessages } =
    useGlobalPersistedStore(state => state);
  function goToPage(name: string) {
    let message: GoToPageData;
    switch (name) {
      case 'Simulador 3D':
        message = {
          clinicId: storedClinicId || '',
          boxId: storedBoxId || '',
          page: 'Crisalix',
        };
        if (!ignoreMessages) messageService.goToPage(message);
        break;
      default:
        '';
    }
  }
  return (
    <Link href={link} target={target} onClick={() => goToPage(title)}>
      <Image
        className="mx-auto"
        src={iconSrc}
        height="30"
        width="150"
        alt={altText}
      />
      <p className="text-center text-sm text-white">{title}</p>
    </Link>
  );
};

export default DashboardMenuItem;
