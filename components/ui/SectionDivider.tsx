"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex items-center justify-center py-4 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px flex-1 max-w-xs"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(232,255,77,0.3), transparent)",
        }}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="mx-4 w-1.5 h-1.5 rounded-full bg-accent/40"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-px flex-1 max-w-xs"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(232,255,77,0.3), transparent)",
        }}
      />
    </div>
  );
}
