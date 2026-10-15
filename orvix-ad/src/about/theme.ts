import timeline from "./timeline.json";
export { FONT, MONO, ci, easeIn, easeInOut, easeOut } from "../orvix/theme";
export { W } from "../welcome/theme";

// «Quiénes somos»: todo se cronometra con la locución real (src/about/timeline.json).
export const FPS = 30;
export const TL = timeline;
export const sec = (s: number) => Math.round(s * FPS);
export const TOTAL = TL.durationInFrames;

const P = TL.paragraphs.map((p) => p.start);
const cuts = [0, ...P.slice(1).map((s) => sec(s - 0.4)), TOTAL];
export const SCENES = cuts.slice(0, -1).map((from, i) => ({ from, dur: cuts[i + 1] - from }));
export const local = (abs: number, scene: number) => sec(abs) - SCENES[scene].from;

const A = TL.anchors as Record<string, number>;
const sent = (p: string) => TL.sentences.find((s) => s.text.startsWith(p))!;
const chunk = (p: string) => TL.chunks.find((c) => c.text.startsWith(p))!;
export const CUES = {
  evolves: chunk("En un mundo").start,
  vision: A["visión"],
  creativity: A.creatividad,
  reality: A.convertirlas,
  somos: P[1],
  creatividadWord: P[1] + 1.6, // tras «Somos Orvix Studio»
  diseno: A["diseño"],
  tecnologia: A["tecnología"],
  pensamiento: A.pensamiento,
  innovacion: A["innovación"],
  desarrollo: A.desarrollo,
  realidadText: chunk("para construir").start,
  pensar: P[3],
  crear: A.crear,
  encontrar: A.encontrar,
  simplificar: A.simplificar,
  transformar: A.transformar,
  exploramos: A.exploramos,
  conectar: A.conectar,
  somosEnd: sent("Somos Orvix Studio.").start,
  evolucionan: sent("Ideas que evolucionan").start,
  futuro: sent("Tecnología que construye").start,
};

// Parámetros de animación compartidos
export const ANIM = { pop: 12, word: 16, morph: 30 };
