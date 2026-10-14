import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BlueBg, Logo, LOGO_RATIO, Shapes, Title } from "../../welcome/ui";
import { FONT, HIT, MONO, SC, W, ci, easeInOut, easeOut } from "../theme";

// Escena 7 · Cierre y llamada a la acción.
export const P7Cta: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lw = 760;
  const lh = lw / LOGO_RATIO;
  const cy = 620;
  const s = spring({ frame: f - 4, fps, config: { damping: 16, stiffness: 120 } });
  const total = SC.cta.dur;
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={ci(f, [0, 30], [0, 0.6])} />
      <div style={{ position: "absolute", left: 540 - lw, top: cy - lw * 0.45, width: lw * 2, height: lw * 0.9, background: "radial-gradient(ellipse, rgba(255,255,255,0.26), transparent 65%)", opacity: ci(f, [0, 20], [0, 1]) }} />
      <div style={{ position: "absolute", left: (1080 - lw) / 2, top: cy - lh / 2, transform: `scale(${0.85 + 0.15 * s})`, opacity: ci(f, [0, 8], [0, 1]) }}>
        <Logo width={lw} />
      </div>
      <div style={{ position: "absolute", left: 540 - 70, top: cy + lh / 2 + 50, width: 140, height: 4, background: W.white, transform: `scaleX(${ci(f, [10, 26], [0, 1], easeInOut)})` }} />
      <div style={{ position: "absolute", top: 900, left: 90, width: 900, display: "flex", justifyContent: "center" }}>
        <Title text="¿EMPEZAMOS CON TU PROYECTO?" at={16} size={84} step={4} align="center" maxWidth={900} />
      </div>
      <div style={{ position: "absolute", top: 1170, width: 1080, textAlign: "center", fontFamily: MONO, fontSize: 30, letterSpacing: "0.18em", color: W.white, opacity: ci(f, [HIT.cta2, HIT.cta2 + 12], [0, 1]) }}>DESCUBRE ORVIX STUDIO</div>
      <div style={{ position: "absolute", top: 1250, width: 1080, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "24px 52px", borderRadius: 999, background: W.white, color: W.blue, fontFamily: FONT, fontWeight: 700, fontSize: 52, letterSpacing: "0.01em", boxShadow: "0 30px 60px rgba(0,0,40,0.35)", opacity: ci(f, [HIT.cta2 + 12, HIT.cta2 + 22], [0, 1]), transform: `translateY(${ci(f, [HIT.cta2 + 12, HIT.cta2 + 26], [30, 0], easeOut)}px) scale(${1 + Math.max(0, Math.sin((f - 100) / 10)) * 0.015 * (f > 100 ? 1 : 0)})` }}>
          orvixstudio.es
        </div>
      </div>
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [total - 12, total - 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};
