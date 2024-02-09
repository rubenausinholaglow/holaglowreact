import React, { useState } from 'react';
import { ClientDetails } from 'app/crm/types/Contact';
import { getDateOnlyTime } from 'app/crm/utils/dateFormat';

import InputWpp from './InputWpp';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';
import WhatsAppContainer from './WhatsAppContainer';

interface WhatsAppProps {
  contactDetail: ClientDetails;
}

export default function WhatsApp({ contactDetail }: WhatsAppProps) {
  const { firstName, lastName, whatsapps } = contactDetail;
  const [whatsappList, setWhatsappList] = useState(whatsapps);
  
  return (
    <WhatsAppContainer>
      {whatsappList.map((whatsappMessage, index) => (
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
      ))}
      <InputWpp setWhatsappList={setWhatsappList} userId={contactDetail.id} />
    </WhatsAppContainer>
  );
}
