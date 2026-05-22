"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-transparent text-zinc-100 relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-5 border-t-2 border-l-2 border-secondary rounded-tl-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 border-b-2 border-r-2 border-secondary rounded-br-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Decorative Illustration / Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative group w-full max-w-md">
              {/* Gold frame shimmer */}
              <div className="absolute -inset-2 bg-gradient-to-r from-secondary to-gold opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-all duration-700" />
              <div className="relative rounded-2xl overflow-hidden border border-secondary/25 shadow-2xl h-64 sm:h-80 md:h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800"
                  alt="Beautiful Mosque at Sunset"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Spirit of Sacrifice text details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-2 text-secondary font-semibold tracking-widest text-[10px] uppercase font-poppins">
              <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>Significance of Eid ul Adha</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold gold-gradient-text tracking-wide leading-tight">
              The Spirit of Sacrifice
            </h2>
            
            <div className="w-20 h-1 bg-secondary rounded-full" />

            <div className="space-y-5 text-zinc-300 text-sm md:text-base leading-relaxed font-light font-poppins">
              <p>
                <strong className="text-secondary font-medium">Eid ul Adha</strong>, also known as the Festival of Sacrifice, commemorates the profound devotion and unwavering faith of Prophet Ibrahim (AS), who was prepared to sacrifice his son Ismail (AS) in obedience to Allah's command. Realizing his total submission, Allah substituted a ram in Ismail's place.
              </p>
              <p>
                This holy occasion is a beautiful reminder that true sacrifice is about selflessness, devotion, and compassion. It urges us to share our blessings with those in need, fostering unity, love, and charity across the global community.
              </p>
              <p>
                By participating in Qurbani, we not only fulfill a sacred Sunnah but also extend a hand of support to the underprivileged, ensuring that everyone can partake in the joy and festive meals of Eid.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl">
                <span className="text-2xl">🤝</span>
                <span className="text-xs font-semibold text-zinc-200">100% Charity Distribution</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 bg-secondary/5 border border-secondary/20 rounded-2xl">
                <span className="text-2xl">⭐</span>
                <span className="text-xs font-semibold text-secondary">Sacred Sunnah Revived</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
