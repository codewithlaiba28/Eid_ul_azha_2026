"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Moon, Star } from "lucide-react";
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

  const handleConfettiAndSound = () => {    // Confetti burst
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
      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto z-10 flex-grow flex flex-col justify-center items-center mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative inline-block px-4"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-secondary to-gold blur-3xl animate-pulse-soft" />
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


      </div>
    </section>
  );
}
