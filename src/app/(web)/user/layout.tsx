export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-col w-[750px] mx-auto">{children}</main>;
}
