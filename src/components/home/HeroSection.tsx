"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Target Date: June 7, 2026 (or adjusted dynamically to remain positive)
  useEffect(() => {
    let targetYear = 2026;
    let targetDate = new Date(`June 7, ${targetYear} 00:00:00`).getTime();
    
    // If June 7, 2026 has already passed in the user's local timeline, push to next year
    const now = new Date().getTime();
    if (targetDate < now) {
      targetYear = new Date().getFullYear() + 1;
      targetDate = new Date(`June 7, ${targetYear} 00:00:00`).getTime();
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = targetDate - currentTime;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConfettiAndSound = () => {
    // Soft bell sound
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-84.wav");
    audio.volume = 0.5;
    audio.play().catch(() => {});

    // Confetti burst
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#f5c518", "#1a6b3c", "#fff8e7", "#ffd700"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Run a small confetti burst automatically on load
  useEffect(() => {
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f5c518", "#1a6b3c", "#fff8e7"],
      });
    }, 1500);
  }, []);

  return (
    <section className="bg-transparent min-h-[92vh] flex flex-col justify-between items-center text-center px-4 pt-16 pb-20 relative overflow-hidden">
      {/* Background Star Details */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="star w-1 h-1 top-24 left-[15%] animate-twinkle" style={{ animationDelay: "0.2s" }} />
        <div className="star w-1.5 h-1.5 top-44 left-[75%] animate-twinkle" style={{ animationDelay: "1s" }} />
        <div className="star w-0.5 h-0.5 top-[60%] left-[30%] animate-twinkle" style={{ animationDelay: "2.4s" }} />
        <div className="star w-2 h-2 top-[32%] left-[85%] animate-twinkle" style={{ animationDelay: "0.6s" }} />
        <div className="star w-1 h-1 top-[78%] left-[65%] animate-twinkle" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* Floating Crescent Moon */}
      <motion.div
        className="absolute top-16 right-[10%] text-secondary z-0 filter drop-shadow-[0_0_35px_rgba(229,169,59,0.35)]"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <Moon className="w-24 h-24 fill-secondary stroke-none" />
          <Star className="w-6 h-6 text-gold absolute -top-1 -left-3 animate-pulse" />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto z-10 flex-grow flex flex-col justify-center items-center mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative inline-block px-4"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-secondary to-gold opacity-20 blur-3xl animate-pulse" />
          <h1 className="font-amiri text-4xl sm:text-5xl md:text-7xl lg:text-8xl gold-gradient-text font-bold mb-5 tracking-wide leading-tight text-gold-glow">
            عيد الأضحى مبارك
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-zinc-300 text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide max-w-xl mx-auto mb-10 font-poppins px-4"
        >
          Wishing you joy, blessings & prosperity on this sacred festival.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-6 max-w-lg mx-auto w-full mb-12 px-4"
        >
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glassmorphism-dark rounded-xl sm:rounded-2xl border border-secondary/20 p-2 sm:p-3 md:p-5 flex flex-col items-center justify-center shadow-2xl relative group overflow-hidden"
            >
              {/* Subtle inner gold gradient hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-xl sm:text-2xl md:text-4xl font-extrabold text-secondary font-poppins tracking-wider">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-xs text-zinc-400 uppercase tracking-widest mt-1 sm:mt-1.5 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Glowing Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConfettiAndSound}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-secondary hover:bg-yellow-500 text-black font-bold text-sm sm:text-base md:text-lg shadow-[0_0_20px_rgba(229,169,59,0.3)] hover:shadow-[0_0_35px_rgba(229,169,59,0.6)] border-none transition-all duration-300 flex items-center gap-2 sm:gap-3 relative group btn-neon-gold"
        >
          <span className="absolute inset-0 w-full h-full rounded-full bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow text-black" />
          <span>Eid Mubarak!</span>
        </motion.button>
      </div>

      {/* Cute Animated Walking Goat (SVG) */}
      <div className="w-full flex justify-center z-10 select-none overflow-hidden h-24 md:h-32 mt-10">
        <motion.div
          animate={{
            x: ["-15vw", "15vw", "-15vw"],
            y: [0, -10, 0, -10, 0],
            scaleX: [1, 1, -1, -1, 1], // Turn around
          }}
          transition={{
            x: { duration: 28, repeat: Infinity, ease: "linear" },
            y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
            scaleX: {
              duration: 28,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.49, 0.5, 0.99, 1],
            },
          }}
          className="cursor-pointer"
          onClick={handleConfettiAndSound}
        >
          <svg
            className="w-20 h-20 md:w-28 md:h-28 fill-current text-zinc-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Goat Body */}
            <rect x="25" y="45" width="45" height="25" rx="10" />
            
            {/* Goat Head */}
            <path d="M 62 48 L 74 36 A 6 6 0 0 1 82 45 L 70 54 Z" />
            <circle cx="72" cy="42" r="1.5" fill="#10B981" />
            
            {/* Goat Ears */}
            <path d="M 68 38 Q 63 30 65 37 Z" fill="#E4E4E7" />
            
            {/* Goat Horns */}
            <path d="M 63 36 Q 59 20 66 22 Z" fill="#E5A93B" />
            <path d="M 65 34 Q 61 18 68 20 Z" fill="#E5A93B" />
            
            {/* Goat Fur/Wool clouds details */}
            <circle cx="33" cy="43" r="5" />
            <circle cx="43" cy="42" r="6" />
            <circle cx="53" cy="42" r="5" />
            <circle cx="61" cy="43" r="5" />
            <circle cx="30" cy="53" r="5" />
            <circle cx="40" cy="55" r="7" />
            <circle cx="50" cy="54" r="6" />
            <circle cx="60" cy="52" r="5" />
            <circle cx="35" cy="65" r="5" />
            <circle cx="45" cy="67" r="6" />
            <circle cx="55" cy="66" r="5" />
            <circle cx="63" cy="63" r="4" />
            
            {/* Goat Tail */}
            <path d="M 25 50 Q 15 45 22 55 Z" fill="#E4E4E7" />
            
            {/* Legs */}
            {/* Front Leg 1 */}
            <rect x="33" y="68" width="4" height="15" rx="1" fill="#E4E4E7" />
            <rect x="33" y="80" width="4" height="4" fill="#E5A93B" />
            {/* Front Leg 2 */}
            <rect x="42" y="68" width="4" height="15" rx="1" fill="#E4E4E7" />
            <rect x="42" y="80" width="4" height="4" fill="#E5A93B" />
            {/* Back Leg 1 */}
            <rect x="52" y="68" width="4" height="15" rx="1" fill="#E4E4E7" />
            <rect x="52" y="80" width="4" height="4" fill="#E5A93B" />
            {/* Back Leg 2 */}
            <rect x="60" y="68" width="4" height="15" rx="1" fill="#E4E4E7" />
            <rect x="60" y="80" width="4" height="4" fill="#E5A93B" />
            
            {/* Little pink cheeks */}
            <ellipse cx="76" cy="47" rx="3" ry="1.5" fill="#f43f5e" opacity="0.6" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
