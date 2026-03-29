import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CheckFlow AI — Turn Prompts into Workflows",
    template: "%s | CheckFlow AI",
  },
  description: "One prompt generates your entire workflow. Visual nodes, live connections, AI automation, and a self-checking checklist. No code. Ever.",
  keywords: ["workflow automation", "AI tools", "no-code", "project management", "checklist", "productivity"],
  authors: [{ name: "CheckFlow AI" }],
  creator: "CheckFlow AI",
  metadataBase: new URL("https://checkflow.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CheckFlow AI — Turn Prompts into Workflows",
    description: "AI-powered workflow automation platform. One prompt generates your entire workflow architecture.",
    url: "https://checkflow.ai",
    siteName: "CheckFlow AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CheckFlow AI - AI-powered workflow automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckFlow AI — Turn Prompts into Workflows",
    description: "One prompt generates your entire workflow. Visual nodes, live connections, AI automation.",
    images: ["/og-image.png"],
    creator: "@checkflowai",
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
