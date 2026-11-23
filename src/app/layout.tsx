import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import { profileData } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profileData.name} — ${profileData.headline}`,
    template: `%s | ${profileData.name}`,
  },
  description: profileData.subheadline,
  keywords: [
    "Juan David Reyes",
    "Lead Product Designer",
    "Product Designer",
    "Design Systems",
    "CRO",
    "UX/UI",
    "Frontend Builder",
    "React",
    "Next.js",
  ],
  authors: [{ name: profileData.name, url: SITE_URL }],
  creator: profileData.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profileData.name} — ${profileData.headline}`,
    description: profileData.subheadline,
    url: SITE_URL,
    siteName: profileData.name,
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.name} — ${profileData.headline}`,
    description: profileData.subheadline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${quicksand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground selection:bg-accent-soft selection:text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-background"
        >
          Ir al contenido principal
        </a>

        <LanguageProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
