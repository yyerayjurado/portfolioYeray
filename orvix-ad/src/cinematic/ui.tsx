import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FONT, P, ci, easeInOut, easeOut } from "./theme";

// Titular en mayúsculas que entra palabra a palabra con máscara (cada palabra en su golpe).
export const Words: React.FC<{
  text: string;
  at: number;
  step?: number; // frames entre palabras
  size: number;
  out?: number;
  accent?: string[]; // palabras resaltadas en el color de marca
  align?: "left" | "center";
  maxWidth?: number;
  weight?: number;
  color?: string;
}> = ({ text, at, step = 4, size, out, accent = [], align = "left", maxWidth, weight = 700, color = P.text }) => {
  const f = useCurrentFrame();
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        columnGap: size * 0.26,
        maxWidth,
      }}
    >
      {words.map((w, i) => {
        const s = at + i * step;
        const yIn = ci(f, [s, s + 14], [110, 0], easeOut);
        const yOut = out === undefined ? 0 : ci(f, [out + i * 1.5, out + i * 1.5 + 10], [0, -110], easeInOut);
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: size * 0.06 }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: weight,
                fontSize: size,
                lineHeight: 1,
                letterSpacing: `${ci(f, [s, s + 20], [0.04, -0.02])}em`,
                color: accent.includes(w) ? P.accent : color,
                transform: `translateY(${yIn + yOut}%)`,
                whiteSpace: "nowrap",
              }}
            >
              {w}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Cámara simulada: centra el punto (x, y) del lienzo en (cx, cy) de la pantalla con escala s.
export const Camera: React.FC<{
  x: number;
  y: number;
  s: number;
  cx: number;
  cy: number;
  rotY?: number;
  rotX?: number;
  children: React.ReactNode;
}> = ({ x, y, s, cx, cy, rotY = 0, rotX = 0, children }) => (
  <AbsoluteFill style={{ perspective: 2200, overflow: "hidden" }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transformOrigin: "0 0",
        transform: `translate(${cx}px, ${cy}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${s}) translate(${-x}px, ${-y}px)`,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

// Interpola una lista de claves {f, ...valores} de cámara.
export const keys = (f: number, ks: { f: number; x: number; y: number; s: number }[]) => {
  const fr = ks.map((k) => k.f);
  const pick = (k: "x" | "y" | "s") => ci(f, fr, ks.map((q) => q[k]), easeInOut);
  return { x: pick("x"), y: pick("y"), s: pick("s") };
};

// Fondo negro/grafito con geometría mínima: retícula de cruces y líneas de precisión.
export const Geometry: React.FC<{ intensity?: number; drift?: number }> = ({ intensity = 1, drift = 0.3 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: P.bg }}>
      <AbsoluteFill
        style={{
          opacity: 0.55 * intensity,
          backgroundImage: `linear-gradient(${P.line} 1px, transparent 1px), linear-gradient(90deg, ${P.line} 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: `${(f * drift) % 120}px ${(f * drift * 0.5) % 120}px`,
          maskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 70%)",
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
    </AbsoluteFill>
  );
};

// Destello en el color de marca para acentuar golpes de percusión.
export const Flash: React.FC<{ at: number; peak?: number; dur?: number }> = ({ at, peak = 0.25, dur = 12 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(4,10,222,${peak}), transparent 70%)`,
        opacity: ci(f, [at, at + 2, at + dur], [0, 1, 0]),
        pointerEvents: "none",
      }}
    />
  );
};
