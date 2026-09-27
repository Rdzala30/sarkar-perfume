# SARKAR — Complete Design Reference

> **URL:** sarkar.store  
> **Platform:** Shopify (custom / heavily-modified Prestige-style theme)  
> **Integrations:** GoKwik (checkout), Judge.me (reviews), Shiprocket (order tracking)  
> **Brand:** SARKAR Perfume by Bhuvan Bam — luxury D2C Indian perfume  
> **Store ID:** 93727785239  
> **Document scope:** Every visual and interaction layer — tokens, layout, components, motion, scroll, responsive

---

## 1. Brand Identity

| Token | Value |
|---|---|
| Brand Name | SARKAR |
| Tagline | "The One & Only" |
| Founded by | Bhuvan Bam, Neel Gogia, Rohit Raj, Jag Chima |
| Legal entity | Brix Lifestyle Private Limited |
| Visual archetype | Dark power · editorial luxury · cinematic |
| Copy voice | ALL CAPS product names; declarative 3-word taglines; sentence-case storytelling |
| Separator style | Three dots with spaces: `ABSOLUTE. DARK. UNRIVALLED.` and center-dot bullets `FRESH · WOODY · AROMATIC` |

---

## 2. Colour System

### Base Palette

| Name | Hex | Usage |
|---|---|---|
| True Black | `#000000` | Page background, hero backgrounds |
| Surface Dark | `#0D0D0D` | Card backgrounds, drawer backgrounds |
| Surface Mid | `#141414` | Announcement bar, form fields |
| Surface Raised | `#1E1E1E` | Offer card backgrounds, FAQ bg |
| Border Subtle | `#2A2A2A` | Dividers, card borders, field borders |
| Border Default | `#3A3A3A` | Active state borders, separators |
| Text Primary | `#FFFFFF` | All primary text on dark bg |
| Text Secondary | `#999999` | Meta text, captions, dates |
| Text Muted | `#666666` | Disabled states, placeholders |
| Accent Gold | `#C4A45A` | Sale badges, promo labels, offer highlights |
| Sale Red | `#E8402A` | Sale badge pill background |
| Success | `#3D9E62` | "Free shipping" tag, confirmation states |

### Announcement Bar
```css
--announce-bg:     #0D0D0D;
--announce-text:   #FFFFFF;
--announce-size:   11px;
--announce-ls:     0.14em;
```

### Product Accent Mapping (each fragrance has its own tint in section overlays)
| Fragrance | Overlay Tint |
|---|---|
| Throne | `rgba(40, 20, 5, 0.55)` — dark amber |
| Orion | `rgba(5, 15, 35, 0.50)` — deep navy |
| Noble | `rgba(5, 30, 10, 0.50)` — forest |
| Regal | `rgba(30, 5, 5, 0.55)` — dark burgundy |

---

## 3. Typography

### Typeface Stack

The site uses a **geometric uppercase sans-serif** for all display copy (likely Neue Haas Grotesk Display or a licensed equivalent hosted on Shopify CDN), and a **clean neutral sans** for body text.

```css
/* Display — ALL CAPS headings, product names, CTAs */
--font-display: "Neue Haas Grotesk Display", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Body — descriptions, product copy, legal */
--font-body:    "Neue Haas Grotesk Text", "Helvetica Neue", Helvetica, Arial, sans-serif;

/* Mono — price, quantities */
--font-mono:    "SFMono-Regular", "Consolas", "Liberation Mono", monospace;
```

### Type Scale

```css
/* Tokens — all in rem, base 16px */
--text-hero:        clamp(3rem, 7vw, 6rem);    /* Hero video overlay title */
--text-section:     clamp(2rem, 4vw, 3.5rem);  /* Product section names: THRONE */
--text-tagline:     clamp(0.9rem, 1.5vw, 1rem);/* ABSOLUTE. DARK. UNRIVALLED. */
--text-h1:          clamp(1.6rem, 3vw, 2.5rem);/* Product page h1 */
--text-h2:          1.25rem;                   /* Section headings */
--text-h3:          1rem;                      /* Card titles */
--text-body:        0.9375rem;                 /* 15px — primary body */
--text-small:       0.8125rem;                 /* 13px — labels, tags */
--text-xs:          0.6875rem;                 /* 11px — announcement bar, legal */

/* Weight tokens */
--weight-regular:   400;
--weight-medium:    500;
--weight-bold:      700;
--weight-black:     900;   /* used for hero product names */

/* Spacing tokens */
--ls-tight:   -0.02em;
--ls-normal:   0em;
--ls-wide:     0.08em;
--ls-wider:    0.14em;
--ls-widest:   0.22em;   /* ALL CAPS labels, CTA buttons */

/* Line-height */
--lh-display:  1.0;     /* Hero text */
--lh-heading:  1.15;
--lh-body:     1.65;
--lh-tight:    1.3;
```

### Typography Rules
- **All display copy** → all-caps, weight 700–900, letter-spacing `--ls-widest`
- **Taglines** → all-caps, weight 400, letter-spacing `--ls-wide` (e.g. `ABSOLUTE. DARK. UNRIVALLED.`)
- **Body descriptions** → sentence case, weight 400, `--lh-body`
- **Occasion tags** → sentence case, dot-bullet separated, color `--text-secondary`
- **Price** → `--font-mono`, weight 500, normal case
- **CTA buttons** → all-caps, weight 700, `--ls-widest`, `--text-small`

