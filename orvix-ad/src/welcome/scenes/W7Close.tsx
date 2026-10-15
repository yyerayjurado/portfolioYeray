import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CUES, FONT, MONO, SCENES, W, ci, easeOut, local } from "../theme";
import { BlueBg, Logo, LOGO_RATIO, Shapes, useV } from "../ui";

// Escena 7 · Cierre: logotipo centrado, firma y llamada a la acción.
export const W7Close: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { V, Wd } = useV();
  const somos = local(CUES.somos, 6);
  const tag = local(CUES.tagline, 6);
  const cta = local(CUES.cta, 6);
  const lw = V ? 760 : 820;
  const lh = lw / LOGO_RATIO;
  const cy = V ? 720 : 330;
  const s = spring({ frame: f - 4, fps, config: { damping: 18, stiffness: 120 } });
  const total = SCENES[6].dur;
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={ci(f, [0, 30], [0, 0.7])} />
      <div style={{ position: "absolute", left: Wd / 2 - lw, top: cy - lw * 0.45, width: lw * 2, height: lw * 0.9, background: "radial-gradient(ellipse, rgba(255,255,255,0.25), transparent 65%)", opacity: ci(f, [0, 20], [0, 1]) }} />
      <div style={{ position: "absolute", left: (Wd - lw) / 2, top: cy - lh / 2, transform: `scale(${0.85 + 0.15 * s})`, opacity: ci(f, [0, 10], [0, 1]) }}>
        <Logo width={lw} />
      </div>
      <div style={{ position: "absolute", top: cy + lh / 2 + 40, width: Wd, textAlign: "center", fontFamily: FONT, fontWeight: 500, fontSize: V ? 42 : 40, letterSpacing: `${ci(f, [somos, somos + 30], [0.8, 0.5], easeOut)}em`, paddingLeft: "0.5em", color: W.white, opacity: ci(f, [somos, somos + 12], [0, 1]) }}>
        ORVIX STUDIO
      </div>
      <div style={{ position: "absolute", top: cy + lh / 2 + (V ? 120 : 110), width: Wd, textAlign: "center", fontFamily: MONO, fontSize: V ? 30 : 28, letterSpacing: "0.16em", color: W.white70, opacity: ci(f, [tag, tag + 14], [0, 1]) }}>
        DISEÑO · TECNOLOGÍA · INNOVACIÓN
      </div>
      <div style={{ position: "absolute", top: V ? 1180 : 690, width: Wd, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            padding: V ? "24px 44px" : "22px 46px",
            borderRadius: 999,
            background: W.white,
            color: W.blue,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: V ? 38 : 38,
            letterSpacing: "0.02em",
            boxShadow: "0 30px 60px rgba(0,0,40,0.35)",
            opacity: ci(f, [cta, cta + 12], [0, 1]),
            transform: `translateY(${ci(f, [cta, cta + 16], [24, 0], easeOut)}px) scale(${1 + Math.max(0, Math.sin((f - cta - 40) / 10)) * 0.015 * (f > cta + 40 ? 1 : 0)})`,
          }}
        >
          DESCUBRE MÁS EN ORVIXSTUDIO.ES
        </div>
      </div>
      {/* Fundido final elegante */}
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [total - 16, total - 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};
