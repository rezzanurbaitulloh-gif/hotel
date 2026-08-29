import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Concierge from "@/components/layout/Concierge";
import ChatWidget from "@/components/ai/ChatWidget";
import { I18nProvider } from "@/lib/i18n/provider";

const display = Cormorant_Garamond({ subsets:["latin"], variable:"--font-display", weight:["300","400","500","600","700"] });
const display2 = Playfair_Display({ subsets:["latin"], variable:"--font-display2", weight:["400","500"] });
const body = Inter({ subsets:["latin"], variable:"--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel.example.com"),
  title:{ default:"AURA — A World Beyond Ordinary", template:"%s — AURA" },
  description:"Grand Luxury Hospitality — cinematic villas, private residences, culinary journeys and immersive experiences on the Balinese cliff. Direct booking.",
  openGraph:{ title:"AURA — A World Beyond Ordinary", description:"Grand Luxury resort — villas, residences, dining, wellness. Direct booking.", type:"website", images:["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1920&q=80"] },
  twitter:{ card:"summary_large_image" }
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${display.variable} ${display2.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <I18nProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
        <Navigation />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Concierge />
        <ChatWidget />
        </I18nProvider>
        <script src="https://app.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}></script>
      </body>
    </html>
  );
}
