import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BlueBg, Chip, Logo, LOGO_RATIO, Shapes, Title } from "../../welcome/ui";
import { HIT, W, ci, easeIn, easeInOut } from "../theme";

// Escena 1 · Presentación: el logotipo se abre desde una línea de luz y nos presentamos.
export const P1Hello: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lw = 820;
  const lh = lw / LOGO_RATIO;
  const cy = 700;
  const s = spring({ frame: f - 4, fps, config: { damping: 200 } });
  const open = ci(f, [4, 22], [50, 0], easeInOut);
  const out = ci(f, [138, 150], [0, 1], easeIn);
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={ci(f, [10, 40], [0, 0.7])} />
      <AbsoluteFill style={{ opacity: 1 - out, transform: `scale(${1 - out * 0.06})` }}>
        <div style={{ position: "absolute", left: 540 - lw, top: cy - lw * 0.45, width: lw * 2, height: lw * 0.9, background: "radial-gradient(ellipse, rgba(255,255,255,0.28), transparent 65%)", opacity: ci(f, [4, 30], [0, 1]) }} />
        <div style={{ position: "absolute", left: 540 - (lw / 2 + 60), top: cy - 2, width: lw + 120, height: 4, background: W.white, transform: `scaleX(${ci(f, [0, 8], [0, 1], easeInOut)})`, opacity: ci(f, [16, 24], [1, 0]) }} />
        <div style={{ position: "absolute", left: (1080 - lw) / 2, top: cy - lh / 2, clipPath: `inset(${open}% 0 ${open}% 0)`, transform: `scale(${0.94 + 0.06 * s})` }}>
          <Logo width={lw} />
        </div>
        <div style={{ position: "absolute", top: 960, left: 90, width: 900, display: "flex", justifyContent: "center" }}>
          <Title text="HOLA, SOMOS ORVIX STUDIO" at={HIT.helloText} size={86} step={4} align="center" maxWidth={900} />
        </div>
        <div style={{ position: "absolute", top: 1220, width: 1080, display: "flex", justifyContent: "center" }}>
          <Chip at={HIT.helloSub} size={30}>Un estudio digital creativo</Chip>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
