import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, ci, easeIn, easeOut } from "../theme";
import { Backdrop, Label, RevealLines } from "../ui";
import { MiniAI, MiniBrand, MiniChart, MiniShop, MiniWeb } from "../minis";

// 20–25 s · Todas las piezas convergen en una única composición.
const W = 430;
const H = 230;
const G = 40;
const TILES = [
  { C: MiniWeb, from: [-900, -500], to: [0, 0] },
  { C: MiniShop, from: [900, -700], to: [1, 0] },
  { C: MiniBrand, from: [-1000, 300], to: [0, 1] },
  { C: MiniChart, from: [1000, 400], to: [1, 1] },
  { C: MiniAI, from: [0, 1200], to: [0, 2] },
];

export const S5Converge: React.FC = () => {
  const f = useCurrentFrame();
  const collapse = ci(f, [118, 140], [1, 0], easeIn);
  const gridW = W * 2 + G;
  const left = (1080 - gridW) / 2;
  const top = 640;
  return (
    <AbsoluteFill>
      <Backdrop glow={1.2} />

      <AbsoluteFill style={{ paddingTop: 250, paddingLeft: 90, opacity: ci(f, [112, 124], [1, 0]) }}>
        <RevealLines
          start={4}
          stagger={6}
          size={76}
          lines={[{ t: "TODO LO QUE" }, { t: "TU MARCA NECESITA." }, { t: "EN UN MISMO EQUIPO.", color: C.blueBright }]}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          transform: `scale(${collapse}) rotate(${ci(f, [118, 140], [0, -8], easeIn)}deg)`,
          transformOrigin: "540px 1025px",
          perspective: 1800,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `rotateX(${ci(f, [0, 70], [24, 0])}deg) rotateY(${ci(f, [0, 70], [-14, 0])}deg)`,
            transformOrigin: "540px 1025px",
          }}
        >
          {/* Marco de precisión que encaja todo */}
          <div
            style={{
              position: "absolute",
              left: left - 24,
              top: top - 24,
              width: gridW + 48,
              height: H * 3 + G * 2 + 48,
              border: `2px solid ${C.blueBright}`,
              borderRadius: 40,
              opacity: ci(f, [50, 62], [0, 1]),
              transform: `scale(${ci(f, [50, 66], [1.12, 1])})`,
              boxShadow: `0 0 80px rgba(4,10,222,0.5)`,
            }}
          />
          {TILES.map((t, i) => {
            const at = 4 + i * 5;
            const p = ci(f, [at, at + 30], [0, 1], easeOut);
            const [cx, cy] = t.to;
            const isWide = i === 4;
            const tx = left + cx * (W + G);
            const ty = top + cy * (H + G);
            const Comp = t.C;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: tx,
                  top: ty,
                  opacity: ci(f, [at, at + 10], [0, 1]),
                  transform: `translate(${(1 - p) * t.from[0]}px, ${(1 - p) * t.from[1]}px) translateZ(${(1 - p) * 400}px) rotate(${(1 - p) * (i % 2 ? 20 : -20)}deg)`,
                }}
              >
                <Comp w={isWide ? gridW : W} h={H} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <div style={{ position: "absolute", left: 90, top: 1480, opacity: ci(f, [60, 72], [0, 1]) * collapse }}>
        <Label size={22}>Diseño · Desarrollo · Marketing · IA</Label>
      </div>

      {/* Punto de luz que se expande hacia el cierre */}
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 1025,
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: "50%",
          background: C.blue,
          transform: `scale(${ci(f, [128, 150], [0, 460], easeIn)})`,
        }}
      />
    </AbsoluteFill>
  );
};