---

## 4. Layout & Grid

```css
/* Container */
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;          /* desktop */
}
@media (max-width: 768px) {
  .container { padding: 0 20px; }
}

/* Content container (narrower) */
.container-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Section spacing */
--section-gap:    120px;   /* desktop vertical section padding */
--section-gap-md: 80px;    /* tablet */
--section-gap-sm: 60px;    /* mobile */

/* Product grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* desktop: 4 cols */
  gap: 16px;
}
@media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }

/* Product page layout */
.pdp-layout {
  display: grid;
  grid-template-columns: 55% 45%;  /* gallery | info */
  gap: 0;
  align-items: start;
}
@media (max-width: 900px) {
  .pdp-layout { grid-template-columns: 1fr; }
}
```

---

## 5. Announcement Bar

Fixed to the very top. Scrolling marquee (CSS animation — infinite loop).

```html
<div class="announcement-bar">
  <div class="marquee-track">
    <span>Best offers applied at checkout</span>
    <span class="separator">·</span>
    <span>Shop now and get a freebie with every order</span>
    <span class="separator">·</span>
    <!-- repeated for infinite loop -->
  </div>
</div>
```

```css
.announcement-bar {
  background: var(--surface-mid);       /* #141414 */
  color: var(--text-primary);           /* #FFFFFF */
  height: 36px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 200;
}

.marquee-track {
  display: flex;
  gap: 48px;
  white-space: nowrap;
  animation: marquee 28s linear infinite;
  font-size: var(--text-xs);            /* 11px */
  letter-spacing: var(--ls-widest);    /* 0.22em */
  text-transform: uppercase;
  font-weight: var(--weight-medium);
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.marquee-track .separator {
  color: var(--text-muted);   /* #666666 */
  font-size: 0.5em;
}
```

---

## 6. Header / Navigation

### Structure
```
┌─────────────────────────────────────────────────────────────────┐
│  SARKAR (logo/wordmark — left)    Nav Links (center)    Cart+Login (right) │
│                                   [Buy Now] (CTA pill)                     │
└─────────────────────────────────────────────────────────────────┘
```

**Desktop Nav links (L→R):**
Legacy Gift Set | Shop All | Fragrances ▾ | Build your own bundle | Know Sarkar | The Inner Circle ▾ | Track Order | Log in

### CSS
```css
.site-header {
  position: fixed;
  top: 36px;           /* below announcement bar */
  left: 0; right: 0;
  z-index: 100;
  padding: 0 40px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

/* Scrolled state — frosted glass */
.site-header.scrolled {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* Logo / wordmark */
.header-logo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: var(--weight-black);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-primary);
  text-decoration: none;
}

/* Nav links */
.header-nav a {
  font-family: var(--font-body);
  font-size: var(--text-xs);          /* 11px */
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-widest);  /* 0.22em */
  text-transform: uppercase;
  color: var(--text-primary);
  text-decoration: none;
  padding: 4px 0;
  transition: opacity 0.2s ease;
}
.header-nav a:hover { opacity: 0.6; }

/* "Buy Now" CTA in header */
.header-cta {
  display: inline-block;
  padding: 8px 20px;
  background: var(--text-primary);   /* #FFFFFF */
  color: var(--true-black);          /* #000000 */
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  border-radius: 2px;
  transition: opacity 0.2s ease;
}
.header-cta:hover { opacity: 0.85; }

/* Cart icon */
.header-cart {
  position: relative;
  cursor: pointer;
  color: var(--text-primary);
}
.cart-count {
  position: absolute;
  top: -6px;
  right: -8px;
  width: 16px; height: 16px;
  background: var(--text-primary);
  color: var(--true-black);
  border-radius: 50%;
  font-size: 9px;
  font-weight: var(--weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Dropdown (Fragrances / The Inner Circle)
```css
.nav-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 180px;
  background: var(--surface-dark);  /* #0D0D0D */
  border: 1px solid var(--border-subtle); /* #2A2A2A */
  padding: 12px 0;
  opacity: 0;
  pointer-events: none;
  transform-origin: top center;
  transform: translateX(-50%) scaleY(0.95);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.nav-item:hover .nav-dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) scaleY(1);
}
.nav-dropdown a {
  display: block;
  padding: 10px 20px;
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-secondary);   /* #999999 */
  transition: color 0.15s ease;
}
.nav-dropdown a:hover { color: var(--text-primary); }
```

### Mobile Header / Drawer
- Hamburger icon (top right) opens full-screen black drawer
- Drawer slides in from LEFT
- Social links displayed at top of drawer: X · Facebook · Instagram · YouTube

```css
.mobile-drawer {
  position: fixed;
  inset: 0;
  background: var(--true-black);  /* #000000 */
  z-index: 500;
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 80px 32px 40px;
  overflow-y: auto;
}
.mobile-drawer.open { transform: translateX(0); }

