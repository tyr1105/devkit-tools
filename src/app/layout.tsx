import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

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
  title: {
    default: "DevKit Tools - Free Online Developer Toolkit | 开发者工具箱",
    template: "%s | DevKit Tools",
  },
  description:
    "Free online developer tools: JSON formatter & validator, Base64 encoder/decoder, URL encoder/decoder, hash generator, QR code, timestamp converter, and more. Fast, private, no installation required.",
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
    "QR code generator",
    "timestamp converter",
    "在线工具",
    "开发者工具",
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
    title: "DevKit Tools - Free Online Developer Toolkit",
    description:
      "Free online developer tools: JSON formatter, Base64 encoder/decoder, URL encoder/decoder, hash generator, QR code, and more.",
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
    title: "DevKit Tools - Free Online Developer Toolkit",
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
      "Free online developer tools: JSON formatter & validator, Base64 encoder/decoder, URL encoder/decoder, hash generator, QR code, timestamp converter, and more.",
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
      "Hash Generator (MD5, SHA-1, SHA-256)",
      "QR Code Generator",
      "Timestamp Converter",
      "Regex Tester",
      "UUID Generator",
      "Color Converter",
      "Password Generator",
    ],
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    softwareVersion: "2.0.0",
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
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-64 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
