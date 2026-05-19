"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Copy, Check, MessageSquare, Volume2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface GreetingTemplate {
  english: string[];
  arabic: string[];
}

export default function WishesSection() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState<"english" | "arabic">("english");
  const [theme, setTheme] = useState<"emerald" | "gold" | "night">("emerald");
  const [generatedWish, setGeneratedWish] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const templates: GreetingTemplate = {
    english: [
      "Dearest {name}, wishing you and your family a blessed Eid ul Adha! May this sacred day bring you and your loved ones eternal peace, harmony, and countless blessings from Almighty Allah. Eid Mubarak!",
      "On this holy festival of sacrifice, may the light of Allah guide you to the path of righteousness and fill your home with immense happiness and joy. Eid Mubarak, {name}!",
      "Eid Mubarak, {name}! May the divine blessings of Allah bring you peace, prosperity, and joy today and always. May your sacrifices be accepted.",
    ],
    arabic: [
      "عزيزي {name}، أتمنى لك ولعائلتك عيد أضحى مبارك! أعاده الله علينا وعليكم بالخير واليمن والبركات، وجعل أيامكم كلها سعادة وسرور. وكل عام وأنتم بخير!",
      "تقبل الله منا ومنكم صالح الأعمال، عيد مبارك يا {name}! وأعاده الله عليكم بالصحة والعافية والسرور، وغفر لنا ولكم.",
      "عيد مبارك يا {name}! نسأل الله أن يتقبل منكم الأضحية وأن يملأ حياتكم بالبركة والرحمة والخيرات الدائمة.",
    ],
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Pick a template randomly or based on name length
    const templateList = templates[lang];
    const index = name.length % templateList.length;
    const wishText = templateList[index].replace(/{name}/g, name.trim());

    setGeneratedWish(wishText);
    setCopied(false);

    // Burst confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#e5a93b", "#ffffff", "#0c1811"],
    });
  };

  const handleCopy = () => {
    if (generatedWish) {
      navigator.clipboard.writeText(generatedWish);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (generatedWish) {
      const urlEncoded = encodeURIComponent(generatedWish);
      window.open(`https://api.whatsapp.com/send?text=${urlEncoded}`, "_blank");
    }
  };

  const handleSpeak = () => {
    if (generatedWish && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(generatedWish);
      
      if (lang === "arabic") {
        utterance.lang = "ar-SA";
      } else {
        utterance.lang = "en-US";
      }
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Card themes configuration
  const cardThemes = {
    emerald: {
      bg: "bg-gradient-to-br from-[#0c1c11] to-[#040805]",
      text: "text-zinc-100",
      border: "border-secondary/40",
      accent: "text-secondary",
      glow: "shadow-[0_0_20px_rgba(229,169,59,0.15)]",
    },
    gold: {
      bg: "bg-gradient-to-br from-[#1c180c] to-[#050403]",
      text: "text-secondary",
      border: "border-secondary/50",
      accent: "text-white",
      glow: "shadow-[0_0_25px_rgba(229,169,59,0.25)]",
    },
    night: {
      bg: "bg-gradient-to-br from-[#090b10] to-[#030406]",
      text: "text-zinc-100",
      border: "border-white/10",
      accent: "text-secondary",
      glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
    },
  };

  return (
    <section id="wishes" className="py-24 bg-transparent text-zinc-100 relative overflow-hidden">
      {/* Decorative ornaments */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 border-b-2 border-l-2 border-white rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 opacity-5 border-t-2 border-r-2 border-white rounded-tr-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span>Festive Greetings Hub</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Send Blessed Eid Mubarak Greetings
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-zinc-300 text-sm md:text-base font-light">
            Generate custom, beautifully designed greeting cards to share with your friends, family, and loved ones in English or Arabic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          
          {/* Left Side: Parameters Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl text-zinc-100"
          >
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-3">
              Customize Greeting
            </h3>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Recipient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter name (e.g. Mother, Ali, Sarah)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary transition-all text-sm font-poppins"
                />
              </div>

              {/* Language Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Card Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "english", label: "English" },
                    { key: "arabic", label: "العربية (Arabic)" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setLang(item.key as any)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                        lang === item.key
                          ? "bg-secondary text-black border-secondary shadow-md btn-neon-gold font-bold"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Theme Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Visual Canvas Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "emerald", label: "Emerald Gold", color: "bg-emerald-800" },
                    { key: "gold", label: "Royal Gold", color: "bg-yellow-600" },
                    { key: "night", label: "Midnight", color: "bg-zinc-950" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTheme(item.key as any)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs border transition-all duration-300 ${
                        theme === item.key
                          ? "ring-2 ring-secondary border-transparent font-semibold shadow-md bg-white/10"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300 border-white/5"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full ${item.color} border border-white/20`} />
                      <span>{item.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-secondary text-black hover:bg-yellow-500 font-bold text-xs tracking-widest uppercase transition-all shadow-[0_4px_12px_rgba(229,169,59,0.2)] flex items-center justify-center gap-2 btn-neon-gold"
              >
                <Send className="w-4 h-4 text-black" />
                <span>Generate Wish Card</span>
              </button>
            </form>
          </motion.div>

          {/* Right Side: Generated Card Display */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center h-full min-h-[380px]">
            <AnimatePresence mode="wait">
              {generatedWish ? (
                <motion.div
                  key={generatedWish}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className={`w-full max-w-lg rounded-3xl p-8 border-4 border-double ${cardThemes[theme].bg} ${cardThemes[theme].text} ${cardThemes[theme].border} ${cardThemes[theme].glow} relative overflow-hidden flex flex-col justify-between h-[360px] sm:h-[400px]`}
                >
                  {/* Decorative card graphics */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-t-2 border-r-2 border-white rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 border-b-2 border-l-2 border-white rounded-bl-3xl" />
                  <div className="absolute top-4 left-4 text-xs font-serif opacity-30 select-none">عيد مبارك</div>
                  <div className="absolute bottom-4 right-4 text-xs font-serif opacity-30 select-none">Eid Mubarak</div>

                  {/* Card Logo / crescent */}
                  <div className="flex justify-center mb-2">
                    <span className="text-4xl animate-float">🌙</span>
                  </div>

                  {/* Card Message Body */}
                  <div className="flex-grow flex items-center justify-center px-2 py-4">
                    <p
                      className={`text-center font-light leading-relaxed text-base sm:text-lg ${
                        lang === "arabic"
                          ? "font-amiri text-2xl leading-normal tracking-wide"
                          : "font-poppins text-sm sm:text-base"
                      }`}
                    >
                      {generatedWish}
                    </p>
                  </div>

                  {/* Card Actions Panel */}
                  <div className="border-t border-white/10 pt-4 flex items-center justify-between z-10">
                    <button
                      onClick={handleSpeak}
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all flex items-center gap-1 text-xs font-medium text-zinc-300"
                      title="Read wish aloud"
                    >
                      <Volume2 className="w-4 h-4 text-secondary animate-pulse" />
                      <span className="hidden sm:inline">Listen</span>
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all flex items-center gap-1.5 text-xs font-medium text-zinc-300"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleWhatsAppShare}
                        className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 border border-transparent text-white transition-all flex items-center gap-1.5 text-xs font-semibold shadow-md"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-lg rounded-3xl p-8 border border-dashed border-white/10 flex flex-col justify-center items-center text-center h-[360px] bg-white/[0.01] backdrop-blur-sm"
                >
                  <span className="text-6xl mb-4 animate-float select-none">✉️</span>
                  <h4 className="text-lg font-bold text-white font-poppins">Greeting Card Preview</h4>
                  <p className="text-xs text-zinc-400 font-light max-w-xs mt-2 leading-relaxed">
                    Fill out the customization form and press "Generate" to create a gorgeous personalized card.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
