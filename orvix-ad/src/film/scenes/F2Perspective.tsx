import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueSurface, Caption, MaskLine, Paper } from "../materials";
import { C, FONT, HIT, SERIF, ci, easeIn, easeInOut, easeOut } from "../theme";

// Escena 2 · Otra perspectiva: la composición es una tarjeta. Al girarla aparece la otra cara del mensaje.
const Front: React.FC<{ f: number }> = ({ f }) => {
  const line = (i: number) => ci(f, [4 + i * 7, 18 + i * 7], [0, 1], easeOut);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <BlueSurface light={[20, 15]} />
      {/* Banda blanca vertical: margen asimétrico */}
      <div style={{ position: "absolute", right: 0, top: 0, width: 150, height: 1920, background: C.paper, transform: `translateY(${(1 - ci(f, [0, 16], [0, 1], easeOut)) * -1920}px)` }}>
        <Caption color={C.ink} size={22} style={{ position: "absolute", left: 62, top: 1500, transform: "rotate(-90deg)", transformOrigin: "0 0" }}>Otra perspectiva — Nº 02</Caption>
      </div>
      <Caption size={22} style={{ position: "absolute", left: 90, top: 260, opacity: ci(f, [6, 16], [0, 1]) }}>Nº 02</Caption>
      <div style={{ position: "absolute", left: 90, top: 330, width: 2, height: ci(f, [4, 30], [0, 1240], easeOut), background: C.white, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 130, top: 560 }}>
        {["NO SE", "TRATA", "SOLO DE"].map((t, i) => (
          <MaskLine key={t} p={line(i)}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 172, lineHeight: 0.92, letterSpacing: "-0.045em", color: C.white }}>{t}</div>
          </MaskLine>
        ))}
        <MaskLine p={line(3)}>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 270, lineHeight: 0.95, color: C.white, marginLeft: -8 }}>CREAR.</div>
        </MaskLine>
      </div>
    </AbsoluteFill>
  );
};

const Back: React.FC<{ f: number }> = ({ f }) => {
  const at = HIT.flip + 4;
  const line = (i: number) => ci(f, [at + i * 6, at + 14 + i * 6], [0, 1], easeOut);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Paper w={1080} h={1920} shadow={0} style={{ left: 0, top: 0 }} />
      {/* Bloque azul que invade el encuadre */}
      <div style={{ position: "absolute", left: 0, bottom: 0, width: 640, height: 520, background: C.blue, transform: `translateX(${(1 - ci(f, [at - 6, at + 14], [0, 1], easeOut)) * -640}px)` }}>
        <Caption size={22} style={{ position: "absolute", left: 90, bottom: 110 }}>La otra cara — Nº 02</Caption>
      </div>
      <div style={{ position: "absolute", left: 90, top: 260 }}>
        <Caption color={C.ink} size={22}>Nº 02 / B</Caption>
      </div>
      <div style={{ position: "absolute", left: 90, top: 420 }}>
        {["SE TRATA", "DE CÓMO", "LO"].map((t, i) => (
          <MaskLine key={t} p={line(i)}>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 168, lineHeight: 0.92, letterSpacing: "-0.045em", color: C.ink }}>{t}</div>
          </MaskLine>
        ))}
        <MaskLine p={line(3)}>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 200, lineHeight: 1, color: C.blue, marginLeft: -6 }}>IMAGINAS.</div>
        </MaskLine>
      </div>
    </AbsoluteFill>
  );
};

export const F2Perspective: React.FC = () => {
  const f = useCurrentFrame();
  const t0 = HIT.flip - 12;
  const flip = ci(f, [t0, HIT.flip + 10], [0, 180], easeInOut);
  const shrink = ci(f, [t0 - 6, t0 + 8, HIT.flip + 8, HIT.flip + 26], [1, 0.78, 0.78, 1], easeInOut);
  const tilt = Math.sin((flip / 180) * Math.PI) * 6;
  const exit = ci(f, [166, 180], [0, 1], easeIn);
  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <BlueSurface light={[50, 50]} style={{ opacity: 0.7 }} />
      <AbsoluteFill style={{ perspective: 2600 }}>
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transform: `scale(${shrink * (1 + exit * 0.25)}) rotateX(${tilt}deg) rotateY(${flip}deg)`, boxShadow: shrink < 0.99 ? "0 60px 120px rgba(0,0,40,0.5)" : "none" }}>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden" }}>
            <Front f={f} />
          </div>
          <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <Back f={f} />
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.blue, opacity: exit }} />
    </AbsoluteFill>
  );
};
