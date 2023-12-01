import { Button } from 'designSystem/Buttons/Buttons';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

import BlogCategories from './BlogCategories';

export default function BlogItem({
  className = '',
  showButton = false,
}: {
  className?: string;
  showButton?: boolean;
}) {
  return (
    <div className={className}>
      <Image
        src="/images/blog/post1.png"
        alt="placeholder"
        height={400}
        width={600}
        className="w-full rounded-3xl mb-8"
      />

      <div className="w-full">
        <BlogCategories className="mb-8" categories={['Arrugas', 'Relleno']} />

        <Text size="xl" className="font-semibold mb-4">
          Mesoterapia facial: Tu nuevo aliado para tu rutina de skincare
        </Text>
        <Text size="xs" className="mb-8">
          Por Dr. Sonsoles Espí.{' '}
          <span className="text-hg-black500">Mar 15, 2023</span>
        </Text>

        {showButton && (
          <Button
            size="lg"
            type="tertiary"
            className="mb-8"
            customStyles="bg-hg-black border-hg-primary text-hg-primary"
          >
            Leer más
          </Button>
        )}
      </div>
    </div>
  );
}