.mobile-drawer-nav a {
  display: block;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: var(--weight-black);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--text-primary);
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.mobile-social {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-secondary);
}
```

---

## 7. Hero Section — Full-Screen Video

```html
<section class="hero-video">
  <video autoplay muted loop playsinline>
    <source src="video.HD-1080p.mp4" type="video/mp4">
  </video>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <a href="/collections/shop-all" class="btn-hero">Discover</a>
  </div>
</section>
```

```css
.hero-video {
  position: relative;
  width: 100vw;
  height: 100svh;       /* 100% of small viewport height */
  overflow: hidden;
  background: var(--true-black);
}

.hero-video video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2) 0%,
    rgba(0,0,0,0) 40%,
    rgba(0,0,0,0.7) 100%
  );
}

.hero-content {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

/* "Discover" — ghost pill button on video */
.btn-hero {
  display: inline-block;
  padding: 14px 48px;
  border: 1px solid rgba(255,255,255,0.6);
  color: var(--text-primary);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  border-radius: 2px;
  backdrop-filter: blur(8px);
  background: rgba(255,255,255,0.06);
  transition: background 0.3s ease, border-color 0.3s ease;
}
.btn-hero:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.9);
}
```

---

## 8. Product Showcase Sections (Homepage)

Each fragrance (THRONE, ORION, NOBLE, REGAL) gets its own **full-screen section** with:
- Desktop: Background image + floating product bottle image on the right
- Mobile: Full-screen product image

```
┌───────────────────────────────────────────────────────┐
│  [Full-screen background: lifestyle / atmospheric]    │
│  [Colour overlay tint — per-fragrance]                │
│                                                       │
│  THRONE                        [bottle image float]  │
│  ABSOLUTE. DARK. UNRIVALLED.                         │
│                                                       │
│  [  EXPLORE PARFUM  ]                                 │
└───────────────────────────────────────────────────────┘
```

```css
.product-showcase {
  position: relative;
  width: 100vw;
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 80px 80px;
  overflow: hidden;
}

.showcase-bg {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}

.showcase-overlay {
  position: absolute;
  inset: 0;
  /* Per-product tint (see Colour System — Product Accent Mapping) */
  background: rgba(40, 20, 5, 0.55); /* Throne example */
}

.showcase-bottle {
  position: absolute;
  right: 8%;
  bottom: 0;
  height: 75%;
  width: auto;
  object-fit: contain;
  /* Subtle entrance animation */
  animation: bottleFloat 6s ease-in-out infinite;
}
@keyframes bottleFloat {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.showcase-content {
  position: relative;
  z-index: 2;
  max-width: 50%;
}

.showcase-name {
  font-family: var(--font-display);
  font-size: var(--text-section);   /* clamp(2rem, 4vw, 3.5rem) */
  font-weight: var(--weight-black);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
  line-height: var(--lh-display);
  margin-bottom: 12px;
}

.showcase-tagline {
  font-size: var(--text-tagline);   /* clamp(0.9rem, 1.5vw, 1rem) */
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin-bottom: 40px;
}

/* CTA — "EXPLORE PARFUM" */
.btn-explore {
  display: inline-block;
  padding: 14px 40px;
  border: 1px solid rgba(255,255,255,0.7);
  color: var(--text-primary);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  border-radius: 2px;
  background: transparent;
  backdrop-filter: blur(6px);
  transition: all 0.3s ease;
}
.btn-explore:hover {
  background: var(--text-primary);
  color: var(--true-black);
  border-color: var(--text-primary);
}
```

---

## 9. Horizontal Scroll Product Carousel

Auto-scrolling infinite marquee of product cards. Loop runs continuously (no pause on hover).

```
┌────────────────────────────────────────────────────────────────────┐
│  [Card] [Card] [Card] [Card] [Card] [Card] → scrolls left forever │
│  NOBLE          THRONE        ORION         REGAL                  │
│  FRESH·WOODY    WARM·LEATHER  FRESH·CITRUS  OUD·SMOKY             │
│  [Buy Now]      [Buy Now]     [Buy Now]     [Buy Now]             │
└────────────────────────────────────────────────────────────────────┘
```

### Product Card in Carousel

```css
.carousel-track {
  display: flex;
  gap: 16px;
  animation: scrollCarousel 40s linear infinite;
  width: max-content;
}
@keyframes scrollCarousel {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }   /* half because content is doubled */
}

.carousel-card {
  flex: 0 0 280px;
  background: var(--surface-dark);         /* #0D0D0D */
  border: 1px solid var(--border-subtle);  /* #2A2A2A */
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.carousel-card-images {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--surface-mid);
}
.carousel-card-images img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: contain;
  object-position: center bottom;
  transition: opacity 0.4s ease;
}
.carousel-card-images img.hover-img {
  opacity: 0;
}
.carousel-card:hover .carousel-card-images img.primary-img { opacity: 0; }
.carousel-card:hover .carousel-card-images img.hover-img    { opacity: 1; }

