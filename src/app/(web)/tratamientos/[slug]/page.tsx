'use client';

import ProductMetaDataPage from './productMetaData';
import { useProductMetadata } from './useProductMetadata';

export default function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean; id: string };
}) {
  const { title, description } = useProductMetadata(params.slug);

  const metadata = {
    slug: params.slug,
    isDashboard: params.isDashboard,
    title: title,
    description: description,
  };

  if (metadata.title != '')
    return <ProductMetaDataPage params={metadata}></ProductMetaDataPage>;
}
