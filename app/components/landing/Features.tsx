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
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">Everything you need to execute</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">From AI generation to team collaboration, CheckFlow AI has you covered.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div key={feature.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.4 }} whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-transparent hover:shadow-xl transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-slate-900">{feature.stat}</span>
                  <span className="text-sm text-slate-500">{feature.statLabel}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
