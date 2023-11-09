'use client';

import { messageService } from '@services/MessageService';
import Image from 'next/image';
import Link from 'next/link';

import { DashboardMenuItemProps } from '../../utils/props';

type GoToCrisalix = {
  clinicId: string;
  boxId: string;
  page: string;
};

const DashboardMenuItem: React.FC<DashboardMenuItemProps> = ({
  iconSrc,
  altText,
  title,
  link,
  target,
}) => {
  function goToPage(name: string) {
    const localClinicId = localStorage.getItem('ClinicId' || '');
    const localBoxId = localStorage.getItem('BoxId' || '');
    let message: GoToCrisalix;
    switch (name) {
      case 'Simulador 3D':
        message = {
          clinicId: localClinicId || '',
          boxId: localBoxId || '',
          page: 'Crisalix',
        };
        messageService.goToPage(message);
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
