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
  whatsappMessages: WhatsappMessages[];
  setWhatsappMessages: (whatsappMessagesList: WhatsappMessages[]) => void;
}

export default function WhatsApp({
  contactDetail,
  isLoadingWhatsapp,
  whatsappMessages,
  setWhatsappMessages
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
              {whatsappMessages?.map(({ text, time, received }, index) => {
                const showDate = getDateDayMonthYear(time, '/') !== thisDate;
                thisDate = getDateDayMonthYear(time, '/');

                return (
                  <>
                    {showDate && (
                      <div className="text-center text-xs p-2">
                        {getDateDayMonthYear(time, '/')}
                      </div>
                    )}
                    {received ? (
                      <MessageLeft
                        key={`${firstName}_${index}`}
                        clientName={`${firstName} ${lastName}`}
                        clientHourMessage={getDateOnlyTime(time)}
                        clientMessage={text}
                      />
                    ) : (
                      <MessageRight
                        key={`${index}`}
                        clientHourMessage={getDateOnlyTime(time)}
                        clientMessage={text}
                      />
                    )}
                  </>
                );
              })}
              <InputWpp userId={contactDetail.id} agentId={agent?.id} setWhatsappMessages={setWhatsappMessages} />
            </>
          )}
        </>
      )}
    </>
  );
}
