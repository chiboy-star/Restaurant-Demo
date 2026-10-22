import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AfrikBite | Authentic African Dining in Lekki, Lagos",
  description:
    "Experience the rich, authentic home-style flavors of Africa at AfrikBite Lekki. Order signature Jollof Rice, smoky Suya, rich Egusi Soup, and fresh bites in under a minute.",
  keywords: [
    "African Restaurant Lekki",
    "Lagos African Restaurant",
    "Jollof Rice Lekki",
    "Authentic Suya Lagos",
    "AfrikBite Lekki",
    "Lagos food delivery",
  ],
  openGraph: {
    title: "AfrikBite | Authentic African Home-Style Dining in Lekki",
    description:
      "Taste the difference. Authentic Jollof, smoky Suya, and rich African delicacies prepared with love in Lekki Phase 1, Lagos.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans text-cocoa antialiased selection:bg-plantain selection:text-cocoa">
        {children}
      </body>
    </html>
  );
}
