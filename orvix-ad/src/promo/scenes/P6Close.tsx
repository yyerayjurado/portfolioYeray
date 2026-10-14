import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Logo, useLayout } from "../kit";
import { FONT, MONO, P, ci, easeInOut, easeOut } from "../theme";

// 37–43 s · Cierre: logotipo oficial sobre el azul de marca + llamada a la acción.
export const P6Close: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const logoW = L.V ? 760 : 820;
  const logoH = logoW / (855 / 173);
  const cy = L.V ? 820 : 430;
  const s = spring({ frame: f - 6, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ backgroundColor: P.brand }}>
      {/* Entrada: el azul se abre desde el centro como una máscara */}
      <AbsoluteFill style={{ backgroundColor: P.bg, clipPath: `inset(0 ${ci(f, [0, 16], [0, 50], easeInOut)}% 0 ${ci(f, [0, 16], [0, 50], easeInOut)}%)` }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.07), transparent 60%)" }} />

      <div
        style={{
          position: "absolute",
          left: (L.W - logoW) / 2,
          top: cy - logoH / 2,
          clipPath: `inset(${ci(f, [8, 30], [100, 0], easeOut)}% 0 0 0)`,
          transform: `translateY(${(1 - s) * 40}px) scale(${0.96 + 0.04 * s})`,
        }}
      >
        <Logo width={logoW} />
      </div>
      <div
        style={{
          position: "absolute",
          top: cy + logoH / 2 + 36,
          width: L.W,
          textAlign: "center",
          fontFamily: MONO,
          fontSize: L.V ? 32 : 28,
          letterSpacing: "0.6em",
          paddingLeft: "0.6em",
          color: "#fff",
          opacity: ci(f, [24, 38], [0, 1]),
        }}
      >
        STUDIO
      </div>
      <div
        style={{
          position: "absolute",
          top: cy + logoH / 2 + (L.V ? 100 : 90),
          left: L.W / 2 - 60,
          width: 120,
          height: 2,
          background: "rgba(255,255,255,0.5)",
          transform: `scaleX(${ci(f, [30, 46], [0, 1], easeInOut)})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: L.V ? 1180 : 720,
          width: L.W,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: L.V ? 34 : 26,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: L.V ? 64 : 60,
              letterSpacing: "-0.03em",
              color: "#fff",
              textAlign: "center",
              lineHeight: 1.05,
              transform: `translateY(${ci(f, [40, 58], [105, 0], easeOut)}%)`,
            }}
          >
            {L.V ? (
              <>
                Hablemos de tu
                <br />
                próximo proyecto.
              </>
            ) : (
              "Hablemos de tu próximo proyecto."
            )}
          </div>
        </div>
        <div
          style={{
            padding: L.V ? "20px 40px" : "16px 34px",
            borderRadius: 50,
            background: "#fff",
            color: P.brand,
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: L.V ? 36 : 30,
            letterSpacing: "0.02em",
            opacity: ci(f, [56, 68], [0, 1]),
            transform: `translateY(${ci(f, [56, 70], [20, 0])}px)`,
          }}
        >
          orvixstudio.es
        </div>
      </div>
      {/* Fundido final suave para que el cierre no corte de golpe */}
      <AbsoluteFill style={{ background: "#000", opacity: ci(f, [168, 180], [0, 0.35]) }} />
    </AbsoluteFill>
  );
};
