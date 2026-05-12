# VBWIP — Architect Portfolio

**Vera Blanke Architecture Studio**
Built with React + Vite + TailwindCSS v4

---

## Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| TailwindCSS | v4 (`@tailwindcss/vite`) | Styling |
| Framer Motion | latest | Animations & transitions |
| Lucide React | latest | Icons |

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Cream | `#F8F5F1` | Primary background |
| Linen | `#EDE0D4` | Services section, borders |
| Taupe | `#C9B9AE` | Muted text, decorative lines |
| Warm Tan | `#B09070` | Accents, CTAs, hover states |
| Sand Dark | `#8A6E50` | Hover on buttons |
| Ink | `#1C1815` | Primary text, dark sections |
| Ink Muted | `#4A3F38` | Body copy |

---

## Typography

- **Display / Headings** — Cormorant Garamond (Google Fonts) — light, italic variants
- **Body / UI** — DM Sans (Google Fonts) — 300, 400, 500 weights

---

## Sections

### Navbar
- Fixed top bar, transparent on load → frosted glass on scroll
- Desktop: logo left, nav links center, "Inquire" CTA right
- Mobile: hamburger → fullscreen overlay menu with staggered link animation
- Smooth scroll to section on link click

### Hero
- Full-screen auto-advancing image slideshow (3 images, 5s interval)
- Background parallax: image shifts `scrollY * 0.4` on scroll
- Animated entrance: name slides up, tagline fades in, CTAs appear
- Gradient overlay fades to page cream at bottom for seamless transition
- Scroll progress indicator (animated line)
- Slide dot navigation

### About
- Two-column layout: portrait image + bio text
- Portrait uses inner parallax offset (`scrollY` relative to element center)
- Floating tan badge (18+ years)
- Stats row: Projects, Awards, Countries
- Decorative large background "About" watermark text

### Works
- 6 sample projects across 3 categories: Residential, Cultural, Public
- Filter buttons (All / Residential / Cultural / Public) with AnimatePresence swap
- Mixed-size grid: `large` cards span 2 columns (`lg:col-span-2`), `small` standard
- Per-card alternating parallax Y offsets (even/odd index)
- Hover: image scale zoom + gradient overlay + arrow icon
- Scroll-triggered staggered entrance animation

### Philosophy
- Full-bleed parallax image strip with architectural quote overlay
- Below: sticky heading column + scrolling principles list (4 principles)
- Each principle: number, title, body — revealed on scroll with slide-in animation
- Hover on number changes color (taupe → tan)

### Services
- Warm linen background (`#EDE0D4`)
- 6 service cards in 3-column grid
- Grid lines via `gap-px` on a taupe background container
- Hover: card lifts to cream, icon scales
- Decorative watermark "Services" text

### Contact
- Parallax image strip with headline text
- Dark ink section below with two columns:
  - Left: label/value pairs (studio address, email, phone, hours) + social links
  - Right: contact form (name, email, project brief)
- Form success state replaces form with confirmation message
- All inputs: borderless, bottom-border only — minimal style

### Footer
- Dark ink, single row: logo | copyright | privacy/imprint links

---

## Parallax System

Custom hook `useParallax(speed)` in `src/hooks/useParallax.js`:

```js
// Returns a ref and an offset value (px) driven by scroll position
// relative to the element's center on screen
const { ref, offset } = useParallax(0.3)
```

Additional hooks:
- `useScrollProgress()` — returns 0–1 scroll progress for the top progress bar
- `useInView(threshold)` — IntersectionObserver wrapper for scroll-triggered animations

---

## File Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Works.jsx
│   ├── Philosophy.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ScrollProgress.jsx
├── hooks/
│   └── useParallax.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Planned Features

### Content & CMS
- [ ] Connect to a headless CMS (Contentful / Sanity) for projects and bio
- [ ] Dynamic project detail pages with routing (`react-router-dom`)
- [ ] Project case study layout: full-width images, process notes, specs table

### Works Section
- [ ] Lightbox / modal viewer for project images
- [ ] Project detail page with image gallery, description, year, area, client
- [ ] Masonry or pin-board layout option
- [ ] More project entries with real photography

### Animations & UX
- [ ] Page transition animations between routes
- [ ] Cursor custom follower (dot that scales on hover)
- [ ] Horizontal scroll section for project thumbnails
- [ ] Lazy-load images with blur-up placeholder

### Contact
- [ ] Wire form to email service (Resend / EmailJS / Formspree)
- [ ] Form validation with error messages
- [ ] reCAPTCHA or honeypot spam protection

### SEO & Performance
- [ ] Add `react-helmet-async` for per-page meta tags
- [ ] OpenGraph image + Twitter card
- [ ] Sitemap generation
- [ ] Optimize images (convert to WebP, use `srcset`)
- [ ] Replace Unsplash placeholder images with actual project photography

### Accessibility
- [ ] Audit and fix ARIA roles for parallax decorative images
- [ ] Keyboard navigation for mobile menu
- [ ] Reduce motion: respect `prefers-reduced-motion` in all animations
- [ ] Focus-visible outlines styled to match brand

### Deployment
- [ ] Deploy to Vercel / Netlify
- [ ] Custom domain setup
- [ ] Analytics (Plausible or Fathom — privacy-first)
- [ ] Environment variables for form API keys

### Additional Sections
- [ ] Awards & Recognition section
- [ ] Press / Publications section
- [ ] Studio / Team page
- [ ] Process page (how a project unfolds step by step)
- [ ] Blog or journal (long-form writing on architecture)
