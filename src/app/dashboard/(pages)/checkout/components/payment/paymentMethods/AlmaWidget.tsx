'use client';

import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { InitializePayment } from '@interface/initializePayment';
import { PaymentBank } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import { AlmaProps } from '../../../../../utils/props';

export const AlmaWidget: React.FC<AlmaProps> = ({
  amountFinance,
  onUrlPayment,
}) => {
  const parsedValue = parseFloat(amountFinance);
  const [isLoading, setIsLoading] = useState(false);
  let resultValue = '';
  let installments = -1;

  useEffect(() => {
    function handleAlmaModalClosed(event: Event) {
      const target = event.target as HTMLElement | null;

      if (target) {
        if (typeof target.closest === 'function') {
          const almaModal = target.closest(
            '.alma-eligibility-modal-active-option'
          ) as HTMLElement;
          if (almaModal) {
            const text = almaModal.innerText;
            installments = Number(text.replace('x', ''));
          }
        }
      }
    }

    const toExecute = new Function(script);
    toExecute();
    document.addEventListener('almaModalClosed', handleAlmaModalClosed);

    return () => {
      document.removeEventListener('almaModalClosed', handleAlmaModalClosed);
    };
  }, []);

  if (!isNaN(parsedValue)) {
    resultValue = Math.round(parsedValue * 100).toString();
  }
  const script = `
      var url = '../scripts/Alma/widget.js';
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
    setIsLoading(true);

    const parsedValue = parseFloat(amountFinance);
    let resultValue = '';

    if (!isNaN(parsedValue)) {
      resultValue = Math.round(parsedValue * 100).toString();
    }

    let installmentsValue = installments;
    if (installmentsValue === -1) {
      const almaPaymentPlans = document.getElementsByClassName(
        'alma-payment-plans-active-option'
      )[0];
      if (almaPaymentPlans) {
        const text = almaPaymentPlans.textContent;
        if (text) {
          installmentsValue = Number(text.replace(/x|d+/g, ''));
        }
      }
    }

    const GuidUser = localStorage.getItem('id') || '';
    const data: InitializePayment = {
      amount: Number(resultValue),
      installments: installmentsValue,
      userId: GuidUser,
      paymentBank: PaymentBank.Alma,
    };
    try {
      const urlPayment = await FinanceService.initializePayment(data);
      onUrlPayment(urlPayment.id, urlPayment.url, urlPayment.referenceId);
    } catch (error: any) {
      Bugsnag.notify('Error initializing payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Flex layout="col-left" className="relative w-full flex-wrap pb-[150px]">
        <section id="payment-plans" className="absolute inset-0"></section>
        <div className="absolute bottom-0">
          <Button
            type="secondary"
            onClick={async () => await handleClick(amountFinance)}
          >
            {isLoading ? <SvgSpinner height={24} width={24} /> : 'Pagar'}
          </Button>
        </div>
      </Flex>
    </>
  );
};
export default AlmaWidget;
