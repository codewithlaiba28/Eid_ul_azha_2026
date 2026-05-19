"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Shield, Sparkles, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function BookingSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "Karachi",
    animalType: "bakra",
    shares: 1,
  });

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const loadingTexts = [
    "Verifying booking parameters...",
    "Selecting premium livestock from pasture...",
    "Running automated veterinary check...",
    "Securing transaction with Qurbani Vault..."
  ];

  // Pick up animal query from URL parameters if available
  useEffect(() => {
    const animalQuery = searchParams.get("animal");
    if (animalQuery && ["bakra", "gaay", "oonth"].includes(animalQuery)) {
      setFormData((prev) => ({
        ...prev,
        animalType: animalQuery,
        shares: animalQuery === "bakra" ? 1 : 7,
      }));
    }
  }, [searchParams]);

  // Adjust shares dynamically based on animal choice
  const handleAnimalChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      animalType: type,
      shares: type === "bakra" ? 1 : 1, // Default share to 1, cap based on selection
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setLoadingStep(0);

    // Multi-step animated loader simulation
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingTexts.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      
      // Generate Unique Invoice
      const randNum = Math.floor(100000 + Math.random() * 900000);
      const generatedInvoice = `EID-${randNum}-Q`;
      setInvoiceId(generatedInvoice);

      // Save Booking details into localStorage for persistent tracking
      const newBooking = {
        invoiceId: generatedInvoice,
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
          { label: "Pasture Allocation", desc: "Selecting a healthy prime animal at pasture.", done: false, time: "Pending" },
          { label: "Veterinary Clearance", desc: "Complete medical checkup & health tagging.", done: false, time: "Pending" },
          { label: "Sacrifice Executed", desc: "Sacrifice in accordance with Islamic laws on Eid day.", done: false, time: "Pending" },
          { label: "Meat Distribution", desc: "Portion separation & chilled distribution delivery.", done: false, time: "Pending" },
        ],
      };

      if (typeof window !== "undefined") {
        const existingBookingsStr = localStorage.getItem("qurbani_bookings");
        const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        localStorage.setItem("qurbani_bookings", JSON.stringify([newBooking, ...existingBookings]));
      }

      setLoading(false);
      setSuccess(true);

      // Massive victory confetti burst
      const end = Date.now() + 2 * 1000;
      (function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#f5c518", "#1a6b3c", "#fff8e7"],
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#f5c518", "#1a6b3c", "#fff8e7"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

    }, 4200);
  };

  return (
    <section id="contact" className="py-24 bg-cream text-dark-green relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-10 left-[10%] text-primary/5 text-8xl pointer-events-none select-none font-bold">
        عید الاضحیٰ
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Form Details & Guarantee */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-secondary" />
              <span>Hassle-Free Sacrifice Booking</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-primary tracking-wide leading-tight">
              Qurbani Book Karen 
            </h2>
            <div className="w-24 h-1 bg-secondary rounded-full" />
            <p className="text-dark-green/80 text-sm md:text-base font-light leading-relaxed">
              Book your sheep, cow share, or camel shares easily in minutes. We handle the feeding, vet monitoring, ritual slaughter on Eid morning, vacuum packaging, and cold-chain home delivery or charity distribution on your behalf.
            </p>

            {/* Service Highlights */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  🛡️
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary">Fully Monitored Livestock</h4>
                  <p className="text-xs text-dark-green/70">Animals are fed natural feed and verified under strict Shariah standards.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-brown shrink-0">
                  ⚖️
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-primary">Shariah Compliant Allocation</h4>
                  <p className="text-xs text-dark-green/70">Animal tags and share slots mapped strictly with names prior to slaughter.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Actual Form Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white border border-primary/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
          >
            {/* Form Loader overlay */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/95 z-30 rounded-3xl flex flex-col justify-center items-center p-6 text-center"
                >
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <h3 className="text-lg font-bold text-primary font-poppins">Allocating Booking Slot</h3>
                  
                  {/* Rotating step status */}
                  <motion.p
                    key={loadingStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-dark-green/60 max-w-xs mt-2 font-light leading-relaxed h-12"
                  >
                    {loadingTexts[loadingStep]}
                  </motion.p>

                  <div className="w-48 h-1 bg-cream rounded-full overflow-hidden mt-6 relative">
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

            {/* Success Overlay Panel */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-30 rounded-3xl flex flex-col justify-center items-center p-6 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 fill-green-500/10 mb-4 animate-bounce" />
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Booking Completed</span>
                  <h3 className="text-2xl font-amiri font-bold text-primary mt-1">Qurbani Book Ho Gai!</h3>
                  
                  <div className="bg-cream border border-primary/10 rounded-2xl py-3 px-6 my-4 w-full max-w-sm">
                    <span className="text-xs text-dark-green/50 uppercase tracking-widest block font-poppins">Booking Invoice ID</span>
                    <span className="text-lg font-extrabold text-primary font-poppins mt-0.5 block select-all tracking-wider">
                      {invoiceId}
                    </span>
                  </div>

                  <p className="text-xs text-dark-green/70 max-w-xs font-light leading-relaxed mb-6">
                    A confirmation receipt and booking tracking code has been created. Click below to view live status tracking of your animal!
                  </p>

                  <button
                    onClick={() => router.push(`/bookings?invoice=${invoiceId}`)}
                    className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-cream font-bold text-sm tracking-wide transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>Track Live Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actual Form Fields */}
            <h3 className="text-xl font-bold text-primary mb-6 border-b border-primary/5 pb-3">
              Qurbani Registration Form
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-dark-green/70 uppercase tracking-widest block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-cream/35 text-dark-green focus:outline-none focus:border-primary focus:bg-white text-sm"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-dark-green/70 uppercase tracking-widest block">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-cream/35 text-dark-green focus:outline-none focus:border-primary focus:bg-white text-sm"
                />
              </div>

              {/* Grid 2 column */}
              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-dark-green/70 uppercase tracking-widest block">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-cream/35 text-dark-green focus:outline-none focus:border-primary focus:bg-white text-sm"
                  >
                    {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Animal Type */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-dark-green/70 uppercase tracking-widest block">Animal Type</label>
                  <select
                    value={formData.animalType}
                    onChange={(e) => handleAnimalChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-cream/35 text-dark-green focus:outline-none focus:border-primary focus:bg-white text-sm"
                  >
                    <option value="bakra">Bakra (Goat)</option>
                    <option value="gaay">Gaay (Cow Share)</option>
                    <option value="oonth">Oonth (Camel Share)</option>
                  </select>
                </div>
              </div>

              {/* Shares selection */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-dark-green/70 uppercase tracking-widest block">
                  Shares (Hisse) {formData.animalType === "bakra" && "(Locked)"}
                </label>
                {formData.animalType === "bakra" ? (
                  <input
                    type="text"
                    disabled
                    value="1 Hissa (Full Animal)"
                    className="w-full px-4 py-3 rounded-xl border border-primary/10 bg-cream/15 text-dark-green/50 text-sm cursor-not-allowed"
                  />
                ) : (
                  <select
                    value={formData.shares}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shares: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-cream/35 text-dark-green focus:outline-none focus:border-primary focus:bg-white text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                      <option key={s} value={s}>{s} Share{s > 1 ? "s" : ""} (Hisse)</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Form Disclaimers */}
              <div className="text-[10px] text-dark-green/55 leading-relaxed pt-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>By booking, you agree to our veterinary guidelines and Shariah compliance protocols.</span>
              </div>

              {/* Submit Form */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark text-cream font-bold text-sm tracking-widest uppercase transition-all shadow-[0_4px_12px_rgba(26,107,60,0.15)] flex items-center justify-center gap-2"
              >
                <span>Complete Qurbani Booking</span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
