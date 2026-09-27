// sections/cta.js — The One & Only + CTA Section interactions
import orionImg from "../assets/images/orion.jpg";

// Section A: The One & Only scroll entrance (IntersectionObserver, threshold: 0.25, fires once)
const theOne = document.getElementById("the-one");
if (theOne) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          theOne.classList.add("visible");
          io.unobserve(theOne);
        }
      });
    },
    { threshold: 0.25 },
  );
  io.observe(theOne);
}

// Section B: Button click handlers
const shopNowBtn = document.getElementById("cta-shop-now");
if (shopNowBtn) {
  shopNowBtn.addEventListener("click", () => {
    window.location.href = "https://www.sarkar.store/";
  });
}

const exploreBtn = document.getElementById("cta-explore");
if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    const shop = document.getElementById("shop");
    if (shop) shop.scrollIntoView({ behavior: "smooth" });
  });
}

// Image asset resolution
const ctaImg = document.querySelector(".cta-img-wrap img");
if (ctaImg && orionImg) {
  ctaImg.src = orionImg;
}
