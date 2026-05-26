"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Copy, Check, MessageSquare, Download, RefreshCw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { toBlob } from "html-to-image";
interface Quote {
  text: string;
  category: string;
  lang: "english" | "arabic";
}

export default function WishesPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [selectedQuote, setSelectedQuote] = useState("");
  const [cardTheme, setCardTheme] = useState<"emerald" | "gold" | "night" | "crimson">("emerald");
  const [cardFont, setCardFont] = useState<"amiri" | "poppins">("amiri");
  const [copied, setCopied] = useState(false);

  const predefinedQuotes: Quote[] = [
    {
      text: "May the divine blessings of Allah bring you hope, faith, and joy on Eid-ul-Adha. May all your sacrifices be accepted and rewarded by the Almighty. Eid Mubarak!",
      category: "Dua & Blessing",
      lang: "english",
    },
    {
      text: "Wishing you a warm and happy Eid. May this festival of sacrifice strengthen your faith, bring peace to your home, and fill your heart with divine bliss. Eid Mubarak!",
      category: "Blessing",
      lang: "english",
    },
    {
      text: "تقبل الله منا ومنكم صالح الأعمال وجعلنا وإياكم من عواده بالخير واليمن والبركات. عيد أضحى مبارك وكل عام وأنتم بخير وصحة وعافية!",
      category: "Traditional",
      lang: "arabic",
    },
    {
      text: "نسأل الله عز وجل أن يملأ قلوبكم بالإيمان، وبيوتكم بالاطمئنان، وأن يتقبل منكم الأضحية وصالح الطاعات. عيد سعيد مبارك!",
      category: "Dua",
      lang: "arabic",
    },
  ];

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
    crimson: {
      bg: "bg-gradient-to-br from-[#1b0808] to-[#050101]",
      text: "text-zinc-100",
      border: "border-white/10",
      accent: "text-secondary",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.1)]",
    },
  };

  const handleSelectQuote = (text: string) => {
    setSelectedQuote(text);
    // Simple confetti pop
    confetti({
      particleCount: 20,
      spread: 30,
      colors: ["#e5a93b", "#ffffff"],
    });
  };

  const getCombinedMessage = () => {
    let msg = "";
    if (recipient.trim()) msg += `To my dear ${recipient.trim()},\n\n`;
    msg += selectedQuote || "Wishing you a very blessed and happy Eid ul Adha! May all your sacrifices be accepted by Allah. Eid Mubarak!";
    if (sender.trim()) msg += `\n\nWith love,\n— ${sender.trim()}`;
    return msg;
  };

  const handleCopy = async () => {
    if (!cardRef.current) return;
    
    try {
      // Convert card element to canvas blob
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
      });

      if (blob) {
        try {
          // Copy image to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ]);
          setCopied(true);
          confetti({
            particleCount: 30,
            spread: 40,
            colors: ["#e5a93b", "#ffffff"],
          });
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy image:", err);
          // Fallback to text copy
          navigator.clipboard.writeText(getCombinedMessage());
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      } else {
        throw new Error("Failed to generate image blob");
      }
    } catch (err) {
      console.error("Failed to capture card:", err);
      // Fallback to text copy
      navigator.clipboard.writeText(getCombinedMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsApp = () => {
    const textEncoded = encodeURIComponent(getCombinedMessage());
    window.open(`https://api.whatsapp.com/send?text=${textEncoded}`, "_blank");
  };



  return (
    <div className="bg-transparent min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-secondary animate-pulse" />
            <span>Wishes & Greeting Center</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Custom Greeting Cards Studio
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-zinc-300 font-light">
            Design premium Eid greeting cards. Write your own words, select from our dua collection, and share with your loved ones!
          </p>
        </div>

        {/* Studio Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Console: Card Design Customizer (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl space-y-6 text-zinc-100">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3 font-poppins">
                Greeting Card Customizer
              </h3>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">To (Recipient)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dearest Mother"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">From (Sender)</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                  />
                </div>
              </div>

              {/* Design Controls */}
              <div className="grid grid-cols-1 gap-4 border-t border-white/5 pt-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Color Theme</label>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardTheme("emerald")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        cardTheme === "emerald"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      Emerald Gold
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardTheme("gold")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        cardTheme === "gold"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      Royal Gold
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardTheme("night")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        cardTheme === "night"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      Starry Night
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardTheme("crimson")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        cardTheme === "crimson"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      Crimson Amber
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Card Font</label>
                  <div className="flex gap-2 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardFont("amiri")}
                      className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        cardFont === "amiri"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      <span className="font-amiri">Traditional Amiri</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCardFont("poppins")}
                      className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        cardFont === "poppins"
                          ? "bg-secondary/20 border-secondary text-secondary"
                          : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      } font-poppins`}
                    >
                      <span>Sleek Poppins</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Custom Wishes Area */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Custom Greeting Text</label>
                </div>
                <textarea
                  rows={4}
                  placeholder="Select a quote from our collection below, or write your own custom Eid greetings here..."
                  value={selectedQuote}
                  onChange={(e) => setSelectedQuote(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                />
              </div>
            </div>
          </div>

          {/* Right Console: Live Card Canvas Preview (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center w-full">
            <div
              ref={cardRef}
              className={`w-full max-w-lg rounded-3xl p-6 sm:p-8 border-4 border-double ${cardThemes[cardTheme].bg} ${cardThemes[cardTheme].text} ${cardThemes[cardTheme].border} ${cardThemes[cardTheme].glow} relative overflow-hidden flex flex-col justify-between h-[350px] sm:h-[380px] md:h-[420px]`}
            >
              {/* Card visual patterns */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 border-t-2 border-r-2 border-white rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 border-b-2 border-l-2 border-white rounded-bl-3xl" />
              
              {/* Crescent decoration */}
              <div className="flex justify-center mb-2">
                <span className="text-4xl animate-float">🌙</span>
              </div>

              {/* Message content */}
              <div className="flex-grow flex flex-col justify-center items-center py-4 px-2 overflow-y-auto w-full">
                {recipient.trim() && (
                  <span className="text-xs font-semibold uppercase tracking-wider block mb-2 opacity-80 self-start">
                    To my dear {recipient.trim()},
                  </span>
                )}
                
                <p
                  className={`text-center font-light leading-relaxed ${
                    cardFont === "amiri"
                      ? "font-amiri text-2xl leading-normal tracking-wide"
                      : "font-poppins text-sm sm:text-base"
                  }`}
                >
                  {selectedQuote || "Wishing you a very blessed and happy Eid ul Adha! May all your sacrifices be accepted by Allah. Eid Mubarak!"}
                </p>

                {sender.trim() && (
                  <span className="text-xs font-semibold block mt-4 opacity-80 self-end">
                    With love, — {sender.trim()}
                  </span>
                )}
              </div>

              {/* Card Controls Panel */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between z-10 w-full gap-2">
                <div className="text-xs text-zinc-400">
                  Eid Mubarak Card
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/30 text-xs font-semibold transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsApp}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PREMADE WISHES LIBRARY */}
        <section className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl text-zinc-100">
          <div className="flex items-center gap-2.5 mb-6 border-b border-white/5 pb-3">
            <span className="text-2xl sm:text-3xl">📚</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-poppins">Greetings & Dua Library</h2>
              <p className="text-xs text-zinc-400">Click any card below to immediately load the greeting into your designer canvas above.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {predefinedQuotes.map((quote, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white/5 border border-white/5 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                      {quote.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/20 font-bold">
                      {quote.lang.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className={`text-zinc-200 font-light leading-relaxed text-sm ${
                    quote.lang === "arabic"
                      ? "font-amiri text-2xl leading-normal text-right font-semibold"
                      : "font-poppins text-xs"
                  }`}>
                    {quote.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
