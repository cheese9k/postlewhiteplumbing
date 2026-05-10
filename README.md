# Postlewhite Plumbing - Website

Static, SEO-focused, mobile-responsive site for **Postlewhite Plumbing Installations** (Macclesfield), built to deploy as a GitHub Pages site at **postlewhiteplumbing.co.uk**.

## What's in here

```
.
├── index.html          Home (hero, services, why us, areas, reviews, FAQ)
├── services.html       Detailed service descriptions
├── about.html          About / Gas Safe / 17+ years
├── areas.html          Service areas (Macclesfield + 14 surrounding)
├── contact.html        Contact form (mailto-based) + details
├── 404.html            Not-found page
├── robots.txt          Search engine crawl rules
├── sitemap.xml         Sitemap (5 pages)
├── CNAME               GitHub Pages custom domain
├── .nojekyll           Disable Jekyll processing
└── assets/
    ├── css/styles.css  Single mobile-first stylesheet
    ├── js/main.js      Hamburger nav + nav-current highlight
    └── img/            favicon.svg, og-image.svg (placeholders)
```

## SEO included out of the box

- Unique `<title>` and `<meta description>` per page
- Canonical URLs on every page
- Open Graph + Twitter card meta on every page
- Schema.org JSON-LD: `Plumber` (LocalBusiness) on home, `BreadcrumbList` on inner pages, `FAQPage` on home
- Semantic HTML, accessible nav, skip-link, alt text where used
- `sitemap.xml` and `robots.txt`
- Fast: no external JS frameworks, single CSS file, system font stack

## Deploying to GitHub Pages

1. **Create a repo** (e.g. `postlewhite-plumbing-site`) and push these files to the `main` branch.
2. In **Settings → Pages**, set:
   - Source: `Deploy from a branch`
   - Branch: `main` / root (`/`)
3. The included `CNAME` file points the site at `www.postlewhiteplumbing.co.uk`. Once Pages is live, configure DNS at your registrar:
   - **CNAME** record on `www` → `<your-username>.github.io`
   - **A** records on the apex (`@`) pointing to the four GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
4. Back in GitHub Pages settings, tick **Enforce HTTPS** once the SSL cert provisions (can take an hour).

## Things to update before publishing

The site uses real details pulled from the public Facebook page where available. A few items to verify or replace:

- **Gas Safe Register number**, set to **622530** in the hero card, every page footer, the About page, and the JSON-LD schema on the home page.
- **Opening hours**, defaults are Mon–Fri 8–6, Sat 9–2, Sunday emergency only. Adjust in the page footers, the home hero card, the contact page, and the `openingHoursSpecification` JSON-LD on `index.html`.
- **Reviews**, the home page now shows four real recommendations pulled from the Facebook page (Josh Lindsay, Joy Edwards, Tim Wilkinson-Hall, Jennifer Drinkwater). To add or rotate reviews, edit the `<article class="review">` blocks in the testimonials section of `index.html`. Real-time auto-pulling of Facebook reviews isn't reliable due to Meta API restrictions, manual refresh every few months is the most stable approach.
- **Email**, currently `possplumboffice@gmail.com` (the Facebook page email). If you set up `info@postlewhiteplumbing.co.uk`, do a project-wide find/replace.
- **OG image**, `assets/img/og-image.svg` is a generated placeholder. Replace with a 1200×630 PNG photo (`assets/img/og-image.png`) and update the `<meta property="og:image">` tags if you want a real photo in social shares.
- **Favicon PNG**, only an SVG favicon is included. Add `apple-touch-icon.png` (180×180) to `assets/img/` for iOS bookmarks.

## Editing tips

- **Phone, email, WhatsApp** appear in the header CTA, hero card, every footer, and the sticky mobile call bar. To change, find/replace `07902 025580`, `+447902025580`, `possplumboffice@gmail.com` across the project.
- **Add a new service area**, copy a card in `areas.html`, add a tag in `index.html` and a link in the footer if it's a major town.
- **Add a new service**, copy one of the `<article id="…" class="service-block">` sections in `services.html`, then add a card to the home page services grid.

## Local preview

The site is plain static HTML, open `index.html` in a browser, or run any static server:

```bash
# Python
python -m http.server 8080

# Node
npx http-server -p 8080
```

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No build step, no JS