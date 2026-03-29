"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link2, ArrowRight } from "lucide-react";
import { INTEGRATIONS } from "@/lib/mock";

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider">Integrations</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">Connect your entire stack</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">50+ integrations to automate your workflows. Connect once, use everywhere.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {INTEGRATIONS.map((integration, index) => (
            <motion.div key={integration.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.3 }} whileHover={{ scale: 1.05, y: -4 }}
              className="group relative bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-[#635BFF]/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: integration.color }}>{integration.name[0]}</div>
              <h3 className="font-semibold text-slate-900 text-sm">{integration.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{integration.category}</p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><Link2 className="w-4 h-4 text-[#635BFF]" /></div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-[#635BFF] font-semibold hover:gap-3 transition-all">View all 50+ integrations<ArrowRight className="w-4 h-4" /></button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-16 relative h-32 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#635BFF] rounded-xl flex items-center justify-center text-white font-bold shadow-lg">CF</div>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} className="w-2 h-2 bg-[#635BFF] rounded-full" />
                ))}
              </div>
              <div className="flex -space-x-3">
                {["Slack", "Git", "Ver", "Ope"].map((name, i) => (
                  <div key={name} className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm" style={{ zIndex: 4 - i }}>{name}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
