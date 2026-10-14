import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";

// «Orvix — A different perspective» · brand film vertical, 35 s, 30 fps, sin locución.

// Serif editorial en cursiva para contrastar con la grotesca y con el logotipo (Instrument Serif, OFL).
export const SERIF = "Instrument Serif";
loadFont({ family: SERIF, url: staticFile("fonts/instrument-serif-latin-400-normal.woff2"), weight: "400", style: "normal" });
loadFont({ family: SERIF, url: staticFile("fonts/instrument-serif-latin-400-italic.woff2"), weight: "400", style: "italic" });

export const C = {
  blue: "#1010FF",
  deep: "#0808C8", // superficies en sombra
  ink: "#05057A", // azul tinta para textos sobre blanco y sombras
  light: "#3A3AFF",
  white: "#FFFFFF",
  paper: "#F7F7F4", // blanco papel
};

export const FPS = 30;
export const TOTAL = 1050; // 35 s
export const BEAT = 15; // 120 BPM

export const SC = {
  identity: { from: 0, dur: 150 }, // 0–5 s
  perspective: { from: 150, dur: 180 }, // 5–11 s
  vision: { from: 330, dur: 240 }, // 11–19 s
  personality: { from: 570, dur: 240 }, // 19–27 s
  signature: { from: 810, dur: 240 }, // 27–35 s
};

// Acentos musicales (frames locales). scripts/film_music.py usa los mismos tiempos.
export const HIT = {
  flip: 90, // 8 s · «SE TRATA DE CÓMO LO IMAGINAS»
  crops: [30, 52, 75, 97], // 12–14,2 s · reencuadres de la misma composición
  infinite: 120, // 15 s · «INFINITAS POSIBILIDADES»
  message: 90, // 22 s · «CREATIVIDAD CON INTENCIÓN»
  clean: 180, // 25 s · composición más limpia
  tagline: 60, // 29 s · «UNA DIFERENTE FORMA DE CREAR»
  web: 120, // 31 s · «ORVIXSTUDIO.ES»
};

export const SAFE = { top: 250, bottom: 1500, left: 90, right: 990 };
