import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SCENES } from "./theme";
import { P1Intro } from "./scenes/P1Intro";
import { P2Problem } from "./scenes/P2Problem";
import { P3Transform } from "./scenes/P3Transform";
import { P4Solutions } from "./scenes/P4Solutions";
import { P5Result } from "./scenes/P5Result";
import { P6Close } from "./scenes/P6Close";

// Pista original generada con scripts/promo_soundtrack.py (sin material de terceros).
// Para usar otra música, sustituye el archivo o cambia esta ruta.
export const PROMO_MUSIC = "audio/orvix-promo-soundtrack.wav";

// La misma composición funciona en 1920×1080 y 1080×1920: cada escena se reorganiza con useLayout().
export const OrvixPromo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="1 · Inicio" from={SCENES.intro.from} durationInFrames={SCENES.intro.dur}>
      <P1Intro />
    </Sequence>
    <Sequence name="2 · Problema" from={SCENES.problem.from} durationInFrames={SCENES.problem.dur}>
      <P2Problem />
    </Sequence>
    <Sequence name="3 · Transformación" from={SCENES.transform.from} durationInFrames={SCENES.transform.dur}>
      <P3Transform />
    </Sequence>
    <Sequence name="4 · Soluciones" from={SCENES.solutions.from} durationInFrames={SCENES.solutions.dur}>
      <P4Solutions />
    </Sequence>
    <Sequence name="5 · Resultado" from={SCENES.result.from} durationInFrames={SCENES.result.dur}>
      <P5Result />
    </Sequence>
    <Sequence name="6 · Cierre" from={SCENES.close.from} durationInFrames={SCENES.close.dur}>
      <P6Close />
    </Sequence>
    <Audio src={staticFile(PROMO_MUSIC)} />
  </AbsoluteFill>
);
