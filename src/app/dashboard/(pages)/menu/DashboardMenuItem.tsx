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
  const { storedBoxId, storedClinicId, ignoreMessages, remoteControl } =
    useGlobalPersistedStore(state => state);
  function goToPage(name: string) {
    if (!remoteControl) return true;
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
        className="mx-auto w-full max-w-[200px]"
        src={iconSrc}
        height="180"
        width="180"
        alt={altText}
      />
      <p className="text-center text-lg -mt-4 text-hg-black font-medium">
        {title}
      </p>
    </Link>
  );
};

export default DashboardMenuItem;
