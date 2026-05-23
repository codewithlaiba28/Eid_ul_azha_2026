"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Heart, Sparkles } from "lucide-react";

export default function DuasSection() {


  const duas = [
    {
      id: "takbeer",
      title: "Takbeer-e-Tashreeq",
      subtitle: "تكبيرات التشريق",
      arabic: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
      english: "Allah is the greatest, Allah is the greatest. There is no deity besides Allah and Allah is the greatest. Allah is the greatest and all praise belongs to Allah.",
      recitationText: "Allahu Akbar, Allahu Akbar, La ilaha illallahu wallahu Akbar, Allahu Akbar walillahil hamd",
      benefit: "Recited aloud after every Fard prayer from the 9th to 13th of Dhul Hijjah.",
    },
    {
      id: "qurbani",
      title: "Qurbani ki Dua",
      subtitle: "دعاء الأضحية",
      arabic: "إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا ۖ وَمَا أَنَا مِنَ الْمُشْرِكِينَ. اللَّهُمَّ مِنْكَ وَلَكَ.",
      english: "I have turned my face single-mindedly towards the One who created the heavens and the earth, and I am not of the polytheists. O Allah, this sacrifice is from You and for You.",
      recitationText: "Inni wajjahtu wajhiya lilladhi fataras samawati wal arda hanifaw wa ma ana minal mushrikin. Allahumma minka wa lak.",
      benefit: "Recited right before performing the animal sacrifice (Qurbani).",
    },
    {
      id: "greeting",
      title: "Eid Greeting Dua",
      subtitle: "تهنئة العيد",
      arabic: "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ صَالِحَ الْأَعْمَالِ",
      english: "May Allah accept the righteous deeds from us and from you.",
      recitationText: "Taqabbalallahu minna wa minkum salihal a'maal",
      benefit: "The traditional greeting shared by the companions of Prophet Muhammad (SAW) on Eid day.",
    },
  ];



  return (
    <section id="duas" className="py-24 bg-transparent text-zinc-100 relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4 text-secondary animate-pulse" />
            <span>Islamic Blessings</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Duas & Blessed Prayers
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-zinc-300 text-sm md:text-base font-light">
            Recite and listen to the beautiful, sacred prayers of Eid ul Adha. Press the speaker buttons to hear the proper Arabic recitations.
          </p>
        </div>

        {/* 3 Dua Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {duas.map((dua) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism-dark rounded-3xl p-4 sm:p-5 md:p-6 border border-white/10 relative flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-[0_0_25px_rgba(229,169,59,0.25)] duration-500 text-zinc-100 bg-white/[0.02]"
            >
              {/* Gold border pulse effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-secondary/0 via-secondary/40 to-gold/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none" />

              <div>
                {/* Card Title Header */}
                <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-secondary font-poppins">{dua.title}</h3>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5 block">{dua.benefit}</span>
                  </div>
                  

                </div>

                {/* Arabic Text Display */}
                <div className="text-center py-2 sm:py-3 bg-white/[0.02] rounded-2xl border border-white/5 mb-3 px-2 sm:px-3">
                  <span className="font-amiri text-lg sm:text-xl md:text-2xl text-secondary leading-relaxed tracking-wide block dir-rtl">
                    {dua.arabic}
                  </span>
                </div>

                {/* Translation Tabs */}
                <div className="space-y-4 text-left">
                  {/* English Translation */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-secondary/80 font-bold uppercase tracking-wider block font-poppins">English Translation:</span>
                    <p className="text-xs text-zinc-300 leading-normal font-light font-poppins">
                      {dua.english}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative ornament footer */}
              <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-[10px] text-zinc-400">
                <span className="font-amiri text-xs text-secondary font-bold">{dua.subtitle}</span>
                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> Blessings</span>
              </div>

            </motion.div>
          ))}
        </div>



      </div>
    </section>
  );
}
