import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../../promo/kit";
import { HITS, P, ci, easeIn, easeInOut } from "../theme";
import { Geometry, Words } from "../ui";

// 00:00–00:05 · Oscuridad, geometría precisa y «TODO EMPIEZA CON UNA IDEA».
export const C1Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { V, W, H } = useLayout();
  const cx = W / 2;
  const cy = H / 2;
  const out = ci(f, [HITS.introOut, 150], [0, 1], easeIn);
  const marks = [
    [-0.32, -0.3],
    [0.3, -0.26],
    [-0.36, 0.28],
    [0.34, 0.32],
    [0.05, -0.38],
    [-0.08, 0.4],
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: ci(f, [0, 60], [0, 1]) * (1 - out) }}>
        <Geometry intensity={0.8} drift={0.15} />
      </AbsoluteFill>

      <AbsoluteFill style={{ transform: `scale(${1 + out * 0.9})`, opacity: 1 - ci(f, [132, 148], [0, 1]) }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          {/* Líneas de precisión que se trazan lentamente */}
          <line x1={0} x2={W * ci(f, [6, 70], [0, 1], easeInOut)} y1={cy - (V ? 420 : 230)} y2={cy - (V ? 420 : 230)} stroke={P.line2} />
          <line x1={W} x2={W - W * ci(f, [14, 78], [0, 1], easeInOut)} y1={cy + (V ? 420 : 230)} y2={cy + (V ? 420 : 230)} stroke={P.line2} />
          <line y1={0} y2={H * ci(f, [10, 74], [0, 1], easeInOut)} x1={cx - (V ? 380 : 700)} x2={cx - (V ? 380 : 700)} stroke={P.line} />
          <line y1={H} y2={H - H * ci(f, [18, 82], [0, 1], easeInOut)} x1={cx + (V ? 380 : 700)} x2={cx + (V ? 380 : 700)} stroke={P.line} />
          {marks.map(([mx, my], i) => {
            const x = cx + mx * W;
            const y = cy + my * H;
            const o = ci(f, [12 + i * 6, 24 + i * 6], [0, 0.8]);
            return (
              <g key={i} opacity={o}>
                <line x1={x - 9} x2={x + 9} y1={y} y2={y} stroke={P.text} strokeWidth={1.5} />
                <line x1={x} x2={x} y1={y - 9} y2={y + 9} stroke={P.text} strokeWidth={1.5} />
              </g>
            );
          })}
          {/* Marco geométrico que gira lentamente */}
          <g transform={`rotate(${45 + f * 0.25} ${cx} ${cy})`} opacity={ci(f, [20, 50], [0, 0.5]) * (1 - ci(f, [56, 70], [0, 0.6]))}>
            <rect x={cx - 160} y={cy - 160} width={320} height={320} fill="none" stroke={P.accent} strokeWidth={1.5} />
          </g>
          <circle cx={cx} cy={cy} r={ci(f, [26, 60], [0, 230], easeInOut)} fill="none" stroke={P.line2} />
        </svg>
        {/* El punto de partida: la idea */}
        <div
          style={{
            position: "absolute",
            left: cx - 8,
            top: cy - 8,
            width: 16,
            height: 16,
            borderRadius: 8,
            background: P.accent,
            boxShadow: `0 0 ${30 + Math.sin(f / 6) * 10}px ${P.accent}`,
            transform: `scale(${ci(f, [30, 40], [0, 1]) * (1 - ci(f, [56, 62], [0, 1]))})`,
          }}
        />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: V ? "0 90px" : "0 160px" }}>
          <Words text="TODO EMPIEZA CON UNA IDEA" at={HITS.introText} step={8} size={V ? 112 : 124} accent={["IDEA"]} align="center" maxWidth={V ? 900 : 1600} />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Transición rápida: el punto de marca se expande a pantalla completa */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: "50%",
          background: P.brand,
          transform: `scale(${ci(f, [134, 147], [0, V ? 440 : 460], easeIn)})`,
          opacity: ci(f, [134, 136], [0, 1]),
        }}
      />
    </AbsoluteFill>
  );
};
