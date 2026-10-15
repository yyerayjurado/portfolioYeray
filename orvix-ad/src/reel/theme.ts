export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";
export { W } from "../welcome/theme";

// «Quiénes somos» vertical (sin locución): 45 s a 30 fps, música a 120 BPM → 1 beat = 15 frames.
export const FPS = 30;
export const TOTAL = 1350;
export const BEAT = 15;

// Secuencia exacta del encargo (todos los cortes caen en compás).
export const SC = {
  start: { from: 0, dur: 150 }, // 0–5 s   · El comienzo
  who: { from: 150, dur: 210 }, // 5–12 s  · Quiénes somos
  essence: { from: 360, dur: 240 }, // 12–20 s · Nuestra esencia
  philosophy: { from: 600, dur: 270 }, // 20–29 s · Nuestra filosofía
  forward: { from: 870, dur: 210 }, // 29–36 s · Miramos hacia delante
  close: { from: 1080, dur: 270 }, // 36–45 s · Cierre de marca
};

// Momentos musicales destacados (frames locales de cada escena). La música (scripts/reel_music.py) usa los mismos.
export const HITS = {
  idea: 60, // «TODO EMPIEZA CON UNA IDEA»
  logo: 15,
  words: [90, 120, 150], // CREATIVIDAD · DISEÑO · TECNOLOGÍA (8, 9 y 10 s)
  realidad: 90, // 15 s
  pillars: [30, 90, 150], // PENSAR · CREAR · TRANSFORMAR (21, 23 y 25 s)
  proposito: 210, // 27 s
  futuro: 60, // 31 s
  evolucionan: 60, // 38 s
  web: 120, // 40 s
};

// Zona segura vertical para Reels/TikTok/Shorts
export const SAFE = { top: 250, bottom: 1450, left: 90, right: 990 };
