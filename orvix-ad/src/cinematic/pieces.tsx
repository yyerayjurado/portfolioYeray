import React from "react";
import { Line, Logo, Window } from "../promo/kit";
import { ProductBox } from "../promo/solutions/Shop";
import { FONT, MONO, P, ci, easeInOut, easeOut } from "./theme";

// Piezas de interfaz animadas por un reloj local `f`, para reutilizarlas en varias escenas.
// Son demostraciones conceptuales con una marca genérica («tu marca»), no productos reales.

const fade = (f: number, at: number, d = 12) => ci(f, [at, at + d], [0, 1]);
const rise = (f: number, at: number, px = 24, d = 16) => ci(f, [at, at + d], [px, 0], easeOut);

// ─── Web ──────────────────────────────────────────────────────────────────────
export const WebPage: React.FC<{ f: number; w?: number; h?: number }> = ({ f, w = 1400, h = 880 }) => {
  const scroll = ci(f, [70, 140], [0, 300], easeInOut);
  return (
    <Window title="tu-marca.demo" w={w} h={h} light>
      <div style={{ position: "absolute", inset: 0, transform: `translateY(${-scroll}px)` }}>
        <div style={{ height: 76, display: "flex", alignItems: "center", padding: "0 56px", borderBottom: "1px solid #E2E2DD" }}>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.ink }}>tu marca</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 36, fontFamily: FONT, fontSize: 18, color: "#55565C" }}>
            {["Inicio", "Servicios", "Proyectos", "Contacto"].map((t, i) => (
              <span key={t} style={{ opacity: fade(f, 4 + i * 2), color: i === 0 ? P.brand : undefined }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 48, padding: "64px 56px 40px" }}>
          <div style={{ flex: 1.1 }}>
            <div style={{ fontFamily: MONO, fontSize: 16, letterSpacing: "0.14em", color: P.brand, opacity: fade(f, 8) }}>ESTUDIO · TALLER · TIENDA</div>
            {["Un espacio", "a la altura", "de tu marca."].map((t, i) => (
              <div key={t} style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 78,
                    lineHeight: 1.02,
                    letterSpacing: "-0.04em",
                    color: P.ink,
                    transform: `translateY(${ci(f, [10 + i * 4, 26 + i * 4], [105, 0], easeOut)}%)`,
                  }}
                >
                  {t}
                </div>
              </div>
            ))}
            <div style={{ opacity: fade(f, 24), transform: `translateY(${rise(f, 24)}px)` }}>
              <div style={{ fontFamily: FONT, fontSize: 22, color: "#55565C", marginTop: 24, lineHeight: 1.4, maxWidth: 480 }}>
                Contenido claro, navegación sencilla y una experiencia pensada para cada pantalla.
              </div>
              <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
                <div style={{ padding: "18px 32px", borderRadius: 40, background: P.brand, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 20 }}>Pide tu presupuesto</div>
                <div style={{ padding: "18px 32px", borderRadius: 40, border: "1.5px solid #C8C8C3", color: P.ink, fontFamily: FONT, fontSize: 20 }}>Ver servicios</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, height: 500, borderRadius: 24, background: P.brand, position: "relative", overflow: "hidden", clipPath: `inset(${ci(f, [14, 34], [100, 0], easeInOut)}% 0 0 0 round 24px)` }}>
            <div style={{ position: "absolute", left: 70, top: 70, width: 240, height: 240, borderRadius: "50%", background: P.paper, transform: `translateY(${Math.sin(f / 20) * 10}px)` }} />
            <div style={{ position: "absolute", right: 60, bottom: 60, width: 220, height: 220, borderRadius: 30, background: P.ink }} />
            <div style={{ position: "absolute", left: 230, top: 250, width: 150, height: 150, borderRadius: 22, background: "#7E86FF", transform: `rotate(${18 + f * 0.3}deg)` }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 22, padding: "10px 56px" }}>
          {["Consultoría", "Proyectos", "Soporte"].map((t, i) => (
            <div key={t} style={{ flex: 1, height: 220, borderRadius: 18, background: "#fff", border: "1px solid #E2E2DD", padding: 26, boxSizing: "border-box" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 1 ? P.brand : "#E9E9FF" }} />
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.ink, marginTop: 22 }}>{t}</div>
              <Line w="85%" h={9} c="#E2E2DD" style={{ marginTop: 16 }} />
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
};

