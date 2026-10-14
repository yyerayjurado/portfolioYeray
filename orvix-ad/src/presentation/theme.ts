export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";
export { W } from "../welcome/theme";

// Presentación de marca vertical (Reels/TikTok/Shorts) · 40 s · 30 fps · solo música (120 BPM → 15 frames/beat).
export const FPS = 30;
export const TOTAL = 1200;
export const SC = {
  hello: { from: 0, dur: 150 }, // 0–5 s
  what: { from: 150, dur: 150 }, // 5–10 s
  web: { from: 300, dur: 180 }, // 10–16 s
  shopBrand: { from: 480, dur: 180 }, // 16–22 s
  auto: { from: 660, dur: 180 }, // 22–28 s
  philosophy: { from: 840, dur: 150 }, // 28–33 s
  cta: { from: 990, dur: 210 }, // 33–40 s
};
// Acentos (frames locales). scripts/presentation_music.py usa los mismos.
export const HIT = { helloText: 30, helloSub: 60, idea: 60, brand: 90, cart: 54, web: 90, cta2: 45 };
export const SAFE = { top: 250, bottom: 1450, left: 90, right: 990 };
