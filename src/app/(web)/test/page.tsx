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
        scriptTag.setAttribute("data-apikey", "test");
        scriptTag.setAttribute("data-name", "widgetFK");
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          var widgets = frakmenta_init();
        });
      } else {
       
      }
    `;

  return (
    <App>
      <MainLayout isCheckout>
        test
        <iframe
          className="display:none"
          id="frakmentaEcommerce"
          name="frameEcommerce"
          scrolling="no"
        ></iframe>
        <form
          id="fk-form-installments"
          name="pagoForm"
          target="frameEcommerce"
          method="POST"
          action="https://frakmenta.com/op/ecommerce/load"
        >
          <input id="infoTotal" name="infoTotal" value="IMPORTE" />
          <input id="token" name="token" />
          <button
            id="Pagar"
            name="Pagar"
            type="submit"
            className="button btn-pagar"
          >
            Paga con frakmenta
          </button>
        </form>
      </MainLayout>
    </App>
  );
}
