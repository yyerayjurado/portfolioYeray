import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg, Logo, LOGO_RATIO } from "../../welcome/ui";
import { CUES, W, ci, easeIn, easeInOut, easeOut, local } from "../theme";
import { DecodeWord, DropWord, Mono, WipeWord } from "../ui";

// Escena 2 · Presentación: la energía converge, una barra tipográfica revela el logotipo y aparecen tres palabras.
export const A2Brand: React.FC = () => {
  const f = useCurrentFrame();
  const burst = ci(f, [0, 10], [0, 1], easeOut);
  const bar = ci(f, [4, 16], [0, 1], easeInOut);
  const reveal = ci(f, [12, 30], [0, 100], easeInOut);
  const up = ci(f, [local(CUES.creatividadWord, 1) - 16, local(CUES.creatividadWord, 1) + 6], [0, 1], easeInOut);
  const lw = 900 - 260 * up;
  const lh = lw / LOGO_RATIO;
  const cy = 440 - 150 * up;
  const out = ci(f, [228, 238], [0, 1], easeIn);
  return (
    <AbsoluteFill>
      <BlueBg />
      {/* Onda expansiva de la convergencia */}
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 960 - 300, top: 440 - 300, width: 600, height: 600, borderRadius: "50%", border: `2px solid ${W.white}`, transform: `scale(${ci(f, [i * 4, 34 + i * 4], [0.1, 2.4 + i * 0.5], easeOut)})`, opacity: ci(f, [i * 4, 34 + i * 4], [0.9, 0]) }} />
      ))}
      <div style={{ position: "absolute", left: 960 - 40, top: 440 - 40, width: 80, height: 80, borderRadius: "50%", background: W.white, transform: `scale(${1 - burst})` }} />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        {/* Barra tipográfica que abre paso al logotipo */}
        <div style={{ position: "absolute", left: 960 - (lw / 2 + 60) * bar, top: cy - 3, width: (lw + 120) * bar, height: 6, background: W.white, opacity: ci(f, [26, 36], [1, 0]) }} />
        <div style={{ position: "absolute", left: (1920 - lw) / 2, top: cy - lh / 2, clipPath: `inset(${50 - reveal / 2}% 0 ${50 - reveal / 2}% 0)`, transform: `scale(${ci(f, [12, 50], [1.06, 1], easeOut)})` }}>
          <Logo width={lw} />
        </div>
        <div style={{ position: "absolute", top: 640, width: 1920, display: "flex", justifyContent: "center", alignItems: "center", gap: 44 }}>
          <DropWord text="CREATIVIDAD" at={local(CUES.creatividadWord, 1)} size={64} />
          <span style={{ width: 14, height: 14, background: W.white, borderRadius: 3, transform: "rotate(45deg)", opacity: ci(f, [local(CUES.diseno, 1) - 6, local(CUES.diseno, 1)], [0, 1]) }} />
          <WipeWord text="DISEÑO" at={local(CUES.diseno, 1) - 3} size={64} />
          <span style={{ width: 14, height: 14, background: W.white, borderRadius: 3, transform: "rotate(45deg)", opacity: ci(f, [local(CUES.tecnologia, 1) - 6, local(CUES.tecnologia, 1)], [0, 1]) }} />
          <DecodeWord text="TECNOLOGÍA" at={local(CUES.tecnologia, 1) - 3} size={64} />
        </div>
        <div style={{ position: "absolute", top: 760, width: 1920, display: "flex", justifyContent: "center" }}>
          <Mono o={ci(f, [local(CUES.tecnologia, 1) + 30, local(CUES.tecnologia, 1) + 44], [0, 1])}>ESTUDIO DIGITAL</Mono>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
