"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO, STATS } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = PERSONAL_INFO.tagline.split(" ");

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg"
      aria-label="Hero section"
    >
      {/* Radial gradient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(232,255,77,0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(77,255,180,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
              <span className="text-sm text-muted-foreground">
                {PERSONAL_INFO.availability}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight mb-8">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`inline-block mr-[0.25em] ${
                    word === "scalable" || word === "digital"
                      ? "gradient-text"
                      : "text-foreground"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Sub tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I'm{" "}
              <span className="text-foreground font-medium">
                {PERSONAL_INFO.name}
              </span>
              , a {PERSONAL_INFO.role} crafting products that balance web development
              excellence with thoughtful design. Based in {PERSONAL_INFO.location}.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <Link
                href="/#projects"
                className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-accent text-background font-display font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,255,77,0.4)]"
              >
                <span className="relative z-10">View my work</span>
                <motion.div
                  className="absolute inset-0 bg-accent-2"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>

              <Link
                href="/#contact"
                className="px-7 py-3.5 rounded-full border border-border text-foreground font-display text-sm tracking-wide hover:border-foreground transition-all duration-300"
              >
                Get in touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-5"
            >
              {[
                { href: PERSONAL_INFO.github, icon: Github, label: "GitHub" },
                { href: PERSONAL_INFO.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: PERSONAL_INFO.twitter, icon: Twitter, label: "Twitter" },
                { href: `mailto:${PERSONAL_INFO.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  aria-label={label}
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 p-1"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right: Headshot + Stats */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              {/* Headshot placeholder */}
              <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-muted to-surface" />
                {/* Placeholder avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-accent-2/20 border border-border mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-accent">
                        {PERSONAL_INFO.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Replace with your photo
                    </p>
                  </div>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                {/* Accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent via-accent-2 to-transparent" />
              </div>

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 border border-border/50"
              >
                <div className="text-2xl font-display font-bold text-accent">
                  2
                </div>
                <div className="text-xs text-muted-foreground">Years building</div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-4 border border-border/50"
              >
                <div className="text-2xl font-display font-bold text-accent-2">
                  5
                </div>
                <div className="text-xs text-muted-foreground">Projects shipped</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-10"
        >
          {STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={14} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
