import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { WebPage } from "../../cinematic/pieces";
import { PhoneSite } from "../../promo/solutions/Web";
import { BlueBg, Chip, Shapes, Title } from "../../welcome/ui";
import { ci, easeInOut, easeOut } from "../theme";

// Escena 3 · Diseño y desarrollo web: la web en escritorio y en móvil, con cámara y scroll.
export const P3Web: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = ci(f, [40, 150], [0, 560], easeInOut);
  const orbit = ci(f, [0, 180], [-16, 6], easeInOut);
  return (
    <AbsoluteFill>
      <BlueBg />
      <Shapes o={0.4} />
      <div style={{ position: "absolute", top: 250, left: 90, width: 900 }}>
        <Chip at={2} size={24}>Diseño y desarrollo web</Chip>
        <div style={{ marginTop: 22 }}>
          <Title text="DISEÑAMOS Y DESARROLLAMOS TU WEB" at={6} size={80} step={3} maxWidth={900} />
        </div>
      </div>
      {/* Escritorio detrás, en perspectiva */}
      <div style={{ position: "absolute", left: 40, top: 660, transformOrigin: "0 0", transform: `perspective(2000px) rotateY(${18 + orbit * 0.4}deg) translateX(${ci(f, [0, 30], [-200, 0], easeOut)}px) scale(0.6)`, opacity: ci(f, [4, 18], [0, 0.85]) }}>
        <WebPage f={f + 10} />
      </div>
      {/* Móvil delante: la misma web, responsive */}
      <div style={{ position: "absolute", left: 400, top: 640, transform: `perspective(2000px) rotateY(${orbit}deg) translateY(${ci(f, [8, 34], [300, 0], easeOut)}px) scale(0.98)`, transformOrigin: "50% 50%", opacity: ci(f, [8, 20], [0, 1]) }}>
        <PhoneSite scroll={scroll} />
      </div>
    </AbsoluteFill>
  );
};
