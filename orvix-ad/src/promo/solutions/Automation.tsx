import React from "react";
import { useCurrentFrame } from "remotion";
import { In, useLayout } from "../kit";
import { FONT, MONO, P, SOL, ci, easeInOut } from "../theme";
import { SolutionFrame } from "./Frame";

const DW = 1200;
const DH = 760;

// Flujo conceptual: una solicitud entra por la web, un agente de IA la clasifica,
// la registra, propone una cita y envía la confirmación.
type N = { id: string; x: number; y: number; title: string; sub: string; done: number };
const NW = 220;
const NH = 104;

const NODES: N[] = [
  { id: "form", x: 0, y: 150, title: "Formulario web", sub: "Nueva solicitud", done: 14 },
  { id: "ai", x: 320, y: 150, title: "Agente IA", sub: "Lee y clasifica", done: 52 },
  { id: "crm", x: 640, y: 20, title: "CRM", sub: "Contacto creado", done: 70 },
  { id: "cal", x: 640, y: 280, title: "Agenda", sub: "Cita propuesta", done: 74 },
  { id: "mail", x: 960, y: 150, title: "Email", sub: "Confirmación enviada", done: 92 },
];
const EDGES: [string, string, number, number][] = [
  ["form", "ai", 16, 32],
  ["ai", "crm", 54, 68],
  ["ai", "cal", 56, 72],
  ["crm", "mail", 74, 90],
  ["cal", "mail", 76, 90],
];
// Recomposición vertical (9:16): cadena de arriba abajo.
const NODES_V: Record<string, { x: number; y: number }> = {
  form: { x: 370, y: 0 },
  ai: { x: 370, y: 160 },
  crm: { x: 110, y: 320 },
  cal: { x: 630, y: 320 },
  mail: { x: 370, y: 480 },
};

const STEPS = [
  { t: "Solicitud recibida", at: 30 },
  { t: "Tipo: presupuesto web", at: 38 },
  { t: "Datos registrados en el CRM", at: 46 },
  { t: "Cita propuesta para la reunión", at: 54 },
];

export const AutomationSolution: React.FC = () => {
  const f = useCurrentFrame();
  const { V } = useLayout();
  const nodes = NODES.map((n) => (V ? { ...n, ...NODES_V[n.id] } : n));
  const byId = (id: string) => nodes.find((n) => n.id === id)!;
  const W = V ? 960 : DW;
  return (
    <SolutionFrame n="04" title={["Agentes de IA y", "automatización"]} sub="Las tareas repetitivas, conectadas y resueltas por un flujo." dur={SOL.auto.dur} dw={DW} dh={DH} dwV={960} dhV={900}>
      <div style={{ position: "relative", width: W, height: DH }}>
        <svg width={W} height={V ? 600 : 420} style={{ position: "absolute", left: 0, top: 0 }}>
          {EDGES.map(([a, b, s, e]) => {
            const A = byId(a);
            const B = byId(b);
            // H: de lateral a lateral · V: de abajo a arriba
            const x1 = V ? A.x + NW / 2 : A.x + NW;
            const y1 = V ? A.y + NH : A.y + NH / 2;
            const x2 = V ? B.x + NW / 2 : B.x;
            const y2 = V ? B.y : B.y + NH / 2;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const c1 = V ? [x1, my] : [mx, y1];
            const c2 = V ? [x2, my] : [mx, y2];
            const d = `M${x1} ${y1} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${x2} ${y2}`;
            const p = ci(f, [s, e], [0, 1], easeInOut);
            // Posición aproximada del paquete sobre la curva (Bézier cúbica)
            const t = p;
            const bx = (1 - t) ** 3 * x1 + 3 * (1 - t) ** 2 * t * c1[0] + 3 * (1 - t) * t ** 2 * c2[0] + t ** 3 * x2;
            const by = (1 - t) ** 3 * y1 + 3 * (1 - t) ** 2 * t * c1[1] + 3 * (1 - t) * t ** 2 * c2[1] + t ** 3 * y2;
            return (
              <g key={a + b}>
                <path d={d} fill="none" stroke={P.line2} strokeWidth={2} />
                <path d={d} fill="none" stroke={P.accent} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
                {p > 0 && p < 1 ? <rect x={bx - 12} y={by - 9} width={24} height={18} rx={4} fill={P.text} /> : null}
              </g>
            );
          })}
        </svg>
        {nodes.map((n, i) => {
          const done = f >= n.done;
          const active = n.id === "ai" && f > 32 && f < 52;
          return (
            <In key={n.id} at={2 + i * 3} style={{ position: "absolute", left: n.x, top: n.y }}>
              <div
                style={{
                  width: NW,
                  height: NH,
                  boxSizing: "border-box",
                  borderRadius: 16,
                  padding: "16px 18px",
                  background: n.id === "ai" ? (done || active ? P.brand : P.panel2) : P.panel,
                  border: `1.5px solid ${done ? P.accent : P.line2}`,
                  boxShadow: active ? `0 0 0 ${6 + Math.sin(f / 3) * 3}px rgba(74,85,255,0.25)` : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 23, color: P.text }}>{n.title}</span>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      background: done ? P.text : "transparent",
                      border: done ? "none" : `1.5px solid ${P.dim}`,
                      color: P.brand,
                      fontSize: 16,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: FONT,
                    }}
                  >
                    {done ? "✓" : ""}
                  </span>
                </div>
                <div style={{ fontFamily: MONO, fontSize: 15, color: done ? P.text : P.muted, marginTop: 14, whiteSpace: "nowrap", opacity: done ? 1 : 0.7 }}>
                  {n.sub}
                </div>
              </div>
            </In>
          );
        })}

        {/* Panel del agente */}
        <In at={26} style={{ position: "absolute", left: 0, top: V ? 630 : 450, width: W }}>
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ width: V ? 440 : 480, borderRadius: 18, background: P.panel, border: `1px solid ${P.line2}`, padding: 26 }}>
              <div style={{ fontFamily: MONO, fontSize: 15, color: P.accent, letterSpacing: "0.1em" }}>MENSAJE ENTRANTE</div>
              <div style={{ fontFamily: FONT, fontSize: 24, color: P.text, lineHeight: 1.35, marginTop: 14 }}>
                «Hola, me gustaría renovar la web de mi negocio. ¿Podemos hablar esta semana?»
              </div>
            </div>
            <div style={{ flex: 1, borderRadius: 18, background: P.panel, border: `1px solid ${P.line2}`, padding: 26 }}>
              <div style={{ fontFamily: MONO, fontSize: 15, color: P.accent, letterSpacing: "0.1em" }}>AGENTE IA · PROCESO</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                {STEPS.map((s) => (
                  <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 14, opacity: ci(f, [s.at, s.at + 6], [0.25, 1]) }}>
                    <span style={{ width: 20, height: 20, borderRadius: 10, background: f > s.at + 4 ? P.accent : P.panel2, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONT, fontSize: 22, color: P.text, whiteSpace: "nowrap" }}>{s.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 14, color: P.dim, marginTop: 14, letterSpacing: "0.08em" }}>
            FLUJO CONCEPTUAL · REPRESENTACIÓN ILUSTRATIVA
          </div>
        </In>
      </div>
    </SolutionFrame>
  );
};
