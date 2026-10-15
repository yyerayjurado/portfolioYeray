import { Easing, interpolate } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fuentes locales (public/fonts) para que el render no dependa de la red.
export const FONT = "Space Grotesk";
export const MONO = "JetBrains Mono";
for (const w of ["400", "500", "700"]) {
  loadFont({ family: FONT, url: staticFile(`fonts/space-grotesk-latin-${w}-normal.woff2`), weight: w });
}
for (const w of ["400", "500"]) {
  loadFont({ family: MONO, url: staticFile(`fonts/jetbrains-mono-latin-${w}-normal.woff2`), weight: w });
}

// Colores extraídos del logotipo oficial (fondo azul eléctrico + wordmark blanco).
export const C = {
  blue: "#040ADE",
  blueBright: "#3B46FF",
  blueSoft: "#8A90FF",
  ink: "#03041A",
  ink2: "#0A0C2E",
  white: "#F4F4F6",
  muted: "rgba(244,244,246,0.58)",
  line: "rgba(244,244,246,0.14)",
  glass: "rgba(20,24,80,0.55)",
};

export const FPS = 30;

// Puntos de sincronía (frames). La banda sonora está construida sobre 120 BPM → 1 beat = 15 frames.
export const T = {
  hook: 0,
  universe: 90,
  services: 210,
  tech: 420,
  converge: 600,
  close: 750,
  end: 900,
};

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

export const ci = (
  f: number,
  input: number[],
  output: number[],
  easing: (t: number) => number = easeOut,
) =>
  interpolate(f, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
