import { Professional } from '@interface/clinic';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BlogAuthor({ className = '', professional }: { className?: string, professional: Professional }) {
  return (
    <div className={`rounded-3xl bg-hg-cream500 py-8 px-4 ${className}`}>
      <Title className="text-3xl font-bold">
        Nuestra{' '}
        <Underlined color={HOLAGLOW_COLORS['primary']}>autora</Underlined>
      </Title>

      <Image alt=""
        

    </div>
  );
}
