import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg, Chip, Title } from "../../welcome/ui";
import { FONT, MONO, W, ci, easeInOut, easeOut } from "../theme";

// Escena 5 · Automatización con IA: tareas dispersas entran en un flujo y salen organizadas.
const TASKS = [
  { t: "Correo de cliente", s: "Responder" },
  { t: "Nuevo pedido", s: "Registrar" },
  { t: "Solicitud de cita", s: "Agendar" },
  { t: "Factura", s: "Archivar" },
];
const SCATTER = [
  [120, 720, -8],
  [560, 680, 6],
  [200, 1000, 5],
  [600, 960, -6],
];
const HUB = { x: 540, y: 960 };

export const P5Auto: React.FC = () => {
  const f = useCurrentFrame();
  const hubOn = ci(f, [30, 46], [0, 1], easeOut);
  return (
    <AbsoluteFill>
      <BlueBg />
      <div style={{ position: "absolute", top: 250, left: 90, width: 900 }}>
        <Chip at={2} size={24}>Automatización e IA</Chip>
        <div style={{ marginTop: 22 }}>
          <Title text="AUTOMATIZAMOS PROCESOS CON INTELIGENCIA ARTIFICIAL" at={6} size={72} step={3} maxWidth={900} />
        </div>
      </div>
      {/* Conexiones del flujo */}
      <svg width={1080} height={1920} style={{ position: "absolute" }}>
        {TASKS.map((_, i) => {
          const y = 1180 + i * 70;
          const p = ci(f, [70 + i * 12, 92 + i * 12], [0, 1], easeInOut);
          return <path key={i} d={`M ${HUB.x} ${HUB.y + 90} C ${HUB.x} ${y}, ${HUB.x} ${y}, ${HUB.x + 1} ${y}`} stroke={W.white} strokeOpacity={0.5 * p} strokeWidth={3} fill="none" />;
        })}
      </svg>
      {/* Módulo central del flujo automático */}
      <div style={{ position: "absolute", left: HUB.x - 150, top: HUB.y - 90, width: 300, height: 180, borderRadius: 30, background: W.white, boxShadow: `0 0 0 ${10 + Math.sin(f / 5) * 4}px rgba(255,255,255,${0.18 * hubOn}), 0 30px 60px rgba(0,0,40,0.35)`, transform: `scale(${hubOn})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: W.blue }}>Flujo automático</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 16, height: 16, borderRadius: 8, background: W.blue, opacity: 0.3 + 0.7 * Math.abs(Math.sin((f + i * 6) / 8)) }} />
          ))}
        </div>
        <div style={{ fontFamily: MONO, fontSize: 16, color: W.navy, opacity: 0.7, letterSpacing: "0.1em" }}>CLASIFICA · ORDENA · ASIGNA</div>
      </div>
      {/* Tareas: dispersas → al flujo → lista ordenada */}
      {TASKS.map((tk, i) => {
        const inHub = ci(f, [40 + i * 8, 62 + i * 8], [0, 1], easeInOut);
        const outList = ci(f, [74 + i * 12, 96 + i * 12], [0, 1], easeOut);
        const [sx, sy, r] = SCATTER[i];
        const lx = 190;
        const ly = 1150 + i * 70;
        const x = outList > 0 ? HUB.x - 130 + (lx - (HUB.x - 130)) * outList : sx + (HUB.x - 130 - sx) * inHub;
        const y = outList > 0 ? HUB.y - 30 + (ly - (HUB.y - 30)) * outList : sy + (HUB.y - 30 - sy) * inHub;
        const sc = outList > 0 ? 0.6 + 0.4 * outList : 1 - inHub * 0.4;
        const op = ci(f, [8 + i * 4, 18 + i * 4], [0, 1]) * (outList > 0 ? outList : 1 - inHub * 0.9);
        const done = outList > 0.6;
        return (
          <div key={tk.t} style={{ position: "absolute", left: x, top: y, width: 700, height: 60, transform: `rotate(${r * (1 - inHub)}deg) scale(${sc})`, transformOrigin: "0 50%", opacity: op }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, height: 60, padding: "0 22px", borderRadius: 16, background: done ? W.white : "rgba(255,255,255,0.14)", border: `2px solid ${W.white}`, width: outList > 0.3 ? 700 : 380, boxSizing: "border-box" }}>
              <span style={{ width: 30, height: 30, borderRadius: 15, background: done ? W.blue : "transparent", border: `2px solid ${done ? W.blue : W.white}`, color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{done ? "✓" : ""}</span>
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: done ? W.navy : W.white, whiteSpace: "nowrap" }}>{tk.t}</span>
              {outList > 0.3 ? <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 18, color: done ? W.blue : W.white70, letterSpacing: "0.08em" }}>{tk.s.toUpperCase()}</span> : null}
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", right: 90, top: 1450, fontFamily: MONO, fontSize: 16, color: W.white70, letterSpacing: "0.1em", opacity: ci(f, [120, 132], [0, 1]) }}>FLUJO ILUSTRATIVO</div>
    </AbsoluteFill>
  );
};
