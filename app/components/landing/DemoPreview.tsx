"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, ArrowRight, Zap } from "lucide-react";
import { MOCK_WORKFLOW } from "@/lib/mock";

export default function DemoPreview() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-lime-400" />;
      case "running": return <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />;
      default: return <Circle className="w-4 h-4 text-white/30" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "border-lime-400/60 bg-black";
      case "running": return "border-cyan-400/60 bg-black";
      default: return "border-lime-400/20 bg-black";
    }
  };

  return (
    <section className="py-24 bg-black border-t border-lime-500/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-lime-400 font-mono font-bold text-sm uppercase tracking-wider">// LIVE DEMO</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white font-mono">SEE IT IN ACTION</h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">A live preview of an AI-generated workflow for launching a SaaS product.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative bg-black border border-lime-400/30 p-8 overflow-x-auto">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(204,255,0,0.5) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <div className="flex items-start gap-8 min-w-[800px] relative z-10">
            {MOCK_WORKFLOW.nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
                  className={`w-64 rounded-xl border-2 ${getStatusColor(node.status)} p-4 shadow-lg`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{node.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white text-sm truncate font-mono">{node.label}</h4>
                      <p className="text-xs text-white/50">{node.description}</p>
                    </div>
                    {getStatusIcon(node.status)}
                  </div>
                  <div className="h-1.5 w-full bg-lime-400/20 rounded-full mb-3 overflow-hidden">
                    <div className="h-full bg-lime-400 rounded-full transition-all duration-500" style={{ width: `${(node.checklist.filter((c: any) => c.isDone).length / node.checklist.length) * 100}%` }} />
                  </div>
                  <div className="space-y-1.5">
                    {node.checklist.slice(0, 2).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-2 text-xs">
                        <div className={`w-3.5 h-3.5 border flex items-center justify-center ${item.isDone ? "bg-lime-400 border-lime-400" : "border-lime-400/30"}`}>
                          {item.isDone && <CheckCircle2 className="w-3 h-3 text-black" />}
                        </div>
                        <span className={item.isDone ? "text-white/40 line-through" : "text-white/70"}>{item.task}</span>
                      </div>
                    ))}
                    {node.checklist.length > 2 && <p className="text-[10px] text-white/40 pl-5">+{node.checklist.length - 2} more tasks</p>}
                  </div>
                  {node.automation && (
                    <div className="mt-3 flex items-center gap-1.5 px-2 py-1 bg-lime-400/20 border border-lime-400/40 rounded">
                      <Zap className="w-3 h-3 text-lime-400" />
                      <span className="text-[10px] font-bold text-lime-400 font-mono">{node.automation}</span>
                    </div>
                  )}
                </motion.div>
                {index < MOCK_WORKFLOW.nodes.length - 1 && (
                  <div className="flex items-center pt-8">
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <ArrowRight className="w-6 h-6 text-lime-400" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="absolute bottom-4 right-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-black rounded font-bold font-mono hover:bg-lime-300 transition-colors uppercase text-sm">
              <span>CLONE WORKFLOW</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
