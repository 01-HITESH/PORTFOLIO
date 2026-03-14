"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";

const FILTERS = ["All", "Platform", "Library", "SaaS", "Web3", "CMS"];

export function Projects() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-32 max-w-7xl mx-auto px-6" ref={ref}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-accent text-sm font-display font-bold tracking-widest uppercase mb-3"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-foreground"
          >
            Things I've built
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                active === f
                  ? "bg-accent text-background font-bold"
                  : "border border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Project Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project, i) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-500 ${
                hovered === project.id ? "border-opacity-60" : ""
              } ${i === 0 ? "md:col-span-2" : ""}`}
              style={{
                borderColor:
                  hovered === project.id ? project.color + "40" : undefined,
                boxShadow:
                  hovered === project.id
                    ? `0 0 40px ${project.color}10`
                    : undefined,
              }}
            >
              {/* Color accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                }}
              />

              <div className={`p-8 ${i === 0 ? "lg:p-12" : ""}`}>
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: project.color + "15",
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={project.github}
                      target="_blank"
                      aria-label={`${project.title} GitHub`}
                      className="p-2 rounded-full border border-border hover:border-foreground/50 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <Github size={14} />
                    </Link>
                    <Link
                      href={project.demo}
                      target="_blank"
                      aria-label={`${project.title} demo`}
                      className="p-2 rounded-full border border-border hover:border-foreground/50 text-muted-foreground hover:text-foreground transition-all"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>

                {/* Project number */}
                <div
                  className="text-7xl font-display font-bold leading-none mb-4 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ color: project.color }}
                >
                  {project.id}
                </div>

                {/* Title + description */}
                <h3
                  className={`font-display font-bold text-foreground mb-3 group-hover:text-white transition-colors ${
                    i === 0 ? "text-3xl lg:text-4xl" : "text-2xl"
                  }`}
                >
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                  {project.description}
                </p>

                {/* Long description on hover */}
                <AnimatePresence>
                  {hovered === project.id && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground/80 text-xs leading-relaxed mb-4 overflow-hidden"
                    >
                      {project.longDescription}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* View Demo link */}
                <div className="mt-6 flex items-center gap-2">
                  <Link
                    href={project.demo}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-sm font-display font-bold transition-colors duration-300 group/link"
                    style={{ color: project.color }}
                  >
                    View Demo
                    <ArrowUpRight
                      size={14}
                      className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
