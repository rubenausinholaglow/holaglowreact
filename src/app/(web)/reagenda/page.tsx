import Reagenda from './Reagenda';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <Reagenda />;
}
