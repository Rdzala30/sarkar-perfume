// sections/shop.js — SHOP THE COLLECTION section.
// Vanilla JS: card generation, quick add-to-cart, and scroll entrance.

import throneImg from "../assets/images/throne.jpg";
import orionImg from "../assets/images/orion.jpg";
import nobleImg from "../assets/images/noble.jpg";
import regalImg from "../assets/images/regal.jpg";

const PRODUCTS = [
  {
    name: "THRONE",
    accords: "WARM · LEATHER · AMBER",
    price: "₹1,999",
    img: throneImg,
    href: "https://www.sarkar.store/products/throne",
  },
  {
    name: "ORION",
    accords: "FRESH · CITRUS · AROMATIC",
    price: "₹1,999",
    img: orionImg,
    href: "https://www.sarkar.store/products/orion",
  },
  {
    name: "NOBLE",
    accords: "FRESH · WOODY · AROMATIC",
    price: "₹1,999",
    img: nobleImg,
    href: "https://www.sarkar.store/products/noble",
  },
  {
    name: "REGAL",
    accords: "OUD · SMOKY · MUSK",
    price: "₹1,999",
    img: regalImg,
    href: "https://www.sarkar.store/products/regal",
  },
];

const grid = document.querySelector("#shop .product-grid");

if (grid) {
  // Generate cards from PRODUCTS array and append to .product-grid
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="product-card" data-href="${p.href}">
      <div class="card-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <h3 class="card-name">${p.name}</h3>
        <p class="card-accords">${p.accords}</p>
        <div class="card-row">
          <span class="card-price">${p.price}</span>
          <button class="card-btn" type="button">ADD TO CART</button>
        </div>
      </div>
    </div>
  `,
  ).join("");

  // Attach card and button interactions
  grid.querySelectorAll(".product-card").forEach((card, idx) => {
    const product = PRODUCTS[idx];
    const btn = card.querySelector(".card-btn");

    // ADD TO CART click
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent card click
      btn.textContent = "ADDED ✓";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "ADD TO CART";
        btn.classList.remove("added");
      }, 1800);
    });

    // Card click → product page
    card.addEventListener("click", () => {
      window.location.href = product.href;
    });
  });

  // SCROLL ENTRANCE (IntersectionObserver, threshold: 0.15, fires once)
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          grid.querySelectorAll(".product-card").forEach((card) => card.classList.add("visible"));
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  io.observe(grid);
}
