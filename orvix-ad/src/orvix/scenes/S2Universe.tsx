import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, ci, easeIn, easeInOut } from "../theme";
import { Backdrop, RevealLines } from "../ui";
import { MiniAI, MiniBrand, MiniShop, MiniWeb } from "../minis";

// 3–7 s · Sistema de piezas digitales conectadas a un núcleo.
const NODES = [
  { x: -250, y: -250, C: MiniWeb, at: 8 },
  { x: 250, y: -110, C: MiniShop, at: 14 },
  { x: -250, y: 170, C: MiniBrand, at: 20 },
  { x: 250, y: 310, C: MiniAI, at: 26 },
];
const CX = 540;
const CY = 1080;

export const S2Universe: React.FC = () => {
  const f = useCurrentFrame();
  const dive = ci(f, [96, 120], [1, 3.2], easeIn);
  return (
    <AbsoluteFill>
      <Backdrop speed={1.5} />

      <AbsoluteFill style={{ perspective: 1600 }}>
        <AbsoluteFill
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${ci(f, [0, 100], [-500, 0])}px) rotateX(${ci(f, [0, 100], [22, 10], easeInOut)}deg) rotateY(${ci(f, [0, 110], [-16, 10], easeInOut)}deg) scale(${dive})`,
            transformOrigin: `${CX - 250}px ${CY - 250}px`,
            opacity: ci(f, [108, 120], [1, 0]),
          }}
        >
          <svg width="1080" height="1920" style={{ position: "absolute" }}>
            {NODES.map((n, i) => {
              const len = Math.hypot(n.x, n.y);
              const draw = ci(f, [n.at, n.at + 22], [len, 0]);
              const pulse = ((f * 0.02 + i * 0.25) % 1) * len;
              const px = CX + (n.x * pulse) / len;
              const py = CY + (n.y * pulse) / len;
              return (
                <g key={i}>
                  <line
                    x1={CX}
                    y1={CY}
                    x2={CX + n.x}
                    y2={CY + n.y}
                    stroke={C.blueSoft}
                    strokeOpacity={0.6}
                    strokeWidth={2.5}
                    strokeDasharray={len}
                    strokeDashoffset={draw}
                  />
                  <circle cx={px} cy={py} r={6} fill={C.white} opacity={ci(f, [n.at + 22, n.at + 30], [0, 0.9])} />
                </g>
              );
            })}
            {/* Anillos orbitales del núcleo */}
            {[90, 150, 220].map((r, i) => (
              <ellipse
                key={r}
                cx={CX}
                cy={CY}
                rx={r * ci(f, [i * 4, 30 + i * 4], [0, 1])}
                ry={r * 0.36 * ci(f, [i * 4, 30 + i * 4], [0, 1])}
                fill="none"
                stroke={C.blueBright}
                strokeOpacity={0.5 - i * 0.12}
                strokeWidth={2}
                transform={`rotate(${f * (0.4 + i * 0.2) * (i % 2 ? -1 : 1)} ${CX} ${CY})`}
              />
            ))}
          </svg>
          <div
            style={{
              position: "absolute",
              left: CX - 70,
              top: CY - 70,
              width: 140,
              height: 140,
              borderRadius: 70,
              background: `radial-gradient(circle at 35% 30%, #fff, ${C.blueBright} 40%, ${C.blue} 75%)`,
              boxShadow: `0 0 120px 40px rgba(4,10,222,0.6)`,
              transform: `scale(${ci(f, [0, 20], [0, 1]) * (1 + Math.sin(f / 6) * 0.03)})`,
            }}
          />

          {NODES.map((n, i) => {
            const Comp = n.C;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: CX + n.x - 190,
                  top: CY + n.y - 135 + Math.sin((f + i * 20) / 18) * 8,
                  opacity: ci(f, [n.at + 10, n.at + 22], [0, 1]),
                  transform: `translateZ(${ci(f, [n.at + 10, n.at + 34], [300, i % 2 ? 60 : 0])}px) rotateY(${i % 2 ? -8 : 8}deg)`,
                }}
              >
                <Comp />
              </div>
            );
          })}
        </AbsoluteFill>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ paddingTop: 270, paddingLeft: 90, opacity: ci(f, [98, 112], [1, 0]) }}
      >
        <RevealLines
          start={4}
          stagger={8}
          size={92}
          lines={[{ t: "DISEÑO." }, { t: "TECNOLOGÍA." }, { t: "INTELIGENCIA.", color: C.blueBright }]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
