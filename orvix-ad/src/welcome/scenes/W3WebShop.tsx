import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShopPage, WebPage } from "../../cinematic/pieces";
import { CUES, MONO, W, ci, easeInOut, local } from "../theme";
import { BlueBg, Chip, Shapes, Title, useV } from "../ui";

// Escena 3 · Diseño web y tiendas online con Shopify (maquetas ilustrativas con marca genérica).
export const W3WebShop: React.FC = () => {
  const f = useCurrentFrame();
  const { V, Wd } = useV();
  const shop = local(CUES.shop, 2);
  const sw = ci(f, [shop - 6, shop + 18], [0, 1], easeInOut);
  const sc = V ? 0.66 : 0.76;
  const ox = V ? (Wd - 1400 * sc) / 2 : 700;
  const oy = V ? 760 : 150;
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.5} />
      <div style={{ position: "absolute", left: V ? 90 : 130, top: V ? 230 : 230, width: V ? 900 : 520 }}>
        <div style={{ position: "relative", height: 70 }}>
          <div style={{ position: "absolute" }}>
            <Chip at={4} out={shop - 8}>Diseño y desarrollo web</Chip>
          </div>
          <div style={{ position: "absolute" }}>
            <Chip at={shop}>Tiendas online · Shopify</Chip>
          </div>
        </div>
        <div style={{ position: "relative", marginTop: 26, height: V ? 220 : 340 }}>
          <div style={{ position: "absolute" }}>
            <Title text="Páginas web que representan tu marca" at={8} size={V ? 76 : 72} step={2} out={shop - 10} maxWidth={V ? 900 : 520} />
          </div>
          <div style={{ position: "absolute" }}>
            <Title text="Tiendas online para vender por internet" at={shop + 2} size={V ? 76 : 72} step={2} maxWidth={V ? 900 : 520} />
          </div>
        </div>
      </div>

      {/* Web: entra en perspectiva y se recorre */}
      <div
        style={{
          position: "absolute",
          left: ox,
          top: oy,
          transformOrigin: "0 0",
          transform: `perspective(2400px) translate(${sw * 140}px, ${-sw * 30}px) rotateY(${ci(f, [0, 40], [-14, -4]) - sw * 6}deg) scale(${sc * (1 - sw * 0.14)})`,
          opacity: ci(f, [0, 12], [0, 1]) * (1 - sw * 0.7),
        }}
      >
        <WebPage f={f + 4} />
      </div>
      {/* Tienda: aparece delante en el cambio de idea */}
      <div
        style={{
          position: "absolute",
          left: ox + (V ? 0 : 60),
          top: oy + (V ? 60 : 40),
          transformOrigin: "0 0",
          transform: `perspective(2400px) translateX(${(1 - sw) * 900}px) rotateY(${-4 + (1 - sw) * -10}deg) scale(${sc})`,
          opacity: sw,
          boxShadow: "0 40px 80px rgba(0,0,40,0.4)",
        }}
      >
        <ShopPage f={f - shop + 12} />
      </div>
      <div style={{ position: "absolute", right: V ? 90 : 110, top: V ? 1470 : 900, fontFamily: MONO, fontSize: 16, letterSpacing: "0.1em", color: W.white70 }}>MAQUETAS ILUSTRATIVAS</div>
    </AbsoluteFill>
  );
};
