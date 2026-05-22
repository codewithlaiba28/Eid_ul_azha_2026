"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Clock, Flame, Users, Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface Ingredient {
  name: string;
  baseQty: number; // For 4 servings
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  arabicName: string;
  image: string;
  description: string;
  time: string;
  difficulty: string;
  prepTime: string;
  cookTime: string;
  ingredients: Ingredient[];
  steps: string[];
  timerSec: number; // Timer for cook mode step
}

export default function RecipesPage() {
  const recipes: Recipe[] = [
    {
      id: "mutton-karahi",
      name: "Mutton Karahi",
      arabicName: "كراهي لحم الضأن",
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?w=800",
      description: "Rich, tender goat meat cooked with fresh tomatoes, ginger, garlic, and green chilies in a traditional iron wok (Karahi).",
      time: "45 mins",
      difficulty: "Medium",
      prepTime: "15 mins",
      cookTime: "30 mins",
      timerSec: 600, // 10 minutes simmering step
      ingredients: [
        { name: "Mutton (cleaned and cut)", baseQty: 1000, unit: "g" },
        { name: "Ripe Tomatoes (quartered)", baseQty: 500, unit: "g" },
        { name: "Ginger-Garlic Paste", baseQty: 2, unit: "tbsp" },
        { name: "Green Chilies (slit)", baseQty: 6, unit: "pcs" },
        { name: "Cooking Oil/Ghee", baseQty: 0.5, unit: "cup" },
        { name: "Black Pepper (freshly crushed)", baseQty: 1, unit: "tsp" },
        { name: "Salt", baseQty: 1.5, unit: "tsp" },
        { name: "Fresh Coriander (chopped for garnish)", baseQty: 0.25, unit: "bunch" }
      ],
      steps: [
        "Heat oil/ghee in a wok (karahi) and fry the ginger-garlic paste for 1 minute until aromatic.",
        "Add the mutton pieces and sear on high heat for 5-7 minutes until they change color to light brown.",
        "Add salt, cover the wok, and let the mutton slow-cook in its own juices on low heat for 20-25 minutes until tender.",
        "Uncover, layer the quartered tomatoes and slit green chilies over the meat, cover again, and simmer for 8 minutes until tomato skins loosen.",
        "Remove the tomato skins, mash the tomatoes into a rich gravy, and stir-fry on high heat to evaporate excess water.",
        "Sprinkle freshly crushed black pepper and chopped ginger, stir for 2 minutes, garnish with fresh coriander, and serve hot with naan!"
      ]
    },
    {
      id: "biryani",
      name: "Special Beef Biryani",
      arabicName: "برياني لحم البقر",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800",
      description: "Aromatic, long-grain basmati rice layered with highly-spiced beef chunks, caramelized onions, mint, and saffron.",
      time: "60 mins",
      difficulty: "Hard",
      prepTime: "20 mins",
      cookTime: "40 mins",
      timerSec: 1200, // 20 mins Dum timer
      ingredients: [
        { name: "Beef (boneless chunks)", baseQty: 1000, unit: "g" },
        { name: "Basmati Rice (soaked for 30 mins)", baseQty: 750, unit: "g" },
        { name: "Onions (thinly sliced)", baseQty: 3, unit: "pcs" },
        { name: "Yogurt (whipped)", baseQty: 1, unit: "cup" },
        { name: "Biryani Masala powder", baseQty: 4, unit: "tbsp" },
        { name: "Ginger-Garlic Paste", baseQty: 2, unit: "tbsp" },
        { name: "Fresh Mint & Coriander leaves", baseQty: 1, unit: "cup" },
        { name: "Saffron dissolved in warm milk", baseQty: 0.25, unit: "cup" }
      ],
      steps: [
        "Boil rice in salted water with cloves, cardamom, and bay leaves until it is 70% cooked. Drain and set aside.",
        "In a deep pot, fry sliced onions in hot oil until they are golden brown. Remove half for garnishing later.",
        "Add ginger-garlic paste and beef chunks, fry for 5 minutes. Stir in the Biryani Masala, yogurt, and a cup of water.",
        "Cover and cook the beef on medium-low heat for 30-35 minutes until the meat is completely tender and oil separates.",
        "Layer the partially-cooked rice over the beef gravy. Top with caramelized onions, fresh mint, coriander, and saffron milk.",
        "Seal the pot with foil or a tight lid and let it steam on lowest heat for 15-20 minutes. Mix gently and serve!"
      ]
    },
    {
      id: "bbq-tikka",
      name: "Mutton Tikka BBQ",
      arabicName: "كباب تكا",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800",
      description: "Smoky, charcoal-grilled mutton skewers tenderized with raw papaya and marinated in traditional warm spices.",
      time: "30 mins",
      difficulty: "Medium",
      prepTime: "4 hours", // Marination
      cookTime: "30 mins",
      timerSec: 900, // 15 mins Grilling step
      ingredients: [
        { name: "Mutton (boneless, cubed)", baseQty: 1000, unit: "g" },
        { name: "Raw Papaya Paste (tenderizer)", baseQty: 2, unit: "tbsp" },
        { name: "Yogurt", baseQty: 0.5, unit: "cup" },
        { name: "Red Chili Powder", baseQty: 1.5, unit: "tsp" },
        { name: "Garam Masala Powder", baseQty: 1, unit: "tsp" },
        { name: "Lemon Juice", baseQty: 3, unit: "tbsp" },
        { name: "Ginger-Garlic Paste", baseQty: 1.5, unit: "tbsp" },
        { name: "Butter/Oil for basting", baseQty: 0.25, unit: "cup" }
      ],
      steps: [
        "Apply raw papaya paste, salt, and lemon juice to the cubed mutton pieces. Let it sit for 1 hour to tenderize.",
        "Prepare the marination with yogurt, ginger-garlic paste, red chili, garam masala, and oil. Coat the meat thoroughly.",
        "Cover and marinate in the refrigerator for at least 3-4 hours (preferably overnight for best flavor).",
        "Thread the marinated mutton cubes onto clean metal skewers, leaving a tiny space between each piece.",
        "Prepare charcoal grill. Grill the skewers over glowing red hot coals, rotating regularly for 12-15 minutes.",
        "Baste with melted butter regularly while rotating. Once fully seared and tender, slide off the skewers and serve with mint dip!"
      ]
    },
    {
      id: "nihari",
      name: "Beef Nihari",
      arabicName: "نهاري لحم البقر",
      image: "/images/beef-nihari.png",
      description: "Traditional slow-cooked beef shank stew cooked in a thick spicy gravy, served with fresh ginger and lemon.",
      time: "4 hours",
      difficulty: "Hard",
      prepTime: "15 mins",
      cookTime: "4 hours",
      timerSec: 3600, // 60 minutes slow cook segment
      ingredients: [
        { name: "Beef Shank with bones", baseQty: 1000, unit: "g" },
        { name: "Nihari Masala Spice mix", baseQty: 4, unit: "tbsp" },
        { name: "Wheat Flour dissolved in water", baseQty: 0.5, unit: "cup" },
        { name: "Ginger-Garlic Paste", baseQty: 2, unit: "tbsp" },
        { name: "Ghee/Oil", baseQty: 1, unit: "cup" },
        { name: "Ginger juliennes (for garnish)", baseQty: 2, unit: "tbsp" },
        { name: "Lemons (halved)", baseQty: 3, unit: "pcs" },
        { name: "Fried Onions", baseQty: 0.5, unit: "cup" }
      ],
      steps: [
        "Heat ghee in a large heavy pot. Add ginger-garlic paste and beef shanks. Sauté for 5 minutes.",
        "Add the Nihari Masala and fry for another 3 minutes. Pour in 5-6 cups of water and bring to a boil.",
        "Cover the pot tightly and let it simmer on very low heat for 3 to 4 hours until the beef is meltingly tender.",
        "Slowly pour the wheat flour paste into the boiling stew while whisking constantly to prevent lumps.",
        "Simmer on low heat for 15-20 minutes until the gravy thickens to a velvety consistency.",
        "In a separate pan, heat 2 tablespoons of ghee, fry a few sliced onions, and pour over the Nihari stew. Garnish and serve!"
      ]
    },
    {
      id: "sheer-khurma",
      name: "Sheer Khurma",
      arabicName: "شير خورما",
      image: "/images/sheer-khurma.png",
      description: "A rich vermicelli milk pudding loaded with dry dates, pistachios, almonds, and saffron. The ultimate Eid dessert.",
      time: "25 mins",
      difficulty: "Easy",
      prepTime: "10 mins",
      cookTime: "15 mins",
      timerSec: 300, // 5 mins simmering
      ingredients: [
        { name: "Full Cream Milk", baseQty: 1.5, unit: "L" },
        { name: "Fine Vermicelli (broken)", baseQty: 1, unit: "cup" },
        { name: "Sugar", baseQty: 0.75, unit: "cup" },
        { name: "Ghee", baseQty: 2, unit: "tbsp" },
        { name: "Dry Dates (soaked and sliced)", baseQty: 8, unit: "pcs" },
        { name: "Mixed Nuts (Almonds, Pistachios)", baseQty: 0.5, unit: "cup" },
        { name: "Cardamom Powder", baseQty: 0.5, unit: "tsp" },
        { name: "Saffron strands", baseQty: 6, unit: "pinch" }
      ],
      steps: [
        "Heat ghee in a pan. Add cardamom powder, broken vermicelli, and sliced nuts. Roast on low heat for 3 minutes until golden.",
        "In a deep pot, boil the milk. Add cardamom powder, saffron strands, and the soaked dates.",
        "Let the milk reduce on low heat for 10 minutes until slightly thickened and ivory-colored.",
        "Stir in the roasted vermicelli and nut mixture into the boiling milk. Cook on medium heat for 6-8 minutes until vermicelli is soft.",
        "Add sugar and simmer for another 5 minutes until completely dissolved. Serve warm or chilled as desired!"
      ]
    }
  ];

  const [activeRecipeIdx, setActiveRecipeIdx] = useState(0);
  const [servings, setServings] = useState(4); // Default 4 servings
  const [cookMode, setCookMode] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Read recipe id from URL parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const recipeId = params.get("id");
      if (recipeId) {
        const foundIdx = recipes.findIndex((r) => r.id === recipeId);
        if (foundIdx !== -1) {
          setActiveRecipeIdx(foundIdx);
        }
      }
    }
  }, []);
  
  // Cook Mode Timer states
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeRecipe = recipes[activeRecipeIdx];

  // Initialize timer for active step
  const startStepTimer = () => {
    setSecondsLeft(activeRecipe.timerSec);
    setTimerRunning(false);
  };

  useEffect(() => {
    if (cookMode) {
      startStepTimer();
    } else {
      setTimerRunning(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  }, [cookMode, activeStep, activeRecipeIdx]);

  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  const scaleQty = (qty: number) => {
    // baseQty is calculated for 4 servings
    return Number(((qty / 4) * servings).toFixed(1));
  };

  return (
    <div className="bg-transparent min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Utensils className="w-4 h-4 text-secondary" />
            <span>Eid Special Kitchen Companion</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Eid Special Culinary Book
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-zinc-300 font-light">
            Traditional Eid-ul-Adha recipes scaled to your party guest count. Start Cook Mode to access interactive timers and step-by-step guides!
          </p>
        </div>

        {/* Recipe Selection Tabs */}
        <div className="flex overflow-x-auto gap-3 pb-3 border-b border-white/10 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {recipes.map((recipe, idx) => (
            <button
              key={recipe.id}
              onClick={() => {
                setActiveRecipeIdx(idx);
                setCookMode(false);
                setActiveStep(0);
              }}
              className={`px-5 py-3.5 rounded-full text-xs font-semibold whitespace-nowrap border cursor-pointer transition-all duration-300 ${
                activeRecipeIdx === idx
                  ? "bg-secondary text-black border-secondary font-bold shadow-[0_0_15px_rgba(229,169,59,0.3)] animate-pulse-glow"
                  : "bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="mr-1.5">{recipe.id === "sheer-khurma" ? "🍬" : "🥩"}</span>
              <span>{recipe.name}</span>
            </button>
          ))}
        </div>

        {/* Main Recipe Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Image, Info & Dynamic Ingredients (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-6">
              <div className="relative h-56 sm:h-64 md:h-80 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={activeRecipe.image}
                  alt={activeRecipe.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                  <div>
                    <span className="font-amiri text-2xl text-secondary font-bold block">{activeRecipe.arabicName}</span>
                    <h2 className="text-xl font-bold text-white font-poppins">{activeRecipe.name}</h2>
                  </div>
                  <div className="flex gap-2 text-[10px]">
                    <span className="px-2.5 py-1 rounded-full bg-secondary text-black font-bold">
                      {activeRecipe.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Prep & Cooking Meta details */}
              <div className="grid grid-cols-3 gap-4 glassmorphism-dark border border-white/5 rounded-2xl p-4 text-center shadow-lg bg-white/[0.02]">
                <div>
                  <Clock className="w-4 h-4 text-secondary mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 uppercase block">Prep Time</span>
                  <span className="text-xs font-bold text-secondary mt-0.5 block">{activeRecipe.prepTime}</span>
                </div>
                <div className="border-x border-white/10">
                  <Flame className="w-4 h-4 text-secondary mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 uppercase block">Cook Time</span>
                  <span className="text-xs font-bold text-secondary mt-0.5 block">{activeRecipe.cookTime}</span>
                </div>
                <div>
                  <Users className="w-4 h-4 text-secondary mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 uppercase block">Total Time</span>
                  <span className="text-xs font-bold text-secondary mt-0.5 block">{activeRecipe.time}</span>
                </div>
              </div>
            </div>

            {/* Serving Size Adjuster */}
            <div className="glassmorphism-dark border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4 bg-white/[0.02] mt-4 sm:mt-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">Dynamic Ingredients Calculator</h3>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-xl border border-white/5">
                  <span className="text-xs text-zinc-400">Guests:</span>
                  <span className="text-sm font-extrabold text-secondary">{servings}</span>
                </div>
              </div>
              
              {/* slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="2"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                  <span>2 Servings</span>
                  <span>10 Servings</span>
                  <span>20 Servings</span>
                </div>
              </div>

              {/* Dynamic ingredient quantities */}
              <ul className="space-y-2 pt-3 border-t border-white/5 text-xs">
                {activeRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between py-1 border-b border-white/5 font-light">
                    <span className="text-zinc-300">{ing.name}</span>
                    <span className="font-semibold text-secondary">
                      {scaleQty(ing.baseQty)} {ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Cooking Steps Console (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            <AnimatePresence mode="wait">
              {cookMode ? (
                /* COOK MODE ACTIVE DASHBOARD */
                <motion.div
                  key="cookmode"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#050e09]/95 text-zinc-100 rounded-3xl p-5 sm:p-6 md:p-8 border border-secondary/25 shadow-2xl space-y-4 sm:space-y-6 relative overflow-hidden h-full flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5 border-t border-r border-white rounded-tr-3xl" />
                  
                  <div className="space-y-6">
                    {/* Cook Mode Header */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div>
                        <span className="px-2.5 py-1 bg-secondary text-black text-[9px] font-bold rounded-full uppercase tracking-wider">
                          Cooking Mode Active
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1.5">{activeRecipe.name}</h3>
                      </div>
                    </div>

                    {/* Step status tracker */}
                    <div className="flex justify-between text-xs text-zinc-300 font-semibold mb-2">
                      <span>Step {activeStep + 1} of {activeRecipe.steps.length}</span>
                      <span>{Math.round(((activeStep + 1) / activeRecipe.steps.length) * 100)}% Complete</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-secondary transition-all duration-300"
                        style={{ width: `${((activeStep + 1) / activeRecipe.steps.length) * 100}%` }}
                      />
                    </div>

                    {/* Step instruction content */}
                    <div className="bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                      <p className="text-sm sm:text-base font-light leading-relaxed text-zinc-200">
                        {activeRecipe.steps[activeStep]}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 mt-6">
                    {/* Circular visual timer */}
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="text-center sm:text-left">
                        <h4 className="text-sm font-semibold text-secondary">Step Timer</h4>
                        <p className="text-xs text-zinc-400 font-light mt-0.5">Simmering / Dum recommendation</p>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Timer Display */}
                        <span className="text-3xl font-mono font-bold tracking-widest text-secondary bg-zinc-950/80 border border-secondary/25 px-5 py-2.5 rounded-xl shadow-inner text-gold-glow">
                          {formatTime(secondsLeft)}
                        </span>
                      </div>
                    </div>

                    {/* Navigation Steps controls */}
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <div className="text-xs text-zinc-400">
                        Step {activeStep + 1} of {activeRecipe.steps.length}
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                /* RECIPE INSTRUCTIONS OVERVIEW */
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl space-y-4 sm:space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white font-poppins">Preparation Steps</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">Read through the step-by-step cooking guide.</p>
                    </div>
                  </div>

                  {/* List of steps */}
                  <ol className="space-y-5">
                    {activeRecipe.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </div>
  );
}
