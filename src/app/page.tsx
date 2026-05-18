"use client";

import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PackagesSection from "@/components/home/PackagesSection";
import RecipesSection from "@/components/home/RecipesSection";
import GallerySection from "@/components/home/GallerySection";
import WishesSection from "@/components/home/WishesSection";
import DuasSection from "@/components/home/DuasSection";
import BookingSection from "@/components/home/BookingSection";
import { Loader2 } from "lucide-react";

function HomePageContent() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO & COUNTDOWN */}
      <HeroSection />

      {/* SECTION 2: ABOUT SPIRIT OF SACRIFICE */}
      <AboutSection />

      {/* SECTION 3: QURBANI FLIP PACKAGES */}
      <PackagesSection />

      {/* SECTION 4: HORIZONTAL SCROLL RECIPES */}
      <RecipesSection />

      {/* SECTION 5: MASONRY GALLERY LIGHTBOX */}
      <GallerySection />

      {/* SECTION 6: EID WISHES GENERATOR */}
      <WishesSection />

      {/* SECTION 7: INTERACTIVE DUAS */}
      <DuasSection />

      {/* SECTION 8: DYNAMIC BOOKING & REGISTRATION FORM */}
      <BookingSection />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex flex-col justify-center items-center bg-cream text-primary">
          <Loader2 className="w-10 h-10 animate-spin text-secondary mb-3" />
          <span className="font-medium text-sm">Loading Bakra Eid Portal...</span>
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
