'use client';
import React from 'react';
import { InitializePayment } from '@interface/initializePayment';
import FinanceService from '@services/FinanceService';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import Script from 'next/script';

export default function Page() {
  const script = `
  const scriptTag = document.createElement("script");
  scriptTag.src = "https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js";
  scriptTag.async = false;
  document.head.appendChild(scriptTag);
  scriptTag.addEventListener('load', function() {
    var widgets = Alma.Widgets.initialize(
      '11wIdUT6YBVyVEnaAIckfC5eP90vu5wvub',
      Alma.ApiMode.TEST,
    );
    widgets.add(Alma.Widgets.PaymentPlans, {
      container: '#alma-widget',
      purchaseAmount: 10000,
      locale: 'es',
      plans: [
        {
          installmentsCount: 1,
          minAmount: 5000,
          maxAmount: 500000,
        },
        {
          installmentsCount: 2,
          minAmount: 5000,
          maxAmount: 500000,
        },
        {
          installmentsCount: 3,
          minAmount: 5000,
          maxAmount: 500000,
        },
        {
          installmentsCount: 4,
          minAmount: 5000,
          maxAmount: 500000,
        },
      ],
    })
  });
  `;
  const handleClick = async () => {
    const data = {
      amount: 0,
      installments: 1,
      userId: '',
    } as InitializePayment;
    const isSuccess = await FinanceService.initializePayment(data);
  };
  return (
    <Flex layout="col-center" className="relative">
      <Flex layout="row-center">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.min.css"
        />

        <section id="alma-widget"></section>
        <Script
          id="almaSplit"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: script,
          }}
        />
        <Flex layout="row-left">
          <Button onClick={handleClick}>Pagar</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
