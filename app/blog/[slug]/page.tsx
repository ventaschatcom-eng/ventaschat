import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ForceLightTheme } from "@/components/force-light-theme";
import { MarketingHeader } from "@/components/marketing-header";
import { getAllPosts, getLovePosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `https://ventaschat.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "VentasChat" },
    publisher: {
      "@type": "Organization",
      name: "VentasChat",
      logo: {
        "@type": "ImageObject",
        url: "https://ventaschat.com/brand/ventaschat-logo-clean.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ventaschat.com/blog/${post.slug}`,
    },
  };

  const isLove = post.brand === "love";

  const otherPosts = (isLove ? getLovePosts() : getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className={isLove ? "lovechat-theme" : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {isLove ? <ForceLightTheme /> : null}
      <MarketingHeader variant={isLove ? "love" : "default"} />
      <main className="page-shell section blog-article">
        <div className="blog-article-head">
          <Link href={isLove ? "/lovechat/blog" : "/blog"} className="blog-back">
            ← Volver al blog
          </Link>
          <span className="blog-card-category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-card-meta">
            <span>{formatDate(new Date(post.publishedAt))}</span>
            <span>·</span>
            <span>{post.readMinutes} min de lectura</span>
          </div>
        </div>

        <article
          className="blog-article-content card"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {isLove ? (
          <aside className="blog-cta card">
            <h3>💗 ¿No sabes qué responderle?</h3>
            <p>
              Pega tu conversación en LoveChat y descubre qué tan interesada está la
              otra persona, si es momento de avanzar y qué responder — en 15 segundos.
            </p>
            <Link href="/signup" className="button button-primary">
              Analizar mi chat gratis
            </Link>
          </aside>
        ) : (
          <aside className="blog-cta card">
            <h3>Prueba VentasChat con tu próximo cliente</h3>
            <p>
              Pega tu chat de WhatsApp y recibe puntaje de cierre, vocabulario sugerido,
              métricas y 3 respuestas listas en menos de 30 segundos.
            </p>
            <Link href="/signup" className="button button-primary">
              Empezar con 10 análisis gratis
            </Link>
          </aside>
        )}

        {otherPosts.length ? (
          <section>
            <div className="section-heading compact">
              <h2>Sigue leyendo</h2>
            </div>
            <div className="blog-grid">
              {otherPosts.map((p) => (
                <article key={p.slug} className="blog-card card">
                  <span className="blog-card-category">{p.category}</span>
                  <h3>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h3>
                  <p>{p.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
