import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg, Logo, LOGO_RATIO } from "../../welcome/ui";
import { DecodeWord, DropWord, WipeWord } from "../../about/ui";
import { HITS, W, ci, easeIn, easeInOut, easeOut } from "../theme";
import { R1_CENTER } from "./R1Start";

// Escena 2 · Quiénes somos: la energía converge, aparece el logotipo y tres palabras protagonistas.
export const WORD_Y = [1000, 1150, 1300];

export const R2Who: React.FC = () => {
  const f = useCurrentFrame();
  const lw = 860;
  const lh = lw / LOGO_RATIO;
  const ly = 640 + (R1_CENTER.y - 640) * ci(f, [0, 30], [1, 0], easeInOut);
  const open = ci(f, [HITS.logo, HITS.logo + 20], [50, 0], easeInOut);
  const out = ci(f, [196, 210], [0, 1], easeIn);
  const wordBump = (at: number) => 1 + ci(f, [at, at + 4, at + 14], [0, 0.08, 0]);
  return (
    <AbsoluteFill>
      <BlueBg />
      {/* Onda de la convergencia y núcleo que se abre */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 540 - 300, top: R1_CENTER.y - 300, width: 600, height: 600, borderRadius: "50%", border: `3px solid ${W.white}`, transform: `scale(${ci(f, [i * 4, 36 + i * 4], [0.1, 2.6 + i * 0.5], easeOut)})`, opacity: ci(f, [i * 4, 36 + i * 4], [0.9, 0]) }} />
      ))}
      <div style={{ position: "absolute", left: 540 - 40, top: R1_CENTER.y - 40, width: 80, height: 80, borderRadius: "50%", background: W.white, transform: `scale(${ci(f, [0, 12], [1, 0], easeIn)})` }} />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        {/* Barra tipográfica que se abre y deja ver el logotipo */}
        <div style={{ position: "absolute", left: 540 - (lw / 2 + 40) * ci(f, [6, 18], [0, 1], easeInOut), top: ly - 3, width: (lw + 80) * ci(f, [6, 18], [0, 1], easeInOut), height: 6, background: W.white, opacity: ci(f, [30, 40], [1, 0]) }} />
        <div style={{ position: "absolute", left: (1080 - lw) / 2, top: ly - lh / 2, clipPath: `inset(${open}% 0 ${open}% 0)`, transform: `scale(${ci(f, [HITS.logo, HITS.logo + 40], [1.08, 1], easeOut)})` }}>
          <Logo width={lw} />
        </div>
        <div style={{ position: "absolute", left: 540 - 60, top: ly + lh / 2 + 50, width: 120, height: 4, background: W.white, transform: `scaleX(${ci(f, [40, 60], [0, 1], easeOut)})` }} />
        {/* Tres palabras, cada una con su propia animación y en un golpe musical */}
        {[
          <DropWord key="c" text="CREATIVIDAD" at={HITS.words[0]} size={116} />,
          <WipeWord key="d" text="DISEÑO" at={HITS.words[1] - 4} size={116} />,
          <DecodeWord key="t" text="TECNOLOGÍA" at={HITS.words[2] - 3} size={116} />,
        ].map((el, i) => (
          <div key={i} style={{ position: "absolute", top: WORD_Y[i], width: 1080, display: "flex", justifyContent: "center", transform: `scale(${wordBump(HITS.words[i])})`, opacity: f >= HITS.words[i] - 4 ? 1 - ci(f, [HITS.words[i] + 40, HITS.words[i] + 60], [0, i === 2 ? 0 : 0.45]) : 0 }}>
            {el}
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
