import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
  openGraph: {
    title: `${profileData.name} — ${profileData.headline}`,
    description: profileData.subheadline,
    type: "website",
    locale: "es_CO",
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

        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
