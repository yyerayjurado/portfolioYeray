import React from "react";
import { useCurrentFrame } from "remotion";
import { ProductBox } from "../../promo/solutions/Shop";
import { FONT, MONO, W, ci } from "../theme";

// Tienda online en móvil (maqueta ilustrativa, marca genérica).
export const PhoneShop: React.FC<{ click: number }> = ({ click }) => {
  const f = useCurrentFrame();
  const added = f > click + 2;
  return (
    <div style={{ width: 560, height: 860, borderRadius: 64, background: "#16171C", padding: 14, boxSizing: "border-box", boxShadow: "0 40px 80px rgba(0,0,40,0.5)" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 52, background: "#F6F6F3", overflow: "hidden", position: "relative" }}>
        <div style={{ height: 96, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 34px 0", boxSizing: "border-box", borderBottom: "1px solid #E2E2DD" }}>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: "#111216" }}>tu marca · tienda</span>
          <span style={{ minWidth: 34, height: 34, borderRadius: 17, background: added ? W.blue : "#DDDDE5", color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${ci(f, [click + 2, click + 6, click + 12], [1, 1.35, 1])})` }}>{added ? 1 : 0}</span>
        </div>
        <div style={{ margin: "22px 28px 0", height: 360, borderRadius: 26, background: "#ECECE8", display: "flex", alignItems: "center", justifyContent: "center", perspective: 1000 }}>
          <ProductBox size={230} ry={-36 + f * 0.6} />
        </div>
        <div style={{ display: "flex", gap: 12, margin: "14px 28px 0" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 70, borderRadius: 14, background: i === 0 ? "#E0E0FF" : "#ECECE8", border: i === 0 ? `2px solid ${W.blue}` : "none" }} />
          ))}
        </div>
        <div style={{ margin: "20px 34px 0", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 36, color: "#111216" }}>Edición Azul</span>
          <span style={{ fontFamily: FONT, fontSize: 28, color: "#111216" }}>39,90 €</span>
        </div>
        <div style={{ margin: "8px 34px 0", fontFamily: MONO, fontSize: 15, color: "#8A8B90", letterSpacing: "0.08em" }}>PRODUCTO DE EJEMPLO</div>
        <div style={{ position: "absolute", left: 34, right: 34, bottom: 40, height: 74, borderRadius: 37, background: added ? "#111216" : W.blue, color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${ci(f, [click, click + 3, click + 8], [1, 0.94, 1])})` }}>
          {added ? "✓ Añadido al carrito" : "Añadir al carrito"}
        </div>
      </div>
    </div>
  );
};
