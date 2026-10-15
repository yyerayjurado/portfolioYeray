import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueSurface, Caption, CropMarks, MaskLine, Paper } from "../materials";
import { C, FONT, HIT, SERIF, ci, easeInOut, easeOut } from "../theme";

// Escena 3 · Nuestra forma de ver: una misma composición, reencuadrada y reinterpretada,
// hasta multiplicarse en infinitas posibilidades.
type Variant = { inverted?: boolean; outline?: boolean };

// La composición maestra (1080×1920)
export const Master: React.FC<Variant & { textIn?: number }> = ({ inverted, outline, textIn = 1 }) => {
  const bg = inverted ? C.paper : C.blue;
  const fg = inverted ? C.blue : C.white;
  const stroke = (s: string): React.CSSProperties => (outline ? { color: "transparent", WebkitTextStroke: `3px ${s}` } : { color: s });
  return (
    <div style={{ position: "relative", width: 1080, height: 1920, background: bg, overflow: "hidden" }}>
      {!inverted ? <BlueSurface light={[80, 20]} /> : null}
      <Caption color={fg} size={22} style={{ position: "absolute", left: 90, top: 260 }}>Nº 03 — Forma de ver</Caption>
      <div style={{ position: "absolute", left: 90, top: 330, width: 900, height: 2, background: fg, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 86, top: 420 }}>
        <MaskLine p={textIn}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 150, letterSpacing: "-0.04em", lineHeight: 0.95, ...stroke(fg) }}>UNA</div>
        </MaskLine>
        <MaskLine p={textIn}>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 296, lineHeight: 0.95, marginLeft: -6, ...stroke(fg) }}>VISIÓN</div>
        </MaskLine>
      </div>
      {/* Plano blanco con la lectura de la idea */}
      <div style={{ position: "absolute", left: 470, top: 1060, width: 610, height: 560, background: inverted ? C.blue : C.paper }}>
        <div style={{ position: "absolute", left: 50, top: 50, width: 160, height: 160, borderRadius: "50%", border: `3px solid ${inverted ? C.white : C.blue}` }} />
        <div style={{ position: "absolute", left: 130, top: 50, width: 160, height: 160, borderRadius: "50%", background: inverted ? C.white : C.blue, mixBlendMode: inverted ? "normal" : "multiply" }} />
        <Caption color={inverted ? C.white : C.ink} size={20} style={{ position: "absolute", left: 50, bottom: 60 }}>Una idea · otra lectura</Caption>
      </div>
      <div style={{ position: "absolute", left: 90, top: 1060, width: 300, height: 2, background: fg, opacity: 0.5 }} />
      <Caption color={fg} size={20} style={{ position: "absolute", left: 90, top: 1090 }}>Encuadre</Caption>
    </div>
  );
};

// Reencuadres: escala, desplazamiento, rotación y variante (cada uno cae en un golpe)
const CROPS: { s: number; x: number; y: number; r: number; v: Variant }[] = [
  { s: 1, x: 0, y: 0, r: 0, v: {} },
  { s: 2.3, x: 180, y: 520, r: 0, v: {} },
  { s: 1.6, x: -60, y: 150, r: -90, v: { inverted: true } },
  { s: 1.25, x: 0, y: -120, r: 0, v: { outline: true } },
  { s: 1.05, x: 0, y: 0, r: 0, v: { inverted: true } },
];

