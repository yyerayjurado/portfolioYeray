import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CUES, FONT, MONO, W, ci, easeInOut, easeOut, local } from "../theme";
import { BlueBg, Chip, Shapes, Title, useV } from "../ui";

// Escena 4 · Branding, marketing digital y diseño 3D (tres fases enlazadas por un desplazamiento lateral).
export const Brand: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "relative", width: 1000, height: 640 }}>
    <svg width={1000} height={640} style={{ position: "absolute" }}>
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={0} x2={1000 * ci(f, [i * 3, 30 + i * 3], [0, 1], easeInOut)} y1={80 + i * 160} y2={80 + i * 160} stroke={W.white15} strokeWidth={1.5} />
      ))}
      <circle cx={250} cy={300} r={200} fill="none" stroke={W.white40} strokeWidth={2} strokeDasharray={1257} strokeDashoffset={1257 * (1 - ci(f, [4, 40], [0, 1], easeInOut))} />
    </svg>
    <div style={{ position: "absolute", left: 70, top: 90, fontFamily: FONT, fontWeight: 700, fontSize: 340, lineHeight: 1, letterSpacing: "-0.06em", color: W.white, clipPath: `inset(0 ${ci(f, [6, 30], [100, 0], easeInOut)}% 0 0)` }}>Aa</div>
    <div style={{ position: "absolute", left: 80, top: 500, display: "flex", gap: 16, opacity: ci(f, [24, 34], [0, 1]) }}>
      {[
        [W.blue, "#1010FF"],
        [W.white, "#FFFFFF"],
        [W.navy, "#06064A"],
      ].map(([c, hex]) => (
        <div key={hex} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 54, height: 54, borderRadius: 27, background: c, border: `2px solid ${W.white}` }} />
          <span style={{ fontFamily: MONO, fontSize: 18, color: W.white70 }}>{hex}</span>
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 540,
        top: 60,
        width: 440,
        height: 260,
        borderRadius: 22,
        background: W.white,
        padding: 32,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 30px 60px rgba(0,0,40,0.35)",
        transform: `translateY(${ci(f, [14, 30], [40, 0], easeOut)}px) rotate(${ci(f, [14, 34], [-5, -2])}deg)`,
        opacity: ci(f, [14, 24], [0, 1]),
      }}
    >
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 54, color: W.blue, letterSpacing: "-0.04em" }}>tu marca</div>
      <div style={{ fontFamily: MONO, fontSize: 17, color: W.navy, opacity: 0.7 }}>identidad · logotipo · sistema gráfico</div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 600,
        top: 360,
        width: 380,
        height: 240,
        borderRadius: 22,
        border: `2.5px solid ${W.white}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        padding: 20,
        boxSizing: "border-box",
        opacity: ci(f, [26, 36], [0, 1]),
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ borderRadius: i % 2 ? "50%" : 12, background: i % 3 === 0 ? W.white : W.white15, transform: `scale(${ci(f, [28 + i * 2, 38 + i * 2], [0, 1], easeOut)})` }} />
      ))}
    </div>
  </div>
);

const Marketing: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 1000, height: 640, borderRadius: 26, background: W.white, boxShadow: "0 40px 80px rgba(0,0,40,0.4)", padding: 36, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 24 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, color: W.navy }}>Campaña · vista general</div>
      <div style={{ display: "flex", gap: 10 }}>
        {["Social", "Búsqueda", "Email"].map((t, i) => (
          <span key={t} style={{ padding: "8px 16px", borderRadius: 18, background: i === 0 ? W.blue : "#ECECF8", color: i === 0 ? W.white : W.navy, fontFamily: MONO, fontSize: 16 }}>{t}</span>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 18 }}>
      {["Alcance", "Interacción", "Conversiones"].map((t, i) => (
        <div key={t} style={{ flex: 1, borderRadius: 16, background: "#F2F2FB", padding: 18 }}>
          <div style={{ fontFamily: MONO, fontSize: 15, color: W.navy, opacity: 0.6, letterSpacing: "0.08em" }}>{t.toUpperCase()}</div>
          <div style={{ marginTop: 14, height: 14, borderRadius: 7, background: "#DADAF2" }}>
            <div style={{ height: 14, borderRadius: 7, background: W.blue, width: `${ci(f, [10 + i * 4, 40 + i * 4], [0, 55 + i * 12], easeOut)}%` }} />
          </div>
        </div>
      ))}
    </div>
    <svg viewBox="0 0 900 300" style={{ flex: 1 }}>
      {[60, 140, 220, 300].map((y) => (
        <line key={y} x1={0} x2={900} y1={y - 2} y2={y - 2} stroke="#E4E4F2" strokeWidth={2} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={30 + i * 110} width={50} rx={10} y={290 - ci(f, [14 + i * 2, 34 + i * 2], [0, 60 + i * 22], easeOut)} height={ci(f, [14 + i * 2, 34 + i * 2], [0, 60 + i * 22], easeOut)} fill="#D6D6FF" />
      ))}
      <path d="M30 250 C 150 230, 220 200, 320 190 S 520 130, 620 110 S 800 60, 880 40" fill="none" stroke={W.blue} strokeWidth={7} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - ci(f, [18, 60], [0, 1], easeInOut)} />
    </svg>
    <div style={{ fontFamily: MONO, fontSize: 14, color: W.navy, opacity: 0.5, letterSpacing: "0.08em" }}>INTERFAZ ILUSTRATIVA · SIN DATOS REALES</div>
  </div>
);

// Objeto 3D con CSS: cubo con caras iluminadas, esfera brillante, anillo y sombra.
const ThreeD: React.FC<{ f: number }> = ({ f }) => {
  const s = 230;
  const h = s / 2;
  const ry = 30 + f * 1.1;
  const faces: [string, string][] = [
    [`translateZ(${h}px)`, "linear-gradient(135deg, #FFFFFF, #DCDCFF)"],
    [`rotateY(180deg) translateZ(${h}px)`, "linear-gradient(135deg, #8C8CFF, #3A3AFF)"],
    [`rotateY(90deg) translateZ(${h}px)`, "linear-gradient(135deg, #7A7AFF, #2626E8)"],
    [`rotateY(-90deg) translateZ(${h}px)`, "linear-gradient(135deg, #D6D6FF, #9696FF)"],
    [`rotateX(90deg) translateZ(${h}px)`, "linear-gradient(135deg, #FFFFFF, #F0F0FF)"],
    [`rotateX(-90deg) translateZ(${h}px)`, "#5A5AFF"],
  ];
  return (
    <div style={{ position: "relative", width: 1000, height: 640, perspective: 1600 }}>
      <div style={{ position: "absolute", left: 220, top: 520, width: 560, height: 70, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,60,0.45), transparent 70%)" }} />
      <div style={{ position: "absolute", left: 310, top: 150 + Math.sin(f / 18) * 10, width: s, height: s, transformStyle: "preserve-3d", transform: `rotateX(-22deg) rotateY(${ry}deg)` }}>
        {faces.map(([t, bg], i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transform: t, background: bg, borderRadius: 26, backfaceVisibility: "hidden", border: "1px solid rgba(255,255,255,0.6)" }} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 250 + Math.cos(f / 20) * 12,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: "radial-gradient(circle at 32% 28%, #FFFFFF 0%, #EDEDFF 22%, #8C8CFF 62%, #1010FF 100%)",
          boxShadow: "0 30px 50px rgba(0,0,60,0.35)",
        }}
      />
      <div style={{ position: "absolute", left: 240, top: 130, width: 520, height: 520, borderRadius: "50%", border: `3px solid ${W.white}`, transform: `rotateX(74deg) rotateZ(${f * 0.8}deg)`, opacity: 0.85 }} />
      <div style={{ position: "absolute", left: 140, top: 110, width: 30, height: 30, borderRadius: 8, background: W.white, transform: `rotate(${f * 2}deg) translateY(${Math.sin(f / 14) * 10}px)` }} />
    </div>
  );
};

export const W4BrandMkt3D: React.FC = () => {
  const f = useCurrentFrame();
  const { V, Wd } = useV();
  const mk = local(CUES.marketing, 3);
  const td = local(CUES.threeD, 3);
  const p1 = ci(f, [mk - 8, mk + 10], [0, 1], easeInOut);
  const p2 = ci(f, [td - 8, td + 10], [0, 1], easeInOut);
  const sc = V ? 0.94 : 0.92;
  const ox = V ? (Wd - 1000 * sc) / 2 : 780;
  const oy = V ? 760 : 170;
  const slot = (enter: number, exit: number): React.CSSProperties => ({
    position: "absolute",
    left: ox,
    top: oy,
    transformOrigin: "0 0",
    transform: `translateX(${(1 - enter) * 300 - exit * 300}px) scale(${sc})`,
    opacity: enter * (1 - exit),
  });
  const titles = [
    { t: "Una identidad visual propia", chip: "Branding e identidad", at: 6, out: mk - 10 },
    { t: "Marketing digital con intención", chip: "Marketing digital", at: mk + 2, out: td - 10 },
    { t: "Diseño 3D para tu proyecto", chip: "Diseño 3D", at: td + 2, out: undefined },
  ];
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.5} />
      <div style={{ position: "absolute", left: V ? 90 : 130, top: 230, width: V ? 900 : 560 }}>
        {titles.map((x) => (
          <div key={x.t} style={{ position: "absolute", width: V ? 900 : 560 }}>
            <Chip at={x.at - 2} out={x.out}>{x.chip}</Chip>
            <div style={{ marginTop: 26 }}>
              <Title text={x.t} at={x.at} size={V ? 76 : 70} step={2} out={x.out} maxWidth={V ? 900 : 560} />
            </div>
          </div>
        ))}
      </div>
      <div style={slot(ci(f, [0, 14], [0, 1], easeOut), p1)}>
        <Brand f={f} />
      </div>
      <div style={slot(p1, p2)}>
        <Marketing f={f - mk} />
      </div>
      <div style={slot(p2, 0)}>
        <ThreeD f={f - td} />
      </div>
    </AbsoluteFill>
  );
};
