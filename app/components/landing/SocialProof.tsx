"use client";

import React from "react";
import { motion } from "framer-motion";
import { STATS } from "@/lib/mock";

export default function SocialProof() {
  return (
    <section className="py-12 bg-black border-y border-lime-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-lime-400 mb-2 font-mono">{stat.value}</div>
              <div className="text-white/60 text-sm uppercase tracking-wider font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
