// Constantes compartidas de la pieza «OrvixPromo».
// Las fuentes y utilidades de animación se reutilizan del anuncio vertical (src/orvix/theme.ts).
export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";

// Paleta: azul del logotipo oficial + grafitos neutros. Sin degradados llamativos.
export const P = {
  brand: "#040ADE", // azul del logotipo (fondos, bloques)
  accent: "#4A55FF", // azul de marca aclarado para líneas y textos pequeños sobre oscuro
  bg: "#0A0B0F",
  bg2: "#101217",
  panel: "#15171D",
  panel2: "#1C1F27",
  line: "rgba(244,244,246,0.09)",
  line2: "rgba(244,244,246,0.18)",
  text: "#F4F4F6",
  muted: "rgba(244,244,246,0.56)",
  dim: "rgba(244,244,246,0.32)",
  paper: "#F6F6F3", // fondo de las webs/tiendas de demostración
  ink: "#111216",
};

// Escenas (frames a 30 fps). Música a 120 BPM → 1 beat = 15 frames, 1 compás = 60 frames.
export const SCENES = {
  intro: { from: 0, dur: 150 }, // 0–5 s
  problem: { from: 150, dur: 210 }, // 5–12 s
  transform: { from: 360, dur: 180 }, // 12–18 s
  solutions: { from: 540, dur: 450 }, // 18–33 s
  result: { from: 990, dur: 120 }, // 33–37 s
  close: { from: 1110, dur: 180 }, // 37–43 s
};
export const TOTAL = 1290; // 43 s

// Duraciones de cada solución dentro de la escena 4.
export const SOL = {
  web: { from: 0, dur: 120 },
  shop: { from: 120, dur: 120 },
  brand: { from: 240, dur: 90 },
  auto: { from: 330, dur: 120 },
};
