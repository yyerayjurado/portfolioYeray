import React from "react";
import { useCurrentFrame } from "remotion";
import { In, useLayout } from "../kit";
import { FONT, MONO, P, SOL, ci, easeInOut } from "../theme";
import { SolutionFrame } from "./Frame";

const DW = 1200;
const DH = 760;

// Branding + marketing: especimen tipográfico, retícula, paleta y aplicaciones (tarjeta y pieza de campaña).
export const BrandSolution: React.FC = () => {
  const f = useCurrentFrame();
  const g = ci(f, [2, 30], [0, 1], easeInOut);
  const { V } = useLayout();
  // Posiciones en 16:9 (H) y recomposición en 9:16 (V)
  const pos = V
    ? { aa: { l: 30, t: 10, fs: 300 }, pal: { l: 36, t: 360 }, card: { l: 500, t: 40, w: 440, h: 270 }, ad: { l: 40, t: 560, w: 880, h: 330 } }
    : { aa: { l: 60, t: 70, fs: 380 }, pal: { l: 66, t: 520 }, card: { l: 640, t: 40, w: 520, h: 300 }, ad: { l: 700, t: 380, w: 460, h: 360 } };
  return (
    <SolutionFrame n="03" title={["Branding y", "marketing digital"]} sub="Identidad visual coherente y campañas con intención." dur={SOL.brand.dur} dw={DW} dh={DH} dwV={960} dhV={900}>
      <div style={{ position: "relative", width: DW, height: DH }}>
        {/* Retícula de construcción */}
        <svg width={600} height={V ? 540 : DH} style={{ position: "absolute", left: 0, top: 0 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`h${i}`} x1={0} x2={580 * g} y1={60 + i * 150} y2={60 + i * 150} stroke={P.line2} />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <line key={`v${i}`} y1={0} y2={DH * g} x1={20 + i * 180} x2={20 + i * 180} stroke={P.line2} />
          ))}
          <circle cx={V ? 230 : 290} cy={V ? 180 : 300} r={V ? 170 : 210} fill="none" stroke={P.accent} strokeWidth={1.5} strokeDasharray={1320} strokeDashoffset={1320 * (1 - g)} />
        </svg>
        <div
          style={{
            position: "absolute",
            left: pos.aa.l,
            top: pos.aa.t,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: pos.aa.fs,
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: P.text,
            clipPath: `inset(0 ${ci(f, [8, 30], [100, 0], easeInOut)}% 0 0)`,
          }}
        >
          Aa
        </div>
        <In at={22} style={{ position: "absolute", left: pos.pal.l, top: pos.pal.t }}>
          <div style={{ fontFamily: MONO, fontSize: 18, color: P.muted, letterSpacing: "0.1em" }}>TIPOGRAFÍA · REGULAR / BOLD</div>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            {[
              [P.brand, "#040ADE"],
              [P.text, "#F4F4F6"],
              [P.panel, "#15171D"],
            ].map(([c, hex]) => (
              <div key={hex} style={{ width: 150 }}>
                <div style={{ height: 90, borderRadius: 12, background: c, border: `1px solid ${P.line2}` }} />
                <div style={{ fontFamily: MONO, fontSize: 15, color: P.muted, marginTop: 8 }}>{hex}</div>
              </div>
            ))}
          </div>
        </In>

        {/* Aplicación: tarjeta */}
        <div
          style={{
            position: "absolute",
            left: pos.card.l,
            top: pos.card.t,
            width: pos.card.w,
            height: pos.card.h,
            borderRadius: 18,
            background: P.brand,
            padding: 34,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: ci(f, [26, 36], [0, 1]),
            transform: `translateY(${ci(f, [26, 40], [40, 0])}px) rotate(${ci(f, [26, 44], [-6, -2])}deg)`,
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 46, color: "#fff", letterSpacing: "-0.04em" }}>tu marca</div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: "#fff" }}>Nombre Apellido</div>
            <div style={{ fontFamily: MONO, fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>hola@tu-marca.demo</div>
          </div>
        </div>

        {/* Aplicación: pieza de campaña */}
        <div
          style={{
            position: "absolute",
            left: pos.ad.l,
            top: pos.ad.t,
            width: pos.ad.w,
            height: pos.ad.h,
            borderRadius: 18,
            background: P.panel,
            border: `1px solid ${P.line2}`,
            overflow: "hidden",
            opacity: ci(f, [38, 48], [0, 1]),
            transform: `translateY(${ci(f, [38, 52], [40, 0])}px)`,
            boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
            display: "flex",
          }}
        >
          <div style={{ width: V ? 320 : 200, background: P.text, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 22 }}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: P.ink, lineHeight: 1, letterSpacing: "-0.03em" }}>
              Nueva
              <br />
              temporada
            </div>
            <div style={{ marginTop: 14, height: 36, borderRadius: 18, background: P.brand }} />
          </div>
          <div style={{ flex: 1, padding: 22, display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: MONO, fontSize: 14, color: P.accent, letterSpacing: "0.1em" }}>CAMPAÑA · RENDIMIENTO</div>
            {/* Gráfica ilustrativa sin cifras */}
            <svg viewBox="0 0 220 200" style={{ flex: 1, marginTop: 10 }}>
              {[40, 90, 140, 190].map((y) => (
                <line key={y} x1={0} x2={220} y1={y} y2={y} stroke={P.line} />
              ))}
              <path
                d="M0 170 L40 150 L80 158 L120 110 L160 96 L200 50"
                fill="none"
                stroke={P.accent}
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={320}
                strokeDashoffset={ci(f, [48, 74], [320, 0], easeInOut)}
              />
            </svg>
          </div>
        </div>
      </div>
    </SolutionFrame>
  );
};
