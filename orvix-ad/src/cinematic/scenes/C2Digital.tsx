import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../../promo/kit";
import { ProductBox } from "../../promo/solutions/Shop";
import { BrandBoard, ShopPage, WebPage } from "../pieces";
import { FONT, HITS, P, ci } from "../theme";
import { Camera, Geometry, Words, keys } from "../ui";

// 00:05–00:11 · Web, tienda online e identidad visual sobre un mismo lienzo recorrido por una cámara.
const ProductRow: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ display: "flex", gap: 24, width: 1400, height: 420 }}>
    {["Ficha de producto", "Vista 3D", "Pago seguro"].map((t, i) => (
      <div key={t} style={{ flex: 1, borderRadius: 22, background: P.panel, border: `1px solid ${P.line2}`, padding: 26, boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", perspective: 900 }}>
          {i === 1 ? (
            <ProductBox size={200} ry={-30 + f * 0.6} />
          ) : i === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "80%" }}>
              <div style={{ height: 120, borderRadius: 14, background: P.panel2 }} />
              <div style={{ height: 12, width: "70%", borderRadius: 6, background: P.line2 }} />
              <div style={{ height: 40, borderRadius: 20, background: P.brand }} />
            </div>
          ) : (
            <div style={{ width: "80%", height: 150, borderRadius: 16, background: P.panel2, padding: 20, boxSizing: "border-box" }}>
              <div style={{ width: 60, height: 40, borderRadius: 8, background: P.accent }} />
              <div style={{ height: 12, width: "90%", borderRadius: 6, background: P.line2, marginTop: 30 }} />
            </div>
          )}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.text }}>{t}</div>
      </div>
    ))}
  </div>
);

export const C2Digital: React.FC = () => {
  const f = useCurrentFrame();
  const { V, W, H } = useLayout();
  const k = 1;
  const cam = keys(f, [
    { f: 0, x: 700, y: 440, s: 0.6 * k },
    { f: 80, x: 760, y: 470, s: 0.66 * k },
    { f: 104, x: 2180, y: 440, s: 0.66 * k },
    { f: 138, x: 2120, y: 460, s: 0.7 * k },
    { f: 174, x: 1440, y: 680, s: V ? 0.34 : 0.36 },
  ]);
  const cx = V ? W / 2 : W * 0.63;
  const cy = V ? 1180 : H / 2;
  return (
    <AbsoluteFill>
      <Geometry intensity={0.6} drift={0.6} />
      <Camera x={cam.x} y={cam.y} s={cam.s} cx={cx} cy={cy} rotY={V ? 0 : ci(f, [0, 174], [-7, 0])}>
        <div style={{ position: "relative", width: 2880, height: 1360 }}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <WebPage f={f} />
          </div>
          <div style={{ position: "absolute", left: 1480, top: 0 }}>
            <ShopPage f={f - 70} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 940 }}>
            <BrandBoard f={f - 6} />
          </div>
          <div style={{ position: "absolute", left: 1480, top: 940, opacity: ci(f, [120, 140], [0, 1]) }}>
            <ProductRow f={f} />
          </div>
        </div>
      </Camera>

      {/* Continuidad con la transición azul de la introducción */}
      <AbsoluteFill style={{ background: P.brand, opacity: ci(f, [0, 10], [1, 0]), zIndex: 5 }} />
      {/* Velo para mantener legible el titular */}
      <AbsoluteFill
        style={{
          background: V
            ? "linear-gradient(180deg, rgba(10,11,15,0.98) 0%, rgba(10,11,15,0.96) 30%, transparent 46%)"
            : "linear-gradient(90deg, rgba(10,11,15,0.98) 0%, rgba(10,11,15,0.96) 36%, transparent 52%)",
          opacity: ci(f, [150, 170], [1, 0]),
        }}
      />
      <div style={{ position: "absolute", left: V ? 90 : 120, top: V ? 250 : 0, height: V ? undefined : H, width: V ? 900 : 640, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "relative", height: V ? 230 : 260 }}>
          <div style={{ position: "absolute", top: 0 }}>
            <Words text="DISEÑO QUE CONECTA" at={6} step={6} size={V ? 104 : 94} out={HITS.digitalSwap - 8} accent={["CONECTA"]} maxWidth={V ? 900 : 640} />
          </div>
          <div style={{ position: "absolute", top: 0 }}>
            <Words text="TECNOLOGÍA QUE IMPULSA" at={HITS.digitalSwap + 4} step={6} size={V ? 104 : 94} out={138} accent={["IMPULSA"]} maxWidth={V ? 900 : 640} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
