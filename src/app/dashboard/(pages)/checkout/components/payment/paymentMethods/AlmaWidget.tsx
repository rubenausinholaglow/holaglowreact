'use client';
import React, { useEffect, useState } from 'react';
import { InitializePayment } from '@interface/initializePayment';
import FinanceService from '@services/FinanceService';
import { Button } from 'components/Buttons/Buttons';
import { Flex } from 'components/Layouts/Layouts';
import Script from 'next/script';

import { AlmaProps } from '../../../../../utils/props';
import { usePaymentList } from '../payments/usePaymentList';

export const AlmaWidget: React.FC<AlmaProps> = ({ amountFinance }) => {
  const parsedValue = parseFloat(amountFinance);
  let resultValue = '';
  let installments = -1;

  const totalAmount = usePaymentList(state => state.totalAmount);
  useEffect(() => {
    console.log(totalAmount);
    function handleAlmaModalClosed(event: Event) {
      const data = event;
      const text = (data.srcElement! as any).getElementsByClassName(
        'alma-eligibility-modal-active-option'
      )[0].innerText;

      installments = Number(text!.replace('x', ''));
    }

    var toExecute = new Function(script);
    toExecute();
    document.addEventListener('almaModalClosed', handleAlmaModalClosed);

    return () => {
      document.removeEventListener('almaModalClosed', handleAlmaModalClosed);
    };
  }, [totalAmount]);

  if (!isNaN(parsedValue)) {
    resultValue = Math.round(parsedValue * 100).toString();
  }
  const script = `
      var url = 'https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.umd.js';
      var scriptLoaded = false;
      if (!url) url = 'http://xxx.co.uk/xxx/script.js';
      var scripts = document.getElementsByTagName('script');
      for (var i = scripts.length; i--; ) {
        if (scripts[i].src == url && !scriptLoaded) scriptLoaded = true;
      }
      if(!scriptLoaded){
        const scriptTag = document.createElement("script");
        scriptTag.src = url;
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
      }
      else {
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
        });
      }
    `;

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
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/@alma/widgets@3.x.x/dist/widgets.min.css"
        />
        <section id="payment-plans"></section>
        <Flex layout="row-left">
          <Button onClick={() => handleClick(amountFinance)}>Pagar</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AlmaWidget;
