import React from "react";
import { C, MONO } from "./theme";
import { Bar, Glass } from "./ui";

// Miniaturas conceptuales (no son capturas de productos reales).
const Card: React.FC<{ title: string; children: React.ReactNode; w?: number; h?: number }> = ({
  title,
  children,
  w = 380,
  h = 270,
}) => (
  <Glass style={{ width: w, height: h, display: "flex", flexDirection: "column" }}>
    <div
      style={{
        height: 44,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 18px",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 10, height: 10, borderRadius: 5, background: C.white, opacity: 0.3 }} />
      ))}
      <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 17, letterSpacing: "0.12em", color: C.blueSoft }}>
        {title}
      </span>
    </div>
    <div style={{ height: h - 44, boxSizing: "border-box", padding: 20, position: "relative" }}>{children}</div>
  </Glass>
);

export const MiniWeb: React.FC<{ w?: number; h?: number }> = (p) => (
  <Card title="WEB" {...p}>
    <Bar w="62%" h={22} o={0.9} />
    <Bar w="44%" h={22} o={0.9} style={{ marginTop: 10 }} />
    <Bar w="70%" h={10} o={0.3} style={{ marginTop: 18 }} />
    <div style={{ marginTop: 18, width: 120, height: 36, borderRadius: 18, background: C.blueBright }} />
    <div
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 110,
        height: 120,
        borderRadius: 16,
        background: `linear-gradient(140deg, ${C.blueBright}, ${C.blue})`,
      }}
    />
  </Card>
);

export const Product: React.FC<{ kind: number; size: number }> = ({ kind, size }) => {
  const s = size;
  if (kind === 0)
    return (
      <div
        style={{
          width: s * 0.36,
          height: s * 0.7,
          borderRadius: `${s * 0.1}px ${s * 0.1}px ${s * 0.08}px ${s * 0.08}px`,
          background: `linear-gradient(100deg, #1b22ff 0%, #7d84ff 45%, #2a31ff 60%, #0a0fa8 100%)`,
          boxShadow: `0 ${s * 0.08}px ${s * 0.12}px rgba(0,0,0,0.45)`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -s * 0.1,
            left: "28%",
            width: "44%",
            height: s * 0.12,
            borderRadius: 6,
            background: "#e9e9ef",
          }}
        />
      </div>
    );
  if (kind === 1)
    return (
      <div
        style={{
          width: s * 0.62,
          height: s * 0.62,
          borderRadius: "50%",
          background: "radial-gradient(circle at 32% 28%, #ffffff, #b9bcff 30%, #3b46ff 70%, #0a0f7a 100%)",
          boxShadow: `0 ${s * 0.08}px ${s * 0.12}px rgba(0,0,0,0.45)`,
        }}
      />
    );
  if (kind === 2)
    return (
      <div
        style={{
          width: s * 0.56,
          height: s * 0.56,
          borderRadius: s * 0.12,
          transform: "rotate(45deg)",
          background: "linear-gradient(135deg, #f4f4f6, #a7abd6 55%, #4b4f86)",
          boxShadow: `0 ${s * 0.08}px ${s * 0.12}px rgba(0,0,0,0.45)`,
        }}
      />
    );
  return (
    <div
      style={{
        width: s * 0.7,
        height: s * 0.34,
        borderRadius: s * 0.2,
        background: "linear-gradient(180deg, #3b46ff, #040ade)",
        border: `${s * 0.04}px solid #f4f4f6`,
        boxShadow: `0 ${s * 0.08}px ${s * 0.12}px rgba(0,0,0,0.45)`,
      }}
    />
  );
};

export const MiniShop: React.FC<{ w?: number; h?: number }> = (p) => (
  <Card title="TIENDA ONLINE" {...p}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, height: "100%" }}>
      {[0, 1, 2].map((k) => (
        <div
          key={k}
          style={{
            borderRadius: 14,
            background: "rgba(244,244,246,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Product kind={k} size={90} />
          <Bar w="60%" h={8} o={0.4} />
        </div>
      ))}
    </div>
  </Card>
);

export const MiniBrand: React.FC<{ w?: number; h?: number }> = (p) => (
  <Card title="MARCA" {...p}>
    <div style={{ display: "flex", height: "100%", gap: 16 }}>
      <svg width="150" height="160" viewBox="0 0 150 160">
        <circle cx="75" cy="80" r="62" fill="none" stroke={C.blueSoft} strokeOpacity="0.5" strokeWidth="1.5" />
        <circle cx="75" cy="80" r="34" fill="none" stroke={C.blueSoft} strokeOpacity="0.5" strokeWidth="1.5" />
        <line x1="0" y1="80" x2="150" y2="80" stroke={C.blueSoft} strokeOpacity="0.4" />
        <line x1="75" y1="0" x2="75" y2="160" stroke={C.blueSoft} strokeOpacity="0.4" />
        <text x="75" y="102" textAnchor="middle" fontSize="64" fontWeight="700" fill={C.white} fontFamily="sans-serif">
          Aa
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, justifyContent: "center" }}>
        {[C.blue, C.blueBright, C.white, C.ink].map((c) => (
          <div key={c} style={{ height: 30, borderRadius: 10, background: c, border: `1px solid ${C.line}` }} />
        ))}
      </div>
    </div>
  </Card>
);

export const MiniAI: React.FC<{ w?: number; h?: number }> = (p) => (
  <Card title="AUTOMATIZACIÓN IA" {...p}>
    <svg width="100%" height="100%" viewBox="0 0 340 180">
      <path d="M40 90 C 110 90, 110 40, 170 40 S 250 90, 300 90" stroke={C.blueSoft} strokeWidth="3" fill="none" />
      <path d="M40 90 C 110 90, 110 140, 170 140 S 250 90, 300 90" stroke={C.blueSoft} strokeWidth="3" fill="none" />
      {[
        [40, 90],
        [170, 40],
        [170, 140],
        [300, 90],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill={i === 3 ? C.blueBright : C.ink2} stroke={C.blueSoft} strokeWidth="3" />
          <circle cx={x} cy={y} r="6" fill={C.white} />
        </g>
      ))}
    </svg>
  </Card>
);

export const MiniChart: React.FC<{ w?: number; h?: number }> = (p) => (
  <Card title="MARKETING" {...p}>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: "100%" }}>
      {[0.3, 0.45, 0.4, 0.62, 0.7, 0.92].map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${v * 100}%`,
            borderRadius: 8,
            background: i === 5 ? C.blueBright : "rgba(244,244,246,0.25)",
          }}
        />
      ))}
    </div>
  </Card>
);
