'use client';

import '/public/styles/Frakmenta/widget-ecommerce.css';
import '/public/styles/Frakmenta/iframe-ecommerce.min.css';

import { useEffect } from 'react';

import App from '../components/layout/App';
import MainLayout from '../components/layout/MainLayout';

export default function Page() {
  useEffect(() => {
    const toExecute = new Function(script);
    toExecute();
  }, []);

  const script = `
      var url = '/scripts/Frakmenta/widget.js';
      var scriptLoaded = false;
      if (!url) url = 'http://xxx.co.uk/xxx/script.js';
      var scripts = document.getElementsByTagName('script');
      
      for (var i = scripts.length; i--; ) {
        if (scripts[i].src == url && !scriptLoaded) scriptLoaded = true;
      }
      if (!scriptLoaded) {
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
        scriptTag.setAttribute("data-apikey", "https://beta2.frakmenta.com");
        scriptTag.setAttribute("data-name", "widgetFK");
        scriptTag.setAttribute("data-api-url", "https://frakmenta.com");
      
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          var widgets = frakmenta_init();
          simulator();
        });
      } else {
       
      }
    `;

  return (
    <App>
      <MainLayout isCheckout>
        test
        <div
          className="fk-installments"
          id="fk-widget-installments"
          data-product_price="500"
        ></div>
      </MainLayout>
    </App>
  );
}
