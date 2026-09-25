# h7karu.github.io

Personal portfolio of Kawaguchi Hikaru, built with [Astro](https://astro.build) and
deployed to GitHub Pages.

## Running it

This project pins Node via `.node-version` (Astro 7 needs Node 22.12 or newer). With
[fnm](https://github.com/Schniz/fnm) installed, `cd` into the directory and the right
version activates automatically.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + build to dist/
npm run preview  # serve the built site
```

## Editing content

The site has a short homepage plus one page per topic: About, Experience, Projects
(with a write-up page per project), Competitions, Education, Hobbies and Contact.
Almost everything you'd want to change lives in a few places:

| What                                                         | Where                               |
| ------------------------------------------------------------ | ----------------------------------- |
| Name, email, links, and the pages in the header              | `src/site.ts`                       |
| Homepage introduction                                        | `src/pages/index.astro`             |
| Skills, education, coursework, competitions, chess ratings, cube PB, hobbies | `src/data/profile.ts` |
| Jobs (one Markdown file each, newest first)                  | `src/content/experience/*.md`       |
| Projects (card + full write-up in one Markdown file)         | `src/content/projects/*.md`         |
| Each page's heading and intro line                           | `src/pages/<page>.astro`            |
| Page bodies (bio, hobby blurbs, contact card)                | `src/components/sections/*.astro`  |

Frontmatter is validated by the schemas in
[`src/content.config.ts`](src/content.config.ts), so a typo fails the build instead
of silently rendering an empty section.

- **Experience** needs `role`, `org` and `start`. Omit `end` for a role you currently
  hold and it renders as "Present". The Markdown body becomes the bullet points.
- **Projects** need `title`, `summary`, `year`, `context` and `art` (`spectrum`,
  `spread` or `board` — the illustrations in `src/components/ProjectArt.astro`).
  Up to three `metrics` show on the card; `order` sets the sequence. The Markdown
  body is the write-up at `/projects/<file-name>/`.
- **Adding a page:** create `src/pages/<name>.astro` (copy an existing one) and add
  it to `NAV` in `src/site.ts` — the header, homepage cards and previous/next links
  all pick it up.

### Photos

Photos live in `src/assets/` and are resized and converted to WebP at build time.
**Strip metadata before adding a photo** — phone pictures carry GPS coordinates,
and anything committed here is public. Re-saving the pixels drops it:

```sh
python3 -c "from PIL import Image, ImageOps; im = ImageOps.exif_transpose(Image.open('in.jpg')); im.convert('RGB').save('out.jpg', quality=88)"
```

The link-preview image (`public/og.jpg`, 1200×630) and the favicons are static
files; regenerate them if the name or tagline changes.

## Deploying

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages.

One-time setup: in the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**.

## Design notes

- A single light theme with a cool palette (icy off-white, navy ink, royal blue and
  cyan). Every colour is a token at the top of `src/styles/global.css`.
- Instrument Serif for display type, Inter for text and JetBrains Mono for numbers —
  all downloaded and self-hosted at build time, so there are no requests to Google.
- The only client-side JavaScript is the mobile menu in the header, the
  scroll-reveal observer and the copy-email button. Everything respects
  `prefers-reduced-motion`, and content stays visible if JavaScript never runs.
- Page-to-page navigation cross-fades with CSS view transitions where the browser
  supports them.
