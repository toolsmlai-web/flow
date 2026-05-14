"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, ArrowRight } from "lucide-react";
import { INTEGRATIONS } from "@/lib/mock";

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 bg-black border-t border-b border-lime-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// INTEGRATIONS</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">CONNECT YOUR STACK</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">50+ integrations to automate your workflows. Connect once, use everywhere.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {INTEGRATIONS.map((integration, index) => (
            <motion.div key={integration.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ scale: 1.05, y: -4 }}
              className="group relative bg-black border border-lime-400/30 hover:border-lime-400/60 p-6 transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 border-2 border-lime-400 mb-3 flex items-center justify-center text-lime-400 font-bold text-lg" style={{ backgroundColor: `${integration.color}20` }}>{integration.name[0]}</div>
              <h3 className="font-semibold text-white text-sm font-mono">{integration.name}</h3>
              <p className="text-xs text-white/50 mt-1">{integration.category}</p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><Link2 className="w-4 h-4 text-lime-400" /></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-lime-400 font-bold font-mono hover:gap-3 transition-all hover:text-lime-300">VIEW ALL 50+ INTEGRATIONS<ArrowRight className="w-4 h-4" /></button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-16 relative h-32 bg-black border-2 border-lime-400/30 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-2 border-lime-400 flex items-center justify-center text-lime-400 font-bold font-mono">CF</div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} className="w-2 h-2 bg-lime-400 rounded-full" />
                ))}
              </div>
              <div className="flex -space-x-3">
                {["Slack", "Git", "Ver", "Ope"].map((name, i) => (
                  <div key={name} className="w-12 h-12 rounded-full bg-black border-2 border-lime-400 flex items-center justify-center text-xs font-bold text-lime-400 font-mono" style={{ zIndex: 4 - i }}>{name}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
