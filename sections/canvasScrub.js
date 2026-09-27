// sections/canvasScrub.js — reusable scroll-scrubbed canvas frame-sequence player.
// Two full-screen sections mount directly after the hero (spec Step 10 + 12):
//   1. THRONE — Cloudinary frames 0001–0299 (299 frames)
//   2. ORION  — Cloudinary frames 0300–0369 (70 frames)
// Vanilla JS + GSAP ScrollTrigger. Frames stream from Cloudinary with
// f_auto/q_auto + responsive width (960 mobile / 1920 desktop).

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Side-effect-import order: module bodies run before main.js's registerPlugin,
// so this module registers ScrollTrigger itself.
gsap.registerPlugin(ScrollTrigger);

const CLOUD = "res.cloudinary.com/bsqas6g7";

export class CanvasScrub {
  /**
   * @param {Object} opts
   * @param {HTMLElement} opts.container   the tall (e.g. 400vh) scroll container
   * @param {HTMLCanvasElement} [opts.canvas] explicit canvas element
   * @param {string}      [opts.folder]    Cloudinary folder, e.g. "frames-unboxing"
   * @param {number}      [opts.firstFrame=1] first frame number (1-based)
   * @param {number}      opts.totalFrames frame count
   * @param {string}      [opts.cloud]     Cloudinary cloud name or host
   * @param {Function}    [opts.onUpdate]  (frameIndex, progress) per scrub tick
   * @param {Function}    [opts.onProgress] (progress) per scrub tick
   * @param {Function}    [opts.onLoad]    (pct) loading percentage callback
   * @param {Function}    [opts.onReady]   called once the first frame is drawn
   */
  constructor({
    container,
    canvas,
    folder = "",
    firstFrame = 1,
    totalFrames,
    cloud,
    onUpdate,
    onProgress,
    onLoad,
    onReady,
  }) {
    this.container = container;
    this.canvas = canvas || container?.querySelector(".frame-canvas") || container?.querySelector("canvas");
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.folder = folder;
    this.firstFrame = firstFrame;
    this.totalFrames = totalFrames;
    this.cloud = cloud;
    this.onUpdate = onUpdate;
    this.onProgress = onProgress;
    this.onLoad = onLoad;
    this.onReady = onReady;

    this.frames = new Array(totalFrames); // sparse: index → HTMLImageElement
    this.loadedCount = 0;
    this.current = -1; // last drawn frame index
    this.ready = false;

    this.resize = this.resize.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
    this._onFirstFrame = this._onFirstFrame.bind(this);
  }

  // f_auto,q_auto + responsive width (720 mobile / 1920 desktop).
  frameURL(n) {
    const isMobile = window.innerWidth < 768;
    const w = isMobile ? 720 : 1920;
    const num = String(this.firstFrame + n).padStart(4, "0");
    const cloudHost = this.cloud
      ? (this.cloud.includes(".") ? this.cloud : `res.cloudinary.com/${this.cloud}`)
      : CLOUD;
    const folder = this.folder ? this.folder.replace(/\/+$/, "") + "/" : "";
    return `https://${cloudHost}/image/upload/f_auto,q_auto,w_${w}/${folder}frame_${num}.jpg`;
  }

