import type { Metadata } from "next";
import Link from "next/link";

import { ForceLightTheme } from "@/components/force-light-theme";
import { MarketingHeader } from "@/components/marketing-header";
import { getLovePosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    absolute: "Blog LoveChat — Consejos para conquistar y responder por chat",
  },
  description:
    "Guías prácticas de amor y citas por chat: cómo conquistar, romper el hielo, qué hacer si te dejan en visto y cómo mantener conversaciones que no se apagan.",
  alternates: { canonical: "/lovechat/blog" },
  openGraph: {
    title: "Blog LoveChat — Consejos para conquistar y responder por chat",
    description:
      "Cómo conquistar, romper el hielo y qué hacer si te dejan en visto. Guías reales, sin frases de manual.",
    url: "https://ventaschat.com/lovechat/blog",
    siteName: "VentasChat",
    locale: "es_CO",
    type: "website",
  },
};

export default function LoveBlogIndexPage() {
  const posts = getLovePosts();

  return (
    <>
      <ForceLightTheme />
      <MarketingHeader variant="love" />
      <div className="lovechat-theme">
        <main className="page-shell section">
          <div className="section-heading section-heading-wide">
            <div className="eyebrow">💗 Blog LoveChat</div>
            <h1>Consejos para conquistar y responder por chat</h1>
            <p>
              Guías reales — sin frases de manual ni trucos baratos — para que tus
              conversaciones importantes no mueran en el visto.
            </p>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card card">
                <span className="blog-card-category">{post.category}</span>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta">
                  <span>{formatDate(new Date(post.publishedAt))}</span>
                  <span>·</span>
                  <span>{post.readMinutes} min de lectura</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="button button-secondary">
                  Leer artículo
                </Link>
              </article>
            ))}
          </div>

          <div className="mid-cta-strip">
            <Link href="/signup" className="button button-primary">
              Analiza tu chat gratis
            </Link>
            <span className="mid-cta-hint">
              10 análisis gratis · LoveChat te dice qué responder
            </span>
          </div>
        </main>
      </div>
    </>
  );
}
