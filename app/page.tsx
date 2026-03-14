import { Hero } from "@/components/sections/Hero";
import { MarqueeBar } from "@/components/sections/MarqueeBar";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HITESH — Full-Stack Developer",
  description:
    "Portfolio of HITESH — Full-Stack Developer specializing in scalable web applications, design systems, and developer tooling.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBar />
      <Projects />
      <Skills />
      <About />
      <Experience />
      <Contact />
    </>
  );
}
