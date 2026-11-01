import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://modono.in"),
  title: "Modono | Booking software and CRM for businesses",
  description:
    "Modono is booking software and CRM for businesses. Coming soon. A product of Alerone Technologies Private Limited.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Modono | Booking software and CRM for businesses",
    description: "Booking software and CRM for businesses. Coming soon.",
    url: "https://modono.in",
    siteName: "Modono",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