.carousel-card-body {
  padding: 16px;
}
.carousel-card-name {
  font-family: var(--font-display);
  font-size: var(--text-small);       /* 13px */
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.carousel-card-notes {
  font-size: 10px;
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-secondary);     /* #999999 */
  margin-bottom: 12px;
}
```

---

## 10. Full-Width Editorial Sections

Two editorial sections break the product showcase pattern:

### "Unisex In Spirit. Absolute In Command."
- Full-screen background image (lifestyle/atmospheric)
- Text centered or bottom-left
- No CTA, pure brand statement

### "Know Sarkar — Power isn't inherited. It's built."
- Full-screen bg image
- Copy bottom-left
- CTA: "KNOW SARKAR" (same ghost button as hero)

```css
.editorial-section {
  position: relative;
  width: 100vw;
  height: 85svh;
  display: flex;
  align-items: flex-end;
  padding: 0 80px 80px;
  overflow: hidden;
}
.editorial-headline {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  line-height: 1.2;
  max-width: 600px;
  margin-bottom: 32px;
}
```

---

## 11. Shop the Collection Grid

```css
.collection-section {
  padding: var(--section-gap) 40px;
  background: var(--true-black);
}

.collection-heading {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 40px;
}

/* Product Card — in grid */
.product-card {
  background: var(--surface-dark);         /* #0D0D0D */
  border: 1px solid var(--border-subtle);  /* #2A2A2A */
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

/* Image area — swap on hover */
.product-card-media {
  position: relative;
  aspect-ratio: 1/1;
  background: var(--surface-mid);
  overflow: hidden;
}
.product-card-media img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: contain;
  object-position: center;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.product-card-media .img-hover { opacity: 0; }
.product-card:hover .img-hover  { opacity: 1; }
.product-card:hover .img-main   { opacity: 0; }

/* Sale badge */
.product-badge-sale {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 8px;
  background: var(--sale-red);           /* #E8402A */
  color: var(--text-primary);
  font-size: 9px;
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  border-radius: 2px;
}

/* Sold Out badge */
.product-badge-sold-out {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px 8px;
  background: var(--surface-raised);    /* #1E1E1E */
  color: var(--text-secondary);
  font-size: 9px;
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  border-radius: 2px;
}

.product-card-info {
  padding: 14px 16px 16px;
}
.product-card-title {
  font-family: var(--font-display);
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.product-card-price {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-small);
  color: var(--text-primary);
  font-weight: var(--weight-medium);
}
.product-card-price del {
  color: var(--text-secondary);
  font-weight: var(--weight-regular);
}
.product-card-price .tax-note {
  font-size: 10px;
  color: var(--text-muted);
}

/* Quick ATC button — appears on card hover */
.product-card-atc {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 12px;
  background: var(--surface-mid);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.product-card:hover .product-card-atc { transform: translateY(0); }
```

---

## 12. Buttons — Complete Reference

```css
/* === PRIMARY — white filled (main ATC, checkout) === */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px 24px;
  background: var(--text-primary);    /* #FFFFFF */
  color: var(--true-black);           /* #000000 */
  font-family: var(--font-body);
  font-size: var(--text-small);       /* 13px */
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);  /* 0.22em */
  text-transform: uppercase;
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease, opacity 0.25s ease;
  min-height: 52px;
}
.btn-primary:hover   { opacity: 0.85; }
.btn-primary:active  { opacity: 0.7; }
.btn-primary:disabled {
  background: var(--surface-raised);     /* #1E1E1E */
  color: var(--text-muted);             /* #666666 */
  border-color: var(--border-subtle);
  cursor: not-allowed;
}

/* "Sold Out" state of ATC */
.btn-sold-out {
  background: var(--surface-raised);
  color: var(--text-secondary);
  border-color: var(--border-default);
  cursor: not-allowed;
  pointer-events: none;
}

/* === SECONDARY — outlined white === */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  border-radius: 2px;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}
.btn-secondary:hover {
  background: var(--text-primary);
  color: var(--true-black);
}

/* === GHOST — on dark/video sections === */
.btn-ghost {
  display: inline-block;
  padding: 14px 40px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.5);
  color: var(--text-primary);
  border-radius: 2px;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}
.btn-ghost:hover {
  background: rgba(255,255,255,0.14);
  border-color: rgba(255,255,255,0.85);
}

/* === TEXT LINK === */
.btn-text {
  color: var(--text-secondary);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  text-decoration: underline;
  text-underline-offset: 3px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}
.btn-text:hover { color: var(--text-primary); }

/* === CHECKOUT (GoKwik) — branded === */
.btn-checkout {
  /* Uses GoKwik's own styling but overridden for brand consistency */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  background: var(--text-primary);
  color: var(--true-black);
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  border-radius: 2px;
  min-height: 52px;
}
```

---

## 13. Cart Sidebar (Slide-Out)

Slides in from the **right side** of screen when cart icon is tapped.

```css
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;          /* desktop */
  max-width: 100vw;      /* mobile full-width */
  height: 100dvh;
  background: var(--true-black);   /* #000000 */
  border-left: 1px solid var(--border-subtle);  /* #2A2A2A */
  z-index: 300;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.cart-sidebar.open { transform: translateX(0); }

/* Cart header */
.cart-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-title {
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
}

/* Cart body — scrollable */
.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}

