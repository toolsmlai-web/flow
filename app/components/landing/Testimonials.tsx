"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-black border-t border-b border-lime-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// TESTIMONIALS</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">LOVED BY TEAMS</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">See how teams are transforming their workflows with CheckFlow AI.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }} whileHover={{ y: -4 }}
              className="group bg-black border border-lime-400/30 hover:border-lime-400/60 p-8 transition-all duration-300">
              <div className="w-10 h-10 border-2 border-lime-400 flex items-center justify-center mb-6"><Quote className="w-5 h-5 text-lime-400" /></div>
              <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-lime-400 text-lime-400" />))}</div>
              <p className="text-white/80 leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 border border-lime-400/30 rounded-full mb-6 font-mono">
                <span className="text-lime-400 font-bold text-sm">{testimonial.metrics.value}</span>
                <span className="text-lime-400 text-xs">{testimonial.metrics.label}</span>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-lime-400/20">
                <div className="w-12 h-12 rounded-full border-2 border-lime-400 flex items-center justify-center text-lime-400 font-bold bg-black">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-white font-mono">{testimonial.author}</div>
                  <div className="text-sm text-white/50">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
