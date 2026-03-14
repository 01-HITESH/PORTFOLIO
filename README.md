# Alex Morgan — Personal Portfolio

A production-ready personal portfolio built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

## ✨ Features

- **Hero Section** — Bold headline with animated words, stats, and floating headshot card
- **Projects Gallery** — Filterable masonry grid with hover-reveal details and tech tags
- **Skills Section** — Animated bento-box cards with skill progress bars
- **About Me** — Narrative with engineering principles and testimonial
- **Experience Timeline** — Expandable accordion timeline of work history
- **Contact Form** — Validated form with Supabase/Resend integration + success animation
- **Custom Cursor** — Smooth laggy ring cursor with link hover states
- **Marquee Bar** — Scrolling tech stack strip
- **Dark mode** — Deep charcoal design system with glassmorphism effects
- **Performance** — Image lazy-loading, minimal bundle, optimised fonts
- **SEO** — Full Open Graph, Twitter Card, robots meta tags
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation, focus styles

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ⚙️ Configuration

### 1. Personal Info
Edit `lib/data.ts` to update your name, bio, projects, skills, and experience.

### 2. Contact Form

**Option A — Supabase** (persist messages in DB):
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL to create the table:
   ```sql
   create table contact_messages (
     id uuid primary key default gen_random_uuid(),
     name text not null,
     email text not null,
     subject text,
     message text not null,
     created_at timestamptz default now()
   );
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your keys
4. Uncomment the Supabase block in `app/api/contact/route.ts`

**Option B — Resend** (forward messages by email):
1. Sign up at [resend.com](https://resend.com) and get an API key
2. `npm install resend`
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local`
4. Uncomment the Resend block in `app/api/contact/route.ts`

### 3. Headshot
Replace the placeholder in `components/sections/Hero.tsx` with a real `<Image>` component pointing to your photo in `/public/images/`.

### 4. Resume
Add your resume PDF to `/public/resume.pdf`.

## 🌐 Deployment

Deploy to Vercel in one click:

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## 📁 Project Structure

```
app/
  api/contact/      # Contact form API route
  projects/         # Dedicated projects page
  page.tsx          # Home page
  layout.tsx        # Root layout + metadata
components/
  sections/         # Full-page sections (Hero, Projects, Skills…)
  ui/               # Reusable primitives (Badge, AnimatedText…)
lib/
  data.ts           # All portfolio content
  utils.ts          # cn() helper
  supabase.ts       # Supabase client
```

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | Supabase / Resend |
| Deployment | Vercel |
