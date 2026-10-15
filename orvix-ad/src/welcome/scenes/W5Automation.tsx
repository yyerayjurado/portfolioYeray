import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AUTO_STEP, CUES, FONT, MONO, W, ci, easeInOut, easeOut, local, sec } from "../theme";
import { BlueBg, Chip, Shapes, Title, useV } from "../ui";

// Escena 5 · Automatización e IA: una solicitud recorre módulos conectados hasta generar una respuesta.
// Flujo ilustrativo genérico, no una integración concreta implementada.
const NODES = [
  { t: "Solicitud", s: "entra un mensaje" },
  { t: "Agente IA", s: "lee y clasifica" },
  { t: "Datos", s: "se registran" },
  { t: "Agenda", s: "propone una cita" },
  { t: "Respuesta", s: "se envía" },
];

export const W5Automation: React.FC = () => {
  const f = useCurrentFrame();
  const { V, Wd } = useV();
  const a0 = local(CUES.auto, 4);
  const step = sec(AUTO_STEP);
  const nw = V ? 300 : 250;
  const nh = 116;
  const pos = NODES.map((_, i) => (V ? { x: Wd / 2 - nw / 2 + (i % 2 ? 150 : -150), y: 740 + i * 140 } : { x: 130 + i * 340, y: 470 }));
  const at = (i: number) => a0 + i * step;
  const done = ci(f, [at(4), at(4) + 12], [0, 1], easeOut);
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.4} />
      <div style={{ position: "absolute", left: V ? 90 : 130, top: V ? 230 : 120, width: V ? 900 : 1600 }}>
        <Chip at={4}>Automatización e IA</Chip>
        <div style={{ marginTop: 24 }}>
          <Title text="Tareas más simples, procesos conectados" at={8} size={V ? 72 : 68} step={2} maxWidth={V ? 900 : 1600} />
        </div>
      </div>

      <svg width={Wd} height={V ? 1920 : 1080} style={{ position: "absolute" }}>
        {NODES.slice(0, -1).map((_, i) => {
          const A = pos[i];
          const B = pos[i + 1];
          const x1 = V ? A.x + nw / 2 : A.x + nw;
          const y1 = V ? A.y + nh : A.y + nh / 2;
          const x2 = V ? B.x + nw / 2 : B.x;
          const y2 = V ? B.y : B.y + nh / 2;
          const p = ci(f, [at(i) + 6, at(i + 1)], [0, 1], easeInOut);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={W.white40} strokeWidth={3} strokeDasharray="8 10" />
              <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={W.white} strokeWidth={4} />
              {p > 0.02 && p < 0.98 ? <circle cx={x1 + (x2 - x1) * p} cy={y1 + (y2 - y1) * p} r={10} fill={W.white} /> : null}
            </g>
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const on = ci(f, [at(i), at(i) + 8], [0, 1], easeOut);
        return (
          <div
            key={n.t}
            style={{
              position: "absolute",
              left: pos[i].x,
              top: pos[i].y,
              width: nw,
              height: nh,
              boxSizing: "border-box",
              borderRadius: 20,
              padding: "18px 22px",
              background: on > 0.5 ? W.white : "rgba(255,255,255,0.08)",
              border: `2.5px solid ${W.white}`,
              opacity: ci(f, [6 + i * 3, 16 + i * 3], [0, 1]),
              transform: `scale(${0.94 + 0.06 * on})`,
              boxShadow: on > 0.5 ? `0 0 0 ${ci(f, [at(i), at(i) + 6, at(i) + 18], [0, 12, 0])}px rgba(255,255,255,0.25), 0 24px 50px rgba(0,0,40,0.3)` : "none",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 28, color: on > 0.5 ? W.blue : W.white }}>{n.t}</span>
              <span style={{ width: 30, height: 30, borderRadius: 15, background: on > 0.5 ? W.blue : "transparent", border: `2px solid ${on > 0.5 ? W.blue : W.white40}`, color: W.white, fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT }}>{on > 0.5 ? "✓" : ""}</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 17, color: on > 0.5 ? W.navy : W.white70, marginTop: 14, whiteSpace: "nowrap" }}>{n.s}</div>
          </div>
        );
      })}

      {/* Mensaje de entrada y respuesta generada */}
      <div
        style={{
          position: "absolute",
          left: V ? 90 : 130,
          top: V ? 1530 - 150 : 660,
          width: V ? 420 : 560,
          borderRadius: 18,
          border: `2px solid ${W.white}`,
          padding: 20,
          boxSizing: "border-box",
          opacity: ci(f, [8, 18], [0, 1]) * (V ? 1 - done : 1),
          transform: `translateY(${ci(f, [8, 20], [20, 0], easeOut)}px)`,
          display: V ? "none" : "block",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 15, color: W.white70, letterSpacing: "0.1em" }}>SOLICITUD</div>
        <div style={{ fontFamily: FONT, fontSize: 24, color: W.white, marginTop: 8 }}>«Hola, me gustaría pedir información sobre vuestros servicios.»</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: V ? undefined : 130,
          left: V ? 90 : undefined,
          top: V ? 1530 - 150 : 660,
          width: V ? 900 : 560,
          borderRadius: 18,
          background: W.white,
          padding: 20,
          boxSizing: "border-box",
          opacity: done,
          transform: `translateY(${(1 - done) * 20}px)`,
          boxShadow: "0 24px 50px rgba(0,0,40,0.3)",
          display: V ? "none" : "block",
        }}
      >
        <div style={{ fontFamily: MONO, fontSize: 15, color: W.blue, letterSpacing: "0.1em" }}>RESPUESTA</div>
        <div style={{ fontFamily: FONT, fontSize: 24, color: W.navy, marginTop: 8 }}>«Gracias por escribirnos. Te proponemos una cita para conocer tu proyecto.»</div>
      </div>
      <div style={{ position: "absolute", right: V ? 90 : 130, top: V ? 1420 : 900, fontFamily: MONO, fontSize: 16, letterSpacing: "0.1em", color: W.white70, opacity: ci(f, [20, 30], [0, 1]) }}>FLUJO ILUSTRATIVO</div>
    </AbsoluteFill>
  );
};
