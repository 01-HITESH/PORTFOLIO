import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: "HITESH — Full-Stack Developer",
    template: "%s | HITESH",
  },
  description:
    "Full-Stack Developer specializing in scalable web applications, design systems, and developer tooling.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Software Developer",
    "Web Developer",
  ],
  authors: [{ name: "HITESH" }],
  creator: "HITESH",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hitesh.dev",
    title: "HITESH — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in scalable web applications, design systems, and developer tooling.",
    siteName: "HITESH Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HITESH — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HITESH — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in scalable web applications, design systems, and developer tooling.",
    images: ["/og-image.png"],
    creator: "@hitesh",
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

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