export const F3Vision: React.FC = () => {
  const f = useCurrentFrame();
  const idx = HIT.crops.filter((c) => f >= c).length;
  const crop = CROPS[idx];
  const prev = CROPS[Math.max(0, idx - 1)];
  const since = idx === 0 ? 99 : f - HIT.crops[idx - 1];
  const k = ci(since, [0, 6], [0, 1], easeOut);
  const lerp = (a: number, b: number) => a + (b - a) * k;
  const grid = ci(f, [HIT.infinite - 6, HIT.infinite + 24], [0, 1], easeInOut);
  const textIn = ci(f, [0, 18], [0, 1], easeOut);
  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      {/* Reencuadres de la composición maestra */}
      <AbsoluteFill style={{ opacity: 1 - grid }}>
        <div style={{ position: "absolute", left: 0, top: 0, transformOrigin: "540px 960px", transform: `translate(${lerp(prev.x, crop.x)}px, ${lerp(prev.y, crop.y)}px) scale(${lerp(prev.s, crop.s)}) rotate(${lerp(prev.r, crop.r)}deg)` }}>
          <Master {...crop.v} textIn={textIn} />
        </div>
        {/* Visor fijo: el encuadre cambia, la mirada se mantiene */}
        <div style={{ position: "absolute", left: 90, top: 280, width: 900, height: 1240, opacity: ci(f, [HIT.crops[0] - 6, HIT.crops[0]], [0, 1]) }}>
          <CropMarks w={900} h={1240} color={idx === 2 || idx === 4 ? C.blue : C.white} len={44} />
          <Caption color={idx === 2 || idx === 4 ? C.blue : C.white} size={20} style={{ position: "absolute", right: 0, top: 1270 }}>{`Lectura 0${Math.max(1, idx)} / 04`}</Caption>
        </div>
      </AbsoluteFill>

      {/* Infinitas posibilidades: la misma pieza multiplicada en variaciones */}
      <AbsoluteFill style={{ opacity: grid }}>
        <BlueSurface light={[50, 40]} />
        <div style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${-ci(f, [HIT.infinite, 240], [0, 220])}px)` }}>
          {Array.from({ length: 4 * 5 }).map((_, i) => {
            const c = i % 4;
            const r = Math.floor(i / 4);
            const v = CROPS[(i * 3) % CROPS.length];
            const d = Math.abs(c - 1.5) + Math.abs(r - 2);
            const p = ci(f, [HIT.infinite + d * 3, HIT.infinite + d * 3 + 12], [0, 1], easeOut);
            const tw = 250;
            const th = 444;
            return (
              <div key={i} style={{ position: "absolute", left: 40 + c * (tw + 10), top: 40 + r * (th + 10), width: tw, height: th, overflow: "hidden", transform: `scale(${p})`, opacity: p, boxShadow: "0 14px 30px rgba(0,0,40,0.35)" }}>
                <div style={{ transformOrigin: "0 0", transform: `scale(${tw / 1080})` }}>
                  <div style={{ transformOrigin: "540px 960px", transform: `translate(${v.x}px, ${v.y}px) scale(${v.s}) rotate(${v.r}deg)` }}>
                    <Master {...v.v} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Banda de papel con el mensaje */}
        <div style={{ position: "absolute", left: 0, top: 780, width: 1080, height: 420, transform: `translateX(${(1 - ci(f, [HIT.infinite + 8, HIT.infinite + 24], [0, 1], easeOut)) * 1080}px)` }}>
          <Paper w={1080} h={420} style={{ left: 0, top: 0 }}>
            <Caption color={C.ink} size={20} style={{ position: "absolute", left: 90, top: 50 }}>Nº 03 / B</Caption>
            <div style={{ position: "absolute", left: 86, top: 92 }}>
              <MaskLine p={ci(f, [HIT.infinite + 18, HIT.infinite + 32], [0, 1], easeOut)}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 124, letterSpacing: "-0.04em", lineHeight: 1, color: C.ink }}>INFINITAS</div>
              </MaskLine>
              <MaskLine p={ci(f, [HIT.infinite + 24, HIT.infinite + 38], [0, 1], easeOut)}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 150, lineHeight: 1, color: C.blue, marginLeft: -4 }}>POSIBILIDADES</div>
              </MaskLine>
            </div>
          </Paper>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.blue, clipPath: `inset(${100 - ci(f, [226, 240], [0, 100], easeInOut)}% 0 0 0)` }} />
    </AbsoluteFill>
  );
};
