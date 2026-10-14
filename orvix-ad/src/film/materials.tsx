import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, MONO } from "./theme";

// Grano de película sobre toda la pieza: da materia a las superficies.
export const Grain: React.FC<{ o?: number }> = ({ o = 0.07 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: o }}>
      <svg width="1080" height="1920">
        <filter id="g">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={f % 8} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

// Superficie azul con una luz suave, como un plano impreso iluminado.
export const BlueSurface: React.FC<{ light?: [number, number]; style?: React.CSSProperties }> = ({ light = [30, 20], style }) => (
  <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 80% at ${light[0]}% ${light[1]}%, ${C.light} 0%, ${C.blue} 45%, ${C.deep} 100%)`, ...style }} />
);

// Hoja de papel blanco con textura y sombra de contacto.
export const Paper: React.FC<{ w: number; h: number; style?: React.CSSProperties; children?: React.ReactNode; shadow?: number }> = ({ w, h, style, children, shadow = 1 }) => (
  <div
    style={{
      position: "absolute",
      width: w,
      height: h,
      background: `linear-gradient(160deg, #FFFFFF 0%, ${C.paper} 60%, #ECECE6 100%)`,
      boxShadow: `0 ${40 * shadow}px ${90 * shadow}px rgba(0,0,60,${0.35 * shadow}), 0 ${4 * shadow}px ${10 * shadow}px rgba(0,0,60,0.2)`,
      overflow: "hidden",
      ...style,
    }}
  >
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, opacity: 0.35, mixBlendMode: "multiply" }}>
      <filter id={`p${w}${h}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed={3} />
        <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.85  0 0 0 0 0.82  0 0 0 0.35 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#p${w}${h})`} />
    </svg>
    {children}
  </div>
);

// Marcas de corte de imprenta en las esquinas.
export const CropMarks: React.FC<{ w: number; h: number; color?: string; o?: number; len?: number }> = ({ w, h, color = C.white, o = 1, len = 34 }) => (
  <svg width={w + 2 * len} height={h + 2 * len} style={{ position: "absolute", left: -len, top: -len, opacity: o, overflow: "visible" }}>
    {[
      [len, 0, len, len * 0.7],
      [0, len, len * 0.7, len],
      [w + len, 0, w + len, len * 0.7],
      [w + len * 1.3, len, w + 2 * len, len],
      [len, h + len * 1.3, len, h + 2 * len],
      [0, h + len, len * 0.7, h + len],
      [w + len, h + len * 1.3, w + len, h + 2 * len],
      [w + len * 1.3, h + len, w + 2 * len, h + len],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />
    ))}
  </svg>
);

// Pie editorial en monoespaciada.
export const Caption: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({ children, color = C.white, size = 20, style }) => (
  <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.14em", textTransform: "uppercase", color, whiteSpace: "nowrap", ...style }}>{children}</div>
);

export const LOGO_RATIO = 855 / 173;
export const Logo: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <Img src={staticFile("orvix-logo.png")} style={{ width, height: width / LOGO_RATIO, display: "block", ...style }} />
);

// Línea de texto con máscara (entra desde abajo dentro de su propio recorte)
export const MaskLine: React.FC<{ children: React.ReactNode; p: number; out?: number; style?: React.CSSProperties }> = ({ children, p, out = 0, style }) => (
  <div style={{ overflow: "hidden", ...style }}>
    <div style={{ transform: `translateY(${(1 - p) * 105 - out * 105}%)` }}>{children}</div>
  </div>
);
