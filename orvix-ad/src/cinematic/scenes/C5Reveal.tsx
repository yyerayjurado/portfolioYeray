import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LOGO_RATIO } from "../../promo/kit";
import { P, ci, easeInOut, easeOut } from "../theme";
import { Geometry } from "../ui";
import { LogoShine, TaglineBlock, useLockup } from "./Lockup";

// 00:26–00:33 · Revelación del logotipo oficial en el punto de máximo impacto.
export const C5Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLockup();
  const lw = L.revealW;
  const lh = lw / LOGO_RATIO;
  const open = ci(f, [2, 22], [50, 0], easeInOut);
  const push = 1 + ci(f, [0, 210], [0, 0.035]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ opacity: ci(f, [10, 60], [0, 0.6]), transform: `scale(${1 + f * 0.0006})` }}>
        <Geometry intensity={0.6} drift={0.1} />
      </AbsoluteFill>
      {/* Halo azul de marca, contenido */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${L.V ? "700px 420px" : "1000px 420px"} at 50% ${(L.revealY / L.H) * 100}%, rgba(4,10,222,0.45), transparent 70%)`,
          opacity: ci(f, [0, 8, 40], [0, 1, 0.7]),
        }}
      />
      <AbsoluteFill style={{ transform: `scale(${push})` }}>
        {/* Línea de luz desde la que se abre el logotipo */}
        <div
          style={{
            position: "absolute",
            left: L.W / 2 - (lw / 2 + 120),
            top: L.revealY,
            width: lw + 240,
            height: 3,
            background: P.accent,
            boxShadow: `0 0 24px ${P.accent}`,
            transform: `scaleX(${ci(f, [0, 8], [0, 1], easeOut)})`,
            opacity: ci(f, [0, 2, 26, 34], [0, 1, 1, 0]),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: (L.W - lw) / 2,
            top: L.revealY - lh / 2,
            clipPath: `inset(${open}% -5% ${open}% -5%)`,
            transform: `scale(${ci(f, [2, 40], [1.08, 1], easeOut)})`,
            filter: `blur(${ci(f, [2, 18], [6, 0])}px)`,
          }}
        >
          <LogoShine width={lw} shine={ci(f, [26, 60], [0, 1], easeInOut)} />
        </div>
        {/* Acento bajo el logotipo */}
        <div
          style={{
            position: "absolute",
            left: L.W / 2 - 60,
            top: L.revealY + lh / 2 + 36,
            width: 120,
            height: 3,
            background: P.accent,
            transform: `scaleX(${ci(f, [30, 48], [0, 1], easeInOut)})`,
          }}
        />
      </AbsoluteFill>
      <TaglineBlock top={L.revealY + lh / 2 + 80} o1={ci(f, [40, 56], [0, 1])} o2={ci(f, [72, 88], [0, 1])} ls={ci(f, [40, 90], [0.9, 0.5], easeOut)} />
    </AbsoluteFill>
  );
};
