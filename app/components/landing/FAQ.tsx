"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/mock";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-black border-t border-b border-lime-500/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// FAQ</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">COMMON QUESTIONS</h2>
          <p className="mt-4 text-lg text-white/70">Everything you need to know about CheckFlow AI.</p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className={`border transition-all duration-300 ${openIndex === index ? "border-lime-400/60 bg-black" : "border-lime-400/20 hover:border-lime-400/40"}`}>
              <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-white pr-8 font-mono">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 border flex items-center justify-center transition-all ${openIndex === index ? "border-lime-400 bg-lime-400 text-black" : "border-lime-400/30 text-lime-400"}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-6 text-white/80 leading-relaxed border-t border-lime-400/20">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-white/70">Still have questions? <button className="text-lime-400 font-bold hover:text-lime-300 font-mono">CHAT WITH US</button></p>
        </motion.div>
      </div>
    </section>
  );
}
