"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Download, Coffee, BookOpen, Music, Bike } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";

const INTERESTS = [
  { icon: Coffee, label: "Coffee aficionado" },
  { icon: BookOpen, label: "Avid reader" },
  { icon: Music, label: "Guitar player" },
  { icon: Bike, label: "Trail cyclist" },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Write code for humans",
    body: "Every line speaks to future maintainers. I optimize for clarity, not cleverness.",
  },
  {
    number: "02",
    title: "Iterate with urgency",
    body: "I build incrementally with fast feedback loops.",
  },
  {
    number: "03",
    title: "Design with empathy",
    body: "I create solutions that consider the human experience and emotional impact.",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = PERSONAL_INFO.bio.split("\n\n");

  return (
    <section id="about" className="py-32 max-w-7xl mx-auto px-6" ref={ref}>
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-accent text-sm font-display font-bold tracking-widest uppercase mb-3"
          >
            About Me
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-10 leading-tight"
          >
            The person behind the code
          </motion.h2>

          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-muted-foreground leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Location + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-accent" />
              {PERSONAL_INFO.location}
            </div>
            <Link
              href={PERSONAL_INFO.resume}
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-display font-bold text-accent hover:text-accent-2 transition-colors"
            >
              <Download size={14} />
              Download Resume
            </Link>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {INTERESTS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-sm text-muted-foreground"
              >
                <Icon size={13} className="text-accent" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Principles */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="text-sm text-muted-foreground font-display uppercase tracking-widest mb-6"
          >
            My Philosophy
          </motion.p>
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className="group p-6 rounded-2xl border border-border bg-surface hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="font-display font-bold text-3xl text-accent/20 group-hover:text-accent/40 transition-colors leading-none">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Testimonial-style quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="p-6 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
          >
            <blockquote className="text-foreground/80 text-sm leading-relaxed italic mb-4">
              "Hitesh's code is a joy to read—clear, thoughtful, and maintainable. He has a knack for breaking down complex problems into elegant solutions. He's the kind of engineer who elevates the entire team."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 border border-border" />
              <div>
                <div className="text-sm font-display font-bold text-foreground">
                  AKASH.R
                </div>
                <div className="text-xs text-muted-foreground">
                  CTO, Aspiron Khuze Technologies
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
