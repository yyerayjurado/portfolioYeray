import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { LOGO_RATIO, useLayout } from "../../promo/kit";
import { FONT, P } from "../theme";

// Posición y tamaño del logotipo compartidos por la revelación (S5) y el cierre (S6),
// para que el paso de una escena a otra sea continuo.
export const useLockup = () => {
  const { V, W, H } = useLayout();
  return {
    V,
    W,
    H,
    revealW: V ? 760 : 900,
    revealY: V ? 820 : 460,
    closeW: V ? 640 : 700,
    closeY: V ? 700 : 340,
  };
};

// Logotipo oficial con un barrido de luz recortado a su silueta (mask-image con el propio PNG).
export const LogoShine: React.FC<{ width: number; shine: number; style?: React.CSSProperties }> = ({ width, shine, style }) => {
  const h = width / LOGO_RATIO;
  const src = staticFile("orvix-logo.png");
  return (
    <div style={{ position: "relative", width, height: h, ...style }}>
      <Img src={src} style={{ width, height: h, display: "block" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg, transparent ${shine * 140 - 40}%, rgba(122,132,255,0.95) ${shine * 140 - 25}%, transparent ${shine * 140 - 10}%)`,
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </div>
  );
};

export const TaglineBlock: React.FC<{ top: number; o1: number; o2: number; ls: number }> = ({ top, o1, o2, ls }) => {
  const { V, W } = useLayout();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top, width: W, textAlign: "center", opacity: o1 }}>
        <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: V ? 40 : 38, letterSpacing: `${ls}em`, paddingLeft: `${ls}em`, color: P.text }}>ORVIX STUDIO</div>
      </div>
      <div style={{ position: "absolute", top: top + (V ? 80 : 74), width: W, display: "flex", justifyContent: "center", opacity: o2 }}>
        <div style={{ fontFamily: FONT, fontSize: V ? 34 : 30, letterSpacing: "0.14em", color: P.muted, textAlign: "center", maxWidth: V ? 860 : 1600, lineHeight: 1.4 }}>
          SOLUCIONES DIGITALES PARA NEGOCIOS QUE AVANZAN
        </div>
      </div>
    </AbsoluteFill>
  );
};
