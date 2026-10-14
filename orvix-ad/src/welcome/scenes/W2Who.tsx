import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CUES, FONT, MONO, W, ci, easeInOut, easeOut, local } from "../theme";
import { BlueBg, Chip, Shapes, Title, useV } from "../ui";

// Escena 2 · Quiénes somos: un estudio que une creatividad, diseño y tecnología.
const Module: React.FC<{ kind: 0 | 1 | 2; on: number }> = ({ kind, on }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        width: 220,
        height: 220,
        borderRadius: 28,
        background: on > 0.5 ? W.white : "transparent",
        border: `2.5px solid ${W.white}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${0.85 + 0.15 * on})`,
        opacity: 0.35 + 0.65 * on,
        boxShadow: on > 0.5 ? "0 30px 60px rgba(0,0,40,0.35)" : "none",
      }}
    >
      <svg width={140} height={140} viewBox="0 0 140 140">
        {kind === 0 ? (
          <>
            <circle cx={70} cy={70} r={50} fill="none" stroke={W.blue} strokeWidth={6} />
            <circle cx={70} cy={70} r={22} fill={W.blue} transform={`translate(${Math.sin(f / 12) * 6} ${Math.cos(f / 12) * 6})`} />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1={70} y1={6} x2={70} y2={16} stroke={W.blue} strokeWidth={6} strokeLinecap="round" transform={`rotate(${i * 90 + 45} 70 70)`} />
            ))}
          </>
        ) : kind === 1 ? (
          <>
            <rect x={14} y={14} width={112} height={112} rx={12} fill="none" stroke={W.blue} strokeWidth={6} />
            <rect x={28} y={30} width={50} height={12} rx={6} fill={W.blue} />
            <rect x={28} y={52} width={84} height={30} rx={8} fill={W.blue} opacity={0.35} />
            <rect x={28} y={92} width={36} height={20} rx={8} fill={W.blue} />
          </>
        ) : (
          <>
            <line x1={30} y1={100} x2={70} y2={36} stroke={W.blue} strokeWidth={5} />
            <line x1={70} y1={36} x2={112} y2={100} stroke={W.blue} strokeWidth={5} />
            <line x1={30} y1={100} x2={112} y2={100} stroke={W.blue} strokeWidth={5} />
            {[
              [30, 100],
              [70, 36],
              [112, 100],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={14} fill={W.blue} />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

const WORDS = [
  { t: "CREATIVIDAD", cue: () => CUES.creatividad },
  { t: "DISEÑO", cue: () => CUES.diseno },
  { t: "TECNOLOGÍA", cue: () => CUES.tecnologia },
];

export const W2Who: React.FC = () => {
  const f = useCurrentFrame();
  const { V, Wd } = useV();
  const sol = local(CUES.soluciones, 1);
  const join = ci(f, [sol, sol + 24], [0, 1], easeInOut);
  // Posiciones de los tres módulos y de la tarjeta central de «solución»
  const cx = V ? Wd / 2 : 1380;
  const cy = V ? 1020 : 470;
  const R = V ? 300 : 330;
  const pos = [
    [cx - R, cy - 150],
    [cx, cy - 250],
    [cx + R, cy - 150],
  ].map(([x, y]) => [x, y + join * 30]);
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.6} />
      <div style={{ position: "absolute", left: V ? 90 : 130, top: V ? 230 : 190, width: V ? 900 : 700 }}>
        <Chip at={4}>Quiénes somos</Chip>
        <div style={{ marginTop: 28 }}>
          <Title text="ORVIX STUDIO" at={6} size={V ? 104 : 112} step={4} />
        </div>
        <div style={{ marginTop: 26, display: "flex", flexDirection: V ? "row" : "column", flexWrap: "wrap", gap: V ? 22 : 10 }}>
          {WORDS.map((w) => {
            const at = local(w.cue(), 1) - 2;
            return (
              <div key={w.t} style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 500,
                    fontSize: V ? 46 : 54,
                    letterSpacing: "0.04em",
                    color: W.white,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    transform: `translateY(${ci(f, [at, at + 10], [110, 0], easeOut)}%)`,
                  }}
                >
                  <span style={{ width: 26, height: 4, background: W.white, display: V ? "none" : "block" }} />
                  {w.t}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disciplinas que se conectan en una solución */}
      <svg width={Wd} height={V ? 1920 : 1080} style={{ position: "absolute" }}>
        {pos.map(([x, y], i) => (
          <line key={i} x1={x} y1={y + 110} x2={cx} y2={cy + 150} stroke={W.white} strokeWidth={3} strokeDasharray={600} strokeDashoffset={600 * (1 - join)} />
        ))}
      </svg>
      {pos.map(([x, y], i) => {
        const at = local(WORDS[i].cue(), 1) - 2;
        return (
          <div key={i} style={{ position: "absolute", left: x - 110, top: y - 110 + ci(f, [0, 20], [40, 0]), opacity: ci(f, [4 + i * 4, 16 + i * 4], [0, 1]) }}>
            <Module kind={i as 0 | 1 | 2} on={ci(f, [at, at + 8], [0, 1], easeOut)} />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: cx - 230,
          top: cy + 150,
          width: 460,
          height: 150,
          borderRadius: 24,
          background: W.white,
          boxShadow: "0 30px 60px rgba(0,0,40,0.35)",
          opacity: join,
          transform: `translateY(${(1 - join) * 30}px) scale(${0.9 + 0.1 * join})`,
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "0 30px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: 70, height: 70, borderRadius: 18, background: W.blue, display: "flex", alignItems: "center", justifyContent: "center", color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 36 }}>✓</div>
        <div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: W.blue }}>Solución digital</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: W.navy, opacity: 0.7, marginTop: 6 }}>empresas · emprendedores</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
