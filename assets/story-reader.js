// AETHORIA — shared story reader for every story page.
//
// The page marks its reading column with data-story="<slug>". The reader loads
// content/stories/<slug>/story.json, then each chapter's Markdown file, and
// renders the chapters in order with the chapter index and previous/next links.
// See README.md ("Adding a chapter").

(function () {
  const reading = document.querySelector(".reading[data-story]");
  if (!reading) return;

  const slug = reading.dataset.story;
  // Relative to the page, so it works from a local server and under a
  // GitHub Pages project URL (…/Aethoria/).
  const storyUrl = new URL("content/stories/" + slug + "/story.json", document.baseURI);
  const ERROR_TEXT = "This story could not be loaded. Please refresh the page.";

  // Minimal Markdown → paragraphs. Chapters are plain prose: paragraphs are
  // separated by a blank line, and line breaks inside a paragraph become a
  // space (exactly as in HTML). Text is inserted as text, never as HTML, and
  // no typographic changes (quotes, dashes) are made.
  function paragraphs(markdown) {
    return markdown
      .replace(/^﻿/, "")
      .replace(/\r\n?/g, "\n")
      .split(/\n[ \t]*\n/)
      .map(block => block.replace(/\s+/g, " ").trim())
      .filter(Boolean);
  }

  async function fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status + " " + url);
    return response.text();
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildChapter(chapter, text) {
    const article = el("article", "chapter reveal");
    article.id = chapter.id;

    const header = el("header", "chapter-header");
    header.append(el("p", "chapter-number", chapter.number));
    if (chapter.title) header.append(el("h2", "chapter-title", chapter.title));
    header.append(el("div", "gold-line"));
    article.append(header);

    paragraphs(text).forEach(p => article.append(el("p", null, p)));
    return article;
  }

  function buildChapterNav(prev, next) {
    const nav = el("nav", "chapter-nav");
    nav.setAttribute("aria-label", "Chapter navigation");
    if (prev) {
      const link = el("a", "chapter-nav-prev", "Previous Chapter");
      link.href = "#" + prev.id;
      nav.append(link);
    }
    if (next) {
      const link = el("a", "chapter-nav-next", "Next Chapter");
      link.href = "#" + next.id;
      nav.append(link);
    }
    return nav;
  }

  function fillIndex(chapters) {
    const index = document.querySelector(".chapter-index");
    if (!index) return;
    const list = index.querySelector("ol");
    list.replaceChildren();
    chapters.forEach(chapter => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + chapter.id;
      link.append(el("span", "num", chapter.number), chapter.title || "");
      item.append(link);
      list.append(item);
    });
    index.hidden = false;
  }

  function reveal(node) {
    if (typeof window.aethoriaReveal === "function") window.aethoriaReveal(node);
    else node.classList.add("visible");
  }

  function showError(error) {
    console.error("Story reader:", error);
    reading.querySelectorAll(".chapter").forEach(node => node.remove());
    const message = el("p", "story-message", ERROR_TEXT);
    message.setAttribute("role", "alert");
    reading.append(message);
  }

  async function load() {
    reading.setAttribute("aria-busy", "true");
    try {
      const story = JSON.parse(await fetchText(storyUrl));
      const chapters = Array.isArray(story.chapters) ? story.chapters : [];
      if (!chapters.length) throw new Error("No chapters listed in " + storyUrl);
      chapters.forEach(c => {
        if (!c || !c.id || !c.number || !c.file) throw new Error("Incomplete chapter entry in " + storyUrl);
      });

      // Each chapter's "file" is relative to its story.json.
      const texts = await Promise.all(chapters.map(c => fetchText(new URL(c.file, storyUrl))));

      const articles = chapters.map((chapter, i) => buildChapter(chapter, texts[i]));
      if (chapters.length >= 2) {
        articles.forEach((article, i) => article.append(buildChapterNav(chapters[i - 1], chapters[i + 1])));
        fillIndex(chapters);
      }

      // Clear any chapters already on the page before inserting the new ones.
      reading.querySelectorAll(".chapter").forEach(node => node.remove());
      reading.append(...articles);
      articles.forEach(reveal);

      // The browser tried to jump to #chapter-N before it existed.
      if (location.hash) {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target && reading.contains(target)) target.scrollIntoView();
      }
    } catch (error) {
      showError(error);
    } finally {
      reading.removeAttribute("aria-busy");
    }
  }

  load();
})();
