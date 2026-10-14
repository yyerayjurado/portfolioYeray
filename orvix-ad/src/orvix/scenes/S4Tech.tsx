import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, MONO, ci, easeInOut } from "../theme";
import { Backdrop, Glass, Label, Pop, RevealLines } from "../ui";

// 14–20 s · Entorno 3D + agente de IA conceptual gestionando una reserva.

// Cubo 3D de producto renderizado con CSS.
const Cube: React.FC<{ size: number; rx: number; ry: number }> = ({ size, rx, ry }) => {
  const h = size / 2;
  const faces: [string, string][] = [
    [`translateZ(${h}px)`, "linear-gradient(135deg,#6e78ff,#1a22ff)"],
    [`rotateY(180deg) translateZ(${h}px)`, "linear-gradient(135deg,#1a22ff,#05086e)"],
    [`rotateY(90deg) translateZ(${h}px)`, "linear-gradient(135deg,#3b46ff,#060b9e)"],
    [`rotateY(-90deg) translateZ(${h}px)`, "linear-gradient(135deg,#2a33ff,#04087a)"],
    [`rotateX(90deg) translateZ(${h}px)`, "linear-gradient(135deg,#ffffff,#9da3ff)"],
    [`rotateX(-90deg) translateZ(${h}px)`, "linear-gradient(135deg,#0a0fa8,#020440)"],
  ];
  return (
    <div style={{ width: size, height: size, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
      {faces.map(([t, bg], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            transform: t,
            background: bg,
            borderRadius: size * 0.08,
            border: "1px solid rgba(255,255,255,0.25)",
            backfaceVisibility: "hidden",
          }}
        />
      ))}
    </div>
  );
};

const Msg: React.FC<{ at: number; me?: boolean; children: React.ReactNode }> = ({ at, me, children }) => (
  <Pop at={at} dy={24} dur={10} style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }}>
    <div
      style={{
        maxWidth: 560,
        padding: "20px 26px",
        borderRadius: 26,
        borderBottomRightRadius: me ? 6 : 26,
        borderBottomLeftRadius: me ? 26 : 6,
        background: me ? "rgba(244,244,246,0.12)" : C.blueBright,
        color: C.white,
        fontFamily: FONT,
        fontSize: 30,
        lineHeight: 1.25,
      }}
    >
      {children}
    </div>
  </Pop>
);

const STEPS = ["Consulta", "Agente IA", "Agenda", "Confirmación"];

export const S4Tech: React.FC = () => {
  const f = useCurrentFrame();
  const typing = f >= 34 && f < 50;
  const step = f < 30 ? 0 : f < 56 ? 1 : f < 82 ? 2 : 3;
  return (
    <AbsoluteFill>
      <Backdrop speed={2} glow={1.2} />

      {/* Objetos 3D flotando en profundidad */}
      <AbsoluteFill style={{ perspective: 1400, opacity: ci(f, [0, 16], [0, 1]) }}>
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 560 + Math.sin(f / 14) * 14,
            transformStyle: "preserve-3d",
            transform: `translateZ(${ci(f, [0, 30], [-600, 0])}px)`,
          }}
        >
          <Cube size={170} rx={-24 + f * 0.6} ry={30 + f * 1.4} />
        </div>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 760 - 40 + 85 - 160,
              top: 560 + 85 - 160,
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: `2px solid rgba(138,144,255,${0.45 - i * 0.2})`,
              transform: `rotateX(72deg) rotateZ(${f * (i ? -1 : 1.4)}deg) scale(${1 + i * 0.35})`,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill style={{ paddingTop: 250, paddingLeft: 90 }}>
        <RevealLines
          start={6}
          stagger={6}
          size={78}
          lines={[
            { t: "MENOS TAREAS" },
            { t: "REPETITIVAS." },
            { t: "MÁS TIEMPO", color: C.blueBright },
            { t: "PARA CRECER.", color: C.blueBright },
          ]}
        />
      </AbsoluteFill>

      {/* Interfaz conceptual del agente */}
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 640,
          transform: `perspective(1600px) rotateY(${ci(f, [0, 40], [-18, -4], easeInOut)}deg) rotateX(${ci(f, [0, 40], [10, 3], easeInOut)}deg) translateY(${ci(f, [0, 24], [200, 0])}px)`,
          opacity: ci(f, [0, 16], [0, 1]),
        }}
      >
        <Glass style={{ width: 900, padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 22, borderBottom: `1px solid ${C.line}` }}>
            <div style={{ width: 58, height: 58, borderRadius: 29, background: `radial-gradient(circle at 35% 30%, #fff, ${C.blueBright} 45%, ${C.blue})`, boxShadow: `0 0 ${20 + Math.sin(f / 4) * 10}px ${C.blueBright}` }} />
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: C.white }}>Agente de reservas</div>
              <div style={{ fontFamily: MONO, fontSize: 19, color: C.blueSoft, letterSpacing: "0.1em" }}>INTERFAZ CONCEPTUAL · IA</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 26, height: 420 }}>
            <Msg at={14} me>
              Hola, ¿tenéis hueco el viernes por la tarde para 4 personas?
            </Msg>
            {typing ? (
              <div style={{ display: "flex", gap: 10, padding: "22px 26px", background: "rgba(59,70,255,0.35)", borderRadius: 26, width: 120 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 14, height: 14, borderRadius: 7, background: C.white, opacity: 0.4 + 0.6 * Math.abs(Math.sin((f + i * 4) / 4)) }} />
                ))}
              </div>
            ) : null}
            <Msg at={50}>¡Claro! Tengo disponible el viernes a las 18:00. ¿Lo reservo?</Msg>
            <Msg at={66} me>
              Perfecto, sí.
            </Msg>
          </div>
          {/* Tarjeta de reserva confirmada */}
          <Pop at={84} dy={30}>
            <div style={{ display: "flex", alignItems: "center", gap: 22, padding: 24, borderRadius: 22, background: C.white }}>
              <div style={{ width: 64, height: 64, borderRadius: 32, background: C.blue, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, fontFamily: FONT }}>
                ✓
              </div>
              <div>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, color: C.ink }}>Reserva confirmada</div>
                <div style={{ fontFamily: MONO, fontSize: 22, color: C.blue }}>Viernes · 18:00 · 4 personas</div>
              </div>
            </div>
          </Pop>
        </Glass>
      </div>

      {/* Flujo automatizado */}
      <div style={{ position: "absolute", left: 90, right: 90, top: 1420, display: "flex", alignItems: "center", opacity: ci(f, [20, 32], [0, 1]) }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <div
              style={{
                padding: "12px 18px",
                borderRadius: 30,
                fontFamily: MONO,
                fontSize: 22,
                whiteSpace: "nowrap",
                color: i <= step ? C.white : C.muted,
                background: i <= step ? C.blue : "rgba(244,244,246,0.06)",
                border: `1.5px solid ${i <= step ? C.blueBright : C.line}`,
              }}
            >
              {s}
            </div>
            {i < 3 ? <div style={{ flex: 1, height: 2, background: i < step ? C.blueBright : C.line }} /> : null}
          </React.Fragment>
        ))}
      </div>
      <div style={{ position: "absolute", left: 90, top: 1500, opacity: ci(f, [30, 40], [0, 0.8]) }}>
        <Label size={20} color={C.muted}>Flujo automatizado</Label>
      </div>
    </AbsoluteFill>
  );
};
