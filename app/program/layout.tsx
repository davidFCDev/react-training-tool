export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-6">
      <div className="w-full inline-block text-center justify-center">
        {children}
      </div>
    </section>
  );
}
