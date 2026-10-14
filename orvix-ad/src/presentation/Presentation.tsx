import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SC } from "./theme";
import { P1Hello } from "./scenes/P1Hello";
import { P2What } from "./scenes/P2What";
import { P3Web } from "./scenes/P3Web";
import { P4ShopBrand } from "./scenes/P4ShopBrand";
import { P5Auto } from "./scenes/P5Auto";
import { P6Philosophy } from "./scenes/P6Philosophy";
import { P7Cta } from "./scenes/P7Cta";

// Música original (scripts/presentation_music.py): electrónica elegante a 120 BPM, sin voces.
export const PRESENTATION_AUDIO = { music: "audio/presentation-music.wav", sfx: "audio/presentation-sfx.wav" };

const LIST = [
  ["1 · Presentación", SC.hello, P1Hello],
  ["2 · Qué hacemos", SC.what, P2What],
  ["3 · Diseño y desarrollo web", SC.web, P3Web],
  ["4 · Ecommerce y branding", SC.shopBrand, P4ShopBrand],
  ["5 · Automatización e IA", SC.auto, P5Auto],
  ["6 · Nuestra filosofía", SC.philosophy, P6Philosophy],
  ["7 · Cierre", SC.cta, P7Cta],
] as const;

export const OrvixPresentation: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1010FF" }}>
    {LIST.map(([name, s, C]) => (
      <Sequence key={name} name={name} from={s.from} durationInFrames={s.dur}>
        <C />
      </Sequence>
    ))}
    <Audio src={staticFile(PRESENTATION_AUDIO.music)} volume={0.9} />
    <Audio src={staticFile(PRESENTATION_AUDIO.sfx)} volume={0.7} />
  </AbsoluteFill>
);
