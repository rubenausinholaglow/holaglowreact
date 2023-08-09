'use client';
import React, { useEffect } from 'react';
import { InitializePayment } from '@interface/initializePayment';
import FinanceService from '@services/FinanceService';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import Script from 'next/script';

import { AlmaProps } from '../../../../../utils/props';

export const AlmaWidget: React.FC<AlmaProps> = ({ amountFinance }) => {
  const parsedValue = parseFloat(amountFinance);
  let resultValue = '';
  let installments = -1;
  useEffect(() => {
    function handleAlmaModalClosed(event: Event) {
      const data = event;
      const text = (data.srcElement! as any).getElementsByClassName(
        'alma-eligibility-modal-active-option'
      )[0].innerText;

      installments = Number(text!.replace('x', ''));
    }

    document.addEventListener('almaModalClosed', handleAlmaModalClosed);

    return () => {
      document.removeEventListener('almaModalClosed', handleAlmaModalClosed);
    };
  }, []);

  if (!isNaN(parsedValue)) {
    resultValue = Math.round(parsedValue * 100).toString();
    console.log(resultValue);
  }
  const script = `
      const scriptTag = document.createElement("script");
      scriptTag.src = "https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js";
      scriptTag.async = true;
      document.head.appendChild(scriptTag);
      scriptTag.addEventListener('load', function() {
        var widgets = Alma.Widgets.initialize(
          '${process.env.NEXT_PUBLIC_ALMA_MERCHANTID}',
          ${process.env.NEXT_PUBLIC_ALMA_DOMAIN},
        );
        widgets.add(Alma.Widgets.PaymentPlans, {
          container: '#payment-plans',
          purchaseAmount: ${resultValue},
          locale: 'es',
          hideIfNotEligible: false,
            transitionDelay: 1000000,
            monochrome: true,
            hideBorder: true,
            onModalClose: function() {
              var event = new CustomEvent('almaModalClosed', { detail: event });
              document.dispatchEvent(event);
            }
        })
      });
    `;

  console.log(script);

  const handleClick = async (amountFinance: string) => {
    const parsedValue = parseFloat(amountFinance);
    let resultValue = '';

    if (!isNaN(parsedValue)) {
      resultValue = Math.round(parsedValue * 100).toString();
    }
    if (installments == -1) {
      const text = document.getElementsByClassName(
        'alma-payment-plans-active-option'
      )[0].textContent;
      installments = Number(text!.replace('x', ''));
    }
    const GuidUser = localStorage.getItem('id') || '';
    const data = {
      amount: Number(resultValue),
      installments: installments,
      userId: GuidUser,
    } as InitializePayment;
    const urlPayment = await FinanceService.initializePayment(data);
  };

  return (
    <Flex layout="col-center" className="relative">
      <Flex layout="row-center">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.min.css"
        />
        <section id="payment-plans"></section>
        {resultValue && (
          <Script
            id="almaSplit"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: script,
            }}
          />
        )}
        <Flex layout="row-left">
          <Button onClick={() => handleClick(amountFinance)}>Pagar</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AlmaWidget;
