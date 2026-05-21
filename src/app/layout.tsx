import type { Metadata } from "next";
import { Poppins, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bakra Eid 2026 — Eid ul Adha Celebration & Qurbani Portal",
  description: "Wishing you a blessed Eid ul Adha! Explore our premium Qurbani packages, generate customized greetings cards, browse delicious Eid recipes, listen to duas, and manage your bookings online.",
  keywords: "Eid ul Adha, Bakra Eid, Qurbani Packages, Eid Mubarak, Eid Wishes, Eid Recipes, Islamic Duas, Eid Namaz, Qurbani Booking",
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${amiri.variable} scroll-smooth`}
    >
      <body className="bg-[#030704] text-zinc-100 min-h-screen flex flex-col font-poppins selection:bg-secondary selection:text-black relative overflow-x-hidden">
        {/* Modern glowing aura layers */}
        <div className="celestial-mesh" />

        {/* Premium Sticky Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow pt-24">
          {children}
        </main>

        {/* Premium Footer */}
        <Footer />
      </body>
    </html>
  );
}
