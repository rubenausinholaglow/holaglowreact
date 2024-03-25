'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'designSystem/Texts/Texts';

export default function MainLayout({ token }: { token: string }) {
  const wasAlreadyRequested = useRef(false);
  const [accessToken, setAccessToken] = useState<null | string>('');

  useEffect(() => {
    if (!wasAlreadyRequested.current) {
      setAccessToken(token);
    }
  }, [wasAlreadyRequested]);

  useEffect(() => {
    if (accessToken) {
      const toExecute = new Function(script);
      toExecute();
    }
  }, [accessToken]);

  const script = `
      var url = '/scripts/mediquo/widget.js';
      var scriptLoaded = false;
      if (!url) url = 'http://xxx.co.uk/xxx/script.js';
      var scripts = document.getElementsByTagName('script');

      for (var i = scripts.length; i--; ) {
        if (scripts[i].src == url && !scriptLoaded) scriptLoaded = true;
      }
      if (!scriptLoaded) {
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
        document.head.appendChild(scriptTag);
        scriptTag.addEventListener('load', function() {
          var widgets = MediquoWidget.init({
            apiKey: "${process.env.NEXT_PUBLIC_MEDIQUO_DOMAIN}",
            accessToken: "${accessToken}",
          });
        });
      } else {
        var widgets = MediquoWidget.init({
          apiKey: "${process.env.NEXT_PUBLIC_MEDIQUO_DOMAIN}",
          accessToken: "${accessToken}",
        });
      }

      window.addEventListener(
        "message",
        ({ data: { command } }) => {
          if (command === 'started') {
            MediquoWidget.open_list();
          }
        }
      );  

    `;
  return (
    <div className="mt-6 justify-center items-center">
      <>
        <Text size="md" className="leading-6 mb-10 text-center">
          Contacta con nosotros a través de nuestro chat
          <br />
          Un médico te atenderá en breve
          <br />
        </Text>
      </>
    </div>
  );
}
