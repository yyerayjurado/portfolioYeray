// Constantes de «OrvixCinematic» (40 s · 30 fps). Paleta, fuentes y easing se comparten con OrvixPromo.
export { P } from "../promo/theme";
export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";

export const FPS = 30;
export const TOTAL = 1200; // 40 s

// Guion exacto. Todos los cortes caen en el beat de la música (120 BPM → 15 frames por beat).
export const SC = {
  intro: { from: 0, dur: 150 }, // 00:00–00:05
  digital: { from: 150, dur: 180 }, // 00:05–00:11
  auto: { from: 330, dur: 210 }, // 00:11–00:18
  climax: { from: 540, dur: 240 }, // 00:18–00:26
  reveal: { from: 780, dur: 210 }, // 00:26–00:33
  close: { from: 990, dur: 210 }, // 00:33–00:40
};

// Golpes clave (frames locales de cada escena), compartidos con scripts/cinematic_soundtrack.py.
export const HITS = {
  introText: 60, // 2 s: «TODO EMPIEZA CON UNA IDEA»
  introOut: 120, // 4 s: preparación de la transición
  digitalSwap: 90, // 8 s: cambio a la tienda online
  climaxWords: [120, 150, 180], // 22 s, 23 s, 24 s: DISEÑAMOS · DESARROLLAMOS · AUTOMATIZAMOS
  climaxConverge: 210, // 25 s: convergencia final
};
