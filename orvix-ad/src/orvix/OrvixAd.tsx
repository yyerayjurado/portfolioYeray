import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { T } from "./theme";
import { Grain } from "./ui";
import { S1Hook } from "./scenes/S1Hook";
import { S2Universe } from "./scenes/S2Universe";
import { S3Services } from "./scenes/S3Services";
import { S4Tech } from "./scenes/S4Tech";
import { S5Converge } from "./scenes/S5Converge";
import { S6Close } from "./scenes/S6Close";

// Banda sonora generada (public/audio/orvix-soundtrack.wav). Para usar otra pista,
// sustituye el archivo o cambia esta ruta; los cortes caen en múltiplos de 15 frames (120 BPM).
export const MUSIC = "audio/orvix-soundtrack.wav";

export const OrvixAd: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence name="1 · Gancho" from={T.hook} durationInFrames={T.universe - T.hook}>
      <S1Hook />
    </Sequence>
    <Sequence name="2 · Universo Orvix" from={T.universe} durationInFrames={T.services - T.universe}>
      <S2Universe />
    </Sequence>
    <Sequence name="3 · Servicios" from={T.services} durationInFrames={T.tech - T.services}>
      <S3Services />
    </Sequence>
    <Sequence name="4 · Tecnología" from={T.tech} durationInFrames={T.converge - T.tech}>
      <S4Tech />
    </Sequence>
    <Sequence name="5 · Convergencia" from={T.converge} durationInFrames={T.close - T.converge}>
      <S5Converge />
    </Sequence>
    <Sequence name="6 · Cierre" from={T.close} durationInFrames={T.end - T.close}>
      <S6Close />
    </Sequence>
    <Grain />
    <Audio src={staticFile(MUSIC)} />
  </AbsoluteFill>
);
