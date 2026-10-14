import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BlueSurface, Caption, CropMarks, Logo, LOGO_RATIO, MaskLine, Paper } from "../materials";
import { C, FONT, HIT, MONO, SC, SERIF, ci, easeIn, easeInOut, easeOut } from "../theme";

// Escena 5 · Firma de marca: todo se simplifica; un pliego se retira y deja el logotipo.
export const F5Signature: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lw = 800;
  const lh = lw / LOGO_RATIO;
  const cy = 820;
  const lift = ci(f, [6, 40], [0, 1], easeInOut); // el pliego se desliza fuera
  const s = spring({ frame: f - 10, fps, config: { damping: 200 } });
  const total = SC.signature.dur;
  const exit = ci(f, [total - 26, total - 2], [0, 1], easeIn);
  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <AbsoluteFill style={{ transform: `scale(${1 - exit * 0.08})`, boxShadow: exit > 0 ? "0 60px 120px rgba(0,0,40,0.6)" : "none", overflow: "hidden" }}>
        <BlueSurface light={[50, 30]} />
        <div style={{ position: "absolute", left: (1080 - lw) / 2, top: cy - lh / 2, transform: `scale(${0.96 + 0.04 * s})` }}>
          <Logo width={lw} />
        </div>
        {/* Pliego que cubría la marca y se retira hacia abajo */}
        <Paper w={1080} h={1920} style={{ left: 0, top: 0, transform: `translateY(${lift * 1920}px) rotate(${lift * 4}deg)`, transformOrigin: "0 0" }}>
          <Caption color={C.ink} size={22} style={{ position: "absolute", left: 90, top: 260 }}>Nº 05 — Firma</Caption>
        </Paper>
        <div style={{ position: "absolute", left: 540 - 70, top: cy + lh / 2 + 70, width: 140, height: 2, background: C.white, transform: `scaleX(${ci(f, [40, 60], [0, 1], easeOut)})` }} />
        <div style={{ position: "absolute", top: cy + lh / 2 + 120, width: 1080, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MaskLine p={ci(f, [HIT.tagline, HIT.tagline + 14], [0, 1], easeOut)}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 64, letterSpacing: "-0.02em", color: C.white, textAlign: "center" }}>
              UNA <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 84 }}>DIFERENTE</span>
            </div>
          </MaskLine>
          <MaskLine p={ci(f, [HIT.tagline + 6, HIT.tagline + 20], [0, 1], easeOut)}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 64, letterSpacing: "-0.02em", color: C.white, textAlign: "center" }}>FORMA DE CREAR</div>
          </MaskLine>
        </div>
        <div style={{ position: "absolute", top: 1430, width: 1080, display: "flex", justifyContent: "center", opacity: ci(f, [HIT.web, HIT.web + 14], [0, 1]) }}>
          <div style={{ fontFamily: MONO, fontWeight: 500, fontSize: 36, letterSpacing: "0.22em", color: C.white, paddingLeft: "0.22em" }}>ORVIXSTUDIO.ES</div>
        </div>
        <div style={{ position: "absolute", left: 90, top: 280, opacity: ci(f, [HIT.web + 10, HIT.web + 30], [0, 0.55]) }}>
          <CropMarks w={900} h={1240} len={30} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.deep, opacity: ci(f, [total - 10, total - 1], [0, 1]) }} />
    </AbsoluteFill>
  );
};
