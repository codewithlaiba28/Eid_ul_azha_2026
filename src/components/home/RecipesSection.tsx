"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Utensils, ChevronLeft, ChevronRight } from "lucide-react";

export default function RecipesSection() {
  const rowRef = useRef<HTMLDivElement>(null);

  const dishes = [
    {
      id: "mutton-karahi",
      name: "Mutton Karahi",
      arabicName: "كراهي لحم الضأن",
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=800",
      description: "Rich, tender goat meat cooked with tomatoes, ginger, and green chilies in a traditional wok.",
      time: "45 mins",
      difficulty: "Medium",
    },
    {
      id: "biryani",
      name: "Special Beef Biryani",
      arabicName: "برياني لحم البقر",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800",
      description: "Aromatic, long-grain basmati rice layered with spiced beef chunks, caramelized onions, and saffron.",
      time: "60 mins",
      difficulty: "Hard",
    },
    {
      id: "bbq-tikka",
      name: "Mutton Tikka BBQ",
      arabicName: "كباب تكا",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
      description: "Smoky, charcoal-grilled mutton cubes marinated in raw papaya, yogurt, and warm spices.",
      time: "30 mins",
      difficulty: "Medium",
    },
    {
      id: "nihari",
      name: "Beef Nihari",
      arabicName: "نهاري لحم البقر",
      image: "https://images.unsplash.com/photo-1633383718081-22ac93e3db65?w=800",
      description: "Slow-cooked beef shanks in spicy gravy, garnished with ginger, lemon, and fried onions.",
      time: "4 hours",
      difficulty: "Hard",
    },
    {
      id: "sheer-khurma",
      name: "Sheer Khurma",
      arabicName: "شير خورما",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      description: "Rich Eid vermicelli pudding slow-cooked in milk, loaded with dates, saffron, and almonds.",
      time: "25 mins",
      difficulty: "Easy",
    },
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="recipes" className="py-24 bg-transparent text-zinc-100 relative overflow-hidden">
      {/* Visual Decor */}
      <div className="absolute top-12 left-10 text-secondary/15 text-5xl font-serif font-light pointer-events-none select-none">
        🍲
      </div>
      <div className="absolute bottom-12 right-10 text-secondary/15 text-5xl font-serif font-light pointer-events-none select-none">
        🍖
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="text-center md:text-left space-y-2">
            <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center md:justify-start gap-1.5">
              <Utensils className="w-4 h-4 text-secondary" />
              <span>Festive Culinary Delights</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
              Eid Special Culinary Book
            </h2>
            <div className="w-24 h-1 bg-secondary rounded-full mx-auto md:mx-0 mt-1" />
          </div>
          
          {/* Scroll Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-secondary hover:text-black text-secondary transition-all duration-300 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-secondary hover:text-black text-secondary transition-all duration-300 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Netflix style horizontal scroll row */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x scrollbar-none snap-mandatory scroll-smooth relative"
          style={{ scrollbarWidth: "none" }}
        >
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] max-w-[350px] snap-start rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-white/[0.02] backdrop-blur-md group relative flex flex-col justify-between"
            >
              {/* Image Container with zoom */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="350px"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Meta badges on image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-secondary text-black text-[9px] font-bold tracking-wide uppercase">
                    {dish.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-zinc-100 text-[9px] font-bold tracking-wide">
                    {dish.time}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors font-poppins">
                      {dish.name}
                    </h3>
                    <span className="font-amiri text-lg text-secondary block mt-0.5">
                      {dish.arabicName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Description and link */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-xs text-zinc-300 font-light leading-relaxed h-16 overflow-hidden">
                  {dish.description}
                </p>

                <Link
                  href={`/recipes?id=${dish.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-white transition-all mt-auto border-t border-white/5 pt-3 group-hover:gap-2 duration-350"
                >
                  <span>View Full Recipe & Cooking Timer</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all recipes banner button */}
        <div className="text-center mt-6">
          <Link
            href="/recipes"
            className="px-6 py-3 rounded-full bg-secondary text-black hover:bg-yellow-500 font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_12px_rgba(229,169,59,0.2)] inline-block btn-neon-gold"
          >
            Explore Recipe Book (Step-by-Step)
          </Link>
        </div>

      </div>
    </section>
  );
}
