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
    <section className="py-24 bg-black relative overflow-hidden border-t border-lime-500/20">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400 rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/50 text-lime-400 text-sm mb-8 font-mono">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>2,000+ TEAMS WAITING</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-mono">
            READY TO TRANSFORM<span className="block bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">YOUR WORKFLOWS?</span>
          </h2>

          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">Get early access to CheckFlow AI. Be the first to experience the future of AI-powered workflow automation.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={loading}
                  className="flex-1 px-5 py-4 border border-lime-400/50 bg-black text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition-all disabled:opacity-50 font-mono"
                />
                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="px-8 py-4 bg-lime-400 hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold font-mono transition-all flex items-center justify-center gap-2 whitespace-nowrap uppercase"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>JOINING</span>
                    </>
                  ) : (
                    <>
                      <span>ACCESS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center gap-2 px-4 py-3 bg-red-900/30 border border-red-500/50 text-red-300 font-mono"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}
              <p className="mt-4 text-sm text-white/50 font-mono">No spam. Read our <button type="button" className="underline hover:text-lime-400">Privacy Policy</button>.</p>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-black border-2 border-lime-400 text-lime-400 font-mono">
                <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold">
                    {alreadyExists ? "ALREADY ON LIST!" : "ON THE LIST!"}
                  </p>
                  <p className="text-sm text-lime-400/80">Notifying at {email}</p>
                  {position && !alreadyExists && (
                    <p className="text-sm text-lime-400/60 mt-1">Position: #{position}</p>
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
                className="w-full px-4 py-2 text-sm text-white/60 hover:text-lime-400 transition-colors font-mono"
              >
                Add another
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
