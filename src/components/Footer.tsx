"use client";

import Link from "next/link";
import { Moon, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030704]/90 text-zinc-100 border-t border-white/10 pt-16 pb-8 relative overflow-hidden backdrop-blur-md">
      {/* Starry decor background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="star w-1 h-1 top-10 left-10" />
        <div className="star w-1.5 h-1.5 top-32 right-24" />
        <div className="star w-0.5 h-0.5 bottom-12 left-1/3" />
        <div className="star w-1 h-1 top-24 left-2/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand/Logo Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                <Moon className="w-6 h-6 text-secondary fill-secondary" />
              </div>
              <div>
                <span className="font-amiri text-2xl font-bold text-secondary tracking-wide block leading-none">
                  عيد الأضحى مبارك
                </span>
                <span className="text-[10px] text-zinc-400 tracking-widest uppercase block mt-1">
                  Sacrifice & Gratitude
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Wishing you a blessed and joyful Eid ul Adha. May the divine blessings of Allah bring you peace, prosperity, and happiness.
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook SVG */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary hover:text-black border border-white/10 hover:border-secondary flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(229,169,59,0.4)] text-zinc-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary hover:text-black border border-white/10 hover:border-secondary flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(229,169,59,0.4)] text-zinc-300"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* WhatsApp SVG */}
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary hover:text-black border border-white/10 hover:border-secondary flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_10px_rgba(229,169,59,0.4)] text-zinc-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97-1.861-1.868-4.339-2.897-6.977-2.897-5.442 0-9.87 4.37-9.873 9.8.001 1.77.478 3.49 1.386 5.016l-.985 3.598 3.65-.95zm12.336-7.14c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-secondary font-semibold text-lg border-b border-white/10 pb-2">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Home Page
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Qurbani Packages
                </Link>
              </li>
              <li>
                <Link href="/wishes" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Wishes Generator
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Eid Recipes
                </Link>
              </li>
              <li>
                <Link href="/duas" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Duas & Namaz
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="hover:text-secondary transition-colors font-light text-zinc-300 flex items-center gap-1.5">
                  <span>✦</span> Track Qurbani
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 font-light text-sm text-zinc-300">
            <h3 className="text-secondary font-semibold text-lg border-b border-white/10 pb-2">Contact Details</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Gulshan-e-Iqbal, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+92 21 111-QURBANI</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>info@eiduladha2026.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-secondary font-semibold text-lg border-b border-white/10 pb-2">Join Newsletter</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Subscribe to get updates on Qurbani packages, Eid recipes, prayer timings, and charity reports.
            </p>
            <form className="flex flex-col gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-secondary focus:bg-white/10 transition-all placeholder:text-zinc-500"
              />
              <button
                type="submit"
                className="py-2.5 rounded-lg bg-secondary text-black font-bold text-xs uppercase tracking-wider hover:bg-yellow-500 transition-all shadow-[0_4px_10px_rgba(229,169,59,0.15)] btn-neon-gold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="border-t border-white/10 pt-8 mt-8 text-center space-y-4">
          <div className="font-amiri text-2xl text-secondary font-semibold max-w-2xl mx-auto italic">
            "لَنْ يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَكِنْ يَنَالُهُ التَّقْوَىٰ مِنْكُمْ"
          </div>
          <div className="text-sm font-light text-zinc-400 max-w-xl mx-auto">
            "Their meat will not reach Allah, nor will their blood, but what reaches Him is piety from you." (Surah Al-Hajj 22:37)
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Bakra Eid 2026. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 mt-2 sm:mt-0 font-light">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> for Eid ul Adha.
          </div>
        </div>
      </div>
    </footer>
  );
}
