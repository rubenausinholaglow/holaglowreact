import Reagenda from './reagenda';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <Reagenda searchParams={searchParams} isDerma={false}></Reagenda>;
}
