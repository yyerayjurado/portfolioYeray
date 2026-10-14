import React from "react";
import { useCurrentFrame } from "remotion";
import { Cursor, In, Line, Window, useLayout } from "../kit";
import { FONT, MONO, P, SOL, ci, easeInOut, easeOut } from "../theme";
import { SolutionFrame } from "./Frame";

const DW = 1200;
const DH = 760;

// Envase de producto renderizado en 3D con CSS (diseño 3D).
export const ProductBox: React.FC<{ size: number; ry: number; rx?: number }> = ({ size, ry, rx = -14 }) => {
  const w = size * 0.62;
  const h = size;
  const d = size * 0.42;
  const face = (t: string, wd: number, bg: string, label?: boolean): React.ReactNode => (
    <div
      style={{
        position: "absolute",
        left: (w - wd) / 2,
        top: 0,
        width: wd,
        height: h,
        transform: t,
        background: bg,
        backfaceVisibility: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: size * 0.06,
        boxSizing: "border-box",
      }}
    >
      {label ? (
        <>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size * 0.1, color: "#fff", lineHeight: 1 }}>Edición</div>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: size * 0.1, color: "#fff", lineHeight: 1 }}>Azul</div>
          <div style={{ marginTop: size * 0.03, fontFamily: MONO, fontSize: size * 0.035, color: "rgba(255,255,255,0.7)" }}>250 ml</div>
        </>
      ) : null}
    </div>
  );
  return (
    <div style={{ width: w, height: h, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
      {/* Solo se pintan las caras visibles: así el render es correcto aunque un ancestro aplane el 3D. */}
      {ry < 0 ? face(`rotateY(90deg) translateZ(${w / 2}px)`, d, "#0207B8") : null}
      {ry > 0 ? face(`rotateY(-90deg) translateZ(${w / 2}px)`, d, "#2A33F0") : null}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: (h - d) / 2,
          width: w,
          height: d,
          transform: `rotateX(90deg) translateZ(${h / 2}px)`,
          background: "#EDEDF2",
        }}
      />
      {face(`translateZ(${d / 2}px)`, w, P.brand, true)}
    </div>
  );
};

