"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GitBranch, CheckCircle, Zap, Users, BarChart3 } from "lucide-react";
import { FEATURES } from "@/lib/mock";

const iconMap = {
  Sparkles,
  GitBranch,
  CheckCircle,
  Zap,
  Users,
  BarChart3
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black border-t border-b border-lime-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// FEATURES</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">EVERYTHING YOU NEED</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">From AI generation to team collaboration, CheckFlow AI has you covered.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div key={feature.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} whileHover={{ y: -4 }}
                className="group bg-black border border-lime-400/30 hover:border-lime-400/50 p-8 transition-all duration-300">
                <div className="w-14 h-14 border-2 border-lime-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-lime-400" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-lime-400 font-mono">{feature.stat}</span>
                  <span className="text-sm text-white/60 font-mono">{feature.statLabel}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
