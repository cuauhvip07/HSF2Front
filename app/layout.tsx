import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hotelsantafechignahuapan.com"),
  title: {
    default: "Hotel Santa Fe Chignahuapan | Hospedaje en el Pueblo Mágico de Puebla",
    template: "%s | Hotel Santa Fe Chignahuapan",
  },
  description:
    "Disfruta de tu estancia en Hotel Santa Fe en Chignahuapan, Puebla. Habitaciones confortables, excelente ubicación céntrica y atención familiar.",
  keywords: [
    "Hotel en Chignahuapan",
    "Hoteles en Chignahuapan Puebla",
    "Hotel Santa Fe Chignahuapan",
    "Dónde hospedarse en Chignahuapan",
    "Hospedaje céntrico Chignahuapan",
    "Hoteles cerca de las Aguas Termales Chignahuapan",
  ],
  authors: [{ name: "Hotel Santa Fe Chignahuapan" }],
  creator: "Hotel Santa Fe",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.hotelsantafechignahuapan.com",
    title: "Hotel Santa Fe Chignahuapan | Hospedaje en Puebla",
    description:
      "Habitaciones cómodas y céntricas para disfrutar del Pueblo Mágico de Chignahuapan, Puebla.",
    siteName: "Hotel Santa Fe Chignahuapan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Datos estructurados Schema.org para Google (Rich Snippets)
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Santa Fe Chignahuapan",
    image: "https://www.hotelsantafechignahuapan.com/og-image.jpg",
    "@id": "https://www.hotelsantafechignahuapan.com",
    url: "https://www.hotelsantafechignahuapan.com",
    telephone: "+527971405931",
    priceRange: "MXN $$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lerdo 47, Teoconchila",
      addressLocality: "Chignahuapan",
      addressRegion: "Puebla",
      postalCode: "73300",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.838,
      longitude: -98.031,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: "4.5",
    },
  };

  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}