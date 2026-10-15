import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, ci, easeIn, easeInOut } from "../theme";
import { Backdrop, Label, RevealLines } from "../ui";

// 0–3 s · Gancho tipográfico que se abre a un entorno 3D.
export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const flyThrough = ci(f, [66, 90], [1, 5.5], easeIn);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: ci(f, [50, 80], [0, 1]) }}>
        <Backdrop grid={ci(f, [55, 90], [0, 1])} speed={3} />
      </AbsoluteFill>

      {/* Destello de impacto inicial */}
      <div
        style={{
          position: "absolute",
          top: 958,
          left: 0,
          width: 1080,
          height: 4,
          background: C.blueBright,
          boxShadow: `0 0 40px 10px ${C.blue}`,
          transform: `scaleX(${ci(f, [0, 8], [0, 1], easeInOut)}) scaleY(${ci(f, [8, 20], [1, 0])})`,
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          paddingLeft: 90,
          transform: `scale(${ci(f, [6, 66], [1.06, 1]) * flyThrough})`,
          transformOrigin: "40% 62%",
          opacity: ci(f, [74, 90], [1, 0]),
          filter: `blur(${ci(f, [72, 90], [0, 18])}px)`,
        }}
      >
        <div style={{ marginBottom: 40, opacity: ci(f, [22, 34], [0, 1]) }}>
          <Label>Orvix Studio</Label>
        </div>
        <RevealLines
          start={6}
          stagger={6}
          size={128}
          lines={[{ t: "TU NEGOCIO" }, { t: "PUEDE LLEGAR" }, { t: "MÁS LEJOS.", color: C.blueBright }]}
        />
      </AbsoluteFill>

      {/* Barrido de luz que abre la transición */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, transparent, ${C.blue} 50%, transparent)`,
          opacity: ci(f, [70, 82, 90], [0, 0.55, 0]),
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
