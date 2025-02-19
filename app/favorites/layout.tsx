export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-6">
      <div className="inline-block text-center justify-center">{children}</div>
    </section>
  );
}
