# RCM Automation — Premium Redesign

A reimagined, dark-themed, AI-startup-grade redesign of [rcmautomation.ai](https://rcmautomation.ai/).

Built with **React + Vite + Tailwind CSS + Framer Motion**. All original messaging,
agents, and brand identity preserved — visual language elevated.

## Highlights

- **Animated particle hero** (canvas-based, mouse-reactive, DPI-aware, paused offscreen)
- **Glassmorphism** surfaces, conic-gradient glows, gradient strokes
- **Scroll-driven parallax** in the product showcase
- **Animated counters** for stats (Framer Motion `useMotionValue`)
- **Sticky-rail "How it works"** with progress line
- **Floating UI chips** around the hero dashboard mockup
- **Marquee logo strip** with edge fade mask
- **Fully responsive**, mobile-first, with reduced-motion support
- **SEO meta** + OG tags + accessible nav + smooth scroll

## File map

```
src/
├── App.jsx                     # Section composition
├── main.jsx                    # React root
├── index.css                   # Tailwind layers + design tokens
└── components/
    ├── Navbar.jsx              # Sticky glass nav, mobile sheet
    ├── Hero.jsx                # Headline + animated dashboard
    ├── ParticleField.jsx       # Canvas particle background
    ├── LogoMarquee.jsx         # Integrations strip
    ├── AIAgents.jsx            # Seven-agent feature grid
    ├── Showcase.jsx            # Orbital "neural network" visual
    ├── HowItWorks.jsx          # 4-step sticky timeline
    ├── Stats.jsx               # Animated counters
    ├── Testimonials.jsx        # Social proof cards
    ├── CTA.jsx                 # Conversion section
    └── Footer.jsx              # Footer
```

## Run locally

Requires **Node 18+** and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build
npm run preview
```

## Customizing

- **Colors / brand** — edit `tailwind.config.js` (`theme.extend.colors`) and the
  CSS gradient utilities in `src/index.css` (`.text-gradient`, `.btn-primary`, etc.).
- **Typography** — fonts are loaded in `index.html`. Swap the `<link>` and update
  `theme.extend.fontFamily` in `tailwind.config.js`.
- **Content** — every section's copy lives at the top of its component file as a
  plain JS array (e.g. `agents`, `steps`, `stats`, `testimonials`).
- **Animations** — most timings live in each component's `transition` props.
  Reduced-motion is honored globally via the `@media (prefers-reduced-motion)`
  rule in `src/index.css`.

## Performance notes

- Canvas particle field is RAF-driven and pauses on `visibilitychange`.
- All scroll animations use Framer Motion's `viewport={{ once: true }}` so they
  fire once and stop observing.
- No images — all visuals are SVG, CSS gradients, or Lucide icons, keeping the
  bundle small and infinitely crisp.

## Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`).
- All interactive elements are real `<a>` / `<button>` with focus styles.
- Decorative canvas marked `aria-hidden="true"`.
- Color contrast meets WCAG AA on all text against the dark backdrop.
