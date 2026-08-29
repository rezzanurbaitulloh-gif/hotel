import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Concierge from "@/components/layout/Concierge";
import ChatWidget from "@/components/ai/ChatWidget";

const display = Cormorant_Garamond({ subsets:["latin"], variable:"--font-display", weight:["300","400","500","600"] });
const body = Inter({ subsets:["latin"], variable:"--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel.example.com"),
  title:{ default:"AURA — Private Escape, Surrounded by Nature", template:"%s — AURA" },
  description:"A cinematic hospitality hideaway on the Balinese cliff — villas, suites, dining and private experiences. Direct booking.",
  openGraph:{ title:"AURA — Private Escape", description:"Ocean villas, jungle suites and cliff residences. Direct booking, curated experiences.", type:"website", images:["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"] },
  twitter:{ card:"summary_large_image" }
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
        <Navigation />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <Concierge />
        <ChatWidget />
        <script src="https://app.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}></script>
      </body>
    </html>
  );
}
