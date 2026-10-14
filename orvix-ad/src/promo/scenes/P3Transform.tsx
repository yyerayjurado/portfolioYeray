import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ground, Headline, Stage, Tag, useLayout, In } from "../kit";
import { FONT, P, ci, easeIn, easeInOut } from "../theme";
import { WS_H, WS_W, Workspace } from "./Workspace";

// 12–18 s · La transformación: el desorden se alinea y se conecta a través de Orvix.
export const P3Transform: React.FC = () => {
  const f = useCurrentFrame();
  const L = useLayout();
  const order = ci(f, [0, 26], [0, 1], easeInOut);
  const node = ci(f, [40, 95], [0, 1], easeInOut);
  const push = ci(f, [158, 180], [1, 1.8], easeIn);
  return (
    <AbsoluteFill>
      <Ground />
      {/* Pulso de impacto sincronizado con el golpe musical */}
      <AbsoluteFill style={{ background: P.brand, opacity: ci(f, [0, 3, 14], [0, 0.22, 0]) }} />
      <AbsoluteFill style={{ transform: `scale(${push})`, opacity: ci(f, [164, 180], [1, 0]) }}>
        <Stage rect={L.stage} dw={WS_W} dh={WS_H}>
          <Workspace appear={-100} order={order} node={node} manual={1 - order} />
        </Stage>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: L.text.x,
          top: L.text.y,
          width: L.text.w,
          height: L.V ? undefined : L.text.h,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 36,
          opacity: ci(f, [160, 172], [1, 0]),
        }}
      >
        <In at={50}>
          <Tag size={L.tag} color={P.accent}>
            Orvix Studio
          </Tag>
        </In>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Headline at={58} size={L.hl} lines={["Diseñamos."]} />
          <Headline at={73} size={L.hl} lines={["Desarrollamos."]} />
          <Headline at={88} size={L.hl} lines={[{ t: "Automatizamos.", accent: true }]} />
        </div>
        <In at={110}>
          <div style={{ fontFamily: FONT, fontSize: L.sub, color: P.muted, lineHeight: 1.35, maxWidth: L.V ? 860 : 560 }}>
            Diseño, tecnología y estrategia trabajando como un solo sistema.
          </div>
        </In>
      </div>
    </AbsoluteFill>
  );
};
