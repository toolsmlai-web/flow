"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/lib/mock";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${
                scrolled ? "bg-gradient-to-br from-[#635BFF] to-[#3B82F6]" : "bg-white/20 backdrop-blur"
              }`}>CF</div>
              <span className={`font-bold text-xl ${scrolled ? "text-slate-900" : "text-white"}`}>CheckFlow AI</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-[#635BFF] ${
                  scrolled ? "text-slate-600" : "text-white/80"
                }`}>{link.name}</a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className={`text-sm font-medium transition-colors ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-white/80 hover:text-white"}`}>Sign In</button>
              <button className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#5244e0] text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2">
                <Zap className="w-4 h-4" />Get Started
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? "text-slate-600" : "text-white"}`}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 shadow-lg md:hidden">
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-slate-600 hover:text-[#635BFF] hover:bg-slate-50 rounded-xl font-medium transition-colors">{link.name}</a>
              ))}
              <hr className="border-slate-200" />
              <div className="space-y-3 px-4">
                <button className="w-full py-3 text-slate-600 font-medium">Sign In</button>
                <button className="w-full py-3 bg-[#635BFF] text-white font-semibold rounded-xl flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
