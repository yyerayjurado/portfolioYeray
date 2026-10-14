import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { PhoneSite } from "../../promo/solutions/Web";
import { Brand } from "../../welcome/scenes/W4BrandMkt3D";
import { BlueBg, Chip, Shapes, Title } from "../../welcome/ui";
import { HIT, ci, easeInOut, easeOut } from "../theme";
import { PhoneShop } from "./PhoneShop";

// Escena 4 · La web se transforma en tienda online y, después, en un sistema de identidad de marca.
export const P4ShopBrand: React.FC = () => {
  const f = useCurrentFrame();
  const toShop = ci(f, [0, 16], [0, 1], easeInOut);
  const toBrand = ci(f, [HIT.brand - 10, HIT.brand + 10], [0, 1], easeInOut);
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.4} />
      <div style={{ position: "absolute", top: 250, left: 90, width: 900 }}>
        <div style={{ position: "relative", height: 60 }}>
          <div style={{ position: "absolute" }}>
            <Chip at={0} out={HIT.brand - 10} size={24}>Ecommerce</Chip>
          </div>
          <div style={{ position: "absolute" }}>
            <Chip at={HIT.brand} size={24}>Branding</Chip>
          </div>
        </div>
        <div style={{ position: "relative", marginTop: 22, height: 260 }}>
          <div style={{ position: "absolute" }}>
            <Title text="CREAMOS TU TIENDA ONLINE" at={4} size={84} step={3} maxWidth={900} out={HIT.brand - 12} />
          </div>
          <div style={{ position: "absolute" }}>
            <Title text="CONSTRUIMOS LA IDENTIDAD DE TU MARCA" at={HIT.brand + 2} size={80} step={3} maxWidth={900} />
          </div>
        </div>
      </div>
      {/* Móvil: la web sale hacia arriba y entra la tienda; luego el móvil se retira */}
      <div style={{ position: "absolute", left: 260, top: 640, transform: `translateX(${-toBrand * 900}px) rotate(${-toBrand * 8}deg)`, opacity: 1 - toBrand }}>
        <div style={{ position: "relative", width: 560, height: 860 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 1 - toShop, transform: `translateY(${-toShop * 60}px)` }}>
            <PhoneSite scroll={560} />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: toShop, transform: `translateY(${(1 - toShop) * 60}px)` }}>
            <PhoneShop click={HIT.cart} />
          </div>
        </div>
      </div>
      {/* Identidad de marca: composición tipográfica, paleta y aplicaciones */}
      <div style={{ position: "absolute", left: 40, top: 760, transformOrigin: "0 0", transform: `translateX(${(1 - toBrand) * 900}px) scale(1)`, opacity: toBrand }}>
        <Brand f={f - HIT.brand + 4} />
      </div>
      <div style={{ position: "absolute", left: 90, top: 1440, opacity: ci(f, [HIT.brand + 30, HIT.brand + 44], [0, 1]) * ci(f, [0, 1], [1, 1], easeOut) }}>
        <Chip size={20}>Logotipo · Tipografía · Color · Aplicaciones</Chip>
      </div>
    </AbsoluteFill>
  );
};
