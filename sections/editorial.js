// sections/editorial.js — 4 full-screen editorial image sections.
// Cinematic background photo + centered luxury text overlay + EXPLORE PARFUM CTA.
// Mounts immediately after the canvas scroll sections (#canvas-sections).
// Vanilla JS: IntersectionObserver entrance + flash-then-navigate clicks.

import throneImg from "../assets/images/throne.jpg";
import orionImg from "../assets/images/orion.jpg";
import nobleImg from "../assets/images/noble.jpg";
import regalImg from "../assets/images/regal.jpg";

const EDITORIAL = [
  {
    img: throneImg,
    name: "Throne",
    desc: "Absolute. Dark. Unrivalled.",
    accords: "Warm · Leather · Amber",
    href: "https://www.sarkar.store/products/throne",
  },
  {
    img: orionImg,
    name: "Orion",
    desc: "Infinite. Cold. Ambitious.",
    accords: "Fresh · Citrus · Aromatic",
    href: "https://www.sarkar.store/products/orion",
  },
  {
    img: nobleImg,
    name: "Noble",
    desc: "Rare. Quiet. Powerful.",
    accords: "Fresh · Woody · Aromatic",
    href: "https://www.sarkar.store/products/noble",
  },
  {
    img: regalImg,
    name: "Regal",
    desc: "Bold. Sacred. Eternal.",
    accords: "Oud · Smoky · Musk",
    href: "https://www.sarkar.store/products/regal",
  },
];

const host = document.getElementById("editorial-sections");

if (host) {
  host.innerHTML = EDITORIAL.map(
    (s) => `
    <section class="editorial-section" data-href="${s.href}">
      <img class="editorial-bg" src="${s.img}" alt="${s.name}" />
      <div class="editorial-overlay"></div>
      <div class="editorial-text">
        <p class="edit-accords">${s.accords}</p>
        <h2 class="edit-name">${s.name}</h2>
        <p class="edit-desc">${s.desc}</p>
        <a class="edit-cta" href="${s.href}">Explore Parfum</a>
      </div>
    </section>
  `,
  ).join("");

  /* ── Scroll entrance animation (IntersectionObserver, fires once) ── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelector(".editorial-text").classList.add("visible");
          io.unobserve(entry.target); // { once: true } semantics
        }
      });
    },
    { threshold: 0.3 },
  );
  host.querySelectorAll(".editorial-section").forEach((el) => io.observe(el));

  /* ── Click behavior: CTA flashes then navigates; section click navigates ── */
  host.querySelectorAll(".editorial-section").forEach((section) => {
    const href = section.dataset.href;

    section.addEventListener("click", (e) => {
      if (e.target.closest(".edit-cta")) return; // link handles itself — no double-fire
      window.location.href = href;
    });

    section.querySelectorAll(".edit-cta").forEach((editCta) => {
      editCta.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // keep the section handler out of this
        editCta.style.opacity = "0.5";
        setTimeout(() => {
          window.location.href = editCta.href;
        }, 200);
      });
    });
  });
}
