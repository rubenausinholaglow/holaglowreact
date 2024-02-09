import React from 'react';
import useAsyncGQL from '@utils/useAsyncGQL';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import getContactDetail from 'app/GraphQL/query/ContactDetailQuery';

import ContactDetailPageBase from './ContactDetailPageBase';

interface ContactDetailProps {
  params: { id: string };
}

export default async function ContactDetailPage({
  params,
}: ContactDetailProps) {
  const contactDetail = await useAsyncGQL(getContactDetail(params.id));

  return (
    <>
      {
        <MainLayoutCRM>
          {contactDetail ? (
            <ContactDetailPageBase contactInfo={contactDetail?.user} />
          ) : (
            <div className="flex rounded-xl bg-white ml-64 mt-2 mr-4 h-screen justify-center items-center">
              No se ha encontrado el contacto solicitado
            </div>
          )}
        </MainLayoutCRM>
      }
    </>
  );
}
