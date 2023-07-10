import { SvgCosmetic3, SvgEnvelopeOpen, SvgPhone } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

export default function Issues() {
  return (
    <section className="mb-8">
      <div className="p-16 bg-hg-400 text-white flex flex-col justify-center items-center">
        <SvgCosmetic3 height={64} width={64} fill="white" className="mb-4" />
        <h3 className="font-semibold mb-4 text-2xl">¿Tienes dudas?</h3>
        <p className="w-1/2 text-lg text-center mb-8">
          Si tienes molestias excesivas, presentas una inflamación que va en
          aumento después del tercer día o te aparece fiebre,{' '}
          <span className="font-semibold">ponte en contacto con nosotros</span>{' '}
          lo antes posible.
        </p>
        <div className="flex">
          <div className="flex items-center">
            <div className="flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]">
              <SvgPhone
                height={24}
                width={24}
                fill={HOLAGLOW_COLORS['hg-200']}
              />
            </div>
            <p className="bg-hg-400 p-1 -ml-3 mr-8">682 417 208</p>
          </div>
          <div className="flex items-center">
            <div className="flex justify-center items-center border border-hg-200 rounded-full p4 h-[56px] w-[56px]">
              <SvgEnvelopeOpen
                height={24}
                width={24}
                fill={HOLAGLOW_COLORS['hg-200']}
              />
            </div>
            <p className="bg-hg-400 p-1 -ml-3">my@holaglow.com</p>
          </div>
        </div>
      </div>
      <div className="bg-hg-400/50 text-hg-400 flex flex-col items-center py-6 px-24">
        <h3 className="text-sm font-semibold mb-2">
          Trae tu pasaporte a tu próxima cita
        </h3>
        <p className="text-sm text-center">
          Holaglow Clinics ofrece una serie de productos técnicos médicos
          comercializados en la CE con diferentes especificaciones y
          propiedades. Te recomendamos que siempre consultes con un médico o
          beauty advisor calificado qué productos son los más adecuados de
          nuestra selección para tus necesidades particulares.
        </p>
      </div>
    </section>
  );
}
