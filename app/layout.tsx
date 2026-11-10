import type { Metadata } from "next";
import { Bodoni_Moda, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecozycod3r.github.io"),
  title: "Dhruv Shricharan — growth, data and operations",
  description:
    "Dhruv Shricharan builds the systems a growing business runs on: outbound, delivery ops, client reporting and finance. Founders' Office at Digital Advantage Media, formerly Decision Scientist for Mars Inc.",
  openGraph: {
    title: "Dhruv Shricharan",
    description: "I build the systems a growing business runs on.",
    images: [{ url: "/og-dhruv-beach.jpeg", width: 900, height: 1100, alt: "Dhruv Shricharan" }],
  },
};

/* Runs before first paint: if motion is welcome, hold the hero cards back so
   the deal can start from the deck instead of flashing the finished layout.
   A timer releases the hold if the page script never arrives. */
const holdTheDeal = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('deal-pending');setTimeout(function(){d.classList.remove('deal-pending')},6000)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${schibsted.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: holdTheDeal }} />
        {children}
      </body>
    </html>
  );
}
