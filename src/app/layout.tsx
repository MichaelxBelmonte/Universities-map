import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Universities Map | Global University Explorer",
  description: "Interactive world map of universities. Currently featuring Italy with 104+ universities. Explore, search, and find your perfect university. More countries coming soon!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${jakarta.variable} antialiased bg-yl-dark text-white`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
