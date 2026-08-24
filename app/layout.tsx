import type { Metadata, Viewport } from "next";
import "./globals.css";

const publicSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://vademecum-nutricional.mijailt839.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: "Vademécum Nutricional",
  description:
    "Consulta fórmulas nutricionales y calcula requerimientos, brechas y aportes por presentación.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vademécum",
  },
  openGraph: {
    title: "Vademécum Nutricional",
    description: "Fórmulas y cálculo clínico en un solo lugar.",
    type: "website",
    locale: "es_MX",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Vademécum Nutricional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vademécum Nutricional",
    description: "Fórmulas y cálculo clínico en un solo lugar.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#002060",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
