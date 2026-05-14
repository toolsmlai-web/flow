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
    <footer className="bg-black text-white/70 py-16 border-t border-lime-500/20 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-lime-400 flex items-center justify-center text-lime-400 font-bold text-xs">CF</div>
              <span className="text-lime-400 font-bold text-lg">CHECKFLOW</span>
            </div>
            <p className="text-sm mb-6 max-w-xs text-white/60">AI-powered workflow automation. Turn prompts into executable workflows with visual nodes and smart checklists.</p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-lime-400/50 hover:border-lime-400 hover:text-lime-400 flex items-center justify-center transition-colors text-white/70"><Icon className="w-5 h-5" /></a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lime-400 font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}><a href="#" className="text-sm text-white/60 hover:text-lime-400 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-lime-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">© 2024 CHECKFLOW. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2 text-sm text-lime-400">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
            <span>SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
