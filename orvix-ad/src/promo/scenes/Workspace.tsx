import React from "react";
import { useCurrentFrame } from "remotion";
import { Cursor, Line, Logo, Window } from "../kit";
import { FONT, MONO, P, ci, easeInOut } from "../theme";

// Espacio de trabajo compartido por las escenas 2 y 3.
// order: 0 = herramientas dispersas · 1 = alineadas. node: 0 = ventanas · 1 = nodos conectados a un núcleo.
export const WS_W = 1000;
export const WS_H = 800;

type Box = { x: number; y: number; w: number; h: number; r: number };
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Box, b: Box, t: number): Box => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
  w: lerp(a.w, b.w, t),
  h: lerp(a.h, b.h, t),
  r: lerp(a.r, b.r, t),
});

const HUB = { x: 500, y: 400 };

const Mail: React.FC = () => (
  <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
    {[1, 1, 1, 0, 1, 0].map((u, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 9, height: 9, borderRadius: 5, background: u ? P.accent : "transparent", border: `1px solid ${P.line2}` }} />
        <Line w={90} h={9} c={u ? P.dim : P.line2} />
        <Line w={180 - i * 12} h={9} c={P.line2} />
      </div>
    ))}
  </div>
);

const Sheet: React.FC<{ hi: number }> = ({ hi }) => (
  <div style={{ display: "grid", gridTemplateColumns: "40px repeat(4, 1fr)" }}>
    {Array.from({ length: 35 }).map((_, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      const isHi = row === 3 && col === 2;
      return (
        <div
          key={i}
          style={{
            height: 32,
            borderRight: `1px solid ${P.line}`,
            borderBottom: `1px solid ${P.line}`,
            background: col === 0 || row === 0 ? P.panel2 : isHi ? `rgba(74,85,255,${0.25 + hi * 0.4})` : "transparent",
            outline: isHi ? `2px solid rgba(74,85,255,${hi})` : undefined,
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
          }}
        >
          {row > 0 && col > 0 && (row + col) % 3 !== 0 ? <Line w={`${40 + ((row * col * 13) % 50)}%`} h={7} c={P.line2} /> : null}
        </div>
      );
    })}
  </div>
);

const Calendar: React.FC = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, padding: 12, height: "100%" }}>
    {Array.from({ length: 5 }).map((_, c) => (
      <div key={c} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Line w="60%" h={7} c={P.dim} />
        {[0, 1, 2].map((r) =>
          (c + r) % 2 === 0 ? (
            <div key={r} style={{ height: 34 + ((c * r) % 3) * 10, borderRadius: 6, background: r === 1 ? "rgba(74,85,255,0.35)" : P.panel2 }} />
          ) : (
            <div key={r} style={{ height: 22 }} />
          ),
        )}
      </div>
    ))}
  </div>
);

