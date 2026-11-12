// AETHORIA — shared script for all pages

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Mobile menu: toggle open, close after a link is chosen
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Gentle fade-in for elements marked .reveal
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Chapter index for story pages.
// Lists every published chapter (<article class="chapter"> without the `hidden`
// attribute). Only shown when at least two chapters are published.
const chapterIndex = document.querySelector(".chapter-index");
if (chapterIndex) {
  const chapters = document.querySelectorAll(".chapter:not([hidden])");
  if (chapters.length >= 2) {
    const list = chapterIndex.querySelector("ol");
    chapters.forEach(chapter => {
      const number = chapter.querySelector(".chapter-number");
      const title = chapter.querySelector(".chapter-title");
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#" + chapter.id;
      const num = document.createElement("span");
      num.className = "num";
      num.textContent = number ? number.textContent : "";
      link.append(num, title ? title.textContent : "");
      item.append(link);
      list.append(item);
    });
    chapterIndex.hidden = false;
  }
}
