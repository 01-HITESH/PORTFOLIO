"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display font-bold text-foreground hover:text-accent transition-colors"
            >
              {PERSONAL_INFO.name.split(" ")[0]}
              <span className="text-accent">.</span>dev
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              © {year} {PERSONAL_INFO.name}. Built with Next.js & love.
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
          >
            Back to top
            <ArrowUpRight size={12} className="rotate-45 -rotate-90" />
          </button>

          {/* Socials */}
          <div className="flex items-center gap-4">
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
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
