'use client';
import './pepperStyle.css';

import { useEffect, useState } from 'react';

export default function PepperWidget({ price }: { price: number }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    if (!scriptLoaded) {
      setScriptLoaded(true);
      debugger;
      const toExecute = new Function(script);
      toExecute();
    }
  }, []);

  const script = `
        var url = '../scripts/Pepper/pepper.js';
        var environment = '${process.env.NEXT_PUBLIC_PEPPER_ENVIRONMENT}';
        var language = 'ES';
        var currency = 'EUR';
        var apiKey = '${process.env.NEXT_PUBLIC_PEPPER_APIKEY}';
        var publicKey = '${process.env.NEXT_PUBLIC_PEPPER_PUBLICKEY}';
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          PEPPER.config.initDraw( environment, language, currency, apiKey, publicKey, ${price}, 'STD', '.pepperWidget', 'in');
        });
      `;

  return (
    <div className="pepperWidget flex relative md:justify-center flex-col w-full md:mt-5 mb-10 md:mb-0"></div>
  );
}
