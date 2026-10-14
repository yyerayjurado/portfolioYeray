import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ground, Headline, In, Stage, Tag, useLayout } from "../kit";
import { FONT, MONO, P, ci } from "../theme";

// Estructura común de cada solución: índice + titular + subtítulo + visual propio.
export const SolutionFrame: React.FC<{
  n: string;
  title: string[];
  sub: string;
  dur: number;
  dw: number;
  dh: number;
  // Lienzo alternativo para 9:16 (si la solución se recompone en vertical)
  dwV?: number;
  dhV?: number;
  children: React.ReactNode;
}> = ({ n, title, sub, dur, dw, dh, dwV, dhV, children }) => {
  const f = useCurrentFrame();
  const L = useLayout();
  const stage = L.V ? { x: 60, y: 680, w: 960, h: 860 } : { ...L.stage, x: L.stage.x - 60, w: L.stage.w + 60 };
  return (
    <AbsoluteFill>
      <Ground dots={0.6} />
      <div
        style={{
          position: "absolute",
          left: L.text.x,
          top: L.text.y,
          width: L.V ? L.text.w : L.text.w - 60,
          height: L.V ? undefined : L.text.h,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: L.V ? 26 : 32,
        }}
      >
        <In at={2} out={dur - 12}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: MONO, fontSize: L.tag, color: P.accent }}>{n}</span>
            <span style={{ width: 60, height: 1.5, background: P.line2 }} />
            <Tag size={L.tag} dot={false}>
              Soluciones
            </Tag>
          </div>
        </In>
        <Headline at={4} out={dur - 14} size={L.V ? 84 : 76} lines={title} />
        <In at={14} out={dur - 12}>
          <div style={{ fontFamily: FONT, fontSize: L.sub, color: P.muted, lineHeight: 1.35 }}>{sub}</div>
        </In>
      </div>
      <Stage rect={stage} dw={L.V ? (dwV ?? dw) : dw} dh={L.V ? (dhV ?? dh) : dh} style={{ opacity: ci(f, [0, 8], [0, 1]) * ci(f, [dur - 10, dur], [1, 0]) }}>
        {children}
      </Stage>
    </AbsoluteFill>
  );
};
