"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({ text, className, delay = 0, once = true }: AnimatedTextProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.07,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block mr-[0.25em]"
          aria-hidden
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
