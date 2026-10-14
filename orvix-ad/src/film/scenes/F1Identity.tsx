import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Camera, keys } from "../../cinematic/ui";
import { BlueSurface, Caption, CropMarks, Logo, Paper } from "../materials";
import { C, FONT, SERIF, ci, easeOut } from "../theme";

// Escena 1 · Identidad: una composición física (pliego blanco + cartel azul) que la cámara recorre
// hasta descubrir el logotipo integrado en la pieza.
export const F1Identity: React.FC = () => {
  const f = useCurrentFrame();
  const cam = keys(f, [
    { f: 0, x: 860, y: 1240, s: 1.45 },
    { f: 70, x: 720, y: 1050, s: 1.12 },
    { f: 128, x: 620, y: 860, s: 0.86 },
    { f: 150, x: 610, y: 840, s: 0.9 },
  ]);
  const rot = ci(f, [0, 128], [-4, 0], easeOut);
  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <BlueSurface light={[70, 10]} />
      <Camera x={cam.x} y={cam.y} s={cam.s} cx={540} cy={960}>
        <div style={{ position: "relative", width: 1500, height: 2600, transform: `rotate(${rot}deg)`, transformOrigin: "620px 860px" }}>
          {/* Pliego blanco con tipografía editorial */}
          <Paper w={1050} h={1400} style={{ left: 380, top: 1080, transform: "rotate(-5deg)" }}>
            <div style={{ position: "absolute", left: 90, top: 380 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 132, letterSpacing: "-0.04em", color: C.ink, lineHeight: 0.95 }}>A different</div>
              <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 250, color: C.blue, lineHeight: 0.9, marginLeft: -6 }}>perspective</div>
            </div>
            <div style={{ position: "absolute", left: 92, top: 300, width: 600, height: 2, background: C.ink, opacity: 0.6 }} />
            <Caption color={C.ink} size={22} style={{ position: "absolute", left: 92, top: 250 }}>Orvix Studio — Nº 01</Caption>
            <Caption color={C.ink} size={22} style={{ position: "absolute", left: 92, top: 1240 }}>Estudio digital</Caption>
            <Caption color={C.ink} size={22} style={{ position: "absolute", right: 90, top: 1240 }}>01 / 05</Caption>
          </Paper>
          {/* Cartel azul impreso con el logotipo original */}
          <div style={{ position: "absolute", left: 170, top: 330, width: 900, height: 1080, transform: "rotate(3deg)" }}>
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(150deg, ${C.light} 0%, ${C.blue} 45%, ${C.deep} 100%)`, boxShadow: "0 50px 110px rgba(0,0,50,0.55), 0 6px 14px rgba(0,0,50,0.3)" }} />
            <CropMarks w={900} h={1080} />
            <div style={{ position: "absolute", left: 130, top: 430 }}>
              <Logo width={640} />
            </div>
            <Caption size={20} style={{ position: "absolute", left: 60, top: 60 }}>Nº 01</Caption>
            <Caption size={20} style={{ position: "absolute", right: 60, top: 60 }}>Identidad</Caption>
            <div style={{ position: "absolute", left: 60, bottom: 120, width: 780, height: 2, background: C.white, opacity: 0.6 }} />
            <Caption size={20} style={{ position: "absolute", left: 60, bottom: 70 }}>Creatividad · Diseño · Tecnología</Caption>
          </div>
        </div>
      </Camera>
      {/* Luz que barre la superficie al final del movimiento */}
      <AbsoluteFill style={{ background: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)", transform: `translateX(${ci(f, [90, 150], [-1100, 1100])}px)`, mixBlendMode: "screen" }} />
    </AbsoluteFill>
  );
};
