import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielsaquarium.com"),
  title: {
    default: "Gabriel's Aquarium — Handcrafted Aquariums, Live Fish & Custom Builds in Ghana",
    template: "%s | Gabriel's Aquarium",
  },
  description:
    "Ghana's premier aquarium specialist. Handcrafted curved-glass tanks, custom living reef installations, healthy live fish, premium feeds, and professional aquarium maintenance at American House, East Legon & Greater Accra.",
  keywords: [
    "aquarium Ghana",
    "curved glass fish tanks Accra",
    "custom aquarium builder East Legon Accra",
    "buy live fish Ghana",
    "discus fish Accra",
    "marine reef tanks Ghana",
    "aquarium maintenance service",
  ],
  authors: [{ name: "Gabriel's Aquarium" }],
  creator: "Gabriel's Aquarium",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://gabrielsaquarium.com",
    title: "Gabriel's Aquarium — Handcrafted Aquariums, Live Fish & Custom Builds in Ghana",
    description:
      "Handcrafted curved-glass panoramic tanks, living coral reefs, and healthy live fish delivered safely across Ghana.",
    siteName: "Gabriel's Aquarium",
    images: [
      {
        url: "/images/project-01-living-room-feature-tank-main.jpg",
        width: 1200,
        height: 630,
        alt: "Gabriel's Aquarium - Handcrafted Curved Glass Tanks in Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel's Aquarium — Handcrafted Aquariums & Living Reefs",
    description:
      "Custom curved-glass tanks, vibrant marine reefs, and healthy live fish in Ghana.",
    images: ["/images/project-01-living-room-feature-tank-main.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} scroll-smooth antialiased selection:bg-highlight selection:text-highlight-foreground`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
