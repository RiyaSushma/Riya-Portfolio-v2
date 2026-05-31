import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riya — Software Developer & Full Stack Engineer",
  description:
    "Software Developer specializing in scalable web platforms, Angular, React, Node.js, and AI-powered systems. Based in New Delhi, India.",
  keywords: [
    "Riya",
    "Software Developer",
    "Full Stack Engineer",
    "Angular Developer",
    "React Developer",
    "AI/ML Engineer",
    "New Delhi",
    "India",
  ],
  authors: [{ name: "Riya G." }],
  creator: "Riya G.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Riya — Software Developer & Full Stack Engineer",
    description:
      "Building scalable web platforms and AI-powered systems with modern engineering practices.",
    siteName: "Riya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riya — Software Developer",
    description: "Building scalable web platforms and AI-powered systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
