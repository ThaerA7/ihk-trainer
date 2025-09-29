export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="space-y-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600">Rechte Seite ist vorerst leer — Platz für künftige Inhalte.</p>
    </section>
  );
}