// ─── Tienda online ────────────────────────────────────────────────────────────
const PRODUCTS = [
  { n: "Edición Azul", p: "39,90 €", c: P.brand },
  { n: "Edición Grafito", p: "39,90 €", c: "#2A2C33" },
  { n: "Edición Arena", p: "42,00 €", c: "#CFCBC0" },
];

export const ShopPage: React.FC<{ f: number; w?: number; h?: number }> = ({ f, w = 1400, h = 880 }) => {
  const click = 60;
  const cart = f > click + 2 ? 1 : 0;
  return (
    <Window title="tienda.tu-marca.demo" w={w} h={h} light>
      <div style={{ height: 76, display: "flex", alignItems: "center", padding: "0 56px", borderBottom: "1px solid #E2E2DD" }}>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.ink }}>tu marca · tienda</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10, fontFamily: FONT, fontSize: 18, color: P.ink }}>
          Carrito
          <span
            style={{
              minWidth: 30,
              height: 30,
              borderRadius: 15,
              background: cart ? P.brand : "#E2E2DD",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              transform: `scale(${ci(f, [click + 2, click + 6, click + 12], [1, 1.35, 1])})`,
            }}
          >
            {cart}
          </span>
        </div>
      </div>
      <div style={{ padding: "36px 56px 0", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, color: P.ink, letterSpacing: "-0.03em", opacity: fade(f, 2) }}>Colección</div>
        <div style={{ display: "flex", gap: 10, opacity: fade(f, 6) }}>
          {["Todo", "Novedades", "Ediciones"].map((t, i) => (
            <span key={t} style={{ padding: "10px 18px", borderRadius: 20, border: `1.5px solid ${i === 0 ? P.ink : "#D2D2CD"}`, fontFamily: FONT, fontSize: 16, color: P.ink }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 26, padding: "30px 56px" }}>
        {PRODUCTS.map((p, i) => (
          <div
            key={p.n}
            style={{
              flex: 1,
              opacity: fade(f, 6 + i * 5),
              transform: `translateY(${rise(f, 6 + i * 5, 40, 18)}px)`,
            }}
          >
            <div style={{ height: 420, borderRadius: 22, background: "#ECECE8", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1200, position: "relative" }}>
              <div>
                {i === 0 ? (
                  <ProductBox size={250} ry={-34 + f * 0.5} />
                ) : (
                  <div style={{ width: 150, height: 240, borderRadius: 10, background: p.c, boxShadow: "0 30px 40px rgba(0,0,0,0.18)", transform: `rotate(${i === 1 ? -4 : 5}deg)` }} />
                )}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontFamily: FONT, fontSize: 24, color: P.ink }}>
              <span style={{ fontWeight: 700 }}>{p.n}</span>
              <span>{p.p}</span>
            </div>
            <div
              style={{
                marginTop: 14,
                height: 56,
                borderRadius: 30,
                background: i === 0 && cart ? P.ink : i === 0 ? P.brand : "transparent",
                border: i === 0 ? "none" : "1.5px solid #C8C8C3",
                color: i === 0 ? "#fff" : P.ink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 19,
                transform: i === 0 ? `scale(${ci(f, [click, click + 3, click + 8], [1, 0.95, 1])})` : undefined,
              }}
            >
              {i === 0 && cart ? "✓ Añadido" : "Añadir al carrito"}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
};

// ─── Identidad visual ─────────────────────────────────────────────────────────
export const BrandBoard: React.FC<{ f: number; w?: number; h?: number }> = ({ f, w = 1400, h = 420 }) => (
  <div style={{ width: w, height: h, display: "flex", gap: 24 }}>
    <div
      style={{
        flex: 1.2,
        borderRadius: 22,
        background: P.brand,
        padding: 36,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        clipPath: `inset(0 ${ci(f, [4, 26], [100, 0], easeInOut)}% 0 0 round 22px)`,
      }}
    >
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 64, color: "#fff", letterSpacing: "-0.04em" }}>tu marca</div>
      <div>
        <div style={{ fontFamily: FONT, fontSize: 22, color: "#fff" }}>Nombre Apellido</div>
        <div style={{ fontFamily: MONO, fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>hola@tu-marca.demo</div>
      </div>
    </div>
    <div style={{ flex: 1, borderRadius: 22, background: P.panel, border: `1px solid ${P.line2}`, padding: 30, boxSizing: "border-box", opacity: fade(f, 10) }}>
      <div style={{ fontFamily: MONO, fontSize: 16, color: P.muted, letterSpacing: "0.12em" }}>TIPOGRAFÍA</div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 170, lineHeight: 1, color: P.text, letterSpacing: "-0.06em", marginTop: 20 }}>Aa</div>
      <div style={{ fontFamily: MONO, fontSize: 16, color: P.muted, marginTop: 12 }}>REGULAR · BOLD</div>
    </div>
    <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: 14 }}>
      {[
        [P.brand, "#040ADE"],
        [P.text, "#F4F4F6"],
        [P.panel2, "#1C1F27"],
      ].map(([c, hex], i) => (
        <div
          key={hex}
          style={{
            flex: 1,
            borderRadius: 18,
            background: c,
            border: `1px solid ${P.line2}`,
            display: "flex",
            alignItems: "flex-end",
            padding: 14,
            transform: `translateX(${rise(f, 14 + i * 4, 60)}px)`,
            opacity: fade(f, 14 + i * 4),
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 15, color: c === P.text ? P.ink : P.muted }}>{hex}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Flujo de automatización ──────────────────────────────────────────────────
type FNode = { id: string; title: string; sub: string; at: number };
export const FLOW: FNode[] = [
  { id: "req", title: "Solicitud", sub: "Formulario web", at: 10 },
  { id: "in", title: "Recepción", sub: "Entrada al sistema", at: 34 },
  { id: "ai", title: "Agente IA", sub: "Lee y clasifica", at: 58 },
  { id: "crm", title: "CRM", sub: "Contacto registrado", at: 86 },
  { id: "cal", title: "Agenda", sub: "Hueco propuesto", at: 92 },
  { id: "out", title: "Respuesta", sub: "Enviada al cliente", at: 118 },
];
const EDGES: [string, string][] = [
  ["req", "in"],
  ["in", "ai"],
  ["ai", "crm"],
  ["ai", "cal"],
  ["crm", "out"],
  ["cal", "out"],
];

export const FlowGraph: React.FC<{ f: number; vertical?: boolean; compact?: boolean }> = ({ f, vertical, compact }) => {
  const NW = 250;
  const NH = 112;
  const pos: Record<string, { x: number; y: number }> = vertical
    ? { req: { x: 345, y: 0 }, in: { x: 345, y: 170 }, ai: { x: 345, y: 340 }, crm: { x: 60, y: 510 }, cal: { x: 630, y: 510 }, out: { x: 345, y: 680 } }
    : { req: { x: 0, y: 190 }, in: { x: 330, y: 190 }, ai: { x: 660, y: 190 }, crm: { x: 990, y: 40 }, cal: { x: 990, y: 340 }, out: { x: 1320, y: 190 } };
  const W = vertical ? 940 : 1570;
  const H = vertical ? 800 : 500;
  const nodeAt = Object.fromEntries(FLOW.map((n) => [n.id, n.at]));
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute" }}>
        {EDGES.map(([a, b]) => {
          const A = pos[a];
          const B = pos[b];
          const x1 = vertical ? A.x + NW / 2 : A.x + NW;
          const y1 = vertical ? A.y + NH : A.y + NH / 2;
          const x2 = vertical ? B.x + NW / 2 : B.x;
          const y2 = vertical ? B.y : B.y + NH / 2;
          const c1 = vertical ? [x1, (y1 + y2) / 2] : [(x1 + x2) / 2, y1];
          const c2 = vertical ? [x2, (y1 + y2) / 2] : [(x1 + x2) / 2, y2];
          const d = `M${x1} ${y1} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${x2} ${y2}`;
          const s = nodeAt[a] + 8;
          const e = nodeAt[b];
          const p = ci(f, [s, e], [0, 1], easeInOut);
          const bx = (1 - p) ** 3 * x1 + 3 * (1 - p) ** 2 * p * c1[0] + 3 * (1 - p) * p ** 2 * c2[0] + p ** 3 * x2;
          const by = (1 - p) ** 3 * y1 + 3 * (1 - p) ** 2 * p * c1[1] + 3 * (1 - p) * p ** 2 * c2[1] + p ** 3 * y2;
          return (
            <g key={a + b}>
              <path d={d} fill="none" stroke={P.line2} strokeWidth={2} />
              <path d={d} fill="none" stroke={P.accent} strokeWidth={3} pathLength={1} strokeDasharray="1" strokeDashoffset={1 - p} />
              {p > 0.02 && p < 0.98 ? <circle cx={bx} cy={by} r={8} fill={P.text} /> : null}
            </g>
          );
        })}
      </svg>
      {FLOW.map((n) => {
        const p = pos[n.id];
        const on = f >= n.at;
        const pulse = ci(f, [n.at, n.at + 6, n.at + 16], [0, 1, 0]);
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: NW,
              height: NH,
              boxSizing: "border-box",
              borderRadius: 18,
              padding: "18px 20px",
              background: n.id === "ai" && on ? P.brand : P.panel,
              border: `1.5px solid ${on ? P.accent : P.line2}`,
              boxShadow: `0 0 0 ${pulse * 10}px rgba(74,85,255,${0.3 * pulse})`,
              opacity: ci(f, [n.at - 14, n.at - 4], [0.25, 1]),
              transform: `scale(${ci(f, [n.at - 14, n.at - 2], [0.92, 1], easeOut)})`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.text }}>{n.title}</span>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: on ? P.text : "transparent",
                  border: on ? "none" : `1.5px solid ${P.dim}`,
                  color: P.brand,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 17,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {on ? "✓" : ""}
              </span>
            </div>
            {compact ? null : <div style={{ fontFamily: MONO, fontSize: 16, color: on ? P.text : P.muted, marginTop: 16, whiteSpace: "nowrap" }}>{n.sub}</div>}
          </div>
        );
      })}
    </div>
  );
};

// Tarjetas de mensaje: entrada del cliente y respuesta automática.
export const MessageCard: React.FC<{ f: number; at: number; label: string; text: string; reply?: boolean; w?: number }> = ({ f, at, label, text, reply, w = 560 }) => (
  <div
    style={{
      width: w,
      borderRadius: 20,
      background: reply ? P.text : P.panel,
      border: `1px solid ${reply ? "transparent" : P.line2}`,
      padding: 26,
      boxSizing: "border-box",
      opacity: fade(f, at),
      transform: `translateY(${rise(f, at, 30)}px)`,
      boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
    }}
  >
    <div style={{ fontFamily: MONO, fontSize: 16, letterSpacing: "0.12em", color: reply ? P.brand : P.accent }}>{label}</div>
    <div style={{ fontFamily: FONT, fontSize: 25, lineHeight: 1.35, color: reply ? P.ink : P.text, marginTop: 12 }}>{text}</div>
  </div>
);

export { Logo };
