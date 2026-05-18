"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function PackagesSection() {
  const packages = [
    {
      id: "bakra",
      emoji: "🐑",
      name: "Bakra (Goat)",
      arabicName: "خروف",
      price: "Rs. 25,000",
      shares: "1 Hissa (Full Animal)",
      description: "Healthy prime-grade goat. Complete veterinary clearance, feed-controlled, and ethically sourced.",
      weight: "35 - 45 kg live weight",
      benefits: ["Individual Sacrifice", "Home Delivery Available", "Skin Donated to Charity"],
    },
    {
      id: "gaay",
      emoji: "🐄",
      name: "Gaay (Cow)",
      arabicName: "بقرة",
      price: "Rs. 1,20,000",
      shares: "7 Hisse (Full Cow Share)",
      sharePrice: "Rs. 17,500 per Hissa",
      description: "Prime local breed cow. Highly customizable share options. Sourced from high-care organic farms.",
      weight: "220 - 280 kg live weight",
      benefits: ["Shared Sacrifice (7 parts)", "Hissa Customization", "Distributed to Needy Families"],
    },
    {
      id: "oonth",
      emoji: "🐪",
      name: "Oonth (Camel)",
      arabicName: "جمل",
      price: "Rs. 3,50,000",
      shares: "7 Hisse (Full Camel)",
      sharePrice: "Rs. 50,000 per Hissa",
      description: "Premium desert breed camel. Grand traditional sacrifice. Perfect for massive charity distribution.",
      weight: "400 - 500 kg live weight",
      benefits: ["Grand Sunnah Sacrifice", "Exceptional Meat Quality", "Massive charity distribution footprint"],
    },
  ];

  return (
    <section id="packages" className="py-24 bg-transparent text-zinc-100 relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="star w-1.5 h-1.5 top-12 left-10 animate-twinkle" />
        <div className="star w-1 h-1 top-36 right-20 animate-twinkle animate-delay-1000" />
        <div className="star w-0.5 h-0.5 bottom-24 left-1/3 animate-twinkle animate-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>Qurbani Packages 2026</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Choose Your Sacred Qurbani Package
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-zinc-300 text-sm md:text-base font-light">
            Select from our healthy, premium-care livestock for a seamless and rewarding sacrifice. Hover over the cards to view details and book your sacrifice.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch mb-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flip-card w-full h-[450px] relative group"
            >
              <div className="flip-card-inner w-full h-full duration-700 shadow-2xl rounded-2xl group-hover:shadow-[0_0_30px_rgba(229,169,59,0.35)]">
                
                {/* CARD FRONT */}
                <div className="flip-card-front flex flex-col justify-between p-8 border border-white/10 relative overflow-hidden bg-white/[0.02] backdrop-blur-md">
                  {/* Decorative background pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10 border-t border-r border-secondary rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10 border-b border-l border-secondary rounded-bl-xl" />
                  
                  {/* Card Front Top */}
                  <div className="text-center mt-6 space-y-4">
                    <span className="text-7xl block animate-bounce filter drop-shadow-[0_5px_8px_rgba(0,0,0,0.6)]">
                      {pkg.emoji}
                    </span>
                    <div>
                      <h3 className="text-2xl font-poppins font-bold text-white">
                        {pkg.name}
                      </h3>
                      <span className="font-amiri text-2xl text-secondary block mt-1">
                        {pkg.arabicName}
                      </span>
                    </div>
                  </div>

                  {/* Card Front Info Snippet */}
                  <div className="space-y-2 text-center text-xs text-zinc-400 font-light max-w-xs mx-auto">
                    <p className="border-t border-white/5 pt-4">
                      {pkg.weight}
                    </p>
                    <p className="flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                      <span>Veterinary & Shariah Compliant</span>
                    </p>
                  </div>

                  {/* Flip Hint */}
                  <div className="text-center text-secondary/70 text-xs font-semibold animate-pulse flex items-center justify-center gap-1 mb-2">
                    <span>Hover to Flip</span>
                    <ArrowRight className="w-3 h-3 rotate-45" />
                  </div>
                </div>

                {/* CARD BACK */}
                <div className="flip-card-back flex flex-col justify-between p-6 overflow-hidden">
                  {/* Card Back Header */}
                  <div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                      <span className="text-3xl">{pkg.emoji}</span>
                      <span className="text-sm font-semibold text-secondary uppercase tracking-widest">{pkg.name}</span>
                    </div>
                    
                    <div className="text-center mb-4">
                      <span className="text-3xl font-extrabold text-secondary font-poppins block text-gold-glow">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-zinc-300 font-semibold uppercase tracking-wider mt-0.5 block">
                        {pkg.shares}
                      </span>
                      {pkg.sharePrice && (
                        <span className="text-xs text-zinc-400 italic mt-1 block">
                          ({pkg.sharePrice})
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-300 font-light leading-relaxed text-center px-2 mb-4 border-b border-white/5 pb-3">
                      {pkg.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5 text-xs text-left max-w-[210px] mx-auto text-zinc-300">
                      {pkg.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-secondary font-bold">✓</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button */}
                  <Link
                    href={`/bookings?animal=${pkg.id}`}
                    className="w-full py-3 rounded-xl bg-secondary text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_12px_rgba(229,169,59,0.2)] block text-center btn-neon-gold"
                  >
                    Book Now
                  </Link>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Standard Info/Guarantee bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glassmorphism max-w-4xl mx-auto rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left bg-white/[0.02]"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🩺</span>
            <div>
              <h4 className="font-semibold text-secondary text-sm">Full Medical Checkups</h4>
              <p className="text-xs text-zinc-400 font-light">Certified vets monitor all animals daily</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧼</span>
            <div>
              <h4 className="font-semibold text-secondary text-sm">Hygienic Sacrifice</h4>
              <p className="text-xs text-zinc-400 font-light">Islamic, government-approved slaughters</p>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-3xl">📦</span>
            <div>
              <h4 className="font-semibold text-secondary text-sm">Chilled Delivery</h4>
              <p className="text-xs text-zinc-400 font-light">Vaccuum sealed in cold chain vans</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
