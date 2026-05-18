"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  emoji: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const emojis = ["🐑", "⭐", "🌙", "🐑", "✨"];
    const newParticles: Particle[] = Array.from({ length: 18 }).map((_, i) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 1.5 + 0.8}rem`;
      const duration = `${Math.random() * 10 + 10}s`; // between 10s and 20s
      const delay = `${Math.random() * 5}s`;
      return { id: i, emoji, left, size, duration, delay };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle select-none filter drop-shadow-[0_2px_4px_rgba(245,197,24,0.3)]"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: "ease-in-out",
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
