"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, HelpCircle, Calculator, ChevronDown, CheckCircle, ShieldCheck, Tag } from "lucide-react";
import confetti from "canvas-confetti";

interface FAQ {
  q: string;
  a: string;
}

export default function PackagesPage() {
  // Share Calculator states
  const [calcAnimal, setCalcAnimal] = useState<"goat" | "cow" | "camel">("cow");
  const [calcShares, setCalcShares] = useState(1);
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(0);

  const animalSpecs = {
    goat: {
      name: "Prime Goat",
      basePrice: 25000,
      sharesLocked: true,
      meatYield: "18 - 22 kg meat",
      liveWeight: "35 - 45 kg",
      age: "1+ Years (2 Teeth confirmed)",
      origin: "Organic pastures of Punjab",
    },
    cow: {
      name: "Cholistani Cow (Share)",
      basePrice: 17500, // per Hissa (Total Cow = 120,000 / 7 shares = 17,142, rounded for clean calculations)
      sharesLocked: false,
      meatYield: "25 - 30 kg meat per share",
      liveWeight: "220 - 280 kg total weight",
      age: "2+ Years (2 Teeth confirmed)",
      origin: "Tharparkar organic cattle farms",
    },
    camel: {
      name: "Desert Camel (Share)",
      basePrice: 50000, // per Hissa (Total Camel = 350,000 / 7 shares = 50,000)
      sharesLocked: false,
      meatYield: "45 - 55 kg meat per share",
      liveWeight: "400 - 500 kg total weight",
      age: "5+ Years (4 Teeth confirmed)",
      origin: "Cholistan desert breeding centers",
    },
  };

  const calculatePrice = () => {
    const spec = animalSpecs[calcAnimal];
    const sharesCount = spec.sharesLocked ? 1 : calcShares;
    return spec.basePrice * sharesCount;
  };

  const calculateMeatYield = () => {
    const spec = animalSpecs[calcAnimal];
    if (calcAnimal === "goat") return spec.meatYield;
    const kgRange = calcAnimal === "cow" ? 28 : 50; // base kg per share
    return `${kgRange * calcShares} kg estimated meat`;
  };

  const handleCalculateConfetti = () => {
    confetti({
      particleCount: 25,
      spread: 45,
      colors: ["#e5a93b", "#ffffff"],
    });
  };

  const faqs: FAQ[] = [
    {
      q: "What are the age requirements for sacrificial animals?",
      a: "According to Shariah guidelines: Goats, Sheep, and Rams must be at least 1 year old. Cows, Oxen, and Buffaloes must be at least 2 years old. Camels must be at least 5 years old. All animals must be completely healthy, free of major injuries or blindness, and confirmed by physical inspection (teeth examination).",
    },
    {
      q: "How should Qurbani meat be distributed?",
      a: "It is highly recommended to divide the sacrificial meat into three equal parts (1/3 rules): 1/3 for your immediate family, 1/3 for your relatives, neighbors, and friends, and 1/3 for the poor, needy, and underprivileged families who rarely get to eat meat.",
    },
    {
      q: "Can multiple people share a single animal?",
      a: "Yes! A small animal like a Goat, Sheep, or Ram represents exactly 1 share (Hissa) and is sacrificed on behalf of 1 person. A large animal like a Cow, Ox, or Camel can contain up to 7 shares (Hisse) and can be shared among up to 7 individuals.",
    },
    {
      q: "When is the sacrifice performed on Eid?",
      a: "The sacrifice must be performed only AFTER the congregational Eid-ul-Adha prayer is completed on the 10th of Dhul Hijjah. Sacrifices performed before Namaz are invalid. The window remains open until sunset of the 13th of Dhul Hijjah (Days of Tashreeq).",
    },
  ];

  return (
    <div className="bg-transparent min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4 text-secondary" />
            <span>Islamic Livestock Showcase</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Qurbani Packages & Calculator
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-zinc-300 font-light">
            Review detailed animal specifications, calculate your shares and budget dynamically, and read core Shariah rules regarding your sacrifice.
          </p>
        </div>

        {/* 1. DYNAMIC SHARE BUDGET CALCULATOR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Calculator Panel (6 cols) */}
          <div className="lg:col-span-6 glassmorphism-dark rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl space-y-6 flex flex-col justify-between border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-3">
                <Calculator className="w-5 h-5 text-secondary animate-pulse" />
                <h2 className="text-xl font-bold text-white font-poppins">Qurbani Share Calculator</h2>
              </div>

              <div className="space-y-4">
                {/* Select Animal */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Select Animal Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: "goat", label: "Goat" },
                      { key: "cow", label: "Cow Share" },
                      { key: "camel", label: "Camel Share" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setCalcAnimal(item.key as any);
                          setCalcShares(1);
                          handleCalculateConfetti();
                        }}
                        className={`py-3 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                          calcAnimal === item.key
                            ? "bg-secondary text-black border-secondary font-bold shadow-[0_0_15px_rgba(229,169,59,0.3)]"
                            : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/5"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Adjust Shares slider / selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">
                    Number of Shares {calcAnimal === "goat" && "(Locked)"}
                  </label>
                  {animalSpecs[calcAnimal].sharesLocked ? (
                    <input
                      type="text"
                      disabled
                      value="1 Share (Full Goat)"
                      className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-zinc-500 text-xs font-medium cursor-not-allowed font-poppins"
                    />
                  ) : (
                    <div className="space-y-2">
                      <select
                        value={calcShares}
                        onChange={(e) => {
                          setCalcShares(Number(e.target.value));
                          handleCalculateConfetti();
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-200 focus:outline-none focus:border-secondary text-sm font-poppins"
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                          <option key={s} value={s} className="bg-zinc-900 text-zinc-100">{s} Share{s > 1 ? "s" : ""} (Hisse)</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spec breakdown details for chosen calculator */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-2 text-xs mt-4">
              <h4 className="font-bold text-secondary flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-secondary" />
                <span>Animal Spec Sheet:</span>
              </h4>
              <ul className="space-y-1.5 font-light font-poppins">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-400">Animal Breed:</span>
                  <span className="font-semibold text-zinc-200">{animalSpecs[calcAnimal].name}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-400">Age Limit:</span>
                  <span className="font-semibold text-zinc-200">{animalSpecs[calcAnimal].age}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-zinc-400">Live Weight:</span>
                  <span className="font-semibold text-zinc-200">{animalSpecs[calcAnimal].liveWeight}</span>
                </li>
                <li className="flex justify-between pt-0.5">
                  <span className="text-zinc-400">Pasture Origin:</span>
                  <span className="font-semibold text-zinc-200">{animalSpecs[calcAnimal].origin}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Invoice Result Panel (6 cols) */}
          <div className="lg:col-span-6 h-full flex flex-col justify-center">
            <motion.div
              key={calcAnimal + calcShares}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050e09]/95 text-zinc-100 rounded-3xl p-6 sm:p-8 border border-secondary/25 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full min-h-[350px] sm:min-h-[380px]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5 border-t border-r border-white rounded-tr-3xl" />
              
              <div>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block mb-1">
                  Estimated Share Calculations
                </span>
                <h3 className="text-2xl font-bold text-white font-poppins">{animalSpecs[calcAnimal].name}</h3>
                <div className="w-16 h-0.5 bg-secondary/30 rounded-full mt-2" />
              </div>

              {/* Price Display */}
              <div className="text-center py-4 sm:py-6 bg-white/[0.02] border border-white/5 rounded-2xl my-4 sm:my-6">
                <span className="text-xs text-zinc-400 uppercase tracking-widest block">Total Estimated Cost</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary font-poppins tracking-wide block mt-1 text-gold-glow">
                  Rs. {calculatePrice().toLocaleString()}
                </span>
                <span className="text-xs text-zinc-300 mt-2 sm:mt-3 block flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>Estimated meat yield: {calculateMeatYield()}</span>
                </span>
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
                <div className="text-center sm:text-left font-poppins">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Shares booked</span>
                  <span className="text-sm font-semibold text-secondary">
                    {animalSpecs[calcAnimal].sharesLocked ? "1 Full Goat" : `${calcShares} of 7 Shares`}
                  </span>
                </div>

                <Link
                  href={`/bookings?animal=${calcAnimal}`}
                  className="px-6 py-3 rounded-xl bg-secondary text-black font-bold text-xs hover:bg-yellow-500 transition-all shadow-[0_4px_12px_rgba(229,169,59,0.2)] block text-center btn-neon-gold"
                >
                  Proceed with Booking
                </Link>
              </div>

            </motion.div>
          </div>

        </section>

        {/* 2. DETAILED FAQs SECTION */}
        <section className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-secondary animate-pulse" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">Shariah Qurbani FAQs</h2>
              <p className="text-xs text-zinc-400">Important rulings and guidelines from authentic sources.</p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-white/5 last:border-b-0 pb-4 last:pb-0"
              >
                <button
                  onClick={() => setActiveFaqIdx(activeFaqIdx === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-2 font-semibold text-zinc-100 font-poppins hover:text-secondary transition-all"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                      activeFaqIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm font-light text-zinc-300 leading-relaxed pt-2 pl-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
