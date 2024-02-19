import React from 'react';
import { ClientDetails, WhatsappMessages } from 'app/crm/types/Contact';
import { getDateDayMonthYear, getDateOnlyTime } from 'app/crm/utils/dateFormat';
import { SvgSpinner } from 'app/icons/Icons';

import InputWpp from './InputWpp';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';

interface WhatsAppProps {
  contactDetail: ClientDetails;
  isLoadingWhatsapp: boolean;
  whatsappMessages: any;
}

export default function WhatsApp({
  contactDetail,
  isLoadingWhatsapp,
  whatsappMessages,
}: WhatsAppProps) {
  const { firstName, lastName, agent } = contactDetail;
  let thisDate: string | null = null;

  return (
    <>
      {isLoadingWhatsapp ? (
        <SvgSpinner className="w-full justify-center" />
      ) : (
        <>
          {whatsappMessages && (
            <>
              {whatsappMessages?.map(
                (whatsappMessage: WhatsappMessages, index: string) => {
                  const showDate =
                    getDateDayMonthYear(whatsappMessage.time, '/') !== thisDate;
                  thisDate = getDateDayMonthYear(whatsappMessage.time, '/');

                  return (
                    <>
                      {showDate && (
                        <div className="text-center text-xs p-2">
                          {getDateDayMonthYear(whatsappMessage.time, '/')}
                        </div>
                      )}
                      {whatsappMessage.received ? (
                        <MessageLeft
                          key={`${firstName}_${index}`}
                          clientName={`${firstName} ${lastName}`}
                          clientHourMessage={getDateOnlyTime(
                            whatsappMessage.time
                          )}
                          clientMessage={whatsappMessage.text}
                        />
                      ) : (
                        <MessageRight
                          key={`${index}`}
                          clientHourMessage={getDateOnlyTime(
                            whatsappMessage.time
                          )}
                          clientMessage={whatsappMessage.text}
                        />
                      )}
                    </>
                  );
                }
              )}
              <InputWpp userId={contactDetail.id} agentId={agent?.id}/>
            </>
          )}
        </>
      )}
    </>
  );
}
