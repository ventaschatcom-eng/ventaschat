export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "VentasChat",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      url: "https://ventaschat.com",
      description:
        "IA que analiza conversaciones de WhatsApp para vendedores. Da puntaje de cierre, vocabulario sugerido y respuestas listas.",
      offers: [
        {
          "@type": "Offer",
          name: "Pack Starter",
          price: "20000",
          priceCurrency: "COP",
          description: "20 análisis de chats",
        },
        {
          "@type": "Offer",
          name: "Pack Growth",
          price: "50000",
          priceCurrency: "COP",
          description: "50 análisis de chats",
        },
        {
          "@type": "Offer",
          name: "Pro Ilimitado",
          price: "89000",
          priceCurrency: "COP",
          description: "Análisis ilimitados mensuales",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "12",
      },
      inLanguage: "es",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VentasChat",
      url: "https://ventaschat.com",
      logo: "https://ventaschat.com/brand/ventaschat-logo-clean.png",
      sameAs: [],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Por qué pagar por VentasChat si tengo ChatGPT gratis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ChatGPT te da un párrafo bonito cada vez que pegas un chat. VentasChat te da estructura: puntaje de cierre 0-100%, palabras concretas a usar y a evitar, métricas de engagement, urgencia y sensibilidad al precio, historial buscable de cada cliente y posibilidad de iterar el score conforme la conversación avanza.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuántos análisis necesito para tener idea?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Te damos 10 análisis gratis al registrarte. Con 3-4 chats ya verás si la lectura te aporta. No pedimos tarjeta para probar.",
          },
        },
        {
          "@type": "Question",
          name: "¿Mis chats son privados?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Los chats se almacenan cifrados en tu cuenta y solo tú los ves. No los compartimos, no los usamos para entrenar modelos públicos.",
          },
        },
        {
          "@type": "Question",
          name: "¿VentasChat es un CRM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. VentasChat es un motor de análisis y decisión comercial. Convive perfectamente con tu CRM o con un Excel.",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
