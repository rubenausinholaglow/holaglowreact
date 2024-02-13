import React, { useEffect, useState } from 'react';
import useAsyncClientGQL from '@utils/useAsyncClientGQL';
import { ClientDetails, WhatsappMessages } from 'app/crm/types/Contact';
import { getDateOnlyTime } from 'app/crm/utils/dateFormat';
import { getContactWhatsapps } from 'app/GraphQL/query/ContactDetailQuery';

import InputWpp from './InputWpp';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';

interface WhatsAppProps {
  contactDetail: ClientDetails;
  whatsappMessages: any;
}

export default function WhatsApp({
  contactDetail,
  whatsappMessages,
}: WhatsAppProps) {
  const { firstName, lastName } = contactDetail;

  return (
    <>
      {whatsappMessages &&
        whatsappMessages?.map(
          (whatsappMessage: WhatsappMessages, index: string) => (
            <>
              <MessageLeft
                key={`${firstName}_${index}`}
                clientName={`${firstName} ${lastName}`}
                clientHourMessage={getDateOnlyTime(whatsappMessage.time)}
                clientMessage={whatsappMessage.text}
              />

              <MessageRight
                key={`${index}`}
                clientHourMessage={getDateOnlyTime(whatsappMessage.time)}
                clientMessage={whatsappMessage.text}
              />
            </>
          )
        )}
      <InputWpp userId={contactDetail.id} />
    </>
  );
}
