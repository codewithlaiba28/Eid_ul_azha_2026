"use client";

import React, { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";

import RecipesSection from "@/components/home/RecipesSection";
import GallerySection from "@/components/home/GallerySection";
import WishesSection from "@/components/home/WishesSection";
import DuasSection from "@/components/home/DuasSection";

import { Loader2 } from "lucide-react";

function HomePageContent() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO & COUNTDOWN */}
      <HeroSection />

      {/* SECTION 2: ABOUT SPIRIT OF SACRIFICE */}
      <AboutSection />

      {/* SECTION 4: HORIZONTAL SCROLL RECIPES */}
      <RecipesSection />

      {/* SECTION 5: MASONRY GALLERY LIGHTBOX */}
      <GallerySection />

      {/* SECTION 6: EID WISHES GENERATOR */}
      <WishesSection />

      {/* SECTION 7: INTERACTIVE DUAS */}
      <DuasSection />

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
