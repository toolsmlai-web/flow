"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { DEMO_PROMPTS } from "@/lib/mock";

interface HeroProps {
  onGenerate?: () => void;
}

export default function Hero({ onGenerate }: HeroProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setSubmitted(true);
    onGenerate?.();
  };

  const handlePromptClick = (text: string) => {
    setInput(text);
    setSubmitted(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A2540]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#635BFF] rounded-full blur-[128px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: "500ms" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>AI-Powered Workflow Platform</span>
          <span className="px-2 py-0.5 bg-[#635BFF] rounded-full text-xs font-medium">New</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">Describe it.</span>
          <span className="block bg-gradient-to-r from-[#635BFF] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent">Build it. Run it.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
          One prompt generates your entire workflow. Visual nodes, live connections, AI automation, and a self-checking checklist. No code. Ever.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="max-w-2xl mx-auto mb-8">
          {!submitted ? (
            <div className="relative">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="Build me a system to launch an AI SaaS..."
                className="w-full px-6 py-5 pr-40 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all text-lg backdrop-blur-sm" />
              <button onClick={handleGenerate} disabled={!input.trim() || loading}
                className="absolute right-2 top-2 px-6 py-3 bg-[#635BFF] hover:bg-[#5244e0] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all flex items-center gap-2">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Generating...</span></> : <><Sparkles className="w-4 h-4" /><span>Generate</span></>}
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Workflow generated successfully!</span>
              <button onClick={() => setSubmitted(false)} className="ml-4 text-sm underline hover:text-emerald-300">Create another</button>
            </motion.div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-3">
          <p className="text-sm text-white/40 uppercase tracking-wider font-medium">Ideas to get started</p>
          <div className="flex flex-wrap justify-center gap-3">
            {DEMO_PROMPTS.map((prompt, index) => (
              <motion.button key={prompt.id} onClick={() => handlePromptClick(prompt.text)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1 }}
                className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-sm text-white/60 hover:text-white transition-all">
                <span>{prompt.icon}</span>
                <span className="max-w-[200px] truncate">{prompt.text}</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm mb-4">Trusted by teams at</p>
          <div className="flex justify-center items-center gap-8 opacity-50">
            {["Vercel", "Stripe", "Linear", "Notion", "Figma"].map((company) => (
              <span key={company} className="text-white/60 font-semibold text-lg">{company}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-3 bg-white/40 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
