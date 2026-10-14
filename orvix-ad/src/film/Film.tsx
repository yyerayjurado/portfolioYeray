import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Grain } from "./materials";
import { SC } from "./theme";
import { F1Identity } from "./scenes/F1Identity";
import { F2Perspective } from "./scenes/F2Perspective";
import { F3Vision } from "./scenes/F3Vision";
import { F4Personality } from "./scenes/F4Personality";
import { F5Signature } from "./scenes/F5Signature";

// «Orvix — A different perspective» · brand film vertical sin locución.
// Banda sonora original: scripts/film_music.py (electrónica minimalista, 120 BPM).
export const FILM_AUDIO = { music: "audio/film-music.wav", sfx: "audio/film-sfx.wav" };

const LIST = [
  ["1 · Identidad", SC.identity, F1Identity],
  ["2 · Otra perspectiva", SC.perspective, F2Perspective],
  ["3 · Nuestra forma de ver", SC.vision, F3Vision],
  ["4 · Personalidad Orvix", SC.personality, F4Personality],
  ["5 · Firma de marca", SC.signature, F5Signature],
] as const;

export const OrvixFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0808C8" }}>
    {LIST.map(([name, s, Comp]) => (
      <Sequence key={name} name={name} from={s.from} durationInFrames={s.dur}>
        <Comp />
      </Sequence>
    ))}
    <Grain />
    <Audio src={staticFile(FILM_AUDIO.music)} volume={0.92} />
    <Audio src={staticFile(FILM_AUDIO.sfx)} volume={0.7} />
  </AbsoluteFill>
);
