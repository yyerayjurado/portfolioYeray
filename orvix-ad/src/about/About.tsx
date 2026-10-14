import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { Subtitles } from "../welcome/ui";
import { SCENES, TL, TOTAL } from "./theme";
import { A1Ideas } from "./scenes/A1Ideas";
import { A2Brand } from "./scenes/A2Brand";
import { A3Thinking } from "./scenes/A3Thinking";
import { A4Philosophy } from "./scenes/A4Philosophy";
import { A5Forward } from "./scenes/A5Forward";
import { A6Close } from "./scenes/A6Close";

// Audio: locución (scripts/about_voiceover.py), música y efectos originales (scripts/about_music.py).
export const ABOUT_AUDIO = { voice: "audio/about-voice.wav", music: "audio/about-music.wav", sfx: "audio/about-sfx.wav" };
const MIX = { gap: 0.55, underVoice: 0.15, end: 0.9, ramp: 0.3 };

// La música se atenúa mientras habla el locutor y culmina con el logotipo final.
const musicVolume = (frame: number) => {
  const t = frame / 30;
  let duck = 0;
  for (const s of TL.sentences) {
    const d = t < s.start ? s.start - t : t > s.end ? t - s.end : 0;
    duck = Math.max(duck, interpolate(d, [0, MIX.ramp], [1, 0], { extrapolateRight: "clamp" }));
  }
  const last = TL.sentences[TL.sentences.length - 1].end;
  const base = interpolate(t, [last, last + 1], [MIX.gap, MIX.end], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return interpolate(t, [0, 0.8], [0, 1], { extrapolateRight: "clamp" }) * (base + (MIX.underVoice - base) * duck);
};

const SCENE_LIST = [A1Ideas, A2Brand, A3Thinking, A4Philosophy, A5Forward, A6Close];
const NAMES = ["1 · Las ideas nacen", "2 · Orvix Studio", "3 · Nuestra forma de pensar", "4 · Nuestra filosofía", "5 · Miramos hacia delante", "6 · Cierre de marca"];

export const OrvixAbout: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1010FF" }}>
    {SCENE_LIST.map((C, i) => (
      <Sequence key={i} name={NAMES[i]} from={SCENES[i].from} durationInFrames={SCENES[i].dur}>
        <C />
      </Sequence>
    ))}
    <Subtitles chunks={TL.chunks} size={50} />
    <Audio src={staticFile(ABOUT_AUDIO.music)} volume={musicVolume} />
    <Audio src={staticFile(ABOUT_AUDIO.sfx)} volume={0.8} />
    <Audio src={staticFile(ABOUT_AUDIO.voice)} />
  </AbsoluteFill>
);

export const ABOUT_FRAMES = TOTAL;
