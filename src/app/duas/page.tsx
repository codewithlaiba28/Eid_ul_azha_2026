"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Volume2, VolumeX, ShieldAlert, Award, Star, Compass, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface DuaItem {
  id: string;
  title: string;
  arabic: string;
  english: string;
  speechText: string;
  when: string;
}

export default function DuasPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // Interactive checklist of Sunnahs
  const [checkedSunnahs, setCheckedSunnahs] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const sunnahs = [
    { title: "Wake up early in the morning", desc: "Start the auspicious day early to prepare for Namaz." },
    { title: "Perform Ghusl (Ritual Bath)", desc: "Cleanse yourself thoroughly as per the Sunnah of the Prophet (SAW)." },
    { title: "Wear your best available clothes", desc: "It is recommended to dress up in your best, clean, or new clothes." },
    { title: "Do not eat before Eid Namaz", desc: "Unlike Eid-ul-Fitr, it is Sunnah to delay eating until after the Eid-ul-Adha prayer." },
    { title: "Recite Takbeer-e-Tashreeq on the way", desc: "Recite the Takbeer aloud while walking to the Eidgah/Mosque." },
    { title: "Change routes when returning", desc: "Take a different path back home from the congregation to spread the festive vibes." }
  ];

  const pageDuas: DuaItem[] = [
    {
      id: "slaughter-before",
      title: "Dua Before Animal Sacrifice",
      arabic: "إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا ۖ وَمَا أَنَا مِنَ الْمُشْرِكِينَ. إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ. لَا شَرِيكَ لَهُ ۖ وَبِذَٰلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ. اللَّهُمَّ مِنْكَ وَلَكَ.",
      english: "I have turned my face single-mindedly towards the One who created the heavens and the earth, and I am not of the polytheists. Verily my prayer, my sacrifice, my living and my dying are for Allah, Lord of the Worlds. He has no partner, and of this I am commanded, and I am the first of those who submit. O Allah, this is from You and for You.",
      speechText: "Inni wajjahtu wajhiya lilladhi fataras samawati wal arda hanifaw wa ma ana minal mushrikin. Inna salati wa nusuki wa mahyaya wa mamati lillahi rabbil 'alamin. La sharika lahu wa bidhalika umirtu wa ana awwalul muslimin. Allahumma minka wa lak.",
      when: "Recited right before laying down the animal for sacrifice."
    },
    {
      id: "slaughter-after",
      title: "Dua After Animal Sacrifice",
      arabic: "اللَّهُمَّ تَقَبَّلْهُ مِنِّي كَمَا تَقَبَّلْتَ مِنْ حَبِيبِكَ مُحَمَّدٍ وَخَلِيلِكَ إِبْرَاهِيمَ عَلَيْهِمَا الصَّلَاةُ وَالسَّلَامُ.",
      english: "O Allah, accept it from me just as You accepted from Your beloved Muhammad (SAW) and Your friend Ibrahim (AS). (Note: If sacrificing on behalf of someone, replace 'from me' with 'from [Name]')",
      speechText: "Allahumma taqabbalhu minni kama taqabbalta min habibika Muhammadin wa khalilika Ibrahima 'alayhimas salatu was salam.",
      when: "Recited immediately after the slaughter is completed."
    }
  ];

  const handleSpeak = (id: string, text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (playingId === id) {
        setPlayingId(null);
        return;
      }
      setPlayingId(id);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ar-SA";
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSunnah = (idx: number) => {
    setCheckedSunnahs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));

    // Trigger subtle confetti if a Sunnah is completed!
    if (!checkedSunnahs[idx]) {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.8 },
        colors: ["#e5a93b", "#ffffff"]
      });
    }
  };

  return (
    <div className="bg-transparent min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Banner Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <BookOpen className="w-4 h-4 text-secondary animate-pulse" />
            <span>Sacred Knowledge & Rituals</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Duas, Sunnahs & Prayer Method
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-zinc-300 font-light">
            Prepare your heart and mind for the blessings of Eid-ul-Adha. Explore the Sunnah checklists, step-by-step Eid Namaz tutorials, and dedicated slaughter duas.
          </p>
        </div>

        {/* 1. EID SLIP SUNNAHS CHECKLIST */}
        <section className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl text-zinc-100">
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-3">
            <span className="text-2xl sm:text-3xl">✨</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">6 Sunnahs of Eid-ul-Adha</h2>
              <p className="text-xs text-zinc-400">Toggle the tasks to keep track of your Sunnah practices on Eid morning.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sunnahs.map((sunnah, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleSunnah(idx)}
                className={`p-5 rounded-2xl border cursor-pointer flex gap-4 items-start transition-all duration-300 ${
                  checkedSunnahs[idx]
                    ? "bg-secondary/5 border-secondary shadow-sm text-zinc-100"
                    : "bg-white/5 hover:bg-white/10 border-white/5"
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checkedSunnahs[idx] ? "bg-secondary border-secondary text-black font-bold" : "border-white/20 text-transparent"
                }`}>
                  ✓
                </div>
                <div>
                  <h3 className={`text-sm font-bold font-poppins transition-all duration-300 ${
                    checkedSunnahs[idx] ? "line-through text-zinc-500 font-normal" : "text-zinc-100"
                  }`}>
                    {sunnah.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed font-poppins">
                    {sunnah.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 2. EID NAMAZ STEP-BY-STEP METHOD */}
        <section className="glassmorphism-dark text-zinc-100 border border-white/10 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden bg-white/[0.02] backdrop-blur-md">
          {/* Subtle decor */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 border-t border-r border-white rounded-tr-3xl" />
          
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-3 relative z-10">
            <span className="text-2xl sm:text-3xl">🕌</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-secondary font-poppins">How to Perform Eid Namaz</h2>
              <p className="text-xs text-zinc-400">A step-by-step procedural guide with 6 extra Takbeeraat.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            {/* First Raka'at */}
            <div className="space-y-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
              <span className="px-3 py-1 bg-secondary text-black font-bold text-[10px] tracking-wider rounded-full uppercase">
                First Raka'at
              </span>
              <ul className="space-y-3.5 text-sm font-light leading-relaxed text-zinc-300 font-poppins">
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">1.</span>
                  <span>Make the intention (Niyyah) for Eid-ul-Adha prayer behind the Imam.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">2.</span>
                  <span>Say <strong>"Allahu Akbar"</strong> (Takbeer-e-Tahreema) and fold your hands.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">3.</span>
                  <span>Say Sanah (Subhanakallahumma...).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">4.</span>
                  <span>Imam says <strong>3 Extra Takbeeraat</strong>. Raise your hands to ears and release them for the first two, and fold them on the third.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">5.</span>
                  <span>Listen to Surah Al-Fatihah and another Surah, then perform Ruku & Sujood as usual.</span>
                </li>
              </ul>
            </div>

            {/* Second Raka'at */}
            <div className="space-y-4 bg-white/[0.01] border border-white/5 p-5 rounded-2xl">
              <span className="px-3 py-1 bg-secondary text-black font-bold text-[10px] tracking-wider rounded-full uppercase">
                Second Raka'at
              </span>
              <ul className="space-y-3.5 text-sm font-light leading-relaxed text-zinc-300 font-poppins">
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">1.</span>
                  <span>Stand up for the second Raka'at and fold your hands.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">2.</span>
                  <span>Listen to Surah Al-Fatihah and another Surah recited by the Imam.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">3.</span>
                  <span><strong>3 Extra Takbeeraat</strong> will be pronounced prior to Ruku. Raise hands to ears and release them for all three.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">4.</span>
                  <span>On the 4th Takbeer, go straight into Ruku without raising hands.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-secondary font-bold">5.</span>
                  <span>Complete Sujood, recite Tashahhud, Durood, Dua, say Salaam, and listen to the Khutbah!</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5 bg-secondary/10 border border-secondary/20 p-4 rounded-xl relative z-10 text-xs leading-relaxed text-secondary font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Note: Listening to the Eid Khutbah (sermon) immediately after the Salaam is a highly recommended Wajib act. Worshippers must sit silently and listen.</span>
          </div>
        </section>

        {/* 3. DEDICATED QURBANI DUAS (BEFORE & AFTER SLAUGHTER) */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
            <span className="text-2xl sm:text-3xl">🐑</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">Qurbani Duas</h2>
              <p className="text-xs text-zinc-400">Famous prayers recited before and after performing the slaughter.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {pageDuas.map((dua) => (
              <motion.div
                key={dua.id}
                className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-secondary font-poppins">{dua.title}</h3>
                      <span className="text-xs text-zinc-400 font-light mt-0.5 block">{dua.when}</span>
                    </div>

                    <button
                      onClick={() => handleSpeak(dua.id, dua.speechText)}
                      className={`p-2.5 rounded-full border transition-all ${
                        playingId === dua.id
                          ? "bg-secondary text-black border-secondary animate-pulse"
                          : "bg-white/5 border-white/10 text-secondary hover:bg-white/10"
                      }`}
                    >
                      {playingId === dua.id ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Arabic block */}
                  <div className="text-center py-3 sm:py-4 bg-white/[0.02] border border-white/5 rounded-2xl mb-4 px-2">
                    <span className="font-amiri text-xl sm:text-2xl md:text-3xl text-secondary leading-loose tracking-wide block dir-rtl">
                      {dua.arabic}
                    </span>
                  </div>

                  {/* Translation block */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] text-secondary/80 font-bold uppercase tracking-wider block font-poppins">English Translation:</span>
                      <p className="text-sm text-zinc-300 leading-relaxed font-light font-poppins">
                        {dua.english}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
