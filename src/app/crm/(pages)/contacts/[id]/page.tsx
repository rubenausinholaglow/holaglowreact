import React from 'react';
import useAsyncServer from '@utils/useAsyncServer';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import ContactService from 'app/crm/services/ContactService';

import ContactDetailPageBase from './ContactDetailPageBase';

interface ContactDetailProps {
  params: { id: string };
}

export default function ContactDetailPage({ params }: ContactDetailProps) {
  const contactDetail = useAsyncServer(ContactService.ContactDetail(params.id));

  return (
    <>
      <MainLayoutCRM>
        <ContactDetailPageBase contactDetail={contactDetail} />
      </MainLayoutCRM>
    </>
  );
}
