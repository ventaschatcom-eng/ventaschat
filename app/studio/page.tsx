import Link from "next/link";

const assets = [
  {
    slug: "carousel-1",
    title: "Carrusel #1 — 7 frases que matan tu venta",
    type: "Carrusel · 8 slides",
    status: "✅ Listo",
  },
  // se agregan más conforme los generemos
];

export default function StudioIndex() {
  return (
    <div>
      <div className="studio-page-head">
        <h1>Instagram Studio</h1>
        <p>
          Assets pre-diseñados para Instagram. Cada uno listo para capturar y publicar.
          Página privada, no indexada en buscadores.
        </p>
      </div>

      <div className="studio-grid">
        {assets.map((asset) => (
          <Link key={asset.slug} href={`/studio/${asset.slug}`} className="studio-asset-card">
            <span className="studio-asset-type">{asset.type}</span>
            <h2>{asset.title}</h2>
            <span className="studio-asset-status">{asset.status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
