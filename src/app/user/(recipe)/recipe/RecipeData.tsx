export default function RecipeData() {
  return (
    <div className='flex flex-col'>
      <h3 className='text-xl text-hg-500 font-semibold mb-4'>Factura</h3>
      <div className='bg-white rounded-xl p-4'>
        <table className='text-[#717D96] w-full text-right mb-8'>
          <tr>
            <th className='text-hg-500 font-normal w-[55%] text-left py-3'>Concepto</th>
            <th className='text-hg-500 font-normal w-[15%] py-3'>Unidades</th>
            <th className='text-hg-500 font-normal w-[15%] py-3'>Descuento</th>
            <th className='text-hg-500 font-normal w-[15%] py-3'>Importe</th>
          </tr>
          <tr>
            <td className='text-black font-normal text-left py-3 text-[14px]'>
              Pack Wellaging Plus (2 AH + 1 VIT + 1 Botox)
            </td>
            <td className='py-3'>1</td>
            <td className='py-3'>20%</td>
            <td className='py-3'>999,00€</td>
          </tr>
        </table>

        <table className='text-[#717D96] w-full text-right mb-8 border-t border-t-slate-200'>
          <tr>
            <td className='w-[55%] text-left py-3'>{` `}</td>
            <td className='w-[15%] py-3'>Base imponible</td>
            <td className='w-[15%] py-3'>{` `}</td>
            <td className='w-[15%] py-3'>852,62€</td>
          </tr>
          <tr>
            <td>{` `}</td>
            <td className='py-3'>Descuento</td>
            <td className='py-3'>{` `}</td>
            <td className='py-3'>-199,00€</td>
          </tr>
          <tr>
            <td>{` `}</td>
            <td className='py-3'>IVA 21%</td>
            <td className='py-3'>{` `}</td>
            <td className='py-3'>167,83€</td>
          </tr>
          <tr>
            <td>{` `}</td>
            <td className='text-lg text-black font-semibold py-3'>Total</td>
            <td className='py-3'>{` `}</td>
            <td className='text-lg text-black font-semibold py-3'>799,20€</td>
          </tr>
        </table>

        <div className='w-full h-[1px] bg-[url("/images/recipe/recipeSeparator.png")] bg-cover relative mb-8'>
          <div className='bg-[#fdf7fc] h-[16px] w-[16px] absolute rounded-full -top-[8px] -left-[24px]'></div>
          <div className='bg-[#fdf7fc] h-[16px] w-[16px] absolute rounded-full -top-[8px] -right-[24px]'></div>
        </div>

        <table className='text-[#717D96] w-full text-right'>
          <tr>
            <th className='text-hg-500 font-normal w-[60%] text-left py-3'>Método de pago</th>
            <th className='text-hg-500 font-normal w-[20%] py-3'>Fecha</th>
            <th className='text-hg-500 font-normal w-[20%] py-3'>Importe</th>
          </tr>
          <tr>
            <td className='text-left py-3'>Alma pago en 3 plazos</td>
            <td className='py-3'>19/05/2023</td>
            <td className='py-3'>799,20€</td>
          </tr>
        </table>

        <table className='text-[#717D96] w-full text-right border-t border-t-slate-200'>
          <tr>
            <td className='py-3'>{` `}</td>
            <td className='py-3'>Total Pagado</td>
            <td className='font-semibold text-lg text-black py-3'>799,20 €</td>
          </tr>
        </table>
      </div>
      <p className='my-8 text-[#717D96] text-center'>
        En caso de devolución, se entrega un vale para canjear por otro producto o tratamiento
      </p>
    </div>
  );
}
