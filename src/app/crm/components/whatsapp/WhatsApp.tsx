import React, { useEffect, useState } from 'react';
import useAsyncClientGQL from '@utils/useAsyncClientGQL';
import { ClientDetails, WhatsappMessages } from 'app/crm/types/Contact';
import { getDateOnlyTime } from 'app/crm/utils/dateFormat';
import { getContactWhatsapps } from 'app/GraphQL/query/ContactDetailQuery';

import InputWpp from './InputWpp';
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';
import WhatsAppContainer from './WhatsAppContainer';

interface WhatsAppProps {
  contactDetail: ClientDetails;
}

export default function WhatsApp({ contactDetail }: WhatsAppProps) {
  const { firstName, lastName } = contactDetail;
  const [whatsappList, setWhatsappList] = useState<any>(null);
  const { data: dataWhatsapp } = useAsyncClientGQL(getContactWhatsapps(contactDetail?.id));

  useEffect(() => {
    setWhatsappList(dataWhatsapp);
  }, [dataWhatsapp]);

  return (
    <WhatsAppContainer>
      {whatsappList?.user?.whatsapps?.map(
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
      <InputWpp setWhatsappList={() => {}} userId={contactDetail.id} />
    </WhatsAppContainer>
  );
}
