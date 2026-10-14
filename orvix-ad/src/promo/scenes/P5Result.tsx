import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ground, Headline, In, Line, Stage, Tag, useLayout } from "../kit";
import { FONT, MONO, P, ci, easeIn, easeInOut } from "../theme";

// 33–37 s · El resultado: web, tienda y automatización funcionando como un único sistema.
const DW = 1000;
const DH = 760;

const Panel: React.FC<{ title: string; children: React.ReactNode; w: number; h: number; light?: boolean }> = ({ title, children, w, h, light }) => (
  <div style={{ width: w, height: h, borderRadius: 16, overflow: "hidden", background: light ? P.paper : P.panel, border: `1px solid ${light ? "rgba(0,0,0,0.1)" : P.line2}`, boxShadow: "0 24px 50px rgba(0,0,0,0.4)" }}>
    <div style={{ height: 34, display: "flex", alignItems: "center", padding: "0 14px", fontFamily: MONO, fontSize: 14, color: light ? "#6B6C70" : P.muted, background: light ? "#E9E9E5" : P.panel2 }}>{title}</div>
    <div style={{ padding: 18 }}>{children}</div>
  </div>
);

export const P5Result: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const lock = ci(f, [6, 40], [0, 1], easeInOut);
  const exit = ci(f, [100, 120], [0, 1], easeIn);
  const pulse = (o: number) => (f / 30 + o) % 1;
  return (
    <AbsoluteFill>
      <Ground />
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `scale(${1 - exit * 0.05})` }}>
        <Stage rect={L.stage} dw={DW} dh={DH}>
          <div style={{ position: "relative", width: DW, height: DH }}>
            {/* Marco común */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 28, border: `1.5px solid ${P.accent}`, opacity: lock, transform: `scale(${1.06 - lock * 0.06})` }} />
            <div style={{ position: "absolute", left: 30, top: -14, padding: "0 12px", background: P.bg, opacity: lock }}>
              <Tag size={18} color={P.accent} dot={false}>Un mismo sistema</Tag>
            </div>
            <svg width={DW} height={DH} style={{ position: "absolute" }}>
              {[
                [470, 210, 560, 210, 0],
                [300, 400, 300, 470, 0.3],
                [700, 400, 700, 470, 0.6],
              ].map(([x1, y1, x2, y2, o], i) => (
                <g key={i} opacity={ci(f, [30, 44], [0, 1])}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={P.accent} strokeWidth={2.5} />
                  <circle cx={x1 + (x2 - x1) * pulse(o)} cy={y1 + (y2 - y1) * pulse(o)} r={5} fill={P.text} />
                </g>
              ))}
            </svg>
            <In at={4} dx={-60} dy={0} style={{ position: "absolute", left: 40, top: 40 }}>
              <Panel title="tu-marca.demo" w={430} h={360} light>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: P.ink, lineHeight: 1, letterSpacing: "-0.03em" }}>Un espacio a la altura de tu marca.</div>
                <Line w="80%" h={8} c="#DDDDD8" style={{ marginTop: 18 }} />
                <div style={{ marginTop: 20, height: 140, borderRadius: 12, background: P.brand }} />
              </Panel>
            </In>
            <In at={10} dx={60} dy={0} style={{ position: "absolute", left: 530, top: 40 }}>
              <Panel title="tienda · pedidos" w={430} h={360} light>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[P.brand, P.ink, "#D9D9D4", "#7E86FF"].map((c) => (
                    <div key={c} style={{ height: 120, borderRadius: 12, background: "#ECECE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 36, height: 60, borderRadius: 4, background: c }} />
                    </div>
                  ))}
                </div>
              </Panel>
            </In>
            <In at={16} dy={60} style={{ position: "absolute", left: 40, top: 470 }}>
              <Panel title="automatización · activa" w={920} h={250}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 170 }}>
                  {["Solicitud", "Agente IA", "CRM", "Agenda", "Email"].map((t, i) => (
                    <React.Fragment key={t}>
                      <div style={{ padding: "18px 20px", borderRadius: 14, border: `1.5px solid ${P.accent}`, background: i === 1 ? P.brand : P.panel2, fontFamily: FONT, fontWeight: 700, fontSize: 21, color: P.text, whiteSpace: "nowrap" }}>
                        {t}
                      </div>
                      {i < 4 ? <div style={{ flex: 1, height: 2, margin: "0 8px", background: `linear-gradient(90deg, ${P.accent} ${ci(f, [24 + i * 5, 34 + i * 5], [0, 100])}%, ${P.line2} 0)` }} /> : null}
                    </React.Fragment>
                  ))}
                </div>
              </Panel>
            </In>
          </div>
        </Stage>

        <div style={{ position: "absolute", left: L.text.x, top: L.text.y, width: L.text.w, height: L.V ? undefined : L.text.h, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
          <Headline at={8} size={L.hl} stagger={6} lines={L.V ? ["Tecnología", "con propósito."] : ["Tecnología", "con propósito."]} />
          <Headline at={30} size={L.V ? 60 : 52} weight={500} lines={[{ t: "Soluciones para avanzar.", accent: true }]} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
