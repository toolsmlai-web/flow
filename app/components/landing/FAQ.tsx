"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/lib/mock";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#635BFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">Frequently asked questions</h2>
          <p className="mt-4 text-xl text-slate-600">Everything you need to know about CheckFlow AI.</p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 ${openIndex === index ? "border-[#635BFF]/30 bg-slate-50 shadow-lg" : "border-slate-200 hover:border-slate-300"}`}>
              <button onClick={() => setOpenIndex(openIndex === index ? -1 : index)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-slate-900 pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? "bg-[#635BFF] text-white" : "bg-slate-100 text-slate-500"}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-slate-600">Still have questions? <button className="text-[#635BFF] font-semibold hover:underline">Chat with our team</button></p>
        </motion.div>
      </div>
    </section>
  );
}
