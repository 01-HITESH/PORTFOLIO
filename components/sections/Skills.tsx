"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Wrench, Zap } from "lucide-react";
import { SKILLS } from "@/lib/data";

const CATEGORIES = [
  {
    key: "frontend" as const,
    label: "Frontend",
    icon: Code2,
    color: "#e8ff4d",
    description: "Interfaces that delight",
  },
  {
    key: "backend" as const,
    label: "Backend",
    icon: Server,
    color: "#4dffb4",
    description: "Systems that scale",
  },
  {
    key: "tools" as const,
    label: "Tools & Infra",
    icon: Wrench,
    color: "#ff6b6b",
    description: "Foundations that last",
  },
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground font-medium">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-accent text-sm font-display font-bold tracking-widest uppercase mb-3"
          >
            Technical Stack
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4"
          >
            Tools of the trade
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Technologies I use daily to build performant, scalable, and
            maintainable systems.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, ci) => {
            const Icon = cat.icon;
            const skills = SKILLS[cat.key];

            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + ci * 0.1 }}
                className="group relative rounded-2xl border border-border bg-surface p-8 hover:border-opacity-50 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${cat.color}05 0%, transparent 60%)`,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: cat.color + "15",
                      border: `1px solid ${cat.color}30`,
                    }}
                  >
                    <Icon size={18} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-5">
                  {skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={cat.color}
                      delay={0.4 + ci * 0.1 + si * 0.06}
                    />
                  ))}
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-5"
                  style={{
                    background: `radial-gradient(circle, ${cat.color} 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner: currently learning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 rounded-2xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Zap size={14} className="text-accent" />
            </div>
            <span className="font-display font-bold text-sm text-foreground">
              Currently exploring
            </span>
          </div>
          <div className="w-px h-6 bg-border hidden sm:block" />
          <div className="flex flex-wrap gap-2">
            {[
              "Vercel AI SDK",
              "LangChain",
              "Tauri",
              "Effect-TS",
              "Bun",
              "WebGPU",
            ].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
