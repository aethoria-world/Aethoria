# Aethoria

*One World. Countless Destinies.*

A small, story-focused fantasy website that introduces the world of Aethoria
through two storylines: **Sonic Legion** and **Dragon Knight**.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies
(except Google Fonts). Works on GitHub Pages and when opened straight from disk.

## Structure

```
index.html            Home: hero, short welcome, the two story cards
sonic-legion.html     Sonic Legion story page
dragon-knight.html    Dragon Knight story page
assets/style.css      Shared styles for every page (image slots at the top)
assets/main.js        Mobile menu, scroll fade-in, automatic chapter index
Images/               Illustrations
```

## Adding a chapter

1. Open `sonic-legion.html` or `dragon-knight.html`.
2. Find the last `<article class="chapter …">` block.
3. Paste a new block after it (a commented template sits just above Chapter I):

   ```html
   <article class="chapter reveal" id="chapter-2">
     <header class="chapter-header">
       <p class="chapter-number">Chapter II</p>
       <h2 class="chapter-title">Chapter title</h2>
       <div class="gold-line"></div>
     </header>
     <p>First paragraph…</p>
     <p>Next paragraph…</p>
   </article>
   ```

- `id` must be unique: `chapter-2`, `chapter-3`, …
- The `chapter-title` line is optional; delete it if the chapter has no title yet.
- The chapter index at the top of the page builds itself and appears once two
  or more chapters are published. Nothing else needs updating.
- Writing `<article class="chapter reveal" id="chapter-2" hidden>` keeps a chapter
  off the page. **It is still readable in the page source**, so keep private
  drafts outside this repository.

## Adding illustrations

Every image location is listed in the **IMAGE SLOTS** block at the top of
`assets/style.css`. Until an image is set, a dark atmospheric gradient is shown.

1. Put the file in `Images/` (e.g. `Images/dragon-knight-hero.jpg`).
2. In `assets/style.css`, change `none` to the file path, starting with `../Images/`:

   ```css
   .hero--dragon { --hero-image: url("../Images/dragon-knight-hero.jpg"); }
   ```

| Slot | Where it appears | Suggested shape |
|---|---|---|
| `.hero` | Home page hero | Wide landscape, ~2400×1350 |
| `.hero--sonic` | Sonic Legion page hero | Wide landscape |
| `.hero--dragon` | Dragon Knight page hero | Wide landscape |
| `.story-art--sonic` | Sonic Legion card on Home | 16:9 |
| `.story-art--dragon` | Dragon Knight card on Home | 16:9 |

When a home card gets an image, delete its emblem
(`<span class="story-emblem">♫</span>` or `⚔`) in `index.html` so it doesn't sit on the art.

Keep images web-sized (ideally under ~500 KB, JPG or WebP). File names are
case-sensitive on GitHub Pages: `Images/Hero.jpg` and `Images/hero.jpg` are different files.

## Previewing

Open `index.html` in a browser. For GitHub Pages, publish from the repository
root (Settings → Pages → Branch: `main`, folder `/`).
