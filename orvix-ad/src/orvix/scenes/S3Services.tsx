import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { C, FONT, MONO, ci, easeInOut, easeOut } from "../theme";
import { Backdrop, Bar, Glass, Label, Pop } from "../ui";
import { Product } from "../minis";

// 7–14 s · Cuatro servicios en un travelling horizontal continuo.
const SEG = 52; // ~1,75 s por servicio
const SERVICES = [
  { n: "01", title: ["Diseño y", "desarrollo web"], tag: "Interfaces modernas · Responsive" },
  { n: "02", title: ["Tiendas", "Shopify"], tag: "Producto · Ficha · Compra" },
  { n: "03", title: ["Branding"], tag: "Identidad · Logotipo · Sistema gráfico" },
  { n: "04", title: ["Marketing", "digital"], tag: "Campañas · Análisis de resultados" },
];

const WebPanel: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "relative", width: 900, height: 820 }}>
    <Pop at={2} style={{ position: "absolute", left: 0, top: 40 }}>
      <Glass style={{ width: 780, height: 520 }}>
        <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", borderBottom: `1px solid ${C.line}` }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: C.white, opacity: 0.3 }} />
          ))}
          <div style={{ marginLeft: 20, flex: 1, height: 26, borderRadius: 13, background: "rgba(244,244,246,0.08)" }} />
        </div>
        <div style={{ padding: 36, display: "flex", gap: 30 }}>
          <div style={{ flex: 1.2 }}>
            <Pop at={8} dy={20}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, lineHeight: 1, color: C.white, letterSpacing: "-0.03em" }}>
                Tu web,
                <br />a medida.
              </div>
            </Pop>
            <Pop at={12} dy={20}>
              <Bar w="90%" h={12} o={0.3} style={{ marginTop: 24 }} />
              <Bar w="70%" h={12} o={0.3} style={{ marginTop: 12 }} />
            </Pop>
            <Pop at={16} dy={20}>
              <div style={{ marginTop: 30, width: 190, height: 56, borderRadius: 28, background: C.blueBright, boxShadow: `0 0 40px ${C.blue}` }} />
            </Pop>
          </div>
          <Pop at={10} dy={30} style={{ flex: 1 }}>
            <div style={{ height: 330, borderRadius: 22, background: `linear-gradient(150deg, ${C.blueBright}, ${C.blue} 60%, ${C.ink2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Product kind={1} size={240} />
            </div>
          </Pop>
        </div>
      </Glass>
    </Pop>
    {/* Versión responsive en móvil */}
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 270,
        opacity: ci(f, [18, 28], [0, 1]),
        transform: `translateX(${ci(f, [18, 32], [120, 0])}px) rotate(${ci(f, [18, 32], [8, -3])}deg)`,
      }}
    >
      <div style={{ width: 270, height: 540, borderRadius: 44, padding: 12, background: "#0c0d24", border: `2px solid rgba(160,168,255,0.35)`, boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
        <div style={{ height: "100%", borderRadius: 34, background: C.ink2, padding: 22, overflow: "hidden" }}>
          <div style={{ width: 70, height: 8, borderRadius: 4, background: C.white, opacity: 0.3, margin: "0 auto 26px" }} />
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 32, lineHeight: 1, color: C.white }}>Tu web,<br />a medida.</div>
          <Bar w="90%" h={8} o={0.3} style={{ marginTop: 16 }} />
          <div style={{ marginTop: 18, height: 190, borderRadius: 18, background: `linear-gradient(150deg, ${C.blueBright}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Product kind={1} size={130} />
          </div>
          <div style={{ marginTop: 18, height: 44, borderRadius: 22, background: C.blueBright }} />
        </div>
      </div>
    </div>
  </div>
);

const ShopPanel: React.FC<{ f: number }> = ({ f }) => {
  const click = 30;
  const pressed = ci(f, [click, click + 3, click + 8], [1, 0.92, 1]);
  return (
    <div style={{ position: "relative", width: 900, height: 820 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, width: 470 }}>
        {[0, 1, 2, 3].map((k) => (
          <Pop key={k} at={2 + k * 3}>
            <Glass style={{ height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, borderRadius: 24 }}>
              <Product kind={k} size={170} />
              <Bar w="55%" h={10} o={0.45} />
            </Glass>
          </Pop>
        ))}
      </div>
      {/* Ficha de producto */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 110,
          opacity: ci(f, [12, 22], [0, 1]),
          transform: `translateY(${ci(f, [12, 26], [80, 0])}px)`,
        }}
      >
        <Glass style={{ width: 430, padding: 32, background: "linear-gradient(160deg, rgba(60,66,190,0.85), rgba(10,12,46,0.95))" }}>
          <div style={{ height: 300, borderRadius: 20, background: "rgba(244,244,246,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ transform: `rotate(${f * 0.6}deg)` }}>
              <Product kind={0} size={260} />
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 20, color: C.blueSoft, marginTop: 24, letterSpacing: "0.12em" }}>PRODUCTO DE EJEMPLO</div>
          <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 700, color: C.white, marginTop: 8 }}>Edición Azul</div>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {[C.blueBright, C.white, "#0a0fa8"].map((c, i) => (
              <span key={c} style={{ width: 34, height: 34, borderRadius: 17, background: c, outline: i === 0 ? `3px solid ${C.white}` : undefined, outlineOffset: 3 }} />
            ))}
          </div>
          <div
            style={{
              marginTop: 26,
              height: 68,
              borderRadius: 34,
              background: f > click + 2 ? C.white : C.blueBright,
              color: f > click + 2 ? C.blue : C.white,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${pressed})`,
            }}
          >
            {f > click + 2 ? "✓ Añadido al carrito" : "Añadir al carrito"}
          </div>
        </Glass>
      </div>
      {/* Cursor */}
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          left: ci(f, [16, click], [300, 690], easeInOut),
          top: ci(f, [16, click], [820, 668], easeInOut),
          opacity: ci(f, [14, 18], [0, 1]),
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
        }}
      >
        <path d="M4 2 L4 20 L9 15 L12 22 L15 21 L12 14 L19 14 Z" fill={C.white} stroke={C.ink} strokeWidth="1.2" />
      </svg>
    </div>
  );
};

const BrandPanel: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "relative", width: 900, height: 820, display: "flex", flexDirection: "column", alignItems: "center" }}>
    <svg width="560" height="560" viewBox="0 0 560 560">
      {[240, 170, 100].map((r, i) => (
        <circle
          key={r}
          cx="280"
          cy="280"
          r={r}
          fill="none"
          stroke={C.blueSoft}
          strokeOpacity={0.55}
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * r}
          strokeDashoffset={ci(f, [i * 4, 24 + i * 4], [2 * Math.PI * r, 0])}
        />
      ))}
      {[
        [0, 280, 560, 280],
        [280, 0, 280, 560],
        [82, 82, 478, 478],
        [478, 82, 82, 478],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.blueSoft} strokeOpacity={0.3} strokeWidth="1.5" strokeDasharray="800" strokeDashoffset={ci(f, [i * 3, 22 + i * 3], [800, 0])} />
      ))}
      {/* Símbolo construido sobre la retícula */}
      <path
        d="M280 140 C 380 140 420 210 420 280 C 420 360 360 420 280 420 C 190 420 140 360 140 280 C 140 200 190 140 280 140 Z M 250 245 C 225 245 205 265 205 288 C 205 305 220 316 240 316 C 268 316 290 296 290 272 C 290 255 275 245 250 245 Z"
        fill={C.white}
        fillRule="evenodd"
        opacity={ci(f, [18, 30], [0, 1])}
        transform={`translate(280 280) scale(${ci(f, [18, 32], [0.6, 1])}) translate(-280 -280)`}
      />
    </svg>
    <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
      {[
        [C.blue, "AZUL"],
        [C.blueBright, "ELÉCTRICO"],
        [C.white, "BLANCO"],
        [C.ink, "TINTA"],
      ].map(([c, n], i) => (
        <Pop key={n} at={22 + i * 3}>
          <div style={{ width: 180, height: 150, borderRadius: 22, background: c, border: `1.5px solid ${C.line}`, padding: 16, display: "flex", alignItems: "flex-end" }}>
            <span style={{ fontFamily: MONO, fontSize: 17, letterSpacing: "0.1em", color: c === C.white ? C.ink : C.white }}>{n}</span>
          </div>
        </Pop>
      ))}
    </div>
  </div>
);

const MarketingPanel: React.FC<{ f: number }> = ({ f }) => {
  const pts = [
    [0, 300],
    [120, 260],
    [240, 280],
    [360, 190],
    [480, 200],
    [600, 90],
    [700, 40],
  ];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <div style={{ position: "relative", width: 900, height: 820 }}>
      {/* Pieza de campaña en formato vertical */}
      <Pop at={2} style={{ position: "absolute", left: 0, top: 0 }}>
        <Glass style={{ width: 330, height: 560, background: `linear-gradient(170deg, ${C.blueBright}, ${C.blue} 55%, ${C.ink2})`, padding: 28, display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: MONO, fontSize: 17, letterSpacing: "0.14em", color: C.white, opacity: 0.8 }}>CAMPAÑA</span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Product kind={3} size={220} />
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 40, lineHeight: 1, color: C.white }}>Nueva<br />colección</div>
          <div style={{ marginTop: 18, height: 52, borderRadius: 26, background: C.white }} />
        </Glass>
      </Pop>
      {/* Panel de análisis (sin cifras: ilustrativo) */}
      <Pop at={8} style={{ position: "absolute", right: 0, top: 200 }}>
        <Glass style={{ width: 600, height: 470, padding: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontSize: 19, letterSpacing: "0.14em", color: C.blueSoft }}>ANÁLISIS</span>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 54, height: 22, borderRadius: 11, background: i === 2 ? C.blueBright : "rgba(244,244,246,0.12)" }} />
              ))}
            </div>
          </div>
          <svg width="540" height="340" viewBox="-10 0 720 340" style={{ marginTop: 24 }}>
            {[80, 160, 240, 320].map((y) => (
              <line key={y} x1="0" x2="700" y1={y} y2={y} stroke={C.line} />
            ))}
            {pts.slice(0, 6).map(([x], i) => (
              <rect key={i} x={x + 30} width="56" rx="10" y={330 - ci(f, [10 + i * 2, 26 + i * 2], [0, 70 + i * 34])} height={ci(f, [10 + i * 2, 26 + i * 2], [0, 70 + i * 34])} fill={C.white} opacity={0.1} />
            ))}
            <path d={d} fill="none" stroke={C.blueBright} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" strokeDashoffset={ci(f, [14, 40], [1000, 0], easeInOut)} />
            <circle cx="700" cy="40" r="14" fill={C.white} opacity={ci(f, [38, 42], [0, 1])} />
          </svg>
        </Glass>
      </Pop>
    </div>
  );
};

const base = (i: number) => (i === 0 ? 0 : i * SEG - 8);
const PANELS = [WebPanel, ShopPanel, BrandPanel, MarketingPanel];

export const S3Services: React.FC = () => {
  const f = useCurrentFrame();
  // Travelling: cada cambio es un whip-pan de 10 frames con desenfoque de movimiento.
  let x = 0;
  let blur = 0;
  for (let i = 1; i < 4; i++) {
    const s = i * SEG - 6;
    x += ci(f, [s, s + 10], [0, 1], easeInOut);
    blur += ci(f, [s, s + 5, s + 10], [0, 14, 0], (t) => t);
  }
  const idx = Math.min(3, Math.floor((f + 6) / SEG));
  return (
    <AbsoluteFill>
      <Backdrop grid={0.6} />
      <AbsoluteFill style={{ opacity: ci(f, [0, 10], [0, 1]) }}>
        {/* Cabecera fija */}
        <div style={{ position: "absolute", top: 250, left: 90, right: 90 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Label>Diseñamos y construimos</Label>
            <span style={{ fontFamily: MONO, fontSize: 26, color: C.white, opacity: 0.7 }}>
              {SERVICES[idx].n} / 04
            </span>
          </div>
          <div style={{ marginTop: 26, height: 3, background: C.line, borderRadius: 2 }}>
            <div style={{ height: 3, width: `${ci(f, [0, 4 * SEG], [0, 100], (t) => t)}%`, background: C.blueBright, borderRadius: 2 }} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080 * 4,
            height: 1920,
            display: "flex",
            transform: `translateX(${-x * 1080}px)`,
            filter: `blur(${blur}px)`,
          }}
        >
          {SERVICES.map((s, i) => {
            const P = PANELS[i];
            const lf = f - i * SEG;
            return (
              <div key={i} style={{ width: 1080, height: 1920, position: "relative" }}>
                <div style={{ position: "absolute", top: 360, left: 90 }}>
                  {s.title.map((t, j) => (
                    <div key={j} style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          fontFamily: FONT,
                          fontWeight: 700,
                          fontSize: 96,
                          lineHeight: 1.02,
                          letterSpacing: "-0.035em",
                          color: C.white,
                          transform: `translateY(${ci(lf, [j * 4 - 2, j * 4 + 12], [105, 0], easeOut)}%)`,
                        }}
                      >
                        {t}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 28, color: C.blueSoft, opacity: ci(lf, [8, 16], [0, 1]) }}>{s.tag}</div>
                </div>
                <div style={{ position: "absolute", top: 700, left: 90 }}>
                  <Sequence from={base(i)} layout="none" name={`Servicio ${s.n}`}>
                    <P f={f - base(i)} />
                  </Sequence>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
