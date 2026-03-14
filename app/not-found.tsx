"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-display font-bold text-[120px] leading-none text-transparent"
            style={{
              WebkitTextStroke: "2px rgba(232,255,77,0.3)",
            }}
          >
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-3xl text-foreground mb-4"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground mb-8"
        >
          Looks like this page took a detour. Let&apos;s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-background font-display font-bold text-sm hover:shadow-[0_0_24px_rgba(232,255,77,0.3)] transition-all"
          >
            <Home size={14} />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm hover:border-foreground/50 transition-all"
          >
            <ArrowLeft size={14} />
            Go back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
