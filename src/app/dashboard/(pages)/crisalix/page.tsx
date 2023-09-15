import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <section className="bg-hg-pink h-screen flex flex-col items-center">
      <p className="text-3xl p-10">Simulador 3D</p>
      <div className="grid grid-cols-2">
        <div>
          <Image
            className="mx-auto p-10"
            src="/images/dashboard/menu-icons/3d_simulator.png"
            height="50"
            width="250"
            alt="3D Simulator"
          />
          <p className="text-center text-lg">Subir Fotografías</p>
        </div>
        <div>
          <Image
            className="mx-auto p-10"
            src="/images/dashboard/menu-icons/3d_simulator.png"
            height="50"
            width="250"
            alt="3D Simulator"
          />
          <p className="text-center text-lg">Generar 3D</p>
        </div>
      </div>
      <div className="fixed bottom-0 p-10">
        <Link href="/dashboard/pages/menu">
          <button className="bg-hg-secondary hover:bg-hg-tertiary text-white font-bold py-10 px-7 rounded-full">
            Volver
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
