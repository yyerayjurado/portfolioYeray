import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SC } from "./theme";
import { R1Start } from "./scenes/R1Start";
import { R2Who } from "./scenes/R2Who";
import { R3Essence } from "./scenes/R3Essence";
import { R4Philosophy } from "./scenes/R4Philosophy";
import { R5Forward } from "./scenes/R5Forward";
import { R6Close } from "./scenes/R6Close";

// Música original (scripts/reel_music.py): electrónica cinematográfica a 120 BPM, sin voces.
export const REEL_AUDIO = { music: "audio/reel-music.wav", sfx: "audio/reel-sfx.wav" };

const LIST = [
  ["1 · El comienzo", SC.start, R1Start],
  ["2 · Quiénes somos", SC.who, R2Who],
  ["3 · Nuestra esencia", SC.essence, R3Essence],
  ["4 · Nuestra filosofía", SC.philosophy, R4Philosophy],
  ["5 · Miramos hacia delante", SC.forward, R5Forward],
  ["6 · Cierre de marca", SC.close, R6Close],
] as const;

export const OrvixReel: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1010FF" }}>
    {LIST.map(([name, s, C]) => (
      <Sequence key={name} name={name} from={s.from} durationInFrames={s.dur}>
        <C />
      </Sequence>
    ))}
    <Audio src={staticFile(REEL_AUDIO.music)} volume={0.9} />
    <Audio src={staticFile(REEL_AUDIO.sfx)} volume={0.7} />
  </AbsoluteFill>
);
