import { HOLAGLOW_COLORS } from '@utils/colors';
import { SvgMedicine, SvgReceipt } from 'app/icons/Icons';

import { ProductsUsed } from '../types';

export default function Treatments({
  productsUsed,
}: {
  productsUsed: ProductsUsed[];
}) {
  return (
    <section className="p-12 text-hg-black">
      <h3 className="bg-[#F1F4FE] rounded-t-[25px] py-6 text-xl font-semibold text-center -mb-4">
        Productos usados
      </h3>

      {productsUsed.map((item, index) => (
        <div key={index} className="bg-[#F1F4FE] rounded-[25px] p-8 mb-12">
          <li className="border-b border-hg-secondary/10 p-4">
            <ul className="flex gap-4">
              <li className="w-1/3">
                <SvgMedicine
                  className="mb-2"
                  height={18}
                  width={22}
                  fill={HOLAGLOW_COLORS['tertiary500']}
                />
                <p className="text-hg-tertiary500 text-xs mb-1">Cantidad</p>
                <p>{item.quantity} Vial</p>
              </li>
              {item.lotReference !== '' && (
                <li className="w-1/3">
                  <SvgReceipt
                    className="mb-2"
                    height={18}
                    width={22}
                    fill={HOLAGLOW_COLORS['tertiary500']}
                  />
                  <p className="text-hg-tertiary500 text-xs mb-1">
                    Número de lote
                  </p>
                  <p>{item.lotReference}</p>
                </li>
              )}
            </ul>
          </li>
        </div>
      ))}
    </section>
  );
}
