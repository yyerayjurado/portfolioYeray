import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ground, Headline, In, Stage, Tag, useLayout } from "../kit";
import { P, ci } from "../theme";
import { WS_H, WS_W, Workspace } from "./Workspace";

// 5–12 s · El problema: herramientas dispersas, procesos manuales y tareas repetitivas.
const PAINS = ["Procesos manuales", "Herramientas desconectadas", "Tareas repetitivas", "Oportunidades que se escapan"];

export const P2Problem: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  return (
    <AbsoluteFill>
      <Ground />
      <Stage rect={L.stage} dw={WS_W} dh={WS_H} style={{ opacity: ci(f, [196, 210], [1, 0.9]) }}>
        <Workspace appear={4} order={0} node={0} manual={1} />
      </Stage>

      <div
        style={{
          position: "absolute",
          left: L.text.x,
          top: L.text.y,
          width: L.text.w,
          height: L.V ? undefined : L.text.h,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: L.V ? 34 : 44,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: L.V ? 14 : 16 }}>
          {PAINS.map((p, i) => (
            <In key={p} at={20 + i * 15} out={186} dx={-20} dy={0}>
              <Tag size={L.tag}>{p}</Tag>
            </In>
          ))}
        </div>
        <Headline
          at={100}
          out={188}
          size={L.hl}
          stagger={6}
          lines={L.V ? ["Tu negocio", "puede llegar", { t: "más lejos.", accent: true }] : ["Tu negocio", "puede llegar", { t: "más lejos.", accent: true }]}
        />
      </div>
      <AbsoluteFill style={{ background: P.bg, opacity: ci(f, [200, 210], [0, 0.25]) }} />
    </AbsoluteFill>
  );
};
