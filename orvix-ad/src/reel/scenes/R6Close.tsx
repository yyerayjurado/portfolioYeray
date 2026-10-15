import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BlueBg, Logo, LOGO_RATIO } from "../../welcome/ui";
import { MaskTitle } from "../../about/ui";
import { FONT, HITS, SC, W, ci, easeInOut, easeOut } from "../theme";

// Escena 6 · Cierre de marca: todo se ralentiza, converge y revela el logotipo.
export const R6Close: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lw = 840;
  const lh = lw / LOGO_RATIO;
  const cy = 760;
  const s = spring({ frame: f - 6, fps, config: { damping: 200 } });
  const open = ci(f, [4, 30], [50, 0], easeInOut);
  const total = SC.close.dur;
  return (
    <AbsoluteFill>
      <BlueBg grid={ci(f, [0, 60], [0.2, 0.5])} />
      {/* Últimas formas que convergen y se detienen */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        const d = ci(f, [0, 40], [700, 0], easeOut);
        return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(a) * d - 12, top: cy + Math.sin(a) * d - 12, width: 24, height: 24, borderRadius: i % 2 ? "50%" : 5, background: W.white, opacity: ci(f, [24, 40], [1, 0]) }} />;
      })}
      <div style={{ position: "absolute", left: 540 - lw * 0.9, top: cy - lw * 0.45, width: lw * 1.8, height: lw * 0.9, background: "radial-gradient(ellipse, rgba(255,255,255,0.25), transparent 65%)", opacity: ci(f, [6, 40], [0, 1]) }} />
      <div style={{ position: "absolute", left: (1080 - lw) / 2, top: cy - lh / 2, clipPath: `inset(${open}% 0 ${open}% 0)`, transform: `scale(${0.92 + 0.08 * s})` }}>
        <Logo width={lw} />
      </div>
      <div style={{ position: "absolute", top: 1000, width: 1080, display: "flex", justifyContent: "center" }}>
        <MaskTitle text="IDEAS QUE EVOLUCIONAN" at={HITS.evolucionan} size={70} step={5} align="center" />
      </div>
      <div style={{ position: "absolute", top: 1170, width: 1080, display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "22px 44px", borderRadius: 999, background: W.white, color: W.blue, fontFamily: FONT, fontWeight: 700, fontSize: 52, letterSpacing: "0.04em", opacity: ci(f, [HITS.web, HITS.web + 10], [0, 1]), transform: `translateY(${ci(f, [HITS.web, HITS.web + 16], [30, 0], easeOut)}px)`, boxShadow: "0 30px 60px rgba(0,0,40,0.3)" }}>
          ORVIXSTUDIO.ES
        </div>
      </div>
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [total - 14, total - 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};