export const ShopSolution: React.FC = () => {
  const f = useCurrentFrame();
  const click = 52;
  const added = f > click + 2;
  const drawer = ci(f, [click + 6, click + 24], [1, 0], easeOut);
  const { V } = useLayout();
  // En vertical la ficha se apila: galería arriba, información abajo y carrito como hoja inferior.
  const WW = V ? 760 : DW;
  const WH = V ? 1000 : DH;
  const cx = V ? ci(f, [18, click], [600, 380], easeInOut) : ci(f, [18, click], [520, 860], easeInOut);
  const cy = V ? ci(f, [18, click], [600, 905], easeInOut) : ci(f, [18, click], [640, 560], easeInOut);
  return (
    <SolutionFrame n="02" title={["Tiendas online", "con Shopify"]} sub="Catálogo, ficha de producto y una compra sin fricciones." dur={SOL.shop.dur} dw={DW} dh={DH} dwV={760} dhV={1000}>
      <Window title="tienda.tu-marca.demo/productos/edicion-azul" w={WW} h={WH} light>
        <div style={{ display: "flex", flexDirection: V ? "column" : "row", gap: V ? 24 : 50, padding: V ? "30px 36px" : "40px 56px" }}>
          {/* Galería con render 3D */}
          <div style={{ width: V ? 688 : 520 }}>
            <In at={2}>
              <div style={{ height: V ? 400 : 500, borderRadius: 22, background: "#ECECE8", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1200, position: "relative" }}>
                <ProductBox size={V ? 260 : 300} ry={-38 + f * 0.65} />
                <div style={{ position: "absolute", left: 20, top: 20, padding: "8px 14px", borderRadius: 20, background: "#fff", fontFamily: MONO, fontSize: 13, color: "#55565C", letterSpacing: "0.08em" }}>
                  VISTA 3D
                </div>
                <div style={{ position: "absolute", bottom: 50, width: 240, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.12)", filter: "blur(10px)" }} />
              </div>
            </In>
            <div style={{ display: V ? "none" : "flex", gap: 14, marginTop: 16 }}>
              {[0, 1, 2, 3].map((i) => (
                <In key={i} at={8 + i * 3} dy={12} style={{ flex: 1 }}>
                  <div style={{ height: 90, borderRadius: 14, background: i === 0 ? "#E0E0FF" : "#ECECE8", border: i === 0 ? `2px solid ${P.brand}` : "none" }} />
                </In>
              ))}
            </div>
          </div>
          {/* Ficha de producto */}
          <div style={{ flex: 1, paddingTop: V ? 0 : 20 }}>
            <In at={6} dy={16}>
              <div style={{ fontFamily: MONO, fontSize: 14, color: "#8A8B90", letterSpacing: "0.08em" }}>INICIO / PRODUCTOS / EDICIÓN AZUL</div>
            </In>
            <In at={10} dy={16}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 52, color: P.ink, letterSpacing: "-0.03em", marginTop: 16 }}>Edición Azul</div>
              <div style={{ fontFamily: FONT, fontSize: 30, color: P.ink, marginTop: 8 }}>39,90 €</div>
            </In>
            <In at={14} dy={16}>
              {V ? null : (
                <>
                  <Line w="95%" h={9} c="#DDDDD8" style={{ marginTop: 24 }} />
                  <Line w="80%" h={9} c="#DDDDD8" style={{ marginTop: 10 }} />
                </>
              )}
            </In>
            <In at={18} dy={16}>
              <div style={{ fontFamily: FONT, fontSize: 18, color: "#55565C", marginTop: 30 }}>Color</div>
              <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
                {[P.brand, P.ink, "#D9D9D4"].map((c, i) => (
                  <span key={c} style={{ width: 40, height: 40, borderRadius: 20, background: c, outline: i === 0 ? `2px solid ${P.brand}` : undefined, outlineOffset: 4 }} />
                ))}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 18, color: "#55565C", marginTop: 24 }}>Formato</div>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {["250 ml", "500 ml"].map((t, i) => (
                  <span key={t} style={{ padding: "10px 20px", borderRadius: 12, border: `1.5px solid ${i === 0 ? P.ink : "#D2D2CD"}`, fontFamily: FONT, fontSize: 17, color: P.ink }}>
                    {t}
                  </span>
                ))}
              </div>
            </In>
            <In at={22} dy={16}>
              <div
                style={{
                  marginTop: 34,
                  height: 66,
                  borderRadius: 40,
                  background: added ? P.ink : P.brand,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 21,
                  transform: `scale(${ci(f, [click, click + 3, click + 8], [1, 0.95, 1])})`,
                }}
              >
                {added ? "✓ Añadido al carrito" : "Añadir al carrito"}
              </div>
            </In>
          </div>
        </div>

        {/* Carrito lateral */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,11,15,0.35)", opacity: 1 - drawer }} />
        <div
          style={{
            position: "absolute",
            top: V ? undefined : 0,
            left: V ? 0 : undefined,
            right: 0,
            bottom: 0,
            width: V ? undefined : 420,
            height: V ? 400 : undefined,
            borderRadius: V ? "28px 28px 0 0" : 0,
            background: "#fff",
            transform: V ? `translateY(${drawer * 420}px)` : `translateX(${drawer * 440}px)`,
            padding: 36,
            display: "flex",
            flexDirection: "column",
            boxShadow: "-20px 0 50px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: P.ink }}>Tu carrito (1)</div>
          <div style={{ display: "flex", gap: 18, marginTop: 30, alignItems: "center" }}>
            <div style={{ width: 90, height: 90, borderRadius: 14, background: "#ECECE8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 64, background: P.brand, borderRadius: 3 }} />
            </div>
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 21, color: P.ink }}>Edición Azul</div>
              <div style={{ fontFamily: FONT, fontSize: 17, color: "#55565C", marginTop: 4 }}>250 ml · 39,90 €</div>
            </div>
          </div>
          <div style={{ marginTop: "auto", borderTop: "1px solid #E2E2DD", paddingTop: 22, display: "flex", justifyContent: "space-between", fontFamily: FONT, fontSize: 20, color: P.ink }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: 700 }}>39,90 €</span>
          </div>
          <div style={{ marginTop: 20, height: 62, borderRadius: 40, background: P.brand, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, fontWeight: 700, fontSize: 20 }}>
            Finalizar compra
          </div>
        </div>
        <Cursor x={cx} y={cy} o={ci(f, [14, 20], [0, 1]) * ci(f, [click + 10, click + 16], [1, 0])} press={ci(f, [click, click + 3, click + 8], [1, 0.85, 1])} />
      </Window>
    </SolutionFrame>
  );
};
