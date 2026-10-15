import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CUES, W, ci, easeInOut, easeOut, local } from "../theme";
import { BlueBg, Logo, LOGO_RATIO, Shapes, useV } from "../ui";

// Escena 1 · Bienvenida: logotipo blanco sobre azul eléctrico y el «mundo digital».
export const W1Welcome: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { V, Wd, Ht } = useV();
  const move = local(CUES.presence, 0);
  const m = ci(f, [move - 8, move + 22], [0, 1], easeInOut);
  const w0 = V ? 820 : 980;
  const w1 = V ? 540 : 520;
  const lw = w0 + (w1 - w0) * m;
  const cy = (V ? 860 : 470) + ((V ? 520 : 230) - (V ? 860 : 470)) * m;
  const s = spring({ frame: f - 9, fps, config: { damping: 200 } });
  const reveal = ci(f, [9, 34], [50, 0], easeInOut);
  const drawn = ci(f, [move + 10, move + 50], [0, 1], easeInOut);
  const gx = V ? Wd / 2 : Wd / 2 - 330;
  const gy = V ? 900 : 640;
  const bx = V ? Wd / 2 - 300 : Wd / 2 + 60;
  const by = V ? 1110 : 500;
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={ci(f, [20, 50], [0, 1])} />
      {/* Halo de luz detrás del logotipo */}
      <div
        style={{
          position: "absolute",
          left: Wd / 2 - lw,
          top: cy - lw * 0.5,
          width: lw * 2,
          height: lw,
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.28), transparent 65%)",
          opacity: ci(f, [9, 30, 90], [0, 1, 0.5]),
        }}
      />
      <div style={{ position: "absolute", left: (Wd - lw) / 2, top: cy - lw / LOGO_RATIO / 2, clipPath: `inset(0 ${reveal}% 0 ${reveal}%)`, transform: `scale(${0.92 + 0.08 * s})` }}>
        <Logo width={lw} />
      </div>

      {/* El mundo digital: globo de líneas y una web que se construye */}
      <svg width={Wd} height={Ht} style={{ position: "absolute", opacity: drawn }}>
        <g transform={`translate(${gx} ${gy})`}>
          <circle r={150} fill="none" stroke={W.white} strokeWidth={2.5} strokeDasharray={942} strokeDashoffset={942 * (1 - drawn)} />
          {[0.35, 0.7, 1].map((k, i) => (
            <ellipse key={i} rx={150 * k * Math.abs(Math.cos((f / 40 + i) % Math.PI))} ry={150} fill="none" stroke={W.white40} strokeWidth={1.5} />
          ))}
          {[-75, 0, 75].map((y) => (
            <ellipse key={y} cy={y} rx={Math.sqrt(150 * 150 - y * y)} ry={14} fill="none" stroke={W.white40} strokeWidth={1.5} />
          ))}
          <circle cx={150 * Math.cos(f / 25)} cy={60 * Math.sin(f / 25)} r={9} fill={W.white} />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: bx,
          top: by,
          width: 600,
          height: 290,
          borderRadius: 18,
          border: `2.5px solid ${W.white}`,
          opacity: drawn,
          clipPath: `inset(0 ${100 - ci(f, [move + 14, move + 44], [0, 100], easeOut)}% 0 0 round 18px)`,
          overflow: "hidden",
        }}
      >
        <div style={{ height: 36, borderBottom: `2px solid ${W.white40}`, display: "flex", alignItems: "center", gap: 8, paddingLeft: 16 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: W.white40 }} />
          ))}
        </div>
        <div style={{ padding: 22, display: "flex", gap: 20 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
            {[0.9, 0.7, 0.5].map((w, i) => (
              <div key={i} style={{ height: i === 0 ? 22 : 12, width: `${w * 100}%`, borderRadius: 8, background: W.white, opacity: ci(f, [move + 30 + i * 4, move + 40 + i * 4], [0, i === 0 ? 1 : 0.55]) }} />
            ))}
            <div style={{ marginTop: 8, width: 140, height: 40, borderRadius: 20, background: W.white, opacity: ci(f, [move + 44, move + 52], [0, 1]) }} />
          </div>
          <div style={{ width: 200, height: 190, borderRadius: 14, background: W.white15, transform: `scale(${ci(f, [move + 36, move + 50], [0.8, 1], easeOut)})`, opacity: ci(f, [move + 36, move + 44], [0, 1]) }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
