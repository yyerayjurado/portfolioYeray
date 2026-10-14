import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, MONO, P, ci, easeInOut, easeOut } from "./theme";

// ─── Layout adaptable: la misma escena se reorganiza en 16:9 y 9:16 ───────────
export type Rect = { x: number; y: number; w: number; h: number };

export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const V = height > width;
  return {
    V,
    W: width,
    H: height,
    // Columna de texto (horizontal: izquierda · vertical: arriba, dentro de zona segura)
    text: (V ? { x: 90, y: 250, w: 900, h: 520 } : { x: 140, y: 140, w: 640, h: 800 }) as Rect,
    // Zona del visual principal
    stage: (V ? { x: 60, y: 800, w: 960, h: 720 } : { x: 820, y: 120, w: 1000, h: 840 }) as Rect,
    full: { x: 0, y: 0, w: width, h: height } as Rect,
    // Tamaños tipográficos
    hl: V ? 92 : 88,
    sub: V ? 38 : 32,
    tag: V ? 26 : 22,
  };
};

// Coloca un lienzo de diseño fijo (dw×dh) escalado y centrado dentro de un rectángulo.
export const Stage: React.FC<{
  rect: Rect;
  dw: number;
  dh: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ rect, dw, dh, children, style }) => {
  const s = Math.min(rect.w / dw, rect.h / dh);
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x + (rect.w - dw * s) / 2,
        top: rect.y + (rect.h - dh * s) / 2,
        width: dw,
        height: dh,
        transform: `scale(${s})`,
        transformOrigin: "0 0",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Fondo grafito con retícula de puntos muy sutil ────────────────────────────
export const Ground: React.FC<{ dots?: number }> = ({ dots = 1 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: P.bg }}>
      <AbsoluteFill
        style={{
          opacity: 0.5 * dots,
          backgroundImage: `radial-gradient(${P.line2} 1.2px, transparent 1.4px)`,
          backgroundSize: "48px 48px",
          backgroundPosition: `${(f * 0.2) % 48}px 0px`,
          maskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
    </AbsoluteFill>
  );
};

// ─── Tipografía ────────────────────────────────────────────────────────────────
// Titular con entrada por máscara (línea a línea) y salida opcional hacia arriba.
export const Headline: React.FC<{
  lines: (string | { t: string; accent?: boolean })[];
  at: number;
  size: number;
  stagger?: number;
  out?: number;
  align?: "left" | "center";
  weight?: number;
}> = ({ lines, at, size, stagger = 5, out, align = "left", weight = 700 }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      {lines.map((l, i) => {
        const t = typeof l === "string" ? l : l.t;
        const accent = typeof l !== "string" && l.accent;
        const s = at + i * stagger;
        const yIn = ci(f, [s, s + 18], [105, 0], easeOut);
        const yOut = out === undefined ? 0 : ci(f, [out + i * 2, out + i * 2 + 12], [0, -105], easeInOut);
        return (
          <div key={i} style={{ overflow: "hidden", padding: `0 0 ${size * 0.1}px`, margin: `0 0 ${-size * 0.06}px` }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: weight,
                fontSize: size,
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                color: accent ? P.accent : P.text,
                whiteSpace: "nowrap",
                transform: `translateY(${yIn + yOut}%)`,
              }}
            >
              {t}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; size?: number; color?: string; dot?: boolean }> = ({
  children,
  size = 22,
  color = P.muted,
  dot = true,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: size,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color,
      display: "flex",
      alignItems: "center",
      gap: size * 0.6,
      whiteSpace: "nowrap",
    }}
  >
    {dot ? <span style={{ width: size * 0.4, height: size * 0.4, borderRadius: 2, background: P.accent }} /> : null}
    {children}
  </div>
);

// Entrada simple (opacidad + desplazamiento) y salida opcional.
export const In: React.FC<{
  at: number;
  out?: number;
  dy?: number;
  dx?: number;
  dur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ at, out, dy = 24, dx = 0, dur = 14, style, children }) => {
  const f = useCurrentFrame();
  const o = ci(f, [at, at + dur * 0.8], [0, 1]) * (out === undefined ? 1 : ci(f, [out, out + 10], [1, 0]));
  return (
    <div
      style={{
        opacity: o,
        transform: `translate(${ci(f, [at, at + dur], [dx, 0])}px, ${ci(f, [at, at + dur], [dy, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Piezas de interfaz ───────────────────────────────────────────────────────
export const Window: React.FC<{
  title: string;
  w: number;
  h: number;
  light?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ title, w, h, light, children, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 14,
      overflow: "hidden",
      background: light ? P.paper : P.panel,
      border: `1px solid ${light ? "rgba(0,0,0,0.1)" : P.line2}`,
      boxShadow: "0 30px 60px rgba(0,0,0,0.45)",
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
  >
    <div
      style={{
        height: 38,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "0 14px",
        background: light ? "#E9E9E5" : P.panel2,
        borderBottom: `1px solid ${light ? "rgba(0,0,0,0.08)" : P.line}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: light ? "#C9C9C4" : "#3A3D47" }} />
      ))}
      <span
        style={{
          marginLeft: 10,
          fontFamily: MONO,
          fontSize: 14,
          color: light ? "#6B6C70" : P.muted,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {title}
      </span>
    </div>
    <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
  </div>
);

export const Line: React.FC<{ w: number | string; h?: number; c?: string; style?: React.CSSProperties }> = ({
  w,
  h = 10,
  c = P.line2,
  style,
}) => <div style={{ width: w, height: h, borderRadius: h / 2, background: c, ...style }} />;

export const Cursor: React.FC<{ x: number; y: number; o?: number; press?: number }> = ({ x, y, o = 1, press = 1 }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      left: x,
      top: y,
      opacity: o,
      transform: `scale(${press})`,
      transformOrigin: "0 0",
      filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.45))",
      zIndex: 20,
    }}
  >
    <path d="M4 2 L4 20 L9 15 L12 22 L15 21 L12 14 L19 14 Z" fill="#fff" stroke="#111" strokeWidth="1.2" />
  </svg>
);

// Logotipo oficial (PNG extraído del original, proporción 855×173).
export const LOGO_RATIO = 855 / 173;
export const Logo: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <Img src={staticFile("orvix-logo.png")} style={{ width, height: width / LOGO_RATIO, display: "block", ...style }} />
);

// Cortinilla de máscara en el azul de marca (transición entre bloques).
export const Wipe: React.FC<{ at: number; dur?: number; color?: string; dir?: "left" | "up" }> = ({
  at,
  dur = 16,
  color = P.brand,
  dir = "left",
}) => {
  const f = useCurrentFrame();
  const a = ci(f, [at, at + dur / 2], [0, 100], easeInOut);
  const b = ci(f, [at + dur / 2, at + dur], [0, 100], easeInOut);
  if (f < at || f > at + dur) return null;
  const clip = dir === "left" ? `inset(0 ${100 - a}% 0 ${b}%)` : `inset(${b}% 0 ${100 - a}% 0)`;
  return <AbsoluteFill style={{ background: color, clipPath: clip, zIndex: 50 }} />;
};
