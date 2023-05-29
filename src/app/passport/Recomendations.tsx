import Image from 'next/image';
import { SvgCosmetic1, SvgCosmetic2, SvgEnvelopeOpen, SvgPhone } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Recomendations() {
  return (
    <section className=''>
      <div class='inline-flex justify-center items-center bg-hg-400 rounded-r-xl text-white py-3 px-16'>
        <h3 className='text-2xl font-semibold text-white mr-8'>¿Tienes dudas?</h3>
        <div className='flex'>
          <div className='flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]'>
            <SvgPhone height={24} width={24} fill={HOLAGLOW_COLORS['hg-200']} />
          </div>
        </div>
        <p className='bg-hg-400 p-1 -ml-3 mr-8'>682 417 208</p>
        <div className='flex'>
          <div className='flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]'>
            <SvgEnvelopeOpen height={24} width={24} fill={HOLAGLOW_COLORS['hg-200']} />
          </div>
        </div>
        <p className='bg-hg-400 p-1 -ml-3'>my@holaglow.com</p>
      </div>
      <div className='bg-[url("/images/passport/recomendationsBg.png")] bg-cover bg-left-bottom p-16 -mt-10 text-sm text-hg-400 pl-[40%] pr-[15%]'>
        <h3 className='text-2xl font-semibold my-4'>Consejos y recomendaciones post tratamiento</h3>
        <p>
          Tras la realización de un tratamiento es habitual la aparición de molestias en la zona durante unos días.
          Normalmente, esta molestia o incomodidad suele desaparecer por completo en unos días y su intensidad suele
          depender de la dificultad y la complejidad del procedimiento realizado.
        </p>
        <p>
          Para evitar complicaciones en el post tratamiento, es importante respetar las indicaciones del doctor así como
          la que vienen explicadas en este documento.
        </p>
      </div>

      <div className='flex bg-hg-100/50 p-16'>
        <div className='w-1/2 flex flex-col items-center'>
          <SvgCosmetic1 height={64} width={64} fill={HOLAGLOW_COLORS['hg-200']} />
        </div>
        <div className='w-1/2 flex flex-col items-center'>
          <SvgCosmetic2 height={64} width={64} fill={HOLAGLOW_COLORS['hg-200']} />
        </div>
      </div>
    </section>
  );
}
