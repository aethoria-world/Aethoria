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

// Gentle fade-in for elements marked .reveal.
// window.aethoriaReveal(el) lets story-reader.js apply it to chapters it adds later.
let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
}
window.aethoriaReveal = item => {
  if (revealObserver) revealObserver.observe(item);
  else item.classList.add("visible");
};
document.querySelectorAll(".reveal").forEach(window.aethoriaReveal);

// The chapter index and chapter content on story pages are handled by story-reader.js.
