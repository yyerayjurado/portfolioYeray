import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneSite } from "../../promo/solutions/Web";
import { Brand } from "../../welcome/scenes/W4BrandMkt3D";
import { BlueBg, Title } from "../../welcome/ui";
import { FONT, MONO, W, ci, easeIn, easeOut } from "../theme";
import { PhoneShop } from "./PhoneShop";

// Escena 6 · Filosofía: los elementos anteriores se reúnen en una composición coherente.
const FlowMini: React.FC = () => (
  <div style={{ width: 560, height: 560, borderRadius: 40, background: W.white, padding: 40, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 22, justifyContent: "center" }}>
    {["Responder", "Registrar", "Agendar", "Archivar"].map((t) => (
      <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, height: 80, borderRadius: 18, border: `3px solid ${W.blue}`, padding: "0 24px" }}>
        <span style={{ width: 36, height: 36, borderRadius: 18, background: W.blue, color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</span>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: W.navy }}>{t}</span>
      </div>
    ))}
  </div>
);

export const P6Philosophy: React.FC = () => {
  const f = useCurrentFrame();
  const out = ci(f, [136, 150], [0, 1], easeIn);
  const tiles = [
    { el: <PhoneSite scroll={200} />, w: 560, h: 860, s: 0.38, x: 300, y: 790 },
    { el: <PhoneShop click={-100} />, w: 560, h: 860, s: 0.38, x: 780, y: 790 },
    { el: <Brand f={200} />, w: 1000, h: 640, s: 0.36, x: 300, y: 1160 },
    { el: <FlowMini />, w: 560, h: 560, s: 0.4, x: 780, y: 1160 },
  ];
  return (
    <AbsoluteFill>
      <BlueBg />
      <AbsoluteFill style={{ opacity: 1 - out, transform: `scale(${1 - out * 0.08})` }}>
        <div style={{ position: "absolute", top: 260, left: 90, width: 900, display: "flex", justifyContent: "center" }}>
          <Title text="DISEÑO, TECNOLOGÍA E INNOVACIÓN" at={30} size={84} step={4} align="center" maxWidth={900} />
        </div>
        {/* Marco común que reúne las piezas */}
        <div style={{ position: "absolute", left: 90, top: 600, width: 900, height: 760, borderRadius: 40, border: `3px solid ${W.white}`, opacity: ci(f, [16, 30], [0, 1]), transform: `scale(${ci(f, [16, 34], [1.08, 1], easeOut)})` }} />
        {tiles.map((t, i) => {
          const p = ci(f, [i * 4, 20 + i * 4], [0, 1], easeOut);
          const fromX = [-500, 500, -500, 500][i];
          return (
            <div key={i} style={{ position: "absolute", left: t.x - (t.w * t.s) / 2 + (1 - p) * fromX, top: t.y - (t.h * t.s) / 2, width: t.w, height: t.h, transformOrigin: "0 0", transform: `scale(${t.s})`, opacity: p }}>
              {t.el}
            </div>
          );
        })}
        <div style={{ position: "absolute", top: 1400, width: 1080, textAlign: "center", fontFamily: MONO, fontSize: 28, letterSpacing: "0.1em", color: W.white, lineHeight: 1.45, opacity: ci(f, [60, 74], [0, 1]), transform: `translateY(${ci(f, [60, 76], [20, 0], easeOut)}px)` }}>
          SOLUCIONES DIGITALES
          <br />
          PENSADAS PARA TU NEGOCIO
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
