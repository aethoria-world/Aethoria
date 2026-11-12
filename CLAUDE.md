# AETHORIA — project rules

A simple, elegant, story-focused fantasy website. Two storylines only for now:
**Sonic Legion** and **Dragon Knight**. See `README.md` for structure, how to add
chapters, and how to add illustrations.

## Content rules (most important)

- **Never invent, expand, or rephrase story content.** Lore is published word for word
  as the author provides it. Paragraph breaks are the only formatting change allowed.
- Chapter titles in any outline are working titles, not canon. Do not show a chapter
  title on the site unless the author has confirmed it.
- Only publish approved content. No "coming soon" / "yet to be written" placeholders.
- Interface wording (button labels, eyebrows) is not lore, but flag any new wording
  to the author for confirmation.

## Scope rules

- Keep it small: Home, Sonic Legion, Dragon Knight. No encyclopedia sections,
  databases, or extra features unless the author asks.
- Plain HTML/CSS/JS. No frameworks, build steps, or new dependencies.
- Do not generate, download, or use stock images. Illustrations come from the author;
  until then, use the gradient fallbacks in the IMAGE SLOTS block of `assets/style.css`.

## Design system

- Keep the existing dark palette, gold accents, Cinzel headings, Crimson Pro body text,
  ✧ ornaments and gold-line dividers. All tokens live at the top of `assets/style.css`.
- Motion stays subtle and must respect `prefers-reduced-motion`.
- Must work from 320px phones to wide desktop with no horizontal scroll.

## Technical notes

- GitHub Pages is case-sensitive: match file names exactly (`Images/`, not `images/`).
- Use relative links (`index.html`, `assets/…`), never root-absolute (`/assets/…`),
  so the site works both from disk and under a GitHub Pages project URL.
- Story pages share one template. Change both together.

## Workflow

- Work in small phases and wait for the author's review between them.
- Do not commit or push unless the author asks.