/* Cart item */
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-subtle);
}
.cart-item-image {
  aspect-ratio: 1/1;
  border-radius: 3px;
  background: var(--surface-mid);
  overflow: hidden;
}
.cart-item-name {
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--text-primary);
}
.cart-item-price {
  font-size: var(--text-small);
  color: var(--text-primary);
  margin-top: 4px;
}

/* Cart footer */
.cart-footer {
  padding: 20px 24px;
  border-top: 1px solid var(--border-subtle);
  background: var(--surface-dark);
}
.cart-subtotals {
  margin-bottom: 16px;
}
.cart-total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: var(--text-small);
  color: var(--text-secondary);
  letter-spacing: var(--ls-wide);
}
.cart-total-row.highlight {
  color: var(--text-primary);
  font-weight: var(--weight-bold);
}

/* Overlay */
.cart-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 299;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.cart-overlay.visible {
  opacity: 1;
  pointer-events: auto;
}
```

---

## 14. Product Page (PDP)

### Layout Zones
```
┌─────────────────────────────────────────────────────────┐
│  HEADER (fixed)                                          │
├──────────────────────────────┬──────────────────────────┤
│  GALLERY (left, 55%)         │  PRODUCT INFO (right 45%)│
│  — sticky on scroll          │  — scrolls independently │
│  — vertical image list       │  Title, Price, Variants  │
│  — thumbnails / full images  │  Qty, ATC, Offers        │
├──────────────────────────────┴──────────────────────────┤
│  BHUVAN BAM IMAGE (full-width)                           │
├─────────────────────────────────────────────────────────┤
│  DESCRIPTION                                             │
├─────────────────────────────────────────────────────────┤
│  NOTES BREAKDOWN (Top · Heart · Base — 3 sections)       │
├─────────────────────────────────────────────────────────┤
│  FORMULATED badge section                                │
├─────────────────────────────────────────────────────────┤
│  HOW TO APPLY (full-width image + text)                  │
├─────────────────────────────────────────────────────────┤
│  FAQ (accordion)                                         │
├─────────────────────────────────────────────────────────┤
│  LEGAL INFO                                              │
├─────────────────────────────────────────────────────────┤
│  YOU MAY ALSO LIKE (product grid)                        │
├─────────────────────────────────────────────────────────┤
│  REVIEWS (Judge.me)                                      │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                  │
└─────────────────────────────────────────────────────────┘
```

### Product Gallery
```css
.pdp-gallery {
  position: sticky;
  top: 100px;   /* below header */
  height: calc(100svh - 100px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-width: none;        /* hide scrollbar */
}
.pdp-gallery::-webkit-scrollbar { display: none; }

.gallery-item {
  flex: 0 0 auto;
  width: 100%;
  background: var(--surface-dark);
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  object-position: center;
  transition: transform 0.4s ease;
}
.gallery-item:hover img { transform: scale(1.02); }
```

### Product Info Panel
```css
.pdp-info {
  padding: 40px 40px 60px;
  position: relative;
}

/* Product title */
.pdp-title {
  font-family: var(--font-display);
  font-size: var(--text-h1);        /* clamp(1.6rem, 3vw, 2.5rem) */
  font-weight: var(--weight-black);
  letter-spacing: var(--ls-wide);
  color: var(--text-primary);
  margin-bottom: 4px;
}

/* Subtitle: "UNISEX LEATHER PARFUM" */
.pdp-subtitle {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-secondary);     /* #999999 */
  margin-bottom: 10px;
}

/* Occasion tags: "Late dinners · Long drives · All Nighters" */
.pdp-occasions {
  font-size: var(--text-small);
  color: var(--text-muted);          /* #666666 */
  letter-spacing: var(--ls-wide);
  margin-bottom: 16px;
}

/* Signature tagline: "It smells like smoke, leather and the final say." */
.pdp-tagline {
  font-size: 1.1rem;
  font-weight: var(--weight-medium);
  line-height: var(--lh-heading);
  color: var(--text-primary);
  font-style: italic;
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 2px solid var(--border-default);
}

/* Price */
.pdp-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}
.pdp-price-current {
  font-size: 1.3rem;
  font-weight: var(--weight-bold);
  color: var(--text-primary);
}
.pdp-price-original {
  font-size: 1rem;
  font-weight: var(--weight-regular);
  color: var(--text-secondary);
  text-decoration: line-through;
}
.pdp-tax-note {
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: var(--ls-wide);
}

/* Variant selector — "Choose variants" */
.pdp-variants-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.variant-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.variant-pill {
  padding: 10px 18px;
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--text-small);
  font-weight: var(--weight-medium);
  letter-spacing: var(--ls-wide);
  cursor: pointer;
  transition: all 0.2s ease;
}
.variant-pill:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}
.variant-pill.active {
  border-color: var(--text-primary);
  background: var(--text-primary);
  color: var(--true-black);
}

