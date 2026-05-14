"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Cpu, Rocket, CheckCircle2, Circle } from "lucide-react";
import { STEPS } from "@/lib/mock";

const iconMap = {
  MessageSquare,
  Cpu,
  Rocket
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black border-t border-b border-lime-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// HOW IT WORKS</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">PROMPT TO WORKFLOW</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">Three simple steps to transform your ideas into actionable, automated workflows.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div key={step.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} className="relative">
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-lime-400/20 to-cyan-400/20" />
                )}
                <div className="bg-black border border-lime-400/30 hover:border-lime-400/60 p-8 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-lime-400/30 group-hover:text-lime-400/60 transition-colors font-mono">{step.number}</span>
                    <div className="p-3 border-2 border-lime-400 text-lime-400"><Icon className="w-6 h-6" /></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 font-mono">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">{step.description}</p>
                  <div className="mt-6 p-4 bg-black border border-lime-400/30 rounded">
                    {step.mockVisual === "prompt" && (
                      <div className="space-y-2">
                        <div className="h-2 bg-lime-400/30 rounded w-3/4" />
                        <div className="h-2 bg-lime-400/30 rounded w-1/2" />
                        <div className="flex gap-2 mt-3">
                          <span className="px-2 py-1 bg-lime-400/20 text-lime-400 text-xs rounded border border-lime-400/30 font-mono text-xs">AI</span>
                          <span className="px-2 py-1 bg-lime-400/20 text-lime-400 text-xs rounded border border-lime-400/30 font-mono text-xs">SAAS</span>
                        </div>
                      </div>
                    )}
                    {step.mockVisual === "generation" && (
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded border border-lime-400 bg-black flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-lime-400" /></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-2 bg-lime-400/30 rounded" />
                          <div className="h-2 bg-lime-400/30 rounded w-2/3" />
                        </div>
                      </div>
                    )}
                    {step.mockVisual === "execution" && (
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-lime-400" />
                        <div className="flex-1 h-2 bg-lime-400/20 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-lime-400 rounded-full" />
                        </div>
                        <span className="text-xs text-lime-400 font-mono">75%</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
