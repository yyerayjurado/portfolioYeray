import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { BlueBg } from "../../welcome/ui";
import { Glyph, Kind, MaskTitle } from "../../about/ui";
import { HITS, W, ci, easeIn, easeOut } from "../theme";

// Escena 5 · Miramos hacia delante: clímax. Todo avanza hacia el espectador y se integra.
const M = 16;
const FLY = Array.from({ length: M }).map((_, i) => ({ a: random(`va${i}`) * Math.PI * 2, d: 0.35 + random(`vd${i}`) * 0.65, k: (i % 3) as Kind, off: random(`vo${i}`) }));
const C = { x: 540, y: 700 };

export const R5Forward: React.FC = () => {
  const f = useCurrentFrame();
  const conv = ci(f, [176, 204], [0, 1], easeIn);
  const lines = ci(f, [0, 30], [0, 1], easeOut);
  return (
    <AbsoluteFill>
      <BlueBg grid={0.3} />
      <AbsoluteFill style={{ perspective: 800, opacity: 1 - conv }}>
        <div style={{ position: "absolute", left: -1080, right: -1080, top: 900, height: 1600, transform: "rotateX(70deg)", transformOrigin: "50% 0%", backgroundImage: `linear-gradient(${W.white40} 2px, transparent 2px), linear-gradient(90deg, ${W.white40} 2px, transparent 2px)`, backgroundSize: "150px 150px", backgroundPosition: `0px ${(f * 14) % 150}px`, maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)" }} />
      </AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - conv }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2 + f / 200;
          return <line key={i} x1={C.x} y1={C.y} x2={C.x + Math.cos(a) * 1200 * lines} y2={C.y + Math.sin(a) * 1200 * lines} stroke={W.white} strokeOpacity={0.35} strokeWidth={2} />;
        })}
        {[0, 1, 2].map((i) => {
          const r = ((f * 6 + i * 200) % 600) + 40;
          return <circle key={`r${i}`} cx={C.x} cy={C.y} r={r} fill="none" stroke={W.white} strokeOpacity={0.5 * (1 - r / 640)} strokeWidth={3} />;
        })}
      </svg>
      {FLY.map((m, i) => {
        const z = (f * 0.02 + m.off) % 1;
        const s = 0.2 + z * 2.4;
        const x = C.x + Math.cos(m.a) * 640 * m.d * z;
        const y = C.y + Math.sin(m.a) * 900 * m.d * z;
        const cx = x + (C.x - x) * conv;
        const cy = y + (C.y - y) * conv;
        return (
          <div key={i} style={{ position: "absolute", left: cx - 40, top: cy - 40, opacity: ci(z, [0, 0.12, 0.85, 1], [0, 1, 1, 0]) * (1 - conv), transform: `scale(${s * (1 - conv)})` }}>
            <Glyph kind={m.k} size={80} fill={i % 2 === 0} />
          </div>
        );
      })}
      {/* Módulo central que concentra la composición */}
      <div style={{ position: "absolute", left: C.x - 110, top: C.y - 110, width: 220, height: 220, borderRadius: 40, border: `6px solid ${W.white}`, transform: `rotate(${f * 1.2}deg) scale(${ci(f, [0, 20], [0.4, 1], easeOut) * (1 - conv)})` }} />
      <div style={{ position: "absolute", left: C.x - 55, top: C.y - 55, width: 110, height: 110, borderRadius: "50%", background: W.white, transform: `scale(${1 - conv + conv * 0.3})` }} />
      {/* Velo azul para que el titular destaque sobre la retícula */}
      <div style={{ position: "absolute", left: 0, top: 1080, width: 1080, height: 480, background: "radial-gradient(ellipse at 50% 50%, rgba(16,16,255,0.95) 35%, transparent 72%)", opacity: ci(f, [HITS.futuro - 10, HITS.futuro + 6], [0, 1]) * (1 - ci(f, [170, 184], [0, 1])) }} />
      <div style={{ position: "absolute", top: 1180, left: 90, width: 900, display: "flex", justifyContent: "center", opacity: 1 - ci(f, [170, 184], [0, 1]) }}>
        <MaskTitle text="EL FUTURO SE CONSTRUYE CON IDEAS" at={HITS.futuro} size={94} step={5} align="center" maxWidth={900} />
      </div>
      <AbsoluteFill style={{ background: W.white, opacity: ci(f, [200, 205, 210], [0, 0.28, 0.1]) }} />
    </AbsoluteFill>
  );
};
