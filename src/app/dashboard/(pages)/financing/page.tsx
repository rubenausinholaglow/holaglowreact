'use client';
import { InitializePayment } from '@interface/initializePayment';
import FinanceService from '@services/FinanceService';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';

export default function Page () {

    var script = `
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js";
    scriptTag.async = false;
    document.head.appendChild(scriptTag);
    scriptTag.addEventListener('load', function() {
      var widgets = Alma.Widgets.initialize(
        '11wIdUT6YBVyVEnaAIckfC5eP90vu5wvub', // ID marchand
        Alma.ApiMode.TEST, // mode de l'API (LIVE ou TEST)
      );
      widgets.add(Alma.Widgets.PaymentPlans, {
        container: '#alma-widget',
        purchaseAmount: 100000,
        locale: 'es',
        monochrome: false,
        hideIfNotEligible: false,
        plans: [
          {
            installmentsCount: 3,
            minAmount: 5000,
            maxAmount: 500000,
          },
          {
            installmentsCount: 2,
            deferredDays: 30,
            minAmount: 5000,
            maxAmount: 500000,
          },
        ],
      })
    });
  `;
  const handleClick = async () => {
    var data = {
      amount: 0,
      installments: 1,
      userId: ''
    } as InitializePayment;
    const isSuccess = await FinanceService.initializePayment(data);
    if (isSuccess) {
      console.log(isSuccess);
    } else {
    }
  };
  return (
    <section className='bg-hg-200 h-screen flex flex-col justify-center items-center'>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.min.css" />
      
      <section id="alma-widget"></section>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
            __html: script,
        }}
        />
      <button 
      onClick={handleClick}>Pagar</button>
    </section>
  );
};
