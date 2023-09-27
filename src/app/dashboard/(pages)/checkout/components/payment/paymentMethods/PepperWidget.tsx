import React, { useEffect, useState } from 'react';
import { Button } from 'designSystem/Buttons/Buttons';
import { Text } from 'designSystem/Texts/Texts';
import { priceFormat } from 'utils/priceFormat';

export default function PepperWidget({ totalPrice }: { totalPrice: number }) {
  useEffect(() => {
    const toExecute = new Function(script);
    toExecute();
  }, []);

  const script = `
      var url = '../scripts/Pepper/pepper.js';
      var scriptLoaded = false;
      if (!url) url = 'http://xxx.co.uk1/xxx/script.js';
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length; i--; ) {
        if (scripts[i].src == url && !scriptLoaded) scriptLoaded = true;
      }
      var environment = 'TST';
      var language = 'ES';
      var currency = 'EUR';
      var apiKey = 'qh4hwfJqyGYcK2o0lDCpNfVhiXiCKZq2';
      var publicKey = '0a64c825821bf9bc38c182671fa85786';
      if(!scriptLoaded){
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
            PEPPER.config.init( environment, language, currency, apiKey, publicKey );
            PEPPER.widgets.DrawWidget(${totalPrice}, 'STD', 'pepperWidget', 'in');
           
        });
      }
      else {
        document.addEventListener("DOMContentLoaded", function(event) {
          PEPPER.config.init( environment, language, currency, apiKey, publicKey );
          PEPPER.widgets.DrawWidget(${totalPrice}, 'STD', 'pepperWidget', 'in');
         });
         
      }
    `;

  return (
    <section className="p-2 text-black">
      <div className="pepperWidget"></div>
      <div className="flex gap-2 text-[11px] text-center">
        <div className="flex flex-col gap-1">
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2">
            Pago financiado
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 3 meses
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 4 meses
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 6 meses
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 9 meses
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 12 meses
          </p>
          <p className="bg-hg-primary rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
            En 18 meses
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="rounded-md bg-white py-1 px-2 text-[#717D96]">
            Importe mensual
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat(totalPrice / 3)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat(totalPrice / 4)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat(totalPrice / 6)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat((totalPrice * 1.055) / 9)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat((totalPrice * 1.075) / 12)}`} €
          </p>
          <p className="rounded-md bg-white py-1 px-2">
            {`${priceFormat((totalPrice * 1.117) / 18)}`} €
          </p>
        </div>
      </div>
      <Text size="xs" className="mt-2">
        * Cálculos aproximados
      </Text>
    </section>
  );
}
