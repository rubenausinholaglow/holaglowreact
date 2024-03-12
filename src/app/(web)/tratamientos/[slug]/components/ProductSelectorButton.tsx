'use client';

import { Product } from '@interface/product';
import ROUTES from '@utils/routes';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter } from 'next/navigation';

export default function ProductSelectorButton({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const { setSelectedTreatments } = useSessionStore(state => state);

  return (
    <Button
      onClick={() => {
        setSelectedTreatments([product]);
        router.push(ROUTES.checkout.type);
      }}
      size="xl"
      type="primary"
      className="mb-6 md:mb-0 md:mt-auto"
      id="tmevent_click_book_anchor_button"
    >
      Me interesa
      <SvgArrow height={24} width={24} className="ml-4 pointer-events-none" />
    </Button>
  );
}
