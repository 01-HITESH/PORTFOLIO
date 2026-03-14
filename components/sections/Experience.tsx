"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<string>("1");

  return (
    <section id="experience" className="py-32 bg-surface/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-accent text-sm font-display font-bold tracking-widest uppercase mb-3"
          >
            Career
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-foreground"
          >
            Where I've worked
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-[20px] top-2 bottom-2 w-[1px] bg-border" />

            <div className="space-y-4">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative pl-12 sm:pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-0 sm:left-0 top-6 w-[9px] h-[9px] rounded-full border-2 transition-all duration-300 ${
                      expanded === exp.id
                        ? "bg-accent border-accent scale-125"
                        : "bg-background border-muted"
                    }`}
                    style={{ left: "16px" }}
                  />

                  {/* Card */}
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      expanded === exp.id
                        ? "border-accent/30 bg-surface"
                        : "border-border bg-surface/50 hover:border-border/80"
                    }`}
                  >
                    {/* Summary row */}
                    <button
                      onClick={() =>
                        setExpanded(expanded === exp.id ? "" : exp.id)
                      }
                      className="w-full text-left p-6 flex items-center justify-between gap-4"
                      aria-expanded={expanded === exp.id}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="font-display font-bold text-foreground text-lg">
                            {exp.role}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              exp.type === "Full-time"
                                ? "bg-accent/10 text-accent border border-accent/20"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase size={12} />
                          <Link
                            href={exp.companyUrl}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-accent transition-colors inline-flex items-center gap-1"
                          >
                            {exp.company}
                            <ExternalLink size={10} />
                          </Link>
                          <span>·</span>
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground shrink-0 transition-transform duration-300 ${
                          expanded === exp.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {expanded === exp.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-border/50 pt-4">
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                              {exp.description}
                            </p>

                            <div className="space-y-2 mb-5">
                              {exp.achievements.map((a, ai) => (
                                <div
                                  key={ai}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <span className="text-accent mt-0.5 shrink-0">
                                    ↳
                                  </span>
                                  <span className="text-foreground/80">{a}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((t) => (
                                <span
                                  key={t}
                                  className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
