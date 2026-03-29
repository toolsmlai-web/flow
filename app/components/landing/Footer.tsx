"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const links = {
    Product: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
    Company: ["About", "Blog", "Careers", "Press", "Partners"],
    Resources: ["Documentation", "Help Center", "Community", "Templates", "API"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"]
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#635BFF] to-[#3B82F6] rounded-lg flex items-center justify-center text-white font-bold">CF</div>
              <span className="text-white font-bold text-xl">CheckFlow AI</span>
            </div>
            <p className="text-sm mb-6 max-w-xs">AI-powered workflow automation platform. Turn prompts into executable workflows with visual nodes and smart checklists.</p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center transition-colors"><Icon className="w-5 h-5" /></a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}><a href="#" className="text-sm hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 CheckFlow AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
