import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueSurface, Caption, CropMarks, MaskLine, Paper } from "../materials";
import { C, FONT, HIT, MONO, SERIF, ci, easeInOut, easeOut } from "../theme";

// Escena 4 · Personalidad: una serie de carteles recorrida por la cámara; el mensaje se compone y la pieza se depura.
const PW = 900;
const PH = 1400;
const GAP = 120;

const Poster1: React.FC = () => (
  <div style={{ position: "relative", width: PW, height: PH, overflow: "hidden", background: `linear-gradient(160deg, ${C.light}, ${C.blue} 50%, ${C.deep})` }}>
    <div style={{ position: "absolute", left: -30, top: 260, fontFamily: FONT, fontWeight: 700, fontSize: 520, letterSpacing: "-0.06em", lineHeight: 0.85, color: C.white }}>CRE</div>
    <div style={{ position: "absolute", left: -30, top: 700, fontFamily: SERIF, fontStyle: "italic", fontSize: 520, lineHeight: 0.85, color: C.white }}>ar</div>
    <Caption size={20} style={{ position: "absolute", left: 60, top: 60 }}>Nº 04 — Personalidad</Caption>
    <Caption size={20} style={{ position: "absolute", left: 60, bottom: 60 }}>01</Caption>
  </div>
);

const Poster2: React.FC = () => (
  <Paper w={PW} h={PH} style={{ position: "relative" }}>
    <Caption color={C.ink} size={20} style={{ position: "absolute", left: 60, top: 60 }}>Criterio · Detalle</Caption>
    <div style={{ position: "absolute", left: 60, top: 140, width: 780, height: 520, background: C.blue }} />
    {[
      ["Color", "#1010FF"],
      ["Tipografía", "Grotesk / Serif"],
      ["Ritmo", "120 BPM"],
      ["Retícula", "12 columnas"],
    ].map(([k, v], i) => (
      <div key={k} style={{ position: "absolute", left: 60, top: 720 + i * 120, width: 780, borderTop: `2px solid ${C.ink}`, paddingTop: 22, display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 26, color: C.ink, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <span>{k}</span>
        <span>{v}</span>
      </div>
    ))}
    <Caption color={C.ink} size={20} style={{ position: "absolute", left: 60, bottom: 60 }}>02</Caption>
  </Paper>
);

const Poster3: React.FC = () => (
  <div style={{ position: "relative", width: PW, height: PH, overflow: "hidden", background: C.deep }}>
    <BlueSurface light={[20, 80]} />
    <div style={{ position: "absolute", right: -40, top: 200, fontFamily: SERIF, fontStyle: "italic", fontSize: 640, lineHeight: 0.8, color: C.white }}>i.</div>
    <div style={{ position: "absolute", left: 60, bottom: 160, width: 400, height: 2, background: C.white }} />
    <Caption size={20} style={{ position: "absolute", left: 60, bottom: 100 }}>Intención</Caption>
    <Caption size={20} style={{ position: "absolute", left: 60, top: 60 }}>03</Caption>
  </div>
);

export const F4Personality: React.FC = () => {
  const f = useCurrentFrame();
  // Recorrido por la serie: cambios de cartel en cada golpe (0, 30, 60) y apertura al mensaje (90)
  const step = (a: number) => ci(f, [a - 4, a + 8], [0, 1], easeInOut);
  const pos = step(30) + step(60);
  const pull = ci(f, [HIT.message - 10, HIT.message + 18], [0, 1], easeInOut);
  const clean = ci(f, [HIT.clean - 6, HIT.clean + 20], [0, 1], easeInOut);
  const camX = pos * (PW + GAP);
  const s = 1.08 - pull * 0.5;
  const line = (i: number) => ci(f, [HIT.message + 6 + i * 6, HIT.message + 20 + i * 6], [0, 1], easeOut);
  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <BlueSurface light={[50, 50]} style={{ opacity: 0.6 }} />
      {/* Serie de carteles */}
      <AbsoluteFill style={{ opacity: 1 - clean }}>
        <div style={{ position: "absolute", left: 540, top: 960, transform: `scale(${s}) translate(${-PW / 2 - camX}px, ${-PH / 2}px) rotate(${pull * -3}deg)`, transformOrigin: "0 0" }}>
          {[<Poster1 key={1} />, <Poster2 key={2} />, <Poster3 key={3} />].map((P, i) => (
            <div key={i} style={{ position: "absolute", left: i * (PW + GAP), top: (i % 2) * 40, boxShadow: "0 50px 110px rgba(0,0,50,0.5)" }}>
              {P}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      {/* Mensaje compuesto sobre papel, que luego se depura sobre azul */}
      <div style={{ position: "absolute", left: 90 - clean * 90, top: 560 - clean * 60, transform: `rotate(${(1 - pull) * 4 * (1 - clean)}deg) scale(${0.9 + 0.1 * pull})`, opacity: pull }}>
        <div style={{ position: "relative", width: 900 + clean * 180, height: 820 + clean * 120 }}>
          <Paper w={900} h={820} shadow={1 - clean} style={{ left: 0, top: 0, opacity: 1 - clean }} />
          <div style={{ position: "absolute", left: 70 + clean * 20, top: 90 }}>
            <Caption color={clean > 0.5 ? C.white : C.ink} size={20}>Nº 04 / B</Caption>
            <div style={{ marginTop: 40 }}>
              <MaskLine p={line(0)}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 128, letterSpacing: "-0.045em", lineHeight: 0.95, color: clean > 0.5 ? C.white : C.ink }}>CREATIVIDAD</div>
              </MaskLine>
              <MaskLine p={line(1)}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 150, lineHeight: 0.95, color: clean > 0.5 ? C.white : C.blue }}>CON</div>
              </MaskLine>
              <MaskLine p={line(2)}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 128, letterSpacing: "-0.045em", lineHeight: 0.95, color: clean > 0.5 ? C.white : C.ink }}>INTENCIÓN</div>
              </MaskLine>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 90, top: 720, width: ci(f, [HIT.clean + 6, HIT.clean + 30], [0, 760], easeOut), height: 2, background: C.white }} />
        <Caption size={20} style={{ position: "absolute", left: 90, top: 750, opacity: ci(f, [HIT.clean + 18, HIT.clean + 30], [0, 1]) }}>Criterio · Detalle · Ambición</Caption>
      </div>
      {clean > 0 ? (
        <div style={{ position: "absolute", left: 90, top: 280, opacity: clean }}>
          <CropMarks w={900} h={1240} o={0.6} len={30} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
