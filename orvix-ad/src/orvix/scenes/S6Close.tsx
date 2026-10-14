import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, MONO, ci } from "../theme";

// 25–30 s · Cierre con logotipo oficial (proporción original 855×173) y CTA.
const LOGO_W = 780;
const LOGO_H = (LOGO_W * 173) / 855;

export const S6Close: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - 4, fps, config: { damping: 14, stiffness: 120, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ backgroundColor: C.blue }}>
      {/* Textura sutil sobre el azul de marca */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at 50% 42%, rgba(80,92,255,0.6), transparent 70%), radial-gradient(800px 600px at 50% 110%, rgba(0,0,80,0.55), transparent 70%)`,
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 540,
            top: 820,
            width: 600,
            height: 600,
            marginLeft: -300,
            marginTop: -300,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.35)",
            transform: `scale(${ci(f, [i * 5, 40 + i * 5], [0.2, 2.6 + i])})`,
            opacity: ci(f, [i * 5, 40 + i * 5], [0.8, 0]),
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: (1080 - LOGO_W) / 2,
          top: 820 - LOGO_H / 2,
          width: LOGO_W,
          height: LOGO_H,
          transform: `scale(${0.7 + 0.3 * s}) translateY(${(1 - s) * 60}px)`,
          opacity: ci(f, [2, 10], [0, 1]),
          filter: `blur(${ci(f, [2, 16], [24, 0])}px)`,
        }}
      >
        <Img src={staticFile("orvix-logo.png")} style={{ width: LOGO_W, height: LOGO_H }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 820 + LOGO_H / 2 + 40,
          width: 1080,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: 34,
          letterSpacing: `${ci(f, [12, 34], [0.2, 0.62])}em`,
          paddingLeft: "0.62em",
          color: C.white,
          opacity: ci(f, [12, 24], [0, 1]),
        }}
      >
        STUDIO
      </div>

      <div style={{ position: "absolute", top: 340, width: 1080, textAlign: "center" }}>
        {["TU PRÓXIMO PROYECTO", "EMPIEZA AQUÍ."].map((t, i) => (
          <div key={t} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 80,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: C.white,
                transform: `translateY(${ci(f, [22 + i * 5, 38 + i * 5], [105, 0])}%)`,
              }}
            >
              {t}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 1250,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 34,
        }}
      >
        <div
          style={{
            padding: "30px 54px",
            borderRadius: 60,
            background: C.white,
            color: C.blue,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "0.01em",
            boxShadow: "0 30px 60px rgba(0,0,60,0.35)",
            opacity: ci(f, [38, 48], [0, 1]),
            transform: `translateY(${ci(f, [38, 52], [40, 0])}px) scale(${1 + Math.max(0, Math.sin((f - 70) / 8)) * 0.02 * (f > 70 ? 1 : 0)})`,
          }}
        >
          HABLEMOS DE TU PROYECTO →
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 40,
            color: C.white,
            letterSpacing: "0.04em",
            opacity: ci(f, [48, 58], [0, 1]),
          }}
        >
          orvixstudio.es
        </div>
      </div>
    </AbsoluteFill>
  );
};
