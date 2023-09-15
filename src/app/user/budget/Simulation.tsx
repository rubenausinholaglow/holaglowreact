import { Simulation } from '../types';

export default function Simulation({
  simulations,
}: {
  simulations: Array<Simulation>;
}) {
  return (
    <section className="bg-hg-black50 py-8 px-16">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold">
          Antes y después del escáner 3D con imagen real
        </h3>

        <p className="bg-white rounded-xl py-1 px-8 mt-8 -mb-4 relative z-10 text-sm">
          Antes
        </p>
        <div className="flex justify-center bg-white rounded-3xl border-b-4 border-hg-secondary/20 w-full py-4">
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesPrevious3}
            alt="simulación"
          />
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesPrevious2}
            alt="simulación"
          />
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesPrevious1}
            alt="simulación"
          />
        </div>

        <p className="bg-white rounded-xl py-1 px-8 mt-8 -mb-4 relative z-10 text-sm">
          Después
        </p>
        <div className="flex justify-center bg-white rounded-3xl border-b-4 border-hg-secondary/20 w-full py-4">
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesAfter3}
            alt="simulación"
          />
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesAfter2}
            alt="simulación"
          />
          <img
            className="block self-center h-[190px]"
            src={simulations[0].imagesAfter1}
            alt="simulación"
          />
        </div>

        <p className="text-hg-pink text-sm mt-8 w-4/5 text-center">
          Las simulaciones 3D sirven como herramienta para visualizar los
          posibles resultados de ciertos procedimientos estéticos pero
          únicamente con fines informativos. Sin embargo, los resultados reales
          pueden variar
        </p>
      </div>
    </section>
  );
}
