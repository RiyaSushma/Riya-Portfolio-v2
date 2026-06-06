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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://riya.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Riya — Full Stack Engineer & Angular Developer · Noida, India",
  description:
    "Frontend / Full Stack Developer with 1.5+ years building SaaS platforms and AI-powered systems. Specialising in Angular, React, TypeScript, Node.js, and Python. Based in Noida, India.",
  keywords: [
    "Riya",
    "Full Stack Engineer",
    "Angular Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "AI Engineer",
    "SaaS Developer",
    "Noida",
    "India",
  ],
  authors: [{ name: "Riya" }],
  creator: "Riya",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: "Riya — Full Stack Engineer & Angular Developer",
    description:
      "1.5+ years shipping SaaS platforms and AI-powered features with Angular, TypeScript, Node.js, and React.",
    siteName: "Riya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riya — Full Stack Engineer & Angular Developer",
    description: "Building SaaS platforms and AI-powered systems with Angular, TypeScript, and Node.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riya",
  jobTitle: "Associate Software Developer",
  description:
    "Frontend / Full Stack Developer with 1.5+ years building SaaS platforms and AI-powered systems using Angular, TypeScript, Node.js, and React.",
  url: SITE_URL,
  email: "riyasushma2019@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Dr. APJ Abdul Kalam Technical University",
  },
  knowsAbout: [
    "Angular",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "GCP",
    "RAG",
    "Flask",
    "MongoDB",
    "PostgreSQL",
    "Docker",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Professional Certificate in Generative AI and Machine Learning",
      educationalLevel: "Professional Certificate",
      recognizedBy: { "@type": "Organization", name: "IIT Guwahati" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Python for Data Science",
      recognizedBy: { "@type": "Organization", name: "IBM" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
