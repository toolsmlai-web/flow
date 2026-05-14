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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-black/90 backdrop-blur-xl border-lime-500/30" : "bg-black/50 border-lime-500/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-lime-400 flex items-center justify-center text-lime-400 font-bold font-mono text-xs">CF</div>
              <span className="font-bold text-xl text-lime-400 font-mono">CHECKFLOW</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium transition-all text-white/70 hover:text-lime-400 hover:glow">{link.name}</a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-medium transition-all text-white/70 hover:text-lime-400">Sign In</button>
              <button className="px-5 py-2.5 bg-lime-400 hover:bg-lime-300 text-black text-sm font-bold font-mono rounded transition-all flex items-center gap-2 uppercase tracking-wider">
                <Zap className="w-4 h-4" />Start
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded text-lime-400 hover:text-lime-300">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-black border-b border-lime-500/30 shadow-lg md:hidden">
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white/70 hover:text-lime-400 font-medium transition-colors">{link.name}</a>
              ))}
              <hr className="border-lime-500/20" />
              <div className="space-y-3 px-4">
                <button className="w-full py-3 text-white/70 font-medium hover:text-lime-400">Sign In</button>
                <button className="w-full py-3 bg-lime-400 text-black font-bold font-mono rounded flex items-center justify-center gap-2 uppercase">
                  <Zap className="w-4 h-4" />Start
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
