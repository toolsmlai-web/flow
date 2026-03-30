"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setAlreadyExists(false);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    // Basic email format validation on client
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          use_case: "general",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to join waitlist. Please try again.");
        setLoading(false);
        return;
      }

      // Check if email was already on the list
      if (data.data?.alreadyExists) {
        setAlreadyExists(true);
      }

      if (data.data?.position) {
        setPosition(data.data.position);
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      console.error("[v0] Waitlist submission error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="px-8 py-4 bg-[#635BFF] hover:bg-[#5244e0] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
              <p className="mt-4 text-sm text-white/40">No spam. Unsubscribe anytime. Read our <button type="button" className="underline hover:text-white/60">Privacy Policy</button>.</p>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold">
                    {alreadyExists ? "You&apos;re already on the list!" : "You&apos;re on the list!"}
                  </p>
                  <p className="text-sm text-emerald-400/80">We&apos;ll notify you at {email}</p>
                  {position && !alreadyExists && (
                    <p className="text-sm text-emerald-400/60 mt-1">You&apos;re #{position} on the waitlist</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                  setAlreadyExists(false);
                  setPosition(null);
                }}
                className="w-full px-4 py-2 text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                Add another email
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
