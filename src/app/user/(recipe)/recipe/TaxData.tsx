export default function TaxData() {
  return (
    <div className='flex justify-between'>
      <div className='w-[42%]'>
        <div className='bg-white  p-4 rounded-xl'>
          <p className='text-hg-500 mb-2'>Glow Lab, SL</p>
          <address className='not-italic text-[#717D96]'>
            <p>B44718971</p>
            <p>c/ Andrés Mellado, 3 · 28015 Madrid</p>
            <p>Telf. 930346565</p>
          </address>
        </div>
      </div>
      <div className='w-[42%]'>
        <div className='bg-white p-4 rounded-xl'>
          <p className='text-hg-500 mb-2'>Carmen Maria Carrascosa Rivas</p>
          <address className='not-italic text-[#717D96] mb-4 pb-4 border-b-hg-100 border-b'>
            <p>99887766C</p>
            <p>c/ Industria 560, 1º 1ª · 28000 Madrid</p>
          </address>

          <table className='text-black'>
            <tr>
              <td className='font-semibold pr-2'>Fact. Número</td>
              <td>0000001S/202</td>
            </tr>
            <tr>
              <td className='font-semibold pr-2'>Cliente</td>
              <td>HG00001</td>
            </tr>
            <tr>
              <td className='font-semibold pr-2'>Fecha</td>
              <td>29/05/2023</td>
            </tr>
            <tr>
              <td className='font-semibold pr-2'>Tienda</td>
              <td>MAD01</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
