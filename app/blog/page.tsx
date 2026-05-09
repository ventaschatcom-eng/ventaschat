import type { Metadata } from "next";
import Link from "next/link";

import { MarketingHeader } from "@/components/marketing-header";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Cómo vender mejor por WhatsApp",
  description:
    "Guías prácticas para cerrar más ventas en WhatsApp: manejo de objeciones, frases que funcionan, plantillas y comparativas. Sin teoría inflada.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog VentasChat — Cómo vender mejor por WhatsApp",
    description: "Guías prácticas para cerrar más en WhatsApp.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <MarketingHeader />
      <main className="page-shell section">
        <div className="section-heading section-heading-wide">
          <div className="eyebrow">Blog</div>
          <h1>Cómo vender mejor por WhatsApp</h1>
          <p>
            Guías concretas, sin teoría inflada, para cerrar más conversaciones de WhatsApp
            en ventas reales en LATAM.
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
      </main>
    </>
  );
}
