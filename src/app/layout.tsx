import "./globals.css";
import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { CursorGlow } from "./components/CursorGlow";
import { Nav } from "./components/Nav";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hazem-saad.vercel.app"),
  title: "Hazem Saad — Software & Machine Learning Engineer",
  description:
    "Computer Engineering at the University of Waterloo, specializing in AI. Incoming SWE intern on Shopify's Developer Tools team. Robotics perception, systems, and front-end work.",
  themeColor: "#06060a",
  openGraph: {
    title: "Hazem Saad — Software & Machine Learning Engineer",
    description:
      "Computer Engineering at the University of Waterloo. Machine learning, robotics, and front-end work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="font-sans antialiased">
        <CursorGlow />
        <Nav />
        {children}
      </body>
    </html>
  );
}