const Notes: React.FC = () => (
  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13, fontFamily: FONT, fontSize: 17, color: P.muted }}>
    {["Responder presupuestos", "Pasar pedidos a la hoja", "Confirmar citas", "Actualizar la web"].map((t) => (
      <div key={t} style={{ display: "flex", gap: 10, alignItems: "center", whiteSpace: "nowrap" }}>
        <span style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${P.dim}`, flexShrink: 0 }} />
        {t}
      </div>
    ))}
  </div>
);

const OldWeb: React.FC = () => (
  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Line w={70} h={12} c="#BDBDB8" />
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <Line key={i} w={34} h={7} c="#D2D2CD" />
        ))}
      </div>
    </div>
    <div style={{ height: 90, background: "#E2E2DD", borderRadius: 4 }} />
    <Line w="80%" h={8} c="#D2D2CD" />
    <Line w="65%" h={8} c="#D2D2CD" />
    <div style={{ display: "flex", gap: 8 }}>
      <div style={{ flex: 1, height: 40, background: "#E2E2DD" }} />
      <div style={{ flex: 1, height: 40, background: "#E2E2DD" }} />
    </div>
  </div>
);

const APPS = [
  { key: "mail", title: "Bandeja de entrada", node: "Correo", light: false, chaos: { x: 30, y: 70, w: 440, h: 270, r: -4 }, grid: { x: 20, y: 40, w: 470, h: 300, r: 0 }, nodeBox: { x: 30, y: 150, w: 250, h: 84, r: 0 } },
  { key: "sheet", title: "pedidos_final_v3.xlsx", node: "Pedidos", light: false, chaos: { x: 500, y: 20, w: 470, h: 290, r: 3 }, grid: { x: 510, y: 40, w: 470, h: 300, r: 0 }, nodeBox: { x: 30, y: 358, w: 250, h: 84, r: 0 } },
  { key: "cal", title: "Agenda", node: "Agenda", light: false, chaos: { x: 560, y: 420, w: 400, h: 270, r: -3 }, grid: { x: 350, y: 380, w: 300, h: 300, r: 0 }, nodeBox: { x: 30, y: 566, w: 250, h: 84, r: 0 } },
  { key: "notes", title: "Notas · pendiente", node: "Tareas", light: false, chaos: { x: 40, y: 430, w: 320, h: 250, r: 5 }, grid: { x: 20, y: 380, w: 310, h: 300, r: 0 }, nodeBox: { x: 720, y: 250, w: 250, h: 84, r: 0 } },
  { key: "web", title: "tu-web.demo", node: "Web", light: true, chaos: { x: 300, y: 250, w: 360, h: 280, r: -1.5 }, grid: { x: 670, y: 380, w: 310, h: 300, r: 0 }, nodeBox: { x: 720, y: 466, w: 250, h: 84, r: 0 } },
];

export const Workspace: React.FC<{
  appear?: number; // frame base en el que empiezan a aparecer las ventanas
  order: number;
  node: number;
  manual: number; // opacidad del bucle de copiar/pegar
}> = ({ appear = 0, order, node, manual }) => {
  const f = useCurrentFrame();
  // Bucle de trabajo manual: el cursor va del correo a la hoja una y otra vez.
  const loop = (f % 50) / 50;
  const toSheet = ci(loop, [0.1, 0.45], [0, 1], easeInOut) - ci(loop, [0.6, 0.95], [0, 1], easeInOut);
  const cx = lerp(170, 700, toSheet);
  const cy = lerp(150, 175, toSheet);
  const chip = loop < 0.5 ? "Copiar" : "Pegar";
  const hi = loop > 0.45 && loop < 0.6 ? 1 : 0.2;

  return (
    <div style={{ position: "relative", width: WS_W, height: WS_H }}>
      {/* Conexiones rotas entre herramientas */}
      <svg width={WS_W} height={WS_H} style={{ position: "absolute", opacity: (1 - order) * ci(f, [appear + 40, appear + 60], [0, 1]) }}>
        {[
          [250, 200, 730, 170],
          [200, 560, 420, 400],
          [760, 560, 480, 400],
        ].map(([x1, y1, x2, y2], i) => {
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={mx - 14} y2={my} stroke={P.dim} strokeWidth={2} strokeDasharray="6 8" />
              <line x1={mx + 14} y1={my} x2={x2} y2={y2} stroke={P.dim} strokeWidth={2} strokeDasharray="6 8" />
              <circle cx={mx} cy={my} r={9} fill={P.bg} stroke={P.dim} strokeWidth={2} />
            </g>
          );
        })}
      </svg>

      {/* Conexiones ordenadas con el núcleo */}
      <svg width={WS_W} height={WS_H} style={{ position: "absolute" }}>
        {APPS.map((a, i) => {
          const b = a.nodeBox;
          const x = b.x < HUB.x ? b.x + b.w : b.x;
          const y = b.y + b.h / 2;
          const len = Math.hypot(x - HUB.x, y - HUB.y);
          const d = ci(node, [0.55 + i * 0.05, 0.85 + i * 0.03], [len, 0]);
          const p = ((f / 40 + i * 0.2) % 1);
          return (
            <g key={a.key} opacity={node > 0.5 ? 1 : 0}>
              <line x1={HUB.x} y1={HUB.y} x2={x} y2={y} stroke={P.accent} strokeWidth={2} strokeDasharray={len} strokeDashoffset={d} />
              <circle cx={lerp(HUB.x, x, p)} cy={lerp(HUB.y, y, p)} r={5} fill={P.text} opacity={ci(node, [0.9, 1], [0, 1])} />
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: HUB.x - 110,
          top: HUB.y - 110,
          width: 220,
          height: 220,
          borderRadius: 110,
          background: P.brand,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${ci(node, [0.4, 0.7], [0, 1], easeInOut)})`,
          boxShadow: `0 0 0 12px rgba(4,10,222,0.18), 0 0 0 26px rgba(4,10,222,0.08)`,
        }}
      >
        <Logo width={150} />
      </div>

      {APPS.map((a, i) => {
        const at = appear + i * 10;
        const box = node > 0 ? mix(a.grid, a.nodeBox, node) : mix(a.chaos, a.grid, order);
        const drift = (1 - order) * Math.sin((f + i * 30) / 25) * 6;
        const pop = ci(f, [at, at + 14], [0, 1]);
        return (
          <div
            key={a.key}
            style={{
              position: "absolute",
              left: box.x,
              top: box.y + drift + (1 - pop) * 30,
              opacity: pop,
              transform: `rotate(${box.r}deg)`,
            }}
          >
            <Window title={a.title} w={box.w} h={box.h} light={a.light && node < 0.5}>
              <div style={{ opacity: 1 - ci(node, [0, 0.35], [0, 1]), position: "absolute", inset: 0 }}>
                {a.key === "mail" ? <Mail /> : null}
                {a.key === "sheet" ? <Sheet hi={hi * manual} /> : null}
                {a.key === "cal" ? <Calendar /> : null}
                {a.key === "notes" ? <Notes /> : null}
                {a.key === "web" ? <OldWeb /> : null}
              </div>
            </Window>
            {/* Etiqueta en modo nodo */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "0 20px",
                borderRadius: 14,
                background: P.panel,
                border: `1.5px solid ${P.accent}`,
                opacity: ci(node, [0.35, 0.6], [0, 1]),
              }}
            >
              <span style={{ width: 14, height: 14, borderRadius: 7, background: P.accent }} />
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: P.text }}>{a.node}</span>
              <span
                style={{
                  marginLeft: "auto",
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  background: P.accent,
                  color: P.text,
                  fontFamily: MONO,
                  fontSize: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: ci(node, [0.85, 1], [0, 1]),
                }}
              >
                ✓
              </span>
            </div>
          </div>
        );
      })}

      {/* Bucle manual de copiar y pegar */}
      <div style={{ opacity: manual * ci(f, [appear + 50, appear + 60], [0, 1]) }}>
        <div
          style={{
            position: "absolute",
            left: cx + 26,
            top: cy + 24,
            padding: "6px 12px",
            borderRadius: 8,
            background: P.text,
            color: P.ink,
            fontFamily: MONO,
            fontSize: 16,
            zIndex: 21,
          }}
        >
          {chip}
        </div>
        <Cursor x={cx} y={cy} />
      </div>
    </div>
  );
};
