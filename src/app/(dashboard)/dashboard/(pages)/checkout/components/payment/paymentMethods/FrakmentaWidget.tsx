'use client';
import { useEffect } from 'react';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FrakmentaWidget({
  totalPrice,
  className,
}: {
  totalPrice: number;
  className?: string;
}) {
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
        scriptTag.setAttribute("data-apikey", ${process.env.NEXT_PUBLIC_FRAKMENTA_APIKEY});
        scriptTag.setAttribute("data-name", "widgetFK");
        scriptTag.setAttribute("data-api-url", ${process.env.NEXT_PUBLIC_FRAKMENTA_URL});
      
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          var widgets = frakmenta_init();
          simulator();
        });
      } else {
       
      }
    `;

  return (
    <div className={`w-full ${className ? className : ''}`}>
      <Flex layout="col-left" className="w-full gap-2 text-sm ">
        <div id="fk-widget-installments" data-product_price="6500"></div>
      </Flex>
      <Text size="xs" className="mt-2">
        * Cálculos aproximados
      </Text>
    </div>
  );
}