/* Quantity selector */
.qty-selector {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  width: fit-content;
  margin-bottom: 16px;
}
.qty-btn {
  width: 44px; height: 44px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.qty-btn:hover { background: var(--surface-raised); }
.qty-display {
  width: 44px;
  text-align: center;
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  border-left: 1px solid var(--border-subtle);
  border-right: 1px solid var(--border-subtle);
}

/* Shipping note */
.pdp-shipping-note {
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: var(--ls-wide);
  margin-top: 8px;
}
```

### Offer Cards (Gift / Bundle)
```css
.offer-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}
.offer-card {
  display: grid;
  grid-template-columns: 1fr 80px;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: var(--surface-raised);   /* #1E1E1E */
  border: 1px solid var(--border-subtle);
  border-radius: 3px;
}
.offer-tag {
  font-size: 9px;
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--accent-gold);           /* #C4A45A */
  margin-bottom: 4px;
}
.offer-title {
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
  margin-bottom: 2px;
}
.offer-desc {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.offer-image {
  width: 80px;
  aspect-ratio: 1/1;
  border-radius: 3px;
  object-fit: cover;
}
```

---

## 15. Sticky Add-to-Cart Bar (PDP)

Appears fixed to the top once the main ATC button scrolls out of view.

```css
.sticky-atc {
  position: fixed;
  top: 100px;   /* below fixed header */
  left: 0; right: 0;
  z-index: 90;
  background: var(--surface-dark);
  border-bottom: 1px solid var(--border-subtle);
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.sticky-atc.visible {
  transform: translateY(0);
  opacity: 1;
}
.sticky-atc-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
}
.sticky-atc-product {
  font-size: var(--text-small);
  color: var(--text-secondary);
}
.sticky-atc-price {
  font-size: var(--text-small);
  font-weight: var(--weight-bold);
  color: var(--text-primary);
}
.sticky-atc-btn {
  /* Same as .btn-primary but narrower */
  padding: 12px 32px;
  min-height: auto;
}
```

---

## 16. FAQ Accordion

```css
.faq-item {
  border-bottom: 1px solid var(--border-subtle);
}
.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  text-align: left;
  cursor: pointer;
  transition: color 0.2s ease;
}
.faq-trigger:hover { color: rgba(255,255,255,0.7); }

.faq-icon {
  flex-shrink: 0;
  width: 16px; height: 16px;
  position: relative;
}
.faq-icon::before,
.faq-icon::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  background: currentColor;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.faq-icon::before { width: 16px; height: 1px; }
.faq-icon::after  { width: 1px; height: 16px; }

.faq-item.open .faq-icon::after {
  transform: translate(-50%,-50%) rotate(90deg);
  opacity: 0;
}

.faq-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
}
.faq-item.open .faq-body {
  max-height: 500px;
  padding-bottom: 20px;
}
.faq-body p {
  font-size: var(--text-body);
  color: var(--text-secondary);
  line-height: var(--lh-body);
}
```

---

## 17. Footer

### Structure
```
┌──────────────────────────────────────────────────────────────────┐
│  Newsletter: "THE ONE & ONLY" + email field + "JOIN" button      │
├─────────────────────┬──────────────┬───────────────┬────────────┤
│  Fragrances         │  Company     │  Policy       │ Contact Us │
│  • Throne           │  • Know      │  • Privacy    │  email     │
│  • Noble            │    Sarkar    │  • T&C        │  WhatsApp  │
│  • Regal            │              │  • Shipping   │            │
│  • Orion            │              │  • Cancel     │  Social    │
│  • Bundle           │              │  • Refund     │  icons     │
│  • Legacy Gift      │              │               │            │
├──────────────────────────────────────────────────────────────────┤
│  © 2026, All Rights Reserved by Brix Lifestyle Private Limited   │
└──────────────────────────────────────────────────────────────────┘
```

```css
.site-footer {
  background: var(--true-black);           /* #000000 */
  border-top: 1px solid var(--border-subtle);
  padding: 80px 40px 40px;
}

/* Newsletter strip */
.footer-newsletter {
  padding-bottom: 60px;
  border-bottom: 1px solid var(--border-subtle);
  margin-bottom: 60px;
}
.footer-newsletter-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.footer-newsletter-form {
  display: flex;
  gap: 0;
  max-width: 480px;
}
.footer-email-input {
  flex: 1;
  padding: 14px 16px;
  background: var(--surface-mid);        /* #141414 */
  border: 1px solid var(--border-subtle);/* #2A2A2A */
  border-right: none;
  border-radius: 2px 0 0 2px;
  color: var(--text-primary);
  font-size: var(--text-small);
  letter-spacing: var(--ls-wide);
  outline: none;
  transition: border-color 0.2s ease;
}
.footer-email-input::placeholder {
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: var(--ls-widest);
  font-size: var(--text-xs);
}
.footer-email-input:focus { border-color: var(--text-primary); }

.footer-email-submit {
  padding: 14px 24px;
  background: var(--text-primary);
  color: var(--true-black);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  border: none;
  border-radius: 0 2px 2px 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.footer-email-submit:hover { opacity: 0.85; }

/* Footer columns */
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  gap: 48px;
  margin-bottom: 60px;
}

