import React from 'react';
import useAsyncServerGQL from '@utils/useAsyncServerGQL';
import MainLayoutCRM from 'app/crm/components/layout/MainLayoutCRM';
import { getContactWithTasks } from 'app/GraphQL/query/ContactDetailQuery';

import ContactDetailPageBase from './ContactDetailPageBase';

interface ContactDetailProps {
  params: { id: string };
}

export default async function ContactDetailPage({
  params,
}: ContactDetailProps) {
  const contactDetail = await useAsyncServerGQL(getContactWithTasks(params.id));

  return (
    <>
      {
        <MainLayoutCRM>
          {contactDetail ? (
            <ContactDetailPageBase contactDetail={contactDetail?.user} />
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
