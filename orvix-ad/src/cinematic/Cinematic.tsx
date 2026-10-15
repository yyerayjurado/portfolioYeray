import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SC } from "./theme";
import { C1Intro } from "./scenes/C1Intro";
import { C2Digital } from "./scenes/C2Digital";
import { C3Automation } from "./scenes/C3Automation";
import { C4Climax } from "./scenes/C4Climax";
import { C5Reveal } from "./scenes/C5Reveal";
import { C6Close } from "./scenes/C6Close";

// Pista original (scripts/cinematic_soundtrack.py): electrónica cinematográfica, 40 s, clímax 18–26 s.
export const CINEMATIC_MUSIC = "audio/orvix-cinematic-soundtrack.wav";

export const OrvixCinematic: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="1 · Introducción" from={SC.intro.from} durationInFrames={SC.intro.dur}>
      <C1Intro />
    </Sequence>
    <Sequence name="2 · El mundo digital" from={SC.digital.from} durationInFrames={SC.digital.dur}>
      <C2Digital />
    </Sequence>
    <Sequence name="3 · Automatización e IA" from={SC.auto.from} durationInFrames={SC.auto.dur}>
      <C3Automation />
    </Sequence>
    <Sequence name="4 · Clímax visual" from={SC.climax.from} durationInFrames={SC.climax.dur}>
      <C4Climax />
    </Sequence>
    <Sequence name="5 · Revelación de la marca" from={SC.reveal.from} durationInFrames={SC.reveal.dur}>
      <C5Reveal />
    </Sequence>
    <Sequence name="6 · Cierre comercial" from={SC.close.from} durationInFrames={SC.close.dur}>
      <C6Close />
    </Sequence>
    <Audio src={staticFile(CINEMATIC_MUSIC)} />
  </AbsoluteFill>
);
