import useFromStore from '../../(pages)/budgets/hooks/useFromStore';
import { useCartStore } from '../../(pages)/budgets/stores/userCartStore';

interface Props {
  onCartIconClick: () => void;
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, state => state.cart);

  return (
    <header className="text-black py-4 flex items-center justify-between h-14 sticky top-0 z-10">
      <nav className="container mx-auto md:w-10/12 px-4 flex justify-between">
        <span className="text-lg font-semibold">Productos</span>
        <div className="relative">
          <button
            type="button"
            title="Mini Cart"
            className="text-white text-xl flex items-center"
            onClick={onCartIconClick}
          >
            <div className="text-white rounded-lg bg-blue-700 w-10 h-10 text-lg -ml-1">
              {cart?.length}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
