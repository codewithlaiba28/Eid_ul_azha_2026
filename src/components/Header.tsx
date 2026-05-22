"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Star, Menu, X, Utensils, HeartHandshake, BookOpen } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Moon },
    { name: "Eid Wishes", href: "/wishes", icon: HeartHandshake },
    { name: "Eid Recipes", href: "/recipes", icon: Utensils },
    { name: "Duas & Sunnahs", href: "/duas", icon: BookOpen },
  ];

  return (
    <header
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-4 w-[92%] md:w-[85%] max-w-6xl bg-[#030704]/85 backdrop-blur-xl border border-secondary/25 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(229,169,59,0.15)] py-2.5 px-4 sm:px-6 lg:px-8 rounded-full"
          : "top-0 w-full bg-transparent py-5 px-4 sm:px-6 lg:px-8 border-b border-transparent rounded-none"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-secondary/5 border border-secondary/20 group-hover:scale-105 transition-transform duration-300">
              <Moon className="w-4 h-4 text-secondary fill-secondary animate-pulse" />
              <Star className="w-1.5 h-1.5 text-secondary absolute top-1 right-1 animate-ping" />
            </div>
            <div>
              <span className="font-amiri text-xl md:text-2xl font-bold text-secondary tracking-wide block leading-none">
                عید الأضحی
              </span>
              <span className="text-[9px] text-zinc-400 tracking-widest uppercase font-poppins block mt-0.5">
                Bakra Eid 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3 lg:gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 rounded-full text-[10px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "text-secondary bg-white/5 border border-secondary/35 shadow-[0_0_15px_rgba(229,169,59,0.1)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  <span className="hidden xl:inline">{link.name}</span>
                  <span className="xl:hidden">{link.name.split(' ')[0]}</span>
                </Link>
              );
            })}
          </nav>


          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-secondary bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-[#060c08]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl p-6 transform transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-secondary fill-secondary" />
            <span className="font-amiri text-2xl text-secondary font-bold">عید مبارک</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-zinc-400 hover:text-secondary hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-secondary text-black font-semibold shadow-md"
                    : "text-zinc-300 hover:bg-white/5 hover:text-secondary"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
          <div className="text-center text-[10px] text-zinc-500 font-poppins mt-2">
            May Allah bless you with peace and happiness.
          </div>
        </div>
      </div>

      {/* Overlay background when mobile drawer is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}
    </header>
  );
}
