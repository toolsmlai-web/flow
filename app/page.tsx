"use client";

import { useRef } from "react";
import Navigation from "./components/landing/Navigation";
import Hero from "./components/landing/Hero";
import SocialProof from "./components/landing/SocialProof";
import HowItWorks from "./components/landing/HowItWorks";
import Features from "./components/landing/Features";
import DemoPreview from "./components/landing/DemoPreview";
import Integrations from "./components/landing/Integrations";
import Testimonials from "./components/landing/Testimonials";
import FAQ from "./components/landing/FAQ";
import CTASection from "./components/landing/CTASection";
import Footer from "./components/landing/Footer";

export default function Home() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero onGenerate={scrollToDemo} />
      <SocialProof />
      <HowItWorks />
      <Features />
      <div ref={demoRef}>
        <DemoPreview />
      </div>
      <Integrations />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
