import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { CUES, W, ci, easeIn, easeInOut, easeOut, local } from "../theme";
import { Glyph, Kind } from "../ui";

// Escena 5 · Miramos hacia delante: avance en profundidad, trazos que se extienden y módulos que se conectan.
const M = 14;
const FLY = Array.from({ length: M }).map((_, i) => ({ a: random(`fa${i}`) * Math.PI * 2, d: 0.3 + random(`fd${i}`) * 0.7, k: (i % 3) as Kind, off: random(`fo${i}`) }));
const ROW = [560, 760, 960, 1160, 1360];

export const A5Forward: React.FC = () => {
  const f = useCurrentFrame();
  const L = (abs: number) => local(abs, 4);
  const branch = ci(f, [L(CUES.exploramos) - 4, L(CUES.exploramos) + 34], [0, 1], easeOut);
  const settle = ci(f, [L(CUES.conectar) - 6, L(CUES.conectar) + 30], [0, 1], easeInOut);
  const link = ci(f, [L(CUES.conectar) + 18, L(CUES.conectar) + 50], [0, 1], easeInOut);
  const end = ci(f, [236, 264], [0, 1], easeIn);
  const speed = 1 - settle * 0.7;
  return (
    <AbsoluteFill>
      <BlueBg grid={0.3} />
      {/* Suelo en perspectiva que avanza hacia el espectador */}
      <AbsoluteFill style={{ perspective: 700, opacity: (1 - settle * 0.6) * (1 - end) }}>
        <div style={{ position: "absolute", left: -960, right: -960, top: 540, height: 1200, transform: "rotateX(72deg)", transformOrigin: "50% 0%", backgroundImage: `linear-gradient(${W.white40} 2px, transparent 2px), linear-gradient(90deg, ${W.white40} 2px, transparent 2px)`, backgroundSize: "140px 140px", backgroundPosition: `0px ${(f * 9 * speed) % 140}px`, maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" }} />
      </AbsoluteFill>
      {/* Trazos que se extienden desde el centro */}
      <svg width={1920} height={1080} style={{ position: "absolute", opacity: 1 - end }}>
        {[-0.5, -0.25, 0, 0.25, 0.5, Math.PI - 0.25, Math.PI, Math.PI + 0.25].map((a, i) => (
          <line key={i} x1={960} y1={440} x2={960 + Math.cos(a) * 1100 * branch} y2={440 + Math.sin(a) * 700 * branch} stroke={W.white} strokeOpacity={0.5 * (1 - settle)} strokeWidth={2} />
        ))}
        {/* Conexiones del sistema final */}
        {ROW.slice(0, -1).map((x, i) => (
          <line key={`l${i}`} x1={x + 40} y1={440} x2={x + 40 + (ROW[i + 1] - x - 80) * link} y2={440} stroke={W.white} strokeWidth={3} />
        ))}
      </svg>
      {/* Módulos que vienen desde el fondo y se colocan en fila */}
      {FLY.map((m, i) => {
        const z = ((f * 0.012 * speed + m.off) % 1);
        const sc = 0.2 + z * 2.2;
        const fx = 960 + Math.cos(m.a) * 900 * m.d * z;
        const fy = 440 + Math.sin(m.a) * 520 * m.d * z;
        const target = i < ROW.length;
        const tx = target ? ROW[i] : fx;
        const ty = target ? 440 : fy;
        const x = fx + (tx - fx) * settle;
        const y = fy + (ty - fy) * settle;
        const s = target ? sc + (1 - sc) * settle : sc;
        const o = target ? 1 : (1 - settle) * ci(z, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
        return (
          <div key={i} style={{ position: "absolute", left: x - 40, top: y - 40, opacity: o * ci(f, [0, 12], [0, 1]) * (1 - end), transform: `scale(${s * (target ? 1 : 1)})` }}>
            <Glyph kind={target ? ((i % 2 ? 1 : 0) as Kind) : m.k} size={80} fill={target ? i % 2 === 0 : true} />
          </div>
        );
      })}
      <AbsoluteFill style={{ background: W.white, opacity: ci(f, [252, 258, 264], [0, 0.25, 0]) }} />
      <div style={{ position: "absolute", left: 960 - 6 * (1 - end) - 4, top: 440, width: 8 + 12 * end, height: 8 + 12 * end, borderRadius: "50%", background: W.white, transform: `scale(${ci(f, [236, 264], [0, 1], easeOut)})` }} />
    </AbsoluteFill>
  );
};
