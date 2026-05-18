"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { User, ClipboardList, ShieldCheck, MapPin, Truck, Compass, CheckCircle2, ChevronRight, RefreshCw, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";

interface TimelineStep {
  label: string;
  desc: string;
  done: boolean;
  time: string;
}

interface Booking {
  invoiceId: string;
  name: string;
  phone: string;
  city: string;
  animalType: string;
  shares: number;
  date: string;
  status: string;
  timeline: TimelineStep[];
}

function BookingsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search Param invoice
  const invoiceParam = searchParams.get("invoice");
  const animalParam = searchParams.get("animal");

  const [activeInvoice, setActiveInvoice] = useState("");
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [localBookings, setLocalBookings] = useState<Booking[]>([]);

  // Form states (if no booking)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Makkah",
    animalType: "goat",
    shares: 1,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formLoadingStep, setFormLoadingStep] = useState(0);

  const loadingSteps = [
    "Contacting pasture operations...",
    "Selecting certified healthy animal...",
    "Generating electronic health tag...",
    "Securing Shariah share mappings..."
  ];

  // Load existing bookings from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("qurbani_bookings");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLocalBookings(parsed);

        // Auto select the first booking or URL parameter booking
        if (invoiceParam) {
          const match = parsed.find((b: Booking) => b.invoiceId === invoiceParam);
          if (match) {
            setCurrentBooking(match);
            setActiveInvoice(invoiceParam);
          }
        } else if (parsed.length > 0) {
          setCurrentBooking(parsed[0]);
          setActiveInvoice(parsed[0].invoiceId);
        }
      }
    }
  }, [invoiceParam]);

  // Handle URL animal selection
  useEffect(() => {
    if (animalParam && ["bakra", "gaay", "oonth", "goat", "cow", "camel"].includes(animalParam)) {
      const standardType = animalParam === "bakra" ? "goat" : animalParam === "gaay" ? "cow" : animalParam === "oonth" ? "camel" : animalParam;
      setFormData((prev) => ({
        ...prev,
        animalType: standardType,
        shares: 1,
      }));
    }
  }, [animalParam]);

  const handleSelectBooking = (invoice: string) => {
    const match = localBookings.find((b) => b.invoiceId === invoice);
    if (match) {
      setCurrentBooking(match);
      setActiveInvoice(invoice);
      confetti({
        particleCount: 15,
        spread: 30,
        colors: ["#e5a93b", "#ffffff"]
      });
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setFormLoading(true);
    setFormLoadingStep(0);

    const interval = setInterval(() => {
      setFormLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      const rand = Math.floor(100000 + Math.random() * 900000);
      const newInvoice = `EID-${rand}-Q`;

      const newBooking: Booking = {
        invoiceId: newInvoice,
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        animalType: formData.animalType,
        shares: formData.shares,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "Confirmed",
        timeline: [
          { label: "Booking Received", desc: "Your booking is verified and captured.", done: true, time: "Just now" },
          { label: "Pasture Allocation", desc: "Selecting a healthy prime animal at pasture.", done: true, time: "1 min ago" },
          { label: "Veterinary Clearance", desc: "Complete medical checkup & health tagging.", done: true, time: "Just now" },
          { label: "Sacrifice Executed", desc: "Sacrifice in accordance with Islamic laws on Eid day.", done: false, time: "Pending" },
          { label: "Meat Distribution", desc: "Portion separation & chilled distribution delivery.", done: false, time: "Pending" },
        ],
      };

      const updated = [newBooking, ...localBookings];
      setLocalBookings(updated);
      setCurrentBooking(newBooking);
      setActiveInvoice(newInvoice);
      setFormLoading(false);

      if (typeof window !== "undefined") {
        localStorage.setItem("qurbani_bookings", JSON.stringify(updated));
      }

      // Massive confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e5a93b", "#ffffff", "#0c1811"]
      });

      router.push(`/bookings?invoice=${newInvoice}`);
    }, 4200);
  };

  const getAnimalEmoji = (type: string) => {
    if (type === "bakra" || type === "goat") return "🐑";
    if (type === "gaay" || type === "cow") return "🐄";
    return "🐪";
  };

  return (
    <div className="bg-transparent min-h-screen text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4 text-secondary animate-pulse" />
            <span>Qurbani Vault & Tracking</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-amiri font-bold text-secondary tracking-wide text-gold-glow">
            Qurbani Booking Tracker
          </h1>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto" />
          <p className="text-sm md:text-base text-zinc-300 font-light">
            Register new bookings, download your invoice receipts, and track the live veterinary, sacrifice, and meat distribution milestones.
          </p>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: BOOKINGS LIST OR NEW REGISTRATION (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Booking selector panel (if bookings exist) */}
            {localBookings.length > 0 && (
              <div className="glassmorphism-dark border border-white/10 rounded-3xl p-5 shadow-2xl space-y-4 bg-white/[0.02] backdrop-blur-md text-zinc-100">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Your Bookings List</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {localBookings.map((b) => (
                    <button
                      key={b.invoiceId}
                      onClick={() => handleSelectBooking(b.invoiceId)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 ${
                        activeInvoice === b.invoiceId
                          ? "bg-secondary/10 border-secondary text-secondary shadow-[0_0_15px_rgba(229,169,59,0.15)] font-bold"
                          : "bg-white/5 hover:bg-white/10 border-white/5 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getAnimalEmoji(b.animalType)}</span>
                        <div>
                          <span className="text-xs font-bold font-poppins block">{b.invoiceId}</span>
                          <span className="text-[10px] text-zinc-400 block font-poppins">{b.date}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-secondary animate-pulse" />
                    </button>
                  ))}
                </div>

                {/* Add new button */}
                <button
                  onClick={() => {
                    setCurrentBooking(null);
                    setActiveInvoice("");
                  }}
                  className="w-full py-2.5 rounded-xl border border-dashed border-white/20 text-secondary hover:bg-white/5 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  + Book Another Sacrifice
                </button>
              </div>
            )}

            {/* Registration mini summary */}
            <div className="bg-[#050e09]/95 text-zinc-100 border border-secondary/25 rounded-3xl p-5 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 opacity-5 border-t border-r border-white rounded-tr-3xl" />
              <h3 className="font-bold text-xs text-secondary uppercase tracking-wider">Secured Qurbani Vault</h3>
              <p className="text-[11px] text-zinc-300 leading-relaxed font-light font-poppins">
                All animal allocations are confirmed by professional veterinary specialists and mapped with legal Shariah name declarations in our local database system.
              </p>
              <div className="flex gap-2 text-[10px] font-semibold text-secondary pt-2">
                <span>🛡️ Certified Vets</span>
                <span>⚖️ 100% Compliant</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: LIVE TRACKER OR BOOKING FORM (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {currentBooking ? (
                /* LIVE TRACKING DISPLAY */
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 text-zinc-100"
                >
                  {/* Dashboard Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                    <div>
                      <span className="text-[10px] text-secondary font-extrabold uppercase tracking-widest block">Live Status Tracking</span>
                      <h2 className="text-2xl font-bold text-white font-poppins mt-1">Invoice ID: {currentBooking.invoiceId}</h2>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-md animate-pulse">
                        {currentBooking.status}
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-zinc-200 border border-white/10 rounded-full text-xs font-bold">
                        {getAnimalEmoji(currentBooking.animalType)} {currentBooking.animalType.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Customer details banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs font-poppins">
                    <div>
                      <span className="text-zinc-400 uppercase block font-semibold text-[9px] tracking-wider">Booked Name:</span>
                      <span className="font-bold text-white mt-1 block">{currentBooking.name}</span>
                    </div>
                    <div className="border-l border-white/10 pl-3">
                      <span className="text-zinc-400 uppercase block font-semibold text-[9px] tracking-wider">Contact phone:</span>
                      <span className="font-bold text-white mt-1 block">{currentBooking.phone}</span>
                    </div>
                    <div className="border-l border-white/10 pl-3">
                      <span className="text-zinc-400 uppercase block font-semibold text-[9px] tracking-wider">Shares slot:</span>
                      <span className="font-bold text-white mt-1 block">{currentBooking.shares} Share{currentBooking.shares > 1 ? "s" : ""}</span>
                    </div>
                    <div className="border-l border-white/10 pl-3">
                      <span className="text-zinc-400 uppercase block font-semibold text-[9px] tracking-wider">Registration:</span>
                      <span className="font-bold text-white mt-1 block">{currentBooking.city}</span>
                    </div>
                  </div>

                  {/* Veterinary tag card info */}
                  <div className="border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row justify-between gap-6 shadow-md bg-white/[0.01]">
                    <div className="space-y-2">
                      <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                        <span>Veterinary Tag clearance</span>
                      </h4>
                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        A dedicated healthy animal has been allocated. Sourced from Cholistan pastures, veterinary record check cleared, quarantine period passed.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center shrink-0 min-w-[150px]">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Allocated Tag ID</span>
                      <span className="text-xs font-extrabold text-secondary block mt-1 font-mono">PK-VE-7890-QA</span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold mt-1.5 inline-block">Active - Clean</span>
                    </div>
                  </div>

                  {/* Visual tracking timeline */}
                  <div className="space-y-6">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider border-b border-white/5 pb-2">
                      Sacrifice Processing Milestones
                    </h4>
                    
                    <div className="relative border-l-2 border-white/10 ml-3.5 pl-6 space-y-6">
                      {currentBooking.timeline.map((step, idx) => (
                        <div key={idx} className="relative">
                          {/* Dot indicator */}
                          <div className={`absolute -left-10 w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            step.done
                              ? "bg-secondary border-secondary text-black font-bold text-xs"
                              : "bg-zinc-900 border-white/10 text-zinc-500 text-xs font-semibold"
                          }`}>
                            {step.done ? "✓" : idx + 1}
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h5 className={`text-sm font-bold font-poppins ${step.done ? "text-secondary" : "text-zinc-400"}`}>
                                {step.label}
                              </h5>
                              <span className="text-[10px] text-zinc-500">{step.time}</span>
                            </div>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location coordinate mapping display (Wow factor) */}
                  <div className="bg-white/[0.01] border border-white/10 rounded-2xl p-5 space-y-4">
                    <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>Pasture Location Mapping (Live Coordinates)</span>
                    </h4>
                    
                    <div className="relative h-48 bg-[#030704]/90 border border-white/10 rounded-xl overflow-hidden shadow-inner flex justify-center items-center">
                      {/* Radar lines and grid decor */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent opacity-40" />
                      <div className="absolute inset-0 border border-white/5 rounded" />
                      <div className="absolute w-px h-full bg-white/5 left-1/2" />
                      <div className="absolute h-px w-full bg-white/5 top-1/2" />
                      
                      {/* Interactive blinking pasture point */}
                      <div className="relative z-10 flex flex-col items-center">
                        <span className="absolute w-8 h-8 rounded-full bg-secondary/20 border border-secondary/50 animate-ping" />
                        <span className="absolute w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_#e5a93b]" />
                        <span className="text-[9px] text-secondary font-extrabold uppercase tracking-widest mt-6 bg-zinc-950 border border-secondary/25 px-2 py-0.5 rounded shadow-md">
                          Pasture Section B-1
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 text-[10px] text-zinc-500 font-mono tracking-wider font-light">
                        Lat: 24.8607° N | Long: 67.0011° E
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                /* NEW REGISTRATION FORM PANEL */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glassmorphism-dark border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl relative text-zinc-100"
                >
                  {/* Interactive form loader overlay */}
                  <AnimatePresence>
                    {formLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-zinc-950/95 z-30 rounded-3xl flex flex-col justify-center items-center p-6 text-center"
                      >
                        <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
                        <h3 className="text-lg font-bold text-white font-poppins">Allocating Booking Slot</h3>
                        
                        <motion.p
                          key={formLoadingStep}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs text-zinc-400 max-w-xs mt-2 font-light leading-relaxed h-12"
                        >
                          {loadingSteps[formLoadingStep]}
                        </motion.p>

                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-6 relative border border-white/5">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-3 font-poppins">
                    Qurbani Registration Form
                  </h3>

                  <form onSubmit={handleCreateBooking} className="space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +92 300 1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                      />
                    </div>

                    {/* City & Type */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* City */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">City</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                        >
                          {["Makkah", "Madinah", "Dubai", "London", "Karachi", "Lahore", "Islamabad", "Riyadh", "New York"].map((c) => (
                            <option key={c} value={c} className="bg-zinc-900 text-zinc-100">{c}</option>
                          ))}
                        </select>
                      </div>

                      {/* Animal Choice */}
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">Animal Type</label>
                        <select
                          value={formData.animalType}
                          onChange={(e) => setFormData((prev) => ({ ...prev, animalType: e.target.value, shares: 1 }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                        >
                          <option value="goat" className="bg-zinc-900 text-zinc-100">Goat</option>
                          <option value="cow" className="bg-zinc-900 text-zinc-100">Cow Share</option>
                          <option value="camel" className="bg-zinc-900 text-zinc-100">Camel Share</option>
                        </select>
                      </div>
                    </div>

                    {/* Shares selection */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest block">
                        Shares slot {(formData.animalType === "bakra" || formData.animalType === "goat") && "(Locked)"}
                      </label>
                      {(formData.animalType === "bakra" || formData.animalType === "goat") ? (
                        <input
                          type="text"
                          disabled
                          value="1 Share (Full Goat)"
                          className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-zinc-500 text-xs font-medium cursor-not-allowed font-poppins"
                        />
                      ) : (
                        <select
                          value={formData.shares}
                          onChange={(e) => setFormData((prev) => ({ ...prev, shares: Number(e.target.value) }))}
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#060c08] text-zinc-100 focus:outline-none focus:border-secondary text-sm font-poppins"
                        >
                          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                            <option key={s} value={s} className="bg-zinc-900 text-zinc-100">{s} Share{s > 1 ? "s" : ""}</option>
                          ))}
                        </select>
                      )}
                    </div>

                    {/* Complete Booking submit */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-secondary text-black hover:bg-yellow-500 font-bold text-xs tracking-widest uppercase transition-all shadow-[0_4px_12px_rgba(229,169,59,0.2)] flex items-center justify-center gap-2 mt-4 btn-neon-gold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Register Qurbani Sacrifice</span>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense
      fallback = {
        <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#070e0a] text-zinc-200" >
          <Loader2 className="w-10 h-10 animate-spin text-secondary mb-3" />
          <span className="font-semibold text-xs uppercase tracking-widest">Accessing Secured Bookings Vault...</span>
        </div>
      }
    >
      <BookingsPageContent />
    </Suspense>
  );
}
