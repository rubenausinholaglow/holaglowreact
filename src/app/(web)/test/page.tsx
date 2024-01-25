'use client';

import { useEffect } from 'react';
import { gql } from '@apollo/client';
import createApolloClient from 'lib/client';

export default function Page() {
  useEffect(() => {
    GetData();

    async function GetData() {
      const client = createApolloClient('https://localhost:7096/');
      const { data } = await client.query({
        query: gql`
          query {
            products(filter: "type == Medical") {
              id
              title
              appliedProducts {
                titlte
              }
            }
          }
        `,
      });
      console.log(data);
    }
  }, []);
  return (
    <>
      <div>Test</div>
    </>
  );
}
