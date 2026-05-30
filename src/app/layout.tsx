import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://tyr1105.github.io/devkit-tools";

export const metadata: Metadata = {
  title: "DevKit - Free Online Developer Tools | JSON, Base64, URL Encoder & More",
  description:
    "Free online developer tools: JSON formatter & validator, Base64 encoder/decoder, URL encoder/decoder, hash generator, and more. Fast, private, no installation required.",
  keywords: [
    "developer tools",
    "online tools",
    "JSON formatter",
    "JSON validator",
    "Base64 encoder",
    "Base64 decoder",
    "URL encoder",
    "URL decoder",
    "hash generator",
    "web developer tools",
    "free developer tools",
    "devkit",
    "code tools",
    "text tools",
  ],
  authors: [{ name: "tyr1105" }],
  creator: "tyr1105",
  publisher: "tyr1105",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "DevKit Developer Tools",
    title: "DevKit - Free Online Developer Tools",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder/decoder, URL encoder/decoder, hash generator, and more. Fast, private, no installation required.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DevKit - Free Online Developer Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevKit - Free Online Developer Tools",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder/decoder, URL encoder/decoder, and more.",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DevKit Developer Tools",
    url: siteUrl,
    description:
      "Free online developer tools: JSON formatter & validator, Base64 encoder/decoder, URL encoder/decoder, hash generator, and more.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "tyr1105",
      url: "https://github.com/tyr1105",
    },
    featureList: [
      "JSON Formatter & Validator",
      "Base64 Encoder & Decoder",
      "URL Encoder & Decoder",
      "Hash Generator",
      "Text Transformation Tools",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "1.0.0",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
