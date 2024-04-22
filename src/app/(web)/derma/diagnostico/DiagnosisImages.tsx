import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function DiagnosisImages({
  className = '',
  images,
}: {
  className: string;
  images: string[];
}) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {images.map((imgSrc, index) => {
        const alt = () => {
          if (index === 0) return 'Rostro frontal';
          if (index === 1) return 'Perfil derecho';

          return 'Perfil izquierdo';
        };
        return (
          <li
            key={alt()}
            className="bg-white/50 border border-derma-secondary400 p-2 rounded-2xl w-[114px]"
          >
            <Image
              src={imgSrc}
              height={96}
              width={96}
              alt={alt()}
              className="rounded-2xl mb-4"
            />
            <Text className="text-sm font-semibold">Foto {index + 1}</Text>
            <Text className="text-sm">{alt()}</Text>
          </li>
        );
      })}
    </ul>
  );
}
