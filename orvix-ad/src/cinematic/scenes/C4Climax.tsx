import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../../promo/kit";
import { BrandBoard, FlowGraph, ShopPage, WebPage } from "../pieces";
import { FONT, HITS, P, ci, easeIn, easeInOut, easeOut } from "../theme";
import { Flash, Geometry } from "../ui";

// 00:18–00:26 · Clímax: las piezas se reorganizan en cada golpe y convergen en el centro.
type T = [number, number, number, number]; // x, y, escala, rotación
const SIZES = { web: [1400, 880], shop: [1400, 880], brand: [1400, 420], flow: [1570, 500] } as const;
type K = keyof typeof SIZES;
const ORDER: K[] = ["web", "shop", "brand", "flow"];

// Composiciones por fase (centro del elemento en pantalla). Cada cambio cae en un beat (30 frames).
const H_PHASES: Record<K, T>[] = [
  { web: [560, 310, 0.4, -4], shop: [1360, 310, 0.4, 4], brand: [560, 790, 0.42, 3], flow: [1360, 790, 0.36, -3] },
  { web: [760, 560, 0.62, 0], shop: [1380, 380, 0.36, -6], brand: [1460, 800, 0.34, 6], flow: [520, 880, 0.3, -4] },
  { web: [360, 540, 0.42, 0], shop: [990, 540, 0.48, 0], brand: [1610, 380, 0.3, 0], flow: [1610, 720, 0.28, 0] },
  { web: [640, 330, 0.36, 0], shop: [1280, 330, 0.36, 0], brand: [640, 760, 0.38, 0], flow: [1280, 760, 0.34, 0] },
];
const V_PHASES: Record<K, T>[] = [
  { web: [300, 640, 0.32, -4], shop: [780, 640, 0.32, 4], brand: [300, 1240, 0.32, 3], flow: [780, 1240, 0.28, -3] },
  { web: [540, 760, 0.62, 0], shop: [700, 1180, 0.36, -6], brand: [360, 1380, 0.32, 6], flow: [560, 1560, 0.3, -4] },
  { web: [540, 560, 0.56, 0], shop: [540, 1020, 0.56, 0], brand: [540, 1380, 0.5, 0], flow: [540, 1620, 0.46, 0] },
  { web: [300, 760, 0.33, 0], shop: [780, 760, 0.33, 0], brand: [300, 1160, 0.33, 0], flow: [780, 1160, 0.29, 0] },
];
const WORDS = ["DISEÑAMOS", "DESARROLLAMOS", "AUTOMATIZAMOS"];

const Piece: React.FC<{ k: K; f: number }> = ({ k, f }) =>
  k === "web" ? <WebPage f={f + 60} /> : k === "shop" ? <ShopPage f={f + 40} /> : k === "brand" ? <BrandBoard f={f + 30} /> : <FlowGraph f={f + 120} />;

export const C4Climax: React.FC = () => {
  const f = useCurrentFrame();
  const { V, W, H } = useLayout();
  const phases = V ? V_PHASES : H_PHASES;
  const conv = ci(f, [HITS.climaxConverge, HITS.climaxConverge + 16], [0, 1], easeIn);
  const wordsOn = ci(f, [HITS.climaxWords[0] - 8, HITS.climaxWords[0]], [0, 1]);
  const kick = HITS.climaxWords.reduce((a, h) => a + ci(f, [h, h + 2, h + 12], [0, 1, 0]), 0);
  return (
    <AbsoluteFill>
      <Geometry intensity={0.9} drift={1.2} />
      <Flash at={0} peak={0.35} />
      <Flash at={30} peak={0.2} />
      <Flash at={60} peak={0.2} />
      <Flash at={90} peak={0.2} />
      {HITS.climaxWords.map((h) => (
        <Flash key={h} at={h} peak={0.45} dur={16} />
      ))}

      <AbsoluteFill style={{ perspective: 2000 }}>
        {ORDER.map((k, i) => {
          // Interpolación entre fases con cortes rápidos (8 frames) en cada beat.
          let cur = phases[0][k];
          for (let p = 1; p < phases.length; p++) {
            const t = ci(f, [p * 30, p * 30 + 8], [0, 1], easeInOut);
            const prev = cur;
            const nx = phases[p][k];
            cur = [prev[0] + (nx[0] - prev[0]) * t, prev[1] + (nx[1] - prev[1]) * t, prev[2] + (nx[2] - prev[2]) * t, prev[3] + (nx[3] - prev[3]) * t] as T;
          }
          // Entrada desde profundidad con máscara
          const enter = ci(f, [i * 4, i * 4 + 22], [0, 1], easeOut);
          const [x, y, s0, r] = cur;
          const breathe = 1 + ci(f, [120, 210], [0, 0.06]) + kick * 0.02;
          const s = s0 * breathe * (1 - conv);
          const cxk = x + (W / 2 - x) * conv;
          const cyk = y + (H / 2 - y) * conv;
          const [w, h] = SIZES[k];
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: cxk - w / 2,
                top: cyk - h / 2,
                width: w,
                height: h,
                transform: `translateZ(${(1 - enter) * -1200}px) scale(${s}) rotate(${r + conv * (i % 2 ? 25 : -25)}deg)`,
                opacity: enter * (1 - ci(f, [120, 132], [0, 0.62])) * (1 - ci(f, [218, 226], [0, 1])),
                clipPath: `inset(${(1 - enter) * 50}% 0 ${(1 - enter) * 50}% 0 round 16px)`,
              }}
            >
              <Piece k={k} f={f} />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Tres palabras, una por golpe */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: wordsOn * (1 - ci(f, [HITS.climaxConverge - 4, HITS.climaxConverge + 6], [0, 1])) }}>
        {WORDS.map((w, i) => {
          const at = HITS.climaxWords[i];
          const next = HITS.climaxWords[i + 1] ?? HITS.climaxConverge;
          const vis = f >= at - 1 && f < next;
          return vis ? (
            <div key={w} style={{ position: "absolute", overflow: "hidden", padding: "0 0 12px" }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: V ? 104 : 168,
                  letterSpacing: `${ci(f, [at, at + 24], [0.08, -0.03])}em`,
                  color: i === 2 ? P.accent : P.text,
                  transform: `translateY(${ci(f, [at, at + 10], [100, 0], easeOut)}%) scale(${ci(f, [at, at + 30], [1.06, 1])})`,
                  textShadow: "0 10px 40px rgba(0,0,0,0.6)",
                }}
              >
                {w}
              </div>
            </div>
          ) : null;
        })}
      </AbsoluteFill>

      {/* Convergencia final: destello y negro, listo para revelar la marca */}
      <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9), ${P.brand} 18%, transparent 46%)`, opacity: ci(f, [HITS.climaxConverge + 10, HITS.climaxConverge + 16, HITS.climaxConverge + 26], [0, 1, 0]) }} />
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [HITS.climaxConverge + 16, 238], [0, 1]) }} />
    </AbsoluteFill>
  );
};
