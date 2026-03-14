"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "Next.js", "TypeScript", "React", "Node.js", "PostgreSQL",
  "Framer Motion", "Tailwind CSS", "Rust", "GraphQL", "Supabase",
  "Docker", "AWS", "Figma", "Redis", "Python",
];

function MarqueeList({ reversed = false }: { reversed?: boolean }) {
  return (
    <motion.ul
      animate={{ x: reversed ? ["0%", "50%"] : ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex shrink-0 gap-6 items-center"
      aria-hidden
    >
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-3 text-sm text-muted-foreground whitespace-nowrap select-none"
        >
          <span className="w-1 h-1 rounded-full bg-accent/40 shrink-0" />
          {item}
        </li>
      ))}
    </motion.ul>
  );
}

export function MarqueeBar() {
  return (
    <div className="py-8 border-y border-border overflow-hidden bg-surface/30">
      <div className="flex gap-6" aria-label="Technologies I work with">
        <MarqueeList />
        <MarqueeList />
      </div>
    </div>
  );
}
