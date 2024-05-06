import Check30 from './Check30';

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const diagnosticId = searchParams.diagnosticId as string;
  const userId = searchParams.userId as string;

  if (!diagnosticId) return <p>No se ha encontrado el diagnostico</p>;

  return <Check30 diagnosticId={diagnosticId} userId={userId} />;
}
