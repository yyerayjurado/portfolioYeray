import timeline from "./timeline.json";
export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";

// Colores corporativos del vídeo de bienvenida: azul eléctrico + blanco (azul noche solo como apoyo).
export const W = {
  blue: "#1010FF",
  blueDeep: "#0A0ADC",
  blueLight: "#5A5AFF",
  white: "#FFFFFF",
  white70: "rgba(255,255,255,0.72)",
  white40: "rgba(255,255,255,0.4)",
  white15: "rgba(255,255,255,0.15)",
  white08: "rgba(255,255,255,0.08)",
  navy: "#06064A",
};

export const FPS = 30;
export const TL = timeline;
export const sec = (s: number) => Math.round(s * FPS);
export const TOTAL = TL.durationInFrames;

// Escenas cronometradas a partir de la locución real: cada una empieza en la pausa previa a su idea.
const P = TL.paragraphs.map((p) => p.start);
const cuts = [0, ...P.slice(1).map((s) => sec(s - 0.4)), TOTAL];
export const SCENES = cuts.slice(0, -1).map((from, i) => ({ from, dur: cuts[i + 1] - from }));

// Tiempos útiles (en segundos absolutos) para sincronizar animaciones con lo que dice el locutor.
const chunkStart = (prefix: string) => TL.chunks.find((c) => c.text.startsWith(prefix))!.start;
const sentStart = (prefix: string) => TL.sentences.find((s) => s.text.startsWith(prefix))!.start;
export const CUES = {
  presence: sentStart("Y tu negocio"),
  creatividad: TL.anchors.creatividad,
  diseno: TL.anchors["diseño"],
  tecnologia: TL.anchors["tecnología"],
  soluciones: chunkStart("para construir"),
  shop: chunkStart("Creamos tiendas"),
  sell: chunkStart("para ayudarte"),
  brand: chunkStart("Y trabajamos"),
  marketing: sentStart("También desarrollamos"),
  threeD: TL.anchors.tres,
  step: chunkStart("Y damos"),
  auto: chunkStart("incorporamos"),
  connect: chunkStart("y conectar"),
  ideas: chunkStart("Nuestro objetivo"),
  somos: sentStart("Somos Orvix"),
  tagline: sentStart("Diseño, tecnología"),
  cta: sentStart("Descubre"),
  lastEnd: TL.sentences[TL.sentences.length - 1].end,
};
export const AUTO_STEP = 1.4; // segundos entre nodos del flujo (igual que scripts/welcome_music.py)

// Convierte un tiempo absoluto en frame local de una escena.
export const local = (abs: number, sceneIndex: number) => sec(abs) - SCENES[sceneIndex].from;