  async init() {
    // 1. Preload the first 30 frames (loader visible until first draw)
    const head = [];
    for (let i = 0; i < Math.min(30, this.totalFrames); i++) head.push(this._load(i, true));

    await Promise.race([Promise.all(head), new Promise((r) => setTimeout(r, 12000))]);

    // 2. First loaded frame → draw, hide loader, arm ScrollTrigger, notify
    if (this.current < 0) this._onFirstFrame();

    // 3. Remaining frames in background — throttled (concurrency 4, spaced
    // dispatch) so the CDN never rate-limits the burst. Never blocks scrubbing.
    const pending = [];
    for (let i = 0; i < this.totalFrames; i++) if (!this.frames[i]) pending.push(i);
    const CONCURRENCY = 4;
    let cursor = 0;
    const worker = async () => {
      while (cursor < pending.length) {
        const i = pending[cursor++];
        await this._load(i, false);
        await new Promise((r) => setTimeout(r, 120)); // space out dispatches
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    // 4. One retry pass for any frame that failed (rate-limit recovery)
    await new Promise((r) => setTimeout(r, 3000));
    const failed = [];
    for (let i = 0; i < this.totalFrames; i++) if (!this.frames[i]) failed.push(i);
    await Promise.all(failed.map((i) => this._load(i, false, true)));
  }

  _load(i, isHead, isRetry = false) {
    return new Promise((resolve) => {
      if (this.frames[i]) return resolve();
      const img = new Image();
      img.crossOrigin = "anonymous"; // Cloudinary sends ACAO:* — keeps canvas untainted
      img.decoding = "async";
      img.onload = () => {
        this.frames[i] = img;
        this.loadedCount++;
        const pct = Math.round((this.loadedCount / this.totalFrames) * 100);
        this.onLoad?.(pct);
        // First frame to arrive anywhere triggers readiness (guarded, idempotent)
        if (!this.ready && this.current < 0) this._onFirstFrame();
        // If a background frame landed right at the scrub position, refresh the canvas
        else if (Math.abs(i - this.current) <= 2) this._drawIndex(this.current);
        resolve();
      };
      img.onerror = () => {
        // One silent retry after a cooldown — a missing frame skips otherwise;
        // scrub always falls back to the nearest loaded frame.
        if (!isRetry) setTimeout(() => this._load(i, false, true).then(resolve), 4000);
        else resolve();
      };
      img.src = this.frameURL(i);
    });
  }

  _onFirstFrame() {
    if (this.ready || this.current >= 0) return;
    this.ready = true;
    this.resize();
    const first = this.frames.findIndex(Boolean);
    if (first >= 0) this._drawIndex(first);
    this.container?.querySelector(".canvas-loader")?.classList.add("hidden");
    if (!this.onProgress && this.onUpdate) {
      this._initScrollTrigger();
    }
    this.onReady?.();
  }

  _initScrollTrigger() {
    const scrub = this;
    gsap.to({}, {
      scrollTrigger: {
        trigger: this.container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate(st) {
          const idx = Math.round(st.progress * (scrub.totalFrames - 1));
          scrub.drawFrame(idx);
          scrub.onUpdate?.(idx, st.progress);
        },
      },
    });
  }

  /** Recalculate canvas size using devicePixelRatio, redraw current frame. */
  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    if (this.current >= 0) this._drawIndex(this.current);
  }

  /** Draw frame at scrub index; falls back to nearest loaded frame. */
  drawFrame(n) {
    if (!this.ready) return;
    const clamped = Math.max(0, Math.min(this.totalFrames - 1, Math.round(n)));
    let idx = clamped;
    if (!this.frames[idx]) {
      // nearest loaded frame (binary walk outward)
      for (let d = 1; d < this.totalFrames; d++) {
        if (this.frames[clamped - d]) { idx = clamped - d; break; }
        if (this.frames[clamped + d]) { idx = clamped + d; break; }
      }
      if (!this.frames[idx]) return;
    }
    this._drawIndex(idx);
  }

  _drawIndex(idx) {
    this.current = idx;
    const img = this.frames[idx];
    if (!img) return;
    const cw = this.canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const ch = this.canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
    // Center-cover while preserving the frame's aspect ratio (16:9)
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    this.ctx.clearRect(0, 0, cw, ch);
    this.ctx.drawImage(img, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
  }
}

/* ━━━ Section data (frame counts verified against Cloudinary) ━━━ */
const CANVAS_SECTIONS = [
  {
    id: "sec-throne",
    folder: "", // assets verified at Cloudinary root (spec folders 404)
    firstFrame: 1,
    totalFrames: 299, // v1790490343/frame_0001 → v1790490650/frame_0299
    name: "Throne",
    tagline: "Absolute. Dark. Unrivalled.",
    accords: "Warm · Leather · Amber",
    tint: "rgba(40,20,5,0.45)",
  },
  {
    id: "sec-orion",
    folder: "", // assets verified at Cloudinary root (spec folders 404)
    firstFrame: 300,
    totalFrames: 70, // v1790490657/frame_0300 → v1790490680/frame_0369
    name: "Orion",
    tagline: "Infinite. Cold. Ambitious.",
    accords: "Fresh · Citrus · Aromatic",
    tint: "rgba(5,15,35,0.40)",
  },
];

/* ━━━ Text overlay fade behavior ━━━
   0→0.25 hidden · 0.25→0.45 fade/translate in · 0.45→0.80 full · 0.80→1.0 out */
function updateTextOverlay(sectionEl, progress) {
  const overlay = sectionEl.querySelector(".text-overlay");
  const explore = sectionEl.querySelector(".explore-link");
  let o;
  if (progress < 0.25) o = 0;
  else if (progress < 0.45) o = (progress - 0.25) / 0.2;
  else if (progress <= 0.8) o = 1;
  else o = Math.max(0, 1 - (progress - 0.8) / 0.2);
  const eased = o * o * (3 - 2 * o); // smoothstep
  overlay.style.opacity = eased;
  overlay.style.transform = `translateX(-50%) translateY(${(1 - eased) * 12}px)`;
  overlay.style.visibility = eased <= 0 ? "hidden" : "visible";
  // Explore link shares the fade, but only past 50%
  const eo = progress > 0.5 ? eased : 0;
  explore.style.opacity = eo;
  explore.style.visibility = eo <= 0 ? "hidden" : "visible";
}

/* ━━━ Bootstrap both sections ━━━ */
const host = document.getElementById("canvas-sections");

if (host) {
  host.innerHTML = CANVAS_SECTIONS.map(
    (s) => `
    <div id="${s.id}" style="height:400vh;position:relative;background:#000">
      <div class="canvas-sticky">
        <canvas class="frame-canvas"></canvas>
        <div class="color-tint" style="background:${s.tint}"></div>
        <div class="text-overlay">
          <p class="accords-text">${s.accords}</p>
          <h2 class="product-name">${s.name}</h2>
          <p class="tagline-text">${s.tagline}</p>
          <a class="explore-link" href="#shop">Explore Parfum</a>
        </div>
        <div class="canvas-loader">Loading<span class="dots"></span></div>
      </div>
    </div>
  `,
  ).join("");

  const allScrubs = [];

  CANVAS_SECTIONS.forEach((s) => {
    const container = document.getElementById(s.id);
    const scrub = new CanvasScrub({
      container,
      folder: s.folder,
      firstFrame: s.firstFrame,
      totalFrames: s.totalFrames,
      onUpdate: (_idx, progress) => updateTextOverlay(container, progress),
    });
    allScrubs.push(scrub);
    scrub.init();
  });

  // ── Global resize + touch (spec §RESIZE + TOUCH) ──
  window.addEventListener("resize", () => allScrubs.forEach((s) => s.resize()));
  window.addEventListener("orientationchange", () => allScrubs.forEach((s) => s.resize()));
  window.addEventListener("scroll", () => {}, { passive: true });
  window.addEventListener("touchmove", () => {}, { passive: true });
}
