// main.js — paste this after scaffolding
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

// Import section scripts
// (hero lives in index.html — announcement bar, header, hero video are static markup
// with inline vanilla JS so they paint without waiting on the module graph)
import "./sections/canvasScrub.js";
import "./sections/editorial.js";
import "./sections/unboxing.js";
import "./sections/shop.js";
import "./sections/cta.js";
