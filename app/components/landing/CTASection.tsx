"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const emails = JSON.parse(localStorage.getItem("waitlist_emails") || "[]");
    emails.push({ email, timestamp: new Date().toISOString() });
    localStorage.setItem("waitlist_emails", JSON.stringify(emails));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#0A2540] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#635BFF] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#635BFF]" />
            <span>Join 2,000+ teams on the waitlist</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to transform your<span className="block bg-gradient-to-r from-[#635BFF] to-[#3B82F6] bg-clip-text text-transparent">workflow execution?</span>
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Get early access to CheckFlow AI. Be the first to experience the future of AI-powered workflow automation.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all" />
                <button type="submit" disabled={loading}
                  className="px-8 py-4 bg-[#635BFF] hover:bg-[#5244e0] disabled:opacity-50 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Joining...</span></> : <><span>Get Early Access</span><ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
              <p className="mt-4 text-sm text-white/40">No spam. Unsubscribe anytime. Read our <button className="underline hover:text-white/60">Privacy Policy</button>.</p>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">You're on the list!</p>
                <p className="text-sm text-emerald-400/80">We'll notify you at {email}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
