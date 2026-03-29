"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">Loved by teams worldwide</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">See how teams are transforming their workflows with CheckFlow AI.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }} whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#635BFF]/30 hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-[#635BFF] to-[#8B5CF6] rounded-xl flex items-center justify-center mb-6"><Quote className="w-5 h-5 text-white" /></div>
              <div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />))}</div>
              <p className="text-slate-700 leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <span className="text-emerald-600 font-bold text-sm">{testimonial.metrics.value}</span>
                <span className="text-emerald-600 text-xs">{testimonial.metrics.label}</span>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
