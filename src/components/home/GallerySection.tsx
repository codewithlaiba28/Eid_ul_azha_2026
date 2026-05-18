"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      title: "The Holy Kaaba",
      category: "Sacred",
      desc: "Pilgrims performing rituals in the holy city of Makkah.",
    },
    {
      url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800",
      title: "Festive Qurbani Livestock",
      category: "Sunnah",
      desc: "Healthy livestock cared for organically at our primary pastures.",
    },
    {
      url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800",
      title: "Faisal Mosque",
      category: "Architecture",
      desc: "Stunning sunset glow illuminating the majestic domes of Faisal Mosque.",
    },
    {
      url: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=800",
      title: "Eid Family Feast",
      category: "Celebration",
      desc: "Families coming together to share smiles and delightful Eid dishes.",
    },
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
      title: "Eid Congregational Prayers",
      category: "Devotion",
      desc: "Worshippers gathering in ranks for the morning Eid-ul-Adha prayers.",
    },
    {
      url: "https://images.unsplash.com/photo-1590073844006-33379778ae09?w=800",
      title: "Traditional Sweet Treats",
      category: "Festive",
      desc: "Traditional dates, nuts, and Sheer Khurma ready for welcoming guests.",
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % images.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-dark-green text-cream relative overflow-hidden">
      {/* Stars back decoration */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="star w-1 h-1 top-24 left-1/4 animate-twinkle" />
        <div className="star w-1.5 h-1.5 bottom-24 right-1/4 animate-twinkle animate-delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Capturing Blessings</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Eid ki Khushiyan
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-cream/80 text-sm md:text-base font-light">
            Explore glimpses of sacred devotions, traditional celebrations, and beautiful Eid memories from around the world. Click any image to view in fullscreen.
          </p>
        </div>

        {/* Masonry-like Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl h-80 border border-secondary/20 shadow-lg cursor-pointer group"
              onClick={() => setActiveIdx(idx)}
            >
              {/* Image component */}
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
              
              {/* Category tag */}
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-secondary text-dark-green text-[10px] font-bold tracking-widest uppercase shadow-md">
                {img.category}
              </span>

              {/* Title & Description Box (reveals or stays elegant) */}
              <div className="absolute bottom-4 left-4 right-4 text-left transition-all duration-300 transform group-hover:translate-y-[-4px]">
                <h3 className="text-lg font-bold text-cream font-poppins group-hover:text-secondary transition-colors">
                  {img.title}
                </h3>
                <p className="text-xs text-cream/70 font-light mt-1 line-clamp-2 max-w-[90%]">
                  {img.desc}
                </p>
              </div>

              {/* Maximize Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/10 border border-cream/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-secondary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX OVERLAY PORTAL */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIdx(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-4 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-cream/5 border border-cream/15 text-cream hover:bg-secondary hover:text-dark-green transition-all"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-cream/5 border border-cream/10 text-cream hover:bg-secondary hover:text-dark-green transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-cream/5 border border-cream/10 text-cream hover:bg-secondary hover:text-dark-green transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox content */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-secondary/30 shadow-2xl flex flex-col justify-center bg-dark-green"
              >
                <Image
                  src={images[activeIdx].url}
                  alt={images[activeIdx].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Caption details below image */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="mt-6 text-center max-w-lg"
              >
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
                  {images[activeIdx].category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-cream font-poppins">
                  {images[images[activeIdx] ? activeIdx : 0].title}
                </h3>
                <p className="text-sm text-cream/70 font-light mt-2 px-4">
                  {images[activeIdx].desc}
                </p>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
