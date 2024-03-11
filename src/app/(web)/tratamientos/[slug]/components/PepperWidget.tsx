'use client';
import './pepperStyle.css';

import { useEffect, useState } from 'react';

export default function PepperWidget({ price }: { price: number }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  useEffect(() => {
    if (!scriptLoaded) {
      setScriptLoaded(true);
      const toExecute = new Function(script);
      toExecute();
    }
  }, []);

  const script = `
        var url = '../scripts/Pepper/pepper.js';
        var environment = 'TST';
        var language = 'ES';
        var currency = 'EUR';
        var apiKey = 'qh4hwfJqyGYcK2o0lDCpNfVhiXiCKZq2';
        var publicKey = '0a64c825821bf9bc38c182671fa85786';
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          PEPPER.config.initDraw( environment, language, currency, apiKey, publicKey, ${price}, 'STD', '.pepperWidget', 'in');
        });
      `;

  return (
    <div className="pepperWidget flex relative md:justify-center flex-col w-full mt-5"></div>
  );
}
