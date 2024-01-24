export default function ContainerCRM({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white ml-64 mt-2 mr-4 px-4 py-4 h-screen overflow-y-auto">
      {children}
    </div>
  );
}
