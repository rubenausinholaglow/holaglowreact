import Reagenda from 'app/(web)/reagenda/reagenda';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <Reagenda searchParams={searchParams}></Reagenda>;
}
