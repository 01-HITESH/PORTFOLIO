"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email address";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters";
  return errors;
}

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const SOCIAL_LINKS = [
    { href: PERSONAL_INFO.github, icon: Github, label: "GitHub" },
    { href: PERSONAL_INFO.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: PERSONAL_INFO.twitter, icon: Twitter, label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-32 max-w-7xl mx-auto px-6" ref={ref}>
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-accent text-sm font-display font-bold tracking-widest uppercase mb-3"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-6 leading-tight"
          >
            Let's build something great
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed mb-10"
          >
            Whether you have a project in mind, an open role, or just want to
            talk tech — my inbox is always open. I typically respond within 24
            hours.
          </motion.p>

          {/* Email link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors group"
            >
              <div className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center group-hover:border-accent/50 transition-colors">
                <Mail size={15} />
              </div>
              <span className="font-display font-medium link-hover">
                {PERSONAL_INFO.email}
              </span>
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 mt-8"
          >
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all"
              >
                <Icon size={15} />
              </Link>
            ))}
          </motion.div>

          {/* Availability notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 p-5 rounded-2xl border border-accent/20 bg-accent/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
              <span className="text-sm font-display font-bold text-foreground">
                {PERSONAL_INFO.availability}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Currently accepting new projects and full-time opportunities
              starting Q2 2025.
            </p>
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-border bg-surface p-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-accent-2/10 border border-accent-2/30 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={28} className="text-accent-2" />
                </motion.div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Message sent!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-accent hover:text-accent-2 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
              >
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-2"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your name"
                      autoComplete="name"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors ${
                        errors.name && touched.name
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-border focus:border-accent/50"
                      }`}
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors ${
                        errors.email && touched.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-border focus:border-accent/50"
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle size={10} />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-display font-bold text-muted-foreground uppercase tracking-wider mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell me about your project, idea, or question..."
                    className={`w-full bg-background border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none transition-colors resize-none ${
                      errors.message && touched.message
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-border focus:border-accent/50"
                    }`}
                  />
                  {errors.message && touched.message && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={10} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
                  >
                    <AlertCircle size={14} />
                    Something went wrong. Please try again or email directly.
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent text-background font-display font-bold text-sm hover:shadow-[0_0_24px_rgba(232,255,77,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