.footer-col-heading {
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.footer-col a {
  display: block;
  font-size: var(--text-small);
  color: var(--text-secondary);     /* #999999 */
  letter-spacing: var(--ls-wide);
  margin-bottom: 10px;
  text-decoration: none;
  transition: color 0.2s ease;
}
.footer-col a:hover { color: var(--text-primary); }

/* Contact */
.footer-contact-email {
  font-size: var(--text-small);
  color: var(--text-secondary);
  margin-bottom: 12px;
  display: block;
}
.footer-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--text-primary);
  transition: all 0.25s ease;
  margin-bottom: 24px;
}
.footer-whatsapp:hover {
  background: var(--surface-raised);
  border-color: var(--text-primary);
}

/* Social icons */
.footer-socials {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}
.footer-social-icon {
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}
.footer-social-icon:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

/* Footer bottom bar */
.footer-bottom {
  border-top: 1px solid var(--border-subtle);
  padding-top: 24px;
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: var(--ls-wide);
}
```

---

## 18. Phone / Inner Circle Modal

Popup that appears on new visitor to capture phone for loyalty program.

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-box {
  width: min(480px, 95vw);
  background: var(--surface-dark);   /* #0D0D0D */
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 48px 40px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 16px; right: 16px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-phone-input-wrap {
  display: flex;
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  margin: 24px 0;
  overflow: hidden;
}
.modal-country-prefix {
  padding: 14px 16px;
  background: var(--surface-raised);
  color: var(--text-secondary);
  font-size: var(--text-small);
  border-right: 1px solid var(--border-subtle);
  white-space: nowrap;
}
.modal-phone-input {
  flex: 1;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: var(--text-body);
  outline: none;
}
.modal-terms {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 20px;
}
```

---

## 19. Scroll Behaviour & Transitions

```javascript
// ── Header transition on scroll ──────────────────────────────────────
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Sticky ATC on product page ───────────────────────────────────────
const atcButton = document.querySelector('.pdp-atc-main');
const stickyBar = document.querySelector('.sticky-atc');
const observer = new IntersectionObserver(([entry]) => {
  stickyBar.classList.toggle('visible', !entry.isIntersecting);
}, { threshold: 0 });
if (atcButton) observer.observe(atcButton);

// ── Section reveal on scroll (homepage product sections) ─────────────
const reveals = document.querySelectorAll('.showcase-content');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
reveals.forEach(el => revealObserver.observe(el));
```

```css
/* Showcase text reveal animation */
.showcase-content {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.showcase-content.in-view {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
.showcase-content > *:nth-child(1) { transition-delay: 0s; }
.showcase-content > *:nth-child(2) { transition-delay: 0.15s; }
.showcase-content > *:nth-child(3) { transition-delay: 0.3s; }

/* Smooth page scroll */
html { scroll-behavior: smooth; }

/* Snap-scrolling for homepage product sections (optional) */
.homepage-sections {
  scroll-snap-type: y mandatory;
}
.product-showcase,
.hero-video {
  scroll-snap-align: start;
}
```

---

## 20. Responsive Breakpoints

```css
/* 4K / Large desktop */
@media (min-width: 1800px) {
  .container { padding: 0 80px; }
  .product-grid { grid-template-columns: repeat(5, 1fr); }
}

/* Desktop */
@media (max-width: 1440px) {
  /* defaults above apply */
}

/* Tablet landscape */
@media (max-width: 1024px) {
  .product-grid     { grid-template-columns: repeat(3, 1fr); }
  .footer-grid      { grid-template-columns: 1fr 1fr; gap: 40px; }
  .pdp-layout       { grid-template-columns: 50% 50%; }
  .showcase-content { max-width: 65%; }
}

/* Tablet portrait */
@media (max-width: 768px) {
  .site-header      { padding: 0 20px; height: 56px; }
  .pdp-layout       { grid-template-columns: 1fr; }
  .pdp-gallery      { position: relative; top: 0; height: auto; }
  .product-grid     { grid-template-columns: repeat(2, 1fr); }
  .footer-grid      { grid-template-columns: 1fr 1fr; }
  .showcase-content { max-width: 80%; }
  .product-showcase { padding: 0 24px 60px; }
  .editorial-section{ padding: 0 24px 60px; }
  .container        { padding: 0 20px; }
  .cart-sidebar     { width: 100vw; }
  .carousel-card    { flex: 0 0 220px; }
}

/* Mobile */
@media (max-width: 480px) {
  .product-grid     { grid-template-columns: 1fr 1fr; gap: 8px; }
  .footer-grid      { grid-template-columns: 1fr; }
  .sticky-atc       { padding: 10px 16px; }
  .showcase-name    { font-size: 2rem; }
  .carousel-card    { flex: 0 0 160px; }
  .modal-box        { padding: 32px 20px; }
  .btn-primary      { padding: 14px 16px; }
}

/* Prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .marquee-track { animation: none; }
  .showcase-content { opacity: 1 !important; transform: none !important; }
}
```

---

## 21. Accessibility

```css
/* Focus ring — consistent across all interactive elements */
:focus-visible {
  outline: 2px solid rgba(255,255,255,0.8);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Skip to content link */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 20px;
  padding: 10px 20px;
  background: var(--text-primary);
  color: var(--true-black);
  font-weight: var(--weight-bold);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  font-size: var(--text-xs);
  border-radius: 0 0 4px 4px;
  z-index: 9999;
  text-decoration: none;
}
.skip-to-content:focus { top: 0; }

/* Colour contrast notes:
   White #FFFFFF on Black #000000   = 21:1  ✓✓ AAA
   #999999 on #000000               =  5.9:1 ✓  AA (body)
   #666666 on #000000               =  3.1:1 —  AA large text only
   White on rgba overlay (0.55)     = depends on bg; use 0.65+ for safety
*/
```

