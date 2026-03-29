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
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">From prompt to workflow in seconds</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">Three simple steps to transform your ideas into actionable, automated workflows.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div key={step.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.5 }} className="relative">
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-slate-200 to-slate-300" />
                )}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-[#635BFF]/30 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-bold text-slate-200 group-hover:text-[#635BFF]/20 transition-colors">{step.number}</span>
                    <div className={`p-3 rounded-xl ${step.color} text-white shadow-lg`}><Icon className="w-6 h-6" /></div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    {step.mockVisual === "prompt" && (
                      <div className="space-y-2">
                        <div className="h-2 bg-slate-200 rounded w-3/4" />
                        <div className="h-2 bg-slate-200 rounded w-1/2" />
                        <div className="flex gap-2 mt-3">
                          <span className="px-2 py-1 bg-violet-100 text-violet-700 text-xs rounded">AI</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">SaaS</span>
                        </div>
                      </div>
                    )}
                    {step.mockVisual === "generation" && (
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-2 bg-slate-200 rounded" />
                          <div className="h-2 bg-slate-200 rounded w-2/3" />
                        </div>
                      </div>
                    )}
                    {step.mockVisual === "execution" && (
                      <div className="flex items-center gap-2">
                        <Circle className="w-4 h-4 text-emerald-500" />
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">75%</span>
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
