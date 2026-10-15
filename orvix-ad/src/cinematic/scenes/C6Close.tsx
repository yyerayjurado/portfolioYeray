import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LOGO_RATIO } from "../../promo/kit";
import { MONO, P, ci, easeInOut, easeOut } from "../theme";
import { Words } from "../ui";
import { LogoShine, TaglineBlock, useLockup } from "./Lockup";

// 00:33–00:40 · Cierre comercial: menos elementos, mensaje final y dirección web.
export const C6Close: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLockup();
  const m = ci(f, [8, 44], [0, 1], easeInOut); // el logotipo sube y se reduce
  const lw = L.revealW + (L.closeW - L.revealW) * m;
  const lh = lw / LOGO_RATIO;
  const y = L.revealY + (L.closeY - L.revealY) * m;
  const revealLh = L.revealW / LOGO_RATIO;
  const push = 1.035; // continúa el último encuadre de la revelación
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${L.V ? "700px 420px" : "1000px 420px"} at 50% ${(y / L.H) * 100}%, rgba(4,10,222,0.45), transparent 70%)`,
          opacity: ci(f, [0, 40], [0.7, 0.35]),
        }}
      />
      <AbsoluteFill style={{ transform: `scale(${push - 0.035 * m})` }}>
        <div style={{ position: "absolute", left: (L.W - lw) / 2, top: y - lh / 2 }}>
          <LogoShine width={lw} shine={ci(f, [150, 186], [0, 1], easeInOut)} />
        </div>
      </AbsoluteFill>
      {/* Los textos de la revelación se retiran para simplificar la composición */}
      <AbsoluteFill style={{ transform: `scale(${push})`, opacity: 1 - ci(f, [0, 14], [0, 1]) }}>
        <TaglineBlock top={L.revealY + revealLh / 2 + 80} o1={1} o2={1} ls={0.5} />
      </AbsoluteFill>

      <div style={{ position: "absolute", top: L.V ? 960 : 600, width: L.W, display: "flex", justifyContent: "center", padding: L.V ? "0 90px" : 0, boxSizing: "border-box" }}>
        <Words text="TU PRÓXIMA IDEA EMPIEZA AQUÍ" at={36} step={5} size={L.V ? 88 : 80} align="center" accent={["AQUÍ"]} maxWidth={L.V ? 900 : 1700} />
      </div>
      <div style={{ position: "absolute", top: L.V ? 1270 : 770, width: L.W, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: L.V ? 50 : 44,
            color: P.text,
            letterSpacing: "0.04em",
            opacity: ci(f, [64, 76], [0, 1]),
            transform: `translateY(${ci(f, [64, 80], [20, 0], easeOut)}px)`,
          }}
        >
          orvixstudio.es
        </div>
        <div style={{ width: L.V ? 380 : 340, height: 2, background: P.accent, transform: `scaleX(${ci(f, [72, 96], [0, 1], easeInOut)})` }} />
      </div>
      {/* Transición limpia a negro con el final del audio */}
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [194, 209], [0, 1]) }} />
    </AbsoluteFill>
  );
};
