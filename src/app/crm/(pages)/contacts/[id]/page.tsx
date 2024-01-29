import React from 'react';
import ContactService from '@services/ContactService';
import useAsyncServer from '@utils/useAsyncServer';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';

import ContactDetailPageBase from './ContactDetailPageBase';

interface ContactDetailProps {
  params: { id: string };
}

export default async function ContactDetailPage({params}: ContactDetailProps) {
  const contactDetail = await useAsyncServer( ContactService.ContactDetail(params.id) );

  return (
    <>
      <MainLayoutCRM>
        {contactDetail ? (
          <ContactDetailPageBase contactDetail={contactDetail} />
        ) : (
          <div className="flex rounded-xl bg-white ml-64 mt-2 mr-4 h-screen justify-center items-center">
            No se ha encontrado el contacto solicitado
          </div>
        )}
      </MainLayoutCRM>
    </>
  );
}
