# Aethoria

*One World. Countless Destinies.*

A small, story-focused fantasy website that introduces the world of Aethoria
through two storylines: **Sonic Legion** and **Dragon Knight**.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies
(except Google Fonts). Story chapters are written in Markdown and listed in a
small JSON file per story; one shared script reads them and builds the page.

## Structure

```
index.html                Home: hero, short welcome, the two story cards
sonic-legion.html         Sonic Legion story page   } same template;
dragon-knight.html        Dragon Knight story page  } change both together
.nojekyll                 Tells GitHub Pages to serve files as they are (see below)

content/stories/
  sonic-legion/
    story.json            The list of published chapters, in reading order
    chapters/
      chapter-01.md       Chapter text
  dragon-knight/
    story.json
    chapters/
      chapter-01.md

assets/style.css          Shared styles for every page (image slots at the top)
assets/main.js            Footer year, mobile menu, scroll fade-in
assets/story-reader.js    Story reader: loads story.json and the chapters
assets/story-reader.css   Styles for the reader's additions (previous/next links, messages)
Images/                   Illustrations
```

### How a story page works

Each story page has a reading column marked with the story's folder name:

```html
<div class="reading" data-story="sonic-legion">
```

`assets/story-reader.js` then:

1. loads `content/stories/<story>/story.json`;
2. loads every chapter file listed there;
3. shows the chapters in that order, each with its number (and title, if it has one),
   gold line, drop cap and the ✧ divider between chapters;
4. once two or more chapters are published, fills in the chapter index at the top
   and adds **Previous Chapter** / **Next Chapter** links at the end of each chapter.

If the story can't be loaded, the page shows *"This story could not be loaded.
Please refresh the page."* With JavaScript turned off it shows *"JavaScript is
required to read this story. Please enable JavaScript in your browser."*

Story text lives only in the Markdown files. Don't add chapter text to the HTML pages.

## Adding a chapter

Example: adding Chapter II to Sonic Legion.

**1. Write the chapter** as a new file in that story's `chapters/` folder:

```
content/stories/sonic-legion/chapters/chapter-02.md
```

Write plain paragraphs, separated by one empty line:

```
First paragraph of the chapter.

Second paragraph of the chapter.
```

- The text is shown exactly as written. Quotes, apostrophes and dashes are not changed.
- Line breaks *inside* a paragraph are joined with a space, as in HTML. Only an empty
  line starts a new paragraph.
- Don't put the chapter number or title in this file; they go in `story.json`.
- Save the file as UTF-8 (the default in most editors).

**2. Add the chapter to `story.json`** (`content/stories/sonic-legion/story.json`):

```json
{
  "chapters": [
    { "id": "chapter-1", "number": "Chapter I", "file": "chapters/chapter-01.md" },
    { "id": "chapter-2", "number": "Chapter II", "file": "chapters/chapter-02.md" }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Unique anchor for the chapter, used in links: `chapter-2` → `sonic-legion.html#chapter-2`. Never change it once published. |
| `number` | yes | The label shown above the chapter, exactly as written (`Chapter II`). |
| `file` | yes | Path to the chapter file, relative to `story.json`. Match upper/lower case exactly. |
| `title` | no | A confirmed chapter title: `"title": "The Title"`. Leave it out until the title is final. |

- Chapters appear in the order they are listed.
- Mind the commas: every entry except the last ends with `,`. A JSON mistake stops the
  whole story from loading, so preview before publishing.
- The chapter index and previous/next links appear automatically once two or more chapters
  are listed. Nothing else needs updating.

**3. Preview locally** (see below), then commit and push.

**Keeping drafts private:** anything in this repository is public once pushed, even if it
isn't listed in `story.json`. Keep unpublished chapters outside the repository.

## Previewing locally

The story pages load their chapters with JavaScript, which browsers block for files
opened straight from disk (`file://`). Use a small local web server instead. From the
repository folder:

```
python -m http.server 8000
```

Then open <http://localhost:8000/> in a browser. Stop the server with `Ctrl+C`.

Note: Windows and this local server ignore upper/lower case in file names, but GitHub
Pages does not. `Chapter-02.md` and `chapter-02.md` are different files once published.

## Publishing (GitHub Pages)

The site is published from the repository root (Settings → Pages → Branch: `main`,
folder `/`) at <https://aethoria-world.github.io/Aethoria/>.

- **`.nojekyll`**: by default GitHub Pages runs every site through Jekyll, which
  converts `.md` files into `.html` pages. The reader needs the raw `.md` chapter files,
  so this empty file switches Jekyll off. Do not delete it.
- All links and paths are relative (`assets/…`, `content/…`), never starting with `/`,
  so the site works under the `/Aethoria/` sub-folder as well as on a local server.

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
