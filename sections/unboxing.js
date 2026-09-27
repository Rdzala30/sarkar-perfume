// sections/unboxing.js — Premium unboxing scroll animation section.
// Mounts after the 4 editorial image sections (#editorial-sections).
// Vanilla JS + GSAP ScrollTrigger, reusing CanvasScrub from canvasScrub.js.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CanvasScrub } from "./canvasScrub.js";

gsap.registerPlugin(ScrollTrigger);

const CLOUD = "bsqas6g7"; // Cloudinary cloud name
const FIRST_FRAME = 376; // frame_0376.jpg
const LAST_FRAME = 524; // frame_0524.jpg
const UNBOXING_FRAMES = LAST_FRAME - FIRST_FRAME + 1; // 149 frames (376 to 524)
const FOLDER = ""; // Cloudinary root

const host = document.getElementById("unboxing");

if (host) {
  host.innerHTML = `
    <section id="unboxing-section" style="height:500vh;position:relative;background:#000">
      <div class="unbox-sticky">            <!-- sticky, top:0, 100vw × 100svh -->
        <canvas id="unbox-canvas"></canvas> <!-- z-index:0 -->
        <div class="unbox-text">            <!-- z-index:2, left-aligned overlay -->
          <span class="unbox-eyebrow">CRAFTED TO PERFECTION</span>
          <h2 class="unbox-heading">UNBOX THE POWER</h2>
          <p class="unbox-sub">Every bottle, a statement. Every fragrance, a throne.</p>
          <div class="unbox-accent-line"></div> <!-- vertical gold line, left side -->
        </div>
        <div class="unbox-loader">          <!-- thin gold progress bar, bottom of canvas -->
          <div class="unbox-loader-bar"></div>
        </div>
      </div>
    </section>
  `;

  function updateUnboxText(p) {
    const text = document.querySelector(".unbox-text");
    if (!text) return;
    if (p > 0.30 && p < 0.80) {
      text.classList.add("visible");
    } else {
      text.classList.remove("visible");
    }
  }

  const unboxScrub = new CanvasScrub({
    container: document.getElementById("unboxing-section"),
    canvas: document.getElementById("unbox-canvas"),
    folder: FOLDER,
    firstFrame: FIRST_FRAME,
    totalFrames: UNBOXING_FRAMES,
    cloud: CLOUD,
    onProgress(progress) {
      updateUnboxText(progress);
    },
    onLoad(pct) {
      const bar = document.querySelector(".unbox-loader-bar");
      if (bar) bar.style.width = pct + "%";
    },
    onReady() {
      document.querySelector(".unbox-loader")?.classList.add("loaded");
    },
  });

  unboxScrub.init();

  gsap.to({}, {
    scrollTrigger: {
      trigger: "#unboxing-section",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate(self) {
        unboxScrub.drawFrame(Math.round(self.progress * (UNBOXING_FRAMES - 1)));
        updateUnboxText(self.progress);
      },
    },
  });

  window.addEventListener("resize", () => unboxScrub.resize());
  window.addEventListener("orientationchange", () => unboxScrub.resize());
}
