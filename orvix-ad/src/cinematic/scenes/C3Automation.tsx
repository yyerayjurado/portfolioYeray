import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../../promo/kit";
import { FlowGraph, MessageCard } from "../pieces";
import { FONT, P, ci, easeIn } from "../theme";
import { Flash, Geometry, Words } from "../ui";

// 00:11–00:18 · Una solicitud entra, se procesa y genera una respuesta automática.
const T0 = 10; // desfase del reloj del flujo respecto a la escena

export const C3Automation: React.FC = () => {
  const f = useCurrentFrame();
  const { V, W } = useLayout();
  const g = f - T0;
  const exit = ci(f, [188, 210], [0, 1], easeIn);
  const graphS = V ? 0.92 : 0.86;
  const gw = (V ? 940 : 1570) * graphS;
  return (
    <AbsoluteFill>
      <Geometry intensity={0.7} drift={0.4} />
      <Flash at={0} peak={0.4} dur={16} />
      {/* Golpe de entrada: corte con desplazamiento */}
      <AbsoluteFill
        style={{
          transform: `translateX(${ci(f, [0, 10], [120, 0])}px) scale(${(1 + f * 0.0004) * (1 + exit * 1.2)})`,
          opacity: ci(f, [0, 6], [0, 1]) * (1 - exit),
          transformOrigin: V ? "50% 55%" : "50% 55%",
        }}
      >
        <div style={{ position: "absolute", left: (W - gw) / 2, top: V ? 560 : 360, transform: `scale(${graphS})`, transformOrigin: "0 0" }}>
          <FlowGraph f={g} vertical={V} />
        </div>
        {/* Mensaje del cliente → respuesta automática */}
        {V ? (
          <div style={{ position: "absolute", left: 90, top: 1340 }}>
            <div style={{ position: "absolute", opacity: 1 - ci(f, [118, 126], [0, 1]) }}>
              <MessageCard f={f} at={6} label="SOLICITUD DE CLIENTE" text="«Hola, quiero renovar la web de mi negocio. ¿Hablamos?»" w={900} />
            </div>
            <div style={{ position: "absolute" }}>
              <MessageCard f={f} at={T0 + 116} label="RESPUESTA AUTOMÁTICA" text="«Gracias por escribirnos. Te proponemos una llamada el jueves a las 10:00.»" reply w={900} />
            </div>
          </div>
        ) : (
          <>
            <div style={{ position: "absolute", left: 120, top: 830 }}>
              <MessageCard f={f} at={6} label="SOLICITUD DE CLIENTE" text="«Hola, quiero renovar la web de mi negocio. ¿Hablamos?»" w={680} />
            </div>
            <div style={{ position: "absolute", right: 120, top: 830 }}>
              <MessageCard f={f} at={T0 + 120} label="RESPUESTA AUTOMÁTICA" text="«Gracias por escribirnos. Te proponemos una llamada el jueves a las 10:00.»" reply w={680} />
            </div>
          </>
        )}
      </AbsoluteFill>

      <div style={{ position: "absolute", left: V ? 90 : 120, top: V ? 250 : 110, width: V ? 900 : 1680, opacity: 1 - exit }}>
        <Words text="AUTOMATIZAMOS LO REPETITIVO" at={8} step={6} size={V ? 92 : 84} accent={["REPETITIVO"]} maxWidth={V ? 900 : 1680} />
        <div style={{ marginTop: V ? 26 : 18 }}>
          <Words text="PARA QUE PUEDAS CENTRARTE EN CRECER" at={44} step={3} size={V ? 38 : 34} weight={500} color={P.muted} maxWidth={V ? 900 : 1680} />
        </div>
      </div>
      <div style={{ position: "absolute", right: V ? 90 : 120, top: V ? 1520 : 1020, fontFamily: FONT, fontSize: 16, color: P.dim, opacity: ci(f, [30, 40], [0, 1]) * (1 - exit), letterSpacing: "0.08em" }}>
        FLUJO CONCEPTUAL · REPRESENTACIÓN ILUSTRATIVA
      </div>
    </AbsoluteFill>
  );
};
