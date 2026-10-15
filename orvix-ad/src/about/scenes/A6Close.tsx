import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BlueBg, Logo, LOGO_RATIO } from "../../welcome/ui";
import { CUES, SCENES, W, ci, easeInOut, easeOut, local } from "../theme";
import { MaskTitle } from "../ui";

// Escena 6 · Cierre de marca: todo se ralentiza y converge en el logotipo y el mensaje final.
export const A6Close: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = SCENES[5].dur;
  const lw = 860;
  const lh = lw / LOGO_RATIO;
  const cy = 380;
  const s = spring({ frame: f - 8, fps, config: { damping: 200 } });
  const open = ci(f, [6, 30], [50, 0], easeInOut);
  return (
    <AbsoluteFill>
      <BlueBg grid={ci(f, [0, 60], [0.3, 0.6])} />
      {/* Líneas que convergen y se detienen */}
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[-1, 1].map((d) => (
          <line key={d} x1={960 + d * ci(f, [0, 30], [960, lw / 2 + 60], easeOut)} y1={cy} x2={960 + d * ci(f, [0, 30], [1100, lw / 2 + 240], easeOut)} y2={cy} stroke={W.white} strokeWidth={2} opacity={ci(f, [30, 60], [1, 0.35])} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 960 - lw, top: cy - lw * 0.42, width: lw * 2, height: lw * 0.84, background: "radial-gradient(ellipse, rgba(255,255,255,0.22), transparent 65%)", opacity: ci(f, [8, 40], [0, 1]) }} />
      <div style={{ position: "absolute", left: (1920 - lw) / 2, top: cy - lh / 2, clipPath: `inset(${open}% 0 ${open}% 0)`, transform: `scale(${0.94 + 0.06 * s})` }}>
        <Logo width={lw} />
      </div>
      <div style={{ position: "absolute", top: 600, width: 1920, display: "flex", justifyContent: "center" }}>
        <MaskTitle text="IDEAS QUE EVOLUCIONAN" at={local(CUES.evolucionan, 5)} size={62} step={4} align="center" />
      </div>
      <div style={{ position: "absolute", top: 690, width: 1920, display: "flex", justifyContent: "center" }}>
        <MaskTitle text="TECNOLOGÍA QUE CONSTRUYE EL FUTURO" at={local(CUES.futuro, 5)} size={62} step={4} align="center" />
      </div>
      <div style={{ position: "absolute", left: 960 - 70, top: 800, width: 140, height: 3, background: W.white, transform: `scale(${ci(f, [local(CUES.futuro, 5) + 20, local(CUES.futuro, 5) + 40], [0, 1], easeOut)}, 1)` }} />
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [total - 18, total - 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};
