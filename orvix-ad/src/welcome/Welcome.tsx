import React from "react";
import { AbsoluteFill, Sequence, interpolate, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SCENES, TL, TOTAL } from "./theme";
import { Subtitles } from "./ui";
import { W1Welcome } from "./scenes/W1Welcome";
import { W2Who } from "./scenes/W2Who";
import { W3WebShop } from "./scenes/W3WebShop";
import { W4BrandMkt3D } from "./scenes/W4BrandMkt3D";
import { W5Automation } from "./scenes/W5Automation";
import { W6Philosophy } from "./scenes/W6Philosophy";
import { W7Close } from "./scenes/W7Close";

// Audio: locución (Kokoro, scripts/welcome_voiceover.py), música y efectos originales (scripts/welcome_music.py).
export const VOICE = "audio/welcome-voice.wav";
export const MUSIC = "audio/welcome-music.wav";
export const SFX = "audio/welcome-sfx.wav";

const MUSIC_GAP = 0.5; // volumen de la música entre frases
const MUSIC_UNDER_VOICE = 0.14; // la voz siempre por encima
const MUSIC_END = 0.85; // la música crece en el cierre
const RAMP = 0.3; // segundos de transición del ducking

// Automatización de volumen: la música se atenúa mientras habla el locutor.
const musicVolume = (frame: number) => {
  const t = frame / 30;
  let duck = 0;
  for (const s of TL.sentences) {
    const d = t < s.start ? s.start - t : t > s.end ? t - s.end : 0;
    duck = Math.max(duck, interpolate(d, [0, RAMP], [1, 0], { extrapolateRight: "clamp" }));
  }
  const last = TL.sentences[TL.sentences.length - 1].end;
  const base = interpolate(t, [last, last + 1.2], [MUSIC_GAP, MUSIC_END], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const intro = interpolate(t, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  return intro * (base + (MUSIC_UNDER_VOICE - base) * duck);
};

const SCENE_COMPONENTS = [W1Welcome, W2Who, W3WebShop, W4BrandMkt3D, W5Automation, W6Philosophy, W7Close];
const NAMES = ["1 · Bienvenida", "2 · Quiénes somos", "3 · Web y Shopify", "4 · Branding, marketing y 3D", "5 · Automatización e IA", "6 · Filosofía", "7 · Cierre"];

export const OrvixWelcome: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1010FF" }}>
    {SCENE_COMPONENTS.map((C, i) => (
      <Sequence key={i} name={NAMES[i]} from={SCENES[i].from} durationInFrames={SCENES[i].dur}>
        <C />
      </Sequence>
    ))}
    <Subtitles />
    <Audio src={staticFile(MUSIC)} volume={musicVolume} />
    <Audio src={staticFile(SFX)} volume={0.8} />
    <Audio src={staticFile(VOICE)} volume={1} />
  </AbsoluteFill>
);

export const WELCOME_FRAMES = TOTAL;