---

## 22. CSS Custom Properties — Full Root Block

```css
:root {
  /* ── Colors ──────────────────────────────────────── */
  --true-black:      #000000;
  --surface-dark:    #0D0D0D;
  --surface-mid:     #141414;
  --surface-raised:  #1E1E1E;
  --border-subtle:   #2A2A2A;
  --border-default:  #3A3A3A;
  --text-primary:    #FFFFFF;
  --text-secondary:  #999999;
  --text-muted:      #666666;
  --accent-gold:     #C4A45A;
  --sale-red:        #E8402A;
  --success-green:   #3D9E62;

  /* ── Typography ──────────────────────────────────── */
  --font-display: "Neue Haas Grotesk Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-body:    "Neue Haas Grotesk Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono:    "SFMono-Regular", "Consolas", monospace;

  --text-hero:    clamp(3rem, 7vw, 6rem);
  --text-section: clamp(2rem, 4vw, 3.5rem);
  --text-tagline: clamp(0.9rem, 1.5vw, 1rem);
  --text-h1:      clamp(1.6rem, 3vw, 2.5rem);
  --text-h2:      1.25rem;
  --text-h3:      1rem;
  --text-body:    0.9375rem;
  --text-small:   0.8125rem;
  --text-xs:      0.6875rem;

  --weight-regular: 400;
  --weight-medium:  500;
  --weight-bold:    700;
  --weight-black:   900;

  --ls-tight:   -0.02em;
  --ls-normal:   0em;
  --ls-wide:     0.08em;
  --ls-wider:    0.14em;
  --ls-widest:   0.22em;

  --lh-display:  1.0;
  --lh-heading:  1.15;
  --lh-body:     1.65;
  --lh-tight:    1.3;

  /* ── Spacing ──────────────────────────────────────── */
  --section-gap:    120px;
  --section-gap-md: 80px;
  --section-gap-sm: 60px;

  /* ── Borders ──────────────────────────────────────── */
  --radius-sm:  2px;
  --radius-md:  4px;
  --radius-lg:  8px;
  --radius-pill: 999px;

  /* ── Motion ───────────────────────────────────────── */
  --ease-out:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in:   cubic-bezier(0.55, 0.06, 0.68, 0.19);
  --ease-io:   cubic-bezier(0.47, 0, 0.74, 0.71);
  --duration-fast:   200ms;
  --duration-normal: 350ms;
  --duration-slow:   600ms;

  /* ── Z-index ──────────────────────────────────────── */
  --z-base:     1;
  --z-dropdown: 50;
  --z-sticky:   90;
  --z-header:   100;
  --z-overlay:  200;
  --z-drawer:   300;
  --z-modal:    500;
  --z-toast:    600;
}

/* Dark only — this entire site is dark-first, no light mode */
body {
  background: var(--true-black);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: var(--lh-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 23. Page Structure Map

```
<html lang="en">
  <body>

    .skip-to-content           ← accessibility skip link

    .announcement-bar          ← sticky top 0, 36px h, scrolling marquee

    .site-header               ← fixed, top: 36px, transparent → frosted on scroll
      .header-logo
      .header-nav
        .nav-dropdown (×2)     ← Fragrances, The Inner Circle
      .header-actions
        .header-cta            ← "Buy Now" pill
        .header-cart           ← cart icon + count badge

    .mobile-drawer             ← full-screen, slide from left, z:500

    #MainContent
      .hero-video              ← 100svh, autoplay video, "Discover" btn
      .product-showcase × 4   ← 100svh each: THRONE, ORION, NOBLE, REGAL
      .carousel-section        ← horizontal infinite scroll of product cards
      .editorial-section       ← "Unisex In Spirit. Absolute In Command."
      .editorial-section       ← "Power isn't inherited. It's built." + CTA
      .collection-section      ← "SHOP THE COLLECTION" product grid ×5

    .cart-sidebar              ← slide from right, z:300
    .cart-overlay              ← backdrop, z:299

    .modal-overlay             ← Inner Circle phone modal, z:1000

    .site-footer
      .footer-newsletter
      .footer-grid (4 cols)
      .footer-bottom

  </body>
</html>
```

---

## 24. Third-Party Integrations

| Service | Purpose | Visual Impact |
|---|---|---|
| **GoKwik** | Express checkout in cart | Adds checkout button with right-arrow icon SVG |
| **Judge.me** | Reviews on PDP | Star rating widget, review cards |
| **Shiprocket** | Order tracking | External link from "Track Order" nav |
| **WhatsApp** | Customer support | `wa.me/9217175575` link in footer |

---

*This document is a complete design reverse-engineering of sarkar.store as of September 2026. CSS values derived from observable content structure, brand aesthetic, and Shopify D2C patterns. Verify colour hex values against DevTools Inspector on live site before pixel-perfect implementation.*
