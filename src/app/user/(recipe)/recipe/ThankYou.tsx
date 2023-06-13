export default function ThankYou() {
  return (
    <div className='flex flex-col text-center justify-between bg-[#FBEEF9] p-8'>
      <h3 className='text-hg-500 text-2xl font-semibold mb-2'>¡Gracias por tu visita!</h3>
      <p className='text-hg-500 mb-4'>
        Recuerda que puedes consultar cualquier información en <span className='text-hg-300'>holaglow.com</span>
      </p>
      <p className='text-[#717D96] text-center text-xs'>
        Glow Lab S.L., te informa que tus datos serán tratados para la emisión de facturas y la gestión contable y
        fiscal como consecuencia de tus compras en Holaglow y para el cumplimiento de obligaciones legales. Tus datos se
        podrán comunicar a compañías del Grupo Holaglow, entidades financieras y Administraciones Públicas. Puedes
        ejercer tus derechos de acceso, rectificación o supresión enviando un email a legal@holaglow.com
      </p>
    </div>
  );
}
