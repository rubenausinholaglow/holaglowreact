import { ProductsUsed } from '../types';

export default function Treatments({
  productsUsed,
}: {
  productsUsed: ProductsUsed[];
}) {
  return (
    <>
      {productsUsed?.length > 0 && (
        <>
          <h3 className="mb-4 font-semibold">Productos utilizados</h3>

          <table className="text-hg-black text-[11px] mb-12 w-full">
            <thead>
              <tr className="text-hg-tertiary500 mb-4">
                <th className="py-3 pr-6 text-left font-normal">Consumos</th>
                <th className="py-3 pr-6 text-left font-normal">
                  Número de lote
                </th>
                <th className="py-3 pr-6 text-left font-normal">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {productsUsed.map((productUsed, index) => {
                return (
                  <tr
                    key={index}
                    className="mb-4 border-b border-hg-secondary/10"
                  >
                    <td className="py-3 pr-6">{productUsed.productUsed}</td>
                    <td className="py-3 pr-6">{productUsed.lotReference}</td>
                    <td className="py-3 pr-6">{productUsed.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
